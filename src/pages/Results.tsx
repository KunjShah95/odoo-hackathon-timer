import { ArrowLeft, Award, Crown, Medal } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import indusLogo from "@/assets/indus-logo.png";
import odooLogo from "@/assets/odoo-logo.png";
import hackathonBanner from "@/assets/hackathon-banner.jpg";

const winners = [
  {
    position: "2nd Runner-Up",
    positionShort: "03",
    teamName: "Team Name Goes Here",
    projectName: "Add project title here",
    note: "Drop in the final group photo and the team name before the showcase.",
    accent: "from-amber-500/30 via-amber-300/10 to-white/5",
    icon: Medal,
  },
  {
    position: "1st Runner-Up",
    positionShort: "02",
    teamName: "Team Name Goes Here",
    projectName: "Add project title here",
    note: "This slot is perfect for the silver-winning team photo and details.",
    accent: "from-zinc-100/30 via-zinc-300/10 to-white/5",
    icon: Award,
  },
  {
    position: "Winner",
    positionShort: "01",
    teamName: "Team Name Goes Here",
    projectName: "Add project title here",
    note: "Reserve this hero card for the champion team and their winning photo.",
    accent: "from-yellow-300/30 via-amber-400/12 to-white/5",
    icon: Crown,
  },
];

const Results = () => {
  return (
    <div className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,200,72,0.16),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.08),_transparent_26%),linear-gradient(180deg,_#120f0a_0%,_#0a0908_52%,_#050505_100%)] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
      <div className="mx-auto flex h-full w-full max-w-[min(100vw-0.75rem,1440px)] flex-col gap-3 overflow-hidden">
        <div className="breathing mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-zinc-200 bg-white/95 px-4 shadow-[0_12px_34px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:h-16 sm:gap-5 sm:px-6 xl:max-w-[min(100vw-0.75rem,1200px)] xl:h-20 xl:px-8">
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

        <section className="relative flex min-h-0 flex-1 items-center rounded-[1.6rem] border border-white/10 bg-black/15 px-3 py-3 sm:px-5 sm:py-5">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {winners.map((winner) => {
                const Icon = winner.icon;

                return (
                  <CarouselItem key={winner.position} className="pl-4">
                    <article className="grid min-h-[24rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_14px_40px_rgba(0,0,0,0.18)] lg:min-h-[32rem] lg:grid-cols-[0.95fr_1.05fr]">
                      <div className={`flex flex-col justify-between border-b border-white/10 bg-gradient-to-r ${winner.accent} p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7`}>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                            <Icon className="h-4 w-4 text-primary" />
                            {winner.position}
                          </div>

                          <div className="space-y-3">
                            <div className="rounded-[1.15rem] border border-white/10 bg-black/20 px-4 py-3">
                              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Team name</p>
                              <h2 className="mt-1 font-serif text-2xl font-black leading-tight text-white sm:text-[2.2rem]">
                                {winner.teamName}
                              </h2>
                            </div>

                            <div className="rounded-[1rem] border border-white/10 bg-black/15 px-4 py-3 text-sm leading-6 text-white/72 sm:text-[0.95rem]">
                              {winner.projectName}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm leading-6 text-white/68 sm:text-[0.95rem]">
                            {winner.note}
                          </p>
                          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.26em] text-white/55 sm:text-xs">
                            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Team name</span>
                            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Project title</span>
                            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Winner position</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative min-h-[20rem] overflow-hidden bg-zinc-950/55 lg:min-h-[32rem]">
                        <img
                          src={hackathonBanner}
                          alt={`${winner.position} team photo placeholder`}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm">
                          Add group photo here
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.76))] p-4 pt-10">
                          <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">Winning team image</p>
                          <p className="mt-1 font-serif text-xl font-semibold text-white sm:text-2xl">
                            {winner.teamName}
                          </p>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-1 border-white/15 bg-black/40 text-white hover:bg-black/60 sm:-left-3" />
            <CarouselNext className="-right-1 border-white/15 bg-black/40 text-white hover:bg-black/60 sm:-right-3" />
          </Carousel>
        </section>
      </div>
    </div>
  );
};

export default Results;
