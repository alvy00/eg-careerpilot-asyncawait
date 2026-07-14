"use client";

import React, { useEffect, useState } from "react";
import {
    Mail,
    Lock,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    Zap,
    Briefcase,
    Sparkles,
    Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/firebase/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

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

    const handleAuthSuccess = async (firebaseUser: any) => {
        try {
            const idToken = await firebaseUser.getIdToken();

            const syncPromise = fetch("/api/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    photo: firebaseUser.photoURL,
                }),
            });

            const sessionPromise = fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            await Promise.all([syncPromise, sessionPromise]);
            router.refresh();
        } catch (err) {
            console.error("Auth Success Sync Error:", err);
            setError("Failed to sync account data.");
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            await handleAuthSuccess(result.user);
        } catch (err: any) {
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await handleAuthSuccess(result.user);
        } catch (err: any) {
            setError("Google sign-in failed.");
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
        <div className="min-h-screen bg-[#0A0C1B] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-orange-500/30 selection:text-orange-200">
            {/* Background Radial Gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] rounded-full blur-[140px] opacity-70 animate-[pulse_8s_ease-in-out_infinite]"
                    style={{
                        background:
                            "radial-gradient(circle, #4F46E525 0%, #0F172A 70%)",
                    }}
                />
                <div
                    className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-70 animate-[pulse_10s_ease-in-out_infinite_1s]"
                    style={{
                        background:
                            "radial-gradient(circle, #ff6b0015 0%, #0F172A 70%)",
                    }}
                />
            </div>

            {/* Decorative Floating Side Panels */}
            <div className="hidden lg:flex absolute left-[6%] top-1/2 -translate-y-1/2 flex-col items-center opacity-20 select-none pointer-events-none animate-[bounce_4s_ease-in-out_infinite]">
                <div className="w-32 h-44 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md shadow-inner">
                    <Briefcase className="w-12 h-12 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                </div>
                <span className="text-[10px] text-white font-bold uppercase tracking-[0.3em] drop-shadow-md">
                    Smart Resume Analysis
                </span>
            </div>

            <div className="hidden lg:flex absolute right-[6%] top-1/2 -translate-y-1/2 flex-col items-center opacity-20 select-none pointer-events-none animate-[bounce_4s_ease-in-out_infinite_1.5s]">
                <div className="w-40 h-40 bg-white/5 rounded-full border border-white/5 flex items-center justify-center mb-4 relative backdrop-blur-md">
                    <Sparkles className="w-12 h-12 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite]" />
                </div>
                <span className="text-[10px] text-white font-bold uppercase tracking-[0.3em] drop-shadow-md">
                    Career GPS
                </span>
            </div>

            {/* Main Login Content Wrapper */}
            <div className="w-full max-w-[440px] z-10 group/card transition-all duration-500 flex flex-col">
                {/* Animated Back Button - hidden on mobile, flex on PC panels (lg viewports) */}
                <Link
                    href="/"
                    className="hidden lg:flex self-start mb-4 items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-orange-400 transition-all duration-300 group/back pl-2 disabled:pointer-events-none"
                    style={{ pointerEvents: loading ? "none" : "auto" }}
                >
                    <ArrowLeft className="w-4 h-4 transform group-hover/back:-translate-x-1 transition-transform duration-300" />
                    <span>Back to Home</span>
                </Link>

                {/* Card Component */}
                <div className="bg-[#161B22]/30 backdrop-blur-2xl border border-white/10 group-hover/card:border-white/20 rounded-[32px] p-10 shadow-2xl relative transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-orange-500/5 before:to-transparent before:opacity-0 group-hover/card:before:opacity-100 before:transition-opacity before:duration-500">
                    {/* Logo Heading Container */}
                    <div className="flex flex-col items-center mb-10 transform transition-transform duration-500 group-hover/card:-translate-y-1">
                        <Link
                            href="/"
                            className="transition-transform duration-300 hover:scale-105 active:scale-95 mb-3"
                        >
                            <div className="flex items-center gap-3 cursor-pointer">
                                <img
                                    src="/careerpilot.png"
                                    alt="CareerPilot"
                                    className="h-9 w-9 rounded-xl object-cover shadow-md"
                                />
                                <span className="font-extrabold text-xl tracking-tight text-white">
                                    Career{" "}
                                    <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                                        Pilot
                                    </span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-semibold">
                            Your AI-Powered Career GPS
                        </p>
                    </div>

                    {error && (
                        <p className="text-red-400 text-[10px] text-center mb-4 bg-red-500/10 py-2.5 rounded-lg border border-red-500/20 font-bold uppercase tracking-widest animate-[shake_0.4s_ease-in-out]">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleEmailLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 transition-colors group-focus-within/email:text-orange-400">
                                Email Address
                            </label>
                            <div className="relative group/email">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/email:text-orange-500 group-focus-within/email:scale-110 transition-all duration-300" />
                                <input
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="example@email.com"
                                    className="w-full bg-[#1C2128]/40 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 focus:bg-[#1C2128]/80 transition-all duration-300 placeholder:text-gray-600 text-sm focus:shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 transition-colors group-focus-within/pass:text-orange-400">
                                Password
                            </label>
                            <div className="relative group/pass">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/pass:text-orange-500 group-focus-within/pass:scale-110 transition-all duration-300" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full bg-[#1C2128]/40 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none border border-white/5 focus:border-orange-500/50 focus:bg-[#1C2128]/80 transition-all duration-300 text-sm focus:shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] px-1 font-bold uppercase tracking-wider text-gray-500">
                            <label className="flex items-center space-x-2 cursor-pointer group/check hover:text-gray-300 transition-colors">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5 rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-0 cursor-pointer transition-transform group-hover/check:scale-105"
                                />
                                <span className="transition-colors duration-200">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-white hover:text-orange-400 transition-colors duration-300 underline-offset-4 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 active:scale-[0.98] shadow-lg hover:shadow-orange-500/20 group/btn cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none border border-orange-500/20 relative overflow-hidden"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                            ) : (
                                <>
                                    <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-1">
                                        Login to CareerPilot
                                    </span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
                            <span className="bg-[#12161D] px-4 text-gray-600 transition-colors duration-500 group-hover/card:text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full bg-[#1C2128]/50 hover:bg-[#252B33] text-white py-3.5 rounded-xl border border-white/5 flex items-center justify-center space-x-3 transition-all duration-300 border-b-2 border-b-white/10 hover:border-b-white/20 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] hover:shadow-xl group/google"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            className="w-4 h-4 transition-transform duration-300 group-hover/google:scale-110"
                            alt="G"
                        />
                        <span className="text-sm font-semibold">
                            Continue with Google
                        </span>
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-10">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-orange-500 font-bold hover:text-orange-400 transition-colors duration-300 underline-offset-4 hover:underline"
                        >
                            Sign up for free
                        </Link>
                    </p>
                </div>

                {/* Bottom Trust Badges */}
                <div className="flex justify-center space-x-12 mt-10 opacity-30 group-hover/card:opacity-50 transition-opacity duration-500">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4 text-emerald-500/80" />
                        <span>Secure</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <Zap className="w-4 h-4 text-orange-500 animate-pulse" />
                        <span>AI Powered</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
