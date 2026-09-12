import { createFileRoute } from "@tanstack/react-router";
import { Check, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import songAsset from "@/assets/apology-song.m4a.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Before You Decide My Fate" },
      { name: "description", content: "A small, sincere apology made with genuine intentions." },
      { property: "og:title", content: "Before You Decide My Fate" },
      { property: "og:description", content: "A small, sincere apology made with genuine intentions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Edit the personal details here. Everything visible on the page lives in this object.
const content = {
  opening: "Okay. Before you decide my fate... check it please.",
  openingNote: "I may have handled that argument terribly.",
  letter: "Not to bore you, the above statement say it all. Gusse mein thoda zyada hi kar diya. Maan jao na",
  signature: "~ the idiot who made this website",
  songTitle: "The one I wanted you to hear",
  songNote: "Okay, this song says it better than I can.",
  evidence: [
    {
      title: "Use your brain",
      detail: "A surprisingly useful feature that I apparently left switched off mid-argument.",
      mark: "01",
    },
    {
      title: "Don't react immediately",
      detail: "Draft the dramatic reply. Breathe. Delete it. Then maybe communicate like a normal person.",
      mark: "02",
    },
  ],
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
};

function Index() {
  const [revealed, setRevealed] = useState(false);
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [answer, setAnswer] = useState<"yes" | "mad" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (revealed) requestAnimationFrame(() => storyRef.current?.scrollIntoView({ behavior: "smooth" }));
  }, [revealed]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play();
    else audio.pause();
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative flex min-h-[100svh] flex-col justify-between px-5 py-7 sm:px-10 sm:py-10">
        <div className="flex items-center justify-between border-b border-border pb-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span>A small attempt</span><span>Read before judging</span>
        </div>
        <div className="mx-auto w-full max-w-5xl py-20 text-center sm:py-24">
          <p className="mb-6 font-hand text-2xl text-primary sm:text-3xl">one minute, please</p>
          <h1 className="mx-auto max-w-4xl font-display text-5xl leading-[0.98] font-medium sm:text-7xl lg:text-8xl">
            {content.opening}
          </h1>
          <p className="mx-auto mt-8 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            {content.openingNote}
          </p>
          <Button
            size="lg"
            onClick={() => setRevealed(true)}
            className="mt-10 h-12 rounded-full px-7 text-base shadow-none transition-transform hover:-translate-y-0.5"
          >
            Fine, <span aria-hidden="true">→</span>
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground">No dramatic pop-ups. Promise.</p>
      </section>

      {revealed && (
        <section ref={storyRef} className="animate-gentle-rise">
          <div className="border-y border-border bg-card px-5 py-24 sm:px-10 sm:py-32">
            <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[0.65fr_1.35fr] md:gap-20">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">01 — No excuses</p>
                <h2 className="font-display text-4xl leading-tight sm:text-5xl">I owe you an actual apology.</h2>
              </div>
              <article className="border-l-2 border-primary/30 pl-6 sm:pl-10">
                <p className="font-display text-2xl leading-relaxed sm:text-3xl">“{content.letter}”</p>
                <p className="mt-8 font-hand text-2xl text-primary sm:text-3xl">{content.signature}</p>
              </article>
            </div>
          </div>

          <div className="px-5 py-24 sm:px-10 sm:py-32">
            <div className="mx-auto max-w-5xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">02 — The evidence</p>
              <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-6xl">Things I probably should've remembered during the argument</h2>
              <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-8">
                {content.evidence.map((item, index) => {
                  const isOpen = openCard === index;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenCard(isOpen ? null : index)}
                      className={`paper-shadow min-h-72 cursor-pointer border border-border bg-card p-5 text-left transition-transform duration-300 hover:-translate-y-1 ${index === 0 ? "sm:-rotate-1" : "sm:translate-y-7 sm:rotate-1"}`}
                    >
                      <div className="flex h-full min-h-60 flex-col justify-between border border-border/70 p-6">
                        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                          <span>NOTE TO SELF</span><span className="font-hand text-xl text-primary">{item.mark}</span>
                        </div>
                        <div>
                          <h3 className="font-display text-3xl sm:text-4xl">{item.title}</h3>
                          <p className={`mt-5 text-sm leading-6 text-muted-foreground transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                            {item.detail}
                          </p>
                        </div>
                        <span className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-primary">{isOpen ? "Okay, noted" : "Tap to inspect"}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-y border-border bg-foreground px-5 py-24 text-background sm:px-10 sm:py-32">
            <div className="mx-auto max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">03 — Press play</p>
              <h2 className="font-display text-4xl leading-tight sm:text-6xl">{content.songNote}</h2>
              <div className="mt-12 border-y border-background/25 py-7">
                <div className="flex items-center gap-5 sm:gap-7">
                  <Button
                    type="button"
                    size="icon"
                    onClick={toggleAudio}
                    aria-label={isPlaying ? "Pause song" : "Play song"}
                    className="h-14 w-14 shrink-0 rounded-full bg-background text-foreground shadow-none hover:bg-background/90"
                  >
                    {isPlaying ? <Pause fill="currentColor" /> : <Play className="ml-0.5" fill="currentColor" />}
                  </Button>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{content.songTitle}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-background/65">
                      <span>{formatTime(currentTime)}</span>
                      <input
                        aria-label="Song progress"
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={(event) => seek(Number(event.target.value))}
                        className="h-1 min-w-0 flex-1 cursor-pointer accent-background"
                      />
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => seek(0)} aria-label="Restart song" className="text-background hover:bg-background/10 hover:text-background">
                    <RotateCcw />
                  </Button>
                </div>
                <audio
                  ref={audioRef}
                  src={songAsset.url}
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                  onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                />
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[92svh] items-center px-5 py-24 sm:px-10">
            {answer === "yes" && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-72 max-w-2xl overflow-hidden">
                {Array.from({ length: 18 }).map((_, index) => (
                  <i key={index} className="confetti-piece absolute top-0 h-2 w-1.5 bg-primary" style={{ left: `${5 + ((index * 37) % 90)}%`, animationDelay: `${(index % 6) * 80}ms`, "--drift": `${(index % 2 ? 1 : -1) * (18 + index * 2)}px` } as React.CSSProperties} />
                ))}
              </div>
            )}
            <div className="relative mx-auto max-w-4xl text-center">
              <p className="mb-5 font-hand text-2xl text-primary">the important bit</p>
              <h2 className="font-display text-6xl leading-none sm:text-8xl">So... are we good?</h2>
              {!answer ? (
                <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button size="lg" onClick={() => setAnswer("yes")} className="h-12 rounded-full px-8">Yes <Check /></Button>
                  <Button size="lg" variant="outline" onClick={() => setAnswer("mad")} className="h-12 rounded-full px-8 shadow-none">I'm still mad</Button>
                </div>
              ) : (
                <div className="animate-gentle-rise mt-10">
                  <p className="font-display text-2xl sm:text-3xl">
                    {answer === "yes" ? "Thank God. I was running out of website ideas." : "Fair. I'll give you time. But the apology remains."}
                  </p>
                  <Button variant="ghost" onClick={() => setAnswer(null)} className="mt-5 text-muted-foreground">Change answer</Button>
                </div>
              )}
            </div>
          </div>

          <footer className="border-t border-border px-5 py-8 text-center text-xs text-muted-foreground sm:px-10">
            Built with questionable coding decisions and very genuine intentions.
          </footer>
        </section>
      )}
    </main>
  );
}
