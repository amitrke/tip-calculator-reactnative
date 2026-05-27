import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type TextScaleContextValue = {
  isLargeText: boolean;
  toggleLargeText: () => void;
  scale: (fontSize: number) => number;
};

const STORAGE_KEY = 'app.textScale.large';
const LARGE_TEXT_MULTIPLIER = 1.2;

const TextScaleContext = createContext<TextScaleContextValue | null>(null);

export function TextScaleProvider({ children }: { children: React.ReactNode }) {
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    const loadPreference = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
        setIsLargeText(storedValue === 'true');
      } catch {
        // Keep default when persistence read fails.
      }
    };

    loadPreference();
  }, []);

  const toggleLargeText = useCallback(() => {
    setIsLargeText((previous) => {
      const next = !previous;
      AsyncStorage.setItem(STORAGE_KEY, String(next)).catch(() => {
        // Keep runtime value even if persistence write fails.
      });
      return next;
    });
  }, []);

  const scale = useCallback(
    (fontSize: number) => (isLargeText ? Math.round(fontSize * LARGE_TEXT_MULTIPLIER) : fontSize),
    [isLargeText]
  );

  const value = useMemo(
    () => ({
      isLargeText,
      toggleLargeText,
      scale,
    }),
    [isLargeText, scale, toggleLargeText]
  );

  return <TextScaleContext.Provider value={value}>{children}</TextScaleContext.Provider>;
}

export function useTextScale() {
  const context = useContext(TextScaleContext);
  if (!context) {
    throw new Error('useTextScale must be used within TextScaleProvider');
  }

  return context;
}
