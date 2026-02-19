"use client";

import { Send } from "lucide-react";
import { useState } from "react";

const TalkToMentor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I've analyzed your target goal: Senior DevOps Engineer at Google. Would you like to see your custom 6-month roadmap focusing on Kubernetes and Infrastructure as Code?",
    },
    {
      id: 2,
      type: "user",
      content:
        "Yes, please! Let's prioritize AWS and Terraform. Can we also include mock interviews?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          type: "user",
          content: input,
        },
      ]);
      setInput("");
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  return (
    <section className="relative py-16 lg:py-24 px-6 lg:px-12">
      <div className="container mx-auto max-w-3xl">
        {/* Section Title */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Talk to your{" "}
            <span className="text-primary">Personal AI Mentor</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Real-time guidance on every step of your professional journey.
          </p>
        </div>

        {/* Chat Container */}
        <div className="glass-card rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 px-6 lg:px-8 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-white font-bold text-sm">
                  CP
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900" />
              </div>
              <span className="font-semibold text-white">
                CareerPilot AI Coach
              </span>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="px-6 lg:px-8 py-8 space-y-6 min-h-96 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-3 max-w-xs lg:max-w-md ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {message.type === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                      AI
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-5 py-3 ${
                      message.type === "ai"
                        ? "bg-slate-800/70 text-gray-100"
                        : "bg-primary text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                  AI
                </div>
                <div className="bg-slate-800/70 rounded-2xl px-5 py-3 flex gap-2">
                  <div
                    className="typing-dot"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="typing-dot"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="typing-dot"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 px-6 lg:px-8 py-4">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Ask your mentor anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center neon-glow-primary"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkToMentor;
