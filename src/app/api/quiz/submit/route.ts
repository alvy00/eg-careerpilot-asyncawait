import connectDB from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const {
    userId,
    quizTemplateId,
    topic,
    difficulty,
    questionCount,
    timeLimit,
    answers,
    submittedAt,
    actualTimeSpent,
    status,
  } = await req.json();

  try {
    if (!userId || !quizTemplateId || !answers) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Safely extract the string id whether it's a plain string or { $oid: "..." }
    const rawId = typeof quizTemplateId === "object" && quizTemplateId?.$oid
      ? quizTemplateId.$oid
      : String(quizTemplateId)

    let quiz = null
    try {
      quiz = await db.collection("quizTemplates").findOne({ _id: new ObjectId(rawId) })
    } catch {
      // fallback: try templateKey or topic match
      quiz = await db.collection("quizTemplates").findOne({ topic, difficulty })
    }

    if (!quiz) {
      return NextResponse.json(
        { success: false, message: "Quiz not found" },
        { status: 404 },
      );
    }

    // Calculate score and build answer details
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    const detailedAnswers = [];
    const categoryPerformance: {
      [key: string]: { correct: number; total: number };
    } = {};

    for (const answer of answers) {
      const question = quiz.questions.find(
        (q: any) => q.id === answer.questionId,
      );

      if (!question) continue;

      // Initialize category if not exists
      if (!categoryPerformance[question.category]) {
        categoryPerformance[question.category] = { correct: 0, total: 0 };
      }
      categoryPerformance[question.category].total++;

      let isCorrect = false;
      if (
        answer.userAnswer === null ||
        answer.userAnswer === "" ||
        answer.userAnswer === undefined
      ) {
        skippedCount++;
      } else if (answer.userAnswer === question.correctAnswer) {
        correctCount++;
        isCorrect = true;
        categoryPerformance[question.category].correct++;
      } else {
        wrongCount++;
      }

      detailedAnswers.push({
        questionId: answer.questionId,
        questionText: question.question,
        userAnswer: answer.userAnswer || null,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timeSpent: answer.timeSpent || 0,
        explanation: question.explanation,
      });
    }

    // Calculate percentage
    const totalQuestions = answers.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // Determine level after quiz
    const userLevelAfter = determineLevel(scorePercentage);

    // Build category performance with percentages
    const categoryWisePerformance: any = {};
    for (const [category, data] of Object.entries(categoryPerformance)) {
      const categoryData = data as any;
      categoryWisePerformance[category] = {
        correct: categoryData.correct,
        total: categoryData.total,
        percentage: Math.round(
          (categoryData.correct / categoryData.total) * 100,
        ),
      };
    }

    // Generate insights
    const insights = generateInsights(
      categoryWisePerformance,
      quiz.questions,
      detailedAnswers,
    );

    // Create quiz attempt record
    const quizAttempt = {
      userId,
      quizTemplateId,
      topic,
      difficulty,
      questionCount,
      timeLimit,
      score: {
        obtained: correctCount,
        total: totalQuestions,
        percentage: scorePercentage,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        skipped: skippedCount,
      },
      startedAt: new Date(),
      submittedAt: new Date(submittedAt),
      timeSpent: actualTimeSpent,
      answers: detailedAnswers,
      categoryWisePerformance: categoryWisePerformance,
      userLevelBefore: "Intermediate", // This should come from DB
      userLevelAfter,
      levelChange: "+1", // This will be calculated properly
      insights,
      status: status || "completed",
      feedback: generateFeedback(scorePercentage, insights),
      createdAt: new Date(),
    };

    // Save attempt to database
    const insertResult = await db
      .collection("quizAttempts")
      .insertOne(quizAttempt);

    // Update user topic level
    await updateUserTopicLevel(
      db,
      userId,
      topic,
      scorePercentage,
      userLevelAfter,
    );

    return NextResponse.json({
      success: true,
      attempt: { ...quizAttempt, _id: insertResult.insertedId },
      score: scorePercentage,
      level: userLevelAfter,
    });
  } catch (error: any) {
    console.error("Submit quiz error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit quiz" },
      { status: 500 },
    );
  }
}

function determineLevel(percentage: number): string {
  if (percentage >= 85) return "Advanced";
  if (percentage >= 70) return "Intermediate";
  if (percentage >= 50) return "Beginner";
  return "Beginner";
}

function generateInsights(
  categoryPerformance: any,
  allQuestions: any[],
  answers: any[],
): { strengths: string[]; weaknesses: string[]; recommendedTopics: string[] } {
  const strengths = [];
  const weaknesses = [];
  const recommendedTopics = [];

  // Find strengths (categories with >80%)
  for (const [category, data] of Object.entries(categoryPerformance)) {
    const categoryData = data as any;
    if (categoryData.percentage >= 80) {
      strengths.push(category);
    } else if (categoryData.percentage < 60) {
      weaknesses.push(category);
      recommendedTopics.push(`Advanced ${category} concepts`);
    }
  }

  return { strengths, weaknesses, recommendedTopics };
}

function generateFeedback(percentage: number, insights: any): string {
  if (percentage >= 85) {
    return `Excellent work! You scored ${percentage}%. You have strong fundamentals. ${
      insights.weaknesses.length > 0
        ? `Focus on improving: ${insights.weaknesses.join(", ")}`
        : "Keep practicing to maintain your skills!"
    }`;
  } else if (percentage >= 70) {
    return `Good attempt! You scored ${percentage}%. You're on the right track. ${
      insights.weaknesses.length > 0
        ? `Work on these areas: ${insights.weaknesses.join(", ")}`
        : ""
    }`;
  } else if (percentage >= 50) {
    return `You scored ${percentage}%. There's room for improvement. Focus on: ${
      insights.weaknesses.length > 0
        ? insights.weaknesses.join(", ")
        : "fundamentals"
    }`;
  }
  return `You scored ${percentage}%. We recommend reviewing the basics and trying again.`;
}

async function updateUserTopicLevel(
  db: any,
  userId: string,
  topic: string,
  score: number,
  level: string,
) {
  const userTopic = await db
    .collection("userTopicLevels")
    .findOne({ userId, topic });

  if (!userTopic) {
    // Create new record
    await db.collection("userTopicLevels").insertOne({
      userId,
      topic,
      currentLevel: level,
      levelScore: score,
      totalPoints: score,
      performance: {
        totalAttempts: 1,
        averageScore: score,
        bestScore: score,
        worstScore: score,
        improvementRate: 0,
      },
      streak: {
        currentStreak: 1,
        longestStreak: 1,
        lastAttemptDate: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } else {
    // Update existing record
    const oldAverage = userTopic.performance.averageScore;
    const newAttempts = userTopic.performance.totalAttempts + 1;
    const newAverage = Math.round(
      (oldAverage * userTopic.performance.totalAttempts + score) / newAttempts,
    );
    const improvementRate = newAverage - oldAverage;

    await db.collection("userTopicLevels").updateOne(
      { userId, topic },
      {
        $set: {
          currentLevel: level,
          levelScore: newAverage,
          totalPoints: userTopic.totalPoints + score,
          "performance.totalAttempts": newAttempts,
          "performance.averageScore": newAverage,
          "performance.bestScore": Math.max(
            userTopic.performance.bestScore,
            score,
          ),
          "performance.worstScore": Math.min(
            userTopic.performance.worstScore,
            score,
          ),
          "performance.improvementRate": improvementRate,
          "streak.lastAttemptDate": new Date(),
          updatedAt: new Date(),
        },
      },
    );
  }
}
