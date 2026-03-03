"use client";
import { CallStatus, InterviewSessionProps } from "@/utils/interfaces";
import { useEffect } from "react";

const InterviewSession = ({
    time,
    setTime,
    messages,
    callStatus,
    handleCallConnect,
    handleCallDisconnect,
    isSpeaking,
}: InterviewSessionProps) => {
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
    }, [callStatus]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <section className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0a0a] to-[#111] text-white">
            {/* ================= HEADER ================= */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md bg-black/40 sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-semibold tracking-widest text-red-400">
                        LIVE SESSION
                    </span>
                </div>

                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-sm font-semibold text-primary">
                        {String(Math.floor(time / 60)).padStart(2, "0")}:
                        {String(time % 60).padStart(2, "0")}
                    </span>
                </div>
            </header>

            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1 flex flex-col md:flex-row gap-6 px-6 py-8 max-w-7xl mx-auto w-full">
                {/* AI VISUAL SECTION */}
                <div className="md:w-1/2 w-full">
                    <div className="relative h-72 md:h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                        <img
                            alt="AI Interviewer"
                            className="absolute inset-0 w-full h-full object-cover opacity-70 grayscale"
                            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                        {/* Speaking Indicator */}
                        {isSpeaking && (
                            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10">
                                <div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-400 font-medium">
                                    AI Speaking...
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* TRANSCRIPT SECTION */}
                <div className="md:w-1/2 w-full flex flex-col">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-y-auto space-y-4 shadow-inner">
                        {messages.length === 0 ? (
                            <p className="text-slate-400 text-center mt-20">
                                Your interview is set! Hit the call button below
                                whenever you’re ready to start.
                            </p>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl max-w-[85%] ${
                                        msg.role === "assistant"
                                            ? "bg-primary/20 border border-primary/30 self-start"
                                            : "bg-white/10 border border-white/10 self-end ml-auto"
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed">
                                        {msg.content}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            {/* ================= BOTTOM CONTROL BAR ================= */}
            <div className="sticky bottom-0 border-t border-white/10 bg-black/50 backdrop-blur-md py-6 flex justify-center">
                <button
                    onClick={
                        callStatus === CallStatus.INACTIVE
                            ? handleCallConnect
                            : handleCallDisconnect
                    }
                    className={`size-16 rounded-full flex items-center justify-center text-white transition-all active:scale-90 shadow-2xl ${
                        callStatus === CallStatus.INACTIVE
                            ? "bg-green-600 hover:bg-green-700 shadow-green-500/20"
                            : "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                    }`}
                >
                    <span className="material-symbols-outlined text-2xl">
                        {callStatus === CallStatus.INACTIVE
                            ? "call"
                            : "call_end"}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default InterviewSession;
