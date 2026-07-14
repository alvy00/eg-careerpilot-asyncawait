"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    Zap,
    Sparkles,
    CheckCircle2,
    Flame,
    Award,
    HelpCircle,
} from "lucide-react";
import { useState } from "react";

interface QuizConfiguratorProps {
    topic: string;
    onBack: () => void;
    onStart: (difficulty: string, questionCount: number) => void;
}

export default function QuizConfigurator({
    topic,
    onBack,
    onStart,
}: QuizConfiguratorProps) {
    const [difficulty, setDifficulty] = useState("Intermediate");
    const [questionCount, setQuestionCount] = useState(20);

    // Advanced, gamified progression descriptions matching skill mastery
    const difficultyLevels = [
        {
            name: "Basic",
            description: "Assess foundational terms and concepts",
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        },
        {
            name: "Intermediate",
            description: "Evaluate core functional applications",
            icon: <Flame className="w-5 h-5 text-amber-500" />,
        },
        {
            name: "Advanced",
            description: "Stress-test deep critical-thinking boundaries",
            icon: <Award className="w-5 h-5 text-rose-500" />,
        },
        {
            name: "Mixed",
            description: "Adaptive mix to baseline your true capacity",
            icon: <HelpCircle className="w-5 h-5 text-violet-500" />,
        },
    ];

    const questionOptions = [
        { count: 15, time: "10 mins", load: "Light diagnostic" },
        { count: 20, time: "15 mins", load: "Standard assessment" },
        { count: 30, time: "20 mins", load: "Deep-dive validation" },
    ];

    // Stagger configs matching the design of the TopicSelector
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto space-y-10 py-6"
        >
            {/* Header Content Section */}
            <motion.div variants={itemVariants} className="space-y-4">
                <button
                    onClick={onBack}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Selection
                </button>

                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-sm">
                        <Sparkles size={12} />
                        <span>Configure Evaluation</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
                        Customize Your Diagnostic
                    </h2>
                    <p className="text-muted text-base leading-relaxed">
                        Targeting skill:{" "}
                        <span className="text-foreground font-semibold border-b-2 border-primary/40 pb-0.5">
                            {topic}
                        </span>
                    </p>
                </div>
            </motion.div>

            {/* Difficulty Level Selection */}
            <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-bold text-foreground tracking-wide">
                    1. Select Mastery Level
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {difficultyLevels.map((level) => {
                        const isSelected = difficulty === level.name;
                        return (
                            <motion.button
                                key={level.name}
                                onClick={() => setDifficulty(level.name)}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-start gap-4 shadow-sm ${
                                    isSelected
                                        ? "bg-primary/10 border-primary ring-4 ring-primary/5"
                                        : "bg-card-bg border-card-border hover:border-primary/40 hover:bg-body-bg/40"
                                }`}
                            >
                                <div
                                    className={`p-2.5 rounded-lg transition-colors ${
                                        isSelected
                                            ? "bg-primary/20"
                                            : "bg-body-bg"
                                    }`}
                                >
                                    {level.icon}
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold text-foreground">
                                        {level.name}
                                    </p>
                                    <p className="text-sm text-muted leading-snug">
                                        {level.description}
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Number of Questions Selection */}
            <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-bold text-foreground tracking-wide">
                    2. Choose Diagnostic Length
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {questionOptions.map((option) => {
                        const isSelected = questionCount === option.count;
                        return (
                            <motion.button
                                key={option.count}
                                onClick={() => setQuestionCount(option.count)}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm ${
                                    isSelected
                                        ? "bg-primary/10 border-primary ring-4 ring-primary/5"
                                        : "bg-card-bg border-card-border hover:border-primary/40 hover:bg-body-bg/40"
                                }`}
                            >
                                <p className="text-3xl font-extrabold text-foreground">
                                    {option.count}
                                </p>
                                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                                    {option.load}
                                </p>
                                <span className="text-xs text-primary font-medium flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-primary/10">
                                    <Zap className="w-3 h-3 fill-current" />{" "}
                                    {option.time}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Launch Button Section */}
            <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                    onClick={() => onStart(difficulty, questionCount)}
                    className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-primary/25 text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Zap className="w-5 h-5 fill-current animate-pulse" />
                    <span>Launch Assessment</span>
                    <span className="opacity-70 text-sm font-normal">
                        ({questionCount} items • ~
                        {questionCount === 15
                            ? "10"
                            : questionCount === 20
                              ? "15"
                              : "20"}{" "}
                        mins)
                    </span>
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
