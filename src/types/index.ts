// docs: Definición de tipos de datos, interfaces y contratos de la aplicación BrandFit Mobile
// note: Refleja los modelos validados en el prototipo de Figma para compatibilidad completa

/**
 * @description Modo de operación de la aplicación.
 * - 'marca': Orientado a empresas buscando influencers idóneos.
 * - 'creador': Orientado al influencer evaluando su propia cuenta y fit de patrocinio.
 */
export type Mode = 'marca' | 'creador';

/**
 * @description Identificadores de las pantallas del flujo de navegación.
 */
export type ScreenId = 'home' | 'progress' | 'benford' | 'score' | 'bigfive' | 'recs';

/**
 * @description Arquetipos de marca soportados para el cálculo de compatibilidad.
 */
export type ArchetypeId = 'tech' | 'bienestar' | 'entretenimiento' | 'finanzas' | 'causas';

/**
 * @description Clasificación del sentimiento o tono predominante en el contenido.
 */
export type Tone = 'positivo' | 'neutro' | 'negativo';

/**
 * @description Estructura de información para un video destacado analizado.
 */
export interface Video {
  title: string;
  engagement: number;
  views: string;
  tone: Tone;
  hue: number;
}

/**
 * @description Información completa de un creador analizado por el algoritmo de BrandFit.
 */
export interface Creator {
  username: string;
  name: string;
  authentic: boolean;
  confidence: number;
  benfordObserved: number[];
  followers: string;
  engagement: number;
  posts: number;
  avgViews: string;
  tone: {
    pos: number;
    neu: number;
    neg: number;
  };
  bigFive: number[];
  scores: Record<ArchetypeId, number>;
  topVideos: Video[];
  format: string;
  forBrand: string;
  forCreator: string;
  analyzedAt: string;
  lastArchetype: ArchetypeId;
  hue: number;
}

/**
 * @description Contrato del contexto global de la aplicación.
 */
export interface AppContextType {
  screen: ScreenId;
  go: (s: ScreenId) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  creator: Creator | null;
  setCreator: (c: Creator | null) => void;
  archetype: ArchetypeId;
  setArchetype: (a: ArchetypeId) => void;
  pendingUsername: string;
  startAnalysis: (username: string) => void;
  finishAnalysis: () => void;
  openCreator: (c: Creator) => void;
  showFraud: () => void;
  resetAnalysis: () => void;
}
