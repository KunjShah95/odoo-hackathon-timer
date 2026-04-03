import { Link } from "react-router-dom";
import indusLogo from "@/assets/indus-logo.png";
import odooLogo from "@/assets/odoo-logo.png";
import hackathonBanner from "@/assets/hackathon-banner.jpg";

const resultBlocks = [
  {
    title: "Winner",
    subtitle: "Replace later with the winning team photo and details.",
  },
  {
    title: "Runner-Up",
    subtitle: "Replace later with the runner-up team photo and details.",
  },
  {
    title: "Whole Team",
    subtitle: "Use this slot for the full team photo after the event.",
  },
];

const Results = () => {
  return (
    <div className="min-h-screen bg-white px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl xl:max-w-6xl">
        <div className="mx-auto mb-4 flex h-16 max-w-5xl items-center justify-between gap-4 rounded-full border border-zinc-200 bg-white/95 px-5 shadow-[0_12px_34px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:mb-5 sm:h-20 sm:gap-6 sm:px-7 lg:max-w-6xl xl:h-24 xl:px-10">
          <img src={odooLogo} alt="ODOO" className="h-10 w-auto object-contain scale-[1.2] origin-left sm:h-12 lg:h-16 xl:h-18" />
          <img src={indusLogo} alt="Indus University" className="h-10 w-auto object-contain scale-[1.04] origin-right sm:h-12 lg:h-16 xl:h-18" />
        </div>

        <section className="overflow-hidden rounded-[1.5rem] bg-zinc-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:rounded-[2rem] xl:min-h-[calc(100vh-8rem)] xl:max-h-[calc(100vh-8rem)] xl:w-full 2xl:min-h-[calc(100vh-9rem)] 2xl:max-h-[calc(100vh-9rem)]">
          <div className="grid gap-0 xl:grid-cols-[1fr_0.96fr] xl:h-full">
            <div className="p-5 sm:p-7 md:p-9 lg:p-10 xl:p-11 2xl:p-12">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.45em] sm:tracking-[0.5em] text-primary/80 font-bold">
                Temporary results page
              </p>
              <h1 className="mt-3 text-3xl sm:mt-4 sm:text-5xl lg:text-6xl xl:text-[4.8rem] font-black tracking-tight leading-none">
                Winners & Teams
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base lg:text-lg text-white/65">
                This page is ready for your final winner, runner-up, and team photos. For now, it uses the existing banner as a placeholder so you can swap in the final assets later.
              </p>

              <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5 p-2.5 sm:mt-8 sm:rounded-[1.5rem] sm:p-4 xl:max-w-[94%]">
                <img
                  src={hackathonBanner}
                  alt="Hackathon placeholder banner"
                  className="aspect-[4/5] w-full rounded-[1rem] object-cover sm:aspect-[16/11] sm:rounded-[1.1rem] lg:aspect-[4/5] xl:aspect-[16/10] 2xl:aspect-[16/11]"
                />
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 p-5 sm:p-7 md:p-9 lg:border-t-0 lg:border-l lg:border-white/10 lg:p-10 xl:p-11 2xl:p-12">
              <div className="grid gap-3 sm:gap-4 lg:gap-5 xl:gap-5">
                {resultBlocks.map((block) => (
                  <div key={block.title} className="rounded-[1rem] border border-white/10 bg-zinc-900/80 p-4 sm:rounded-[1.25rem] sm:p-5 lg:p-6 xl:p-7">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.32em] sm:tracking-[0.35em] text-primary/80 font-bold">
                      {block.title}
                    </p>
                    <div className="mt-3 flex min-h-[8rem] sm:min-h-[9rem] lg:min-h-[10rem] xl:min-h-[10.5rem] items-center justify-center rounded-[0.85rem] border border-dashed border-white/15 bg-white/5 px-4 text-center text-xs sm:text-sm text-white/55">
                      {block.subtitle}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">
                <Link
                  to="/"
                  className="rounded-full bg-primary px-6 py-3 text-center text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-black transition hover:scale-[1.02]"
                >
                  Back to Timer
                </Link>
                <p className="rounded-full border border-white/10 px-5 py-3 text-center text-xs sm:px-6 sm:text-sm text-white/60">
                  Update these blocks later with the final photos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Results;