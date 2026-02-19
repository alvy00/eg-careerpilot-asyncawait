"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: "dashboard" },
        { name: "Roadmaps", href: "/dashboard/roadmap", icon: "map" },
        { name: "AI Mentor", href: "/dashboard/mentor", icon: "smart_toy" },
        {
            name: "Mock Interview",
            href: "/dashboard/interview",
            icon: "psychology",
        },
        { name: "Progress", href: "/dashboard/progress", icon: "trending_up" },
    ];

    return (
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
            {/* SIDEBAR */}
            <aside className="w-64 glass-sidebar h-full flex flex-col shrink-0 border-r border-white/5">
                {/* LOGO */}
                <Link href="/">
                    <div className="p-8 flex items-center gap-3 cursor-pointer">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center neon-glow">
                            <span className="material-symbols-outlined text-white text-xl">
                                rocket_launch
                            </span>
                        </div>
                        <h1 className="font-bold text-lg tracking-tight">
                            CareerPilot
                        </h1>
                    </div>
                </Link>

                {/* NAVIGATION */}
                <nav className="flex-1 px-4 space-y-2 relative">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/dashboard" &&
                                pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative block"
                            >
                                <div
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                                    ${
                                        isActive
                                            ? "text-primary"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    {/* Active Background */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 35,
                                            }}
                                        />
                                    )}

                                    {/* Active Left Bar */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-bar"
                                            className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-full"
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 35,
                                            }}
                                        />
                                    )}

                                    <span className="material-symbols-outlined relative z-10">
                                        {item.icon}
                                    </span>

                                    <p
                                        className={`text-sm relative z-10 ${
                                            isActive
                                                ? "font-semibold"
                                                : "font-medium"
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* BOTTOM SECTION */}
                <div className="p-4 border-t border-white/5">
                    <Link href="/dashboard/profile" className="relative block">
                        <div
                            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                            ${
                                pathname === "/dashboard/profile"
                                    ? "text-primary"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            {pathname === "/dashboard/profile" && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 35,
                                    }}
                                />
                            )}

                            <span className="material-symbols-outlined relative z-10">
                                person
                            </span>
                            <p className="text-sm font-medium relative z-10">
                                Profile
                            </p>
                        </div>
                    </Link>

                    {/* PRO CARD */}
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/10">
                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">
                            PRO PLAN
                        </p>
                        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                            Unlock unlimited AI mentoring sessions.
                        </p>
                        <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all duration-300 neon-glow hover:scale-[1.02]">
                            Upgrade
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 h-full overflow-y-auto p-8">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
