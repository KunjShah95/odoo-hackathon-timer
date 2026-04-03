import { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  startTime: Date;
  endTime: Date;
  onReset: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type Phase = "waiting" | "running" | "ended";

const CountdownTimer = ({ startTime, endTime, onReset }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [phase, setPhase] = useState<Phase>("waiting");
  const [progress, setProgress] = useState(0);

  const calculateTime = useCallback(() => {
    const now = new Date().getTime();
    const start = startTime.getTime();
    const end = endTime.getTime();

    if (now < start) {
      const diff = start - now;
      setPhase("waiting");
      setProgress(0);
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    }

    if (now >= end) {
      setPhase("ended");
      setProgress(100);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const diff = end - now;
    const total = end - start;
    const elapsed = now - start;
    setPhase("running");
    setProgress(Math.min((elapsed / total) * 100, 100));

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }, [startTime, endTime]);

  useEffect(() => {
    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const phaseLabel =
    phase === "waiting"
      ? "⏳ Starts in"
      : phase === "running"
      ? "🔥 Hackathon Ends In"
      : "🎉 Hackathon Ended!";

  const phaseColor =
    phase === "waiting"
      ? "text-accent"
      : phase === "running"
      ? "text-primary"
      : "text-accent";

  const digits = [
    { value: pad(timeLeft.days), label: "Days" },
    { value: pad(timeLeft.hours), label: "Hours" },
    { value: pad(timeLeft.minutes), label: "Minutes" },
    { value: pad(timeLeft.seconds), label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in-up">
      {/* Phase Label */}
      <p className={`text-lg sm:text-xl font-semibold tracking-wide uppercase ${phaseColor}`}>
        {phaseLabel}
      </p>

      {/* Countdown Digits */}
      {phase !== "ended" ? (
        <div className="flex gap-3 sm:gap-5">
          {digits.map((d, i) => (
            <div key={i} className="countdown-digit w-[72px] h-[90px] sm:w-[100px] sm:h-[120px] md:w-[130px] md:h-[150px]">
              <span className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary glow-text font-mono">
                {d.value}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mt-1">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-2xl sm:text-4xl font-bold text-primary glow-text">
            Time's Up!
          </p>
          <p className="text-muted-foreground">
            Hope you built something amazing! 🚀
          </p>
        </div>
      )}

      {/* Progress Bar */}
      {phase === "running" && (
        <div className="w-full max-w-md space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="mt-4 px-6 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors text-sm"
      >
        Reset Timer
      </button>
    </div>
  );
};

export default CountdownTimer;
