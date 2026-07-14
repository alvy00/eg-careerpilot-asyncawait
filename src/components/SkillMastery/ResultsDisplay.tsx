"use client";

import { motion } from "framer-motion";
import {
    CheckCircle2,
    TrendingUp,
    XCircle,
    Award,
    Sparkles,
    BookOpen,
    MessageSquare,
    ArrowLeft,
    RefreshCw,
    BarChart2,
} from "lucide-react";
import Link from "next/link";

// Added a robust structure for individual answered items
interface Answer {
    questionId: string;
    questionText: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation?: string;
}

interface ResultsDisplayProps {
    score: {
        obtained: number;
        total: number;
        percentage: number;
        correctAnswers: number;
        wrongAnswers: number;
        skipped: number;
    };
    topic: string;
    difficulty: string;
    categoryPerformance: {
        [key: string]: { correct: number; total: number; percentage: number };
    };
    insights: {
        strengths: string[];
        weaknesses: string[];
        recommendedTopics: string[];
    };
    feedback: string;
    level: string;
    answers?: Answer[]; // Added optional answers property to fix type mismatch
}

export default function ResultsDisplay({
    score,
    topic,
    difficulty,
    categoryPerformance,
    insights,
    feedback,
    level,
    answers = [], // Fallback default to prevent potential runtime errors
}: ResultsDisplayProps) {
    const getGrade = (percentage: number) => {
        if (percentage >= 90)
            return {
                grade: "A+",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10 border-emerald-500/30",
            };
        if (percentage >= 80)
            return {
                grade: "A",
                color: "text-emerald-400",
                bg: "bg-emerald-400/10 border-emerald-400/20",
            };
        if (percentage >= 70)
            return {
                grade: "B",
                color: "text-blue-500",
                bg: "bg-blue-500/10 border-blue-500/20",
            };
        if (percentage >= 60)
            return {
                grade: "C",
                color: "text-amber-500",
                bg: "bg-amber-500/10 border-amber-500/20",
            };
        return {
            grade: "F",
            color: "text-rose-500",
            bg: "bg-rose-500/10 border-rose-500/30",
        };
    };

    const { grade, color, bg } = getGrade(score.percentage);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 },
        },
    } as const;

    return (
        <div className="min-h-screen bg-background pb-16 pt-8 px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto space-y-10"
            >
                {/* Header Context Indicator */}
                <motion.div
                    variants={itemVariants}
                    className="text-center space-y-3"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-sm">
                        <Award size={12} />
                        <span>Roadmap Evaluation Complete</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
                        Diagnostic Report
                    </h1>
                    <p className="text-muted max-w-lg mx-auto text-base">
                        Mastery assessment completed for skill domain:{" "}
                        <span className="text-foreground font-semibold border-b-2 border-primary/20 pb-0.5">
                            {topic}
                        </span>
                    </p>
                </motion.div>

                {/* Main Hero Score Panel */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    className="relative bg-card-bg rounded-2xl border border-card-border p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="space-y-4 text-center md:text-left flex-1">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-muted uppercase tracking-widest">
                                Calculated Performance
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
                                {score.percentage}%
                            </h2>
                        </div>
                        <p className="text-muted text-sm leading-relaxed max-w-md">
                            Your conceptual comprehension has been validated
                            against the milestone syllabus. Your next
                            recommended actions are detailed below.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-body-bg border border-card-border/80 text-foreground/80 text-xs font-semibold shadow-inner">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span>
                                Level:{" "}
                                <span className="text-primary">
                                    {level} ({difficulty})
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Central Display Score Grade */}
                    <div className="flex items-center gap-8 pr-4">
                        <div className="w-px h-24 bg-card-border/70 hidden md:block" />
                        <div className="flex items-center gap-6">
                            <div
                                className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center shrink-0 shadow-sm ${bg}`}
                            >
                                <span
                                    className={`text-4xl font-black ${color}`}
                                >
                                    {grade}
                                </span>
                                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mt-1">
                                    Grade
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-black text-foreground">
                                    {score.correctAnswers}
                                    <span className="text-muted/60 text-lg font-bold">
                                        /{score.total}
                                    </span>
                                </p>
                                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                                    Correct Answers
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Score Stats Breakdown Grid */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-primary" />
                        <h3 className="text-lg font-bold text-foreground tracking-wide">
                            Comprehension Summary
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-5 rounded-xl bg-card-bg border border-card-border flex items-center justify-between shadow-sm"
                        >
                            <div className="space-y-1">
                                <span className="text-2xl font-black text-emerald-500">
                                    {score.correctAnswers}
                                </span>
                                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                                    Correct Answers
                                </p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-5 rounded-xl bg-card-bg border border-card-border flex items-center justify-between shadow-sm"
                        >
                            <div className="space-y-1">
                                <span className="text-2xl font-black text-rose-500">
                                    {score.wrongAnswers}
                                </span>
                                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                                    Incorrect Answers
                                </p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-500">
                                <XCircle className="w-5 h-5" />
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-5 rounded-xl bg-card-bg border border-card-border flex items-center justify-between shadow-sm"
                        >
                            <div className="space-y-1">
                                <span className="text-2xl font-black text-muted">
                                    {score.skipped}
                                </span>
                                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                                    Skipped Items
                                </p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-muted/10 text-muted">
                                <BookOpen className="w-5 h-5" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Category performance */}
                {Object.keys(categoryPerformance).length > 0 && (
                    <motion.div
                        variants={itemVariants}
                        className="bg-card-bg rounded-2xl border border-card-border p-6 md:p-8 space-y-6 shadow-sm"
                    >
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-foreground tracking-wide">
                                Sub-Skill Assessment
                            </h3>
                            <p className="text-muted text-xs">
                                Evaluating specific roadmap competencies
                                targeted in this milestone evaluation.
                            </p>
                        </div>
                        <div className="space-y-5.5">
                            {Object.entries(categoryPerformance).map(
                                ([category, data]: [string, any]) => (
                                    <div key={category} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-sm text-foreground/90">
                                                {category}
                                            </p>
                                            <span className="text-xs font-semibold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                                                {data.correct}/{data.total}{" "}
                                                passed • {data.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2.5 bg-card-border/50 rounded-full overflow-hidden p-[1px]">
                                            <motion.div
                                                className={`h-full rounded-full ${
                                                    data.percentage >= 80
                                                        ? "bg-emerald-500"
                                                        : data.percentage >= 60
                                                          ? "bg-amber-500"
                                                          : "bg-rose-500"
                                                }`}
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${data.percentage}%`,
                                                }}
                                                transition={{
                                                    duration: 0.8,
                                                    ease: "easeOut",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Analytical Strengths and Areas of Improvement */}
                <div className="grid md:grid-cols-2 gap-6">
                    {insights.strengths.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ y: -2 }}
                            className="bg-emerald-500/[0.04] border border-emerald-500/20 rounded-2xl p-6 shadow-sm space-y-4"
                        >
                            <h3 className="text-base font-bold text-emerald-500 flex items-center gap-2.5 uppercase tracking-wider text-xs">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />{" "}
                                validated strengths
                            </h3>
                            <ul className="space-y-2.5">
                                {insights.strengths.map((strength, i) => (
                                    <li
                                        key={i}
                                        className="text-foreground/80 text-sm flex items-start gap-2.5 leading-relaxed"
                                    >
                                        <span className="text-emerald-500/80 mt-1 select-none">
                                            •
                                        </span>
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {insights.weaknesses.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ y: -2 }}
                            className="bg-rose-500/[0.04] border border-rose-500/20 rounded-2xl p-6 shadow-sm space-y-4"
                        >
                            <h3 className="text-base font-bold text-rose-500 flex items-center gap-2.5 uppercase tracking-wider text-xs">
                                <TrendingUp className="w-5 h-5 text-rose-500 shrink-0" />{" "}
                                Growth Opportunities
                            </h3>
                            <ul className="space-y-2.5">
                                {insights.weaknesses.map((weakness, i) => (
                                    <li
                                        key={i}
                                        className="text-foreground/80 text-sm flex items-start gap-2.5 leading-relaxed"
                                    >
                                        <span className="text-rose-500/80 mt-1 select-none">
                                            •
                                        </span>
                                        <span>{weakness}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>

                {/* Mentor Feedback Panel */}
                <motion.div
                    variants={itemVariants}
                    className="bg-card-bg rounded-2xl border border-card-border p-6 md:p-8 space-y-4 shadow-sm"
                >
                    <div className="flex items-center gap-2.5 text-primary">
                        <MessageSquare className="w-5 h-5 fill-current text-primary/20" />
                        <h3 className="text-base font-bold text-foreground tracking-wide">
                            Mentor Evaluation Feedback
                        </h3>
                    </div>
                    <blockquote className="text-foreground/85 text-sm md:text-base leading-relaxed border-l-4 border-primary/30 pl-4 py-0.5 italic">
                        "{feedback}"
                    </blockquote>
                </motion.div>

                {/* Navigating Actions Footer */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4.5 justify-center pt-4"
                >
                    <Link
                        href="/dashboard/skill-mastery"
                        className="px-8 py-4 rounded-xl bg-card-bg hover:bg-body-bg text-foreground border border-card-border font-bold transition text-sm flex items-center justify-center gap-2.5 shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4 text-muted/80" /> Take
                        Another Diagnostic
                    </Link>
                    <Link
                        href="/dashboard"
                        className="px-10 py-4 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold transition text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-primary/25"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
