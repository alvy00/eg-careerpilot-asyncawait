import React from 'react';
import { Play, Award } from 'lucide-react';

// ─── Mesh Background ───────────────────────────────────────────────────────────
// Warm coral-to-violet mesh that complements the banner's blue/orange/yellow palette
const meshStyles = `
  .mesh-gradient {
    background-color: #0f0c29;
    background-image:
      radial-gradient(at 20% 30%,  #1a1a6e 0px, transparent 55%),
      radial-gradient(at 80% 10%,  #2563eb 0px, transparent 50%),
      radial-gradient(at 60% 80%,  #1d4ed8 0px, transparent 50%),
      radial-gradient(at 10% 80%,  #0ea5e9 0px, transparent 45%),
      radial-gradient(at 90% 60%,  #7c3aed 0px, transparent 45%),
      radial-gradient(at 40% 50%,  #0f172a 0px, transparent 60%);
  }
`;

export function MeshBackground() {
  return (
    <>
      <style>{meshStyles}</style>
      <div className="fixed inset-0 mesh-gradient -z-10" />
    </>
  );
}

// ─── Hero Banner ───────────────────────────────────────────────────────────────
export default function HeroBanner() {
  return (
    // Remove the opaque bg-gradient — let mesh show through
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative dots pattern - top right */}
      <div className="absolute top-8 right-8 grid grid-cols-3 gap-2 opacity-20">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-blue-300 rounded-full" />
        ))}
      </div>

      {/* Decorative dots pattern - bottom right */}
      <div className="absolute bottom-8 right-8 grid grid-cols-3 gap-2 opacity-20">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-blue-300 rounded-full" />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Turn on{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">your skills</span>
                  {/* Frosted highlight instead of gray-200 slab */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg transform -rotate-1" />
                </span>
              </h1>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                and learn new things
              </h1>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                anywhere{' '}
                <span className="relative inline-block px-4">
                  <span className="relative z-10 text-yellow-300 italic font-semibold">easily</span>
                  <div className="absolute inset-0 border-2 border-dashed border-yellow-400/60 rounded" />
                </span>
              </h1>
            </div>

            <p className="text-blue-100/80 text-lg max-w-md">
              Teachza is an online learning application, you can find various subjects and also the best tutors here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <button className="bg-white hover:bg-blue-50 text-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-900/40">
                Join For Free
              </button>
              <button className="bg-blue-500 hover:bg-blue-400 text-white p-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/40 flex items-center gap-2">
                <Play className="w-5 h-5 fill-white" />
              </button>
              <span className="text-blue-100 font-medium">Learn More</span>
            </div>

            {/* Achievement Badge */}
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-md border border-white/20">
              <div className="bg-yellow-400 p-3 rounded-full flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-blue-100 leading-relaxed">
                <span className="font-semibold text-white">Has been awarded the number 1 online course in the world,</span>{' '}
                and the most application users during 2022
              </div>
            </div>
          </div>

          {/* Right Illustration Section */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main blue circular background — slightly lighter than mesh */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 lg:w-96 lg:h-96 bg-blue-600/70 backdrop-blur-sm rounded-full shadow-2xl shadow-blue-900/60" />
            </div>

            {/* Yellow ring decoration */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12">
              <div className="w-96 h-96 border-8 border-yellow-400 rounded-full opacity-50" />
            </div>

            {/* Green triangle decoration */}
            <div className="absolute top-1/4 left-0 lg:left-8">
              <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-emerald-400 opacity-70" />
            </div>

            {/* Character illustration */}
            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="relative">
                <div className="flex flex-col items-center">
                  {/* Head */}
                  <div className="w-16 h-16 bg-orange-300 rounded-full mb-2 border-4 border-orange-400" />

                  {/* Body */}
                  <div className="w-32 h-40 bg-orange-500 rounded-3xl relative shadow-lg">
                    {/* Arms */}
                    <div className="absolute -left-8 top-8 w-24 h-6 bg-orange-500 rounded-full transform -rotate-45 shadow-md" />
                    <div className="absolute -right-8 top-8 w-24 h-6 bg-orange-500 rounded-full transform rotate-45 shadow-md" />
                  </div>

                  {/* Laptop */}
                  <div className="relative -mt-12 z-20">
                    <div className="w-24 h-16 bg-yellow-400 rounded-lg shadow-2xl flex items-center justify-center border-2 border-yellow-500">
                      <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-orange-500" />
                    </div>
                  </div>

                  {/* Legs */}
                  <div className="w-28 h-32 bg-blue-600 rounded-b-3xl shadow-lg" />

                  {/* Feet */}
                  <div className="flex gap-4 -mt-2">
                    <div className="w-12 h-8 bg-gray-800 rounded-full shadow-md" />
                    <div className="w-12 h-8 bg-gray-800 rounded-full shadow-md" />
                  </div>
                </div>

                {/* Video player card */}
                <div className="absolute -right-12 top-24 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300 cursor-pointer">
                  <div className="w-40 h-24 bg-gradient-to-br from-red-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-red-500 fill-red-500 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 text-4xl animate-bounce text-yellow-300">✓</div>
                <div className="absolute top-0 right-24 text-2xl">✏️</div>
              </div>

              {/* Stats Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-80 mt-12 transform hover:scale-105 transition-transform duration-300 border border-white/20">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">55K+</div>
                    <div className="text-sm text-blue-200 mt-1">Tutors</div>
                  </div>
                  <div className="text-center border-l border-r border-white/20">
                    <div className="text-3xl font-bold text-white">89K+</div>
                    <div className="text-sm text-blue-200 mt-1">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">150</div>
                    <div className="text-sm text-blue-200 mt-1">Subjects</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orange decorative blob */}
            <div className="absolute bottom-12 right-12 w-24 h-32 bg-orange-400/60 rounded-full transform rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}