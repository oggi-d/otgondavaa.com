"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
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

  // If already initialized, don't initialize again
  if (window.gtag && window.dataLayer) {
    return;
  }

  // Check if script is already in the DOM
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
  if (existingScript) {
    // Script exists, just initialize gtag if not already done
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", gaId);
    }
    return;
  }

  // Initialize dataLayer first
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;

  // Load gtag script and wait for it to load
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  
  script1.onload = () => {
    gtag("js", new Date());
    gtag("config", gaId);
  };
  
  // Handle script load errors
  script1.onerror = () => {
    console.error("Failed to load Google Analytics script");
  };
  
  document.head.appendChild(script1);
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
