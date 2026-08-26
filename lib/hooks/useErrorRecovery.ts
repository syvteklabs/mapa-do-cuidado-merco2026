import { useState, useCallback } from "react";

export type SavedFormData = Record<string, string | number | boolean | undefined> & {
  timestamp?: number;
};

export function useErrorRecovery() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedFormData, setSavedFormData] = useState<SavedFormData | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const saveFormData = useCallback((data: SavedFormData) => {
    const withTimestamp = { ...data, timestamp: Date.now() };
    setSavedFormData(withTimestamp);
    // Persist to localStorage as backup
    try {
      localStorage.setItem("form_draft", JSON.stringify(withTimestamp));
    } catch (e) {
      console.warn("Could not save form data to localStorage", e);
    }
  }, []);

  const recoverFormData = useCallback(() => {
    try {
      const stored = localStorage.getItem("form_draft");
      if (stored) {
        const data = JSON.parse(stored);
        // Only use if less than 1 hour old
        if (Date.now() - data.timestamp < 3600000) {
          setSavedFormData(data);
          return data;
        }
      }
    } catch (e) {
      console.warn("Could not recover form data", e);
    }
    return null;
  }, []);

  const reportError = useCallback(
    (message: string, formData?: SavedFormData) => {
      setHasError(true);
      setErrorMessage(message);
      if (formData) {
        saveFormData(formData);
      }
    },
    [saveFormData]
  );

  const clearError = useCallback(() => {
    setHasError(false);
    setErrorMessage(null);
    setIsRetrying(false);
  }, []);

  const clearSavedData = useCallback(() => {
    setSavedFormData(null);
    try {
      localStorage.removeItem("form_draft");
    } catch (e) {
      console.warn("Could not clear form data", e);
    }
  }, []);

  return {
    hasError,
    errorMessage,
    savedFormData,
    isRetrying,
    setIsRetrying,
    saveFormData,
    recoverFormData,
    reportError,
    clearError,
    clearSavedData,
  };
}
