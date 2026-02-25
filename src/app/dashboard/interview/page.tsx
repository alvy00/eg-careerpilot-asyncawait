"use client";
import { useEffect, useState } from "react";

const MockInterview = () => {
    const [isCalling, setIsCalling] = useState(false);
    const [time, setTime] = useState(0);

    /* ================= CALL HANDLERS ================= */

    const handleCallConnect = () => {
        setIsCalling(true);
    };

    const handleCallDisconnect = () => {
        setIsCalling(false);
        setTime(0); // reset timer when call ends
    };

    /* ================= TIMER LOGIC ================= */

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isCalling) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isCalling]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    /* ================= UI ================= */

    return (
        <div className="bg-background-dark text-slate-100 mesh-bg font-display">
            {/* ================= CALL SCREEN ================= */}
            <section className="h-screen relative flex flex-col">
                {/* Top Bar */}
                <header className="flex items-center justify-between px-6 py-4 z-10">
                    <div className="flex items-center gap-2">
                        {isCalling && (
                            <>
                                <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-xs font-bold tracking-widest text-red-500">
                                    LIVE
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center px-4 py-1.5 rounded-full glass-panel glow-border">
                        <span className="text-primary text-sm font-bold tracking-tighter">
                            {String(minutes).padStart(2, "0")}:
                            {String(seconds).padStart(2, "0")}
                        </span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col px-4 gap-4 max-w-lg mx-auto w-full pb-28">
                    {/* AI Interviewer */}
                    <div className="min-h-60 w-full rounded-xl overflow-hidden relative border border-primary/30">
                        {/* Image */}
                        <img
                            alt="AI Interviewer"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-700"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFUyjl6PqcMb7en1tXKnMppmj8KY8OYJAH_ycBOkrvIEIbWz0rhab_PDqLI7VGK2sjaosmNODjOXWy0Wpg56lWJGM-rjuWf5HKOdkxL84BvUXbJ4a3fGFz2tRdRq4GLN7_1YPlS52_i1XPOiOoxG8-MPXG6thdoIHksWXJryitE1NbZ8il1-kY7FcX8MnaZStqzu_YqkG2xNu9kek_cgAOaaijap3aEYUtPx_T8PZVpgIYF9aXEdbh1RbtglE9Gf8DqsiCShrTT9oq"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none"></div>
                    </div>

                    {/* Question Card */}
                    <div className="glass-panel rounded-xl p-5 border-l-4 border-l-primary shadow-2xl">
                        <p className="text-slate-100 text-lg font-medium leading-relaxed">
                            "Tell me about a time you handled a difficult
                            situation with a coworker. How did you resolve the
                            conflict?"
                        </p>
                    </div>

                    {/* User Preview */}
                    <div className="relative flex-1 min-h-60">
                        <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/10">
                            <img
                                alt="User Preview"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeE6UyTKz3HqQTJZtlZ5eq5uKD7JoRYIhsethMYZZF0d0VWd_UUSxSQ0Mitfap2WTcyWf3AWoT8evBMTsOxzw0fxwSi67nNJRFBFajz2acB40ehr-8ZebZOm2oVYsuVFq3KunFevqRjJNkAfuzLviVOhTCDqCeQj-diUsz3InbkQqCxuB4Eif9FZwrCbmOb2x7Qe82RWS4sIlmr289SQtO0_0kqxQ_Q31fFTcL4BDAGA_thBw5_ND0ZqTuL4FE7i6QQ0m4SYk7vxya"
                            />
                        </div>
                    </div>
                </main>

                {/* Call Button */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-fit z-20">
                    <div className="rounded-full p-2 border border-white/10 bg-black/40 backdrop-blur-md">
                        <button
                            onClick={
                                isCalling
                                    ? handleCallDisconnect
                                    : handleCallConnect
                            }
                            className={`cursor-pointer size-16 rounded-full flex items-center justify-center text-white transition-all active:scale-95 ${
                                isCalling
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-green-600 hover:bg-green-700"
                            }`}
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {isCalling ? "call_end" : "call"}
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= INTERVIEW HISTORY ================= */}
            <section className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">
                    Interview History & Feedback
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-xl border border-white/10">
                        <div className="flex justify-between mb-3 text-sm">
                            <span className="text-slate-400">
                                Frontend Mock • 12 Feb
                            </span>
                            <span className="text-green-400 font-semibold">
                                8.5 / 10
                            </span>
                        </div>
                        <p className="text-slate-300 text-sm">
                            Excellent structure and confidence. Improve depth in
                            explaining architectural decisions.
                        </p>
                    </div>

                    <div className="glass-panel p-6 rounded-xl border border-white/10">
                        <div className="flex justify-between mb-3 text-sm">
                            <span className="text-slate-400">
                                Behavioral Round • 5 Feb
                            </span>
                            <span className="text-yellow-400 font-semibold">
                                7 / 10
                            </span>
                        </div>
                        <p className="text-slate-300 text-sm">
                            Good use of STAR method. Add measurable impact and
                            results in examples.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MockInterview;
