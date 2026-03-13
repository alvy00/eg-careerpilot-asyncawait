"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, X, Clock, ChevronRight, Loader2, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Difficulty = "Easy" | "Medium" | "Hard";

type AIQuestion = {
  question: string;
  difficulty: Difficulty;
  shortAnswer: string;
  detailedAnswer: string;
  followUps: string[];
  commonMistakes: string[];
  tags: string[];
};

type AISet = {
  topic: string;
  level: string;
  questions: AIQuestion[];
};

export default function InterviewBankAIPage() {
  const { user } = useAuth();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AISet | null>(null);
  const [active, setActive] = useState<AIQuestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  // 1. Fetch history based on userId
  const fetchHistory = async () => {
    if (!user?.uid) return;
    setHistoryLoading(true);
    try {
      const res = await fetch(`/api/interview-bank/generate?userId=${user.uid}`);
      const json = await res.json();
      if (res.ok && Array.isArray(json)) {
        setHistory(json);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Load history on component mount or user change
  useEffect(() => {
    if (user?.uid) {
      fetchHistory();
    }
  }, [user?.uid]);

  // 2. Main Generation Function (Universal)
  const generate = async () => {
    if (!topic.trim()) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/interview-bank/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          userId: user?.uid,
          userEmail: user?.email,
          role: "Subject Matter Expert", // Changed to universal role
          level: "Comprehensive (Beginner to Pro)", 
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to generate content");

      setData(json.questionBank);
      
      // Refresh history after new generation
      await fetchHistory();

      // Scroll to result section
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white pb-20 bg-[#050505]">
      {/* ================= LOADING OVERLAY ================= */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-8">
              <motion.div
                className="absolute top-0 left-0 h-full bg-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-2 tracking-tighter uppercase">Interview Bank</h2>
              <p className="text-cyan-400 text-sm font-mono uppercase tracking-[0.3em]">Analyzing: {topic}...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 pt-12 space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase"
          > CareerPilot Intelligence
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            Interview <span className="text-cyan-500">Bank</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Master any subject. Generate professional interview questions, academic deep-dives, or skill assessments instantly.
          </p>
        </div>

        {/* Universal Input Section */}
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex flex-col md:flex-row gap-3 bg-[#0a0a0a] border border-white/10 p-2 rounded-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generate()}
                placeholder="Enter any topic"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border-none text-white placeholder:text-white/20 outline-none focus:ring-1 ring-cyan-500/50"
              />
            </div>
            <button
              onClick={generate}
              disabled={loading || !topic}
              className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all disabled:opacity-50"
            >
              Generate
            </button>
          </div>
          {error && <p className="text-center mt-4 text-red-400 text-sm">{error}</p>}
        </div>

        {/* ================= HISTORY SECTION ================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock size={20} className="text-cyan-500" /> Recent Sessions
            </h2>
            {historyLoading && <Loader2 size={16} className="animate-spin text-white/30" />}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {history.length > 0 ? (
              history.slice(0, 4).map((item, idx) => (
                <motion.div
                  key={item._id || idx}
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                  onClick={() => {
                    setData(item.questionBank);
                    setTopic(item.topic);
                    resultRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 cursor-pointer group transition-all"
                >
                  <p className="text-[10px] text-cyan-400 font-mono mb-1 uppercase tracking-wider">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                  </p>
                  <h4 className="font-bold truncate group-hover:text-cyan-400 transition-colors uppercase text-sm">
                    {item.topic}
                  </h4>
                  <div className="mt-4 flex items-center text-[10px] font-bold text-white/30 uppercase group-hover:text-white transition-colors">
                    Open Bank <ChevronRight size={12} className="ml-1" />
                  </div>
                </motion.div>
              ))
            ) : (
              !historyLoading && (
                <div className="col-span-full py-10 text-center border border-dashed border-white/10 rounded-2xl text-white/20">
                    No history found. Explore a new topic to begin!
                </div>
              )
            )}
          </div>
        </section>

        {/* ================= RESULTS SECTION ================= */}
        <div ref={resultRef} id="roadmap-result" className="pt-10 scroll-mt-20">
          {data ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">{data.topic}</h2>
                    <p className="text-cyan-400 text-sm font-medium">{data.level} • {data.questions?.length || 0} Key Concepts</p>
                  </div>
                  
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {data.questions?.map((q, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActive(q)}
                      className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer shadow-lg group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                          q.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500' : 
                          q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-cyan-400 transition-colors">{q.question}</h3>
                      <p className="text-sm text-white/40 line-clamp-2 italic">"{q.shortAnswer}"</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            !loading && (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                <Sparkles size={40} className="text-white/10 mb-4" />
                <p className="text-white/20 font-medium">Search for a topic to generate your master bank.</p>
              </div>
            )
          )}
        </div>

        {/* ================= DETAIL MODAL ================= */}
        <AnimatePresence>
           {active && (
             <motion.div
               className="fixed inset-0 z-[150] flex items-center justify-center px-6"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             >
               <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActive(null)} />
               <motion.div
                 initial={{ opacity: 0, y: 50, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 50, scale: 0.95 }}
                 className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl p-8"
               >
                 {/* Modal Header */}
                 <div className="flex items-start justify-between mb-8 sticky top-0 bg-[#0a0a0a] pb-4 z-10 border-b border-white/5">
                   <div>
                     <span className="text-cyan-500 text-xs font-black tracking-widest uppercase mb-2 block">{active.difficulty} Difficulty</span>
                     <h2 className="text-2xl md:text-3xl font-black leading-tight text-white">{active.question}</h2>
                   </div>
                   <button onClick={() => setActive(null)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
                     <X size={24} />
                   </button>
                 </div>

                 {/* Modal Content */}
                 <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                          <h4 className="text-[10px] font-black text-cyan-500 tracking-[0.2em] mb-3 uppercase">Core Summary</h4>
                          <p className="text-white/80 leading-relaxed">{active.shortAnswer}</p>
                       </div>
                       <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                          <h4 className="text-[10px] font-black text-red-500 tracking-[0.2em] mb-3 uppercase">Critical Pitfalls</h4>
                          <ul className="space-y-2">
                            {active.commonMistakes?.map((m, i) => (
                              <li key={i} className="text-sm text-white/60 flex gap-2 italic">
                                <span className="text-red-500">•</span> {m}
                              </li>
                            ))}
                          </ul>
                       </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                      <h4 className="text-[10px] font-black text-cyan-500 tracking-[0.2em] mb-4 uppercase">Detailed Analysis</h4>
                      <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{active.detailedAnswer}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                      <h4 className="text-[10px] font-black text-cyan-500 tracking-[0.2em] mb-3 uppercase">Expanded Inquiry</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {active.followUps?.map((f, i) => (
                          <div key={i} className="text-sm text-white/50 bg-white/5 p-3 rounded-xl border border-white/5">
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               </motion.div>
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    </div>
  );
}