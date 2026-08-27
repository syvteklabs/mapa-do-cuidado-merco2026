/**
 * Offline Storage - Queue management for responses when offline
 * Stores responses locally and syncs when connection returns
 */

export interface QueuedResponse {
  id: string;
  timestamp: string;
  data: {
    municipio: string;
    estado: string;
    resposta_categoria: string;
  };
  status: "pending" | "syncing" | "failed";
  retryCount: number;
  lastError?: string;
}

const STORAGE_KEY = "mapa_offline_queue";
const MAX_RETRIES = 5;

/**
 * Get all queued responses from localStorage
 */
export function getQueue(): QueuedResponse[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading offline queue:", error);
    return [];
  }
}

/**
 * Add a response to the offline queue
 */
export function addToQueue(data: QueuedResponse["data"]): QueuedResponse {
  if (typeof window === "undefined") {
    throw new Error("Offline storage not available on server");
  }

  const response: QueuedResponse = {
    id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    data,
    status: "pending",
    retryCount: 0,
  };

  const queue = getQueue();
  queue.push(response);
  saveQueue(queue);

  return response;
}

/**
 * Mark a response as syncing
 */
export function markAsSyncing(id: string): void {
  const queue = getQueue();
  const item = queue.find((q) => q.id === id);
  if (item) {
    item.status = "syncing";
    saveQueue(queue);
  }
}

/**
 * Mark a response as successfully synced (remove from queue)
 */
export function markAsSynced(id: string): void {
  const queue = getQueue().filter((q) => q.id !== id);
  saveQueue(queue);
}

/**
 * Mark a response as failed with error details
 */
export function markAsFailed(id: string, error: string): void {
  const queue = getQueue();
  const item = queue.find((q) => q.id === id);
  if (item) {
    item.status = "failed";
    item.retryCount += 1;
    item.lastError = error;
    // Remove if max retries exceeded
    if (item.retryCount >= MAX_RETRIES) {
      saveQueue(queue.filter((q) => q.id !== id));
    } else {
      saveQueue(queue);
    }
  }
}

/**
 * Get count of pending responses
 */
export function getPendingCount(): number {
  const queue = getQueue();
  return queue.filter((q) => q.status === "pending" || q.status === "failed").length;
}

/**
 * Get next item to sync
 */
export function getNextToSync(): QueuedResponse | null {
  const queue = getQueue();
  // Prioritize pending items, then failed ones with retry count < max (exclude syncing)
  const nextItem = queue.find(
    (q) =>
      q.status !== "syncing" &&
      (q.status === "pending" || (q.status === "failed" && q.retryCount < MAX_RETRIES))
  );
  return nextItem || null;
}

/**
 * Clear entire queue (use with caution)
 */
export function clearQueue(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing offline queue:", error);
  }
}

/**
 * Save queue to localStorage
 */
function saveQueue(queue: QueuedResponse[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error("Error saving offline queue:", error);
    // If storage quota exceeded, remove oldest failed items
    if (error instanceof DOMException && error.code === 22) {
      const filtered = queue.filter((q) => q.status !== "failed");
      if (filtered.length < queue.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      }
    }
  }
}

/**
 * Get queue statistics for monitoring
 */
export function getQueueStats() {
  const queue = getQueue();
  return {
    total: queue.length,
    pending: queue.filter((q) => q.status === "pending").length,
    syncing: queue.filter((q) => q.status === "syncing").length,
    failed: queue.filter((q) => q.status === "failed").length,
    oldestAge: queue.length > 0 ? Date.now() - new Date(queue[0].timestamp).getTime() : 0,
  };
}
