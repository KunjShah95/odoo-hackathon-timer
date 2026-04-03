import { useState, useEffect, useCallback, useRef } from "react";

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
  const [tickKey, setTickKey] = useState(0);
  const prevSeconds = useRef(-1);

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
    const update = () => {
      const newTime = calculateTime();
      if (newTime.seconds !== prevSeconds.current) {
        setTickKey((k) => k + 1);
        prevSeconds.current = newTime.seconds;
      }
      setTimeLeft(newTime);
    };
    update();
    const interval = setInterval(update, 1000);
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
    <div className="flex flex-col items-center gap-8 animate-scale-in">
      {/* Phase Label */}
      <p className={`text-lg sm:text-xl font-semibold tracking-wide uppercase ${phaseColor} animate-fade-in-down`}>
        {phaseLabel}
      </p>

      {/* Countdown Digits */}
      {phase !== "ended" ? (
        <div className="flex gap-3 sm:gap-5">
          {digits.map((d, i) => (
            <div
              key={i}
              className="countdown-digit w-[72px] h-[90px] sm:w-[100px] sm:h-[120px] md:w-[130px] md:h-[150px] animate-fade-in-up opacity-0 transition-transform duration-200 hover:scale-105"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span
                key={`${i}-${tickKey}`}
                className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary glow-text font-mono animate-digit-tick"
              >
                {d.value}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mt-1">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center space-y-4 animate-scale-in">
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
        <div className="w-full max-w-md space-y-2 animate-fade-in opacity-0 [animation-delay:0.5s]">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-linear relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="mt-4 px-6 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-all duration-300 text-sm hover:scale-105 active:scale-95 animate-fade-in opacity-0 [animation-delay:0.6s]"
      >
        Reset Timer
      </button>
    </div>
  );
};

export default CountdownTimer;
