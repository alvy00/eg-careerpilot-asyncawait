"use client";

import { Brain, Calendar, TrendingUp, Trophy, Users, Zap } from "lucide-react";

const PrecisionTools = () => {
  const tools = [
    {
      id: 1,
      title: "Smart Roadmaps",
      description:
        "Dynamic learning paths that evolve as you progress and as industry demands shift.",
      icon: Zap,
      iconColor: "text-primary",
      iconBg: "bg-primary/20",
    },
    {
      id: 2,
      title: "AI Mentor",
      description:
        "A 24/7 personal coach that explains complex topics and reviews your projects.",
      icon: Brain,
      iconColor: "text-accent-cyan",
      iconBg: "bg-cyan-500/20",
    },
    {
      id: 3,
      title: "Skill Gap Analysis",
      description:
        "Compare your current skills against real job descriptions to see exactly what's missing.",
      icon: TrendingUp,
      iconColor: "text-accent-purple",
      iconBg: "bg-purple-600/20",
    },
    {
      id: 4,
      title: "Mock Interviews",
      description:
        "Practice technical and behavioral rounds with an AI that provides granular feedback.",
      icon: Users,
      iconColor: "text-primary",
      iconBg: "bg-primary/20",
    },
    {
      id: 5,
      title: "Study Planner",
      description:
        "Automated scheduling that fits your learning into your busy professional life.",
      icon: Calendar,
      iconColor: "text-accent-cyan",
      iconBg: "bg-cyan-500/20",
    },
    {
      id: 6,
      title: "Gamified Learning",
      description:
        "Earn XP, unlock badges, and climb leaderboards while mastering new technologies.",
      icon: Trophy,
      iconColor: "text-accent-purple",
      iconBg: "bg-purple-600/20",
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 px-6 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl lg:text-5xl font-bold text-white/90">
            Precision Tools for{" "}
            <span className="text-accent-cyan">Career Growth</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Everything you need to level up your professional life, powered by
            LLMs.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.id}
                className="glass-card rounded-2xl p-6 lg:p-8 group hover:scale-105 hover:bg-white/[0.08] transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`${tool.iconBg} rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className={`${tool.iconColor} w-8 h-8`} />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-semibold text-white/90 mb-3">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrecisionTools;
