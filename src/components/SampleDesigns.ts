import { Prototype, Screen, TestTask, WireframeElement } from "../types";

export function createEmptyPrototype(title: string, description: string): Prototype {
  const defaultScreenId = `screen-${Math.random().toString(36).substr(2, 9)}`;
  const defaultScreen: Screen = {
    id: defaultScreenId,
    name: "Home Page",
    bgColor: "bg-slate-50",
    elements: [
      {
        id: `el-${Math.random().toString(36).substr(2, 9)}`,
        type: "heading",
        text: "Welcome to My App",
        x: 10,
        y: 10,
        w: 80,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-slate-800",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      }
    ]
  };

  return {
    id: `proto-${Math.random().toString(36).substr(2, 9)}`,
    title,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startScreenId: defaultScreenId,
    screens: [defaultScreen],
    tasks: [
      {
        id: `task-${Math.random().toString(36).substr(2, 9)}`,
        instruction: "Explore the homepage and find interactive elements.",
        targetScreenId: defaultScreenId,
        timeLimitSec: 30
      }
    ]
  };
}

export function createSaaSHubTemplate(): Prototype {
  const protoId = "seed-saas-dashboard";
  
  const screenHome: Screen = {
    id: "saas-home",
    name: "Dashboard Analytics Overview",
    bgColor: "bg-slate-900 text-white",
    elements: [
      // Top Navigation / Sidebar
      {
        id: "saas-rail",
        type: "card",
        text: "",
        x: 0,
        y: 0,
        w: 22,
        h: 100,
        bgColor: "bg-slate-950 border-r border-slate-800",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "saas-logo",
        type: "heading",
        text: "🎛️ SaasHub",
        x: 2,
        y: 4,
        w: 18,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-indigo-400 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "md"
      },
      {
        id: "saas-nav1",
        type: "button",
        text: "📊 Dashboard",
        x: 2,
        y: 12,
        w: 18,
        h: 5,
        bgColor: "bg-indigo-600",
        textColor: "text-white",
        targetScreenId: "saas-home",
        transition: "none"
      },
      {
        id: "saas-nav2",
        type: "button",
        text: "👥 Team Assets",
        x: 2,
        y: 19,
        w: 18,
        h: 5,
        bgColor: "bg-transparent hover:bg-slate-800",
        textColor: "text-slate-300",
        targetScreenId: "saas-team",
        transition: "fade"
      },
      {
        id: "saas-nav3",
        type: "button",
        text: "⚙️ Settings",
        x: 2,
        y: 26,
        w: 18,
        h: 5,
        bgColor: "bg-transparent hover:bg-slate-800",
        textColor: "text-slate-300",
        targetScreenId: "saas-settings",
        transition: "zoom"
      },
      
      // Main Body Header
      {
        id: "saas-body-header",
        type: "card",
        text: "",
        x: 22,
        y: 0,
        w: 78,
        h: 12,
        bgColor: "bg-slate-900 border-b border-slate-800",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "saas-body-title",
        type: "heading",
        text: "Global Operation Console",
        x: 24,
        y: 3,
        w: 50,
        h: 6,
        bgColor: "bg-transparent",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },

      // Analytics Metric Rows
      {
        id: "saas-card-stat1",
        type: "card",
        text: "",
        x: 24,
        y: 16,
        w: 24,
        h: 20,
        bgColor: "bg-slate-800 border border-slate-705",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "saas-stat1-lbl",
        type: "text",
        text: "System Latency KPI",
        x: 26,
        y: 19,
        w: 20,
        h: 3,
        bgColor: "bg-transparent",
        textColor: "text-slate-400",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "saas-stat1-num",
        type: "heading",
        text: "14.2 ms",
        x: 26,
        y: 24,
        w: 20,
        h: 6,
        bgColor: "bg-transparent",
        textColor: "text-emerald-400 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "xl"
      },
      {
        id: "saas-card-stat2",
        type: "card",
        text: "",
        x: 50,
        y: 16,
        w: 24,
        h: 20,
        bgColor: "bg-slate-800 border border-slate-705",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "saas-stat2-lbl",
        type: "text",
        text: "Active Network Bridges",
        x: 52,
        y: 19,
        w: 20,
        h: 3,
        bgColor: "bg-transparent",
        textColor: "text-slate-400",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "saas-stat2-num",
        type: "heading",
        text: "2,492 Nodes",
        x: 52,
        y: 24,
        w: 20,
        h: 6,
        bgColor: "bg-transparent",
        textColor: "text-indigo-400 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "xl"
      },
      {
        id: "saas-card-stat3",
        type: "card",
        text: "",
        x: 76,
        y: 16,
        w: 22,
        h: 20,
        bgColor: "bg-blue-900 border border-blue-600 hover:bg-blue-800 cursor-pointer",
        textColor: "text-white",
        targetScreenId: "saas-settings", // Shortcut link
        transition: "zoom"
      },
      {
        id: "saas-stat3-lbl",
        type: "text",
        text: "Operational Security",
        x: 78,
        y: 19,
        w: 18,
        h: 3,
        bgColor: "bg-transparent",
        textColor: "text-blue-100",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "saas-stat3-num",
        type: "heading",
        text: "99.98% OK",
        x: 78,
        y: 24,
        w: 18,
        h: 6,
        bgColor: "bg-transparent",
        textColor: "text-white font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "md"
      },
      {
        id: "saas-stat3-act",
        type: "text",
        text: "Click to config →",
        x: 78,
        y: 30,
        w: 18,
        h: 3,
        bgColor: "bg-transparent",
        textColor: "text-amber-300 font-medium",
        targetScreenId: "saas-settings",
        transition: "none",
        fontSize: "sm"
      },

      // Mid area: Chart mock frame
      {
        id: "saas-chart-box",
        type: "card",
        text: "",
        x: 24,
        y: 40,
        w: 74,
        h: 46,
        bgColor: "bg-slate-950 border border-slate-800 rounded-lg p-4",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "saas-chart-title",
        type: "heading",
        text: "Live Network Throughput Trend (24h)",
        x: 26,
        y: 43,
        w: 50,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-indigo-100",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "saas-chart-text",
        type: "text",
        text: "[ Simulated Graph - Click settings in sidebar to configure credentials and view permissions ]",
        x: 26,
        y: 58,
        w: 70,
        h: 6,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-mono text-center",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "saas-chart-hotspot",
        type: "hotspot",
        text: "Inspect team config shortcut",
        x: 24,
        y: 40,
        w: 74,
        h: 46,
        bgColor: "bg-indigo-305 opacity-10",
        textColor: "text-white-55",
        targetScreenId: "saas-team",
        transition: "slide-left"
      },

      // Footer notice
      {
        id: "saas-foot",
        type: "text",
        text: "Operational Environment - Access Levels are strict",
        x: 24,
        y: 91,
        w: 74,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 text-right",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      }
    ]
  };

  const screenTeam: Screen = {
    id: "saas-team",
    name: "Team Access Profiles",
    bgColor: "bg-slate-900 text-white",
    elements: [
      {
        id: "tea-rail",
        type: "card",
        text: "",
        x: 0,
        y: 0,
        w: 22,
        h: 100,
        bgColor: "bg-slate-950 border-r border-slate-800",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "tea-logo",
        type: "heading",
        text: "🎛️ SaasHub",
        x: 2,
        y: 4,
        w: 18,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-indigo-400 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "md"
      },
      {
        id: "tea-nav1",
        type: "button",
        text: "📊 Dashboard",
        x: 2,
        y: 12,
        w: 18,
        h: 5,
        bgColor: "bg-transparent hover:bg-slate-800",
        textColor: "text-slate-300",
        targetScreenId: "saas-home",
        transition: "none"
      },
      {
        id: "tea-nav2",
        type: "button",
        text: "👥 Team Assets",
        x: 2,
        y: 19,
        w: 18,
        h: 5,
        bgColor: "bg-indigo-600",
        textColor: "text-white",
        targetScreenId: "saas-team",
        transition: "none"
      },
      {
        id: "tea-nav3",
        type: "button",
        text: "⚙️ Settings",
        x: 2,
        y: 26,
        w: 18,
        h: 5,
        bgColor: "bg-transparent hover:bg-slate-800",
        textColor: "text-slate-300",
        targetScreenId: "saas-settings",
        transition: "zoom"
      },

      {
        id: "tea-header",
        type: "card",
        text: "",
        x: 22,
        y: 0,
        w: 78,
        h: 12,
        bgColor: "bg-slate-900 border-b border-slate-800",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "tea-title",
        type: "heading",
        text: "Active Operations Team",
        x: 24,
        y: 3,
        w: 50,
        h: 6,
        bgColor: "bg-transparent",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },

      // Team table elements
      {
        id: "tea-table-head",
        type: "card",
        text: "",
        x: 24,
        y: 16,
        w: 74,
        h: 8,
        bgColor: "bg-slate-950 border-b border-slate-700",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "tea-h-name",
        type: "text",
        text: "NAME / PROFILE",
        x: 26,
        y: 18,
        w: 30,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "tea-h-role",
        type: "text",
        text: "SYSTEM LEVEL",
        x: 58,
        y: 18,
        w: 20,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "tea-row1",
        type: "card",
        text: "",
        x: 24,
        y: 26,
        w: 74,
        h: 12,
        bgColor: "bg-slate-800/40 border-b border-slate-800",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "tea-r1-n",
        type: "text",
        text: "Chief Operator (Prabhas L.)",
        x: 26,
        y: 29,
        w: 30,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-white font-medium",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "tea-r1-role",
        type: "text",
        text: "SuperAdmin ROOT",
        x: 58,
        y: 29,
        w: 20,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-pink-400 font-mono",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "tea-row2",
        type: "card",
        text: "",
        x: 24,
        y: 40,
        w: 74,
        h: 12,
        bgColor: "bg-slate-800/40 border-b border-slate-800",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "tea-r2-n",
        type: "text",
        text: "Usability Auditor (Alex Mercer)",
        x: 26,
        y: 43,
        w: 30,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-white font-medium",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "tea-r2-role",
        type: "text",
        text: "Review Supervisor",
        x: 58,
        y: 43,
        w: 20,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-amber-400 font-mono",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },

      // Action: Add member forms
      {
        id: "tea-action-lbl",
        type: "heading",
        text: "Invite New System Operator",
        x: 24,
        y: 56,
        w: 74,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none",
        fontSize: "md"
      },
      {
        id: "tea-input-email",
        type: "input",
        text: "",
        x: 24,
        y: 63,
        w: 40,
        h: 8,
        bgColor: "bg-slate-950 border border-slate-700 text-white",
        textColor: "text-slate-100",
        targetScreenId: "",
        transition: "none",
        placeholder: "Enter teammate business email..."
      },
      {
        id: "tea-submit-btn",
        type: "button",
        text: "Send Root Keys invite ✉",
        x: 66,
        y: 63,
        w: 32,
        h: 8,
        bgColor: "bg-indigo-600 hover:bg-indigo-700",
        textColor: "text-white",
        targetScreenId: "saas-settings", // takes them to settings to review
        transition: "slide-left"
      },
      {
        id: "tea-back-btn",
        type: "button",
        text: "← Back Dashboard",
        x: 24,
        y: 77,
        w: 30,
        h: 8,
        bgColor: "bg-slate-800 hover:bg-slate-700",
        textColor: "text-white",
        targetScreenId: "saas-home",
        transition: "slide-right"
      }
    ]
  };

  const screenSettings: Screen = {
    id: "saas-settings",
    name: "SaaS System Settings",
    bgColor: "bg-slate-950 text-white",
    elements: [
      {
        id: "set-rail",
        type: "card",
        text: "",
        x: 0,
        y: 0,
        w: 22,
        h: 100,
        bgColor: "bg-slate-950 border-r border-slate-900",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "set-logo",
        type: "heading",
        text: "🎛️ SaasHub",
        x: 2,
        y: 4,
        w: 18,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-indigo-400 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "md"
      },
      {
        id: "set-nav1",
        type: "button",
        text: "📊 Dashboard",
        x: 2,
        y: 12,
        w: 18,
        h: 5,
        bgColor: "bg-transparent hover:bg-slate-850",
        textColor: "text-slate-300",
        targetScreenId: "saas-home",
        transition: "none"
      },
      {
        id: "set-nav2",
        type: "button",
        text: "👥 Team Assets",
        x: 2,
        y: 19,
        w: 18,
        h: 5,
        bgColor: "bg-transparent hover:bg-slate-850",
        textColor: "text-slate-300",
        targetScreenId: "saas-team",
        transition: "none"
      },
      {
        id: "set-nav3",
        type: "button",
        text: "⚙️ Settings",
        x: 2,
        y: 26,
        w: 18,
        h: 5,
        bgColor: "bg-indigo-600",
        textColor: "text-white",
        targetScreenId: "saas-settings",
        transition: "none"
      },

      {
        id: "set-header",
        type: "card",
        text: "",
        x: 22,
        y: 0,
        w: 78,
        h: 12,
        bgColor: "bg-slate-950 border-b border-slate-900",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "set-title",
        type: "heading",
        text: "Operational Environment & Security Settings",
        x: 24,
        y: 3,
        w: 60,
        h: 6,
        bgColor: "bg-transparent",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },

      // Security Form Input
      {
        id: "set-box",
        type: "card",
        text: "",
        x: 24,
        y: 18,
        w: 72,
        h: 60,
        bgColor: "bg-slate-900 border border-slate-800 rounded-xl p-6",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "set-box-title",
        type: "heading",
        text: "System Encryption Keys",
        x: 28,
        y: 22,
        w: 64,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-indigo-305",
        targetScreenId: "",
        transition: "none",
        fontSize: "md"
      },
      {
        id: "set-box-intro",
        type: "text",
        text: "Input your credential key code or system PIN to perform advanced data sync. Leaving this blank is safer.",
        x: 28,
        y: 28,
        w: 64,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-slate-400",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "set-cred",
        type: "input",
        text: "",
        x: 28,
        y: 38,
        w: 64,
        h: 8,
        bgColor: "bg-slate-950 border border-slate-800 text-slate-100 font-mono",
        textColor: "text-slate-100",
        targetScreenId: "",
        transition: "none",
        placeholder: "SEC_KEY_XXXXXXXXXXXX"
      },
      {
        id: "set-save-btn",
        type: "button",
        text: "Initialize Super Security Verification",
        x: 28,
        y: 50,
        w: 64,
        h: 8,
        bgColor: "bg-emerald-600 hover:bg-emerald-700",
        textColor: "text-white",
        targetScreenId: "saas-home", // returns successful verification home
        transition: "fade"
      },
      {
        id: "set-nav-home",
        type: "button",
        text: "Cancel and Return Overview",
        x: 28,
        y: 62,
        w: 64,
        h: 8,
        bgColor: "bg-transparent hover:bg-slate-800 border border-slate-700",
        textColor: "text-slate-350",
        targetScreenId: "saas-home",
        transition: "fade"
      }
    ]
  };

  return {
    id: protoId,
    title: "SaaS Ops Enterprise Console",
    description: "An advanced, dark-theme brutalist command hub testing sidebar navigations, dashboard grid aesthetics, status rows, and modal security flows.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startScreenId: "saas-home",
    screens: [screenHome, screenTeam, screenSettings],
    tasks: [
      {
        id: "task-saas-1",
        instruction: "Navigate into the Teammates profiles panel from the sidebar, send a root invite to email, then navigate into Security Settings.",
        targetScreenId: "saas-settings",
        timeLimitSec: 45
      }
    ]
  };
}

export function createPledgeOnboardingTemplate(): Prototype {
  const protoId = "seed-pledge-onboarding";

  const screen1: Screen = {
    id: "pledge-screen-1",
    name: "Onboarding: Big Goals",
    bgColor: "bg-white",
    elements: [
      {
        id: "p1-time",
        type: "heading",
        text: "9:41",
        x: 6,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-800 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p1-icons",
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p1-backdrop",
        type: "card",
        text: "",
        x: 10,
        y: 12,
        w: 80,
        h: 32,
        bgColor: "bg-emerald-50/50 border border-slate-100 rounded-3xl",
        textColor: "text-gray-900",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "p1-illustration",
        type: "heading",
        text: "🏃⚡",
        x: 20,
        y: 20,
        w: 60,
        h: 16,
        bgColor: "bg-transparent",
        textColor: "text-emerald-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "xl"
      },
      {
        id: "p1-title",
        type: "heading",
        text: "Big Goals",
        x: 10,
        y: 48,
        w: 80,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-slate-900 font-sans font-extrabold tracking-tight",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },
      {
        id: "p1-body",
        type: "text",
        text: "Pledge to be a better you.\nPledge to spark change",
        x: 10,
        y: 58,
        w: 80,
        h: 14,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-sans tracking-wide leading-relaxed",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p1-dots",
        type: "text",
        text: "🟢 ⚪ ⚪",
        x: 35,
        y: 76,
        w: 30,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-sans",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p1-skip",
        type: "button",
        text: "Skip",
        x: 10,
        y: 85,
        w: 24,
        h: 8,
        bgColor: "bg-transparent hover:bg-slate-50 border border-slate-100 rounded-xl",
        textColor: "text-slate-450 hover:text-slate-600 font-semibold",
        targetScreenId: "pledge-screen-success",
        transition: "fade"
      },
      {
        id: "p1-next",
        type: "button",
        text: "Next",
        x: 66,
        y: 85,
        w: 24,
        h: 8,
        bgColor: "bg-[#48c79c] hover:bg-[#3fb089] border-0",
        textColor: "text-white font-semibold shadow-xs rounded-xl",
        targetScreenId: "pledge-screen-2",
        transition: "slide-left"
      }
    ]
  };

  const screen2: Screen = {
    id: "pledge-screen-2",
    name: "Onboarding: Consequences",
    bgColor: "bg-white",
    elements: [
      {
        id: "p2-time",
        type: "heading",
        text: "9:41",
        x: 6,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-800 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p2-icons",
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p2-backdrop",
        type: "card",
        text: "",
        x: 10,
        y: 12,
        w: 80,
        h: 32,
        bgColor: "bg-red-50/40 border border-slate-100 rounded-3xl",
        textColor: "text-gray-900",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "p2-illustration",
        type: "heading",
        text: "🙌💵",
        x: 20,
        y: 20,
        w: 60,
        h: 16,
        bgColor: "bg-transparent",
        textColor: "text-red-500",
        targetScreenId: "",
        transition: "none",
        fontSize: "xl"
      },
      {
        id: "p2-title",
        type: "heading",
        text: "Big Consequences",
        x: 10,
        y: 48,
        w: 80,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-slate-900 font-sans font-extrabold tracking-tight",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },
      {
        id: "p2-body",
        type: "text",
        text: "Pledge to put money on the line to keep you accountable to friends, enemies, or a charity you despise",
        x: 10,
        y: 58,
        w: 80,
        h: 14,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-sans tracking-wide leading-relaxed",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p2-dots",
        type: "text",
        text: "⚪ 🟢 ⚪",
        x: 35,
        y: 76,
        w: 30,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-sans",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p2-skip",
        type: "button",
        text: "Skip",
        x: 10,
        y: 85,
        w: 24,
        h: 8,
        bgColor: "bg-transparent hover:bg-slate-50 border border-slate-100 rounded-xl",
        textColor: "text-slate-450 hover:text-slate-600 font-semibold",
        targetScreenId: "pledge-screen-success",
        transition: "fade"
      },
      {
        id: "p2-next",
        type: "button",
        text: "Next",
        x: 66,
        y: 85,
        w: 24,
        h: 8,
        bgColor: "bg-[#48c79c] hover:bg-[#3fb089] border-0",
        textColor: "text-white font-semibold shadow-xs rounded-xl",
        targetScreenId: "pledge-screen-3",
        transition: "slide-left"
      }
    ]
  };

  const screen3: Screen = {
    id: "pledge-screen-3",
    name: "Onboarding: Massive Changes",
    bgColor: "bg-white",
    elements: [
      {
        id: "p3-time",
        type: "heading",
        text: "9:41",
        x: 6,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-800 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p3-icons",
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p3-backdrop",
        type: "card",
        text: "",
        x: 10,
        y: 12,
        w: 80,
        h: 32,
        bgColor: "bg-blue-50/40 border border-slate-100 rounded-3xl",
        textColor: "text-gray-900",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "p3-illustration",
        type: "heading",
        text: "🧘📱",
        x: 20,
        y: 20,
        w: 60,
        h: 16,
        bgColor: "bg-transparent",
        textColor: "text-blue-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "xl"
      },
      {
        id: "p3-title",
        type: "heading",
        text: "Massive Changes",
        x: 10,
        y: 48,
        w: 80,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-slate-900 font-sans font-extrabold tracking-tight",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },
      {
        id: "p3-body",
        type: "text",
        text: "Honor your Pledge, honor yourself. Pledges will be the spark that ignites your fire",
        x: 10,
        y: 58,
        w: 80,
        h: 14,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-sans tracking-wide leading-relaxed",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p3-dots",
        type: "text",
        text: "⚪ ⚪ 🟢",
        x: 35,
        y: 76,
        w: 30,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-sans",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "p3-skip",
        type: "button",
        text: "Skip",
        x: 10,
        y: 85,
        w: 24,
        h: 8,
        bgColor: "bg-transparent hover:bg-slate-50 border border-slate-100 rounded-xl",
        textColor: "text-slate-450 hover:text-slate-600 font-semibold",
        targetScreenId: "pledge-screen-success",
        transition: "fade"
      },
      {
        id: "p3-next",
        type: "button",
        text: "Next",
        x: 66,
        y: 85,
        w: 24,
        h: 8,
        bgColor: "bg-[#48c79c] hover:bg-[#3fb089] border-0",
        textColor: "text-white font-semibold shadow-xs rounded-xl",
        targetScreenId: "pledge-screen-success",
        transition: "zoom"
      }
    ]
  };

  const screenSuccess: Screen = {
    id: "pledge-screen-success",
    name: "Campaign Ready",
    bgColor: "bg-gradient-to-br from-emerald-50/50 to-teal-50/40",
    elements: [
      {
        id: "ps-time",
        type: "heading",
        text: "9:41",
        x: 6,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-800 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "ps-icons",
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "ps-trophy",
        type: "heading",
        text: "🏆 Account Configuration Ready!",
        x: 10,
        y: 14,
        w: 80,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-emerald-700 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "md"
      },
      {
        id: "ps-title",
        type: "heading",
        text: "Spark Massive Changes",
        x: 10,
        y: 26,
        w: 80,
        h: 12,
        bgColor: "bg-transparent",
        textColor: "text-slate-900 font-extrabold tracking-tight",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },
      {
        id: "ps-body",
        type: "text",
        text: "Select a custom target pledge level template to secure your accountability baseline:",
        x: 10,
        y: 40,
        w: 80,
        h: 12,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-sans leading-snug",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "ps-card1",
        type: "card",
        text: "🏃 Daily Sprint Contract ($5.00 stake)",
        x: 10,
        y: 53,
        w: 80,
        h: 11,
        bgColor: "bg-white hover:bg-emerald-50/50 border border-slate-200 rounded-2xl p-2 cursor-pointer shadow-xs",
        textColor: "text-slate-800 font-medium text-left",
        targetScreenId: "pledge-screen-1",
        transition: "zoom"
      },
      {
        id: "ps-card2",
        type: "card",
        text: "📚 30-Min Reading Contract ($10.00 stake)",
        x: 10,
        y: 67,
        w: 80,
        h: 11,
        bgColor: "bg-white hover:bg-emerald-50/50 border border-slate-200 rounded-2xl p-2 cursor-pointer shadow-xs",
        textColor: "text-slate-800 font-medium text-left",
        targetScreenId: "pledge-screen-1",
        transition: "zoom"
      },
      {
        id: "ps-done",
        type: "button",
        text: "Return to Screen Baseline ⭐",
        x: 10,
        y: 84,
        w: 80,
        h: 9,
        bgColor: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md",
        textColor: "text-white font-bold",
        targetScreenId: "pledge-screen-1",
        transition: "fade"
      }
    ]
  };

  return {
    id: protoId,
    title: "Pledge App Onboarding",
    description: "An offline-first, high-fidelity mobile onboarding flow faithfully recreating the three critical setup screens: 'Big Goals', 'Big Consequences', and 'Massive Changes' in high-contrast styling.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startScreenId: "pledge-screen-1",
    screens: [screen1, screen2, screen3, screenSuccess],
    tasks: [
      {
        id: "task-pledge-onboarding-1",
        instruction: "Navigate completely through the series of onboarding screens (Big Goals ➔ Big Consequences ➔ Massive Changes) and view the Campaign success panel.",
        targetScreenId: "pledge-screen-success",
        timeLimitSec: 45
      }
    ]
  };
}

export function createLoginFlowTemplate(): Prototype {
  const protoId = "seed-secure-login";

  const screenForm: Screen = {
    id: "login-screen-form",
    name: "Secure Gate: Log In",
    bgColor: "bg-slate-50",
    elements: [
      {
        id: "clf-time",
        type: "heading",
        text: "9:41",
        x: 6,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-800 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clf-icons",
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clf-backdrop",
        type: "card",
        text: "",
        x: 8,
        y: 10,
        w: 84,
        h: 70,
        bgColor: "bg-white border border-slate-200 rounded-3xl shadow-xs",
        textColor: "text-slate-900",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "clf-logo",
        type: "heading",
        text: "🔐 Secure Gate",
        x: 15,
        y: 15,
        w: 70,
        h: 7,
        bgColor: "bg-transparent",
        textColor: "text-slate-900 font-sans font-extrabold tracking-tight text-center",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },
      {
        id: "clf-sub",
        type: "text",
        text: "Enter enterprise credentials to unlock your console workspace.",
        x: 12,
        y: 22,
        w: 76,
        h: 8,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-sans text-center leading-normal",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clf-email-lbl",
        type: "text",
        text: "Corporate Email Address",
        x: 15,
        y: 32,
        w: 70,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-sans font-semibold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clf-email-inp",
        type: "input",
        text: "",
        placeholder: "username@corporation.com",
        x: 14,
        y: 37,
        w: 72,
        h: 8,
        bgColor: "bg-white border border-slate-200 rounded-xl px-2",
        textColor: "text-slate-700",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "clf-pass-lbl",
        type: "text",
        text: "Account Password",
        x: 15,
        y: 47,
        w: 70,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-sans font-semibold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clf-pass-inp",
        type: "input",
        text: "",
        placeholder: "••••••••••••",
        x: 14,
        y: 52,
        w: 72,
        h: 8,
        bgColor: "bg-white border border-slate-200 rounded-xl px-2",
        textColor: "text-slate-700",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "clf-forgot",
        type: "button",
        text: "🔑 Forgot Account Password?",
        x: 15,
        y: 62,
        w: 70,
        h: 6,
        bgColor: "bg-transparent text-indigo-600 hover:text-indigo-805 text-left border-0",
        textColor: "text-indigo-600 font-semibold font-sans",
        targetScreenId: "login-screen-forgot",
        transition: "slide-left"
      },
      {
        id: "clf-submit",
        type: "button",
        text: "Verifying & Sign In ➔",
        x: 14,
        y: 69,
        w: 72,
        h: 8,
        bgColor: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs border-0",
        textColor: "text-white font-bold",
        targetScreenId: "login-screen-success",
        transition: "zoom"
      },
      {
        id: "clf-toggle-signup",
        type: "button",
        text: "Request Corporate Account",
        x: 10,
        y: 84,
        w: 80,
        h: 6,
        bgColor: "bg-transparent text-slate-500 font-sans text-center hover:text-indigo-600",
        textColor: "text-slate-500 font-medium",
        targetScreenId: "",
        transition: "none"
      }
    ]
  };

  const screenForgot: Screen = {
    id: "login-screen-forgot",
    name: "Secure Gate: Recover",
    bgColor: "bg-slate-50",
    elements: [
      {
        id: "cff-time",
        type: "heading",
        text: "9:41",
        x: 6,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-800 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cff-icons",
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cff-backdrop",
        type: "card",
        text: "",
        x: 8,
        y: 12,
        w: 84,
        h: 64,
        bgColor: "bg-white border border-slate-200 rounded-3xl shadow-xs",
        textColor: "text-slate-900",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "cff-logo",
        type: "heading",
        text: "🔑 Recover Access",
        x: 15,
        y: 18,
        w: 70,
        h: 7,
        bgColor: "bg-transparent",
        textColor: "text-slate-900 font-sans font-extrabold tracking-tight text-center",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },
      {
        id: "cff-sub",
        type: "text",
        text: "Provide your registered email. We will wire a security recovery challenge code to your inbox.",
        x: 12,
        y: 26,
        w: 76,
        h: 12,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-sans text-center leading-normal",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cff-email-lbl",
        type: "text",
        text: "Registered Office Email",
        x: 15,
        y: 41,
        w: 70,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-sans font-semibold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cff-email-inp",
        type: "input",
        text: "",
        placeholder: "username@corporation.com",
        x: 14,
        y: 46,
        w: 72,
        h: 8,
        bgColor: "bg-white border border-slate-200 rounded-xl px-2",
        textColor: "text-slate-700",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "cff-submit",
        type: "button",
        text: "Send Verification Code ✉️",
        x: 14,
        y: 59,
        w: 72,
        h: 8,
        bgColor: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs border-0",
        textColor: "text-white font-bold",
        targetScreenId: "login-screen-verify",
        transition: "slide-left"
      },
      {
        id: "cff-back",
        type: "button",
        text: "⬅️ Back to Sign in",
        x: 15,
        y: 69,
        w: 70,
        h: 5,
        bgColor: "bg-transparent text-slate-500 hover:text-slate-805 border-0",
        textColor: "text-slate-500 font-semibold font-sans",
        targetScreenId: "login-screen-form",
        transition: "slide-right"
      }
    ]
  };

  const screenVerify: Screen = {
    id: "login-screen-verify",
    name: "Secure Gate: Verify",
    bgColor: "bg-slate-50",
    elements: [
      {
        id: "clv-time",
        type: "heading",
        text: "9:41",
        x: 6,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-800 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clv-icons",
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-600",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clv-backdrop",
        type: "card",
        text: "",
        x: 8,
        y: 12,
        w: 84,
        h: 62,
        bgColor: "bg-white border border-slate-200 rounded-3xl shadow-xs",
        textColor: "text-slate-900",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "clv-logo",
        type: "heading",
        text: "✉️ Check Your Inbox",
        x: 15,
        y: 18,
        w: 70,
        h: 7,
        bgColor: "bg-transparent",
        textColor: "text-slate-900 font-sans font-extrabold tracking-tight text-center",
        targetScreenId: "",
        transition: "none",
        fontSize: "lg"
      },
      {
        id: "clv-sub",
        type: "text",
        text: "We have dispatched a 6-digit confirmation security PIN to your device. Please key it in below:",
        x: 12,
        y: 26,
        w: 76,
        h: 12,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-sans text-center leading-normal",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clv-pin-lbl",
        type: "text",
        text: "Account Security PIN",
        x: 15,
        y: 41,
        w: 70,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-sans font-semibold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "clv-pin-inp",
        type: "input",
        text: "",
        placeholder: "Code (e.g. 842913)",
        x: 14,
        y: 46,
        w: 72,
        h: 8,
        bgColor: "bg-white border border-slate-200 rounded-xl px-2",
        textColor: "text-slate-700",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "clv-submit",
        type: "button",
        text: "Confirm Pin & Unlock Hub ✅",
        x: 14,
        y: 58,
        w: 72,
        h: 8,
        bgColor: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs border-0",
        textColor: "text-white font-bold",
        targetScreenId: "login-screen-success",
        transition: "fade"
      },
      {
        id: "clv-resend",
        type: "button",
        text: "Didn't receive? Resend dispatch trigger",
        x: 15,
        y: 69,
        w: 70,
        h: 5,
        bgColor: "bg-transparent text-slate-400 hover:text-slate-600 border-0",
        textColor: "text-slate-400 font-medium font-sans text-xs",
        targetScreenId: "",
        transition: "none"
      }
    ]
  };

  const screenSuccess: Screen = {
    id: "login-screen-success",
    name: "Corporate Dashboard Hub",
    bgColor: "bg-slate-900 text-white",
    elements: [
      {
        id: "cls-time",
        type: "heading",
        text: "9:41",
        x: 6,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-300 font-sans font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cls-icons",
        type: "text",
        text: "📶 🔋",
        x: 82,
        y: 3,
        w: 12,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-400",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cls-welcome",
        type: "heading",
        text: "⭐ Workspace Decrypted",
        x: 8,
        y: 10,
        w: 84,
        h: 7,
        bgColor: "bg-transparent",
        textColor: "text-indigo-400 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "md"
      },
      {
        id: "cls-meta",
        type: "text",
        text: "Session Verified Code: 200 OK. Account state: Fully Authorized Active Administrator.",
        x: 8,
        y: 18,
        w: 84,
        h: 9,
        bgColor: "bg-transparent",
        textColor: "text-slate-400 font-sans",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cls-card1",
        type: "card",
        text: "",
        x: 8,
        y: 28,
        w: 84,
        h: 18,
        bgColor: "bg-slate-800 border border-slate-700 rounded-2xl",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "cls-c1title",
        type: "heading",
        text: "🔑 Verification Ledger",
        x: 12,
        y: 31,
        w: 76,
        h: 4,
        bgColor: "bg-transparent",
        textColor: "text-slate-200 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cls-c1body",
        type: "text",
        text: "Secure token: JWT x509 active.\nKey signature: Verified SHA-256.",
        x: 12,
        y: 37,
        w: 76,
        h: 7,
        bgColor: "bg-transparent",
        textColor: "text-emerald-400 font-mono",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cls-card2",
        type: "card",
        text: "",
        x: 8,
        y: 49,
        w: 84,
        h: 22,
        bgColor: "bg-slate-800 border border-slate-700 rounded-2xl",
        textColor: "text-white",
        targetScreenId: "",
        transition: "none"
      },
      {
        id: "cls-c2title",
        type: "heading",
        text: "📊 Protected Enterprise Assets",
        x: 12,
        y: 52,
        w: 76,
        h: 5,
        bgColor: "bg-transparent",
        textColor: "text-slate-200 font-bold",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cls-c2body",
        type: "text",
        text: "• corporate_vault.db (Encrypted)\n• internal_ledger.xls (Confidential)\n• identity-auth-service (Active)",
        x: 12,
        y: 58,
        w: 76,
        h: 11,
        bgColor: "bg-transparent",
        textColor: "text-slate-300 font-sans leading-relaxed",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      },
      {
        id: "cls-done",
        type: "button",
        text: "🛡️ Safely Revoke Session & Logout",
        x: 8,
        y: 77,
        w: 84,
        h: 9,
        bgColor: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md border-0",
        textColor: "text-white font-bold",
        targetScreenId: "login-screen-form",
        transition: "slide-right"
      },
      {
        id: "cls-footer",
        type: "text",
        text: "Session will automatically lock in 14 minutes due to safety policy.",
        x: 10,
        y: 89,
        w: 80,
        h: 6,
        bgColor: "bg-transparent",
        textColor: "text-slate-500 font-sans text-center text-xs",
        targetScreenId: "",
        transition: "none",
        fontSize: "sm"
      }
    ]
  };

  return {
    id: protoId,
    title: "Secure Gate Login Flow",
    description: "An incredibly secure corporate onboarding pattern. Fully interactive sequence supporting main login card, forgotten credential challenge, pinpoint verification alerts, and a safe decrypted success console.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startScreenId: "login-screen-form",
    screens: [screenForm, screenForgot, screenVerify, screenSuccess],
    tasks: [
      {
        id: "task-secure-login-1",
        instruction: "Navigate recovery mode: trigger forgot credentials path, enter verification sequence, verify PIN, and confirm successfully loaded admin dashboard console.",
        targetScreenId: "login-screen-success",
        timeLimitSec: 45
      }
    ]
  };
}
