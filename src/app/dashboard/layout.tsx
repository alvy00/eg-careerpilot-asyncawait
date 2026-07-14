"use client";

import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/protectedRoute";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const { logout } = useAuth();

    useEffect(() => {
        const saved =
            (localStorage.getItem("theme") as "dark" | "light") || "dark";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setIsOpen(false);
            router.push("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: "dashboard" },
        { name: "Roadmaps", href: "/dashboard/roadmap", icon: "map" },
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
        {
            name: "Progress & History",
            href: "/dashboard/progress",
            icon: "trending_up",
        },
    ];

    const isActivePath = (href: string) => {
        if (href === "/dashboard") return pathname === "/dashboard";
        return pathname === href || pathname.startsWith(href + "/");
    };

    const NavItem = ({
        href,
        icon,
        name,
    }: {
        href: string;
        icon: string;
        name: string;
    }) => {
        const active = isActivePath(href);
        return (
            <Link
                href={href}
                className="relative block"
                onClick={() => setIsOpen(false)}
            >
                <div
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
          ${active ? "text-primary" : "text-muted hover:text-foreground"}`}
                >
                    {active && (
                        <motion.div
                            layoutId="sidebar-active-pill"
                            className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 35,
                            }}
                        />
                    )}
                    {active && (
                        <motion.div
                            layoutId="sidebar-active-bar"
                            className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-full"
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 35,
                            }}
                        />
                    )}
                    <span className="material-symbols-outlined relative z-10">
                        {icon}
                    </span>
                    <p
                        className={`text-sm relative z-10 ${active ? "font-semibold" : "font-medium"}`}
                    >
                        {name}
                    </p>
                </div>
            </Link>
        );
    };

    return (
        <ProtectedRoute>
            <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
                {/* ── MOBILE TOP BAR ───────────────────────────────────── */}
                <header className="lg:hidden shrink-0 h-14 flex items-center justify-between px-4 border-b border-card-border bg-card-bg z-30">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/Gemini_Generated_Image_kk8hwqkk8hwqkk8h.png"
                            alt="CareerPilot"
                            className="h-8 w-8 rounded-lg object-cover"
                        />
                        <span className="font-bold text-sm tracking-tight text-foreground">
                            CareerPilot
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl border border-card-border bg-body-bg text-muted hover:text-foreground transition-all"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun size={16} />
                            ) : (
                                <Moon size={16} />
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl border border-card-border bg-body-bg text-muted hover:text-foreground transition-all"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </header>

                {/* ── BODY (sidebar + main) ─────────────────────────────── */}
                <div className="flex flex-1 overflow-hidden relative">
                    {/* OVERLAY */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-secondary/70 backdrop-blur-xl z-40 lg:hidden"
                            />
                        )}
                    </AnimatePresence>

                    {/* SIDEBAR */}
                    <aside
                        className={`
              fixed top-14 bottom-0 left-0 z-50 w-64 glass-sidebar flex flex-col shrink-0
              transition-transform duration-300 ease-in-out
              lg:static lg:top-auto lg:translate-x-0 lg:h-full
              ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
                    >
                        {/* Logo — desktop only */}
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="hidden lg:block"
                        >
                            <div className="p-6 pb-4 flex items-center gap-3 cursor-pointer">
                                <img
                                    src="/careerpilot.png"
                                    alt="CareerPilot"
                                    className="h-9 w-9 rounded-lg object-cover"
                                />
                                <span className="font-bold text-base tracking-tight text-foreground">
                                    Career{" "}
                                    <span className="text-orange-500">
                                        Pilot
                                    </span>
                                </span>
                            </div>
                        </Link>
                        <div className="lg:hidden h-3" />

                        {/* NAV */}
                        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                            {navItems.map((item) => (
                                <NavItem key={item.href} {...item} />
                            ))}
                        </nav>

                        {/* BOTTOM */}
                        <div className="p-4 border-t border-card-border">
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-card-bg transition-all duration-300 mb-1"
                            >
                                {theme === "dark" ? (
                                    <Sun
                                        size={20}
                                        className="text-primary shrink-0"
                                    />
                                ) : (
                                    <Moon
                                        size={20}
                                        className="text-primary shrink-0"
                                    />
                                )}
                                <p className="text-sm font-medium">
                                    {theme === "dark"
                                        ? "Light Mode"
                                        : "Dark Mode"}
                                </p>
                            </button>

                            {(() => {
                                const active =
                                    pathname === "/dashboard/profile";
                                return (
                                    <Link
                                        href="/dashboard/profile"
                                        className="relative block"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div
                                            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                                ${active ? "text-primary" : "text-muted hover:text-foreground"}`}
                                        >
                                            {active && (
                                                <motion.div
                                                    layoutId="sidebar-active-pill"
                                                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 35,
                                                    }}
                                                />
                                            )}
                                            {active && (
                                                <motion.div
                                                    layoutId="sidebar-active-bar"
                                                    className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-full"
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
                                );
                            })()}

                            {/* LOGOUT BUTTON */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-300 mt-1 cursor-pointer"
                            >
                                <span className="material-symbols-outlined shrink-0">
                                    logout
                                </span>
                                <p className="text-sm font-medium">Logout</p>
                            </button>

                            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/20 via-primary/5 to-accent/10 border border-primary/20 hidden sm:block">
                                <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">
                                    PRO PLAN
                                </p>
                                <p className="text-xs text-muted mb-3 leading-relaxed">
                                    Unlock unlimited AI mentoring sessions.
                                </p>
                                <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all duration-300 neon-glow hover:scale-[1.02]">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN */}
                    <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 bg-background">
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
            </div>
        </ProtectedRoute>
    );
}
