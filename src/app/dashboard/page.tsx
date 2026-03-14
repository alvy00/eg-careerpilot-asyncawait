"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
    User,
    Shield,
    Mail,
    Calendar,
    Activity,
    LayoutDashboard,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
    const { user } = useAuth();
    const [dbUser, setDbUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user?.email) return;

            try {
                // ID Token from Firebase User (important for auth)
                const idToken = await user.getIdToken();

                const res = await fetch(`/api/users?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();
                setDbUser(data);
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const containerVars = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVars = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={containerVars}
            initial="initial"
            animate="animate"
            className="p-6 space-y-8"
        >
            {/* 1. Welcome Header */}
            <motion.div
                variants={itemVars}
                className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#161B22] p-8 rounded-[32px] border border-white/5 shadow-2xl"
            >
                {/* Subtle Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] -z-10" />

                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <img
                            src={
                                user?.photoURL ||
                                dbUser?.photo ||
                                `https://ui-avatars.com/api/?name=${dbUser?.name || user?.email || "User"}&background=F06022&color=fff`
                            }
                            alt="Profile"
                            className="relative w-24 h-24 rounded-2xl object-cover border border-white/10"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-7 h-7 rounded-full border-[4px] border-[#161B22] flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Welcome back, {dbUser?.name?.split(" ")[0]}!
                        </h2>
                        <p className="text-gray-400 mt-1 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Your career path is{" "}
                            <span className="text-white font-medium">
                                85% optimized
                            </span>{" "}
                            this week.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">
                        Pro Membership: Active
                    </span>
                </div>
            </motion.div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<Shield className="w-5 h-5" />}
                    color="blue"
                    label="Authority"
                    value={dbUser?.role || "Free Tier"}
                    desc="Access Permissions"
                    delay={0.1}
                />
                <StatCard
                    icon={<Activity className="w-5 h-5" />}
                    color="green"
                    label="Profile Strength"
                    value="85%"
                    desc="+12% from last month"
                    trend="up"
                    delay={0.2}
                />
                <StatCard
                    icon={<LayoutDashboard className="w-5 h-5" />}
                    color="purple"
                    label="AI Scans"
                    value="12"
                    desc="Remaining: Unlimited"
                    delay={0.3}
                />
                <StatCard
                    icon={<Calendar className="w-5 h-5" />}
                    color="orange"
                    label="Member Since"
                    value={new Date(dbUser?.createdAt).toLocaleDateString(
                        undefined,
                        {
                            month: "short",
                            year: "numeric",
                        },
                    )}
                    desc="Early Access User"
                    delay={0.4}
                />
            </div>

            {/* 3. Integration & Quick Actions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    variants={itemVars}
                    className="lg:col-span-2 bg-[#161B22]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-white font-bold text-xl flex items-center gap-3">
                            <User className="w-6 h-6 text-primary" />
                            Account Integrity
                        </h3>
                        <button className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">
                            Manage Security
                        </button>
                    </div>

                    <div className="space-y-4">
                        <DetailItem
                            icon={<Mail className="w-5 h-5" />}
                            label="Primary Email"
                            value={dbUser?.email}
                        />
                        <DetailItem
                            icon={<Shield className="w-5 h-5" />}
                            label="System Identifier"
                            value={dbUser?.uid}
                            isMono
                        />
                    </div>
                </motion.div>

                {/* Quick Action Card */}
                <motion.div
                    variants={itemVars}
                    className="bg-gradient-to-br from-primary to-blue-400 rounded-[32px] p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                        <ArrowUpRight size={80} strokeWidth={3} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-white text-2xl font-black mb-2 leading-tight">
                            Generate New
                            <br />
                            Roadmap
                        </h3>
                        <p className="text-orange-100/80 text-sm">
                            Let AI plot your next career move based on your
                            updated profile.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/roadmap"
                        className="bg-white text-primary w-full py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-50 transition-colors relative z-10 text-center"
                    >
                        Start AI Engine
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Upgraded Stat Card
function StatCard({ icon, label, value, desc, color, trend, delay }: any) {
    const colors: any = {
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        green: "text-green-400 bg-green-500/10 border-green-500/20",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="bg-[#161B22]/40 border border-white/5 p-6 rounded-[32px] hover:border-white/20 transition-all hover:bg-[#1C222D] group shadow-lg"
        >
            <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${colors[color]}`}
            >
                {icon}
            </div>
            <p className="text-gray-500 text-[11px] font-black uppercase tracking-[2px]">
                {label}
            </p>
            <div className="flex items-end gap-2 my-2">
                <h4 className="text-3xl font-black text-white">{value}</h4>
                {trend && (
                    <span className="text-green-500 text-xs font-bold mb-1 flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />{" "}
                        {trend === "up" && "12%"}
                    </span>
                )}
            </div>
            <p className="text-xs text-gray-500 font-medium">{desc}</p>
        </motion.div>
    );
}

// Detail Item Helper
function DetailItem({ icon, label, value, isMono }: any) {
    return (
        <div className="flex items-center gap-4 p-5 bg-white/[0.03] hover:bg-white/[0.06] transition-colors rounded-2xl border border-white/5 group">
            <div className="text-gray-500 group-hover:text-primary transition-colors">
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                    {label}
                </p>
                <p
                    className={`text-white text-sm truncate ${isMono ? "font-mono" : "font-medium"}`}
                >
                    {value || "Not provided"}
                </p>
            </div>
        </div>
    );
}
