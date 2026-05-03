/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Compass, Zap, MapPin, Radio, ChevronRight, FileText, X, Terminal } from "lucide-react";

// Typewriter effect component
const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

// Particle component for floating dust/snow
const Particle = ({ id }: { id: number }) => {
  const size = Math.random() * 2 + 1;
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;
  const duration = Math.random() * 10 + 10;
  const delay = Math.random() * 5;

  return (
    <motion.div
      key={id}
      className="absolute rounded-full bg-white/20 blur-[1px] pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        x: [0, Math.random() * 100 - 50, 0],
        y: [0, Math.random() * 100 - 50, 0],
        opacity: [0, 0.4, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
};

// Twinkling Star component
const Star = ({ id }: { id: number }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 1.5;
  const duration = Math.random() * 3 + 2;

  return (
    <motion.div
      key={id}
      className="absolute bg-white rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        opacity: [0.1, 0.8, 0.1],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [hideUI, setHideUI] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Create stars and particles arrays
  const [stars] = useState(() => Array.from({ length: 70 }, (_, i) => i));
  const [particles] = useState(() => Array.from({ length: 40 }, (_, i) => i));

  const storySnippet = "在猎户座边缘的虚无之中，这座巨石（The Monolith）矗立了亿万年。它不仅是地理的标志，更是时间的墓碑。宇航员凯恩站在冻结的冰原上，呼吸着系统中循环的稀薄氧气，感受着那种超越人类理解的寂静。这里没有风，只有星辰的低语。";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-space-black overflow-hidden flex items-center justify-center font-sans selection:bg-white/30"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-nebula-purple/30 to-space-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,32,122,0.2)_0%,transparent_70%)]" />
        {stars.map((id) => (
          <Star key={id} id={id} />
        ))}
      </div>

      {/* The Hero Image Container - Animated Zoom */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
        transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[90vw] lg:w-[85vw] h-[80vh] overflow-hidden rounded-2xl shadow-2xl border border-white/5 group"
      >
        {/* The Image */}
        <motion.div
          animate={{
            scale: hideUI ? [1.1, 1.15] : [1, 1.08],
            rotate: [0, 0.5, -0.5, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2400"
            alt="Cinematic Space Odyssey"
            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] brightness-[0.75] transition-all duration-1000 group-hover:brightness-[0.85]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Particles Overlay */}
        <div className="absolute inset-0 z-20 overflow-hidden mix-blend-screen">
          {particles.map((id) => (
            <Particle key={id} id={id} />
          ))}
        </div>

        {/* HUD Scanlines */}
        <div className="absolute inset-0 z-25 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

        {/* UI HUD Elements */}
        {!hideUI && (
          <div className="absolute inset-x-0 bottom-0 z-50 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1 h-3 bg-white/40"
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/50">
                  Atmospheric Reading: Stable / Oxygen: 14%
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif italic mb-4 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Monolith <span className="text-white/30 not-italic font-sans font-light">Odyssey</span>
              </h1>
              
              <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
                <div className="flex items-center gap-2 group cursor-crosshair pointer-events-auto">
                  <Compass className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  <span className="text-[11px] font-mono tracking-wider">SEC: 24.120 / LON: 156.401</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-white/40 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-wider text-white/40 uppercase">Sub-Space Signal Detected</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Menu Buttons */}
        <div className="absolute top-8 right-8 z-50 flex gap-4 pointer-events-auto items-center">
          <button 
            onClick={() => setHideUI(!hideUI)}
            className={`glass px-4 py-2 transition-all duration-500 flex items-center gap-2 hover:bg-white/10 ${hideUI ? 'bg-white/40' : ''}`}
            title="Hide UI for recording"
          >
            <Zap className={`w-4 h-4 ${hideUI ? 'text-yellow-400' : ''}`} />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{hideUI ? 'Show UI' : 'Hide UI (Record mode)'}</span>
          </button>
          
          <button 
            onClick={toggleFullscreen}
            className="glass px-4 py-2 transition-all duration-500 flex items-center gap-2 hover:bg-white/10"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Fullscreen</span>
          </button>

          {!hideUI && (
            <button 
              onClick={() => setShowLog(!showLog)}
              className={`glass px-4 py-2 transition-all duration-500 flex items-center gap-2 hover:bg-white/10 ${showLog ? 'bg-white/20' : ''}`}
            >
              <FileText className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{showLog ? 'Close Log' : 'Story Data'}</span>
            </button>
          )}
        </div>

        {/* Story Log Panel */}
        <AnimatePresence>
          {showLog && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="absolute top-24 right-8 bottom-24 w-80 glass z-[60] p-6 flex flex-col pointer-events-auto overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white/60">
                  <Terminal className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Data Log #A-104</span>
                </div>
                <button onClick={() => setShowLog(false)} className="text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 font-mono text-xs leading-relaxed text-white/80 overflow-y-auto custom-scrollbar italic">
                <Typewriter text={storySnippet} delay={40} />
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-white/60 ml-1 translate-y-1"
                />
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-[9px] text-white/30 mb-2 uppercase tracking-widest">System Status</div>
                <div className="flex gap-1 h-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className={`flex-1 ${Math.random() > 0.8 ? 'bg-red-500/40' : 'bg-white/20'}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative HUD Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 m-8" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20 m-8" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20 m-8" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 m-8" />
      </motion.div>

      {/* Floating CTA Overlay */}
      <AnimatePresence>
        {isLoaded && !showLog && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-12 z-50 flex flex-col items-center gap-2 group pointer-events-auto"
          >
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-space-black transition-all duration-500 shadow-lg">
              <ChevronRight className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
              Explore Deeper
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ambient Lighting Pulse */}
      <motion.div
        animate={{
          left: ["-20%", "120%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 bottom-0 w-[60%] skew-x-12 bg-gradient-to-r from-transparent via-white/3 to-transparent pointer-events-none z-50"
      />
    </div>
  );
}


