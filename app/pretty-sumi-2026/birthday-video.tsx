"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export function BirthdayVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    void video.play().then(() => setStarted(true)).catch(() => {});
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[#4a2a38]" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-rose-400/45 via-rose-900/40 to-[#2a1520]" />
      <div className="pointer-events-none absolute top-[-12%] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-rose-400/35 blur-3xl" />
      <div className="pointer-events-none absolute left-[-10%] bottom-[10%] h-72 w-72 rounded-full bg-pink-400/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8%] bottom-[-5%] h-80 w-80 rounded-full bg-rose-300/30 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/20">
          <video
            ref={videoRef}
            src="/videos/sumi-2026-happy-birthday.mp4"
            playsInline
            controls={started}
            preload="metadata"
            className="aspect-9/16 max-h-[85dvh] w-full bg-black object-cover"
            onEnded={() => setStarted(false)}
          />

          {!started ? (
            <button
              type="button"
              onClick={play}
              className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
              aria-label="Тоглуулах"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-rose-500 shadow-lg transition-transform hover:scale-105">
                <Play className="h-7 w-7 fill-current pl-0.5" />
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
