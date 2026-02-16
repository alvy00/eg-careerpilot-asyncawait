import React from "react";

const CTASection = () => {
    return (
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-24 text-center relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl -z-10 group-hover:bg-primary/30 transition-colors duration-500" />

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    Ready to take the <span className="text-primary">pilot's seat?</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
                    Join 50,000+ professionals accelerating their careers with AI guidance.
                </p>

                <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 neon-glow-primary active:scale-95">
                        Start Your Free Journey
                    </button>
                    <span className="text-xs sm:text-sm text-white/40">
                        No credit card required. Cancel anytime.
                    </span>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
