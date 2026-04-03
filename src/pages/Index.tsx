import { useState } from "react";
import TimeSetupForm from "@/components/TimeSetupForm";
import CountdownTimer from "@/components/CountdownTimer";
import Bubbles from "@/components/Bubbles";
import indusLogo from "@/assets/indus-logo.png";
import odooLogo from "@/assets/odoo-logo.png";
import hackathonBanner from "@/assets/hackathon-banner.jpg";

const Index = () => {
  const [times, setTimes] = useState<{ start: Date; end: Date } | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Bubbles Background */}
      <Bubbles />

      {/* Logos Header */}
      <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-20">
        <img
          src={odooLogo}
          alt="Odoo"
          className="h-10 sm:h-14 object-contain animate-slide-in-left"
        />
        <img
          src={indusLogo}
          alt="Indus University"
          className="h-16 sm:h-20 object-contain animate-slide-in-right"
        />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[hsl(270_50%_15%)] to-transparent opacity-60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[hsl(var(--countdown-accent)/0.08)] rounded-full blur-3xl animate-float [animation-delay:1.5s]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full mt-16">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in-down">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Live Event
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-primary glow-text">Odoo</span>
            <span className="text-muted-foreground mx-2">×</span>
            <span className="text-foreground">INDUS University</span>
          </h1>
          <p className="text-xl sm:text-2xl text-primary font-semibold">
            Hackathon 2026
          </p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            04-05 April, 2026 · Indus University
          </p>
        </div>

        {/* Form or Timer */}
        {!times ? (
          <TimeSetupForm onStart={(start, end) => setTimes({ start, end })} />
        ) : (
          <CountdownTimer
            startTime={times.start}
            endTime={times.end}
            onReset={() => setTimes(null)}
          />
        )}

        {/* Organised by */}
        <p className="text-sm text-muted-foreground mt-4 animate-fade-in [animation-delay:0.8s] opacity-0">
          Organised by the <span className="font-semibold text-foreground">CSE Department</span>
        </p>
      </div>
    </div>
  );
};

export default Index;