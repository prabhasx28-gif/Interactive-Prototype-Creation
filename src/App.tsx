import React from "react";
import { Prototype, TestSessionLog, FeedbackResponse } from "./types";
import { createEmptyPrototype, createSaaSHubTemplate, createPledgeOnboardingTemplate, createLoginFlowTemplate } from "./components/SampleDesigns";
import Dashboard from "./components/Dashboard";
import PrototypeBuilder from "./components/PrototypeBuilder";
import DeviceSimulator from "./components/DeviceSimulator";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { Activity, Layers, Play, Settings, RefreshCw, Smartphone, BarChart3, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [view, setView] = React.useState<"dashboard" | "builder" | "simulator" | "analytics">("dashboard");
  const [prototypes, setPrototypes] = React.useState<Prototype[]>([]);
  const [activePrototype, setActivePrototype] = React.useState<Prototype | null>(null);
  const [testLogs, setTestLogs] = React.useState<TestSessionLog[]>([]);
  const [feedbacks, setFeedbacks] = React.useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Sync client state with JSON Server
  const fetchData = async () => {
    setLoading(true);
    try {
      const [protoRes, logRes, fbRes] = await Promise.all([
        fetch("/api/prototypes").then(r => r.json()),
        fetch("/api/test-logs").then(r => r.json()),
        fetch("/api/feedbacks").then(r => r.json())
      ]);

      setPrototypes(protoRes);
      setTestLogs(logRes);
      setFeedbacks(fbRes);

      // Force update active prototype if currently editing
      if (activePrototype) {
        const reloaded = protoRes.find((p: any) => p.id === activePrototype.id);
        if (reloaded) setActivePrototype(reloaded);
      }
    } catch (err) {
      console.error("Failed to synchronise database records with backend API:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleCreateNew = async (title: string, desc: string) => {
    const freshProj = createEmptyPrototype(title, desc);
    try {
      const saved = await fetch("/api/prototypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(freshProj)
      }).then(r => r.json());

      setPrototypes((prev) => [...prev, saved]);
      setActivePrototype(saved);
      setView("builder");
    } catch (err) {
      console.error("Error creating custom prototype:", err);
    }
  };

  const handleLoadEcoShopPreset = async () => {
    // Already populated by server seed, let's load or force post if missing
    let target = prototypes.find(p => p.id === "seed-ecommerce");
    if (!target) {
      // In unlikely event not present, server handles, let's pull again
      await fetchData();
      target = prototypes.find(p => p.id === "seed-ecommerce") || prototypes[0];
    }
    if (target) {
      setActivePrototype(target);
      setView("builder");
    }
  };

  const handleLoadSaaSOpsPreset = async () => {
    let target = prototypes.find(p => p.id === "seed-saas-dashboard");
    if (!target) {
      const saasConfig = createSaaSHubTemplate();
      try {
        const saved = await fetch("/api/prototypes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(saasConfig)
        }).then(r => r.json());
        setPrototypes((prev) => [...prev, saved]);
        target = saved;
      } catch (err) {
        console.error("Error posting SaaS template preset:", err);
      }
    }
    if (target) {
      setActivePrototype(target);
      setView("builder");
    }
  };

  const handleLoadPledgeOnboardingPreset = async () => {
    let target = prototypes.find(p => p.id === "seed-pledge-onboarding");
    if (!target) {
      const pledgeConfig = createPledgeOnboardingTemplate();
      try {
        const saved = await fetch("/api/prototypes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pledgeConfig)
        }).then(r => r.json());
        setPrototypes((prev) => [...prev, saved]);
        target = saved;
      } catch (err) {
        console.error("Error posting Pledge template preset:", err);
      }
    }
    if (target) {
      setActivePrototype(target);
      setView("builder");
    }
  };

  const handleLoadSecureLoginPreset = async () => {
    let target = prototypes.find(p => p.id === "seed-secure-login");
    if (!target) {
      const loginConfig = createLoginFlowTemplate();
      try {
        const saved = await fetch("/api/prototypes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginConfig)
        }).then(r => r.json());
        setPrototypes((prev) => [...prev, saved]);
        target = saved;
      } catch (err) {
        console.error("Error posting Custom Login Flow preset:", err);
      }
    }
    if (target) {
      setActivePrototype(target);
      setView("builder");
    }
  };

  const handleSavePrototype = async (updated: Prototype) => {
    try {
      const saved = await fetch("/api/prototypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      }).then(r => r.json());

      setPrototypes((prev) => prev.map(p => p.id === saved.id ? saved : p));
      setActivePrototype(saved);
    } catch (err) {
      console.error("Error writing active layout updates:", err);
    }
  };

  const handleDeletePrototype = async (id: string) => {
    try {
      await fetch(`/api/prototypes/${id}`, { method: "DELETE" });
      setPrototypes((prev) => prev.filter(p => p.id !== id));
      if (activePrototype?.id === id) {
        setActivePrototype(null);
        setView("dashboard");
      }
    } catch (err) {
      console.error("Error deleting prototype configuration:", err);
    }
  };

  const handleAddTestLog = async (log: TestSessionLog) => {
    try {
      const saved = await fetch("/api/test-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log)
      }).then(r => r.json());
      setTestLogs((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Error posting simulation test session log:", err);
    }
  };

  const handleAddFeedback = async (fb: FeedbackResponse) => {
    try {
      const saved = await fetch("/api/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fb)
      }).then(r => r.json());
      setFeedbacks((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Error posting feedback survey ratings:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-start font-sans">
      
      {/* Dynamic Global Top Navigation Rail */}
      <nav className="bg-slate-950 text-white border-b border-slate-900 sticky top-0 z-40" id="platform-global-utility-rail">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("dashboard")} id="platform-logo-trigger">
              <span className="text-xl">🛠️</span>
              <span className="font-bold tracking-tight text-white hidden sm:inline-block">UX Canvas Sandbox</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-4">
              <button
                onClick={() => setView("dashboard")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${view === "dashboard" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Dashboard
              </button>

              {activePrototype && (
                <>
                  <button
                    onClick={() => setView("builder")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${view === "builder" ? "bg-indigo-600 text-white" : "text-indigo-400 hover:text-white"}`}
                  >
                    <Layers className="w-3.5 h-3.5" /> Canvas
                  </button>

                  <button
                    onClick={() => setView("simulator")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${view === "simulator" ? "bg-emerald-600 text-white" : "text-emerald-400 hover:text-white"}`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Simulator
                  </button>

                  <button
                    onClick={() => setView("analytics")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${view === "analytics" ? "bg-indigo-950 border border-indigo-700 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> Reports
                  </button>
                </>
              )}
            </div>

            {/* Sync connection status indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400" id="dev-server-status">
              <button onClick={fetchData} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white" title="Refresh Database entries">
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <span>● Cloud DB Sync</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main active layout screen body */}
      <main className="flex-grow">
        {loading && prototypes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-24" id="primary-loading-view">
            <span className="animate-spin text-3xl mb-4">⚙️</span>
            <span className="text-sm font-mono text-slate-500">Retrieving operational configurations from database folder...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {view === "dashboard" && (
                <Dashboard
                  prototypes={prototypes}
                  testLogs={testLogs}
                  feedbacks={feedbacks}
                  onCreateNew={handleCreateNew}
                  onLoadEcoShop={handleLoadEcoShopPreset}
                  onLoadSaaSOps={handleLoadSaaSOpsPreset}
                  onLoadPledgeOnboarding={handleLoadPledgeOnboardingPreset}
                  onLoadSecureLogin={handleLoadSecureLoginPreset}
                  onSelect={(p) => {
                    setActivePrototype(p);
                    setView("builder");
                  }}
                  onDelete={handleDeletePrototype}
                />
              )}

              {view === "builder" && activePrototype && (
                <PrototypeBuilder
                  prototype={activePrototype}
                  onSave={handleSavePrototype}
                  onBackToDashboard={() => setView("dashboard")}
                  onPreview={() => setView("simulator")}
                />
              )}

              {view === "simulator" && activePrototype && (
                <DeviceSimulator
                  prototype={activePrototype}
                  onBackToBuilder={() => setView("builder")}
                  onAddTestLog={handleAddTestLog}
                  onAddFeedback={handleAddFeedback}
                />
              )}

              {view === "analytics" && activePrototype && (
                <AnalyticsDashboard
                  prototype={activePrototype}
                  testLogs={testLogs}
                  feedbacks={feedbacks}
                  onBackToBuilder={() => setView("builder")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Standard brand footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs font-sans tracking-wide border-t border-slate-800" id="platform-global-footer">
        <p>© 2026 UX Prototype & Validation Platform. Optimized for responsive click testing and usability evaluation matrices.</p>
      </footer>
    </div>
  );
}
