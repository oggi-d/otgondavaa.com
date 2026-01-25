"use client";

import { useRef, useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type ShareButtonProps = {
  title: string;
  text?: string;
  /**
   * Path relative to the site root (e.g. "/calculators/loan").
   * If omitted, uses current location pathname.
   */
  path?: string;
  /**
   * Full URL override. If provided, takes precedence over `path`.
   */
  url?: string;
  className?: string;
};

function buildAbsoluteUrl(path: string) {
  return new URL(path, window.location.origin).toString();
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  // Fallback for older browsers
  const el = document.createElement("textarea");
  el.value = value;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.left = "0";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export function ShareButton({
  title,
  text,
  path,
  url,
  className,
}: ShareButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<number | null>(null);

  function getShareUrl() {
    if (url) return url;
    return buildAbsoluteUrl(path ?? window.location.pathname);
  }

  async function onShare() {
    try {
      const shareUrl = getShareUrl();

      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
        resetTimer.current = null;
      }

      if (navigator.share) {
        await navigator.share({ title, text, url: shareUrl });
        setState("idle");
        return;
      }

      await copyToClipboard(shareUrl);
      setState("copied");
      resetTimer.current = window.setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      resetTimer.current = window.setTimeout(() => setState("idle"), 2500);
    }
  }

  const label =
    state === "copied" ? "Хуулсан" : state === "error" ? "Алдаа" : "Хуваалцах";

  return (
    <div className={className}>
      <Button variant="outline" size="sm" onClick={onShare}>
        {state === "copied" ? <Check className="h-4 w-4" /> : <Share2 />}
        {label}
      </Button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Холбоос хуулагдлаа" : ""}
      </span>
    </div>
  );
}
