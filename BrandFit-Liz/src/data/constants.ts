/**
 * Constantes y datos de ejemplo de BrandFit.
 * Migrado desde src/brandfit/data.ts del prototipo web.
 */
import type { ArchetypeId, Creator, Archetype } from './types'

export const ARCHETYPES: Archetype[] = [
  { id: 'tech', label: 'Tecnología / Innovación', short: 'Tecnología' },
  { id: 'bienestar', label: 'Bienestar / Estilo de vida', short: 'Bienestar' },
  { id: 'entretenimiento', label: 'Entretenimiento / Juvenil', short: 'Entretenimiento' },
  { id: 'finanzas', label: 'Finanzas / Confianza', short: 'Finanzas' },
  { id: 'causas', label: 'Causas sociales / Activismo', short: 'Causas sociales' },
]

export const TRAITS = [
  'Apertura',
  'Responsabilidad',
  'Extraversión',
  'Amabilidad',
  'Neuroticismo',
] as const

/** Perfil ideal Big Five por arquetipo (mismo orden que TRAITS). */
export const IDEALS: Record<ArchetypeId, number[]> = {
  tech: [85, 87, 60, 55, 25],
  bienestar: [70, 65, 55, 85, 20],
  entretenimiento: [75, 40, 90, 70, 45],
  finanzas: [45, 90, 45, 65, 15],
  causas: [80, 60, 70, 90, 35],
}

export const BENFORD_EXPECTED = [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6]

export const ANALYSIS_STEPS = [
  'Recolectando datos públicos',
  'Verificando autenticidad (Ley de Benford)',
  'Estimando personalidad Big Five',
  'Calculando tono y engagement',
  'Generando Brand Fit Score',
]

export const SUSPICIOUS_HINTS = ['viralboost', 'bot', 'fake', 'compra']

/** Creadores de ejemplo para la lista de recientes. */
export const CREATORS: Creator[] = [
  {
    username: 'alexmando15',
    name: 'Alex Mando',
    authentic: true,
    confidence: 92,
    benfordObserved: [31.4, 16.8, 13.1, 9.2, 8.4, 6.1, 5.9, 4.7, 4.4],
    followers: '1.5K',
    engagement: 7.81,
    posts: 10,
    avgViews: '65.350',
    tone: { pos: 8, neu: 1, neg: 1 },
    bigFive: [25, 30, 72, 68, 38],
    scores: { tech: 68, bienestar: 71, entretenimiento: 74, finanzas: 58, causas: 63 },
    topVideos: [
      { title: 'Lo que nadie te cuenta de mudarte solo', engagement: 11.4, views: '98.2K', tone: 'positivo', hue: 160 },
      { title: 'Mi rutina de mañana con 3 canciones', engagement: 7.29, views: '71.0K', tone: 'positivo', hue: 140 },
      { title: 'Probando el gadget más viral del mes', engagement: 7.14, views: '64.5K', tone: 'neutro', hue: 175 },
    ],
    format: 'Storytelling personal corto con música: 11.4% de engagement vs 7.8% promedio.',
    analyzedAt: 'Hoy, 10:24',
    lastArchetype: 'tech',
    hue: 158,
  },
  {
    username: 'musicadefresh',
    name: 'Música de Fresh',
    authentic: true,
    confidence: 89,
    benfordObserved: [29.2, 18.4, 12.0, 10.3, 7.4, 7.0, 5.5, 5.4, 4.8],
    followers: '12.4K',
    engagement: 6.42,
    posts: 10,
    avgViews: '41.870',
    tone: { pos: 7, neu: 3, neg: 0 },
    bigFive: [78, 45, 66, 74, 30],
    scores: { tech: 64, bienestar: 71, entretenimiento: 79, finanzas: 52, causas: 69 },
    topVideos: [
      { title: 'Cover acústico en el metro', engagement: 9.8, views: '120K', tone: 'positivo', hue: 150 },
      { title: 'Componiendo un coro en 60 segundos', engagement: 7.1, views: '54.3K', tone: 'positivo', hue: 165 },
      { title: 'Reaccionando a mis primeras canciones', engagement: 6.6, views: '38.9K', tone: 'neutro', hue: 135 },
    ],
    format: 'Música en vivo con proceso visible: 9.8% de engagement vs 6.4% promedio.',
    analyzedAt: 'Ayer, 18:02',
    lastArchetype: 'bienestar',
    hue: 172,
  },
]

/** Cuenta de ejemplo para el estado de fraude. */
export const FRAUD_CREATOR: Creator = {
  username: 'viralboost.mx',
  name: 'Viral Boost',
  authentic: false,
  confidence: 31,
  benfordObserved: [12.2, 11.8, 12.6, 11.4, 10.9, 11.7, 9.8, 10.1, 9.5],
  followers: '210K',
  engagement: 0.42,
  posts: 10,
  avgViews: '3.210',
  tone: { pos: 3, neu: 6, neg: 1 },
  bigFive: [40, 35, 50, 45, 50],
  scores: { tech: 22, bienestar: 19, entretenimiento: 27, finanzas: 12, causas: 15 },
  topVideos: [],
  format: '',
  analyzedAt: 'Hoy',
  lastArchetype: 'tech',
  hue: 150,
}
