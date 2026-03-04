"use client";
import { CallStatus, InterviewSessionProps } from "@/utils/interfaces";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InterviewSession = ({
    time,
    setTime,
    messages,
    callStatus,
    handleCallConnect,
    handleCallDisconnect,
    isSpeaking,
}: InterviewSessionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll transcript with smooth behavior
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (callStatus === CallStatus.ACTIVE) {
            interval = setInterval(() => {
                setTime((prev: any) => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [callStatus, setTime]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <section className="h-[95vh] w-full flex flex-col bg-linear-to-br from-[#0a0f1c]/90 via-[#0d111a]/80 to-[#090d16]/90 backdrop-blur-xl text-slate-100 selection:bg-primary/30 font-sans overflow-hidden">
            {/* ================= HEADER ================= */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex-none flex items-center justify-between px-8 py-4 border-b border-white/5 backdrop-blur-xl bg-black/20 z-50"
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="size-2.5 rounded-full bg-red-500" />
                        <div className="absolute inset-0 size-2.5 rounded-full bg-red-500 animate-ping" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-500/80 hidden sm:block">
                        Live Interview Session
                    </span>
                </div>

                <motion.div
                    key={time}
                    initial={{ opacity: 0.8, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner"
                >
                    <span className="text-sm font-mono font-medium tracking-tighter text-primary/90">
                        {formatTime(time)}
                    </span>
                </motion.div>
            </motion.header>

            {/* ================= MAIN CONTENT ================= */}
            {/* Added overflow-hidden here to ensure the main area doesn't grow the page */}
            <main className="flex-1 flex flex-col lg:flex-row gap-6 p-4 lg:p-8 max-w-[1600px] mx-auto w-full overflow-hidden">
                {/* LEFT: AI INTERVIEWER VISUAL */}
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="h-1/3 lg:h-full lg:w-1/2 flex flex-col min-h-[250px]"
                >
                    <div className="relative h-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent group">
                        <img
                            alt="AI Interviewer"
                            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
                            src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1200"
                        />

                        {/* Animated AI Visualizer */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {isSpeaking ? (
                                    <motion.div
                                        key="speaking"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 h-20"
                                    >
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    height: [
                                                        10,
                                                        Math.random() * 60 + 20,
                                                        10,
                                                    ],
                                                    opacity: [0.3, 1, 0.3],
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration:
                                                        0.5 +
                                                        Math.random() * 0.5,
                                                    ease: "easeInOut",
                                                }}
                                                className="w-2 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]"
                                            />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="idle"
                                        className="relative size-32 flex items-center justify-center"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.1, 0.2, 0.1],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 4,
                                            }}
                                            className="absolute inset-0 rounded-full bg-white/10"
                                        />
                                        <div className="size-16 rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-sm" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT: TRANSCRIPT */}
                <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex-1 lg:w-1/2 flex flex-col overflow-hidden h-full"
                >
                    <div
                        ref={scrollRef}
                        className="flex-1 bg-white/[0.02] border border-white/10 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6"
                    >
                        {messages.length === 0 ? (
                            <div className="m-auto text-center px-10">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                    }}
                                    className="size-16 mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6"
                                >
                                    <span className="material-symbols-outlined text-white/30 text-3xl">
                                        forum
                                    </span>
                                </motion.div>
                                <h3 className="text-xl font-medium mb-2">
                                    Ready to begin?
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    Hit the call button below to start.
                                </p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    key={index}
                                    className={`p-5 rounded-2xl max-w-[90%] lg:max-w-[80%] ${
                                        msg.role === "assistant"
                                            ? "bg-white/5 border border-white/10 self-start rounded-tl-none shadow-xl"
                                            : "bg-primary/20 border border-primary/30 self-end ml-auto rounded-tr-none shadow-lg"
                                    }`}
                                >
                                    <span className="text-[10px] uppercase tracking-tighter opacity-40 mb-1 block font-bold">
                                        {msg.role === "assistant"
                                            ? "Interviewer"
                                            : "Candidate"}
                                    </span>
                                    <p className="text-[15px] leading-relaxed">
                                        {msg.content}
                                    </p>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </main>

            {/* ================= BOTTOM CONTROL BAR ================= */}
            <motion.footer
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="flex-none pb-8 pt-2 px-6 flex flex-col items-center gap-3 bg-gradient-to-t from-black to-transparent"
            >
                <div className="relative">
                    <AnimatePresence>
                        {callStatus === CallStatus.ACTIVE && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.6],
                                        opacity: [0.4, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                    }}
                                    className="absolute inset-0 rounded-full bg-red-500/30"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={
                            callStatus === CallStatus.INACTIVE
                                ? handleCallConnect
                                : handleCallDisconnect
                        }
                        className={`group relative size-16 lg:size-20 rounded-full flex items-center justify-center text-white transition-all active:scale-90 z-10 ${
                            callStatus === CallStatus.INACTIVE
                                ? "bg-green-500 hover:bg-green-400 shadow-green-500/20"
                                : "bg-red-500 hover:bg-red-400 shadow-red-500/20"
                        } shadow-2xl`}
                    >
                        <motion.span
                            key={callStatus}
                            initial={{ scale: 0.5, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="material-symbols-outlined text-3xl"
                        >
                            {callStatus === CallStatus.INACTIVE
                                ? "call"
                                : "call_end"}
                        </motion.span>
                    </button>
                </div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30">
                    {callStatus === CallStatus.INACTIVE
                        ? "Connect"
                        : "Disconnect"}
                </p>
            </motion.footer>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
};

export default InterviewSession;
