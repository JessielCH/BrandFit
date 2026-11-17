import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  ArchetypeId,
  BrandFitContextValue,
  CreatorProfile,
  ScreenId,
  UsageMode,
} from '../types/brandfit';
import { CREATORS, FRAUD_CREATOR, SUSPICIOUS_HINTS } from '../data/creators';

const BrandFitContext = createContext<BrandFitContextValue | undefined>(
  undefined
);

export function BrandFitProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<ScreenId>('home');
  const [mode, setMode] = useState<UsageMode>('marca');
  const [creator, setCreator] = useState<CreatorProfile | null>(CREATORS[0]);
  const [recentCreators, setRecentCreators] =
    useState<CreatorProfile[]>(CREATORS);
  const [archetype, setArchetype] = useState<ArchetypeId>('tech');
  const [pendingUsername, setPendingUsername] = useState<string>('');

  const go = useCallback((target: ScreenId) => {
    setScreen(target);
  }, []);

  const startAnalysis = useCallback((username: string) => {
    const clean = username.trim().replace(/^@/, '');
    setPendingUsername(clean || 'alexmando15');
    setScreen('progress');
  }, []);

  const finishAnalysis = useCallback(() => {
    const rawUsername = pendingUsername || 'alexmando15';
    const lower = rawUsername.toLowerCase();

    let resolved: CreatorProfile;
    if (SUSPICIOUS_HINTS.some((hint) => lower.includes(hint))) {
      resolved = {
        ...FRAUD_CREATOR,
        username: rawUsername,
        analyzedAt: 'Ahora mismo',
      };
    } else {
      const existing = CREATORS.find(
        (c) => c.username.toLowerCase() === lower
      );
      resolved = existing ?? {
        ...CREATORS[0],
        username: rawUsername,
        name: rawUsername,
        analyzedAt: 'Ahora mismo',
        hue: 140 + ((rawUsername.length * 7) % 40),
      };
    }

    setCreator(resolved);
    if (resolved.authentic) {
      setRecentCreators((prev) => {
        const filtered = prev.filter(
          (item) =>
            item.username.toLowerCase() !== resolved.username.toLowerCase()
        );
        return [resolved, ...filtered].slice(0, 5);
      });
    }
    setScreen('benford');
  }, [pendingUsername]);

  const openCreator = useCallback((selected: CreatorProfile) => {
    setCreator(selected);
    setArchetype(selected.lastArchetype);
    setScreen('score');
  }, []);

  const simulateFraudAccount = useCallback(() => {
    setCreator(FRAUD_CREATOR);
    setScreen('benford');
  }, []);

  const simulateEmptyState = useCallback(() => {
    setCreator(null);
    setScreen('score');
  }, []);

  const value = useMemo<BrandFitContextValue>(
    () => ({
      screen,
      go,
      mode,
      setMode,
      creator,
      setCreator,
      recentCreators,
      archetype,
      setArchetype,
      pendingUsername,
      startAnalysis,
      finishAnalysis,
      openCreator,
      simulateFraudAccount,
      simulateEmptyState,
    }),
    [
      screen,
      go,
      mode,
      creator,
      recentCreators,
      archetype,
      pendingUsername,
      startAnalysis,
      finishAnalysis,
      openCreator,
      simulateFraudAccount,
      simulateEmptyState,
    ]
  );

  return (
    <BrandFitContext.Provider value={value}>
      {children}
    </BrandFitContext.Provider>
  );
}

export function useBrandFit(): BrandFitContextValue {
  const ctx = useContext(BrandFitContext);
  if (!ctx) {
    throw new Error('useBrandFit must be used within a BrandFitProvider');
  }
  return ctx;
}
