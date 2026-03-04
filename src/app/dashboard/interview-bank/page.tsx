"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, X } from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard";

type AIQuestion = {
  question: string;
  difficulty: Difficulty;
  shortAnswer: string;
  detailedAnswer: string;
  followUps: string[];
  commonMistakes: string[];
  tags: string[];
};

type AISet = {
  topic: string;
  level: string;
  questions: AIQuestion[];
};

export default function InterviewBankAIPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AISet | null>(null);
  const [active, setActive] = useState<AIQuestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setError(null);
    setData(null);

    if (!topic.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/interview-bank/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          role: "Software Engineer",
          level: "Beginner→Advanced",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || json.error || "Failed to generate");
      }

      if (!json.questionBank) {
        throw new Error("Invalid response format");
      }

      setData(json.questionBank);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center text-cyan-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">
              AI Interview Bank
            </h1>
            <p className="text-sm text-white/60">
              Type a technology or concept. Get curated interview questions +
              answers instantly.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., React Hooks, JWT Auth, SQL Indexing..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-cyan-400/30"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generate}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-cyan-500/20 text-cyan-100 border border-cyan-400/20 hover:bg-cyan-500/30 transition font-semibold disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate"}
            </motion.button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-orange-200">{error}</p>
          )}
        </div>

        {/* Results */}
        {data && data.questions && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {data.topic}
                </h2>
                <p className="text-sm text-white/60">
                  {data.level} • {data.questions.length} questions
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {data.questions.map((q, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-white/60">
                      {q.difficulty}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {q.tags?.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-xs text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-full"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-3 text-white font-semibold">
                    {q.question}
                  </h3>

                  <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {q.shortAnswer}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => setActive(q)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition"
                    >
                      View Answer
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setActive(null)}
              />

              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto pr-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-widest text-white/50">
                      {active.difficulty}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {active.question}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-5">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <p className="text-xs tracking-widest text-white/50 mb-2">
                      SHORT ANSWER
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {active.shortAnswer}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <p className="text-xs tracking-widest text-white/50 mb-2">
                      COMMON MISTAKES
                    </p>
                    <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
                      {active.commonMistakes?.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-5">
                  <p className="text-xs tracking-widest text-white/50 mb-2">
                    DETAILED ANSWER
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                    {active.detailedAnswer}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-5">
                  <p className="text-xs tracking-widest text-white/50 mb-2">
                    FOLLOW-UP QUESTIONS
                  </p>
                  <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
                    {active.followUps?.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}