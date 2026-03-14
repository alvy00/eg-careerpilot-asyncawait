"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

export default function Navbar() {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    if (loading) return null;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Roadmaps", href: "/dashboard/roadmap" },
        { name: "Mock Interview", href: "/dashboard/interview" },
        { name: "About", href: "/about" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/[0.02] rounded-2xl px-8 py-3 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                {/* Logo: Modern Letter Spacing Animation */}
                <Link
                    href="/"
                    className="group flex items-center gap-1 transition-all duration-300"
                >
                    <h1 className="text-xl font-black tracking-tighter text-white group-hover:tracking-normal transition-all duration-500">
                        <span className="text-primary italic">C</span>areer
                        <span className="text-primary italic">P</span>ilot
                    </h1>
                </Link>

                {/* Navigation: Animated Underscores */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 group"
                            >
                                <span
                                    className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${
                                        isActive
                                            ? "text-primary"
                                            : "text-white/60 group-hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-white/[0.03] rounded-lg border border-white/5"
                                    />
                                )}
                                <div className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </Link>
                        );
                    })}
                </div>

                {/* Actions: High-End Micro-interactions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-all outline-none"
                            >
                                <img
                                    src={
                                        user.photoURL ||
                                        `https://ui-avatars.com/api/?name=${user.email}&background=0D0D0D&color=fff`
                                    }
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors object-cover"
                                />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <>
                                        {/* Backdrop to close dropdown */}
                                        <div
                                            className="fixed inset-0 z-[-1]"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        />
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.9,
                                                y: 10,
                                                rotateX: -15,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                                rotateX: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.9,
                                                y: 10,
                                            }}
                                            className="absolute right-0 mt-4 w-60 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl py-2 origin-top-right perspective-1000"
                                        >
                                            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-black mb-1">
                                                    Authenticated
                                                </p>
                                                <p className="text-xs text-white/50 truncate font-mono">
                                                    {user.email}
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
                                                label="Profile Settings"
                                                icon="person"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            />
                                            <hr className="border-white/5 my-1" />
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all font-bold group"
                                            >
                                                <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">
                                                    logout
                                                </span>
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="group relative px-5 py-2 flex items-center justify-center transition-all duration-300"
                            >
                                {/* The Hover Background - "Ghost Pill" */}
                                <div className="absolute inset-0 bg-white/[0.03] rounded-full scale-75 opacity-0 blur-sm group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out border border-white/5" />

                                {/* The Text */}
                                <span className="relative z-10 text-sm font-bold text-slate-400 group-hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                                    Login
                                    {/* Subtle Arrow Reveal */}
                                    <span className="inline-block translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out text-xs">
                                        →
                                    </span>
                                </span>

                                {/* Bottom Glow Line */}
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:w-1/2 transition-all duration-500" />
                            </Link>
                            <Link
                                href="/signup"
                                className="relative group px-6 py-2.5 rounded-xl font-black text-xs text-black transition-all active:scale-95 overflow-hidden"
                            >
                                {/* 1. The Main Button Body */}
                                <div className="absolute inset-0 bg-primary transition-transform duration-300 group-hover:scale-[1.02]" />

                                {/* 2. The "Aura" Glow (Moves with hover) */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(255,255,255,0.4)_0%,transparent_50%)]"
                                    onMouseMove={(e) => {
                                        const rect =
                                            e.currentTarget.getBoundingClientRect();
                                        e.currentTarget.style.setProperty(
                                            "--x",
                                            `${e.clientX - rect.left}px`,
                                        );
                                        e.currentTarget.style.setProperty(
                                            "--y",
                                            `${e.clientY - rect.top}px`,
                                        );
                                    }}
                                />

                                {/* 3. The Animated Border Beam */}
                                <div className="absolute inset-0 rounded-xl border border-white/40 group-hover:border-white/60 transition-colors" />

                                {/* 4. Text with "Lift" effect */}
                                <span className="relative flex items-center gap-2 tracking-widest uppercase">
                                    Get Started
                                </span>

                                {/* 5. The Outer Shadow (External Glow) */}
                                <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}

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
        <Link href={href} onClick={onClick} className="block group">
            <span className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/[0.03] hover:text-primary transition-all">
                {icon && (
                    <span className="material-symbols-outlined text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        {icon}
                    </span>
                )}
                {label}
            </span>
        </Link>
    );
}
