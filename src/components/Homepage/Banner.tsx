export default function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white">

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-8">
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          <span className="text-sm tracking-wide text-gray-200">
            NEXT-GEN CAREER INTELLIGENCE
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Your AI-Powered
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
            Career GPS
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed">
          Navigate the modern job market with personalized skill roadmaps, 24/7
          AI mentorship, and real-time industry gap analysis.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 transition transform shadow-lg shadow-orange-500/30">
            ✨ Generate My Roadmap
          </button>

          <button className="px-8 py-4 rounded-xl font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition backdrop-blur-md">
            Try AI Mentor
          </button>
        </div>
      </div>
    </section>
  );
}
