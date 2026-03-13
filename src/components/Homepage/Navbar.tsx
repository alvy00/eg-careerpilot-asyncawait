"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { user, loading, logout } = useAuth();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Scroll logic for Slide Up/Down
    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true); // Scrolling up
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    if (loading) return null;

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-xl glass-card rounded-2xl px-8 py-3 border border-white/10 shadow-2xl">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        <span className="text-primary">C</span>areer
                        <span className="text-primary">P</span>ilot
                    </h1>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/">
                        <span className="text-sm font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                            Home
                        </span>
                    </Link>
                    <Link href="/dashboard/roadmap">
                        <span className="text-sm font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                            Roadmaps
                        </span>
                    </Link>

                    <Link href="/dashboard/interview">
                        <span className="text-sm font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                            Mock Interview
                        </span>
                    </Link>
                    <Link href="/about">
                        <span className="text-sm font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                            About
                        </span>
                    </Link>
                </div>

                {/* CTA / User Profile Section */}
                <div className="flex items-center gap-4 relative">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-all outline-none"
                            >
                                <span className="text-xs font-medium text-white/60 hidden sm:block">
                                    {user.displayName ||
                                        user.email?.split("@")[0]}
                                </span>
                                <img
                                    src={
                                        user.photoURL ||
                                        `https://ui-avatars.com/api/?name=${user.email}`
                                    }
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-primary/30 object-cover shadow-lg"
                                />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: 10,
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: 10,
                                        }}
                                        transition={{
                                            type: "spring",
                                            duration: 0.4,
                                            bounce: 0.3,
                                        }}
                                        className="absolute right-0 mt-3 w-56 backdrop-blur-2xl bg-slate-900 saturate-150 border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 z-[60]"
                                    >
                                        <div className="px-4 py-2 border-b border-white/5 mb-1">
                                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                                Account
                                            </p>
                                        </div>

                                        <DropdownItem
                                            href="/dashboard"
                                            label="Dashboard"
                                            icon="dashboard"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        />
                                        <DropdownItem
                                            href="/dashboard/profile"
                                            label="My Profile"
                                            icon="person"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        />
                                        <DropdownItem
                                            href="/dashboard/roadmap"
                                            label="Generate Roadmaps"
                                            icon="map"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        />

                                        <hr className="border-white/5 my-2" />

                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all group"
                                        >
                                            <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">
                                                logout
                                            </span>
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link href="/login">
                                <button className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium">
                                    Log In
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="bg-primary text-white px-5 py-2 rounded-xl font-bold text-sm neon-glow-primary hover:scale-105 transition-all">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}

// Helper Component for Dropdown Items
function DropdownItem({
    href,
    label,
    icon,
    onClick,
}: {
    href: string;
    label: string;
    icon?: string;
    onClick: () => void;
}) {
    return (
        <Link href={href} onClick={onClick}>
            <span className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-primary transition-all cursor-pointer group">
                {icon && (
                    <span className="material-symbols-outlined text-lg opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all">
                        {icon}
                    </span>
                )}
                {label}
            </span>
        </Link>
    );
}
