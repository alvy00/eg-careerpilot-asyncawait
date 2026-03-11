"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";
import { useState } from "react";

interface QuizConfiguratorProps {
  topic: string;
  onBack: () => void;
  onStart: (difficulty: string, questionCount: number) => void;
}

export default function QuizConfigurator({
  topic,
  onBack,
  onStart,
}: QuizConfiguratorProps) {
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [questionCount, setQuestionCount] = useState(20);

  const difficultyLevels = [
    { name: "Basic", description: "Great for beginners", icon: "🟢" },
    {
      name: "Intermediate",
      description: "For intermediate learners",
      icon: "🟡",
    },
    { name: "Advanced", description: "For advanced learners", icon: "🔴" },
    { name: "Mixed", description: "Random difficulty", icon: "🎲" },
  ];

  const questionOptions = [
    { count: 15, time: "10 mins" },
    { count: 20, time: "15 mins" },
    { count: 30, time: "20 mins" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-3xl font-bold text-white">Configure your quiz</h2>
        <p className="text-gray-400 mt-2">
          Topic: <span className="text-orange-500 font-medium">{topic}</span>
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          Select Difficulty Level
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {difficultyLevels.map((level) => (
            <motion.button
              key={level.name}
              onClick={() => setDifficulty(level.name)}
              className={`p-4 rounded-lg border-2 transition text-left ${
                difficulty === level.name
                  ? "bg-orange-500/10 border-orange-500"
                  : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{level.icon}</span>
                <div>
                  <p className="font-semibold text-white">{level.name}</p>
                  <p className="text-sm text-gray-400">{level.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Question Count Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          Number of Questions
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {questionOptions.map((option) => (
            <motion.button
              key={option.count}
              onClick={() => setQuestionCount(option.count)}
              className={`p-4 rounded-lg border-2 transition ${
                questionCount === option.count
                  ? "bg-orange-500/10 border-orange-500"
                  : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-2xl font-bold text-white">{option.count}</p>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Zap className="w-3 h-3" /> {option.time}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <motion.button
        onClick={() => onStart(difficulty, questionCount)}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold flex items-center justify-center gap-2 transition"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Zap className="w-5 h-5" /> Start Quiz ({questionCount} questions,{" "}
        {questionCount === 15 ? "10" : questionCount === 20 ? "15" : "20"} mins)
      </motion.button>
    </motion.div>
  );
}
