import React from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Briefcase,
  Sparkles,
} from "lucide-react";

export default function Login() {
  return (
    // Base Background: #0A0C1B
    <div className="min-h-screen bg-[#0A0C1B] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Radial Gradients */}
      <div className="absolute inset-0 z-0">
        {/* Primary Glow: #0F172A as base with Indigo 20% overlay */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, #4F46E533 0%, #0F172A 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, #4F46E533 0%, #0F172A 70%)",
          }}
        />
      </div>
      {/* --- Side Decorative Images/Elements --- */}
      {/* Left Image: Smart Resume Analysis */}
      <div className="hidden lg:flex absolute left-[5%] top-1/2 -translate-y-1/2 flex-col items-center opacity-20 select-none pointer-events-none">
        <div className="w-32 h-44 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-xl flex items-center justify-center mb-4">
          <div className="flex flex-col items-center">
            <Briefcase className="w-12 h-12 text-orange-500 mb-2" />
            <div className="w-8 h-1 bg-white/20 rounded-full mb-1" />
            <div className="w-6 h-1 bg-white/10 rounded-full" />
          </div>
        </div>
        <span className="text-[10px] text-white font-bold uppercase tracking-[0.3em]">
          Smart Resume Analysis
        </span>
      </div>

      {/* Right Image: Career GPS */}
      <div className="hidden lg:flex absolute right-[5%] top-1/2 -translate-y-1/2 flex-col items-center opacity-20 select-none pointer-events-none">
        <div className="w-40 h-40 bg-white/5 rounded-full border border-white/5 flex items-center justify-center mb-4 relative">
          <Sparkles className="w-12 h-12 text-orange-500" />
          <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-spin-slow" />
        </div>
        <span className="text-[10px] text-white font-bold uppercase tracking-[0.3em]">
          Career GPS
        </span>
      </div>
      {/* -------------------------------------- */}

      {/* Main Login Card */}
      <div className="w-full max-w-[440px] z-10">
        <div className="bg-[#161B22]/40 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 shadow-2xl">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20 mb-4">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white rotate-45" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              CareerPilot AI
            </h1>
            <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-[0.2em] font-semibold">
              Your AI-Powered Career GPS
            </p>
          </div>

          <form className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white text-gray-900 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400 border-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white text-gray-900 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400 border-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center space-x-2 text-gray-400 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-0 focus:ring-offset-0"
                />
                <span className="group-hover:text-gray-300">Remember me</span>
              </label>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-400 font-bold transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button className="w-full bg-[#F06022] hover:bg-[#FF7A43] text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-600/30">
              <span>Login to CareerPilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
              <span className="bg-[#1a1f26]/0 px-4 text-gray-600">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button className="w-full bg-[#1C2128] hover:bg-[#252B33] text-white py-3.5 rounded-xl border border-white/5 flex items-center justify-center space-x-3 transition-all border-b-2 border-b-white/10">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="G"
            />
            <span className="text-sm font-semibold">Continue with Google</span>
          </button>

          <p className="text-center text-sm text-gray-500 mt-10">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-orange-500 font-bold hover:text-orange-400 transition-colors"
            >
              Sign up for free
            </a>
          </p>
        </div>

        {/* Bottom Trust Badges */}
        <div className="flex justify-center space-x-12 mt-10">
          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-gray-600" />
            <span>Enterprise Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Zap className="w-4 h-4 text-orange-500" />
            <span>AI Optimized</span>
          </div>
        </div>
      </div>
    </div>
  );
}
