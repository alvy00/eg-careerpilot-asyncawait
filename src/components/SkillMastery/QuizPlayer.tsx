"use client";

import Timer from "@/components/SkillMastery/Timer";
import { QuizQuestion } from "@/utils/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import {
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Send,
    HelpCircle,
    CheckCircle,
    Sparkles,
    BookOpen,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface QuizPlayerProps {
    quizData: {
        _id: string;
        topic: string;
        difficulty: string;
        questions: QuizQuestion[];
        timeLimit: number;
    };
    onSubmit: (answers: any[]) => Promise<void>;
}

export default function QuizPlayer({ quizData, onSubmit }: QuizPlayerProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const questions = quizData.questions;
    const currentQ = questions[currentQuestion];

    const handleAutoSubmit = useCallback(async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        const submissionAnswers = questions.map((q, idx) => ({
            questionId: q.id,
            userAnswer: answers[idx] || null,
            timeSpent: 0,
        }));
        try {
            await onSubmit(submissionAnswers);
        } catch (error) {
            console.error("Auto-submit error:", error);
        }
    }, [questions, answers, onSubmit, isSubmitting]);

    useEffect(() => {
        if (timeRemaining <= 0) handleAutoSubmit();
    }, [timeRemaining, handleAutoSubmit]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAnswerSelect = (optionId: string) => {
        setAnswers({ ...answers, [currentQuestion]: optionId });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1)
            setCurrentQuestion(currentQuestion + 1);
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
    };

    const handleManualSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        const submissionAnswers = questions.map((q, idx) => ({
            questionId: q.id,
            userAnswer: answers[idx] || null,
            timeSpent: 0,
        }));
        try {
            await onSubmit(submissionAnswers);
        } catch (error) {
            console.error("Submit error:", error);
            setIsSubmitting(false);
        }
    };

    const answeredCount = Object.keys(answers).length;
    const isTimeWarning = timeRemaining < 300; // 5 minutes warning

    const containerVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.05, duration: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 },
        },
    } as const;

    if (showReview) {
        return (
            <ReviewPage
                questions={questions}
                answers={answers}
                onConfirm={handleManualSubmit}
                onBack={() => setShowReview(false)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Header Sticky Navigation */}
            <div className="sticky top-0 z-40 bg-card-bg/85 backdrop-blur-md border-b border-card-border/80 px-6 py-4 transition-all">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <h2 className="text-lg font-bold text-foreground tracking-tight line-clamp-1">
                                {quizData.topic}
                            </h2>
                        </div>
                        <p className="text-xs text-muted font-medium">
                            Question{" "}
                            <span className="text-foreground">
                                {currentQuestion + 1}
                            </span>{" "}
                            of {questions.length}
                        </p>
                    </div>
                    <Timer
                        timeRemaining={timeRemaining}
                        isWarning={isTimeWarning}
                        onTimeUp={handleAutoSubmit}
                    />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
                {/* Visual Progress Track */}
                <div className="space-y-3">
                    <div className="w-full h-2.5 bg-card-border/50 rounded-full overflow-hidden p-[2px]">
                        <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted font-medium">
                            Progress Bar
                        </span>
                        <span className="text-foreground font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                            {answeredCount} / {questions.length} Selected
                        </span>
                    </div>
                </div>

                {/* Primary Question Grid and Sidebar Menu */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Active Question Body */}
                    <div className="lg:col-span-3 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{
                                    opacity: 0,
                                    y: -15,
                                    transition: { duration: 0.15 },
                                }}
                                className="space-y-8"
                            >
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide">
                                        <Sparkles className="w-3 h-3" />
                                        <span>{currentQ.difficulty}</span>
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-foreground leading-snug tracking-tight">
                                        {currentQ.question}
                                    </h3>
                                </div>

                                <div className="space-y-3.5">
                                    {currentQ.options.map((option, index) => {
                                        const isSelected =
                                            answers[currentQuestion] ===
                                            option.id;
                                        return (
                                            <motion.button
                                                key={option.id}
                                                variants={itemVariants}
                                                onClick={() =>
                                                    handleAnswerSelect(
                                                        option.id,
                                                    )
                                                }
                                                whileHover={{
                                                    scale: 1.01,
                                                    y: -1,
                                                }}
                                                whileTap={{ scale: 0.99 }}
                                                className={`w-full p-4.5 rounded-xl border-2 transition-all duration-300 text-left flex items-center justify-between group shadow-sm ${
                                                    isSelected
                                                        ? "bg-primary/10 border-primary ring-4 ring-primary/5"
                                                        : "bg-card-bg border-card-border hover:border-primary/40 hover:bg-body-bg/35"
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                                            isSelected
                                                                ? "bg-primary border-primary"
                                                                : "border-muted group-hover:border-primary/50"
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`font-medium transition-colors ${
                                                            isSelected
                                                                ? "text-foreground font-semibold"
                                                                : "text-foreground/90"
                                                        }`}
                                                    >
                                                        {option.text}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-muted/60 opacity-0 group-hover:opacity-100 transition-opacity pr-2 font-mono">
                                                    Key {index + 1}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Actions */}
                        <div className="flex gap-3 justify-between items-center pt-6 border-t border-card-border/60">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                className="px-5 py-3 rounded-xl bg-card-bg hover:bg-body-bg text-foreground border border-card-border disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 font-semibold transition text-sm shadow-sm"
                            >
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </button>

                            <div className="flex gap-2">
                                {currentQuestion < questions.length - 1 ? (
                                    <button
                                        onClick={handleNext}
                                        className="px-5 py-3 rounded-xl bg-card-bg hover:bg-body-bg text-foreground border border-card-border flex items-center gap-2 font-semibold transition text-sm shadow-sm"
                                    >
                                        Next{" "}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowReview(true)}
                                        className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold transition text-sm flex items-center gap-2 shadow-md shadow-primary/25"
                                    >
                                        <Send className="w-4 h-4" /> Review &
                                        Submit
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Jump-Grid Selector Sidebar */}
                    <div className="hidden lg:block bg-card-bg border border-card-border/80 rounded-xl p-5 space-y-4 shadow-sm">
                        <p className="text-xs font-bold text-muted uppercase tracking-wider">
                            Diagnostic Map
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            {questions.map((_, index) => {
                                const isAnswered = answers[index] !== undefined;
                                const isActive = currentQuestion === index;
                                return (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentQuestion(index)
                                        }
                                        className={`p-2 text-xs font-bold rounded-lg border text-center transition-all ${
                                            isActive
                                                ? "bg-primary text-white border-primary shadow-sm"
                                                : isAnswered
                                                  ? "bg-primary/10 border-primary/30 text-primary"
                                                  : "bg-body-bg border-card-border text-muted hover:border-primary/50"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewPage({
    questions,
    answers,
    onConfirm,
    onBack,
}: {
    questions: QuizQuestion[];
    answers: { [key: number]: string };
    onConfirm: () => Promise<void>;
    onBack: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = questions.length - answeredCount;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onConfirm();
        } catch (error) {
            console.error("Submit error:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-background p-6 flex items-center justify-center"
        >
            <div className="max-w-2xl w-full py-8 space-y-8">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-2 shadow-sm">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
                        Review Your Diagnostics
                    </h2>
                    <p className="text-muted text-base max-w-md mx-auto">
                        Verify your submissions before confirming validation of
                        your roadmap skills.
                    </p>
                </div>

                {/* Score Stats Board */}
                <div className="bg-card-bg rounded-2xl border border-card-border p-6 shadow-sm">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center space-y-1">
                            <p className="text-3xl font-extrabold text-emerald-500">
                                {answeredCount}
                            </p>
                            <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                                Answered
                            </p>
                        </div>
                        <div className="text-center space-y-1 border-x border-card-border/80">
                            <p
                                className={`text-3xl font-extrabold ${unansweredCount > 0 ? "text-rose-500" : "text-muted"}`}
                            >
                                {unansweredCount}
                            </p>
                            <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                                Unanswered
                            </p>
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-3xl font-extrabold text-primary">
                                {questions.length}
                            </p>
                            <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                                Total Items
                            </p>
                        </div>
                    </div>
                </div>

                {/* Warning Alert Banner */}
                {unansweredCount > 0 && (
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/35 flex gap-4 shadow-inner"
                    >
                        <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
                        <div className="space-y-1">
                            <p className="text-amber-500 font-bold text-sm tracking-wide">
                                Warning: {unansweredCount} item
                                {unansweredCount > 1 ? "s are" : " is"}{" "}
                                unanswered
                            </p>
                            <p className="text-xs text-amber-500/80 leading-relaxed font-medium">
                                Unanswered questions will evaluate as zero
                                points. We highly recommend returning to select
                                a baseline response.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Confirm Options Footer */}
                <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-4">
                    <button
                        onClick={onBack}
                        disabled={isSubmitting}
                        className="px-8 py-4 rounded-xl bg-card-bg hover:bg-body-bg text-foreground border border-card-border font-bold transition text-sm shadow-sm disabled:opacity-50"
                    >
                        Return to Quiz
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-10 py-4 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Verifying...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4 fill-current text-primary-foreground" />
                                <span>Submit & Get Results</span>
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
