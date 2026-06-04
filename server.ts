import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Dedicated directories for persistent JSON data
const DATA_DIR = path.join(__dirname, "data");
const PROTOTYPES_FILE = path.join(DATA_DIR, "prototypes.json");
const TEST_LOGS_FILE = path.join(DATA_DIR, "test_logs.json");
const FEEDBACK_FILE = path.join(DATA_DIR, "feedback.json");

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seeding logic
const SEED_PROTOTYPES = [
  {
    id: "seed-ecommerce",
    title: "EcoShop Delivery Prototype",
    description: "An elegant, green-themed mobile app mock-up featuring grocery browsing, cart actions, and checkout details.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startScreenId: "screen-eco-browse",
    screens: [
      {
        id: "screen-eco-browse",
        name: "Browse Store",
        bgColor: "bg-emerald-50",
        elements: [
          {
            id: "eco-header",
            type: "card",
            text: "",
            x: 0,
            y: 0,
            w: 100,
            h: 12,
            bgColor: "bg-emerald-600",
            textColor: "text-white",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "eco-title",
            type: "heading",
            text: "EcoShop Groceries 🌿",
            x: 6,
            y: 3,
            w: 80,
            h: 6,
            bgColor: "bg-transparent",
            textColor: "text-white",
            targetScreenId: "",
            transition: "none",
            fontSize: "lg"
          },
          {
            id: "eco-hero-card",
            type: "card",
            text: "",
            x: 6,
            y: 16,
            w: 88,
            h: 22,
            bgColor: "bg-white border border-emerald-100 shadow-xs",
            textColor: "text-gray-900",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "eco-hero-title",
            type: "heading",
            text: "Organic Fresh Strawberries",
            x: 10,
            y: 19,
            w: 80,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-emerald-800",
            targetScreenId: "",
            transition: "none",
            fontSize: "md"
          },
          {
            id: "eco-hero-text",
            type: "text",
            text: "Picked fresh daily. 30% Off this week!",
            x: 10,
            y: 24,
            w: 80,
            h: 5,
            bgColor: "bg-transparent",
            textColor: "text-gray-600",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "eco-add-btn",
            type: "button",
            text: "Add to Basket",
            x: 10,
            y: 30,
            w: 36,
            h: 6,
            bgColor: "bg-emerald-600 hover:bg-emerald-700",
            textColor: "text-white",
            targetScreenId: "screen-eco-cart",
            transition: "slide-left"
          },
          {
            id: "eco-search",
            type: "input",
            text: "",
            x: 6,
            y: 41,
            w: 88,
            h: 7,
            bgColor: "bg-white border border-gray-200",
            textColor: "text-gray-700",
            targetScreenId: "",
            transition: "none",
            placeholder: "Search apples, kale, organic milk..."
          },
          {
            id: "eco-item1",
            type: "card",
            text: "",
            x: 6,
            y: 50,
            w: 42,
            h: 30,
            bgColor: "bg-white border border-gray-100",
            textColor: "text-gray-900",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "eco-item1-title",
            type: "heading",
            text: "Avocado Pack (3x)",
            x: 10,
            y: 52,
            w: 34,
            h: 5,
            bgColor: "bg-transparent",
            textColor: "text-gray-850",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "eco-item1-price",
            type: "text",
            text: "$4.99",
            x: 10,
            y: 58,
            w: 34,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-emerald-600 font-bold",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "eco-item1-btn",
            type: "button",
            text: "View Item",
            x: 10,
            y: 64,
            w: 34,
            h: 6,
            bgColor: "bg-emerald-100 hover:bg-emerald-200",
            textColor: "text-emerald-800",
            targetScreenId: "screen-eco-cart",
            transition: "zoom"
          },
          {
            id: "eco-item2",
            type: "card",
            text: "",
            x: 52,
            y: 50,
            w: 42,
            h: 30,
            bgColor: "bg-white border border-gray-100",
            textColor: "text-gray-900",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "eco-item2-title",
            type: "heading",
            text: "Organic Sprouts",
            x: 56,
            y: 52,
            w: 34,
            h: 5,
            bgColor: "bg-transparent",
            textColor: "text-gray-850",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "eco-item2-price",
            type: "text",
            text: "$2.49",
            x: 56,
            y: 58,
            w: 34,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-emerald-600 font-bold",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "eco-item2-btn",
            type: "button",
            text: "View Item",
            x: 56,
            y: 64,
            w: 34,
            h: 6,
            bgColor: "bg-emerald-100 hover:bg-emerald-200",
            textColor: "text-emerald-800",
            targetScreenId: "screen-eco-cart",
            transition: "zoom"
          },
          {
            id: "eco-nav-bar",
            type: "card",
            text: "",
            x: 0,
            y: 88,
            w: 100,
            h: 12,
            bgColor: "bg-white border-t border-gray-200",
            textColor: "text-gray-900",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "eco-nav-browse",
            type: "button",
            text: "🌿 Shop",
            x: 10,
            y: 91,
            w: 36,
            h: 6,
            bgColor: "bg-emerald-600",
            textColor: "text-white",
            targetScreenId: "screen-eco-browse",
            transition: "none"
          },
          {
            id: "eco-nav-basket",
            type: "button",
            text: "🛒 Basket",
            x: 54,
            y: 91,
            w: 36,
            h: 6,
            bgColor: "bg-gray-100 hover:bg-emerald-100",
            textColor: "text-gray-800",
            targetScreenId: "screen-eco-cart",
            transition: "fade"
          }
        ]
      },
      {
        id: "screen-eco-cart",
        name: "Eco Basket",
        bgColor: "bg-white",
        elements: [
          {
            id: "cart-header",
            type: "card",
            text: "",
            x: 0,
            y: 0,
            w: 100,
            h: 12,
            bgColor: "bg-emerald-600",
            textColor: "text-white",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "cart-heading",
            type: "heading",
            text: "Your Fresh Basket",
            x: 6,
            y: 3,
            w: 80,
            h: 6,
            bgColor: "bg-transparent",
            textColor: "text-white",
            targetScreenId: "",
            transition: "none",
            fontSize: "lg"
          },
          {
            id: "cart-row1",
            type: "card",
            text: "",
            x: 6,
            y: 16,
            w: 88,
            h: 12,
            bgColor: "bg-emerald-50 border border-emerald-100",
            textColor: "text-emerald-950",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "cart-item1-lbl",
            type: "text",
            text: "Strawberries (Organic, 500g)",
            x: 10,
            y: 18,
            w: 60,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-gray-900 font-medium",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "cart-item1-pr",
            type: "text",
            text: "1x  $3.49",
            x: 10,
            y: 22,
            w: 40,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-emerald-700",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "cart-row2",
            type: "card",
            text: "",
            x: 6,
            y: 30,
            w: 88,
            h: 12,
            bgColor: "bg-gray-50 border border-gray-100",
            textColor: "text-gray-900",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "cart-item2-lbl",
            type: "text",
            text: "Avocado Pack of 3",
            x: 10,
            y: 32,
            w: 60,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-gray-900 font-medium",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "cart-item2-pr",
            type: "text",
            text: "1x  $4.99",
            x: 10,
            y: 36,
            w: 40,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-emerald-700",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "cart-summary-box",
            type: "card",
            text: "",
            x: 6,
            y: 48,
            w: 88,
            h: 22,
            bgColor: "bg-emerald-50/50 border border-dashed border-emerald-200",
            textColor: "text-gray-800",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "summary-subt",
            type: "text",
            text: "Subtotal: $8.48",
            x: 12,
            y: 51,
            w: 70,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-gray-600",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "summary-delivery",
            type: "text",
            text: "Deilvery Fee: $2.50",
            x: 12,
            y: 55,
            w: 70,
            h: 4,
            bgColor: "bg-transparent",
            textColor: "text-gray-600",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "summary-total",
            type: "text",
            text: "Total Due: $10.98",
            x: 12,
            y: 61,
            w: 70,
            h: 5,
            bgColor: "bg-transparent",
            textColor: "text-emerald-900 font-black",
            targetScreenId: "",
            transition: "none",
            fontSize: "md"
          },
          {
            id: "cart-coupon",
            type: "input",
            text: "",
            x: 6,
            y: 72,
            w: 88,
            h: 7,
            bgColor: "bg-white border border-gray-200",
            textColor: "text-gray-700",
            targetScreenId: "",
            transition: "none",
            placeholder: "Promo code (e.g. ORGANIC_FAST)"
          },
          {
            id: "checkout-btn",
            type: "button",
            text: "Pay with Cards ($10.98)",
            x: 6,
            y: 81,
            w: 88,
            h: 8,
            bgColor: "bg-emerald-600 hover:bg-emerald-700",
            textColor: "text-white",
            targetScreenId: "screen-eco-success",
            transition: "zoom"
          },
          {
            id: "back-btn",
            type: "button",
            text: "← Back Shopping",
            x: 6,
            y: 91,
            w: 36,
            h: 6,
            bgColor: "bg-gray-100 hover:bg-gray-200",
            textColor: "text-gray-700",
            targetScreenId: "screen-eco-browse",
            transition: "slide-right"
          }
        ]
      },
      {
        id: "screen-eco-success",
        name: "Eco Success Checkout",
        bgColor: "bg-white",
        elements: [
          {
            id: "succ-card",
            type: "card",
            text: "",
            x: 8,
            y: 18,
            w: 84,
            h: 50,
            bgColor: "bg-emerald-50 border border-emerald-100 rounded-lg text-center shadow-lg",
            textColor: "text-emerald-950",
            targetScreenId: "",
            transition: "none"
          },
          {
            id: "succ-check",
            type: "heading",
            text: "✔",
            x: 12,
            y: 22,
            w: 76,
            h: 12,
            bgColor: "bg-transparent",
            textColor: "text-emerald-600 font-bold",
            targetScreenId: "",
            transition: "none",
            fontSize: "xl"
          },
          {
            id: "succ-title",
            type: "heading",
            text: "Order Confirmed!",
            x: 12,
            y: 36,
            w: 76,
            h: 6,
            bgColor: "bg-transparent",
            textColor: "text-emerald-900 font-extrabold",
            targetScreenId: "",
            transition: "none",
            fontSize: "lg"
          },
          {
            id: "succ-text",
            type: "text",
            text: "Your eco-friendly package is being prepared. ETA 35 minutes.",
            x: 14,
            y: 44,
            w: 72,
            h: 10,
            bgColor: "bg-transparent",
            textColor: "text-gray-600",
            targetScreenId: "",
            transition: "none",
            fontSize: "sm"
          },
          {
            id: "succ-done-btn",
            type: "button",
            text: "Back Shopping",
            x: 16,
            y: 56,
            w: 68,
            h: 8,
            bgColor: "bg-emerald-600 hover:bg-emerald-700",
            textColor: "text-white",
            targetScreenId: "screen-eco-browse",
            transition: "fade"
          }
        ]
      }
    ],
    tasks: [
      {
        id: "task-eco-1",
        instruction: "Add strawberries to basket, view your shopping cart, and complete payment to confirm the eco-order.",
        targetScreenId: "screen-eco-success",
        timeLimitSec: 45
      }
    ]
  },
  {
    id: "seed-pledge-onboarding",
    title: "Pledge App Onboarding",
    description: "An offline-first, high-fidelity mobile onboarding flow faithfully recreating the three critical setup screens: 'Big Goals', 'Big Consequences', and 'Massive Changes' in high-contrast styling.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startScreenId: "pledge-screen-1",
    screens: [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    tasks: [
      {
        id: "task-pledge-onboarding-1",
        instruction: "Navigate completely through the series of onboarding screens (Big Goals ➔ Big Consequences ➔ Massive Changes) and view the Campaign success panel.",
        targetScreenId: "pledge-screen-success",
        timeLimitSec: 45
      }
    ]
  },
  {
    id: "seed-secure-login",
    title: "Secure Gate Login Flow",
    description: "An incredibly secure corporate onboarding pattern. Fully interactive sequence supporting main login card, forgotten credential challenge, pinpoint verification alerts, and a safe decrypted success console.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startScreenId: "login-screen-form",
    screens: [
      {
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
      },
      {
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
      },
      {
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
            text: "Confirm PIN & Unlock Hub ✅",
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
      },
      {
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
      }
    ],
    tasks: [
      {
        id: "task-secure-login-1",
        instruction: "Navigate recovery mode: trigger forgot credentials path, enter verification sequence, verify PIN, and confirm successfully loaded admin dashboard console.",
        targetScreenId: "login-screen-success",
        timeLimitSec: 45
      }
    ]
  }
];

const loadJSON = (filePath: string, fallback: any) => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
};

const saveJSON = (filePath: string, data: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error saving ${filePath}:`, err);
  }
};

// Initialize server files
let prototypes = loadJSON(PROTOTYPES_FILE, SEED_PROTOTYPES);
let testLogs = loadJSON(TEST_LOGS_FILE, []);
let feedbackList = loadJSON(FEEDBACK_FILE, [
  {
    id: "fb-seed-1",
    prototypeId: "seed-ecommerce",
    rating: 5,
    ratings: { navigation: 5, clarity: 4, appeal: 5 },
    reviewerName: "Alex Mercer",
    reviewerRole: "tester",
    comments: "Navigating feels super green and organic! The transitions between pages are highly responsive.",
    suggestions: "I wish the promo-code box had an autocomplete or suggestion menu for active promo codes.",
    timestamp: new Date().toISOString()
  },
  {
    id: "fb-seed-2",
    prototypeId: "seed-ecommerce",
    rating: 3,
    ratings: { navigation: 2, clarity: 3, appeal: 4 },
    reviewerName: "Clarissa Finch",
    reviewerRole: "reviewer",
    comments: "Visuals are neat, but clicking Avocado view was jarring. Need clearer back button paths on checkout.",
    suggestions: "The payment path lacks details, and it's quite hard to exit checkout if you clicked it by mistake.",
    timestamp: new Date().toISOString()
  }
]);

// Write initial seed if fresh
if (!fs.existsSync(PROTOTYPES_FILE)) saveJSON(PROTOTYPES_FILE, prototypes);
if (!fs.existsSync(TEST_LOGS_FILE)) saveJSON(TEST_LOGS_FILE, testLogs);
if (!fs.existsSync(FEEDBACK_FILE)) saveJSON(FEEDBACK_FILE, feedbackList);

// PROTOTYPE ROUTES
app.get("/api/prototypes", (req, res) => {
  res.json(prototypes);
});

app.get("/api/prototypes/:id", (req, res) => {
  const p = prototypes.find((item: any) => item.id === req.params.id);
  if (p) {
    res.json(p);
  } else {
    res.status(404).json({ error: "Prototype not found" });
  }
});

app.post("/api/prototypes", (req, res) => {
  const incoming = req.body;
  if (!incoming.id) {
    incoming.id = `proto-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  const existingIdx = prototypes.findIndex((p: any) => p.id === incoming.id);
  if (existingIdx > -1) {
    prototypes[existingIdx] = {
      ...incoming,
      updatedAt: new Date().toISOString()
    };
  } else {
    incoming.createdAt = incoming.createdAt || new Date().toISOString();
    incoming.updatedAt = new Date().toISOString();
    prototypes.push(incoming);
  }

  saveJSON(PROTOTYPES_FILE, prototypes);
  res.json(incoming);
});

app.delete("/api/prototypes/:id", (req, res) => {
  prototypes = prototypes.filter((p: any) => p.id !== req.params.id);
  saveJSON(PROTOTYPES_FILE, prototypes);
  res.json({ success: true });
});

// TEST LOG ROUTES
app.get("/api/test-logs", (req, res) => {
  res.json(testLogs);
});

app.post("/api/test-logs", (req, res) => {
  const incoming = req.body;
  incoming.id = incoming.id || `log-${Math.random().toString(36).substr(2, 9)}`;
  incoming.timestamp = incoming.timestamp || new Date().toISOString();
  testLogs.push(incoming);
  saveJSON(TEST_LOGS_FILE, testLogs);
  res.json(incoming);
});

// FEEDBACK ROUTES
app.get("/api/feedbacks", (req, res) => {
  res.json(feedbackList);
});

app.post("/api/feedbacks", (req, res) => {
  const incoming = req.body;
  incoming.id = incoming.id || `fb-${Math.random().toString(36).substr(2, 9)}`;
  incoming.timestamp = incoming.timestamp || new Date().toISOString();
  feedbackList.push(incoming);
  saveJSON(FEEDBACK_FILE, feedbackList);
  res.json(incoming);
});

// GEMINI AI INTEGRATION
app.post("/api/ai-audit", async (req, res) => {
  const { prototype, screenId } = req.body;
  if (!prototype) {
    return res.status(400).json({ error: "Prototype data required for AI UX Audit." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined. Returning pre-fabricated simulation report.");
    // Return a beautiful dynamic mockup report if API Key is not set yet
    return res.json({
      accessibilityScore: 78,
      usabilityScore: 82,
      warnings: [
        "Contrast issues on button colors (white on light-emerald background)",
        "Navigation dead-end: The checkout modal has no close/back button.",
        "Input fields missing explicit label descriptions."
      ],
      contrastIssues: [
        { elementId: "eco-add-btn", elementName: "Add to Basket", issue: "The green text on a light background is 3.1:1, failing W3C WCAG AA guidelines.", severity: "medium" },
        { elementId: "eco-coupon", elementName: "Promo Code Input", issue: "Placeholder text has less than 4.5:1 color contrast rating.", severity: "low" }
      ],
      layoutRecommendations: [
        { issue: "The Back button size (36%) is tiny for thumb ranges.", fix: "Increase item touch widths to a minimum of 44% width or 48px heights on mobile bounds.", tailwindSuggestedClasses: "w-11/12 py-3 px-6 text-base font-semibold" },
        { issue: "Navigation flow feels unilateral because Eco Success checkout is locked.", fix: "Create an active reset operation or secondary loop home.", tailwindSuggestedClasses: "flex items-center justify-center space-x-2 border rounded-xl" }
      ],
      overallSummary: "This EcoShop prototype has beautiful typography and spacing. However, you can significantly improve the usability score by resolving touch targets on the back button and increasing the general contrast ratio on the interactive forms."
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Select screen specific reviews or entire prototype review
    const selectedScreen = screenId ? prototype.screens.find((s: any) => s.id === screenId) : null;
    const model = "gemini-3.5-flash";

    const promptText = `
You are a highly premium Google UX Designer and WCAG AAA Accessibility Auditor. Analyze the following interactive prototype structure and provide a meticulous critique.

PROTOTYPE DETAILS:
Title: ${prototype.title}
Description: ${prototype.description}
Current Interactive Screens:
${JSON.stringify(prototype.screens, null, 2)}
Interactive Usability Tasks assigned to testers:
${JSON.stringify(prototype.tasks, null, 2)}
Requested Screen Specific audit: ${selectedScreen ? selectedScreen.name : "Check entire prototype workflow"}

CRITIQUE PROTOCOLS:
1. Usability Heuristics: Analyze page flow. Look for "dead ends" (screens where no button triggers navigation, which frustrates participants).
2. Accessibility check (WCAG 2.1): Contrast issues based on background colors (e.g. green buttons, grey placeholders, text on cards).
3. Touch targets: Highlight any tiny buttons or coordinates that are close together (e.g. elements with small heights < 7% / widths < 20% on the simulator container).
4. Provide actionable improvements with matching Tailwind classes.

Return your response matching this exact system-defined JSON representation. Ensure it is strict JSON. Do not return markdown outside of the JSON schema, just the flat json matching the structure.
`;

    const response = await ai.models.generateContent({
      model: model,
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            accessibilityScore: {
              type: Type.INTEGER,
              description: "Overall Accessibility compliance score from 0 to 100"
            },
            usabilityScore: {
              type: Type.INTEGER,
              description: "Heuristic and layout Usability score from 0 to 100"
            },
            warnings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "High level caution and warning flags"
            },
            contrastIssues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  elementId: { type: Type.STRING },
                  elementName: { type: Type.STRING },
                  issue: { type: Type.STRING },
                  severity: { type: Type.STRING, description: "low, medium, or high" }
                },
                required: ["elementId", "elementName", "issue", "severity"]
              }
            },
            layoutRecommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  issue: { type: Type.STRING },
                  fix: { type: Type.STRING },
                  tailwindSuggestedClasses: { type: Type.STRING, description: "Tailwind CSS classes recommended to replace current style" }
                },
                required: ["issue", "fix", "tailwindSuggestedClasses"]
              }
            },
            overallSummary: {
              type: Type.STRING,
              description: "A motivating, helpful paragraph summarizing your expert UX analysis."
            }
          },
          required: [
            "accessibilityScore",
            "usabilityScore",
            "warnings",
            "contrastIssues",
            "layoutRecommendations",
            "overallSummary"
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text.trim());
    res.json(parsed);
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({
      error: "Failed to generate AI Audit. Check logs.",
      details: err.message
    });
  }
});

// Serve frontend assets
async function startServer() {
  // Setup Vite in Dev or static in Prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
