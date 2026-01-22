"use client";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export function initializeGA(gaId: string) {
  if (typeof window === "undefined" || !gaId) return;

  // Check consent
  const consent = localStorage.getItem("analytics_consent");
  if (consent !== "accepted") {
    return;
  }

  // Load gtag script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer || [];
  function gtag(
    command: string,
    targetId: string | Date,
    config?: Record<string, unknown>
  ) {
    window.dataLayer!.push([command, targetId, config]);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", gaId);
}

export function trackEvent(action: string, category: string, label?: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  const consent = localStorage.getItem("analytics_consent");
  if (consent !== "accepted") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
  });
}

export function setConsent(accepted: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("analytics_consent", accepted ? "accepted" : "rejected");
  
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  if (accepted && gaId) {
    initializeGA(gaId);
  }
}

export function getConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  const consent = localStorage.getItem("analytics_consent");
  return consent === "accepted" ? "accepted" : consent === "rejected" ? "rejected" : null;
}
