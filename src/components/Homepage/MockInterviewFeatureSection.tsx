"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, Timer, Gauge, MessageSquareText, ArrowRight, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function MiniCard({
  icon,
  title,
  desc,
  accent = "orange",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent?: "orange" | "purple" | "cyan" | "teal";
}) {
  const accents: Record<string, string> = {
    orange: "text-orange-200 bg-orange-500/12 border-orange-400/20",
    purple: "text-violet-200 bg-violet-500/12 border-violet-400/20",
    cyan: "text-cyan-200 bg-cyan-500/12 border-cyan-400/20",
    teal: "text-teal-200 bg-teal-500/12 border-teal-400/20",
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${accents[accent]}`}>
        {icon}
      </div>
      <h4 className="mt-4 font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function MockInterviewFeatureSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-xl overflow-hidden"
        >
          {/* ambient glow */}
          <div aria-hidden className="absolute -inset-12 blur-3xl opacity-45">
            <div className="h-full w-full bg-gradient-to-br from-orange-400/22 via-amber-300/10 to-transparent" />
          </div>

          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs tracking-widest text-gray-400 mb-3">FEATURE</p>
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Mic className="text-orange-300" />
                Mock Interview Practice
              </h3>
              <p className="mt-3 text-gray-400 max-w-2xl">
                Simulate real interview rounds with a timer, difficulty scaling, and feedback that tells you what to fix next.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500/20 text-orange-100 border border-orange-400/20 px-5 py-3 hover:bg-orange-500/30 transition"
            >
              Start a mock interview <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="relative mt-8 grid md:grid-cols-4 gap-6">
            <MiniCard
              accent="orange"
              icon={<Timer className="w-5 h-5" />}
              title="Timed rounds"
              desc="Practice under real constraints to improve speed and clarity."
            />
            <MiniCard
              accent="purple"
              icon={<Gauge className="w-5 h-5" />}
              title="Adaptive difficulty"
              desc="Questions scale up as your performance improves."
            />
            <MiniCard
              accent="cyan"
              icon={<MessageSquareText className="w-5 h-5" />}
              title="Actionable feedback"
              desc="Get pinpoint suggestions: structure, gaps, and next topics."
            />
            <MiniCard
              accent="teal"
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Confidence builder"
              desc="Track readiness and repeat weak areas until solid."
            />
          </div>

          {/* readiness strip */}
          <div className="relative mt-8 rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Interview readiness</p>
              <span className="text-xs text-gray-400">This week</span>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "62%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-400 to-amber-300 rounded-full"
              />
            </div>

            <p className="mt-3 text-sm text-gray-400">
              Next focus: System design reasoning + STAR behavioral answers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}