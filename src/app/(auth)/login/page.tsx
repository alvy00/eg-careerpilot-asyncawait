"use client";

import React, { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Briefcase,
  Sparkles,
  Loader2,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { auth, googleProvider } from "@/firebase/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  // MongoDB Sync Logic (important for Google Login)
  const syncUserToMongo = async (user: any) => {
    const userInfo = {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      role: "user", // Default role if new user
    };

    try {
      await fetch("/api/users", {
        method: "PUT", // PUT method will update if user exists, otherwise create new
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
    } catch (err) {
      console.error("MongoDB Sync Error:", err);
    }
  };

  // Email/Password login logic
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google login logic
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      await syncUserToMongo(result.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading)
    return (
      <div className="min-h-screen bg-[#0A0C1B] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0A0C1B] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Radial Gradients */}
      <div className="absolute inset-0 z-0">
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

      {/* Decorative Elements */}
      <div className="hidden lg:flex absolute left-[5%] top-1/2 -translate-y-1/2 flex-col items-center opacity-20 select-none pointer-events-none">
        <div className="w-32 h-44 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-xl flex items-center justify-center mb-4">
          <Briefcase className="w-12 h-12 text-orange-500" />
        </div>
        <span className="text-[10px] text-white font-bold uppercase tracking-[0.3em]">
          Smart Resume Analysis
        </span>
      </div>

      <div className="hidden lg:flex absolute right-[5%] top-1/2 -translate-y-1/2 flex-col items-center opacity-20 select-none pointer-events-none">
        <div className="w-40 h-40 bg-white/5 rounded-full border border-white/5 flex items-center justify-center mb-4 relative">
          <Sparkles className="w-12 h-12 text-orange-500" />
          <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-spin-slow" />
        </div>
        <span className="text-[10px] text-white font-bold uppercase tracking-[0.3em]">
          Career GPS
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[440px] z-10">
        <div className="bg-[#161B22]/40 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20 mb-4">
              <Rocket className="text-white w-6 h-6 fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              CareerPilot AI
            </h1>
            <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-[0.2em] font-semibold">
              Your AI-Powered Career GPS
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-[10px] text-center mb-4 bg-red-500/10 py-2 rounded-lg border border-red-500/20 font-bold uppercase tracking-widest">
              {error}
            </p>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-[#1C2128]/60 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1C2128]/60 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 transition-all text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] px-1 font-bold uppercase tracking-wider text-gray-500">
              <label className="flex items-center space-x-2 cursor-pointer group hover:text-gray-300 transition-colors">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-orange-500 hover:text-orange-400">
                Forgot password?
              </a>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#F06022] hover:bg-[#FF7A43] text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-600/30 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Login to CareerPilot</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
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

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-[#1C2128] hover:bg-[#252B33] text-white py-3.5 rounded-xl border border-white/5 flex items-center justify-center space-x-3 transition-all border-b-2 border-b-white/10 disabled:opacity-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4 h-4"
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
        <div className="flex justify-center space-x-12 mt-10 opacity-40">
          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Zap className="w-4 h-4 text-orange-500" />
            <span>AI Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
