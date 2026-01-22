"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { setConsent, getConsent, initializeGA } from "@/lib/ga";
import { X } from "lucide-react";

export function GAConsentBanner() {
  const [show, setShow] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const consent = getConsent();
    if (consent === null) {
      setShow(true);
    }
  }, []);

  React.useEffect(() => {
    if (mounted) {
      const gaId = process.env.NEXT_PUBLIC_GA4_ID;
      if (gaId && getConsent() === "accepted") {
        initializeGA(gaId);
      }
    }
  }, [mounted]);

  if (!mounted || !show) {
    return null;
  }

  const handleAccept = () => {
    setConsent(true);
    setShow(false);
    const gaId = process.env.NEXT_PUBLIC_GA4_ID;
    if (gaId) {
      initializeGA(gaId);
    }
  };

  const handleReject = () => {
    setConsent(false);
    setShow(false);
  };

  return (
    <Alert className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto md:left-auto md:right-4 shadow-lg">
      <X
        className="h-4 w-4 absolute top-4 right-4 cursor-pointer"
        onClick={() => setShow(false)}
      />
      <AlertDescription className="pr-8">
        <p className="mb-3">
          We use cookies and analytics to improve your experience. Do you accept
          analytics cookies?
        </p>
        <div className="flex gap-2">
          <Button onClick={handleAccept} size="sm">
            Accept
          </Button>
          <Button onClick={handleReject} variant="outline" size="sm">
            Opt-out
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
