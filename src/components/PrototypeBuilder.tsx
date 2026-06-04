import React from "react";
import { Prototype, Screen, WireframeElement, TestTask, AIAuditResult, PrototypeVersion } from "../types";
import { Plus, Trash2, Layers, Settings, Eye, Sliders, ArrowLeft, ArrowRight, Check, Sparkles, AlertCircle, FileText, Smartphone, Laptop, LayoutGrid, HelpCircle, History, Clock, Save } from "lucide-react";

interface PrototypeBuilderProps {
  prototype: Prototype;
  onSave: (updated: Prototype) => void;
  onBackToDashboard: () => void;
  onPreview: () => void;
}

export default function PrototypeBuilder({
  prototype,
  onSave,
  onBackToDashboard,
  onPreview
}: PrototypeBuilderProps) {
  const [activeScreenId, setActiveScreenId] = React.useState<string>(prototype.startScreenId || (prototype.screens[0]?.id || ""));
  const [selectedElementId, setSelectedElementId] = React.useState<string | null>(null);
  
  // Tasks state
  const [editingTasks, setEditingTasks] = React.useState<boolean>(false);
  const [newTaskGoal, setNewTaskGoal] = React.useState("");
  const [newTaskTarget, setNewTaskTarget] = React.useState<string>("");
  const [newTaskTime, setNewTaskTime] = React.useState(45);



  // Version History State
  const [showingVersions, setShowingVersions] = React.useState<boolean>(false);
  const [newVersionName, setNewVersionName] = React.useState<string>("");
  const [newVersionDesc, setNewVersionDesc] = React.useState<string>("");
  const [versionSearch, setVersionSearch] = React.useState<string>("");
  const [revertToast, setRevertToast] = React.useState<string | null>(null);

  // Active Screen helper
  const activeScreen = prototype.screens.find((s) => s.id === activeScreenId) || prototype.screens[0];
  const selectedElement = activeScreen?.elements.find((el) => el.id === selectedElementId);

  // Filtered versions computed list
  const filteredVersions = (prototype.versions || []).filter((v) => {
    if (!versionSearch.trim()) return true;
    const query = versionSearch.toLowerCase();
    return (
      v.name.toLowerCase().includes(query) ||
      (v.description || "").toLowerCase().includes(query)
    );
  });

  // Force active screen trigger on prop change or start validation
  React.useEffect(() => {
    if (activeScreen && !activeScreenId) {
      setActiveScreenId(activeScreen.id);
    }
  }, [activeScreen, activeScreenId]);

  // Standard color selections
  const PALETTE_BG = [
    { name: "Off White", class: "bg-slate-50 border border-slate-200" },
    { name: "Pure White", class: "bg-white border border-slate-200 shadow-sm" },
    { name: "Eco Mint", class: "bg-emerald-50 border border-emerald-100" },
    { name: "Ocean Glass", class: "bg-blue-50 border border-blue-100" },
    { name: "Midnight Blue", class: "bg-slate-900 text-white" },
    { name: "SaaS Charcoal", class: "bg-slate-950 text-white border border-slate-800" },
    { name: "Amber Cream", class: "bg-amber-50 border border-amber-100" },
    { name: "Bright Emerald", class: "bg-emerald-600 text-white font-medium" },
    { name: "Indigo Primary", class: "bg-indigo-600 text-white font-medium" },
    { name: "Sleek Gray", class: "bg-gray-100 border border-gray-200" },
    { name: "Hot Spot Overlay", class: "bg-indigo-400/20 border border-indigo-400 border-dashed" },
    { name: "Transparent Frame", class: "bg-transparent border-2 border-dashed border-slate-300" }
  ];

  const PALETTE_TEXT = [
    { name: "Slate", class: "text-slate-900" },
    { name: "Charcoal", class: "text-gray-800" },
    { name: "White Out", class: "text-white" },
    { name: "Eco Green", class: "text-emerald-700 font-medium" },
    { name: "Indigo Sky", class: "text-indigo-600" },
    { name: "SaaS Amber", class: "text-amber-500" },
    { name: "Muted Dust", class: "text-slate-400" }
  ];

  const handleUpdatePrototype = (updated: Prototype) => {
    onSave(updated);
  };

  const handleCreateVersionSnapshot = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const timestampStr = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    const finalName = newVersionName.trim() || `Design Snapshot - ${timestampStr}`;
    const finalDesc = newVersionDesc.trim();

    const screensSnapshot = JSON.parse(JSON.stringify(prototype.screens));
    const tasksSnapshot = JSON.parse(JSON.stringify(prototype.tasks));

    const newVersionRecord: PrototypeVersion = {
      id: `v-${Math.random().toString(36).substr(2, 9)}`,
      name: finalName,
      description: finalDesc || "Manual backup snapshot of the current canvas state.",
      screens: screensSnapshot,
      startScreenId: prototype.startScreenId,
      tasks: tasksSnapshot,
      timestamp: new Date().toISOString()
    };

    const currentVersions = prototype.versions || [];
    const updatedVersions = [newVersionRecord, ...currentVersions];

    const updatedPrototype: Prototype = {
      ...prototype,
      versions: updatedVersions,
      updatedAt: new Date().toISOString()
    };

    handleUpdatePrototype(updatedPrototype);
    setNewVersionName("");
    setNewVersionDesc("");
    setRevertToast(`Snapshot "${finalName}" saved successfully!`);
    setTimeout(() => setRevertToast(null), 4000);
  };

  const handleRevertToVersionSnapshot = (versionObj: PrototypeVersion) => {
    const timestampStr = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    
    const preBackupRecord: PrototypeVersion = {
      id: `v-backup-${Math.random().toString(36).substr(2, 9)}`,
      name: `Auto-Backup prior to Revert (${timestampStr})`,
      description: `Automatically created before reverting to original snapshot "${versionObj.name}".`,
      screens: JSON.parse(JSON.stringify(prototype.screens)),
      startScreenId: prototype.startScreenId,
      tasks: JSON.parse(JSON.stringify(prototype.tasks)),
      timestamp: new Date().toISOString()
    };

    const currentVersions = prototype.versions || [];
    const updatedVersions = [preBackupRecord, ...currentVersions];

    const updatedPrototype: Prototype = {
      ...prototype,
      screens: JSON.parse(JSON.stringify(versionObj.screens)),
      startScreenId: versionObj.startScreenId,
      tasks: JSON.parse(JSON.stringify(versionObj.tasks)),
      versions: updatedVersions,
      updatedAt: new Date().toISOString()
    };

    handleUpdatePrototype(updatedPrototype);
    
    if (versionObj.screens.length > 0) {
      const activeScExists = versionObj.screens.find((s) => s.id === activeScreenId);
      if (!activeScExists) {
        setActiveScreenId(versionObj.startScreenId || versionObj.screens[0].id);
      }
    }
    
    setSelectedElementId(null);
    setRevertToast(`Successfully reverted to version "${versionObj.name}"! Created safety auto-backup.`);
    setTimeout(() => setRevertToast(null), 5000);
  };

  const handleDeleteVersionSnapshot = (versionId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this snapshot record?")) return;
    
    const currentVersions = prototype.versions || [];
    const updatedVersions = currentVersions.filter((v) => v.id !== versionId);

    const updatedPrototype: Prototype = {
      ...prototype,
      versions: updatedVersions,
      updatedAt: new Date().toISOString()
    };

    handleUpdatePrototype(updatedPrototype);
    setRevertToast("Snapshot deleted successfully.");
    setTimeout(() => setRevertToast(null), 3500);
  };

  const handleAddScreen = () => {
    const newId = `screen-${Math.random().toString(36).substr(2, 9)}`;
    const newScreen: Screen = {
      id: newId,
      name: `Screen ${prototype.screens.length + 1}`,
      bgColor: "bg-slate-50",
      elements: []
    };
    const updated = {
      ...prototype,
      screens: [...prototype.screens, newScreen],
      updatedAt: new Date().toISOString()
    };
    handleUpdatePrototype(updated);
    setActiveScreenId(newId);
    setSelectedElementId(null);
  };

  const handleAddLoginScreen = () => {
    const loginScreenId = `screen-${Math.random().toString(36).substr(2, 9)}`;
    
    const elements: WireframeElement[] = [
      {
        id: `login-time-${Math.random().toString(36).substr(2, 9)}`,
        type: "heading",
        text: "9:41",
        x: 6,
        y: 4,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-800 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: `login-icon-${Math.random().toString(36).substr(2, 9)}`,
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 4,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: `login-logo-${Math.random().toString(36).substr(2, 9)}`,
        type: "heading",
        text: "🔐 Secure Login",
        x: 10,
        y: 14,
        w: 80,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-slate-900 font-extrabold tracking-tight text-center",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },
      {
        id: `login-status-${Math.random().toString(36).substr(2, 9)}`,
        type: "text",
        text: "Please enter your credentials to access your secure workspace.",
        x: 12,
        y: 23,
        w: 76,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 text-center font-sans",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: `login-email-label-${Math.random().toString(36).substr(2, 9)}`,
        type: "text",
        text: "Email Address",
        x: 12,
        y: 35,
        w: 76,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-semibold font-sans",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: `login-email-${Math.random().toString(36).substr(2, 9)}`,
        type: "input",
        text: "",
        placeholder: "user@example.com",
        x: 10,
        y: 41,
        w: 80,
        h: 9,
        bgColor: "bg-white border border-slate-200 rounded-xl px-3 focus:border-indigo-500",
        textColor: "text-slate-700",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: `login-pass-label-${Math.random().toString(36).substr(2, 9)}`,
        type: "text",
        text: "Account Password",
        x: 12,
        y: 53,
        w: 76,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-semibold font-sans",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: `login-pass-${Math.random().toString(36).substr(2, 9)}`,
        type: "input",
        text: "",
        placeholder: "••••••••••••",
        x: 10,
        y: 59,
        w: 80,
        h: 9,
        bgColor: "bg-white border border-slate-200 rounded-xl px-3",
        textColor: "text-slate-700",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: `login-submit-${Math.random().toString(36).substr(2, 9)}`,
        type: "button",
        text: "Sign In Securely ➔",
        x: 10,
        y: 74,
        w: 80,
        h: 9,
        bgColor: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl border-0",
        textColor: "text-white font-bold",
        targetScreenId: prototype.startScreenId || (prototype.screens[0]?.id || ""),
        transition: "zoom"
      },
      {
        id: `login-footer-${Math.random().toString(36).substr(2, 9)}`,
        type: "button",
        text: "Need an account? Sign Up for Free",
        x: 10,
        y: 86,
        w: 80,
        h: 6,
        bgColor: "bg-transparent text-slate-500 font-sans hover:text-indigo-600",
        textColor: "text-indigo-600 font-medium",
        targetScreenId: "",
        transition: "none"
      }
    ];

    const newScreen: Screen = {
      id: loginScreenId,
      name: "Secure Sign In",
      bgColor: "bg-slate-50",
      elements
    };

    const updated = {
      ...prototype,
      screens: [...prototype.screens, newScreen],
      updatedAt: new Date().toISOString()
    };
    handleUpdatePrototype(updated);
    setActiveScreenId(loginScreenId);
    setSelectedElementId(null);
  };

  const handleDeleteScreen = (screenId: string) => {
    if (prototype.screens.length <= 1) {
      alert("At least one screen is required to perform interactive prototyping!");
      return;
    }
    const filtered = prototype.screens.filter((s) => s.id !== screenId);
    let fallbackId = activeScreenId;
    if (activeScreenId === screenId) {
      fallbackId = filtered[0].id;
    }
    const updated = {
      ...prototype,
      screens: filtered,
      startScreenId: prototype.startScreenId === screenId ? filtered[0].id : prototype.startScreenId,
      updatedAt: new Date().toISOString()
    };
    handleUpdatePrototype(updated);
    setActiveScreenId(fallbackId);
    setSelectedElementId(null);
  };

  const handleAddElement = (type: WireframeElement["type"]) => {
    if (!activeScreen) return;
    const newElementId = `el-${Math.random().toString(36).substr(2, 9)}`;
    
    // Position nicely in a grid range of coordinates
    const indexMultiplier = activeScreen.elements.length % 5;
    const offset = indexMultiplier * 10;

    let defaultText = "Click Target text";
    let defaultWidth = 40;
    let defaultHeight = 8;
    let defaultBg = "bg-indigo-600 hover:bg-slate-800 text-white";
    let defaultTextClass = "text-slate-900";

    if (type === "heading") {
      defaultText = "Design Header 🏷️";
      defaultWidth = 60;
      defaultHeight = 6;
      defaultBg = "bg-transparent";
    } else if (type === "text") {
      defaultText = "A paragraph detailing the interaction rules.";
      defaultWidth = 70;
      defaultHeight = 8;
      defaultBg = "bg-transparent";
    } else if (type === "input") {
      defaultText = "";
      defaultWidth = 80;
      defaultHeight = 8;
      defaultBg = "bg-white border border-slate-200";
    } else if (type === "card") {
      defaultText = "";
      defaultWidth = 80;
      defaultHeight = 24;
      defaultBg = "bg-white border rounded-xl border-slate-100 shadow-xs";
    } else if (type === "hotspot") {
      defaultText = "Interactive Tap Target";
      defaultWidth = 36;
      defaultHeight = 8;
      defaultBg = "bg-yellow-400/20 border-2 border-dashed border-amber-400";
    }

    const newElement: WireframeElement = {
      id: newElementId,
      type,
      text: defaultText,
      x: 10 + offset,
      y: 15 + offset,
      w: defaultWidth,
      h: defaultHeight,
      bgColor: defaultBg,
      textColor: defaultTextClass,
      targetScreenId: "",
      transition: "fade",
      placeholder: type === "input" ? "Type placeholder text..." : undefined
    };

    const updatedScreens = prototype.screens.map((s) => {
      if (s.id === activeScreen.id) {
        return { ...s, elements: [...s.elements, newElement] };
      }
      return s;
    });

    const updated = {
      ...prototype,
      screens: updatedScreens,
      updatedAt: new Date().toISOString()
    };
    handleUpdatePrototype(updated);
    setSelectedElementId(newElementId);
    setShowingVersions(false);
    setEditingTasks(false);
  };

  const handleUpdateElement = (field: keyof WireframeElement, value: any) => {
    if (!activeScreen || !selectedElementId) return;

    const updatedScreens = prototype.screens.map((s) => {
      if (s.id === activeScreen.id) {
        const updatedElements = s.elements.map((el) => {
          if (el.id === selectedElementId) {
            return { ...el, [field]: value };
          }
          return el;
        });
        return { ...s, elements: updatedElements };
      }
      return s;
    });

    const updated = {
      ...prototype,
      screens: updatedScreens,
      updatedAt: new Date().toISOString()
    };
    handleUpdatePrototype(updated);
  };

  const handleDeleteElement = (elementId: string) => {
    if (!activeScreen) return;
    const filteredElements = activeScreen.elements.filter((el) => el.id !== elementId);
    
    const updatedScreens = prototype.screens.map((s) => {
      if (s.id === activeScreen.id) {
        return { ...s, elements: filteredElements };
      }
      return s;
    });

    const updated = {
      ...prototype,
      screens: updatedScreens,
      updatedAt: new Date().toISOString()
    };
    handleUpdatePrototype(updated);
    setSelectedElementId(null);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskGoal.trim() || !newTaskTarget) return;

    const newTask: TestTask = {
      id: `task-${Math.random().toString(36).substr(2, 9)}`,
      instruction: newTaskGoal,
      targetScreenId: newTaskTarget,
      timeLimitSec: newTaskTime
    };

    const updated = {
      ...prototype,
      tasks: [...prototype.tasks, newTask],
      updatedAt: new Date().toISOString()
    };
    handleUpdatePrototype(updated);
    setNewTaskGoal("");
    setNewTaskTime(45);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = {
      ...prototype,
      tasks: prototype.tasks.filter((t) => t.id !== taskId),
      updatedAt: new Date().toISOString()
    };
    handleUpdatePrototype(updated);
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-6" id="builder-root">
      {/* Top Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200" id="builder-header">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
            title="Return back Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-slate-900 tracking-tight font-sans">
                {prototype.title}
              </h2>
              <span className="text-xs bg-slate-100 text-slate-500 font-mono py-0.5 px-2 rounded">
                Active Builder
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-1">{prototype.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Version History toggle button */}
          <button
            onClick={() => {
              setShowingVersions(!showingVersions);
              setEditingTasks(false);
              setSelectedElementId(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-1.5 cursor-pointer transition-colors ${showingVersions ? "bg-emerald-50 border-emerald-300 text-emerald-800" : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"}`}
            id="btn-toggle-version-history"
          >
            <History className="w-4 h-4 text-emerald-600 font-bold" /> Version History ({prototype.versions?.length || 0})
          </button>

          {/* Configure tasks toggle button */}
          <button
            onClick={() => {
              setEditingTasks(!editingTasks);
              setShowingVersions(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-1.5 cursor-pointer transition-colors ${editingTasks ? "bg-indigo-50 border-indigo-300 text-indigo-705" : "bg-white hover:bg-slate-50 border-slate-205 text-slate-700"}`}
          >
            <Settings className="w-4 h-4" /> Config Usability Tasks ({prototype.tasks.length})
          </button>

          <button
            onClick={onPreview}
            className="bg-indigo-650 hover:bg-indigo-755 text-white px-4 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Eye className="w-4 h-4" /> Live Interactive Preview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="builder-main-grid">
        {/* SIDE BAR 1: Screens Explorer */}
        <div className="space-y-6" id="builder-sidebar-screens">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-400" /> Active Screens
              </span>
              <div className="flex items-center gap-1.5 font-mono">
                <button
                  onClick={handleAddScreen}
                  className="text-[11px] text-slate-600 hover:text-slate-800 flex items-center gap-0.5 cursor-pointer font-bold border border-slate-200 px-1.5 py-0.5 rounded-md bg-slate-50/50 hover:bg-slate-100"
                  title="Create a custom blank wireframe sheet"
                >
                  <Plus className="w-3 h-3" /> Blank
                </button>
                <button
                  onClick={handleAddLoginScreen}
                  className="text-[11px] text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5 cursor-pointer font-bold border border-indigo-200 px-1.5 py-0.5 rounded-md bg-indigo-50/50 hover:bg-indigo-50"
                  title="Insert a high-fidelity interaction-ready mobile Secure Login Page"
                >
                  🔐 + Login
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {prototype.screens.map((scr) => (
                <div
                  key={scr.id}
                  onClick={() => {
                    setActiveScreenId(scr.id);
                    setSelectedElementId(null);
                  }}
                  className={`group flex items-center justify-between p-2.5 rounded-lg text-sm cursor-pointer border transition-all ${scr.id === activeScreenId ? "bg-indigo-50/60 border-indigo-200 text-indigo-950 font-medium" : "bg-white hover:bg-slate-50/50 border-slate-200 text-slate-750"}`}
                >
                  <span className="truncate">{scr.name}</span>
                  <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteScreen(scr.id);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-0.5 hover:bg-slate-100 rounded"
                      title="Delete screen"
                      disabled={prototype.screens.length <= 1}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wireframe Library Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider mb-3">
              Wireframe Element Shelf
            </span>
            <p className="text-xs text-slate-500 mb-4 lh-relaxed">
              Inject active mock forms or hot regions into the smartphone below. Click to insert into active layout container.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleAddElement("heading")}
                className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-750 p-2 rounded-lg text-left hover:border-indigo-300 transition-colors cursor-pointer"
              >
                🏷️ Heading
              </button>
              <button
                onClick={() => handleAddElement("text")}
                className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-750 p-2 rounded-lg text-left hover:border-indigo-300 transition-colors cursor-pointer"
              >
                📝 Paragraph
              </button>
              <button
                onClick={() => handleAddElement("button")}
                className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-755 p-2 rounded-lg text-left hover:border-indigo-300 transition-colors cursor-pointer font-semibold"
              >
                🔘 Button Action
              </button>
              <button
                onClick={() => handleAddElement("input")}
                className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-750 p-2 rounded-lg text-left hover:border-indigo-300 transition-colors cursor-pointer"
              >
                ⌨️ Input Area
              </button>
              <button
                onClick={() => handleAddElement("card")}
                className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-750 p-2 rounded-lg text-left hover:border-indigo-300 transition-colors cursor-pointer"
              >
                🔲 Card Frame
              </button>
              <button
                onClick={() => handleAddElement("hotspot")}
                className="bg-amber-50/50 hover:bg-amber-100/70 border border-amber-200 text-amber-900 p-2 rounded-lg text-left font-medium transition-colors cursor-pointer"
              >
                ⚡ Hotspot Area
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN 2: iPhone Viewport Canvas Editor */}
        <div className="lg:col-span-2 space-y-4 flex flex-col items-center justify-start" id="builder-middle-canvas">
          <div className="flex gap-4 items-center mb-1 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" /> Phone Emulator Frame (360 x 640 proportions)
            </span>
          </div>

          <div
            id="simulation-view-container"
            className="w-full max-w-[360px] aspect-[9/16] bg-slate-100 rounded-[40px] border-[12px] border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-start"
          >
            {/* Front speaker notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
              <div className="w-12 h-1.5 bg-slate-850 rounded-full"></div>
            </div>

            {/* Simulated Live Frame body */}
            <div
              className={`w-full h-full relative p-4 flex flex-col justify-start pt-7 overflow-y-auto ${activeScreen?.bgColor || "bg-slate-50"}`}
              style={{ paddingBottom: '32px' }}
            >
              {activeScreen?.elements.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400">
                  <span className="text-3xl mb-1">🏗️</span>
                  <p className="text-xs">No wireframes block configured.</p>
                  <p className="text-[10px] mt-1 text-slate-400">Click elements on the left Shelf to populate your workspace.</p>
                </div>
              )}

              {activeScreen?.elements.map((el) => {
                const isSelected = el.id === selectedElementId;
                
                return (
                  <div
                    key={el.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElementId(el.id);
                      setShowingVersions(false);
                      setEditingTasks(false);
                    }}
                    style={{
                      position: "absolute",
                      left: `${el.x}%`,
                      top: `${el.y}%`,
                      width: `${el.w}%`,
                      height: `${el.h}%`,
                      zIndex: el.type === "hotspot" ? 10 : 5
                    }}
                    className={`rounded-md p-1 flex items-center justify-center cursor-pointer select-none text-xs text-center border relative transition-all duration-100
                      ${el.bgColor}
                      ${el.textColor}
                      ${isSelected ? "ring-2 ring-indigo-500 ring-offset-1 border-indigo-600 scale-[1.01]" : "border-transparent"}
                    `}
                  >
                    <span className="truncate w-full px-1">
                      {el.type === "input" ? (el.text || el.placeholder || "Enter text...") : el.text}
                    </span>

                    {/* Target link flag */}
                    {el.targetScreenId && (
                      <span className="absolute bottom-[-6px] right-2 bg-indigo-600 text-white text-[8px] font-mono leading-none px-1 py-0.5 rounded shadow-xs font-black">
                        ⚡ Linked
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom screen virtual home gesture bar bar */}
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-slate-900/40 rounded-full z-20"></div>
          </div>

          <div className="text-center font-sans text-xs text-slate-450 mt-1">
            💡 Tap elements inside the device viewport to adjust sizes, positions, text values, and destination mapping.
          </div>
        </div>

        {/* SIDE BAR 3: Properties Inspector & Audit Drawers */}
        <div className="space-y-6" id="builder-sidebar-details">
          {/* Properties Editor Tab */}
          {showingVersions ? (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 animate-fade-in text-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-emerald-600 animate-pulse" /> Version History
                </span>
                <button
                  onClick={() => setShowingVersions(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 px-2 py-0.5 border border-slate-200 rounded-md bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Snapshot success countdown toast */}
              {revertToast && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-lg text-xs font-medium flex items-start gap-1.5 animate-bounce">
                  <Check className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                  <span>{revertToast}</span>
                </div>
              )}

              {/* CREATE SNAPSHOT BLOCK */}
              <div className="bg-slate-50/50 border border-slate-200 rounded-lg p-3 space-y-2.5">
                <span className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Create Design State Snapshot</span>
                <form onSubmit={handleCreateVersionSnapshot} className="space-y-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Version Name (e.g. Added Login Screen)"
                      value={newVersionName}
                      onChange={(e) => setNewVersionName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Snapshot notes/changes (optional)"
                      value={newVersionDesc}
                      onChange={(e) => setNewVersionDesc(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" /> Capture Current State
                  </button>
                </form>
              </div>

              {/* SEARCH SNAPSHOTS */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-500 font-mono uppercase block">Filter Saved Versions</label>
                <input
                  type="text"
                  placeholder="Query version name..."
                  value={versionSearch}
                  onChange={(e) => setVersionSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:outline-hidden"
                />
              </div>

              {/* LIST OF SNAPSHOTS */}
              <div className="space-y-2">
                <span className="block text-[10px] font-mono uppercase text-indigo-600 font-bold">Saved Snapshots ({filteredVersions.length})</span>
                
                {filteredVersions.length === 0 ? (
                  <div className="text-center py-6 bg-slate-50/50 border border-dashed border-slate-200 rounded-lg text-xs text-slate-400">
                    {versionSearch ? "No versions match your search." : "No design snapshots captured yet. Capture your layout baseline to start creating revision records!"}
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {filteredVersions.map((ver) => {
                      const verDateStr = new Date(ver.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                      });
                      const verDateDayStr = new Date(ver.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                      });
                      const isAutoBackup = ver.name.includes("Auto-Backup");

                      return (
                        <div
                          key={ver.id}
                          className={`p-3 rounded-lg border text-xs space-y-2 transition-all ${isAutoBackup ? "bg-amber-50/30 border-amber-200" : "bg-white hover:bg-slate-50/50 border-slate-200"}`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <span className={`font-semibold text-slate-900 block leading-tight ${isAutoBackup ? "text-amber-800" : ""}`}>
                                {ver.name}
                              </span>
                              <span className="text-[9px] text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                                <Clock className="w-3 h-3 text-slate-400" /> {verDateDayStr} {verDateStr}
                              </span>
                            </div>
                            <button
                              onClick={() => handleDeleteVersionSnapshot(ver.id)}
                              className="text-slate-400 hover:text-red-600 p-0.5 hover:bg-red-50 rounded transition-colors cursor-pointer"
                              title="Delete snapshot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          {ver.description && (
                            <p className="text-[11px] text-slate-600 leading-normal">
                              {ver.description}
                            </p>
                          )}

                          <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono border-t border-slate-100 pt-1.5 mt-1 pb-1">
                            <span>📱 {ver.screens.length} Screens</span>
                            <span>🎯 {ver.tasks.length} Goals</span>
                          </div>

                          <button
                            onClick={() => handleRevertToVersionSnapshot(ver)}
                            className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs ${isAutoBackup ? "bg-amber-100 hover:bg-amber-200 text-amber-900" : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700"}`}
                          >
                            Restore Design State
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : selectedElement && !editingTasks ? (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                  <Sliders className="w-4 h-4 text-indigo-500" /> Element Properties
                </span>
                <button
                  onClick={() => handleDeleteElement(selectedElement.id)}
                  className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Type Class</label>
                <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded font-mono">
                  {selectedElement.type}
                </span>
              </div>

              {selectedElement.type !== "card" && (
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Component Text</label>
                  <input
                    type="text"
                    value={selectedElement.text}
                    onChange={(e) => handleUpdateElement("text", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              )}

              {selectedElement.type === "input" && (
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Placeholder Prompt</label>
                  <input
                    type="text"
                    value={selectedElement.placeholder || ""}
                    onChange={(e) => handleUpdateElement("placeholder", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              )}

              {/* Slider Controls for absolute positioning on phone box */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <span className="block text-[11px] font-mono uppercase text-slate-400 font-bold">Relative Layout Size</span>
                
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-0.5">
                    <span>X Coordinate</span>
                    <span>{selectedElement.x}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={selectedElement.x}
                    onChange={(e) => handleUpdateElement("x", parseInt(e.target.value))}
                    className="w-full accent-indigo-505 bg-slate-100 h-1 rounded-sm cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-0.5">
                    <span>Y Coordinate</span>
                    <span>{selectedElement.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={selectedElement.y}
                    onChange={(e) => handleUpdateElement("y", parseInt(e.target.value))}
                    className="w-full accent-indigo-505 bg-slate-100 h-1 rounded-sm cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-0.5">
                      <span>Width</span>
                      <span>{selectedElement.w}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={selectedElement.w}
                      onChange={(e) => handleUpdateElement("w", parseInt(e.target.value))}
                      className="w-full accent-indigo-505 h-1 rounded-sm bg-slate-100"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-0.5">
                      <span>Height</span>
                      <span>{selectedElement.h}%</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="80"
                      value={selectedElement.h}
                      onChange={(e) => handleUpdateElement("h", parseInt(e.target.value))}
                      className="w-full accent-indigo-505 h-1 rounded-sm bg-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Interaction router panel */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <span className="block text-[11px] font-mono uppercase text-slate-400 font-bold">Configure Click Navigation</span>
                
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Target Action Screen</label>
                  <select
                    value={selectedElement.targetScreenId}
                    onChange={(e) => handleUpdateElement("targetScreenId", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 rounded-md px-2 py-1.5 text-xs text-slate-800"
                  >
                    <option value="">-- No Navigation (Static element) --</option>
                    {prototype.screens.map((scr) => (
                      <option key={scr.id} value={scr.id}>
                        Go to: {scr.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedElement.targetScreenId && (
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Screen Transition Motion</label>
                    <select
                      value={selectedElement.transition}
                      onChange={(e) => handleUpdateElement("transition", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-205 rounded-md px-2 py-1.5 text-xs text-slate-800"
                    >
                      <option value="fade">🌀 Smooth Fade In</option>
                      <option value="slide-left">⬅ Slide Left motion</option>
                      <option value="slide-right">➡ Slide Right motion</option>
                      <option value="zoom">🔍 Zoom scaling jump</option>
                      <option value="none">⚡ Flat Immediate Jump</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Style options helper */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <span className="block text-[11px] font-mono uppercase text-slate-400 font-bold">Component Theming</span>
                
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Preset Palette Background</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PALETTE_BG.map((theme, i) => (
                      <button
                        key={i}
                        title={theme.name}
                        onClick={() => handleUpdateElement("bgColor", theme.class)}
                        className={`h-6 rounded border cursor-pointer ${theme.class} ${selectedElement.bgColor === theme.class ? "ring-2 ring-indigo-600 scale-105" : "hover:scale-105"}`}
                      ></button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Preset Text Colors</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PALETTE_TEXT.map((theme, i) => (
                      <button
                        key={i}
                        title={theme.name}
                        onClick={() => handleUpdateElement("textColor", theme.class)}
                        className={`h-6 rounded border bg-slate-50 hover:scale-105 text-[10px] cursor-pointer flex items-center justify-center font-bold font-mono ${theme.class} ${selectedElement.textColor === theme.class ? "ring-2 ring-indigo-600 scale-105" : ""}`}
                      >
                        Aa
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : editingTasks ? (
            /* Configure tasks module */
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-sm font-semibold text-indigo-950 flex items-center gap-1">
                  🎯 Usability Tasks Manager
                </span>
                <button
                  onClick={() => setEditingTasks(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-slate-500 lh-relaxed">
                Add objective testing goals. When running previews, users receive a prompt instructing them of this task. Reaching the Selected Target Screen triggers a successful outcome metrics mark!
              </p>

              {/* Tasks list */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <span className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Active Goals</span>
                {prototype.tasks.length === 0 ? (
                  <span className="block text-xs text-slate-400 italic">No tasks created.</span>
                ) : (
                  prototype.tasks.map((task) => {
                    const targetScr = prototype.screens.find(s => s.id === task.targetScreenId);
                    return (
                      <div key={task.id} className="bg-slate-50 p-2.5 rounded-lg border text-xs relative group">
                        <p className="font-semibold text-slate-800 pr-4">{task.instruction}</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Goal screen: <span className="font-bold text-slate-600">{targetScr?.name || "Deleted"}</span> | Limit: {task.timeLimitSec}s
                        </p>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 cursor-pointer hidden group-hover:block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Add task form */}
              <form onSubmit={handleAddTask} className="space-y-3 pt-3 border-t border-slate-100">
                <span className="block text-[10px] font-mono uppercase text-indigo-500 font-bold">Publish New Task Goal</span>
                
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Instruction Objective</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Try to add strawberries to basket and checkout"
                    value={newTaskGoal}
                    onChange={(e) => setNewTaskGoal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Target Completion Screen</label>
                  <select
                    value={newTaskTarget}
                    required
                    onChange={(e) => setNewTaskTarget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 rounded-md px-2 py-1.5 text-xs text-slate-800"
                  >
                    <option value="">-- Choose Success Destination --</option>
                    {prototype.screens.map((scr) => (
                      <option key={scr.id} value={scr.id}>
                        Reaching: {scr.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Time Limit (seconds)</label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-205 rounded-md px-2 py-1 text-xs text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!newTaskGoal.trim() || !newTaskTarget}
                  className="w-full bg-indigo-650 hover:bg-indigo-755 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Secure Launch Task
                </button>
              </form>
            </div>
          ) : (
            /* Default screen editor sidebar */
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
                <Settings className="w-4 h-4 text-slate-400" /> Screen Configuration
              </span>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Active Screen Name</label>
                <input
                  type="text"
                  value={activeScreen?.name || ""}
                  onChange={(e) => {
                    const scrId = activeScreenId;
                    const val = e.target.value;
                    const updated = {
                      ...prototype,
                      screens: prototype.screens.map((s) => s.id === scrId ? { ...s, name: val } : s),
                      updatedAt: new Date().toISOString()
                    };
                    handleUpdatePrototype(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-202 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Canvas Baseline Background</label>
                <select
                  value={activeScreen?.bgColor || "bg-slate-50"}
                  onChange={(e) => {
                    const scrId = activeScreenId;
                    const val = e.target.value;
                    const updated = {
                      ...prototype,
                      screens: prototype.screens.map((s) => s.id === scrId ? { ...s, bgColor: val } : s),
                      updatedAt: new Date().toISOString()
                    };
                    handleUpdatePrototype(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-202 rounded-md px-2 py-1.5 text-xs text-slate-800"
                >
                  <option value="bg-slate-50">📱 Matte Soft Slate (Light)</option>
                  <option value="bg-white">📱 Glossy White canvas (Light)</option>
                  <option value="bg-emerald-50">🌱 Eco Mint Green (Light-Green)</option>
                  <option value="bg-blue-50">🌊 Ocean Mist Blue (Light-Blue)</option>
                  <option value="bg-slate-900 text-white">🌌 Ambient Obsidian (Dark)</option>
                  <option value="bg-slate-950 text-white border border-slate-800">🌌 Midnight Pro Console (Dark-High Contrast)</option>
                  <option value="bg-amber-50">🥐 Parisian Cream (Warm Theme)</option>
                  <option value="bg-indigo-950 text-white">🌌 Royal Purple Glass (Dark)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
                  <LayoutGrid className="w-3.5 h-3.5" /> Start Screen Node:
                </div>
                <select
                  value={prototype.startScreenId}
                  onChange={(e) => {
                    const updated = {
                      ...prototype,
                      startScreenId: e.target.value,
                      updatedAt: new Date().toISOString()
                    };
                    handleUpdatePrototype(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-202 rounded-md px-2 py-1.5 text-xs text-slate-800"
                >
                  {prototype.screens.map((scr) => (
                    <option key={scr.id} value={scr.id}>
                      {scr.id === prototype.startScreenId ? "⭐ " : ""}{scr.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
