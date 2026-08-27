"use client";

import { usePageTracking } from "@/lib/hooks/useAnalyticsTracking";
import { trackMapOpen } from "@/lib/analytics/analytics";
import { useEffect } from "react";
import DashboardPreview from "@/components/DashboardPreview";

export default function MapPage() {
  usePageTracking();

  useEffect(() => {
    trackMapOpen();
  }, []);

  return <DashboardPreview />;
}
