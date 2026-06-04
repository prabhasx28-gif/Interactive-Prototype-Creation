import React from "react";
import { Prototype, TestSessionLog, FeedbackResponse } from "../types";
import { Plus, SlidersHorizontal, Layers, Activity, FileText, CheckCircle, AlertTriangle, Trash2, ArrowRight, Star, Clock, MousePointer, ShieldCheck, RefreshCw, Search } from "lucide-react";

interface DashboardProps {
  prototypes: Prototype[];
  testLogs: TestSessionLog[];
  feedbacks: FeedbackResponse[];
  onCreateNew: (title: string, desc: string) => void;
  onLoadEcoShop: () => void;
  onLoadSaaSOps: () => void;
  onLoadPledgeOnboarding: () => void;
  onLoadSecureLogin: () => void;
  onSelect: (proto: Prototype) => void;
  onDelete: (id: string) => void;
}

export default function Dashboard({
  prototypes,
  testLogs,
  feedbacks,
  onCreateNew,
  onLoadEcoShop,
  onLoadSaaSOps,
  onLoadPledgeOnboarding,
  onLoadSecureLogin,
  onSelect,
  onDelete
}: DashboardProps) {
  const [showNewModal, setShowNewModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPrototypes = prototypes.filter((proto) =>
    proto.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Aggregate metrics
  const totalScreens = prototypes.reduce((sum, p) => sum + p.screens.length, 0);
  const totalParticipants = new Set(testLogs.map(l => l.participantName)).size;
  const completedSessions = testLogs.length;
  const successSessionCount = testLogs.filter(l => l.success).length;
  const successRate = completedSessions > 0 ? Math.round((successSessionCount / completedSessions) * 100) : 0;
  
  const avgCompletionTime = testLogs.length > 0 
    ? Math.round(testLogs.reduce((sum, l) => sum + l.timeTakenSec, 0) / testLogs.length) 
    : 0;

  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : "N/A";

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateNew(title, desc);
    setTitle("");
    setDesc("");
    setShowNewModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="dashboard-container">
      {/* Platform Title */}
      <div className="mb-8" id="dashboard-title-section">
        <h1 className="text-3xl font-sans font-medium tracking-tight text-slate-900 flex items-center gap-3">
          <span>⚙️</span> Interactive Prototype & Usability Validation Platform
        </h1>
        <p className="text-slate-500 mt-1 max-w-2xl font-sans text-sm">
          Convert wireframe designs into clickable micro-animations and run target usability tasks with live feedback sessions.
        </p>
      </div>

      {/* Aggregate Overview widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" id="dashboard-metric-cards">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Total Layout Screens</span>
            <span className="text-2xl font-bold text-slate-900 mt-0.5 block">{totalScreens} Screens</span>
            <span className="text-xs text-slate-500">{prototypes.length} active prototypes configured</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Task Success Rate</span>
            <span className="text-2xl font-bold text-slate-900 mt-0.5 block">{successRate}% Success</span>
            <span className="text-xs text-slate-500">{successSessionCount} of {completedSessions} test tasks cleared</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Avg Completion Speed</span>
            <span className="text-2xl font-bold text-slate-900 mt-0.5 block">{avgCompletionTime} seconds</span>
            <span className="text-xs text-slate-500">Across {completedSessions} participant runs</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Average UX Rating</span>
            <span className="text-2xl font-bold text-slate-900 mt-0.5 block">{averageRating} / 5.0</span>
            <span className="text-xs text-slate-500">Based on {feedbacks.length} visual survey responses</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Projects Column + Quick Seeds Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="dashboard-body-grid">
        {/* Left column: Active projects */}
        <div className="lg:col-span-2 space-y-6" id="dashboard-active-column">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-medium text-slate-950 font-sans tracking-tight">Active Prototypes</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              {prototypes.length > 0 && (
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search prototypes by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-sm bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400 shadow-3xs transition-all"
                    id="dashboard-search-input"
                  />
                </div>
              )}
              <button
                id="btn-create-new-trigger"
                onClick={() => setShowNewModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> Create Custom Prototype
              </button>
            </div>
          </div>

          {prototypes.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-12 text-center" id="empty-projects-state">
              <span className="text-3xl block mb-2">📁</span>
              <h3 className="font-semibold text-slate-800 text-base">No active prototypes loaded</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                Select one of our standard presets to seed high-fidelity mockups instantly, or create a blank configuration.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={onLoadEcoShop}
                  className="bg-white border border-slate-200 text-emerald-800 hover:bg-emerald-50 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 shadow-2xs"
                >
                  Load EcoShop Mobile
                </button>
                <button
                  onClick={onLoadSaaSOps}
                  className="bg-white border border-slate-200 text-indigo-850 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 shadow-2xs"
                >
                  Load SaaS Ops Enterprise
                </button>
                <button
                  onClick={onLoadPledgeOnboarding}
                  className="bg-white border border-slate-200 text-teal-800 hover:bg-teal-50 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 shadow-2xs"
                >
                  Load Pledge Onboarding
                </button>
                <button
                  onClick={onLoadSecureLogin}
                  className="bg-indigo-600 border border-indigo-555 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 shadow-sm flex items-center gap-1.5"
                >
                  🔐 Load Secure Login Flow
                </button>
              </div>
            </div>
          ) : filteredPrototypes.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-12 text-center" id="search-not-found-state">
              <span className="text-3xl block mb-2">🔍</span>
              <h3 className="font-semibold text-slate-800 text-base">No matching prototypes found</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto font-sans">
                No prototypes match your filter query <span className="font-mono text-xs bg-indigo-50 px-1.5 py-0.5 rounded text-indigo-600 font-semibold">"{searchQuery}"</span>. Try adjusting your search term.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 hover:text-indigo-700 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 shadow-2xs"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4" id="projects-grid">
              {filteredPrototypes.map((proto) => {
                const protoLogs = testLogs.filter(l => l.prototypeId === proto.id);
                const protoSuccessCount = protoLogs.filter(l => l.success).length;
                const protoSuccessRate = protoLogs.length > 0 ? Math.round((protoSuccessCount / protoLogs.length) * 100) : "No runs";

                return (
                  <div
                    key={proto.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-indigo-400 transition-all duration-200 relative group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 font-sans tracking-tight">
                          {proto.title}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2 md:max-w-xl">
                          {proto.description || "No description configured."}
                        </p>
                      </div>

                      {/* Delete button (prevent triggering selection click) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(proto.id);
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer opacity-100 lg:opacity-0 group-hover:opacity-100"
                        title="Delete prototype template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
                      {/* Stats details */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                        <span className="bg-slate-100 text-slate-700 py-1 px-2.5 rounded-md">
                          {proto.screens.length} screens
                        </span>
                        <span>•</span>
                        <span className="bg-indigo-50 text-indigo-805 py-1 px-2.5 rounded-md">
                          {proto.tasks.length} testing tasks
                        </span>
                        <span>•</span>
                        <span className="text-slate-600 font-sans">
                          Success Rate:{" "}
                          <span className={`${typeof protoSuccessRate === "number" ? (protoSuccessRate > 65 ? "text-emerald-600 font-bold" : "text-rose-500 font-bold") : "text-slate-400"}`}>
                            {typeof protoSuccessRate === "number" ? `${protoSuccessRate}%` : protoSuccessRate}
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={() => onSelect(proto)}
                        className="bg-slate-50 hover:bg-slate-100 text-indigo-650 px-4 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 border border-slate-200 cursor-pointer self-end ml-auto"
                      >
                        Design & Validate <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Fast-Load Presets & Recent Interactive Test History */}
        <div className="space-y-6" id="dashboard-sidebar-column">
          {/* Quick presets cards */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs" id="quick-presets-box">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Quick Bench Templates
            </h3>
            <p className="text-slate-500 text-xs mb-4">
              Import fully linked, multi-screen micro-interfaces out of the box to analyze or conduct live participant reviews immediately.
            </p>
            <div className="space-y-3">
              <button
                onClick={onLoadSecureLogin}
                className="w-full text-left bg-indigo-50/40 hover:bg-indigo-50 border border-indigo-100 hover:border-indigo-300 p-3.5 rounded-lg transition-all duration-150 cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-indigo-900 text-sm flex items-center gap-1.5">
                    🔐 Secure Gate Login Flow
                  </span>
                  <ArrowRight className="w-4 h-4 text-indigo-600 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-slate-500 text-xs mt-1 font-sans">
                  Enterprise Mobile (Cosmic Slate). Complete 4-screen security pattern with interactive password inputs, validation pins, and encrypted workspace dashboards.
                </p>
              </button>

              <button
                onClick={onLoadPledgeOnboarding}
                className="w-full text-left bg-teal-50/60 hover:bg-teal-50 border border-teal-100 hover:border-teal-300 p-3.5 rounded-lg transition-all duration-150 cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-teal-900 text-sm flex items-center gap-1.5">
                    ✨ Pledge Goal Onboarding
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-slate-500 text-xs mt-1 font-sans">
                  Mobile (Warm Teal Theme). Multi-screen interactive onboarding screens: "Big Goals", "Big Consequences", and "Massive Changes" with dot sliders and skip routes.
                </p>
              </button>

              <button
                onClick={onLoadEcoShop}
                className="w-full text-left bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-300 p-3.5 rounded-lg transition-all duration-150 cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-emerald-900 text-sm">Grocery Basket App</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Mobile (Green Aesthetic). Browsing organic greens, card addition tracking, and confirmation trigger.
                </p>
              </button>

              <button
                onClick={onLoadSaaSOps}
                className="w-full text-left bg-indigo-50/30 hover:bg-indigo-50/70 border border-indigo-100 hover:border-indigo-300 p-3.5 rounded-lg transition-all duration-150 cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-indigo-950 text-sm">SaaS Ops Enterprise Console</span>
                  <ArrowRight className="w-4 h-4 text-indigo-600 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Desktop Grid (Dark Slate Theme). Interactive side navigation, stats monitors, and cryptographic verification forms.
                </p>
              </button>
            </div>
          </div>

          {/* Test log stream */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs" id="recent-logs-sidebar">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Live Participation Stream
            </h3>
            {testLogs.length === 0 ? (
              <div className="text-center py-8 text-slate-450 text-xs">
                <MousePointer className="w-6 h-6 mx-auto stroke-slate-300 mb-2" />
                No tester sessions logged yet. Activate a prototype and click "Conduct Test" to register records.
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {testLogs.slice(-4).reverse().map((log) => (
                  <div key={log.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="font-semibold text-slate-800 line-clamp-1">{log.participantName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${log.success ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                        {log.success ? "SUCCESS" : "FAILED"}
                      </span>
                    </div>
                    <p className="text-slate-500 line-clamp-1">Task: {log.taskInstruction}</p>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200/50 text-slate-400 font-mono text-[10px]">
                      <span>⏱ {log.timeTakenSec}s</span>
                      <span>🖱 {log.clicks} clicks</span>
                      <span>⚠️ {log.errors} errors</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NEW PROTOTYPE MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="new-proto-modal">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl relative">
            <h3 className="text-lg font-sans font-medium text-slate-900 mb-2">Create Custom Wireframe Project</h3>
            <p className="text-xs text-slate-500 mb-4">
              Instantiate a blank prototype frame. You will be able to construct screens, drag wireframe elements, and link transitions inside the interactive canvas builder.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">Project Title</label>
                <input
                  id="input-proto-title"
                  type="text"
                  required
                  placeholder="e.g. Health & Fitness Tracker Onboarding"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-indigo-505"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">Brief Description</label>
                <textarea
                  id="textarea-proto-desc"
                  placeholder="A micro mobile prototype to test our 3-step fitness planner inputs."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-indigo-505"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="btn-confirm-create-proto"
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                >
                  Initialize Wireframe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
