"use client";
import { useEffect, useState } from "react";

interface InterviewPrepLoaderProps {
    message?: string;
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean; // <- add this
    onFinish?: () => void; // optional callback
}

const InterviewPrepLoader: React.FC<InterviewPrepLoaderProps> = ({
    message = "Preparing your interview...",
    progress,
    setProgress,
    loading,
    onFinish,
}) => {
    const [tip, setTip] = useState("");
    const [visible, setVisible] = useState(true); // for smooth fade-out

    const tips = [
        "Research the company beforehand",
        "Prepare answers for common questions",
        "Dress appropriately for the interview",
        "Maintain good posture and eye contact",
        "Ask thoughtful questions at the end",
        "Practice STAR method for behavioral answers",
        "Keep your answers concise and structured",
        "Show enthusiasm and interest in the role",
        "Bring your resume and portfolio if needed",
        "Be punctual and respectful to everyone",
    ];

    // Rotate tips every 3 seconds
    useEffect(() => {
        setTip(tips[Math.floor(Math.random() * tips.length)]);
        const tipInterval = setInterval(() => {
            setTip(tips[Math.floor(Math.random() * tips.length)]);
        }, 3000);
        return () => clearInterval(tipInterval);
    }, []);

    // Animate progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) =>
                prev >= 100 ? 100 : prev + Math.random() * 5,
            );
        }, 200);
        return () => clearInterval(interval);
    }, [setProgress]);

    // Fade out when loading ends
    useEffect(() => {
        if (!loading) {
            const timeout = setTimeout(() => {
                setVisible(false); // fade out
                onFinish?.();
            }, 500); // small delay to let progress reach 100%
            return () => clearTimeout(timeout);
        }
    }, [loading, onFinish]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-500">
            <div className="bg-white/10 backdrop-blur-xl border border-gray-800 shadow-2xl rounded-3xl w-full max-w-md p-8 flex flex-col items-center transition-transform duration-500">
                {/* Header */}
                <h2 className="text-2xl font-semibold text-white text-center mb-4">
                    {message}
                </h2>

                {/* Tip */}
                <p className="text-sm text-slate-300 text-center mb-6 px-2 italic">
                    💡 {tip}
                </p>

                {/* Progress Bar */}
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-6">
                    <div
                        className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Animated dots */}
                <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <span
                            key={i}
                            className="w-3 h-3 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>

                {/* Extra animations */}
                <style jsx>{`
                    @keyframes bounce {
                        0%,
                        80%,
                        100% {
                            transform: scale(0);
                        }
                        40% {
                            transform: scale(1);
                        }
                    }
                    .animate-bounce {
                        animation: bounce 1.4s infinite ease-in-out;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default InterviewPrepLoader;
