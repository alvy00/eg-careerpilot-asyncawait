import connectDB from "@/utils/mongodb";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Calculate time limit based on question count
function calculateTimeLimit(questionCount: number): number {
  if (questionCount === 15) return 10; // 10 minutes
  if (questionCount === 20) return 15; // 15 minutes
  if (questionCount === 30) return 20; // 20 minutes
  return Math.ceil(questionCount * 0.8); // Default: ~48 seconds per question
}

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const { topic, difficulty, questionCount } = await req.json();

  // Validate input
  if (!topic || !difficulty || !questionCount) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    // Create template key for deduplication
    const templateKey = `${topic.toLowerCase().replace(/\s+/g, "_")}_${difficulty.toLowerCase()}_${questionCount}`;

    // Check if quiz already exists in database
    const existingQuiz = await db
      .collection("quizTemplates")
      .findOne({ templateKey });

    if (existingQuiz) {
      console.log(`Quiz found in database: ${templateKey}`);
      // Update attempt count
      await db
        .collection("quizTemplates")
        .updateOne(
          { _id: existingQuiz._id },
          { $inc: { "metadata.totalAttempts": 1 } },
        );
      return NextResponse.json({
        success: true,
        quiz: existingQuiz,
        source: "cached",
      });
    }

    // Generate new quiz using AI
    console.log(`Generating new quiz: ${templateKey}`);

    const prompt = `You are an expert quiz question generator for technical interviews and skill assessments.

TASK: Generate exactly ${questionCount} multiple-choice questions for the topic: "${topic}" at ${difficulty} difficulty level.

QUALITY REQUIREMENTS:
1. Each question must have:
   - Clear, unambiguous question text
   - 4 options (a, b, c, d)
   - Exactly 1 correct answer
   - A detailed explanation (2-3 sentences)
   - Difficulty classification
   - Category/tags

2. Options should be:
   - Plausible but only 1 correct
   - Different lengths (don't make correct answer obviously longer/shorter)
   - Free of grammatical errors

3. Questions should be appropriate for ${difficulty} level
4. Avoid trick questions and ambiguous wording

OUTPUT FORMAT (STRICT JSON ONLY):
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": [
        {"id": "a", "text": "Option A"},
        {"id": "b", "text": "Option B"},
        {"id": "c", "text": "Option C"},
        {"id": "d", "text": "Option D"}
      ],
      "correctAnswer": "c",
      "explanation": "This is the correct answer because...",
      "difficulty": "${difficulty}",
      "category": "Category Name",
      "tags": ["tag1", "tag2"]
    }
  ]
}

Generate ONLY valid JSON, no additional text or markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let generatedContent = response.text || "";
    
    // Clean up response if it has markdown code blocks
    if (generatedContent.includes("```json")) {
      generatedContent = generatedContent
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "");
    } else if (generatedContent.includes("```")) {
      generatedContent = generatedContent.replace(/```/g, "");
    }

    const parsedQuestions = JSON.parse(generatedContent.trim());

    // Create quiz template object
    const newQuiz = {
      topic,
      difficulty,
      questionCount,
      timeLimit: calculateTimeLimit(questionCount),
      templateKey,
      questions: parsedQuestions.questions,
      metadata: {
        averageScore: 0,
        totalAttempts: 1,
        passRate: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "ai",
      },
    };

    // Save to database
    const result = await db.collection("quizTemplates").insertOne(newQuiz);

    return NextResponse.json({
      success: true,
      quiz: { ...newQuiz, _id: result.insertedId },
      source: "generated",
    });
  } catch (error: any) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to generate quiz",
      },
      { status: 500 },
    );
  }
}
