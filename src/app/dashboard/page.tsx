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
  Compass,
  Mic2,
  Clock,
  Zap,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Users,
  ShieldAlert,
  LayoutDashboard,
  MessageSquare,
  Database,
} from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = dbUser?.role === "admin";

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;
      try {
        const idToken = await user.getIdToken();
        const res = await fetch(`/api/users?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status === 404) {
          console.warn("User data syncing...");
          return;
        }
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F06022]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      {/* 1. Header Section (Universal) */}
      <div className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#161B22] p-8 rounded-[32px] border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F06022]/5 blur-[100px] -z-10" />
        <div className="flex items-center gap-6">
          <img
            src={
              user?.photoURL ||
              dbUser?.photo ||
              `https://ui-avatars.com/api/?name=${dbUser?.name || "User"}`
            }
            className="w-24 h-24 rounded-2xl border border-white/10 object-cover"
            alt="Profile"
          />
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {isAdmin
                ? "Admin Control Center"
                : `Welcome back, ${dbUser?.name?.split(" ")[0]}!`}
            </h2>
            <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-[#F06022]" />
              {isAdmin
                ? "System is stable. Monitor global activities below."
                : "Your AI career growth is on track."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/10">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${isAdmin ? "bg-blue-500" : "bg-[#F06022]"}`}
          />
          <span className="text-white text-xs font-bold uppercase tracking-widest">
            {isAdmin ? "Administrator" : "Active Learner"}
          </span>
        </div>
      </div>

      {/* 2. Stats Grid (Conditional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isAdmin ? (
          <>
            <StatCard
              icon={<Users />}
              color="blue"
              label="Total Users"
              value={dbUser?.totalUsers || "0"}
              desc="Registered members"
            />
            <StatCard
              icon={<Activity />}
              color="green"
              label="System Load"
              value={dbUser?.adminStats?.systemLoad || "0ms"} //dynamic latency value
              desc="DB Response latency"
            />
            <StatCard
              icon={<ShieldAlert />}
              color="orange"
              label="Security"
              value={dbUser?.adminStats?.security || "Secure"} // dynamic security status
              desc={
                dbUser?.adminStats?.security === "Secure"
                  ? "No threats detected"
                  : "Check logs"
              }
            />
            <StatCard
              icon={<TrendingUp />}
              color="purple"
              label="Growth"
              value={dbUser?.adminStats?.growth || "0%"} // dynamic growth percentage
              desc="New users last 30 days"
            />
          </>
        ) : (
          <>
            <StatCard
              icon={<Compass />}
              color="blue"
              label="Roadmaps"
              value={dbUser?.stats?.roadmapsCount || "0"}
              desc="Paths generated"
            />
            <StatCard
              icon={<Mic2 />}
              color="green"
              label="Interviews"
              value={dbUser?.stats?.interviewsCount || "0"}
              desc="Mock sessions"
            />
            <StatCard
              icon={<Clock />}
              color="orange"
              label="Focus Time"
              value={`${dbUser?.stats?.focusTime || 0}h`}
              desc="Deep work hours"
            />
            <StatCard
              icon={<Zap />}
              color="purple"
              label="Skills"
              value={dbUser?.stats?.skillsMastered || "0"}
              desc="Verified skills"
            />
          </>
        )}
      </div>

      {/* 3. Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#161B22]/40 border border-white/10 rounded-[32px] p-8">
          <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
            {isAdmin ? (
              <Shield className="text-blue-400" />
            ) : (
              <LayoutDashboard className="text-[#F06022]" />
            )}
            {isAdmin ? "System Management" : "Quick Access Tools"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isAdmin ? (
              <>
                <QuickLink
                  href="/dashboard/all-users"
                  title="User Management"
                  desc="Control all system users"
                  icon={<Users />}
                />
                <QuickLink
                  href="/dashboard/logs"
                  title="System Logs"
                  desc="View server activities"
                  icon={<Activity />}
                />
              </>
            ) : (
              <>
                <QuickLink
                  href="/dashboard/ai-mentor"
                  title="AI Mentor"
                  desc="Chat with Gemini"
                  icon={<MessageSquare />}
                />
                <QuickLink
                  href="/dashboard/interview-bank"
                  title="Question Bank"
                  desc="Browse topics"
                  icon={<Database />}
                />
              </>
            )}
          </div>
        </div>

        <Link
          href={isAdmin ? "/dashboard/settings" : "/dashboard/roadmap"}
          className={`rounded-[32px] p-8 flex flex-col justify-between group relative overflow-hidden ${isAdmin ? "bg-primary/50" : "bg-[#F06022]"}`}
        >
          <div className="relative z-10">
            <h3 className="text-white text-3xl font-black leading-tight">
              {isAdmin ? "System\nSettings" : "New AI\nRoadmap"}
            </h3>
            <p className="text-white/80 text-sm mt-2">
              {isAdmin ? "Configure platform rules." : "Plot your career move."}
            </p>
          </div>
          <div className="bg-white text-black py-4 rounded-2xl font-bold text-center mt-6">
            {isAdmin ? "Open Settings" : "Start Generation"}
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

// --- Internal Helpers ---
function StatCard({ icon, label, value, desc, color }: any) {
  const colors: any = {
    blue: "text-blue-400 bg-blue-500/10",
    green: "text-green-400 bg-green-500/10",
    orange: "text-orange-400 bg-orange-500/10",
    purple: "text-purple-400 bg-purple-500/10",
  };
  return (
    <div className="bg-[#161B22]/40 border border-white/5 p-6 rounded-[32px] hover:bg-[#1C222D] transition-all">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colors[color]}`}
      >
        {icon}
      </div>
      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
        {label}
      </p>
      <h4 className="text-3xl font-bold text-white my-1">{value}</h4>
      <p className="text-[10px] text-gray-500">{desc}</p>
    </div>
  );
}

function QuickLink({ href, title, desc, icon }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
    >
      <div className="p-3 bg-white/5 rounded-xl text-[#F06022]">{icon}</div>
      <div>
        <p className="text-white text-sm font-bold">{title}</p>
        <p className="text-gray-500 text-[10px]">{desc}</p>
      </div>
    </Link>
  );
}
