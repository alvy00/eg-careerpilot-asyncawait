"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Settings,
  Save,
  ShieldCheck,
  Globe,
  Mail,
  Bell,
  Database,
  AlertTriangle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SystemSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    siteName: "CareerPilot AI",
    supportEmail: "support@careerpilot.com",
    maintenanceMode: false,
    allowRegistration: true,
    stripeLiveMode: false,
    maxUploadSize: 5,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.type) setConfig(data);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await user?.getIdToken();
      await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...config, type: "global" }),
      });
      alert("Settings updated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0C1B]">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#0A0C1B] min-h-screen text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Settings className="text-primary" /> System Settings
          </h1>
          <p className="text-slate-500 text-sm">
            Configure your platform's core engine.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-white text-black px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: GENERAL SETTINGS */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#161B22]/40 p-8 rounded-[32px] border border-white/5 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Globe className="text-blue-400 w-5 h-5" /> General Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Site Title
                </label>
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) =>
                    setConfig({ ...config, siteName: e.target.value })
                  }
                  className="w-full bg-[#0A0C1B] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={config.supportEmail}
                  onChange={(e) =>
                    setConfig({ ...config, supportEmail: e.target.value })
                  }
                  className="w-full bg-[#0A0C1B] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-[#161B22]/40 p-8 rounded-[32px] border border-white/5">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
              <ShieldCheck className="text-green-400 w-5 h-5" /> Feature Access
              Control
            </h2>
            <div className="space-y-4">
              {/* TOGGLE 1 */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div>
                  <p className="font-bold text-sm">Allow New Registrations</p>
                  <p className="text-xs text-slate-500">
                    Enable or disable new users to join.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setConfig({
                      ...config,
                      allowRegistration: !config.allowRegistration,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-all relative ${config.allowRegistration ? "bg-green-500" : "bg-slate-700"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.allowRegistration ? "right-1" : "left-1"}`}
                  />
                </button>
              </div>

              {/* TOGGLE 2 */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-yellow-500/10">
                <div>
                  <p className="font-bold text-sm text-yellow-500">
                    Maintenance Mode
                  </p>
                  <p className="text-xs text-slate-500">
                    Offline mode for entire platform.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setConfig({
                      ...config,
                      maintenanceMode: !config.maintenanceMode,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-all relative ${config.maintenanceMode ? "bg-yellow-600" : "bg-slate-700"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.maintenanceMode ? "right-1" : "left-1"}`}
                  />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: SYSTEM INFO & DANGER */}
        <div className="space-y-6">
          <section className="bg-primary/5 p-8 rounded-[32px] border border-primary/10">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-primary">
              <Database className="w-5 h-5" /> Storage & API
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2 text-slate-400">
                <span>Database Status</span>
                <span className="text-green-400 font-mono text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Connected
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2 text-slate-400">
                <span>Stripe Live Mode</span>
                <span
                  className={
                    config.stripeLiveMode ? "text-red-400" : "text-blue-400"
                  }
                >
                  {config.stripeLiveMode ? "LIVE" : "TEST"}
                </span>
              </div>
            </div>
          </section>

          <section className="bg-red-500/5 p-8 rounded-[32px] border border-red-500/10">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-red-500">
              <AlertTriangle className="w-5 h-5" /> Danger Zone
            </h2>
            <button className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-xs font-bold transition-all">
              Flush All Logs
            </button>
            <p className="text-[10px] text-slate-600 mt-3 text-center uppercase tracking-widest font-bold">
              Action is irreversible
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
