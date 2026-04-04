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
    <div className="min-h-screen bg-white px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 flex items-center justify-center">
      <div className="mx-auto max-w-[min(100vw-0.75rem,1200px)]">
        <div className="mx-auto mb-4 flex h-[4.25rem] max-w-5xl items-center justify-between gap-3 rounded-full border border-zinc-200 bg-white/95 px-4 shadow-[0_12px_34px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:mb-4 sm:h-[4.75rem] sm:gap-5 sm:px-6 lg:max-w-6xl xl:h-[5.25rem] xl:px-8">
          <img src={odooLogo} alt="ODOO" className="h-10 w-auto object-contain scale-[1.22] origin-left sm:h-12 lg:h-14 xl:h-18" />
          <img src={indusLogo} alt="Indus University" className="h-10 w-auto object-contain scale-[1.12] origin-right sm:h-12 lg:h-14 xl:h-18" />
        </div>

        <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[1.5rem] bg-zinc-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:rounded-[2rem] xl:w-full xl:max-w-[min(100vw-0.75rem,1200px)] xl:h-[calc(100vh-8.75rem)] xl:max-h-[calc(100vh-8.75rem)]">
          <div className="grid gap-0 xl:grid-cols-[0.98fr_1.02fr] xl:h-full">
            <div className="p-5 sm:p-6 md:p-7 lg:p-8 xl:p-7 2xl:p-8">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.45em] sm:tracking-[0.5em] text-primary/80 font-bold">
                Temporary results page
              </p>
              <h1 className="mt-3 text-3xl sm:mt-4 sm:text-5xl lg:text-6xl xl:text-[3.7rem] font-black tracking-tight leading-none">
                Winners & Teams
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base lg:text-lg xl:text-base text-white/65">
                This page is ready for your final winner, runner-up, and team photos. For now, it uses the existing banner as a placeholder so you can swap in the final assets later.
              </p>

              <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5 p-2.5 sm:mt-6 sm:rounded-[1.5rem] sm:p-4 xl:max-w-[94%]">
                <img
                  src={hackathonBanner}
                  alt="Hackathon placeholder banner"
                  className="aspect-[16/11] w-full rounded-[1rem] object-cover sm:aspect-[16/10] sm:rounded-[1.1rem] lg:aspect-[16/10] xl:aspect-[16/9] 2xl:aspect-[16/9]"
                />
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 p-5 sm:p-6 md:p-7 lg:border-t-0 lg:border-l lg:border-white/10 lg:p-8 xl:p-7 2xl:p-8">
              <div className="grid gap-3 sm:gap-4 lg:gap-4 xl:gap-3 2xl:gap-3">
                {resultBlocks.map((block) => (
                  <div key={block.title} className="rounded-[1rem] border border-white/10 bg-zinc-900/80 p-4 sm:rounded-[1.25rem] sm:p-5 lg:p-5 xl:p-5 2xl:p-6">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.32em] sm:tracking-[0.35em] text-primary/80 font-bold">
                      {block.title}
                    </p>
                    <div className="mt-3 flex min-h-[7rem] sm:min-h-[7.5rem] lg:min-h-[8rem] xl:min-h-[7.25rem] 2xl:min-h-[7.75rem] items-center justify-center rounded-[0.85rem] border border-dashed border-white/15 bg-white/5 px-4 text-center text-xs sm:text-sm text-white/55">
                      {block.subtitle}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-4">
                <p className="text-center text-xs sm:text-sm text-white/60">
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