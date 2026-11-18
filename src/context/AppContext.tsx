import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ArchetypeId, Creator, ScreenId } from '../types';
import { resolveCreator } from '../utils/analysis';

// Datos y funciones que estarán disponibles en cualquier pantalla
type AppContextValue = {
  screen: ScreenId;
  go: (screen: ScreenId) => void;
  creator: Creator | null;
  archetype: ArchetypeId;
  setArchetype: (archetype: ArchetypeId) => void;
  pendingUsername: string;
  startAnalysis: (username: string) => void;
  finishAnalysis: () => void;
  openCreator: (creator: Creator) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

/**
 * Proveedor del estado global del prototipo:
 * guarda en qué pantalla estamos, qué creador se está viendo y qué arquetipo está seleccionado.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenId>('home');
  const [creator, setCreator] = useState<Creator | null>(null);
  const [archetype, setArchetype] = useState<ArchetypeId>('tech');
  const [pendingUsername, setPendingUsername] = useState('');

  // Inicia la pantalla de progreso cuando el usuario presiona "Analizar creador"
  function startAnalysis(username: string) {
    setPendingUsername(username);
    setScreen('progress');
  }

  // Al terminar la barra de progreso, carga los datos simulados y pasa a Benford
  function finishAnalysis() {
    setCreator(resolveCreator(pendingUsername || 'alexmando15'));
    setScreen('benford');
  }

  // Abre directamente el puntaje de un creador desde "Análisis recientes"
  function openCreator(selected: Creator) {
    setCreator(selected);
    setArchetype(selected.lastArchetype);
    setScreen('score');
  }

  return (
    <AppContext.Provider
      value={{
        screen,
        go: setScreen,
        creator,
        archetype,
        setArchetype,
        pendingUsername,
        startAnalysis,
        finishAnalysis,
        openCreator,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/** Hook sencillo para usar el estado global dentro de cualquier pantalla. */
export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return context;
}
