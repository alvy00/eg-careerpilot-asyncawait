"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Shield,
  Mail,
  Calendar,
  Activity,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      //  User role and details from DB
      fetch(`/api/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setDbUser(data);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading)
    return <div className="text-white p-10">Loading Overview...</div>;

  return (
    <div className="p-6 space-y-8">
      {/* 1. Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#161B22] to-transparent p-8 rounded-[24px] border border-white/5">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={dbUser?.photo || "/default-avatar.png"}
              alt="Profile"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500/50"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#0A0C1B] flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Welcome back, {dbUser?.name}!
            </h2>
            <p className="text-gray-400 text-sm">
              Track your career progress and AI analysis here.
            </p>
          </div>
        </div>
        <div className="bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/20">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
            Account Status: Active
          </span>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Shield className="text-blue-500" />}
          label="Your Role"
          value={dbUser?.role || "User"}
          desc="Permissions level"
        />
        <StatCard
          icon={<Activity className="text-green-500" />}
          label="Profile Strength"
          value="85%"
          desc="Based on AI analysis"
        />
        <StatCard
          icon={<LayoutDashboard className="text-purple-500" />}
          label="Analyses Done"
          value="12"
          desc="Resumes scanned"
        />
        <StatCard
          icon={<Calendar className="text-orange-500" />}
          label="Joined"
          value={new Date(dbUser?.createdAt).toLocaleDateString()}
          desc="Member since"
        />
      </div>

      {/* 3. Detailed Info Table/Card */}
      <div className="bg-[#161B22]/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-6">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-orange-500" />
          User Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
            <Mail className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Email
              </p>
              <p className="text-white text-sm">{dbUser?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
            <LayoutDashboard className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Unique ID
              </p>
              <p className="text-white text-xs truncate max-w-[200px]">
                {dbUser?.uid}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, label, value, desc }: any) {
  return (
    <div className="bg-[#161B22]/40 border border-white/10 p-6 rounded-[24px] hover:border-orange-500/30 transition-all group">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
        {label}
      </p>
      <h4 className="text-2xl font-bold text-white my-1">{value}</h4>
      <p className="text-[10px] text-gray-600 font-medium">{desc}</p>
    </div>
  );
}
