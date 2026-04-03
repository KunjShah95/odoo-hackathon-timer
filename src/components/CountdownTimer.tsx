import { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  startTime: Date;
  endTime: Date;
  onReset?: () => void;
  isPaused?: boolean;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

type Phase = "waiting" | "running" | "ended";

const CountdownTimer = ({ startTime, endTime, onReset, isPaused = false }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [phase, setPhase] = useState<Phase>("waiting");
  const [progress, setProgress] = useState(0);
  const [isLastTenMinutes, setIsLastTenMinutes] = useState(false);

  const calculateTime = useCallback(() => {
    const now = new Date().getTime();
    const start = startTime.getTime();
    const end = endTime.getTime();

    if (now < start) {
      const diff = start - now;
      setPhase("waiting");
      setProgress(0);
      setIsLastTenMinutes(false);
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    }

    if (now >= end) {
      setPhase("ended");
      setProgress(100);
      setIsLastTenMinutes(false);
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const diff = end - now;
    const total = end - start;
    const elapsed = now - start;
    setPhase("running");
    setProgress(Math.min((elapsed / total) * 100, 100));
    setIsLastTenMinutes(diff <= 10 * 60 * 1000);

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }, [startTime, endTime]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const update = () => {
      const newTime = calculateTime();
      setTimeLeft(newTime);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [calculateTime, isPaused]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const phaseLabel =
    isPaused
      ? "Countdown Paused"
      : phase === "waiting"
        ? "Starts in"
        : phase === "running"
          ? isLastTenMinutes
            ? "Final 10 Minutes"
            : "Time Remaining"
          : "Website remains open";

  const digits = [
    { value: pad(timeLeft.hours), label: "Hours" },
    { value: pad(timeLeft.minutes), label: "Minutes" },
    { value: pad(timeLeft.seconds), label: "Seconds" },
  ];

  return (
    <div className={`flex flex-col items-center gap-6 sm:gap-8 ${phase === "running" && !isPaused ? "heartbeat" : ""}`}>
      {/* Phase Label */}
      <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-[0.2em] uppercase ${isLastTenMinutes ? "text-destructive" : "text-primary"} mb-4`}>
        {phaseLabel}
      </p>

      {/* Countdown Digits */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl">
        {digits.map((d, i) => (
          <div
            key={i}
            className="countdown-digit w-[clamp(4.75rem,18vw,11.25rem)] h-[clamp(6rem,23vw,13.75rem)] sm:w-[clamp(5.5rem,16vw,11.25rem)] sm:h-[clamp(7rem,22vw,13.75rem)] md:w-[clamp(6.5rem,14vw,11.5rem)] md:h-[clamp(8.5rem,18vw,14rem)]"
          >
            <span
              className={`text-[clamp(1.9rem,6vw,4.6rem)] sm:text-[clamp(2.4rem,5vw,4.8rem)] md:text-[clamp(3rem,4.5vw,5.4rem)] lg:text-[clamp(3.4rem,4vw,6rem)] font-bold font-mono ${isLastTenMinutes ? "text-destructive" : "text-primary"}`}
            >
              {d.value}
            </span>
            <span className="text-[clamp(0.55rem,1.6vw,1rem)] sm:text-[clamp(0.6rem,1.3vw,1rem)] md:text-[clamp(0.72rem,1.1vw,1.05rem)] lg:text-[clamp(0.8rem,1vw,1.1rem)] text-muted-foreground uppercase tracking-widest mt-2 md:mt-4">
              {d.label}
            </span>
          </div>
        ))}
      </div>

      {phase === "ended" ? (
        <div className="text-center space-y-2">
          <p className="text-xl sm:text-3xl font-bold text-primary">
            Hackathon ended
          </p>
          <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-[0.25em]">
            Website remains open
          </p>
        </div>
      ) : null}

      {/* Progress Bar */}
      {phase === "running" && (
        <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl space-y-3 mt-8">
          <div className="flex justify-between text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-wider font-semibold">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 sm:h-4 md:h-5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-linear"
              style={{
                width: `${progress}%`,
                background: isLastTenMinutes
                  ? `hsl(0 84% 60%)`
                  : `hsl(var(--primary))`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;

