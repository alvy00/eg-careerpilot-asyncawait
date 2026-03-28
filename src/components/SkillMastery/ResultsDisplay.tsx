"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, XCircle } from "lucide-react";
import Link from "next/link";

interface ResultsDisplayProps {
  score: {
    obtained: number;
    total: number;
    percentage: number;
    correctAnswers: number;
    wrongAnswers: number;
    skipped: number;
  };
  topic: string;
  difficulty: string;
  categoryPerformance: {
    [key: string]: { correct: number; total: number; percentage: number };
  };
  insights: {
    strengths: string[];
    weaknesses: string[];
    recommendedTopics: string[];
  };
  feedback: string;
  level: string;
}

export default function ResultsDisplay({
  score, topic, difficulty, categoryPerformance, insights, feedback, level,
}: ResultsDisplayProps) {
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: "A+", color: "text-green-500" };
    if (percentage >= 80) return { grade: "A",  color: "text-green-500" };
    if (percentage >= 70) return { grade: "B",  color: "text-blue-500" };
    if (percentage >= 60) return { grade: "C",  color: "text-yellow-500" };
    return { grade: "F", color: "text-red-500" };
  };

  const { grade, color } = getGrade(score.percentage);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="space-y-2">
            <p className="text-muted">Quiz Completed!</p>
            <h1 className="text-5xl font-bold text-foreground">{score.percentage}%</h1>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className={`text-4xl font-bold ${color}`}>{grade}</p>
              <p className="text-sm text-muted mt-1">Grade</p>
            </div>
            <div className="w-px h-16 bg-card-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{score.correctAnswers}/{score.total}</p>
              <p className="text-sm text-muted mt-1">Correct</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <p className="text-primary font-medium">Level: {level}</p>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card-bg rounded-lg border border-card-border p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-foreground">Score Breakdown</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-body-bg border border-card-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <p className="text-2xl font-bold text-green-500">{score.correctAnswers}</p>
              </div>
              <p className="text-sm text-muted">Correct</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-body-bg border border-card-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <p className="text-2xl font-bold text-red-500">{score.wrongAnswers}</p>
              </div>
              <p className="text-sm text-muted">Wrong</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-body-bg border border-card-border">
              <p className="text-2xl font-bold text-muted mb-2">{score.skipped}</p>
              <p className="text-sm text-muted">Skipped</p>
            </div>
          </div>
        </motion.div>

        {/* Category Performance */}
        {Object.keys(categoryPerformance).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-card-bg rounded-lg border border-card-border p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">Category-wise Performance</h2>
            <div className="space-y-3">
              {Object.entries(categoryPerformance).map(([category, data]: [string, any]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-foreground">{category}</p>
                    <p className="text-sm font-medium text-muted">{data.correct}/{data.total}</p>
                  </div>
                  <div className="w-full h-2 bg-card-border rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${data.percentage >= 80 ? "bg-green-500" : data.percentage >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${data.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                  <p className="text-xs text-muted text-right">{data.percentage}%</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          {insights.strengths.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-green-500/10 border border-green-500/30 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-green-500 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Strengths
              </h3>
              <ul className="space-y-2">
                {insights.strengths.map((strength, i) => (
                  <li key={i} className="text-green-600 dark:text-green-300 flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {insights.weaknesses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-red-500 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Areas to Improve
              </h3>
              <ul className="space-y-2">
                {insights.weaknesses.map((weakness, i) => (
                  <li key={i} className="text-red-600 dark:text-red-300 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-card-bg rounded-lg border border-card-border p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-3">Feedback</h3>
          <p className="text-foreground/80">{feedback}</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center pt-4"
        >
          <Link
            href="/dashboard/skill-mastery"
            className="px-8 py-3 rounded-lg bg-card-bg hover:bg-body-bg text-foreground border border-card-border font-medium transition"
          >
            Take Another Quiz
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition"
          >
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
