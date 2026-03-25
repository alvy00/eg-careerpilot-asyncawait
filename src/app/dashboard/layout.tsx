"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, LogOut } from "lucide-react";
import ProtectedRoute from "@/components/protectedRoute";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [isSuspended, setIsSuspended] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            if (!user?.email) {
                setIsChecking(false);
                return;
            }

            try {
                const token = await user.getIdToken();

                const res = await fetch(`/api/users?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const dbUser = await res.json();

                if (dbUser?.isSuspended) {
                    setIsSuspended(true);
                }
            } catch (error) {
                console.error("Access Check Error:", error);
            } finally {
                setIsChecking(false);
            }
        };

        checkStatus();
    }, [user]);

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: "dashboard" },
        { name: "Roadmap", href: "/dashboard/roadmap", icon: "map" },
        { name: "AI Mentor", href: "/dashboard/mentor", icon: "smart_toy" },
        {
            name: "Mock Interview",
            href: "/dashboard/interview",
            icon: "psychology",
        },
        {
            name: "Interview Bank",
            href: "/dashboard/interview-bank",
            icon: "library_books",
        },
        {
            name: "Skill Mastery",
            href: "/dashboard/skill-mastery",
            icon: "star",
        },
        { name: "Community", href: "/dashboard/community", icon: "groups" },
        {
            name: "Progress & History",
            href: "/dashboard/progress",
            icon: "trending_up",
        },
        { name: "Focus Timer", href: "/dashboard/focus-timer", icon: "timer" },
        {
            name: "Calendar",
            href: "/dashboard/calendar",
            icon: "calendar_today",
        },
        { name: "Activity", href: "/dashboard/activity", icon: "activity" },
    ];

    const isActivePath = (href: string) => {
        if (href === "/dashboard") return pathname === "/dashboard";
        return pathname === href || pathname.startsWith(href + "/");
    };

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    if (isChecking && user) {
        return (
            <div className="h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-slate-950 text-white overflow-hidden relative">
                {/* SUSPENDED USER OVERLAY */}
                <AnimatePresence>
                    {isSuspended && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-6"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-[#111622] border border-white/10 p-8 rounded-[32px] max-w-md w-full text-center shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 blur-[100px]" />

                                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                                    <ShieldAlert className="w-10 h-10 text-red-500" />
                                </div>

                                <h2 className="text-2xl font-black text-white mb-3">
                                    Access Restricted
                                </h2>

                                <p className="text-slate-400 mb-8 text-sm">
                                    Your access to CareerPilot has been
                                    restricted due to a violation of our
                                    guidelines. Please contact support for help.
                                </p>

                                <button
                                    onClick={handleLogout}
                                    className="w-full py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MOBILE HAMBURGER */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl transition-all duration-300 hover:bg-slate-800 active:scale-95 group shadow-2xl"
                >
                    <div className="w-5 h-4 flex flex-col justify-between">
                        <motion.span
                            animate={
                                isOpen
                                    ? { rotate: 45, y: 7 }
                                    : { rotate: 0, y: 0 }
                            }
                            className="h-0.5 w-full bg-white rounded"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="h-0.5 w-full bg-white rounded"
                        />
                        <motion.span
                            animate={
                                isOpen
                                    ? { rotate: -45, y: -7 }
                                    : { rotate: 0, y: 0 }
                            }
                            className="h-0.5 w-full bg-white rounded"
                        />
                    </div>
                </button>

                {/* MOBILE OVERLAY */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            onClick={() => setIsOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40 lg:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* SIDEBAR */}
                <aside
                    className={`
          fixed inset-y-0 left-0 z-50 w-64 glass-sidebar border-r border-white/5
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative
        `}
                >
                    {/* LOGO */}
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <div className="p-8 flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">
                                    rocket_launch
                                </span>
                            </div>
                            <h1 className="font-bold text-lg">CareerPilot</h1>
                        </div>
                    </Link>

                    {/* NAV */}
                    <nav className="px-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const active = isActivePath(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div
                                        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition
                    ${
                        active
                            ? "text-primary bg-primary/10"
                            : "text-slate-400 hover:text-white"
                    }`}
                                    >
                                        <span className="material-symbols-outlined">
                                            {item.icon}
                                        </span>

                                        <span className="text-sm font-medium">
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* PROFILE + PRO */}
                    <div className="p-4 border-t border-white/5">
                        <Link
                            href="/dashboard/profile"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined">
                                    person
                                </span>
                                Profile
                            </div>
                        </Link>

                        <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                            <p className="text-xs text-primary font-bold">
                                PRO PLAN
                            </p>

                            <p className="text-xs text-slate-300 mt-2">
                                Unlock unlimited AI mentoring sessions.
                            </p>

                            <button className="mt-3 w-full py-2 bg-primary text-white rounded-lg text-xs font-bold">
                                Upgrade
                            </button>
                        </div>
                    </div>
                </aside>

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 lg:pt-8">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
