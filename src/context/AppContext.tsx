// feat: Proveedor de contexto global y hook useApp para la gestión del estado de navegación y análisis
// docs: Administra el flujo entre pantallas, modo de usuario (marca vs creador) y creador activo

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { AppContextType, ArchetypeId, Creator, Mode, ScreenId } from '../types';
import { CREATORS, FRAUD_CREATOR, SUSPICIOUS_HINTS } from '../data/mockData';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // state: Pantalla activa actual
  const [screen, setScreen] = useState<ScreenId>('home');

  // state: Modo de operación ('marca' o 'creador')
  const [mode, setMode] = useState<Mode>('marca');

  // state: Creador analizado en la sesión activa
  const [creator, setCreator] = useState<Creator | null>(null);

  // state: Arquetipo de marca seleccionado para la comparativa
  const [archetype, setArchetype] = useState<ArchetypeId>('tech');

  // state: Nombre de usuario en proceso de análisis
  const [pendingUsername, setPendingUsername] = useState<string>('');

  // feat: Navegación simple entre pantallas
  const go = useCallback((s: ScreenId) => {
    setScreen(s);
  }, []);

  // feat: Iniciar flujo de análisis y transicionar a pantalla de progreso
  const startAnalysis = useCallback((username: string) => {
    const cleanUsername = username.trim().replace(/^@/, '');
    setPendingUsername(cleanUsername);
    setScreen('progress');
  }, []);

  // feat: Finalizar análisis de métricas y determinar autenticidad
  const finishAnalysis = useCallback(() => {
    const username = pendingUsername || 'alexmando15';
    const lower = username.toLowerCase();

    let result: Creator;
    // note: Verificación heurística para simular detección de fraude en demos
    if (SUSPICIOUS_HINTS.some((hint) => lower.includes(hint))) {
      result = { ...FRAUD_CREATOR, username };
    } else {
      const known = CREATORS.find((c) => c.username.toLowerCase() === lower);
      result =
        known ?? {
          ...CREATORS[0],
          username,
          name: username,
          analyzedAt: 'Ahora',
          hue: 140 + ((username.length * 7) % 40),
        };
    }

    setCreator(result);
    setScreen('benford');
  }, [pendingUsername]);

  // feat: Abrir un creador directamente desde la lista de recientes
  const openCreator = useCallback((c: Creator) => {
    setCreator(c);
    setArchetype(c.lastArchetype);
    setScreen('score');
  }, []);

  // feat: Atajo de prueba para simular inmediatamente el estado de fraude estadístico
  const showFraud = useCallback(() => {
    setCreator(FRAUD_CREATOR);
    setScreen('benford');
  }, []);

  // feat: Reiniciar análisis actual y volver a la pantalla de inicio
  const resetAnalysis = useCallback(() => {
    setCreator(null);
    setPendingUsername('');
    setScreen('home');
  }, []);

  const value = useMemo<AppContextType>(
    () => ({
      screen,
      go,
      mode,
      setMode,
      creator,
      setCreator,
      archetype,
      setArchetype,
      pendingUsername,
      startAnalysis,
      finishAnalysis,
      openCreator,
      showFraud,
      resetAnalysis,
    }),
    [
      screen,
      go,
      mode,
      creator,
      archetype,
      pendingUsername,
      startAnalysis,
      finishAnalysis,
      openCreator,
      showFraud,
      resetAnalysis,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * @description Hook de conveniencia para acceder al contexto global de la aplicación.
 * @throws {Error} Si se consume fuera de un AppProvider.
 */
export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser utilizado dentro de un AppProvider');
  }
  return context;
}
