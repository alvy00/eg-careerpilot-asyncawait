"use client"
type Mode = "focus" | "short" | "long";
import React, { useEffect, useState } from "react";

const Promodoro = () => {
  const FOCUS_TIME = 1500;
  const SHORT_BREAK = 300;
  const LONG_BREAK = 900;

  const [second, setSecond] = useState(FOCUS_TIME);
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<Mode>("focus");

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setSecond((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  const changeMode = (t: Mode) => {
    setActive(false);
    setMode(t);

    if (t === "focus") setSecond(FOCUS_TIME);
    if (t === "short") setSecond(SHORT_BREAK);
    if (t === "long") setSecond(LONG_BREAK);
  };

  const minutes = Math.floor(second / 60);
  const remainingSeconds = second % 60;

  return (
    <div className="flex items-center justify-center min-h-[90vh]">

      <div className="rounded-xl w-full text-center">

        <div className="flex justify-center gap-4 mb-8 text-white text-sm font-medium">

          <button
            onClick={() => changeMode("focus")}
            className={`px-4 py-1 rounded ${
              mode === "focus" ? "bg-[#a44a4a]" : ""
            }`}
          >
            Pomodoro
          </button>

          <button
            onClick={() => changeMode("short")}
            className={`px-4 py-1 rounded ${
              mode === "short" ? "bg-[#a44a4a]" : ""
            }`}
          >
            Short Break
          </button>

          <button
            onClick={() => changeMode("long")}
            className={`px-4 py-1 rounded ${
              mode === "long" ? "bg-[#a44a4a]" : ""
            }`}
          >
            Long Break
          </button>

        </div>

        <h1 className="text-[240px] font-bold text-white leading-none mb-8">
          {minutes}:{remainingSeconds < 10 ? "0" : ""}
          {remainingSeconds}
        </h1>

        <div className="flex gap-5 items-center justify-center">
            <button
          onClick={() => setActive(!active)}
          className="bg-white text-[#c75a5a] font-bold text-xl px-14 py-3 rounded-lg shadow-md active:translate-y-1"
        >
          {active ? "STOP" : "START"}
        </button>

        <button
            onClick={() => changeMode(mode)}
            className="bg-white text-[#c75a5a] font-bold text-xl px-14 py-3 rounded-lg shadow-md active:translate-y-1"
          >
            Reset
          </button>
        </div>
        

      </div>

    </div>
  );
};

export default Promodoro;