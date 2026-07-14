"use client";

import React, { useState } from "react";
import { auth } from "@/firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import {
    Mail,
    ArrowLeft,
    Loader2,
    Send,
    CheckCircle2,
    Lock,
} from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage(
                "A password reset link has been sent to your email. Please check your inbox or spam folder.",
            );
        } catch (err: any) {
            if (
                err.code === "auth/user-not-found" ||
                err.code === "auth/invalid-credential"
            ) {
                setError("No account found with this email address.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0C1B] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-orange-500/30 selection:text-orange-200">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute top-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-70 animate-[pulse_8s_ease-in-out_infinite]"
                    style={{
                        background:
                            "radial-gradient(circle, #4F46E520 0%, #0F172A 70%)",
                    }}
                />
                <div
                    className="absolute bottom-[-15%] left-[-15%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-40 animate-[pulse_10s_ease-in-out_infinite_1s]"
                    style={{
                        background:
                            "radial-gradient(circle, #ff6b0010 0%, #0F172A 70%)",
                    }}
                />
            </div>

            <div className="w-full max-w-[440px] z-10 group/card transition-all duration-500 flex flex-col">
                {/* PC-Only Animated Back Link */}
                <Link
                    href="/login"
                    className="hidden lg:flex self-start mb-4 items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-orange-400 transition-all duration-300 group/back pl-2 disabled:pointer-events-none"
                    style={{ pointerEvents: loading ? "none" : "auto" }}
                >
                    <ArrowLeft className="w-4 h-4 transform group-hover/back:-translate-x-1 transition-transform duration-300" />
                    <span>Back to Login</span>
                </Link>

                {/* Card Panel */}
                <div className="bg-[#161B22]/30 backdrop-blur-2xl border border-white/10 group-hover/card:border-white/20 rounded-[32px] p-8 md:p-10 shadow-2xl text-center relative transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-orange-500/5 before:to-transparent before:opacity-0 group-hover/card:before:opacity-100 before:transition-opacity before:duration-500">
                    <div className="mb-8 transform transition-transform duration-500 group-hover/card:-translate-y-1">
                        <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20 transition-transform duration-300 group-hover/card:scale-105">
                            <Lock className="w-7 h-7 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight uppercase tracking-[0.05em]">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-400 text-xs mt-2 max-w-[280px] mx-auto font-medium leading-relaxed">
                            Enter your email and we'll send you a link to reset
                            your password.
                        </p>
                    </div>

                    {/* Success Message */}
                    {message && (
                        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 text-left animate-[fadeIn_0.4s_ease-out]">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-emerald-400 text-xs font-medium leading-relaxed">
                                {message}
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-400 text-[10px] text-center mb-6 bg-red-500/10 py-2.5 rounded-lg border border-red-500/20 font-bold uppercase tracking-widest animate-[shake_0.4s_ease-in-out]">
                            {error}
                        </p>
                    )}

                    {!message ? (
                        <form onSubmit={handleReset} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 transition-colors group-focus-within/email:text-orange-400">
                                    Email Address
                                </label>
                                <div className="relative group/email">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/email:text-orange-500 group-focus-within/email:scale-110 transition-all duration-300" />
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="example@gmail.com"
                                        className="w-full bg-[#1C2128]/40 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 focus:bg-[#1C2128]/80 transition-all duration-300 text-sm focus:shadow-[0_0_20px_rgba(249,115,22,0.05)] placeholder:text-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Action Submit Button */}
                            <button
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 active:scale-[0.98] shadow-lg hover:shadow-orange-500/20 group/btn cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 border border-orange-500/20 relative overflow-hidden"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                        <span>Send Reset Link</span>
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <Link
                            href="/login"
                            className="inline-block mt-2 bg-[#1C2128]/50 hover:bg-[#252B33] text-white py-3.5 px-6 rounded-xl border border-white/5 transition-all duration-300 text-xs font-bold uppercase tracking-widest active:scale-[0.98] w-full border-b-2 border-b-white/10 hover:border-b-white/20"
                        >
                            Back to Login
                        </Link>
                    )}

                    {/* Bottom Navigation Element */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group/ret"
                        >
                            <ArrowLeft className="w-4 h-4 transform group-hover/ret:-translate-x-1 transition-transform duration-300" />
                            <span>Return to Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
