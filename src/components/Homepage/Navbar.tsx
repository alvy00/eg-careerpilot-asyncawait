"use client";

export default function Navbar() {
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
                    <a
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                        href="#"
                    >
                        Features
                    </a>
                    <a
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                        href="#"
                    >
                        Roadmaps
                    </a>
                    <a
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                        href="#"
                    >
                        AI Mentor
                    </a>
                    <a
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                        href="#"
                    >
                        Pricing
                    </a>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4">
                    <button className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">
                        Log In
                    </button>
                    <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm neon-glow-primary hover:scale-105 transition-all">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
