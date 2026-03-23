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
  const [isOpen, setIsOpen] = useState(false); // State for mobile sidebar
  const [isChecking, setIsChecking] = useState(true);
  const [isSuspended, setIsSuspended] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (!user?.email) return;

      try {
        const token = await user.getIdToken();
        const res = await fetch(`/api/users?email=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [user, router, logout]);

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

    { name: "Skill Mastery", href: "/dashboard/skill-mastery", icon: "star" },
    { name: "Community", href: "/dashboard/community", icon: "library_books" },

    {
      name: "Progress & History",
      href: "/dashboard/progress",
      icon: "trending_up",
    },
    { name: "Focus Timer", href: "/dashboard/focus-timer", icon: "timer" },
    { name: "Calendar", href: "/dashboard/calendar", icon: "calendar_today" },

    {
      name: "Activity",
      href: "/dashboard/activity",
      icon: "activity",
      isLucide: true,
    },
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
        {/* --- SUSPENDED USER UI OVERLAY --- */}
        <AnimatePresence>
          {isSuspended && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#111622] border border-white/10 p-8 rounded-[32px] max-w-md w-full text-center shadow-2xl relative overflow-hidden"
              >
                {/* Decorative Background Glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 blur-[100px]" />

                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                  <ShieldAlert className="w-10 h-10 text-red-500" />
                </div>

                <h2 className="text-2xl font-black text-white mb-3 tracking-tight">
                  Access Restricted
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                  Your access to **CareerPilot** has been restricted due to a
                  violation of our community guidelines or terms of service.
                  Please contact our support team for further assistance.
                </p>

                <button
                  onClick={handleLogout}
                  className="w-full py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl"
                >
                  <LogOut className="w-5 h-5" />
                  Logout Account
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* MOBILE HAMBURGER BUTTON */}
        {/* MOBILE MORPHING HAMBURGER */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl transition-all duration-300 hover:bg-slate-800 active:scale-95 group shadow-2xl"
          aria-label="Toggle Menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between items-center relative">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-full h-0.5 bg-white rounded-full ${!isOpen && "group-hover:bg-primary"}`}
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`w-full h-0.5 bg-white rounded-full ${!isOpen && "group-hover:bg-primary"}`}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-full h-0.5 bg-white rounded-full ${!isOpen && "group-hover:bg-primary"}`}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* SIDEBAR */}
        <aside
          className={`
        fixed inset-y-0 left-0 z-50 w-64 glass-sidebar h-full flex flex-col shrink-0 border-r border-white/5 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        >
          {/* LOGO */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="p-8 flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center neon-glow">
                <span className="material-symbols-outlined text-white text-xl">
                  rocket_launch
                </span>
              </div>
              <h1 className="font-bold text-lg tracking-tight">CareerPilot</h1>
            </div>
          </Link>

          {/* NAVIGATION */}
          <nav className="flex-1 px-4 space-y-2 relative overflow-y-auto">
            {navItems.map((item) => {
              const active = isActivePath(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative block"
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${active ? "text-primary" : "text-slate-400 hover:text-white"}`}
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
                      {item.icon}
                    </span>

                    <p
                      className={`text-sm relative z-10 ${active ? "font-semibold" : "font-medium"}`}
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
            {(() => {
              const active = pathname === "/dashboard/profile";
              return (
                <Link
                  href="/dashboard/profile"
                  className="relative block"
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${active ? "text-primary" : "text-slate-400 hover:text-white"}`}
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
                    <p className="text-sm font-medium relative z-10">Profile</p>
                  </div>
                </Link>
              );
            })()}

            {/* PRO CARD - Hidden on small heights to prevent overflow */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/10 hidden sm:block">
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
        <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 pt-20 lg:pt-8">
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
    </ProtectedRoute>
  );
}
