"use client";

import QuizConfigurator from "@/components/SkillMastery/QuizConfigurator";
import TopicSelector from "@/components/SkillMastery/TopicSelector";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SkillMasteryPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"topic" | "config">("topic");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setStage("config");
  };

  const handleStartQuiz = async (difficulty: string, questionCount: number) => {
    setLoading(true);
    try {
      // Call API to generate or retrieve quiz
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic,
          difficulty,
          questionCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }

      const data = await response.json();

      if (data.success) {
        // Normalize _id to a plain string regardless of MongoDB serialization shape
        const quizId = data.quiz._id?.$oid ?? data.quiz._id?.toString?.() ?? String(data.quiz._id)
        sessionStorage.setItem(`quiz_${quizId}`, JSON.stringify(data.quiz))
        router.push(`/dashboard/skill-mastery/quiz/${quizId}`)
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto pt-12">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
          >
            <Loader className="w-12 h-12 text-orange-500 animate-spin" />
            <p className="text-muted">Preparing your quiz...</p>
          </motion.div>
        ) : stage === "topic" ? (
          <TopicSelector onTopicSelect={handleTopicSelect} />
        ) : (
          <QuizConfigurator
            topic={selectedTopic}
            onBack={() => setStage("topic")}
            onStart={handleStartQuiz}
          />
        )}
      </div>
    </div>
  );
}
