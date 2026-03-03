const EmptyRoadmapState = () => {
    return (
        <div
            className="relative overflow-hidden flex flex-col items-center justify-center p-12 text-center 
                        bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl 
                        transition-all duration-300 hover:bg-white/15 hover:border-white/30"
        >
            {/* Soft Glow Effect behind the icon */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />

            <div className="relative bg-white/10 p-5 rounded-2xl mb-6 shadow-inner border border-white/10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                </svg>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                Ready to Master a New Skill?
            </h3>

            <p className="text-blue-100/70 max-w-sm mb-8 leading-relaxed font-light">
                Fill out the form above to generate a professional, AI-powered
                learning architect roadmap tailored to your schedule and skill
                level.
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-blue-300 animate-pulse bg-white/5 py-2 px-4 rounded-full border border-white/5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                </svg>
                <span className="tracking-wide uppercase text-xs">
                    Start by entering a skill above
                </span>
            </div>
        </div>
    );
};

export default EmptyRoadmapState;
