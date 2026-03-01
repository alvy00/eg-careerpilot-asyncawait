"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import InterviewPrepLoader from "@/components/Interview/components/InterviewPrepLoader";

const MockInterview = () => {
    const { user } = useAuth();

    const [progress, setProgress] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const [step, setStep] = useState(0);
    const [isCalling, setIsCalling] = useState(false);
    const [time, setTime] = useState(0);
    const [direction, setDirection] = useState(1);

    const [selectedRoadmap, setSelectedRoadmap] = useState<any | null>(null);
    const [userInput, setUserInput] = useState("");
    const [pdfUploaded, setPdfUploaded] = useState(false);

    const transcript = [
        "What do u want to learn?",
        "What's ur current exp level?",
    ];

    const [config, setConfig] = useState({
        difficulty: "",
        topic: "",
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

        // if (step === 4) {
        //     console.log(selectedRoadmap);
        // }
    };

    const startInterview = async () => {
        setLoading(true);

        // const interviewData = {
        //     interviewType: config.interviewType,
        //     roadmap: selectedRoadmap,
        //     pdfUploaded,
        //     userInput,
        //     difficulty: config.difficulty,
        //     topic: config.topic,
        // };

        try {
            setLoading(true); // start loader
            setProgress(0);

            const res = await axios.post(
                "/api/interview/vapi/generate",
                {
                    userId: "mockID-007",
                    userEmail: user?.email,
                    roadmap: selectedRoadmap,
                    userInput,
                    difficulty: config.difficulty,
                    topic: config.topic,
                },
                {
                    onDownloadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) /
                                (progressEvent.total || 1),
                        );
                        setProgress(percent);
                    },
                },
            );

            console.log("call started", res.data);

            // Reset selections
            setSelectedRoadmap(null);
            setUserInput("");
            setPdfUploaded(false);
            setConfig({ difficulty: "", topic: "", interviewType: "" });

            setStep(5);
            setIsCalling(true);
        } catch (e) {
            console.log(e);
        } finally {
            // Progress reaches 100, loader waits 0.5s before fading
            setProgress(100);
            setTimeout(() => setLoading(false), 200);
        }
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
                    <div className="space-y-4 text-slate-300 text-sm leading-relaxed animate-in fade-in duration-300">
                        <p className="text-base font-medium text-white">
                            Welcome! This mock interview simulates a real-world
                            scenario to help you practice effectively.
                        </p>

                        <ul className="space-y-2 text-slate-400 list-disc pl-5">
                            <li>
                                <span className="font-semibold text-slate-200">
                                    Adaptive AI:
                                </span>{" "}
                                Questions match your skill level and topics.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-200">
                                    Realistic pacing:
                                </span>{" "}
                                Follow-ups mimic live interviews.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-200">
                                    Feedback:
                                </span>{" "}
                                Identify strengths and areas to improve.
                            </li>
                        </ul>

                        <p className="text-primary font-medium mt-2">
                            Quick Tips:
                        </p>
                        <ul className="space-y-1 text-slate-400 list-disc pl-5 text-xs">
                            <li>Check your microphone and camera.</li>
                            <li>Choose a quiet environment.</li>
                            <li>Answer confidently and thoughtfully.</li>
                        </ul>
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
                    <div className="space-y-6">
                        <p className="text-slate-300 text-sm leading-relaxed animate-in fade-in duration-300">
                            Choose the difficulty that best matches your current
                            skill level. This will adjust:
                        </p>
                        <ul className="list-disc pl-5 text-slate-400 text-xs space-y-1">
                            <li>The complexity of questions you’ll face</li>
                            <li>
                                The depth and detail expected in your answers
                            </li>
                            <li>The pace and intensity of follow-ups</li>
                        </ul>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {[
                                {
                                    label: "Easy",
                                    hint: "Simple questions to test basic understanding and confidence.",
                                    border: "border-green-500",
                                    bg: "bg-green-500/20",
                                    shadow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]", // green
                                },
                                {
                                    label: "Medium",
                                    hint: "Moderate questions focusing on applied knowledge and reasoning.",
                                    border: "border-yellow-500",
                                    bg: "bg-yellow-500/20",
                                    shadow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]", // yellow
                                },
                                {
                                    label: "Advanced",
                                    hint: "Challenging questions requiring deep understanding and analysis.",
                                    border: "border-red-500",
                                    bg: "bg-red-500/20",
                                    shadow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]", // red
                                },
                            ].map((lvl) => (
                                <div
                                    key={lvl.label}
                                    className="flex flex-col items-center animate-in fade-in duration-300"
                                >
                                    <button
                                        onClick={() =>
                                            setConfig({
                                                ...config,
                                                difficulty: lvl.label,
                                            })
                                        }
                                        className={`p-4 w-full rounded-xl border transition-all duration-300 cursor-pointer text-sm font-medium
                ${
                    config.difficulty === lvl.label
                        ? `${lvl.border} ${lvl.bg} ${lvl.shadow}`
                        : "border-white/10 bg-white/5 hover:bg-white/10 text-slate-400"
                }`}
                                    >
                                        {lvl.label}
                                    </button>
                                    <p className="text-xs text-slate-400 mt-2 text-center">
                                        {lvl.hint}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-slate-500 mt-4 italic">
                            Tip: Start with a level you feel comfortable with.
                            You can always try a higher difficulty later.
                        </p>
                    </div>
                ),
            },
            {
                title: "Interview Focus",
                content: (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <p className="text-slate-300 text-sm">
                            Choose the focus of this interview. This helps the
                            AI tailor questions to test your skills,
                            decision-making, and thought process.
                            <span className="text-slate-400 block mt-1 text-xs">
                                Take this seriously — think of this as
                                preparation for real-world evaluations.
                            </span>
                        </p>

                        <select
                            className="w-full bg-white/10 border border-white/20 p-4 rounded-xl outline-none cursor-pointer"
                            value={config.topic || ""} // keep as empty string if nothing selected
                            onChange={(e) =>
                                setConfig({ ...config, topic: e.target.value })
                            }
                        >
                            <option
                                value=""
                                disabled
                                className="bg-slate-900 text-slate-400"
                            >
                                🔹 Select interview focus
                            </option>
                            <option value="Behavioral" className="bg-slate-900">
                                Behavioral
                            </option>
                            <option
                                value="Skill-Based"
                                className="bg-slate-900"
                            >
                                Skill-Based
                            </option>
                            <option
                                value="Scenario / Problem Solving"
                                className="bg-slate-900"
                            >
                                Scenario / Problem Solving
                            </option>
                        </select>

                        <div className="text-slate-400 text-xs space-y-2 mt-1">
                            {config.topic === "Behavioral" && (
                                <p>
                                    Focus on **communication, leadership,
                                    teamwork, adaptability, and
                                    decision-making**. Expect questions about
                                    how you handled past challenges, conflicts,
                                    or successes. Tip: Be concise, authentic,
                                    and structure your answers using STAR
                                    (Situation, Task, Action, Result).
                                </p>
                            )}
                            {config.topic === "Skill-Based" && (
                                <p>
                                    Focus on **demonstrable expertise** in your
                                    field, whether technical, creative, or
                                    operational. You may be asked to solve real
                                    tasks, explain your reasoning, or showcase
                                    results. Tip: Highlight your **practical
                                    experience, tools, and methods** clearly.
                                </p>
                            )}
                            {config.topic === "Scenario / Problem Solving" && (
                                <p>
                                    Focus on **strategic thinking, problem
                                    analysis, and decision-making**. You may
                                    face hypothetical scenarios where your
                                    reasoning and creativity are evaluated. Tip:
                                    Think aloud, structure your approach, and
                                    consider trade-offs.
                                </p>
                            )}
                            {!config.topic && (
                                <p className="text-slate-500">
                                    Nothing selected yet — the "Continue" button
                                    will be enabled once you choose a focus.
                                </p>
                            )}
                        </div>
                    </div>
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
            // Step 1 = Interview Type & Selection
            if (step === 1) {
                if (!config.interviewType) return false;

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

            // Step 2 = Difficulty selection must be chosen
            if (step === 2) {
                if (!config.difficulty || config.difficulty === "")
                    return false;
            }

            // Step 3 = Interview Focus must be selected
            if (step === 3) {
                if (!config.topic || config.topic === "") return false;
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
                                  ? "bg-primary/80 cursor-pointer text-black hover:bg-primary hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] active:translate-y-px"
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
            {isLoading && (
                <InterviewPrepLoader
                    progress={progress}
                    setProgress={setProgress}
                    loading={isLoading}
                    onFinish={() => console.log("Loader finished")}
                />
            )}

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
                                {transcript.length > 0
                                    ? transcript[transcript.length - 1]
                                    : "---"}
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
