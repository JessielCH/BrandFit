/**
 * @file creatorRepository.ts
 * @description Repositorio En-Memoria de Creadores Auditados (Capa de Infraestructura - DDD).
 * Provee las muestras de datos de creadores auténticos y del caso de anomalía de la Ley de Benford,
 * además del método de resolución de perfiles para el Caso de Uso de Auditoría.
 *
 * @author BrandFit Team
 */

import type { Creator } from '../../domain/models/types'
import { hasSuspiciousPattern } from '../../domain/services/rules'

/**
 * Catálogo de Creadores Auditados (Recent Audited Creators) almacenados en el repositorio local.
 */
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

/**
 * Entidad de prueba representativa de un Patrón Sospechoso / Granja de Bots (Fraud Creator).
 * Presenta distribución plana (anómala) en la Ley de Benford y engagement insignificante (0.42%).
 */
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

/**
 * Método de Repositorio: Resuelve o construye la entidad `Creator` tras ejecutar una auditoría.
 * Aplica la regla de negocio RN-02 (`hasSuspiciousPattern`) para devolver un perfil fraudulento
 * si el username contiene indicios de bots, o devuelve el perfil auténtico correspondiente.
 *
 * @param rawUsername - Nombre de usuario auditado
 * @returns Entidad `Creator` con todas sus métricas de dominio
 */
export function resolveAuditedCreator(rawUsername: string): Creator {
  const u = rawUsername || 'alexmando15'
  const lower = u.toLowerCase()

  if (hasSuspiciousPattern(lower)) {
    return { ...FRAUD_CREATOR, username: u }
  }

  const known = CREATORS.find((c) => c.username.toLowerCase() === lower)
  if (known) {
    return known
  }

  return {
    ...CREATORS[0],
    username: u,
    name: u,
    analyzedAt: 'Ahora',
    hue: 140 + ((u.length * 7) % 40),
  }
}
