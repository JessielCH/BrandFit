/**
 * @file types.ts
 * @description Entidades, Objetos de Valor (Value Objects) y tipos del Dominio Principal (Core Domain)
 * utilizando el Lenguaje Ubicuo (Ubiquitous Language) de BrandFit.
 *
 * Conceptos del Lenguaje Ubicuo:
 * - Creator (Creador de Contenido): Entidad Raíz (Aggregate Root) que agrupa la auditoría de un influencer.
 * - BenfordAudit (Auditoría de Benford): Objeto de Valor que representa el veredicto de autenticidad estadística.
 * - PsychometricProfile (Perfil Psicométrico Big Five / OCEAN): Vector de 5 rasgos de personalidad.
 * - BrandArchetype (Arquetipo de Marca): Identidad corporativa contra la cual se mide el Brand Fit Score.
 * - VideoSample (Muestra de Video): Publicación auditada con su tasa de engagement y tono editorial.
 *
 * @author BrandFit Team
 */

/** Identificadores de las pantallas del flujo móvil de BrandFit (Subdominio de Navegación) */
export type ScreenId = 'home' | 'progress' | 'benford' | 'score' | 'bigfive' | 'recs'

/** Identificadores de Arquetipos de Marca (Brand Archetype) soportados en el Bounded Context de Afinidad */
export type ArchetypeId =
  | 'tech'
  | 'bienestar'
  | 'entretenimiento'
  | 'finanzas'
  | 'causas'

/** Tono Editorial (Editorial Tone) de un video publicado */
export type Tone = 'positivo' | 'neutro' | 'negativo'

/** Tono semántico del Brand Fit Score (para clasificación visual verde, amarillo o rojo) */
export type ScoreTone = 'success' | 'warning' | 'danger'

/**
 * Value Object: Muestra de Video (VideoSample / Video)
 * Representa una publicación individual auditada de un creador con su rendimiento orgánico.
 */
export type Video = {
  /** Título o descripción del video */
  title: string
  /** Tasa de Engagement (Engagement Rate) porcentual calculada para este contenido */
  engagement: number
  /** Vistas formateadas como texto (e.g. '84.2K') */
  views: string
  /** Clasificación del Tono Editorial (Editorial Tone) del contenido */
  tone: Tone
  /** Valor de matiz HSL (0-360) para identidad visual del thumbnail */
  hue: number
}

/**
 * Aggregate Root / Entidad Principal: Creador Auditado (Creator)
 * Encapsula la identidad del influencer, su Auditoría de Benford, su Perfil Psicométrico (Big Five),
 * sus puntajes de Brand Fit por Arquetipo y sus Recomendaciones de Contenido.
 */
export type Creator = {
  /** Handle o nombre de usuario del creador en TikTok (e.g. 'alexmando15') */
  username: string
  /** Nombre visible del perfil */
  name: string
  /** Veredicto de Autenticidad: indica si la cuenta supera la Auditoría de la Ley de Benford */
  authentic: boolean
  /** Nivel de Confianza Estadística del veredicto de Benford (0-100%) */
  confidence: number
  /** Distribución Observada de Benford: frecuencias del primer dígito (1 al 9) en sus métricas */
  benfordObserved: number[]
  /** Total de seguidores formateado (e.g. '142.8K') */
  followers: string
  /** Tasa media de Engagement (Engagement Rate) del perfil en porcentaje */
  engagement: number
  /** Cantidad de videos muestreados en la auditoría (por regla de negocio: 10 videos) */
  posts: number
  /** Promedio de reproducciones por video */
  avgViews: string
  /** Desglose del Tono Editorial general (positivo, neutro, negativo) */
  tone: { pos: number; neu: number; neg: number }
  /** Perfil Psicométrico Big Five (OCEAN): [Apertura, Responsabilidad, Extraversión, Amabilidad, Neuroticismo] */
  bigFive: number[]
  /** Mapa de Brand Fit Scores (0-100) calculados para cada Arquetipo de Marca */
  scores: Record<ArchetypeId, number>
  /** Top 3 Videos destacados ordenados por mayor Engagement Rate */
  topVideos: Video[]
  /** Recomendación de Formato de Contenido (Content Format Recommendation) accionable para la marca */
  format: string
  /** Marca temporal de la auditoría (e.g. 'Hoy, 10:24') */
  analyzedAt: string
  /** Último Arquetipo de Marca con el que se evaluó a este creador */
  lastArchetype: ArchetypeId
  /** Matiz cromático HSL base para la identidad visual del avatar */
  hue: number
}

/**
 * Value Object: Arquetipo de Marca (Brand Archetype)
 * Define una identidad corporativa con su etiqueta descriptiva completa y nombre corto.
 */
export type Archetype = {
  /** Identificador único del arquetipo */
  id: ArchetypeId
  /** Nombre completo del arquetipo en el Lenguaje Ubicuo (e.g. 'Tecnología / Innovación') */
  label: string
  /** Nombre corto para selectores compactos (e.g. 'Tecnología') */
  short: string
}
