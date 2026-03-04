"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Route,
  CalendarCheck,
  BookOpen,
  ArrowRight,
  Layers3,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ✅ fixed
    },
  },
};

function Pill({ text }: { text: string }) {
  return (
    <span className="text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
      {text}
    </span>
  );
}

function FloatingDot({ className }: { className: string }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full bg-white/10 border border-white/10 ${className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1], // ✅ fixed
      }}
    />
  );
}

export default function RoadmapGeneratorFeatureSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr_360px] items-stretch">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-xl overflow-hidden"
        >
          <div aria-hidden className="absolute -inset-12 blur-3xl opacity-50">
            <div className="h-full w-full bg-gradient-to-br from-cyan-400/25 via-teal-400/10 to-transparent" />
          </div>

          <FloatingDot className="w-10 h-10 top-10 right-10" />
          <FloatingDot className="w-14 h-14 bottom-10 right-24" />
          <FloatingDot className="w-8 h-8 top-24 right-44" />

          <div className="relative">
            <p className="text-xs tracking-widest text-gray-400 mb-3">
              FEATURE
            </p>

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center text-cyan-200">
                <Route className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-semibold text-white">
                AI Roadmap Generator
              </h3>
            </div>

            <p className="mt-4 text-gray-400 max-w-2xl leading-relaxed">
              Turn your goal into a clear plan. Get milestones, a weekly
              schedule, and practical learning steps based on your current
              skills.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill text="Personalized milestones" />
              <Pill text="Skill-gap mapped" />
              <Pill text="Curated resources" />
              <Pill text="Weekly schedule" />
              <Pill text="Progress-ready" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500/20 text-cyan-100 border border-cyan-400/20 px-5 py-3 hover:bg-cyan-500/30 transition"
            >
              Generate my roadmap <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl"
        >
          <p className="text-xs tracking-widest text-gray-400 mb-4">
            ROADMAP PREVIEW
          </p>
        </motion.div>
      </div>
    </section>
  );
}