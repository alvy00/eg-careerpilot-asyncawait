"use client";

import QuizPlayer from "@/components/SkillMastery/QuizPlayer";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId as string;

  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cached = sessionStorage.getItem(`quiz_${quizId}`);
    if (cached) {
      setQuizData(JSON.parse(cached));
    } else {
      setError("Quiz data not found");
    }
    setLoading(false);
  }, [quizId]);

  const handleSubmit = async (answers: any[]) => {
    // Score entirely client-side — no API call needed, no auth dependency
    const questions = quizData.questions;
    let correct = 0, wrong = 0, skipped = 0;
    const categoryPerformance: Record<string, { correct: number; total: number }> = {};
    const detailedAnswers = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const a = answers[i];
      const cat = q.category || "General";

      if (!categoryPerformance[cat]) categoryPerformance[cat] = { correct: 0, total: 0 };
      categoryPerformance[cat].total++;

      let isCorrect = false;
      if (!a?.userAnswer) {
        skipped++;
      } else if (a.userAnswer === q.correctAnswer) {
        correct++;
        isCorrect = true;
        categoryPerformance[cat].correct++;
      } else {
        wrong++;
      }

      detailedAnswers.push({
        questionId: q.id ?? i,
        questionText: q.question,
        userAnswer: a?.userAnswer ?? null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        timeSpent: a?.timeSpent ?? 0,
        explanation: q.explanation ?? "",
      });
    }

    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);

    const categoryWise: Record<string, any> = {};
    for (const [cat, d] of Object.entries(categoryPerformance)) {
      categoryWise[cat] = {
        correct: d.correct,
        total: d.total,
        percentage: Math.round((d.correct / d.total) * 100),
      };
    }

    const strengths = Object.entries(categoryWise).filter(([, d]: any) => d.percentage >= 80).map(([c]) => c);
    const weaknesses = Object.entries(categoryWise).filter(([, d]: any) => d.percentage < 60).map(([c]) => c);

    const level = percentage >= 85 ? "Advanced" : percentage >= 70 ? "Intermediate" : "Beginner";

    let feedback = "";
    if (percentage >= 85) feedback = `Excellent! You scored ${percentage}%. Strong fundamentals.${weaknesses.length ? ` Work on: ${weaknesses.join(", ")}.` : " Keep it up!"}`;
    else if (percentage >= 70) feedback = `Good job! You scored ${percentage}%. You're on the right track.${weaknesses.length ? ` Improve: ${weaknesses.join(", ")}.` : ""}`;
    else if (percentage >= 50) feedback = `You scored ${percentage}%. Room to grow — focus on: ${weaknesses.length ? weaknesses.join(", ") : "fundamentals"}.`;
    else feedback = `You scored ${percentage}%. Review the basics and try again.`;

    const attempt = {
      topic: quizData.topic,
      difficulty: quizData.difficulty,
      score: { obtained: correct, total, percentage, correctAnswers: correct, wrongAnswers: wrong, skipped },
      answers: detailedAnswers,
      categoryWisePerformance: categoryWise,
      insights: { strengths, weaknesses, recommendedTopics: weaknesses.map(w => `Advanced ${w}`) },
      feedback,
      userLevelAfter: level,
    };

    sessionStorage.setItem(`attempt_${quizId}`, JSON.stringify(attempt));
    router.push(`/dashboard/skill-mastery/quiz/${quizId}/results`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500">{error || "Quiz not found"}</p>
          <button onClick={() => router.push("/dashboard/skill-mastery")}
            className="px-6 py-2 rounded-lg bg-primary text-white transition">
            Back to Skill Mastery
          </button>
        </div>
      </div>
    );
  }

  return <QuizPlayer quizData={quizData} onSubmit={handleSubmit} />;
}
