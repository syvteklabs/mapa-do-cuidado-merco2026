"use client";

import { usePageTracking } from "@/lib/hooks/useAnalyticsTracking";
import ParticipationFlow from "@/components/ParticipationFlow";

export default function ParticipateePage() {
  usePageTracking();
  return <ParticipationFlow />;
}
