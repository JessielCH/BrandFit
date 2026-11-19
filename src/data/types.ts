/**
 * @file types.ts
 * @description Definiciones de tipos e interfaces TypeScript para BrandFit Mobile.
 * Modela las pantallas de navegación, creadores, métricas, arquetipos de marca y publicaciones.
 *
 * @author BrandFit Team
 */

/** Identificadores de las pantallas del flujo móvil de BrandFit */
export type ScreenId = 'home' | 'progress' | 'benford' | 'score' | 'bigfive' | 'recs'

/** Identificadores de arquetipos de marca soportados en la evaluación de afinidad */
export type ArchetypeId =
  | 'tech'
  | 'bienestar'
  | 'entretenimiento'
  | 'finanzas'
  | 'causas'

/** Tono editorial de un video publicado */
export type Tone = 'positivo' | 'neutro' | 'negativo'

/** Tono semántico del puntaje de Brand Fit (para colores verde, amarillo o rojo) */
export type ScoreTone = 'success' | 'warning' | 'danger'

/**
 * Representa una publicación de video individual de un creador.
 */
export type Video = {
  /** Título o descripción del video */
  title: string
  /** Tasa de engagement porcentual calculada para este contenido */
  engagement: number
  /** Vistas formateadas como texto (e.g. '84.2K') */
  views: string
  /** Clasificación del tono emocional del contenido */
  tone: Tone
  /** Valor de matiz HSL (0-360) para generar el thumbnail con gradiente */
  hue: number
}

/**
 * Entidad principal que representa un creador de contenido con sus métricas auditadas.
 */
export type Creator = {
  /** Nombre de usuario del creador en la red social (e.g. 'alexmando15') */
  username: string
  /** Nombre visible del perfil */
  name: string
  /** Indica si la cuenta supera el filtro de autenticidad de la Ley de Benford */
  authentic: boolean
  /** Porcentaje de confianza del veredicto estadístico (0-100) */
  confidence: number
  /** Distribución observada del primer dígito de métricas para los dígitos del 1 al 9 */
  benfordObserved: number[]
  /** Total de seguidores formateado como texto (e.g. '142.8K') */
  followers: string
  /** Tasa media de engagement del perfil en porcentaje */
  engagement: number
  /** Cantidad total de publicaciones en el perfil */
  posts: number
  /** Promedio de reproducciones por video */
  avgViews: string
  /** Desglose porcentual del tono editorial general */
  tone: { pos: number; neu: number; neg: number }
  /** Puntuaciones en las 5 dimensiones psicométricas Big Five (OCEAN): [O, C, E, A, N] */
  bigFive: number[]
  /** Diccionario de puntajes Brand Fit calculados para cada arquetipo disponible */
  scores: Record<ArchetypeId, number>
  /** Lista de los videos más destacados por engagement */
  topVideos: Video[]
  /** Formato de contenido recomendado con mayor tracción en la audiencia */
  format: string
  /** Fecha o indicación de cuándo se realizó la auditoría (e.g. 'Hace 2 horas') */
  analyzedAt: string
  /** Último arquetipo con el que se comparó este creador */
  lastArchetype: ArchetypeId
  /** Matiz cromático HSL base para la identidad visual del perfil */
  hue: number
}

/**
 * Definición descriptiva de un arquetipo de marca.
 */
export type Archetype = {
  /** Identificador único del arquetipo */
  id: ArchetypeId
  /** Nombre completo con subtítulo (e.g. 'Tech Innovator · Tecnología y Futuro') */
  label: string
  /** Nombre corto para etiquetas y selectores compactos (e.g. 'Tech Innovator') */
  short: string
}
