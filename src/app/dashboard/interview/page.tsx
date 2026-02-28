"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const MockInterview = () => {
    const [step, setStep] = useState(0);
    const [isCalling, setIsCalling] = useState(false);
    const [time, setTime] = useState(0);
    const [direction, setDirection] = useState(1);

    const [selectedRoadmap, setSelectedRoadmap] = useState<any | null>(null);
    const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
    const [userInput, setUserInput] = useState(""); // controlled user input
    const [pdfUploaded, setPdfUploaded] = useState(false); // PDF upload state

    const [config, setConfig] = useState({
        role: "",
        difficulty: "Mid-Level",
        topic: "General Behavioral",
        interviewType: "",
    });

    const mockRoadmaps = [
        {
            id: 1,
            skill: "Backend Development (Node.js)",
            summary:
                "Become a job-ready Backend Engineer with REST APIs, DB design, Auth, and DevOps.",
            phases: [
                {
                    phase_number: 1,
                    phase_title: "JavaScript & Core Backend Foundations",
                    topics: [
                        {
                            topic_name: "Advanced JavaScript",
                            subtopics: [
                                "Closures",
                                "Async/Await",
                                "Event Loop",
                                "Modules",
                            ],
                        },
                    ],
                },
                {
                    phase_number: 2,
                    phase_title: "Node.js & Express",
                    topics: [
                        {
                            topic_name: "Building REST APIs",
                            subtopics: [
                                "Routing",
                                "Middleware",
                                "Controllers",
                                "Error Handling",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            skill: "Frontend Development (React)",
            summary:
                "Master modern React development with hooks, state management, performance optimization, and deployment.",
            phases: [
                {
                    phase_number: 1,
                    phase_title: "React Fundamentals",
                    topics: [
                        {
                            topic_name: "Core Concepts",
                            subtopics: [
                                "JSX",
                                "Components",
                                "Props",
                                "State",
                                "Lifecycle",
                            ],
                        },
                    ],
                },
                {
                    phase_number: 2,
                    phase_title: "Advanced React Patterns",
                    topics: [
                        {
                            topic_name: "Modern React",
                            subtopics: [
                                "Custom Hooks",
                                "Context API",
                                "Performance Optimization",
                                "Code Splitting",
                            ],
                        },
                    ],
                },
                {
                    phase_number: 3,
                    phase_title: "Full App Architecture",
                    topics: [
                        {
                            topic_name: "Production Skills",
                            subtopics: [
                                "Authentication",
                                "API Integration",
                                "Testing",
                                "Deployment (Vercel)",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 3,
            skill: "System Design Engineering",
            summary:
                "Learn to design scalable systems, handle high traffic, and architect real-world distributed applications.",
            phases: [
                {
                    phase_number: 1,
                    phase_title: "System Design Basics",
                    topics: [
                        {
                            topic_name: "Foundations",
                            subtopics: [
                                "Client-Server Architecture",
                                "Load Balancing",
                                "Caching",
                                "CAP Theorem",
                            ],
                        },
                    ],
                },
                {
                    phase_number: 2,
                    phase_title: "Scalability & Databases",
                    topics: [
                        {
                            topic_name: "Data Engineering",
                            subtopics: [
                                "SQL vs NoSQL",
                                "Database Indexing",
                                "Replication",
                                "Sharding",
                            ],
                        },
                    ],
                },
                {
                    phase_number: 3,
                    phase_title: "Real World Design",
                    topics: [
                        {
                            topic_name: "Case Studies",
                            subtopics: [
                                "Design Twitter",
                                "Design YouTube",
                                "Design Uber",
                                "Rate Limiting",
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    const containerRef = useRef<HTMLDivElement | null>(null);

    /* ================= GSAP ================= */
    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".animate-item");
            gsap.killTweensOf(items);

            gsap.from(items, {
                opacity: 0,
                x: 40 * direction,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "all",
            });
        }, containerRef);

        return () => ctx.revert();
    }, [step]);

    const handleMove = (next: boolean) => {
        if (!containerRef.current) return;

        const d = next ? 1 : -1;
        setDirection(d);

        const items =
            containerRef.current.querySelectorAll<HTMLElement>(".animate-item");

        gsap.killTweensOf(items);

        gsap.to(items, {
            opacity: 0,
            x: -40 * d,
            duration: 0.3,
            stagger: 0.05,
            ease: "power3.in",
            onComplete: () => {
                if (next) {
                    if (step === 4) startInterview();
                    else setStep((s) => s + 1);
                } else {
                    setStep((s) => s - 1);
                }
            },
        });
    };

    const startInterview = () => {
        setStep(5);
        setIsCalling(true);
    };

    const handleCallDisconnect = () => {
        setIsCalling(false);
        setTime(0);
        setStep(0);
    };

    /* ================= TIMER ================= */
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isCalling && step === 5) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isCalling, step]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    /* ================= SETUP ================= */
    const renderSetup = () => {
        const steps = [
            {
                title: "Before We Begin",
                content: (
                    <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                        <p>
                            This mock interview simulates a real-time,
                            high-pressure interview environment.
                        </p>
                        <ul className="space-y-2 text-slate-400">
                            <li>• AI adapts to your chosen difficulty</li>
                            <li>• Questions match your selected topics</li>
                            <li>• Realistic pacing & follow-ups</li>
                        </ul>
                        <p className="text-primary font-medium pt-2">
                            Treat this like a real interview.
                        </p>
                    </div>
                ),
            },
            {
                title: "Select Interview Type",
                content: (
                    <div className="space-y-4">
                        <select
                            className="w-full bg-white/10 border border-white/20 p-4 rounded-xl outline-none cursor-pointer"
                            value={config.interviewType}
                            onChange={(e) => {
                                setConfig({
                                    ...config,
                                    interviewType: e.target.value,
                                });
                                setSelectedRoadmap(null);
                                setUserInput("");
                                setPdfUploaded(false);
                            }}
                        >
                            <option
                                value=""
                                disabled
                                className="bg-slate-900 text-slate-400"
                            >
                                🔹 Choose interview source
                            </option>
                            <option className="bg-slate-900" value="Roadmaps">
                                Roadmaps
                            </option>
                            <option className="bg-slate-900" value="PDF">
                                PDF
                            </option>
                            <option className="bg-slate-900" value="User Input">
                                User Input
                            </option>
                        </select>

                        {/* Helpful hint if nothing selected */}
                        {config.interviewType === "" && (
                            <p className="text-xs text-slate-400 mt-1 animate-in fade-in duration-300">
                                Select an interview source to continue
                            </p>
                        )}

                        {/* Roadmaps */}
                        {config.interviewType === "Roadmaps" && (
                            <div className="space-y-4 animate-in fade-in duration-300">
                                {mockRoadmaps.map((roadmap) => (
                                    <div
                                        key={roadmap.id}
                                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                            selectedRoadmap?.id === roadmap.id
                                                ? "border-primary bg-primary/10"
                                                : "border-white/10 bg-white/5 hover:bg-white/10"
                                        }`}
                                    >
                                        <div
                                            onClick={() =>
                                                setSelectedRoadmap(
                                                    selectedRoadmap?.id ===
                                                        roadmap.id
                                                        ? null
                                                        : roadmap,
                                                )
                                            }
                                            className="p-5 cursor-pointer"
                                        >
                                            <h3 className="text-lg font-semibold">
                                                {roadmap.skill}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {roadmap.summary}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* PDF */}
                        {config.interviewType === "PDF" && (
                            <div className="space-y-1 animate-in fade-in duration-300">
                                <div
                                    className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                                    onClick={() => setPdfUploaded(true)}
                                >
                                    <p className="text-slate-400 text-sm">
                                        Drag & drop your PDF here or click to
                                        upload
                                    </p>
                                </div>
                                <p className="text-xs text-slate-400">
                                    Upload a PDF containing at least 5 topics so
                                    the AI can generate questions.
                                </p>
                            </div>
                        )}

                        {/* User Input */}
                        {config.interviewType === "User Input" && (
                            <div className="space-y-1 animate-in fade-in duration-300 flex flex-col gap-2">
                                <textarea
                                    rows={5}
                                    placeholder="Paste your custom interview topics or roadmap here..."
                                    value={userInput}
                                    onChange={(e) =>
                                        setUserInput(e.target.value)
                                    }
                                    className="w-full bg-white/5 border border-white/20 p-4 rounded-xl focus:outline-none focus:border-primary transition-all focus:bg-white/10 resize-none"
                                />
                                <p className="text-xs text-slate-400">
                                    Enter at least 10 keywords for the AI to
                                    generate a meaningful interview.
                                </p>
                            </div>
                        )}
                    </div>
                ),
            },
            {
                title: "Select Difficulty",
                content: (
                    <div className="grid grid-cols-3 gap-4">
                        {["Junior", "Mid-Level", "Senior"].map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() =>
                                    setConfig({ ...config, difficulty: lvl })
                                }
                                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                                    config.difficulty === lvl
                                        ? "border-primary bg-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                                        : "border-white/10 bg-white/5 hover:bg-white/10 text-slate-400"
                                }`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                ),
            },
            {
                title: "Interview Focus",
                content: (
                    <select
                        className="w-full bg-white/10 border border-white/20 p-4 rounded-xl outline-none cursor-pointer"
                        value={config.topic}
                        onChange={(e) =>
                            setConfig({ ...config, topic: e.target.value })
                        }
                    >
                        <option className="bg-slate-900">
                            General Behavioral
                        </option>
                        <option className="bg-slate-900">
                            Technical Deep Dive
                        </option>
                        <option className="bg-slate-900">System Design</option>
                    </select>
                ),
            },
            {
                title: "Final Check",
                content: (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="size-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                                <span className="material-symbols-outlined text-green-400">
                                    videocam
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Microphone and camera are calibrated.
                        </p>
                    </div>
                ),
            },
        ];

        const canContinue = () => {
            if (step === 1) {
                if (!config.interviewType) return false; // <-- disable continue if nothing selected
                if (config.interviewType === "Roadmaps" && !selectedRoadmap)
                    return false;
                if (config.interviewType === "PDF" && !pdfUploaded)
                    return false;
                if (config.interviewType === "User Input") {
                    if (
                        !userInput.trim() ||
                        userInput.trim().split(/\s+/).length < 10
                    )
                        return false;
                }
            }
            return true;
        };

        return (
            <section
                ref={containerRef}
                className="min-h-screen flex justify-center px-6 py-10 overflow-auto"
            >
                <div className="flex flex-col justify-between setup-card glass-panel max-w-2xl w-full max-h-[80vh] overflow-auto p-12 rounded-3xl border border-white/10 shadow-2xl relative bg-slate-900/40 backdrop-blur-xl">
                    <div>
                        <div className="flex items-center justify-between mb-10">
                            <div className="w-24">
                                {step > 0 && (
                                    <button
                                        onClick={() => handleMove(false)}
                                        className="animate-item flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-medium"
                                    >
                                        <span className="material-symbols-outlined text-sm">
                                            arrow_back_ios
                                        </span>
                                        Back
                                    </button>
                                )}
                            </div>

                            <div className="flex gap-2 flex-1 justify-end">
                                {[0, 1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`h-1 w-10 rounded-full transition-all duration-500 ${
                                            step >= s
                                                ? "bg-primary shadow-[0_0_8px_var(--primary)]"
                                                : "bg-white/10"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div key={step}>
                            <h2 className="animate-item text-3xl font-bold mb-8 tracking-tight">
                                {steps[step].title}
                            </h2>

                            <div className="animate-item mb-12 min-h-35 flex flex-col justify-center">
                                {steps[step].content}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => handleMove(true)}
                            disabled={!canContinue()}
                            className={`animate-item px-8 py-3 text-sm font-semibold rounded-lg
                          transition-all duration-300
                          ${
                              canContinue()
                                  ? "bg-primary/80 text-black hover:bg-primary hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] active:translate-y-px"
                                  : "bg-white/10 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                            {step === 4 ? "Launch Interview" : "Continue"}
                        </button>
                    </div>
                </div>
            </section>
        );
    };

    /* ================= MAIN RETURN ================= */
    return (
        <div className="bg-[#050505] text-slate-100 mesh-bg font-display min-h-screen">
            {step < 5 ? (
                renderSetup()
            ) : (
                <section className="h-screen relative flex flex-col animate-in fade-in duration-700">
                    <header className="flex items-center justify-between px-6 py-4 z-10">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-xs font-bold tracking-widest text-red-500">
                                LIVE
                            </span>
                        </div>
                        <div className="flex items-center px-4 py-1.5 rounded-full glass-panel border border-white/10">
                            <span className="text-primary text-sm font-bold tracking-tighter">
                                {String(minutes).padStart(2, "0")}:
                                {String(seconds).padStart(2, "0")}
                            </span>
                        </div>
                    </header>

                    <main className="flex-1 flex flex-col px-4 gap-4 max-w-lg mx-auto w-full pb-28">
                        <div className="min-h-60 w-full rounded-xl overflow-hidden relative border border-primary/30">
                            <img
                                alt="AI Interviewer"
                                className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale"
                                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
                        </div>

                        <div className="glass-panel rounded-xl p-5 border-l-4 border-l-primary shadow-2xl bg-white/5">
                            <p className="text-slate-100 text-lg font-medium leading-relaxed">
                                "Since you're applying for{" "}
                                <span className="text-primary">
                                    {config.role || "this role"}
                                </span>
                                , tell me about a time you handled a difficult
                                conflict?"
                            </p>
                        </div>
                    </main>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-fit z-20">
                        <button
                            onClick={handleCallDisconnect}
                            className="group cursor-pointer size-16 rounded-full flex items-center justify-center text-white transition-all active:scale-90 bg-red-600 hover:bg-red-700 shadow-2xl shadow-red-500/20"
                        >
                            <span className="material-symbols-outlined text-2xl group-hover:rotate-135 transition-transform duration-300">
                                call_end
                            </span>
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default MockInterview;
