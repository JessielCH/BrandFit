// Identificadores de las 6 pantallas del prototipo
export type ScreenId = 'home' | 'progress' | 'benford' | 'score' | 'bigfive' | 'recs';

// Identificadores de los 5 arquetipos de marca disponibles
export type ArchetypeId = 'tech' | 'bienestar' | 'entretenimiento' | 'finanzas' | 'causas';

// Tono emocional detectado en los videos
export type Tone = 'positivo' | 'neutro' | 'negativo';

// Variantes de color para las etiquetas (Chip)
export type ChipTone = 'success' | 'warning' | 'danger' | 'neutral';

// Estructura de un arquetipo de marca
export type Archetype = {
  id: ArchetypeId;
  label: string;
  short: string;
};

// Estructura de cada video destacado en la pantalla de recomendaciones
export type Video = {
  title: string;
  engagement: number;
  views: string;
  tone: Tone;
  hue: number; // Tono de color HSL para generar la miniatura
};

// Estructura con todos los datos simulados de un creador de TikTok
export type Creator = {
  username: string;
  name: string;
  authentic: boolean; // true = cuenta real, false = patrón sospechoso
  confidence: number;
  benfordObserved: number[]; // Porcentajes del dígito 1 al 9 observados
  followers: string;
  engagement: number;
  posts: number;
  avgViews: string;
  tone: { pos: number; neu: number; neg: number };
  bigFive: number[]; // Puntajes en los 5 rasgos de personalidad
  scores: Record<ArchetypeId, number>; // Brand Fit Score por cada arquetipo
  topVideos: Video[];
  format: string;
  recommendation: string; // Recomendación general de colaboración
  analyzedAt: string;
  lastArchetype: ArchetypeId;
  hue: number;
};
