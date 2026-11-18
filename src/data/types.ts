/**
 * Tipos base de la aplicación BrandFit.
 * Migrado desde src/brandfit/data.ts del prototipo web.
 */

export type ScreenId = 'home' | 'progress' | 'benford' | 'score' | 'bigfive' | 'recs'

export type ArchetypeId =
  | 'tech'
  | 'bienestar'
  | 'entretenimiento'
  | 'finanzas'
  | 'causas'

export type Tone = 'positivo' | 'neutro' | 'negativo'

export type ScoreTone = 'success' | 'warning' | 'danger'

export type Video = {
  title: string
  engagement: number
  views: string
  tone: Tone
  hue: number
}

export type Creator = {
  username: string
  name: string
  authentic: boolean
  confidence: number
  benfordObserved: number[]
  followers: string
  engagement: number
  posts: number
  avgViews: string
  tone: { pos: number; neu: number; neg: number }
  bigFive: number[]
  scores: Record<ArchetypeId, number>
  topVideos: Video[]
  format: string
  analyzedAt: string
  lastArchetype: ArchetypeId
  hue: number
}

export type Archetype = {
  id: ArchetypeId
  label: string
  short: string
}
