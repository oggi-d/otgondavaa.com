"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function initializeGA(gaId: string) {
  if (typeof window === "undefined" || !gaId) {
    console.warn("GA: Cannot initialize - window undefined or no GA ID");
    return;
  }

  // Check consent
  const consent = localStorage.getItem("analytics_consent");
  if (consent !== "accepted") {
    console.log("GA: Consent not accepted, skipping initialization");
    return;
  }

  // Check if script is already in the DOM
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
  if (existingScript) {
    // Script exists, ensure gtag is configured
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      }
      window.gtag = gtag;
    }
    // Re-send config in case it wasn't set properly
    if (window.gtag) {
      window.gtag("js", new Date());
      window.gtag("config", gaId);
    }
    console.log("GA: Script already exists, reconfiguring with ID", gaId);
    return;
  }

  // If gtag already exists but script doesn't, something is wrong - reinitialize
  if (window.gtag && !existingScript) {
    console.log("GA: gtag exists but script missing, reinitializing");
  }

  // Initialize dataLayer first
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;

  // Call gtag commands immediately - they'll be queued in dataLayer
  // and processed when the script loads
  // Use window.gtag which has the proper TypeScript type
  window.gtag("js", new Date());
  window.gtag("config", gaId);

  // Load gtag script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  
  script1.onload = () => {
    console.log("GA: Script loaded successfully", gaId);
  };
  
  // Handle script load errors
  script1.onerror = () => {
    console.error("GA: Failed to load Google Analytics script", gaId);
  };
  
  document.head.appendChild(script1);
  console.log("GA: Initializing with ID", gaId);
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
