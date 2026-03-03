"use client";

import { InterviewSetupProps } from "@/utils/interfaces";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const InterviewSetup = ({
    step,
    setStep,
    selectedRoadmap,
    setSelectedRoadmap,
    userInput,
    setUserInput,
    pdfUploaded,
    setPdfUploaded,
    config,
    setConfig,
    generateInterview,
}: InterviewSetupProps) => {
    const [direction, setDirection] = useState(1);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { data: roadmapsObj, isLoading } = useQuery({
        queryKey: ["roadmaps"],
        queryFn: async () => {
            const res = await axios("/api/roadmaps");
            return res.data;
        },
    });

    const roadmaps =
        roadmapsObj?.map((rd: any) => ({
            id: rd._id,
            roadmap: rd.roadmap,
        })) ?? [];

    const handleSelectRoadmap = (rd: any) => {
        setSelectedRoadmap((prev: any) =>
            prev?.id === rd.id ? null : { id: rd.id, roadmap: rd.roadmap },
        );
    };

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
                    if (step === 4) generateInterview();
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

    const canContinue = () => {
        // Step 1 = Interview Type & Selection
        if (step === 1) {
            if (!config.interviewType) return false;

            if (config.interviewType === "Roadmaps" && !selectedRoadmap)
                return false;

            if (config.interviewType === "PDF" && !pdfUploaded) return false;

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
            if (!config.difficulty || config.difficulty === "") return false;
        }

        // Step 3 = Interview Focus must be selected
        if (step === 3) {
            if (!config.topic || config.topic === "") return false;
        }

        return true;
    };

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

                    <p className="text-primary font-medium mt-2">Quick Tips:</p>
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
                            {isLoading ? (
                                <p className="text-slate-400 text-sm text-center">
                                    Loading roadmaps...
                                </p>
                            ) : roadmaps.length > 0 ? (
                                roadmaps.map((rdObj: any, index: number) => (
                                    <div
                                        key={rdObj.id}
                                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                            selectedRoadmap?.id === rdObj.id
                                                ? "border-primary bg-primary/10"
                                                : "border-white/10 bg-white/5 hover:bg-white/10"
                                        }`}
                                        onClick={() =>
                                            handleSelectRoadmap(rdObj)
                                        }
                                    >
                                        <div className="p-5 cursor-pointer">
                                            <h3 className="text-lg font-semibold">
                                                {rdObj.roadmap.skill}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {
                                                    rdObj.roadmap
                                                        .roadmap_summary?.goal
                                                }
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400 text-sm text-center">
                                    You haven't created any roadmaps yet!
                                </p>
                            )}
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
                                    Drag & drop your PDF here or click to upload
                                </p>
                            </div>
                            <p className="text-xs text-slate-400">
                                Upload a PDF containing at least 5 topics so the
                                AI can generate questions.
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
                                onChange={(e) => setUserInput(e.target.value)}
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
                        <li>The depth and detail expected in your answers</li>
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
                        Tip: Start with a level you feel comfortable with. You
                        can always try a higher difficulty later.
                    </p>
                </div>
            ),
        },
        {
            title: "Interview Focus",
            content: (
                <div className="space-y-4 animate-in fade-in duration-300">
                    <p className="text-slate-300 text-sm">
                        Choose the focus of this interview. This helps the AI
                        tailor questions to your chosen skill, activity, or
                        domain.
                        <span className="text-slate-400 block mt-1 text-xs">
                            Whether it's sports, crafts, tech, or any other
                            skill, treat this like real-world evaluation
                            practice.
                        </span>
                    </p>

                    <select
                        className="w-full bg-white/10 border border-white/20 p-4 rounded-xl outline-none cursor-pointer"
                        value={config.topic || ""}
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
                            Behavioral / Soft Skills
                        </option>
                        <option value="Skill-Based" className="bg-slate-900">
                            Skill-Based / Practical
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
                                Focus on **communication, teamwork,
                                adaptability, and decision-making**. Expect
                                questions about how you handled challenges or
                                worked with others. Tip: Structure answers
                                clearly, be authentic, and reflect on your
                                experiences, whether in sports, arts, or work.
                            </p>
                        )}
                        {config.topic === "Skill-Based" && (
                            <p>
                                Focus on **practical expertise** in your chosen
                                skill. You may be asked to demonstrate
                                techniques, explain methods, or solve tasks
                                relevant to your domain. Tip: Highlight your
                                approach, tools, and real-world experience.
                            </p>
                        )}
                        {config.topic === "Scenario / Problem Solving" && (
                            <p>
                                Focus on **analysis, strategy, and creative
                                problem-solving**. You may face hypothetical
                                situations where your reasoning is evaluated.
                                Tip: Think aloud, structure your approach, and
                                weigh trade-offs, no matter the domain — from
                                athletics to crafts to business.
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

export default InterviewSetup;
