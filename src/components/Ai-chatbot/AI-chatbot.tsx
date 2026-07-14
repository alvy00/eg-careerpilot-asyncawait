"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

interface Message {
    role: "user" | "assistant";
    content: string;
    time: string;
}

function now() {
    return new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
}

function cleanMarkdown(text: string) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/#{1,6}\s/g, "")
        .trim();
}

// Fixed Animation Variants with explicit Typescript definitions
const messageVariants: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 28 },
    },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.12 } },
};

const chipVariants: Variants = {
    initial: { opacity: 0, x: 8 },
    animate: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.03, type: "spring", stiffness: 200 },
    }),
    hover: { scale: 1.03, y: -1 },
    tap: { scale: 0.97 },
};

export default function AiChatbotPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hi! I'm your CareerPilot AI Mentor. Ask me anything about your learning journey, roadmaps, or career goals.",
            time: now(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { data } = useQuery({
        queryKey: ["mentor-roadmaps", user?.uid],
        queryFn: async () => {
            const url = user ? `/api/mentor?userId=${user.uid}` : "/api/mentor";
            const { data } = await axios.get(url);
            return data;
        },
        enabled: !!user,
    });

    const roadmaps: any[] = data?.roadmaps ?? [];

    // Restore history safely
    useEffect(() => {
        if (!data?.history?.length) return;
        const restored: Message[] = data.history.map((h: any) => ({
            role: h.role,
            content: h.content,
            time: new Date(h.createdAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            }),
        }));
        setMessages([
            {
                role: "assistant",
                content:
                    "Hi! I'm your CareerPilot AI Mentor. Ask me anything about your learning journey, roadmaps, or career goals.",
                time: now(),
            },
            ...restored,
        ]);
    }, [data]);

    // Scroll to bottom when messages or typing changes
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, isTyping]);

    // Textarea auto-resize
    useEffect(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 128) + "px";
    }, [input]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isTyping) return;
        const userMsg: Message = { role: "user", content: text, time: now() };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setInput("");
        setIsTyping(true);

        try {
            const { data } = await axios.post("/api/mentor", {
                messages: updated.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
                userId: user?.uid ?? null,
            });
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: cleanMarkdown(data.reply),
                    time: now(),
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I couldn't respond. Please try again.",
                    time: now(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleCopy = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const roadmapChips = roadmaps.slice(0, 5).map((r: any) => ({
        label: r.roadmap?.skill ?? "Roadmap",
        prompt: `Explain my ${r.roadmap?.skill} roadmap in detail — phases, topics, and what I should focus on first.`,
    }));

    const staticChips = [
        {
            label: "Study tip",
            prompt: "Give me a practical study tip for today",
        },
        {
            label: "Stay consistent",
            prompt: "How do I stay consistent with my learning?",
        },
    ];

    return (
        <div
            className="flex flex-col bg-background animate-fade-in"
            style={{ height: "calc(100vh - 4rem)" }}
        >
            {/* ── Header ─────────────────────────────────────────────── */}
            <header className="shrink-0 h-14 sm:h-16 border-b border-card-border flex items-center px-4 sm:px-6 bg-card-bg/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                                smart_toy
                            </span>
                        </div>
                        <motion.div
                            className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                    <div>
                        <h2 className="font-bold text-foreground text-sm sm:text-base leading-tight">
                            CareerPilot Mentor
                        </h2>
                        <p className="text-[10px] sm:text-[11px] text-green-500 font-medium tracking-wide">
                            Online
                        </p>
                    </div>
                </div>
            </header>

            {/* ── Messages Stream ───────────────────────────────────────────── */}
            <div
                className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 min-h-0"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(237,137,54,0.2) transparent",
                }}
            >
                <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 shrink-0 flex items-center justify-center text-primary self-start mt-1">
                                        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                                            smart_toy
                                        </span>
                                    </div>
                                )}

                                <div
                                    className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[80%] ${msg.role === "user" ? "items-end" : ""}`}
                                >
                                    <div
                                        className={`px-3 py-2.5 sm:p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                            msg.role === "user"
                                                ? "bg-primary text-white rounded-tr-none shadow-md shadow-primary/10"
                                                : "bg-card-bg border border-card-border text-foreground rounded-tl-none shadow-sm"
                                        }`}
                                    >
                                        {msg.content}
                                    </div>

                                    <div className="flex items-center gap-2 px-1">
                                        <span className="text-[10px] text-muted">
                                            {msg.time}
                                        </span>
                                        {msg.role === "assistant" && (
                                            <div className="flex gap-0.5 opacity-60 hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() =>
                                                        handleCopy(
                                                            msg.content,
                                                            i,
                                                        )
                                                    }
                                                    className="p-1 rounded-md hover:bg-card-bg text-muted hover:text-foreground transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
                                                        {copiedIndex === i
                                                            ? "check"
                                                            : "content_copy"}
                                                    </span>
                                                </button>
                                                {["thumb_up", "thumb_down"].map(
                                                    (icon) => (
                                                        <button
                                                            key={icon}
                                                            className="p-1 rounded-md hover:bg-card-bg text-muted hover:text-foreground transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
                                                                {icon}
                                                            </span>
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {msg.role === "user" && (
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/20 shrink-0 flex items-center justify-center text-primary self-start mt-1">
                                        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                                            person
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-2 sm:gap-3"
                        >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                                    smart_toy
                                </span>
                            </div>
                            <div className="bg-card-bg border border-card-border px-4 py-3 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1 items-center h-4 w-12 justify-center">
                                    {[0, 150, 300].map((delay) => (
                                        <motion.div
                                            key={delay}
                                            className="w-1.5 h-1.5 bg-primary rounded-full"
                                            animate={{
                                                y: ["0px", "-6px", "0px"],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 0.6,
                                                delay: delay / 1000,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* ── Input Deck ─────────────────────────────────────────── */}
            <div className="shrink-0 border-t border-card-border bg-card-bg/90 backdrop-blur-md px-3 sm:px-4 py-3 sm:py-4 z-10">
                <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
                    {/* Roadmap dynamic chips */}
                    {roadmapChips.length > 0 && (
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-muted px-1">
                                Your Roadmaps
                            </p>
                            <div
                                className="flex gap-2 overflow-x-auto pb-1"
                                style={{ scrollbarWidth: "none" }}
                            >
                                {roadmapChips.map((c, idx) => (
                                    <motion.button
                                        key={c.label}
                                        custom={idx}
                                        variants={chipVariants}
                                        initial="initial"
                                        animate="animate"
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={() => sendMessage(c.prompt)}
                                        className="whitespace-nowrap px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary hover:bg-primary/10 hover:border-primary/40 transition-colors flex items-center gap-1.5 shrink-0"
                                    >
                                        <span className="material-symbols-outlined text-[13px]">
                                            map
                                        </span>
                                        {c.label}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Static action suggestion chips */}
                    <div
                        className="flex gap-2 overflow-x-auto pb-1"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {staticChips.map((c, idx) => (
                            <motion.button
                                key={c.label}
                                custom={idx + 2}
                                variants={chipVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => sendMessage(c.prompt)}
                                className="whitespace-nowrap px-3 py-1.5 rounded-full border border-card-border bg-body-bg text-xs font-medium text-muted hover:border-primary/30 hover:text-primary transition-colors shrink-0"
                            >
                                {c.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Main prompt input box wrapper */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/5 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                        <div className="relative bg-body-bg border border-card-border rounded-2xl flex items-end p-2 gap-2 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-200">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage(input);
                                    }
                                }}
                                placeholder="Ask anything about your learning journey..."
                                rows={1}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 sm:py-3 px-2 overflow-y-auto resize-none text-foreground placeholder:text-muted/70 outline-none"
                                style={{ minHeight: 40, maxHeight: 128 }}
                            />
                            <motion.button
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isTyping}
                                whileHover={
                                    input.trim() && !isTyping
                                        ? { scale: 1.04 }
                                        : {}
                                }
                                whileTap={
                                    input.trim() && !isTyping
                                        ? { scale: 0.96 }
                                        : {}
                                }
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary hover:bg-primary/95 text-white flex items-center justify-center transition-opacity shadow-md shadow-primary/10 active:scale-95 disabled:opacity-30 shrink-0"
                            >
                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                                    send
                                </span>
                            </motion.button>
                        </div>
                    </div>

                    <p className="text-center text-[10px] text-muted/80 tracking-normal">
                        CareerPilot AI can make mistakes. Verify important
                        information.
                    </p>
                </div>
            </div>
        </div>
    );
}
