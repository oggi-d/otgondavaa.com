"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent, initializeGA } from "@/lib/ga";

export function GAConsentToggle() {
  const [consent, setConsentState] = React.useState<"accepted" | "rejected" | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setConsentState(getConsent());
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggle = (accepted: boolean) => {
    setConsent(accepted);
    setConsentState(accepted ? "accepted" : "rejected");
    if (accepted) {
      const gaId = process.env.NEXT_PUBLIC_GA4_ID;
      if (gaId) {
        initializeGA(gaId);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>Analytics:</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleToggle(true)}
        className={`h-6 px-2 text-xs ${consent === "accepted" ? "bg-primary text-primary-foreground" : ""}`}
      >
        On
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleToggle(false)}
        className={`h-6 px-2 text-xs ${consent === "rejected" ? "bg-destructive text-destructive-foreground" : ""}`}
      >
        Off
      </Button>
    </div>
  );
}
