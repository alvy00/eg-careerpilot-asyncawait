import React from "react";

const JourneySection = () => {
    const steps = [
        {
            id: "01",
            title: "Tell Us Your Goal",
            description:
                "Specify your dream role and target companies. We'll analyze your current profile.",
        },
        {
            id: "02",
            title: "Get Your Roadmap",
            description:
                "Receive a data-driven, step-by-step path tailored to your specific time and background.",
        },
        {
            id: "03",
            title: "Master & Get Hired",
            description:
                "Complete projects, ace interviews with AI help, and land your next big opportunity.",
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Your Journey to <span className="text-primary">Mastery</span>
                    </h2>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

                    {steps.map((step) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 mb-6 rounded-full glass-card flex items-center justify-center border border-primary/20 neon-glow-primary bg-[#0a0a1a]">
                                <span className="text-3xl font-bold text-primary">{step.id}</span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                            <p className="text-white/60 leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySection;
