"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, BookOpen, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Sync theme from localStorage so dark/light mode works in dashboard
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: "dashboard" },
    { name: "Roadmaps", href: "/dashboard/roadmap", icon: "map" },
    { name: "AI Mentor", href: "/dashboard/mentor", icon: "smart_toy" },
    { name: "Mock Interview", href: "/dashboard/interview", icon: "psychology" },
    { name: "Interview Bank", href: "/dashboard/interview-bank", icon: "library_books" },
    { name: "Skill Mastery", href: "/dashboard/skill-mastery", icon: "star" },
    { name: "Progress & History", href: "/dashboard/progress", icon: "trending_up" },
  ];

  const studyPlannerItems = [
    { name: "Focus Timer", href: "/dashboard/focus-timer", icon: "timer", lucide: false },
    { name: "Calendar", href: "/dashboard/calendar", icon: "calendar_today", lucide: false },
    { name: "Activity", href: "/dashboard/activity", icon: null, lucide: true },
  ];

  const isActivePath = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isStudyPlannerActive = studyPlannerItems.some((i) => isActivePath(i.href));
  const [studyPlannerOpen, setStudyPlannerOpen] = useState(isStudyPlannerActive);

  const toggleSidebar = () => setIsOpen(!isOpen);

  /* Shared nav item renderer */
  const NavItem = ({
    href,
    icon,
    lucide,
    name,
    small,
  }: {
    href: string;
    icon: string | null;
    lucide: boolean;
    name: string;
    small?: boolean;
  }) => {
    const active = isActivePath(href);
    return (
      <Link href={href} className="relative block" onClick={() => setIsOpen(false)}>
        <div
          className={`relative flex items-center gap-3 px-4 rounded-xl transition-all duration-300
            ${small ? "py-2.5" : "py-3"}
            ${active ? "text-primary" : "text-muted hover:text-foreground"}`}
        >
          {active && (
            <motion.div
              layoutId="sidebar-active-pill"
              className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          )}
          {active && (
            <motion.div
              layoutId="sidebar-active-bar"
              className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          )}
          {lucide ? (
            <Activity size={small ? 18 : 22} className="relative z-10" />
          ) : (
            <span className={`material-symbols-outlined relative z-10 ${small ? "text-[18px]" : ""}`}>
              {icon}
            </span>
          )}
          <p className={`text-sm relative z-10 ${active ? "font-semibold" : "font-medium"}`}>
            {name}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden relative">
      {/* MOBILE HAMBURGER */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-card-bg backdrop-blur-md border border-card-border rounded-xl transition-all duration-300 hover:border-primary/40 active:scale-95 group shadow-2xl"
        aria-label="Toggle Menu"
      >
        <div className="w-5 h-4 flex flex-col justify-between items-center relative">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-0.5 bg-foreground rounded-full ${!isOpen && "group-hover:bg-primary"}`}
          />
          <motion.span
            animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`w-full h-0.5 bg-foreground rounded-full ${!isOpen && "group-hover:bg-primary"}`}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-0.5 bg-foreground rounded-full ${!isOpen && "group-hover:bg-primary"}`}
          />
        </div>
      </button>

      {/* MOBILE OVERLAY */}
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
          fixed inset-y-0 left-0 z-50 w-64 glass-sidebar h-full flex flex-col shrink-0
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO */}
        <Link href="/" onClick={() => setIsOpen(false)}>
          <div className="p-8 flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center neon-glow">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <h1 className="font-bold text-lg tracking-tight text-foreground">CareerPilot</h1>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-1 relative overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} lucide={false} />
          ))}

          {/* STUDY PLANNER COLLAPSIBLE */}
          <div className="pt-1">
            <button
              onClick={() => setStudyPlannerOpen((prev) => !prev)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${isStudyPlannerActive ? "text-primary bg-primary/10 border border-primary/20" : "text-muted hover:text-foreground hover:bg-card-bg"}`}
            >
              <BookOpen size={20} className="shrink-0" />
              <p className={`text-sm flex-1 text-left ${isStudyPlannerActive ? "font-semibold" : "font-medium"}`}>
                Study Planner
              </p>
              <motion.div animate={{ rotate: studyPlannerOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {studyPlannerOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden pl-3 mt-1 space-y-1"
                >
                  {studyPlannerItems.map((item) => (
                    <NavItem key={item.href} {...item} small />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* BOTTOM SECTION */}
        <div className="p-4 border-t border-card-border">
          {/* Profile */}
          {(() => {
            const active = pathname === "/dashboard/profile";
            return (
              <Link href="/dashboard/profile" className="relative block" onClick={() => setIsOpen(false)}>
                <div
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${active ? "text-primary" : "text-muted hover:text-foreground"}`}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  {active && (
                    <motion.div
                      layoutId="sidebar-active-bar"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="material-symbols-outlined relative z-10">person</span>
                  <p className="text-sm font-medium relative z-10">Profile</p>
                </div>
              </Link>
            );
          })()}

          {/* PRO CARD */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/20 via-primary/5 to-accent/10 border border-primary/20 hidden sm:block">
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">PRO PLAN</p>
            <p className="text-xs text-muted mb-3 leading-relaxed">
              Unlock unlimited AI mentoring sessions.
            </p>
            <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all duration-300 neon-glow hover:scale-[1.02]">
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 pt-20 lg:pt-8 bg-body-bg">
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
