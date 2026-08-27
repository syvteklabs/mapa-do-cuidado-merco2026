import { useEffect, useRef } from "react";
import {
  trackFormStart,
  trackFormStepProgress,
  trackFormStepAbandon,
  trackFormComplete,
  trackPageView,
} from "@/lib/analytics/analytics";

interface FormTrackingConfig {
  onFormStart?: () => void;
  onFormComplete?: () => void;
  onStepChange?: (step: number) => void;
}

/**
 * Hook to track form progression
 */
export function useFormTracking(
  currentStep: number,
  totalSteps: number,
  config?: FormTrackingConfig
) {
  const startTimeRef = useRef<number>(0);
  const stepStartTimeRef = useRef<number>(0);
  const formStartedRef = useRef<boolean>(false);

  // Track form start (only once)
  useEffect(() => {
    if (currentStep === 1 && !formStartedRef.current) {
      trackFormStart();
      config?.onFormStart?.();
      formStartedRef.current = true;
      startTimeRef.current = Date.now();
      stepStartTimeRef.current = Date.now();
    }
  }, [currentStep, config]);

  // Track step progress
  useEffect(() => {
    if (currentStep > 1 && formStartedRef.current) {
      trackFormStepProgress(currentStep);
      config?.onStepChange?.(currentStep);
    }
  }, [currentStep, config]);

  // Track step abandonment or completion when component unmounts or step changes
  useEffect(() => {
    return () => {
      if (formStartedRef.current && stepStartTimeRef.current) {
        const timeSpent = Date.now() - stepStartTimeRef.current;

        // If we're at the last step and form completed, track completion
        if (currentStep === totalSteps) {
          const totalTime = Date.now() - startTimeRef.current;
          trackFormComplete(totalTime);
          config?.onFormComplete?.();
        } else if (currentStep > 1) {
          // Otherwise track abandonment
          trackFormStepAbandon(currentStep, timeSpent);
        }
      }
    };
  }, [currentStep, totalSteps, config]);

  return {
    startTimeRef,
    stepStartTimeRef,
  };
}

/**
 * Hook to track page views
 */
export function usePageTracking() {
  useEffect(() => {
    trackPageView();
  }, []);
}

/**
 * Hook to track time on page
 */
export function useTimeTracking(eventName: string) {
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    return () => {
      const timeSpent = Date.now() - startTimeRef.current;
      // Could track this if needed
    };
  }, [eventName]);

  return startTimeRef;
}
