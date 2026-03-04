"use client";

import React from "react";
import { motion } from "framer-motion";
import { Route, CalendarCheck, BookOpen, ArrowRight, Layers3 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function RoadmapGeneratorFeatureSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr_360px] items-stretch">
        {/* Main card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-xl overflow-hidden"
        >
          {/* ambient glow */}
          <div aria-hidden className="absolute -inset-12 blur-3xl opacity-50">
            <div className="h-full w-full bg-gradient-to-br from-cyan-400/25 via-teal-400/10 to-transparent" />
          </div>

          {/* floating dots */}
          <FloatingDot className="w-10 h-10 top-10 right-10" />
          <FloatingDot className="w-14 h-14 bottom-10 right-24" />
          <FloatingDot className="w-8 h-8 top-24 right-44" />

          <div className="relative">
            <p className="text-xs tracking-widest text-gray-400 mb-3">FEATURE</p>

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center text-cyan-200">
                <Route className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-semibold text-white">AI Roadmap Generator</h3>
            </div>

            <p className="mt-4 text-gray-400 max-w-2xl leading-relaxed">
              Turn your goal into a clear plan. Get milestones, a weekly schedule, and practical learning steps
              based on your current skills.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill text="Personalized milestones" />
              <Pill text="Skill-gap mapped" />
              <Pill text="Curated resources" />
              <Pill text="Weekly schedule" />
              <Pill text="Progress-ready" />
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="flex items-center gap-2 text-cyan-300">
                  <CalendarCheck className="w-5 h-5" />
                  <span className="text-sm font-medium text-white">Weekly Plan</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">A realistic 7-day breakdown you can follow.</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="flex items-center gap-2 text-teal-300">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium text-white">Resources</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">Topic-wise learning + practice suggestions.</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="flex items-center gap-2 text-violet-300">
                  <Layers3 className="w-5 h-5" />
                  <span className="text-sm font-medium text-white">Milestones</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">Clear checkpoints to measure progress.</p>
              </div>
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

        {/* Preview */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl"
        >
          <p className="text-xs tracking-widest text-gray-400 mb-4">ROADMAP PREVIEW</p>

          <div className="space-y-4">
            {[
              { title: "Week 1", desc: "Foundations + mini project", w: "w-[70%]" },
              { title: "Week 2", desc: "Core skills + hands-on practice", w: "w-[56%]" },
              { title: "Week 3", desc: "Build a full project + review", w: "w-[38%]" },
            ].map((x, idx) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">{x.title}</h4>
                  <span className="text-xs text-gray-400">Milestone</span>
                </div>
                <p className="mt-1 text-sm text-gray-400">{x.desc}</p>
                <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full ${x.w} bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}