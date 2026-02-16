"use client";
import React from "react";


const Footer = () => {
    return (
        <footer className="relative bg-[#050511] pt-20 pb-10 border-t border-white/5 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                {/* Brand Column (Span 4) */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                        <span className="font-bold text-2xl text-white tracking-tight">CareerPilot AI</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed max-w-sm">
                        Empowering the next generation of global talent through hyper-personalized AI career intelligence.
                    </p>
                </div>

                {/* Spacer (Span 2) */}
                <div className="hidden md:block md:col-span-2"></div>

                {/* Links Section (Span 6 - Grid for Platform, Company, Social) */}
                <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {/* Platform */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Platform</h4>
                        <ul className="space-y-4">
                            {['Roadmaps', 'AI Mentor', 'Interview Prep', 'Skill Graph'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
                        <ul className="space-y-4">
                            {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Social</h4>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all border border-white/10 hover:border-primary/50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all border border-white/10 hover:border-primary/50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">
                    © 2024 CareerPilot AI. All rights reserved.
                </p>
                <div className="flex gap-8">
                    <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                    <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                    <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
