import React from "react";
import { Prototype, Screen, WireframeElement, TestTask, TestSessionLog, FeedbackResponse } from "../types";
import { Play, RotateCcw, Check, Sparkles, Star, Award, ShieldAlert, ArrowLeft, Send, CheckCircle, Smile } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DeviceSimulatorProps {
  prototype: Prototype;
  onBackToBuilder: () => void;
  onAddTestLog: (log: TestSessionLog) => void;
  onAddFeedback: (fb: FeedbackResponse) => void;
}

export default function DeviceSimulator({
  prototype,
  onBackToBuilder,
  onAddTestLog,
  onAddFeedback
}: DeviceSimulatorProps) {
  // Navigation states
  const [currentScreenId, setCurrentScreenId] = React.useState<string>(prototype.startScreenId || (prototype.screens[0]?.id || ""));
  const [prevScreenId, setPrevScreenId] = React.useState<string | null>(null);
  const [activeTransition, setActiveTransition] = React.useState<string>("fade");

  // Participant Setup Mode
  const [testerName, setTesterName] = React.useState("");
  const [hasStartedSession, setHasStartedSession] = React.useState(false);

  // Active task helper
  const [activeTaskIndex, setActiveTaskIndex] = React.useState<number>(0);
  const activeTask = prototype.tasks[activeTaskIndex] || null;

  // Track session metrics
  const [timeTaken, setTimeTaken] = React.useState(0);
  const [totalClicks, setTotalClicks] = React.useState(0);
  const [totalErrors, setTotalErrors] = React.useState(0);
  const [isTaskFinished, setIsTaskFinished] = React.useState(false);
  const [isTaskFailed, setIsTaskFailed] = React.useState(false);

  // Survey Feedback inputs
  const [submittedFeedback, setSubmittedFeedback] = React.useState(false);
  const [overallRating, setOverallRating] = React.useState(5);
  const [ratingNavigation, setRatingNavigation] = React.useState(5);
  const [ratingClarity, setRatingClarity] = React.useState(5);
  const [ratingAppeal, setRatingAppeal] = React.useState(5);
  const [comments, setComments] = React.useState("");
  const [suggestions, setSuggestions] = React.useState("");

  const activeScreen = prototype.screens.find((s) => s.id === currentScreenId) || prototype.screens[0];

  // Live seconds ticking timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (hasStartedSession && !isTaskFinished && !isTaskFailed) {
      interval = setInterval(() => {
        setTimeTaken((prev) => {
          if (activeTask && prev >= activeTask.timeLimitSec) {
            setIsTaskFailed(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasStartedSession, isTaskFinished, isTaskFailed, activeTask]);

  // Check if target goal screen has been achieved successfully
  React.useEffect(() => {
    if (hasStartedSession && activeTask && currentScreenId === activeTask.targetScreenId && !isTaskFinished) {
      setIsTaskFinished(true);
    }
  }, [currentScreenId, activeTask, hasStartedSession, isTaskFinished]);

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testerName.trim()) return;
    setHasStartedSession(true);
    setCurrentScreenId(prototype.startScreenId);
    setPrevScreenId(null);
    setTimeTaken(0);
    setTotalClicks(0);
    setTotalErrors(0);
    setIsTaskFinished(false);
    setIsTaskFailed(false);
    setSubmittedFeedback(false);
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    if (!hasStartedSession || isTaskFinished || isTaskFailed) return;
    setTotalClicks((prev) => prev + 1);

    // If an element click matches a navigation target, trigger change
    // If they clicked on static areas, register error
    setTotalErrors((prev) => prev + 1);
  };

  const executeNavigation = (el: WireframeElement) => {
    if (!el.targetScreenId) return;
    
    // Deduct one error since it was a successful click action!
    setTotalErrors((prev) => Math.max(0, prev - 1));

    setActiveTransition(el.transition || "fade");
    setPrevScreenId(currentScreenId);
    setCurrentScreenId(el.targetScreenId);
  };

  const handleResetSession = () => {
    setCurrentScreenId(prototype.startScreenId);
    setPrevScreenId(null);
    setTimeTaken(0);
    setTotalClicks(0);
    setTotalErrors(0);
    setIsTaskFinished(false);
    setIsTaskFailed(false);
    setSubmittedFeedback(false);
  };

  const submitFeedbackScore = async () => {
    const feedbackData: FeedbackResponse = {
      id: `fb-${Math.random().toString(36).substr(2, 9)}`,
      prototypeId: prototype.id,
      rating: overallRating,
      ratings: {
        navigation: ratingNavigation,
        clarity: ratingClarity,
        appeal: ratingAppeal
      },
      reviewerName: testerName || "Anonymous Participant",
      reviewerRole: "tester",
      comments: comments || "Task completed successfully. Screens styled cleanly.",
      suggestions,
      timestamp: new Date().toISOString()
    };

    const sessionLog: TestSessionLog = {
      id: `log-${Math.random().toString(36).substr(2, 9)}`,
      prototypeId: prototype.id,
      participantName: testerName || "Anonymous",
      taskId: activeTask ? activeTask.id : "sandbox-task",
      taskInstruction: activeTask ? activeTask.instruction : "Sandbox Exploring",
      timeTakenSec: timeTaken,
      clicks: totalClicks,
      errors: totalErrors,
      success: isTaskFinished && !isTaskFailed,
      timestamp: new Date().toISOString()
    };

    // Callback saves to server
    onAddFeedback(feedbackData);
    onAddTestLog(sessionLog);

    setSubmittedFeedback(true);
  };

  // Motion physics configuration inside phone view
  const getVariants = () => {
    switch (activeTransition) {
      case "slide-left":
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 }
        };
      case "slide-right":
        return {
          initial: { x: -300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 300, opacity: 0 }
        };
      case "zoom":
        return {
          initial: { scale: 0.85, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.1, opacity: 0 }
        };
      case "fade":
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  const transitionSettings = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6" id="simulator-container-root">
      
      {/* Header controls */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200" id="simulator-header-bar">
        <button
          onClick={onBackToBuilder}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold flex items-center gap-1.5 cursor-pointer border"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back Layout Canvas Builder
        </button>
        <span className="font-mono text-xs text-slate-400">⚡ MULTI-SCREEN GESTURE SOUND SIMULATOR</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" id="simulation-playground-grid">
        
        {/* CHRONOMETER & PARTICIPATION TASKS STREAM (LEFT) */}
        <div className="space-y-6 lg:col-span-1" id="tester-instructions-left">
          
          {/* Main prompt step or setup */}
          {!hasStartedSession ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <span className="p-3 bg-indigo-50 text-indigo-650 rounded-xl inline-block">
                <Smile className="w-6 h-6 animate-pulse" />
              </span>
              <h3 className="text-lg font-sans font-medium text-slate-950">Participate Usability Test</h3>
              <p className="text-xs text-slate-500 line-clamp-4 lh-relaxed">
                Thank you for acting as a Test Participant today! We will track your interactive accuracy, time offsets and navigation loops to validate design quality. Ready to make design decisions?
              </p>

              <form onSubmit={handleStartSession} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={testerName}
                    onChange={(e) => setTesterName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-203 rounded-lg px-3 py-2 text-sm text-slate-905 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!testerName.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-sm cursor-pointer shadow-xs"
                >
                  Mount Device & Start Usability Review
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Active task instruction */}
              <div className="bg-white border border-slate-205 rounded-2xl p-5 shadow-xs relative">
                <span className="text-xs font-mono text-slate-400 block tracking-widest uppercase mb-2">
                  🛡️ Active Test Prompt
                </span>
                
                {activeTask ? (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-900 lh-relaxed font-sans bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                      &ldquo;{activeTask.instruction}&rdquo;
                    </p>
                    
                    {/* Time limit metrics gauge */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs text-slate-500">
                        <span>Timer offset:</span>
                        <span className={`${timeTaken > activeTask.timeLimitSec - 10 ? "text-rose-500 font-bold animate-pulse" : ""}`}>
                          {timeTaken}s / {activeTask.timeLimitSec}s
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full opacity-90 transition-all duration-300 ${timeTaken > activeTask.timeLimitSec - 10 ? "bg-red-500" : "bg-indigo-600"}`}
                          style={{ width: `${Math.min(100, (timeTaken / activeTask.timeLimitSec) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No testing guidelines designed yet. You are currently in Free Sandbox Testing mode!</p>
                )}

                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 mt-4 text-center font-mono text-[11px]">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="block text-slate-400 uppercase text-[9px] font-bold">Clicks</span>
                    <span className="text-sm font-bold text-slate-800">{totalClicks}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="block text-slate-400 uppercase text-[9px] font-bold">Misclicks</span>
                    <span className="text-sm font-bold text-yellow-600">{totalErrors}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="block text-slate-400 uppercase text-[9px] font-bold">Screen ID</span>
                    <span className="text-sm font-bold text-indigo-505 truncate block max-w-[64px]">{currentScreenId}</span>
                  </div>
                </div>

                <button
                  onClick={handleResetSession}
                  className="w-full mt-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-650 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Re-start Session / Reset Layout
                </button>
              </div>

              {/* Tasks selectors if multiple exist */}
              {prototype.tasks.length > 1 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-mono text-slate-400 block uppercase mb-3">Available Goals ({prototype.tasks.length})</span>
                  <div className="space-y-2">
                    {prototype.tasks.map((task, i) => (
                      <button
                        key={task.id}
                        onClick={() => {
                          setActiveTaskIndex(i);
                          handleResetSession();
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${activeTaskIndex === i ? "bg-indigo-50 border-indigo-200 text-indigo-950 font-semibold" : "bg-white border-slate-100 hover:bg-slate-50 text-slate-705"}`}
                      >
                        Goal {i+1}: {task.instruction.substr(0, 48)}...
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOCK DEVICE PHONE SIMULATOR (MIDDLE) */}
        <div className="lg:col-span-1 flex justify-center" id="tester-emulator-center">
          <div
            id="simulation-physical-mockup"
            className="w-full max-w-[360px] aspect-[9/16] bg-slate-100 rounded-[40px] border-[12px] border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-start"
          >
            {/* Front speaker notches and hardware details */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
              <div className="w-12 h-1.5 bg-slate-850 rounded-full"></div>
            </div>

            {/* Live screen frame overlay */}
            <div
              onClick={handleScreenClick}
              className="w-full h-full relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreenId}
                  variants={getVariants()}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transitionSettings}
                  className={`w-full h-full absolute inset-0 p-4 pt-7 flex flex-col justify-start overflow-y-auto ${activeScreen?.bgColor || "bg-slate-50"}`}
                >
                  {/* Elements display inside handset */}
                  {activeScreen?.elements.map((el) => {
                    const isInteractive = !!el.targetScreenId;

                    return (
                      <div
                        key={el.id}
                        onClick={(e) => {
                          if (isInteractive) {
                            e.stopPropagation(); // Stop general click misclick registration!
                            setTotalClicks((prev) => prev + 1); // Record standard click as well
                            executeNavigation(el);
                          }
                        }}
                        style={{
                          position: "absolute",
                          left: `${el.x}%`,
                          top: `${el.y}%`,
                          width: `${el.w}%`,
                          height: `${el.h}%`,
                          cursor: isInteractive ? "pointer" : "default"
                        }}
                        className={`rounded-md p-1 flex items-center justify-center text-xs text-center border relative transition-all selection:bg-transparent
                          ${el.bgColor}
                          ${el.textColor}
                          ${el.type === "hotspot" ? "hover:bg-indigo-400/25 border-dashed border-indigo-405 opacity-0 hover:opacity-100 text-transparent" : "border-transparent shadow-xs"}
                          ${isInteractive && el.type !== "hotspot" ? "hover:scale-[1.02] active:scale-95 duration-75 text-medium cursor-pointer" : ""}
                        `}
                      >
                        <span className="truncate w-full px-1">
                          {el.type === "input" ? (
                            <input
                              type={el.placeholder?.toLowerCase().includes("password") || el.placeholder === "••••••••••••" ? "password" : "text"}
                              disabled={!hasStartedSession || isTaskFinished}
                              placeholder={el.placeholder || "Enter details..."}
                              className="w-full text-center bg-transparent border-none outline-hidden focus:outline-hidden selection:bg-indigo-200"
                              onClick={(evt) => evt.stopPropagation()}
                            />
                          ) : el.text}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hardware virtual trigger bar */}
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-slate-900/40 rounded-full z-20"></div>
          </div>
        </div>

        {/* FEEDBACK INTAKE & OUTRAGE POPUPS (RIGHT) */}
        <div className="lg:col-span-1 space-y-4" id="tester-feedback-right">
          
          {/* Failed Timer Session Box */}
          {hasStartedSession && isTaskFailed && (
            <div className="bg-rose-50 border border-slate-205 rounded-xl p-5 shadow-md flex items-start gap-4 animate-fade-in">
              <ShieldAlert className="w-8 h-8 text-rose-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-rose-950 text-sm">Session Timeout!</h4>
                <p className="text-xs text-rose-800 mt-1">
                  You exceeded the designed task limit threshold ({activeTask?.timeLimitSec} seconds) without reaching the completion target. Reset layout to attempt again!
                </p>
                <button
                  onClick={handleResetSession}
                  className="mt-3 inline-block bg-rose-600 text-white text-xs font-semibold py-1 px-3 rounded hover:bg-rose-700 transition"
                >
                  Restart Simulation
                </button>
              </div>
            </div>
          )}

          {/* SUCCESS SURVEY SURGE BOX */}
          {hasStartedSession && isTaskFinished && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-lg space-y-4 animate-fade-in" id="success-survey-card">
              <div className="flex gap-3 items-center">
                <span className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-semibold text-emerald-950 text-sm font-sans">Task Goal Achieved!</h4>
                  <p className="text-xs text-emerald-800">Completed in {timeTaken} seconds with {totalClicks} clicks!</p>
                </div>
              </div>

              {!submittedFeedback ? (
                <div className="space-y-4 pt-3 border-t border-emerald-200 text-xs">
                  <p className="text-emerald-805">
                    Excellent work! Please supply your aesthetic reviews to help our design reviewers prioritize improvements:
                  </p>

                  <div className="space-y-2.5">
                    {/* Core Ratings */}
                    <div>
                      <span className="block font-medium text-emerald-900 mb-1">Overall Satisfaction rating:</span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setOverallRating(val)}
                            className={`p-1.5 border rounded-md cursor-pointer font-bold ${overallRating === val ? "bg-emerald-600 text-white" : "bg-white text-slate-700 hover:bg-emerald-100/50"}`}
                          >
                            {val} ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <span className="block text-[10px] text-slate-650 mb-0.5">Navigation Flow</span>
                        <select
                          value={ratingNavigation}
                          onChange={(e) => setRatingNavigation(parseInt(e.target.value))}
                          className="w-full bg-white border border-slate-205 p-1 rounded rounded-md"
                        >
                          <option value="5">5 Excellent</option>
                          <option value="4">4 Good</option>
                          <option value="3">3 Fair</option>
                          <option value="2">2 Poor</option>
                          <option value="1">1 Terrible</option>
                        </select>
                      </div>

                      <div>
                        <span className="block text-[10px] text-slate-650 mb-0.5">Clarity</span>
                        <select
                          value={ratingClarity}
                          onChange={(e) => setRatingClarity(parseInt(e.target.value))}
                          className="w-full bg-white border border-slate-205 p-1 rounded rounded-md"
                        >
                          <option value="5">5 Excellent</option>
                          <option value="4">4 Good</option>
                          <option value="3">3 Fair</option>
                          <option value="2">2 Poor</option>
                          <option value="1">1 Terrible</option>
                        </select>
                      </div>

                      <div>
                        <span className="block text-[10px] text-slate-650 mb-0.5">Visual Appeal</span>
                        <select
                          value={ratingAppeal}
                          onChange={(e) => setRatingAppeal(parseInt(e.target.value))}
                          className="w-full bg-white border border-slate-205 p-1 rounded rounded-md"
                        >
                          <option value="5">5 Excellent</option>
                          <option value="4">4 Good</option>
                          <option value="3">3 Fair</option>
                          <option value="2">2 Poor</option>
                          <option value="1">1 Terrible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className="block font-medium text-emerald-900 mb-0.5">Comments & Review</span>
                      <textarea
                        rows={2}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="The transitions were highly responsive..."
                        className="w-full bg-white border border-slate-205 p-2 rounded rounded-md text-xs placeholder:text-slate-350"
                      />
                    </div>

                    <div>
                      <span className="block font-medium text-emerald-900 mb-0.5">Actionable design suggestions</span>
                      <input
                        type="text"
                        value={suggestions}
                        onChange={(e) => setSuggestions(e.target.value)}
                        placeholder="Highlight the primary search box louder"
                        className="w-full bg-white border border-slate-205 p-2 rounded rounded-md text-xs placeholder:text-slate-350"
                      />
                    </div>
                  </div>

                  <button
                    onClick={submitFeedbackScore}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" /> Publish Review & metrics logs
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 pt-4 border-t border-emerald-250 animate-fade-in space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-emerald-950 font-bold text-sm">Review Saved Successfully!</p>
                  <p className="text-xs text-emerald-805 mt-1">
                    Your usability session analytics have been registered securely inside the active reports database folder.
                  </p>
                  <button
                    onClick={onBackToBuilder}
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-1.5 px-4 rounded-lg"
                  >
                    Return layout canvas
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
