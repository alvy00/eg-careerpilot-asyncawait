"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Search,
    X,
    Clock,
    ChevronRight,
    Loader2,
    HelpCircle,
    AlertTriangle,
    BookOpen,
    Layers,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Difficulty = "Easy" | "Medium" | "Hard";

type AIQuestion = {
    question: string;
    difficulty: Difficulty;
    shortAnswer: string;
    detailedAnswer: string;
    followUps: string[];
    commonMistakes: string[];
    tags: string[];
};

type AISet = {
    topic: string;
    level: string;
    questions: AIQuestion[];
};

export default function InterviewBankAIPage() {
    const { user } = useAuth();
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AISet | null>(null);
    const [active, setActive] = useState<AIQuestion | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const fetchHistory = async () => {
        if (!user?.uid) return;
        setHistoryLoading(true);
        try {
            const res = await fetch(
                `/api/interview-bank/generate?userId=${user.uid}`,
            );
            const json = await res.json();
            if (res.ok && Array.isArray(json)) setHistory(json);
        } catch (err) {
            console.error("Failed to fetch history:", err);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        if (user?.uid) fetchHistory();
    }, [user?.uid]);

    const generate = async () => {
        if (!topic.trim()) return;
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/interview-bank/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic,
                    userId: user?.uid,
                    userEmail: user?.email,
                    role: "Subject Matter Expert",
                    level: "Comprehensive (Beginner to Pro)",
                }),
            });
            const json = await res.json();
            if (!res.ok)
                throw new Error(json.message || "Failed to generate content");
            setData(json.questionBank);
            await fetchHistory();
            setTimeout(() => {
                resultRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 300);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen text-foreground pb-20 bg-background overflow-hidden">
            {/* ── LOADING OVERLAY ─────────────────────────────────── */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
                    >
                        <div className="relative w-64 h-1.5 bg-card-border/60 rounded-full overflow-hidden mb-8 p-[1px]">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.8,
                                ease: "easeInOut",
                            }}
                            className="text-center space-y-2"
                        >
                            <h2 className="text-2xl font-black tracking-tight uppercase text-foreground">
                                Assembling Concepts
                            </h2>
                            <p className="text-primary text-xs font-mono uppercase tracking-[0.25em]">
                                Synthesizing Core Data: {topic}...
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto px-6 pt-12 space-y-16">
                {/* ── HEADER ──────────────────────────────────────────── */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase shadow-sm"
                    >
                        <Sparkles
                            size={12}
                            className="text-primary animate-pulse"
                        />
                        <span>CareerPilot Intelligence</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                        Interview <span className="text-primary">Bank</span>
                    </h1>
                    <p className="text-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        Generate customized interview simulations, detailed
                        concept metrics, and optimal study outlines instantly
                        for any professional domain.
                    </p>
                </div>

                {/* ── INPUT BLOCK ──────────────────────────────────────── */}
                <div className="max-w-3xl mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-45 transition duration-700" />
                    <div className="relative flex flex-col sm:flex-row gap-3 bg-card-bg border border-card-border/80 p-2.5 rounded-2xl shadow-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/80" />
                            <input
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && generate()
                                }
                                placeholder="Ex: Advanced Systems Engineering, React Concurrency..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-body-bg border border-card-border text-foreground placeholder:text-muted/70 outline-none focus:border-primary/60 transition-colors text-sm font-medium"
                            />
                        </div>
                        <button
                            onClick={generate}
                            disabled={loading || !topic.trim()}
                            className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold transition-all disabled:opacity-40 active:scale-[0.98] text-sm shadow-md shadow-primary/10 flex items-center justify-center gap-2"
                        >
                            Generate Master Set
                        </button>
                    </div>
                    {error && (
                        <p className="text-center mt-4 text-rose-400 text-xs font-medium tracking-wide">
                            {error}
                        </p>
                    )}
                </div>

                {/* ── HISTORY SESSIONS ─────────────────────────────────── */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-card-border pb-3.5">
                        <h2 className="text-lg font-bold flex items-center gap-2.5 text-foreground tracking-tight">
                            <Clock size={18} className="text-primary" /> Recent
                            Diagnostic Modules
                        </h2>
                        {historyLoading && (
                            <Loader2
                                size={16}
                                className="animate-spin text-primary"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {history.length > 0
                            ? history.slice(0, 4).map((item, idx) => (
                                  <motion.div
                                      key={item._id || idx}
                                      whileHover={{ y: -4, scale: 1.01 }}
                                      onClick={() => {
                                          setData(item.questionBank);
                                          setTopic(item.topic);
                                          setTimeout(() => {
                                              resultRef.current?.scrollIntoView(
                                                  {
                                                      behavior: "smooth",
                                                      block: "start",
                                                  },
                                              );
                                          }, 150);
                                      }}
                                      className="p-5 rounded-xl bg-card-bg border border-card-border/80 hover:border-primary/40 cursor-pointer group flex flex-col justify-between transition-all shadow-sm"
                                  >
                                      <div className="space-y-2">
                                          <p className="text-[10px] text-primary font-mono font-bold uppercase tracking-wider">
                                              {item.createdAt
                                                  ? new Date(
                                                        item.createdAt,
                                                    ).toLocaleDateString()
                                                  : "Active State"}
                                          </p>
                                          <h4 className="font-extrabold line-clamp-2 group-hover:text-primary transition-colors text-sm text-foreground/90 uppercase tracking-wide">
                                              {item.topic}
                                          </h4>
                                      </div>
                                      <div className="mt-5 flex items-center text-[10px] font-bold text-muted uppercase tracking-wider group-hover:text-primary transition-colors pt-2 border-t border-card-border/40">
                                          Load Question Bank{" "}
                                          <ChevronRight
                                              size={12}
                                              className="ml-1"
                                          />
                                      </div>
                                  </motion.div>
                              ))
                            : !historyLoading && (
                                  <div className="col-span-full py-10 text-center border border-dashed border-card-border rounded-xl text-muted text-sm font-medium">
                                      No active tracking history observed.
                                      Generate a new module to begin
                                      diagnostics.
                                  </div>
                              )}
                    </div>
                </section>

                {/* ── EVALUATION RESULTS MATRIX ─────────────────────────── */}
                <div ref={resultRef} className="pt-6 scroll-mt-24">
                    {data ? (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-card-bg border border-card-border p-6 md:p-8 rounded-2xl shadow-xl space-y-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border/60 pb-5">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                                            Active Workspace
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground uppercase">
                                            {data.topic}
                                        </h2>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-body-bg border border-card-border text-xs font-semibold text-primary shadow-inner shrink-0 self-start sm:self-auto">
                                        <Layers size={14} />
                                        <span>
                                            {data.level} •{" "}
                                            {data.questions?.length || 0} Core
                                            Topics
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {data.questions?.map((q, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.01, y: -2 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => setActive(q)}
                                            className="p-5 rounded-xl bg-body-bg/40 border border-card-border/80 hover:border-primary/30 transition-all cursor-pointer shadow-sm group flex flex-col justify-between space-y-4"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span
                                                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                                            q.difficulty ===
                                                            "Hard"
                                                                ? "bg-rose-500/10 text-rose-500"
                                                                : q.difficulty ===
                                                                    "Medium"
                                                                  ? "bg-amber-500/10 text-amber-500"
                                                                  : "bg-emerald-500/10 text-emerald-500"
                                                        }`}
                                                    >
                                                        {q.difficulty}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-muted/50 font-bold">
                                                        #
                                                        {(idx + 1)
                                                            .toString()
                                                            .padStart(2, "0")}
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-bold leading-snug text-foreground/90 group-hover:text-primary transition-colors">
                                                    {q.question}
                                                </h3>
                                                <p className="text-xs text-muted/80 line-clamp-2 italic leading-relaxed">
                                                    "{q.shortAnswer}"
                                                </p>
                                            </div>

                                            {/* Display tags inline inside the preview card components */}
                                            {q.tags && q.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-card-border/30">
                                                    {q.tags
                                                        .slice(0, 3)
                                                        .map((tag, tIdx) => (
                                                            <span
                                                                key={tIdx}
                                                                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-card-bg border border-card-border/60 text-muted"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        !loading && (
                            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-card-border rounded-2xl bg-card-bg/50 px-4 text-center">
                                <BookOpen
                                    size={36}
                                    className="text-muted mb-3.5 opacity-80"
                                />
                                <p className="text-muted text-sm font-semibold max-w-sm">
                                    Initialize analysis above to configure a
                                    master subject repository.
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* ── ANALYTICAL FOCUS DETAIL MODAL ─────────────────────── */}
                <AnimatePresence>
                    {active && (
                        <motion.div
                            className="fixed inset-0 z-[150] flex items-center justify-center px-4 sm:px-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div
                                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                                onClick={() => setActive(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 180,
                                }}
                                className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl bg-card-bg border border-card-border shadow-2xl overflow-hidden"
                            >
                                {/* Modal Header Container */}
                                <div className="flex items-start justify-between p-6 bg-card-bg border-b border-card-border shrink-0">
                                    <div className="space-y-1.5 max-w-[85%]">
                                        <span className="text-primary text-[10px] font-bold tracking-widest uppercase block">
                                            {active.difficulty} Difficulty Level
                                        </span>
                                        <h2 className="text-xl md:text-2xl font-black leading-snug text-foreground tracking-tight">
                                            {active.question}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setActive(null)}
                                        className="p-2 rounded-xl bg-body-bg border border-card-border hover:border-primary/40 transition text-muted hover:text-foreground shrink-0 shadow-sm"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Modal Content Scroll Frame */}
                                <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-card-bg/30">
                                    {/* Performance Tags Block */}
                                    {active.tags && active.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 items-center">
                                            <span className="text-[10px] font-bold text-muted/60 uppercase tracking-wider mr-1">
                                                Classification:
                                            </span>
                                            {active.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-body-bg border border-card-border text-foreground/80"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="p-5 rounded-xl bg-body-bg border border-card-border space-y-3 shadow-inner">
                                            <div className="flex items-center gap-2 text-primary">
                                                <HelpCircle size={16} />
                                                <h4 className="text-[10px] font-black tracking-wider uppercase">
                                                    Executive Abstract
                                                </h4>
                                            </div>
                                            <p className="text-foreground/90 text-sm leading-relaxed">
                                                {active.shortAnswer}
                                            </p>
                                        </div>

                                        <div className="p-5 rounded-xl bg-rose-500/[0.03] border border-rose-500/15 space-y-3">
                                            <div className="flex items-center gap-2 text-rose-500">
                                                <AlertTriangle size={16} />
                                                <h4 className="text-[10px] font-black tracking-wider uppercase">
                                                    Anti-Patterns & Pitfalls
                                                </h4>
                                            </div>
                                            <ul className="space-y-2.5">
                                                {active.commonMistakes?.map(
                                                    (m, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-xs text-foreground/80 flex gap-2.5 leading-relaxed"
                                                        >
                                                            <span className="text-rose-500/80 shrink-0 font-bold">
                                                                •
                                                            </span>
                                                            <span>{m}</span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-xl bg-body-bg border border-card-border space-y-3.5 shadow-inner">
                                        <h4 className="text-[10px] font-black text-primary tracking-wider uppercase">
                                            Architectural Breakdown
                                        </h4>
                                        <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                                            {active.detailedAnswer}
                                        </p>
                                    </div>

                                    {active.followUps &&
                                        active.followUps.length > 0 && (
                                            <div className="p-5 rounded-xl bg-primary/[0.02] border border-primary/10 space-y-3">
                                                <h4 className="text-[10px] font-black text-primary tracking-wider uppercase">
                                                    Secondary Enquiries
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {active.followUps.map(
                                                        (f, i) => (
                                                            <div
                                                                key={i}
                                                                className="text-xs text-foreground/80 bg-body-bg/60 p-3.5 rounded-xl border border-card-border/80 leading-relaxed font-medium"
                                                            >
                                                                {f}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
