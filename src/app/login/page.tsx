import React from "react";
import Link from "next/link";
import { Mail, Eye, Apple, Chrome, Sparkles } from "lucide-react";

export default function LoginPage() {
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
            Welcome Back Creative!
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            We Are Happy To See You Again
          </p>
        </div>

        {/* Navigation Toggle */}
        <div className="bg-[#F3F4F6] p-1 rounded-full flex mb-8">
          <div className="flex-1 bg-[#4A85F6] text-white py-2.5 rounded-full text-sm font-medium text-center shadow-sm">
            Sign in
          </div>
          <Link
            href="/signup"
            className="flex-1 text-gray-500 py-2.5 rounded-full text-sm font-medium text-center hover:text-gray-700 transition-all"
          >
            Sign Up
          </Link>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
            />
            <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-5 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
            />
            <Eye className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded-full border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500">Remember me</span>
          </label>
          <a
            href="#"
            className="text-sm font-semibold text-[#4A85F6] hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        <button className="w-full bg-[#4A85F6] hover:bg-blue-600 text-white py-5 rounded-[30px] mt-8 font-semibold text-lg transition-all shadow-lg shadow-blue-500/20">
          Login
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
          <button className="w-full flex items-center justify-center gap-3 bg-[#1A1C1E] text-white py-4 rounded-full hover:bg-black transition-all">
            <Apple className="w-5 h-5 fill-current" />{" "}
            <span>Log in with Apple</span>
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 py-4 rounded-full hover:bg-gray-50 transition-all">
            <Chrome className="w-5 h-5 text-blue-500" />{" "}
            <span>Log in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
