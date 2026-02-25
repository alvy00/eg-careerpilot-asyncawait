"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <nav className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card rounded-2xl px-8 py-3">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-primary">C</span>areer
            <span className="text-primary">P</span>ilot
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <span className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Home
          </span>
          <span className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Roadmaps
          </span>
          <Link href="dashboard/mentor">
            <span className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              AI Mentor
            </span>
          </Link>
          <Link href="dashboard/interview">
            <span className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Mock Interview
            </span>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-3 mr-2">
                <span className="text-xs font-medium text-white/60 hidden sm:block">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-primary/50"
                  />
                )}
              </div>
              <button
                onClick={logout}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm neon-glow-primary hover:scale-105 cursor-pointer transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm neon-glow-primary hover:scale-105 cursor-pointer transition-all">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm neon-glow-primary hover:scale-105 cursor-pointer transition-all">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
