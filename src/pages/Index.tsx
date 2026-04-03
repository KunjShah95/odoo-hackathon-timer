import { useState } from "react";
import TimeSetupForm from "@/components/TimeSetupForm";
import CountdownTimer from "@/components/CountdownTimer";

const Index = () => {
  const [times, setTimes] = useState<{ start: Date; end: Date } | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Live Event
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-primary glow-text">Odoo</span>
            <span className="text-muted-foreground mx-2">×</span>
            <span className="text-accent">Indus</span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground font-light">
            Hackathon Countdown
          </p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Set the start and end times to begin the countdown
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
      </div>
    </div>
  );
};

export default Index;
