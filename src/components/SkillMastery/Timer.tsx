"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock, Hourglass } from "lucide-react";
import { useEffect } from "react";

interface TimerProps {
    timeRemaining: number;
    isWarning: boolean;
    onTimeUp: () => void;
}

export default function Timer({
    timeRemaining,
    isWarning,
    onTimeUp,
}: TimerProps) {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const isTimeUp = timeRemaining === 0;

    useEffect(() => {
        if (isTimeUp) {
            onTimeUp();
        }
    }, [isTimeUp, onTimeUp]);

    // Determine the style state based on current warning level
    const getTimerStyles = () => {
        if (isTimeUp) {
            return {
                bg: "bg-rose-500/10 border-rose-500/40 text-rose-500 shadow-md shadow-rose-500/5",
                icon: <Hourglass className="w-5 h-5 animate-bounce" />,
            };
        }
        if (isWarning) {
            return {
                bg: "bg-amber-500/15 border-amber-500/50 text-amber-500 shadow-md shadow-amber-500/10",
                icon: <AlertTriangle className="w-5 h-5" />,
            };
        }
        return {
            bg: "bg-card-bg/65 border-card-border/80 text-foreground shadow-sm",
            icon: <Clock className="w-5 h-5 text-primary" />,
        };
    };

    const activeStyle = getTimerStyles();

    return (
        <motion.div
            animate={
                isTimeUp
                    ? {
                          scale: [1, 1.03, 1],
                          transition: { repeat: Infinity, duration: 1.5 },
                      }
                    : isWarning
                      ? {
                            scale: [1, 1.02, 1],
                            transition: {
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                            },
                        }
                      : {}
            }
            className={`flex items-center gap-2.5 px-4.5 py-2 rounded-xl border-2 font-mono font-bold text-base md:text-lg transition-all duration-300 ${activeStyle.bg}`}
        >
            {/* Smoothly switch between icon states */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={
                        isTimeUp ? "time-up" : isWarning ? "warning" : "normal"
                    }
                    initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                >
                    {activeStyle.icon}
                </motion.div>
            </AnimatePresence>

            <span className="tracking-wider select-none min-w-[3.5rem] text-center">
                {String(minutes).padStart(2, "0")}
                <span className={isWarning ? "animate-pulse" : ""}>:</span>
                {String(seconds).padStart(2, "0")}
            </span>
        </motion.div>
    );
}
