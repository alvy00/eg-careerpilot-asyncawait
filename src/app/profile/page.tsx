"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  Sparkles,
  BookOpen,
  BrainCircuit,
  History,
  ChevronRight,
  Save,
} from "lucide-react";

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-[#07172e] p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- LEFT SIDEBAR: Profile Edit Section --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl border border-white/20">
            {/* Profile Picture Update */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-gray-300" />
                </div>
              </div>
              <label className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-all border-4 border-white">
                <Camera className="w-4 h-4" />
                <input type="file" className="hidden" />
              </label>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1A1C1E]">
                Student Name
              </h2>
              <p className="text-gray-500 text-sm">AI Engineering Student</p>
            </div>

            {/* Edit Forms */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-2">
                  FULL NAME
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Student Name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 outline-none text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400/20 outline-none text-gray-900"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-2">
                  NEW PASSWORD
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400/20 outline-none text-gray-900"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl mt-4 font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

          {/* AI Assistant Quick Stat */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[30px] p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="w-6 h-6 text-cyan-300" />
              <h3 className="font-bold text-lg">AI Learning Buddy</h3>
            </div>
            <p className="text-blue-100 text-sm mb-4">
              You have asked 124 questions this week. Keep it up!
            </p>
            <div className="bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-300 h-full w-[75%]"></div>
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT: Learning Progress --- */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-[30px] text-white">
              <BookOpen className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-3xl font-bold">04</p>
              <p className="text-gray-400 text-sm">Active Courses</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-[30px] text-white">
              <Sparkles className="w-6 h-6 text-yellow-400 mb-2" />
              <p className="text-3xl font-bold">12</p>
              <p className="text-gray-400 text-sm">AI Credits Left</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-[30px] text-white">
              <History className="w-6 h-6 text-green-400 mb-2" />
              <p className="text-3xl font-bold">85%</p>
              <p className="text-gray-400 text-sm">Avg. Score</p>
            </div>
          </div>

          {/* Active Courses List */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1A1C1E]">
                Current Learning Progress
              </h3>
              <button className="text-blue-600 text-sm font-bold hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-6">
              {[
                {
                  name: "Deep Learning Fundamentals",
                  progress: 75,
                  color: "bg-blue-500",
                },
                {
                  name: "Natural Language Processing",
                  progress: 40,
                  color: "bg-purple-500",
                },
                {
                  name: "AI Ethics & Safety",
                  progress: 95,
                  color: "bg-green-500",
                },
              ].map((course, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      {course.name}
                    </span>
                    <span className="text-sm font-bold text-gray-500">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div
                      className={`${course.color} h-full transition-all duration-1000`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent AI Interaction History */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl border border-white/20">
            <h3 className="text-xl font-bold text-[#1A1C1E] mb-6">
              Recent AI Chat History
            </h3>
            <div className="space-y-4">
              {[
                "How does backpropagation work?",
                "Explain Transformer architecture in simple terms",
                "Best practices for training LLMs",
              ].map((chat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 italic font-serif text-sm">
                      AI
                    </div>
                    <p className="text-gray-700 text-sm font-medium">{chat}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
