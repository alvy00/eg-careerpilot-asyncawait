"use client";
import InterviewHistorySection from "@/components/Progress/InterviewHistorySection";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Progress = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 px-6 py-16">
            <div className="max-w-6xl mx-auto space-y-20">
                {/* ================= INTERVIEW HISTORY ================= */}
                <InterviewHistorySection />

                {/* Quizzes Section remains as you had it... */}
            </div>
        </div>
    );
};

export default Progress;
