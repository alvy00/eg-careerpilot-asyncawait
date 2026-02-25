"use client";

import { useState } from "react";
import { ChevronDown, Zap } from "lucide-react";

export default function RoadmapSection() {
  const [level, setLevel] = useState("Beginner");
  const [hours, setHours] = useState("5 hours");
  const [duration, setDuration] = useState("4 weeks");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#0c1220] to-[#0a0f1c] text-white px-6">
      
      {/* Glow Background Effect */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-4xl w-full text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold">
          Generate Your Personalized{" "}
          <span className="text-orange-500">Roadmap</span>
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Tell us what you want to learn and how much time you can invest.
          Our AI will build a structured learning plan tailored to you.
        </p>

        {/* Card */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Input */}
          <div className="text-left mb-6">
            <label className="text-sm text-gray-400 uppercase tracking-wider">
              What do you want to master?
            </label>

            <input
              type="text"
              placeholder="e.g., Become a Frontend Developer with React"
              className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Select Fields */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">

            {/* Level */}
            <div className="text-left">
              <label className="text-sm text-gray-400 uppercase tracking-wider">
                Current Level
              </label>
              <div className="relative mt-2">
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option className="bg-gray-900 text-white">Beginner</option>
                  <option className="bg-gray-900 text-white">Intermediate</option>
                  <option className="bg-gray-900 text-white">Advanced</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Hours */}
            <div className="text-left">
              <label className="text-sm text-gray-400 uppercase tracking-wider">
                Hours / Week
              </label>
              <div className="relative mt-2">
                <select
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option className="bg-gray-900 text-white">5 hours</option>
                  <option className="bg-gray-900 text-white">10 hours</option>
                  <option className="bg-gray-900 text-white">15 hours</option>
                  <option className="bg-gray-900 text-white">20+ hours</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Duration */}
            <div className="text-left">
              <label className="text-sm text-gray-400 uppercase tracking-wider">
                Completion Time
              </label>
              <div className="relative mt-2">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option className="bg-gray-900 text-white">4 weeks</option>
                  <option className="bg-gray-900 text-white">8 weeks</option>
                  <option className="bg-gray-900 text-white">12 weeks</option>
                  <option className="bg-gray-900 text-white">24 weeks</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="text-left mb-6">
            <button className="text-gray-400 text-sm hover:text-white transition">
              + Advanced Settings
            </button>
          </div>

          {/* Button */}
          <button className="w-full md:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 transition rounded-full font-semibold flex items-center justify-center gap-2 mx-auto shadow-lg shadow-orange-500/30">
            Generate My AI Roadmap
            <Zap size={18} />
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Your roadmap will be generated in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}