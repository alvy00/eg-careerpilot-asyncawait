import { Boxes } from 'lucide-react';

function FocusCard() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl">
      <p className="text-xs tracking-widest text-gray-400 mb-4">
        CURRENT FOCUS
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
          💻
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-white">System Design</h4>
          <p className="text-sm text-gray-400">Intermediate Mastery</p>

          <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[72%] bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function XPCard() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl">
      <p className="text-xs tracking-widest text-gray-400 mb-6">
        DAILY XP
      </p>

      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold text-orange-500">1,240</span>
        <span className="text-gray-400 mb-1">/ 2,000</span>
      </div>
    </div>
  );
}

function SkillBar({
  label,
  height,
  active,
}: {
  label: string;
  height: string;
  active?: "orange" | "purple";
}) {
  const activeStyle =
    active === "orange"
      ? "bg-gradient-to-t from-orange-600 to-orange-400 shadow-lg shadow-orange-500/30"
      : active === "purple"
      ? "bg-gradient-to-t from-violet-600 to-purple-400 shadow-lg shadow-purple-500/30"
      : "bg-white/10";

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="h-40 w-full flex items-end">
        <div
          className={`w-full rounded-xl ${activeStyle}`}
          style={{ height }}
        />
      </div>
      <span className="text-xs text-gray-400 tracking-wide">{label}</span>
    </div>
  );
}

function SkillChart() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-xl w-full">
      <h3 className="text-lg flex gap-2 font-semibold mb-8 text-white">
        <Boxes /> Skill Gap Analysis
      </h3>

      <div className="grid grid-cols-7 gap-6 items-end">
        <SkillBar label="REACT" height="35%" />
        <SkillBar label="TS" height="55%" />
        <SkillBar label="SYSTEM" height="75%" active="orange" />
        <SkillBar label="CLOUD" height="50%" />
        <SkillBar label="SQL" height="30%" />
        <SkillBar label="SOFT SK." height="90%" active="purple" />
        <SkillBar label="PYTHON" height="45%" />
      </div>
    </div>
  );
}

export default function SkillAnalyticsSection() {
  return (
    <section className=" py-24 px-6">
      <div className="max-w-6xl mx-auto grid rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl md:grid-cols-[320px_1fr] gap-8">
        
        {/* Left side cards */}
        <div className="space-y-6">
          <FocusCard />
          <XPCard />
        </div>

        {/* Right side chart */}
        <SkillChart />

      </div>
    </section>
  );
}
