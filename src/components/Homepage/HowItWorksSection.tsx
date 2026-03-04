"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Map, Users, ClipboardCheck } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function Glow({
  className = "",
  color = "from-cyan-400/30 via-teal-400/10 to-transparent",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -inset-12 blur-3xl opacity-60 ${className}`}
    >
      <div className={`h-full w-full bg-gradient-to-br ${color}`} />
    </div>
  );
}

function StepCard({
  step,
  title,
  desc,
  icon,
  accent = "cyan",
}: {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent?: "cyan" | "teal" | "purple" | "orange";
}) {
  const accents: Record<string, string> = {
    cyan: "bg-cyan-500/15 text-cyan-200 border-cyan-400/20",
    teal: "bg-teal-500/15 text-teal-200 border-teal-400/20",
    purple: "bg-violet-500/15 text-violet-200 border-violet-400/20",
    orange: "bg-orange-500/15 text-orange-200 border-orange-400/20",
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl overflow-hidden"
    >
      <Glow
        className="opacity-35"
        color={
          accent === "cyan"
            ? "from-cyan-400/25 via-teal-400/10 to-transparent"
            : accent === "teal"
            ? "from-teal-400/25 via-cyan-400/10 to-transparent"
            : accent === "purple"
            ? "from-violet-400/25 via-purple-400/10 to-transparent"
            : "from-orange-400/25 via-amber-300/10 to-transparent"
        }
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${accents[accent]}`}>
          {icon}
        </div>
        <span className="text-xs tracking-widest text-gray-400">{step}</span>
      </div>

      <div className="relative mt-4">
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="mt-2 text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>

      <div className="relative mt-5 h-[1px] w-full bg-white/10" />
      <div className="relative mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">Fast setup</span>
        <span className="text-xs text-gray-400">Guided flow</span>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-xs tracking-widest text-gray-400 mb-3">HOW IT WORKS</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
            <Sparkles className="text-cyan-300" />
            A simple flow from roadmap to interview readiness
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl">
            Choose your target role, get a personalized roadmap, learn with guidance, then practice interviews with feedback.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-4 gap-6"
        >
          <StepCard
            step="STEP 01"
            accent="cyan"
            icon={<Map className="w-5 h-5" />}
            title="Pick a target role"
            desc="Select a career path and define your goal clearly."
          />
          <StepCard
            step="STEP 02"
            accent="teal"
            icon={<Sparkles className="w-5 h-5" />}
            title="Generate your roadmap"
            desc="Get milestones, weekly plans, and curated learning steps."
          />
          <StepCard
            step="STEP 03"
            accent="purple"
            icon={<Users className="w-5 h-5" />}
            title="Talk to mentors"
            desc="Get feedback, guidance, and course-correction when stuck."
          />
          <StepCard
            step="STEP 04"
            accent="orange"
            icon={<ClipboardCheck className="w-5 h-5" />}
            title="Practice interviews"
            desc="Simulate real rounds and improve with actionable feedback."
          />
        </motion.div>
      </div>
    </section>
  );
}