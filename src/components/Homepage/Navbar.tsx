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
                    {["Home", "Roadmaps"].map((item) => (
                        <Link key={item} href={`/${item.toLowerCase()}`}>
                            <span className="text-sm font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                                {item}
                            </span>
                        </Link>
                    ))}
                    <Link href="/dashboard/mentor">
                        <span className="text-sm font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                            AI Mentor
                        </span>
                    </Link>
                    <Link href="/dashboard/interview">
                        <span className="text-sm font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                            Mock Interview
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
                                        className="absolute right-0 mt-3 w-52 glass-card border border-white/10 rounded-xl overflow-hidden shadow-2xl py-2 z-[60]"
                                    >
                                        <DropdownItem
                                            href="/dashboard"
                                            label="Dashboard"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        />
                                        <DropdownItem
                                            href="/profile"
                                            label="My Profile"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        />
                                        <DropdownItem
                                            href="/generate-roadmap"
                                            label="Generate Roadmap"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        />
                                        <hr className="border-white/10 my-1" />
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
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
    onClick,
}: {
    href: string;
    label: string;
    onClick: () => void;
}) {
    return (
        <Link href={href} onClick={onClick}>
            <span className="block px-4 py-2.5 text-sm text-white/80 hover:bg-primary/20 hover:text-white transition-colors cursor-pointer">
                {label}
            </span>
        </Link>
    );
}
