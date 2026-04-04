import { useCallback, useEffect, useMemo, useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import indusLogo from "@/assets/indus-logo.png";
import odooLogo from "@/assets/odoo-logo.png";

const Index = () => {
  const eventTimes = useMemo(() => {
    return {
      start: new Date(2026, 3, 4, 10, 0, 0),
      end: new Date(2026, 3, 5, 10, 0, 0),
    };
  }, []);

  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [countdownStartTime, setCountdownStartTime] = useState<Date | null>(null);
  const [countdownEndTime, setCountdownEndTime] = useState<Date | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isStarted) {
      return;
    }

    const timeoutMs = Math.max(0, eventTimes.start.getTime() - now);
    const timeoutId = window.setTimeout(() => {
      if (!isStarted) {
        handleStartClick();
      }
    }, timeoutMs);

    return () => window.clearTimeout(timeoutId);
  }, [eventTimes.start, isStarted, now]);

  const isStartButtonActive = now >= eventTimes.start.getTime();

  const handleStartClick = useCallback(() => {
    const start = new Date();
    const end = new Date(start.getTime() + 4 * 24 * 60 * 60 * 1000);

    setIsStarted(true);
    setIsPaused(false);
    setCountdownStartTime(start);
    setCountdownEndTime(end);
  }, []);

  return (
    <div className="min-h-screen bg-white px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 flex items-center justify-center relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(24,24,27,0.08),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(24,24,27,0.05),_transparent_30%)]" />

      <div className="relative z-10 w-full max-w-[min(100vw-0.75rem,1200px)]">
        <div className="breathing mx-auto mb-4 flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border border-zinc-200 bg-white/95 px-4 shadow-[0_12px_34px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:h-16 sm:gap-5 sm:px-6 lg:max-w-6xl xl:h-20 xl:px-8">
          <img
            src={odooLogo}
            alt="ODOO"
            className="h-8 w-auto object-contain scale-[1.12] origin-left sm:h-10 lg:h-12 xl:h-16"
          />
          <img
            src={indusLogo}
            alt="Indus University"
            className="h-8 w-auto object-contain scale-[1.02] origin-right sm:h-10 lg:h-12 xl:h-16"
          />
        </div>

        <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] xl:max-w-[min(100vw-0.75rem,1200px)] xl:h-[calc(100vh-8.75rem)] xl:min-h-0">
          <div className="breathing relative flex items-center justify-between gap-4 overflow-hidden border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
            <div className="countdown-sheen pointer-events-none absolute inset-y-0 left-[-35%] w-[38%] bg-gradient-to-r from-transparent via-white/14 to-transparent blur-xl" />
            <p className="countdown-label-pulse relative z-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5em] text-primary/80 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_16px_rgba(255,191,0,0.65)]" />
              Live Countdown
            </p>
          </div>

          <div className="px-4 py-8 text-center sm:px-6 sm:py-9 lg:px-10 lg:py-10 xl:flex xl:h-[calc(100%-3.25rem)] xl:flex-col xl:justify-between xl:py-8">
            <div className="space-y-3 sm:space-y-4 animate-fade-in-down">

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[3.7rem] font-black tracking-tight leading-none">
                <span className="text-primary glow-text">ODOO</span>

                <span className="text-white/40 mx-2 sm:mx-3">×</span>
                <span className="text-white">INDUS UNIVERSITY</span>
              </h1>
              <p className="text-lg sm:text-2xl lg:text-3xl xl:text-[2.15rem] text-white/90 font-bold tracking-tight">
                Hackathon 2026
              </p>
            </div>

            <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-7 xl:mt-8 xl:space-y-8">
              <CountdownTimer
                startTime={isStarted && countdownStartTime ? countdownStartTime : eventTimes.start}
                endTime={isStarted && countdownEndTime ? countdownEndTime : eventTimes.end}
                isPaused={isPaused && isStarted}
                countUpAfterEnd
              />

              {!isStarted ? (
                <div className="mx-auto flex max-w-xl flex-col items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-8 sm:px-10 sm:py-10">
                  <button
                    type="button"
                    onClick={handleStartClick}
                    disabled={!isStartButtonActive}
                    className={`rounded-full px-7 py-3 text-sm sm:text-base font-bold uppercase tracking-[0.25em] transition active:scale-[0.98] ${
                      isStartButtonActive
                        ? "bg-primary text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,191,0,0.35)]"
                        : "cursor-not-allowed border border-white/10 bg-white/5 text-white/45"
                    }`}
                  >
                    {isStartButtonActive ? "Start Website" : "Available at 9:55 AM"}
                  </button>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-white/55 text-center">
                    Auto-start begins exactly at 10:00 AM if the button is missed.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setIsPaused((value) => !value)}
                    className="min-w-44 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm sm:text-base font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white/10"
                  >
                    {isPaused ? "Play Countdown" : "Pause Countdown"}
                  </button>
                </div>
              )}
            </div>

            <p className="mx-auto mt-6 flex w-fit items-center justify-center rounded-full border border-white/10 bg-white/8 px-5 py-2.5 text-center text-[10px] sm:px-6 sm:py-3 sm:text-sm lg:px-7 lg:py-3 lg:text-base text-white/80 uppercase tracking-[0.2em] sm:tracking-[0.24em] lg:tracking-[0.28em]">
              Organised by the <span className="mx-1 font-bold text-white">CSE Department</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;