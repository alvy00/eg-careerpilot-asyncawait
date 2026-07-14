"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader, Sparkles } from "lucide-react";
import { useState } from "react";

interface TopicSelectorProps {
    onTopicSelect: (topic: string) => void;
}

export default function TopicSelector({ onTopicSelect }: TopicSelectorProps) {
    const [customTopic, setCustomTopic] = useState("");
    const [loading, setLoading] = useState(false);

    const suggestedTopics = [
        "Public Speaking",
        "Data Analysis",
        "Financial Literacy",
        "Graphic Design",
        "Technical Writing",
        "Negotiation",
        "Project Management",
        "Photography",
    ];

    const handleTopicSubmit = (topic: string) => {
        if (!topic.trim() || loading) return;
        setLoading(true);
        setTimeout(() => onTopicSelect(topic), 400);
    };

    // Framer Motion layout configurations for smoother entry transitions
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
            <motion.div
                variants={itemVariants}
                className="text-center space-y-3"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2 shadow-sm animate-pulse">
                    <Sparkles size={12} />
                    <span>Roadmap Validation</span>
                </div>
                <h2 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
                    Milestone Quizzes
                </h2>
                <p className="text-muted max-w-lg mx-auto text-base leading-relaxed">
                    Ready to validate your roadmap progress? Generate an AI quiz
                    on your current skill to uncover knowledge gaps and confirm
                    your proficiency.
                </p>
            </motion.div>

            {/* Target Skill Input Area */}
            <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-foreground/80 font-semibold block text-sm tracking-wide">
                    Which skill from your roadmap are you testing today?
                </label>
                <div className="flex gap-3 relative group">
                    <input
                        type="text"
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleTopicSubmit(customTopic);
                        }}
                        disabled={loading}
                        placeholder="e.g., UI/UX Design, Spanish Vocab, Copywriting Fundamentals..."
                        className="flex-1 px-5 py-4 rounded-xl bg-body-bg border border-card-border text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-inner disabled:opacity-60"
                    />
                    <motion.button
                        whileHover={
                            !customTopic.trim() || loading
                                ? {}
                                : { scale: 1.02 }
                        }
                        whileTap={
                            !customTopic.trim() || loading
                                ? {}
                                : { scale: 0.98 }
                        }
                        onClick={() => handleTopicSubmit(customTopic)}
                        disabled={loading || !customTopic.trim()}
                        className="px-7 py-4 rounded-xl bg-primary hover:bg-primary/95 text-white font-semibold flex items-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-primary/20 whitespace-nowrap"
                    >
                        {loading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>Generate Quiz</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>

            {/* Interactive Grid Categories */}
            <motion.div variants={itemVariants} className="space-y-4">
                <div className="border-t border-card-border/60 pt-6">
                    <p className="text-muted text-sm font-medium tracking-wide">
                        Or run a quick diagnostic on a popular roadmap domain:
                    </p>
                </div>
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-3.5"
                    variants={containerVariants}
                >
                    {suggestedTopics.map((topic) => (
                        <motion.button
                            key={topic}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                y: -3,
                                boxShadow:
                                    "0 10px 20px -10px rgba(var(--primary), 0.15)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTopicSubmit(topic)}
                            disabled={loading}
                            className="p-4 rounded-xl bg-card-bg hover:bg-body-bg text-foreground border border-card-border hover:border-primary/80 transition-all duration-200 disabled:opacity-50 text-center font-semibold text-sm shadow-sm flex items-center justify-center min-h-[56px]"
                        >
                            {topic}
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
