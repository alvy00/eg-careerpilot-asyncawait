"use client"
import React, { useEffect, useState } from 'react';

const Promodoro = () => {
    const [second, setSecond] = useState(1500)
    const [active, setActive] = useState(false)

useEffect(() => {
  if (!active) return;

  const interval = setInterval(() => {
    setSecond(prev => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [active]);

    const minutes = Math.floor(second / 60);
    const remainingSeconds = second % 60;

    return (
        <div>
            <div className="flex items-center justify-center">
  <div className=" shadow-2xl rounded-3xl p-10 w-[350px] text-center border border-white/30">
    
    <h2 className="text-white text-lg font-semibold tracking-widest mb-4 uppercase">
      Focus Time
    </h2>

    <h1 className="text-6xl font-extrabold text-white mb-8 tracking-wider drop-shadow-lg">
      {minutes}:{remainingSeconds < 10 ? "0" : ""}
      {remainingSeconds}
    </h1>

    <div className="flex justify-center gap-4">
      
      <button
        onClick={() => setActive(true)}
        className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 text-white px-5 py-2 rounded-xl shadow-lg"
      >
        Start
      </button>

      <button
        onClick={() => setActive(false)}
        className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 text-white px-5 py-2 rounded-xl shadow-lg"
      >
        Stop
      </button>

      <button
        onClick={() => {
          setActive(false);
          setSecond(1500);
        }}
        className="bg-gray-800 hover:bg-black active:scale-95 transition-all duration-200 text-white px-5 py-2 rounded-xl shadow-lg"
      >
        Reset
      </button>

    </div>
  </div>
</div>
        </div>
    );
};

export default Promodoro;