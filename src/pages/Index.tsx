import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "@/components/CountdownTimer";
import indusLogo from "@/assets/indus-logo.png";
import odooLogo from "@/assets/odoo-logo.png";

const Index = () => {
  const times = {
    start: new Date(2026, 3, 4, 10, 0, 0),
    end: new Date(2026, 3, 5, 10, 0, 0),
  };

  const startButtonWindow = useMemo(() => {
    const start = times.start.getTime();

    return {
      opensAt: start - 5 * 60 * 1000,
      closesAt: start + 1 * 60 * 1000,
    };
  }, [times.start]);

  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const showStartButton = now <= startButtonWindow.closesAt;
  const isStartButtonActive = now >= startButtonWindow.opensAt && now <= startButtonWindow.closesAt;
  const shouldShowPauseControls = isStarted || now >= startButtonWindow.closesAt;

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(24,24,27,0.08),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(24,24,27,0.05),_transparent_30%)]" />

      <div className="relative z-10 w-full max-w-7xl xl:max-w-[calc(100vw-0.5rem)]">
        <div className="mx-auto mb-5 flex h-16 max-w-5xl items-center justify-between gap-4 rounded-full border border-zinc-200 bg-white/95 px-5 shadow-[0_12px_34px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:h-20 sm:gap-6 sm:px-7 lg:max-w-6xl xl:max-w-7xl xl:h-24 xl:px-10">
          <img
            src={odooLogo}
            alt="ODOO"
            className="h-10 w-auto object-contain scale-[1.2] origin-left sm:h-12 lg:h-16 xl:h-20"
          />
          <img
            src={indusLogo}
            alt="Indus University"
            className="h-10 w-auto object-contain scale-[1.04] origin-right sm:h-12 lg:h-16 xl:h-20"
          />
        </div>

        <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] xl:max-w-[calc(100vw-2rem)] xl:min-h-[calc(100vh-7rem)] xl:rounded-[2rem] 2xl:min-h-[calc(100vh-8rem)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-primary/80 font-bold">
              Live Countdown
            </p>
            <Link
              to="/results"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Results Page
            </Link>
          </div>

          <div className="px-5 py-10 text-center sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:flex xl:min-h-[calc(100vh-13rem)] xl:flex-col xl:justify-between xl:py-16">
            <div className="space-y-3 sm:space-y-4 animate-fade-in-down">

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                <span className="text-primary glow-text">ODOO</span>

                <span className="text-white/40 mx-3">×</span>
                <span className="text-white">INDUS UNIVERSITY</span>
              </h1>
              <p className="text-xl sm:text-3xl lg:text-4xl text-white/90 font-bold tracking-tight">
                Hackathon 2026
              </p>
            </div>

            <div className="mt-8 sm:mt-10 space-y-8 xl:mt-12 xl:space-y-10">
              <CountdownTimer startTime={times.start} endTime={times.end} isPaused={isPaused && shouldShowPauseControls} />

              {showStartButton ? (
                <div className="mx-auto flex max-w-xl flex-col items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-8 sm:px-10 sm:py-10">
                  <button
                    type="button"
                    onClick={() => isStartButtonActive && setIsStarted(true)}
                    disabled={!isStartButtonActive}
                    className={`rounded-full px-7 py-3 text-sm sm:text-base font-bold uppercase tracking-[0.25em] transition active:scale-[0.98] ${
                      isStartButtonActive
                        ? "bg-primary text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,191,0,0.35)]"
                        : "cursor-not-allowed border border-white/10 bg-white/5 text-white/45"
                    }`}
                  >
                    Start Website
                  </button>
                </div>
              ) : shouldShowPauseControls ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setIsPaused((value) => !value)}
                    className="min-w-44 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm sm:text-base font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white/10"
                  >
                    {isPaused ? "Play Countdown" : "Pause Countdown"}
                  </button>
                  <Link
                    to="/results"
                    className="min-w-44 rounded-full bg-white px-6 py-3 text-sm sm:text-base font-semibold uppercase tracking-[0.22em] text-zinc-950 transition hover:bg-zinc-200"
                  >
                    Open Results Page
                  </Link>
                </div>
              ) : null}
            </div>

            <p className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm sm:text-base lg:text-lg text-white/80 uppercase tracking-[0.24em] sm:tracking-[0.28em] lg:tracking-[0.33em]">
              Organised by the <span className="font-bold text-white/80">CSE Department</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;