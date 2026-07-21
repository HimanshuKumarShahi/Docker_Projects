"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Shield, Zap, Sparkles } from "lucide-react";

// Feature structure type
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function AceternityStyleHome() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-slate-200 antialiased selection:bg-indigo-500/30 selection:text-white">
      
      {/* BACKGROUND ELEMENTS & EFFECTS */}
      {/* 1. Global Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      
      {/* 2. Top-Center Soft Radial Spotlight */}
      <div className="absolute top-[-10%] left-1/2 z-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[-5%] left-1/2 z-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      {/* STICKY BLURRED NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-lg font-bold tracking-wider text-white">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            NEXUS.<span className="text-indigo-400">AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
          </nav>
          <div>
            <button className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none">
              <span className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#6366f1_50%,#a855f7_100%)] animate-[spin_3s_linear_infinite]" />
              <div className="relative px-4 py-2 bg-black rounded-full text-xs sm:text-sm font-medium text-white transition duration-200 group-hover:bg-slate-900">
                Launch App
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-20 text-center sm:px-6 lg:px-8 lg:pt-32">
        {/* Animated Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur-sm mb-6"
        >
          <Sparkles className="h-3 w-3 text-indigo-400" />
          Introducing Version 4.0 Engine
        </motion.div>

        {/* Aceternity Style Bold Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500"
        >
          Automate your workflows with absolute certainty.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg"
        >
          Deploy advanced neural frameworks that optimize, fix, and scale your application instances autonomously. Zero config. Infinite throughput.
        </motion.p>

        {/* Dynamic CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-slate-200">
            Get Started 
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="rounded-xl border border-white/[0.1] bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.06] hover:border-white/[0.2] backdrop-blur-sm">
            Book Demo
          </button>
        </motion.div>
      </section>

      {/* FEATURES SECTION WITH GLOW CARDS */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-white/[0.05]">
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Engineered for high performance
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            Eliminate traditional engineering friction lines entirely.
          </p>
        </div>

        {/* Glowing Feature Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-amber-400" />}
            title="Instant Compute"
            description="Parallel processes run synchronously worldwide at lower edge latency frames."
          />
          <FeatureCard
            icon={<Bot className="h-6 w-6 text-indigo-400" />}
            title="Predictive AI Models"
            description="Self-healing loops automatically intercept code degradation vulnerabilities."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-emerald-400" />}
            title="Immutable Sandbox"
            description="Military-grade kernel insulation safeguards system threads unconditionally."
          />
        </div>
      </section>

      {/* FUTURISTIC FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.05] bg-black py-8 text-center text-xs text-slate-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} NEXUS AI Systems. Inspired by Aceternity.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition">Terms</a>
            <a href="#" className="hover:text-slate-400 transition">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Aceternity-Style Card Component
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="relative group overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-8 backdrop-blur-xl"
    >
      {/* Hover Card Glow Boundary Effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10">
        {/* Icon Frame Box */}
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] bg-black/50 shadow-inner">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-white tracking-wide">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
