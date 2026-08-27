import { useEffect, useState, useCallback, useRef } from "react";
import {
  getQueue,
  getNextToSync,
  markAsSyncing,
  markAsSynced,
  markAsFailed,
  getPendingCount,
  addToQueue,
  QueuedResponse,
} from "@/lib/offlineStorage";

export interface SyncStatus {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  lastSyncError?: string;
  lastSyncTime?: string;
}

interface UseOfflineSyncOptions {
  onSyncSuccess?: (id: string) => void;
  onSyncError?: (id: string, error: string) => void;
  onQueueChange?: (count: number) => void;
  testMode?: boolean;
}

/**
 * Hook to manage offline queue and automatic syncing
 */
export function useOfflineSync(options: UseOfflineSyncOptions = {}) {
  const [status, setStatus] = useState<SyncStatus>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isSyncing: false,
    pendingCount: 0,
  });

  const syncInProgressRef = useRef(false);
  const testModeRef = useRef(options.testMode || false);

  // Override online status in test mode
  const isOnline =
    testModeRef.current && options.testMode === false ? false : status.isOnline;

  /**
   * Sync a single response to the server
   */
  const syncResponse = useCallback(
    async (response: QueuedResponse): Promise<boolean> => {
      try {
        markAsSyncing(response.id);
        setStatus((prev) => ({ ...prev, isSyncing: true }));

        const result = await fetch("/api/contribuicoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response.data),
          signal: AbortSignal.timeout(10000),
        });

        if (!result.ok) {
          throw new Error(`Server error: ${result.status}`);
        }

        markAsSynced(response.id);
        options.onSyncSuccess?.(response.id);
        return true;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        markAsFailed(response.id, errorMsg);
        options.onSyncError?.(response.id, errorMsg);
        setStatus((prev) => ({
          ...prev,
          lastSyncError: errorMsg,
        }));
        return false;
      }
    },
    [options]
  );

  /**
   * Process the entire queue
   */
  const processQueue = useCallback(async () => {
    if (syncInProgressRef.current || !isOnline) return;

    syncInProgressRef.current = true;
    let successCount = 0;

    try {
      while (true) {
        const nextItem = getNextToSync();
        if (!nextItem) break;

        const success = await syncResponse(nextItem);
        if (success) {
          successCount++;
        } else {
          // Stop processing if sync fails, wait for next attempt
          break;
        }

        // Small delay between syncs to avoid overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      if (successCount > 0) {
        setStatus((prev) => ({
          ...prev,
          lastSyncTime: new Date().toISOString(),
        }));
      }
    } finally {
      syncInProgressRef.current = false;
      setStatus((prev) => ({ ...prev, isSyncing: false }));

      // Update pending count
      const pendingCount = getPendingCount();
      setStatus((prev) => ({ ...prev, pendingCount }));
      options.onQueueChange?.(pendingCount);
    }
  }, [isOnline, syncResponse, options]);

  /**
   * Handle online/offline events
   */
  useEffect(() => {
    const handleOnline = () => {
      setStatus((prev) => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setStatus((prev) => ({ ...prev, isOnline: false }));
    };

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  /**
   * Process queue when coming online or on interval
   */
  useEffect(() => {
    // Update pending count on mount
    const pendingCount = getPendingCount();
    setStatus((prev) => ({ ...prev, pendingCount }));
    options.onQueueChange?.(pendingCount);

    if (!isOnline) return;

    // Process queue immediately when coming online
    const timeoutId = setTimeout(() => {
      processQueue();
    }, 500);

    // Also set up periodic sync attempts
    const intervalId = setInterval(() => {
      processQueue();
    }, 10000); // Retry every 10 seconds if still pending

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isOnline, processQueue, options]);

  /**
   * Queue a response for offline storage
   */
  const queueResponse = useCallback(
    (data: QueuedResponse["data"]): QueuedResponse => {
      const response = addToQueue(data);
      const pendingCount = getPendingCount();
      setStatus((prev) => ({ ...prev, pendingCount }));
      options.onQueueChange?.(pendingCount);

      // Try to sync immediately if online
      if (isOnline) {
        processQueue();
      }

      return response;
    },
    [isOnline, processQueue, options]
  );

  /**
   * Set test mode (simulate offline)
   */
  const setTestMode = useCallback((enabled: boolean) => {
    testModeRef.current = enabled;
    setStatus((prev) => ({
      ...prev,
      isOnline: !enabled,
    }));
  }, []);

  return {
    ...status,
    queueResponse,
    processQueue,
    setTestMode,
  };
}
