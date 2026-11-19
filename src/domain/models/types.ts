/**
 * @layer Domain – Models
 * @boundedContext Transversal (BC1, BC2, BC3)
 *
 * Lenguaje Ubicuo:
 *   Creator   → Aggregate Root: influencer de TikTok bajo auditoría.
 *   Video     → Value Object: uno de los top-3 videos por engagement.
 *   Archetype → Value Object: identidad corporativa de la marca evaluada.
 *   Tone      → Tipo inmutable: clasificación editorial del contenido.
 *   ScoreTone → Tipo inmutable: nivel semántico del Brand Fit Score (RN-03).
 */

export type ScreenId = 'home' | 'progress' | 'benford' | 'score' | 'bigfive' | 'recs'

/** Tono Editorial del contenido del creador (Lenguaje Ubicuo: Tone) */
export type Tone = 'positivo' | 'neutro' | 'negativo'

/** Semáforo del Brand Fit Score – RN-03 (Lenguaje Ubicuo: ScoreTone) */
export type ScoreTone = 'success' | 'warning' | 'danger'

/** Identificador único de un Arquetipo de Marca */
export type ArchetypeId = 'tech' | 'bienestar' | 'entretenimiento' | 'finanzas' | 'causas'

/**
 * Value Object: Muestra de Video Destacado (Lenguaje Ubicuo: Video / topVideos)
 * No tiene identidad propia; se define completamente por sus atributos.
 */
export type Video = {
  title: string
  engagement: number
  views: string
  tone: Tone
  hue: number
}

/**
 * Value Object: Arquetipo de Marca (Lenguaje Ubicuo: Archetype)
 * Define la identidad corporativa inmutable contra la que se evalúa al creador.
 */
export type Archetype = {
  id: ArchetypeId
  label: string
  short: string
}

/**
 * Aggregate Root: Creator (Creador Auditado)
 * Entidad raíz que agrupa y protege la coherencia de todos sus objetos de valor.
 * Se identifica de forma única por su `username` (identidad del dominio).
 */
export type Creator = {
  username: string
  name: string
  /** Veredicto de Autenticidad (BC1). true = auténtica, false = patrón sospechoso */
  authentic: boolean
  /** Confianza estadística del veredicto de autenticidad (0-100) */
  confidence: number
  /** Distribución observada del primer dígito (1-9) — Ley de Benford */
  benfordObserved: number[]
  followers: string
  /** Tasa de engagement como porcentaje (e.g. 7.81 = 7.81%) */
  engagement: number
  posts: number
  avgViews: string
  /** Distribución de Tono Editorial de los 10 videos analizados */
  tone: { pos: number; neu: number; neg: number }
  /** Perfil Psicométrico Big Five OCEAN (BC2) */
  bigFive: number[]
  /** Brand Fit Score indexado por ArchetypeId (BC2) */
  scores: Record<ArchetypeId, number>
  /** Top 3 videos por engagement (BC3) */
  topVideos: Video[]
  /** Formato de contenido sugerido para la campaña (BC3) */
  format: string
  analyzedAt: string
  lastArchetype: ArchetypeId
  hue: number
}
