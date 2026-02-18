"use client";
import React from 'react';

export default function CollaborationSection() {
  return (
    // Remove opaque bg-white — let mesh show through
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {/* Yellow hand icon */}
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="transform -rotate-12">
            <path
              d="M15 20C15 20 18 15 22 15C26 15 28 18 28 18L35 12C35 12 38 9 42 12C46 15 45 20 45 20L38 28C38 28 35 32 30 32H22C17 32 15 28 15 28V20Z"
              fill="#F59E0B"
            />
            <ellipse cx="18" cy="25" rx="3" ry="5" fill="#F59E0B" transform="rotate(-20 18 25)" />
          </svg>

          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            We Collaborate With Various
            <br />
            <span className="relative inline-block mt-2">
              Big Companies
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="#60A5FA"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Company Logos */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">

          {/* Google */}
          <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
              <text x="0" y="30" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold">
                <tspan fill="#4285F4">G</tspan>
                <tspan fill="#EA4335">o</tspan>
                <tspan fill="#FBBC04">o</tspan>
                <tspan fill="#4285F4">g</tspan>
                <tspan fill="#34A853">l</tspan>
                <tspan fill="#EA4335">e</tspan>
              </text>
            </svg>
          </div>

          {/* GitHub */}
          <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
            <svg width="32" height="32" viewBox="0 0 16 16" fill="white">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            {/* text-gray-900 → text-white */}
            <span className="ml-2 text-2xl font-bold text-white">GitHub</span>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="ml-2 text-2xl font-bold text-[#0A66C2]">Linked</span>
            <span className="text-2xl font-bold text-[#0A66C2]">in</span>
          </div>

          {/* Notion */}
          <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
            {/* bg-black on dark bg needs a white ring so it's visible */}
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-xl font-bold rounded">
              N
            </div>
            {/* text-gray-900 → text-white */}
            <span className="ml-2 text-2xl font-bold text-white">Notion</span>
          </div>

          {/* Zoom */}
          <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
            <svg width="100" height="32" viewBox="0 0 100 32" fill="none">
              <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#2D8CFF">
                zoom
              </text>
            </svg>
          </div>

          {/* Figma */}
          <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
              <circle cx="18" cy="18" r="6" fill="#1ABCFE"/>
              <circle cx="6" cy="6" r="6" fill="#FF7262"/>
              <circle cx="6" cy="18" r="6" fill="#A259FF"/>
              <circle cx="6" cy="30" r="6" fill="#0ACF83"/>
              <circle cx="18" cy="6" r="6" fill="#F24E1E"/>
            </svg>
            {/* text-gray-900 → text-white */}
            <span className="ml-2 text-2xl font-bold text-white">Figma</span>
          </div>

        </div>
      </div>
    </div>
  );
}