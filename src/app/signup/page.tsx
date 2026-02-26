"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Rocket,
  Zap,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
// Firebase & Context
import { auth, googleProvider } from "@/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Google sign-up failed.");
    }
  };

  if (authLoading)
    return (
      <div className="min-h-screen bg-[#0A0C1B] flex items-center justify-center text-white">
        Loading...
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

      {/* Signup Card */}
      <div className="w-full max-w-[480px] z-10">
        <div className="bg-[#161B22]/40 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20 mb-4">
              <Rocket className="text-white w-6 h-6 fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Join CareerPilot AI
            </h1>
            <p className="text-gray-400 text-xs mt-2 font-medium">
              Professional Profile Creation
            </p>
          </div>
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-[10px] text-center mb-4 bg-red-500/10 py-2 rounded-lg border border-red-500/20 font-bold uppercase tracking-widest">
              {error}
            </p>
          )}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="w-full bg-[#1C2128]/60 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 focus:bg-[#1C2128] transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Your Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full bg-[#1C2128]/60 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 focus:bg-[#1C2128] transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#1C2128]/60 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 focus:bg-[#1C2128] transition-all text-xs"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Confirm
                </label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#1C2128]/60 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 focus:bg-[#1C2128] transition-all text-xs"
                  />
                </div>
              </div>
            </div>

            {/* TOS Checkbox */}
            <label className="flex items-start space-x-3 text-[10px] text-gray-500 leading-relaxed cursor-pointer group">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-0"
              />
              <span>
                I agree to the{" "}
                <span className="text-orange-500 font-bold hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-orange-500 font-bold hover:underline">
                  Privacy Policy
                </span>{" "}
                regarding AI processing.
              </span>
            </label>

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full bg-[#F06022] hover:bg-[#FF7A43] text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-600/30 group"
            >
              <span>
                {loading ? "Creating Account..." : "Create My Account"}
              </span>
              <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
              <span className="bg-[#161B22]/0 px-4 text-gray-600">
                Fast-track with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full bg-[#1C2128] hover:bg-[#252B33] text-white py-3.5 rounded-xl border border-white/5 flex items-center justify-center space-x-3 transition-all"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4 h-4"
              alt="G"
            />
            <span className="text-sm font-semibold">Sign up with Google</span>
          </button>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-orange-500 font-bold hover:text-orange-400"
            >
              Login here
            </a>
          </p>
        </div>

        {/* Footer Badges */}
        <div className="flex justify-between px-4 mt-8 opacity-40">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Secure</span>
            </div>
            <span className="text-[8px] text-gray-600 mt-1 font-medium">
              AES-256 ENCRYPTION STANDARD
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
              <Zap className="w-4 h-4 text-orange-500 fill-current" />
              <span>AI Optimized</span>
            </div>
            <span className="text-[8px] text-gray-600 mt-1 font-medium">
              NEURAL ENGINE ACCELERATED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
