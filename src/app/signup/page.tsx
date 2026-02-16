import React from "react";
import Link from "next/link";
import { Mail, Lock, User, Apple, Chrome, Sparkles } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07172e] p-4 font-sans">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-[480px] rounded-[40px] p-10 shadow-xl border border-white/20">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-[#1A1C1E] p-2 rounded-xl">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#1A1C1E]">
            <span className="text-blue-600">C</span>areer{" "}
            <span className="text-blue-600">P</span>ilot
          </h1>
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1A1C1E]">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Join Career Pilot and start your journey
          </p>
        </div>

        {/* Navigation Toggle */}
        <div className="bg-[#F3F4F6] p-1 rounded-full flex mb-8">
          <Link
            href="/login"
            className="flex-1 text-gray-500 py-2.5 rounded-full text-sm font-medium text-center hover:text-gray-700 transition-all"
          >
            Sign in
          </Link>
          <div className="flex-1 bg-[#4A85F6] text-white py-2.5 rounded-full text-sm font-medium text-center shadow-sm">
            Sign Up
          </div>
        </div>

        {/* Signup Form */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-all placeholder:text-gray-400 text-gray-900 font-medium"
            />
            <User className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all placeholder:text-gray-400 text-gray-900 font-medium"
            />
            <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Create Password"
              className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all placeholder:text-gray-400 text-gray-900 font-medium"
            />
            <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <button className="w-full bg-[#4A85F6] hover:bg-blue-600 text-white py-5 rounded-[30px] mt-8 font-semibold text-lg transition-all shadow-lg shadow-blue-500/20">
          Create Account
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-white px-4 text-gray-400 font-medium">OR</span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 py-4 rounded-full hover:bg-gray-50 transition-all">
            <Chrome className="w-5 h-5 text-blue-500" />{" "}
            <span>Sign up with Google</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 px-4">
          By signing up, you agree to our{" "}
          <a href="#" className="underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
