/**
 * @file constants.ts
 * @description Parámetros e Invariantes del Dominio (Domain Constants) de BrandFit.
 * Define los Arquetipos de Marca, las dimensiones psicométricas Big Five (OCEAN),
 * los Vectores Ideales de Personalidad y la distribución teórica de la Ley de Benford.
 *
 * @author BrandFit Team
 */

import type { ArchetypeId, Archetype } from './types'

/**
 * Catálogo oficial de Arquetipos de Marca (Brand Archetypes) del dominio de Afinidad.
 */
export const ARCHETYPES: Archetype[] = [
  { id: 'tech', label: 'Tecnología / Innovación', short: 'Tecnología' },
  { id: 'bienestar', label: 'Bienestar / Estilo de vida', short: 'Bienestar' },
  { id: 'entretenimiento', label: 'Entretenimiento / Juvenil', short: 'Entretenimiento' },
  { id: 'finanzas', label: 'Finanzas / Confianza', short: 'Finanzas' },
  { id: 'causas', label: 'Causas sociales / Activismo', short: 'Causas sociales' },
]

/**
 * Dimensiones canónicas del Perfil Psicométrico Big Five (Modelo OCEAN) en el Lenguaje Ubicuo.
 */
export const TRAITS = [
  'Apertura',
  'Responsabilidad',
  'Extraversión',
  'Amabilidad',
  'Neuroticismo',
] as const

/**
 * Vectores Ideales de Personalidad (Ideal Archetype Vectors) para cada Arquetipo de Marca [O, C, E, A, N].
 * Regla de Negocio: Sirven como punto de referencia para medir la Brecha Psicométrica (Trait Gap).
 */
export const IDEALS: Record<ArchetypeId, number[]> = {
  tech: [85, 87, 60, 55, 25],
  bienestar: [70, 65, 55, 85, 20],
  entretenimiento: [75, 40, 90, 70, 45],
  finanzas: [45, 90, 45, 65, 15],
  causas: [80, 60, 70, 90, 35],
}

/**
 * Distribución Natural Esperada según la Ley de Benford para los primeros dígitos (1 al 9):
 * Fórmula matemática del dominio: P(d) = log10(1 + 1/d) * 100
 */
export const BENFORD_EXPECTED = [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6]

/**
 * Etapas del Flujo de Auditoría de un Creador (Creator Audit Pipeline) en el Lenguaje Ubicuo.
 */
export const ANALYSIS_STEPS = [
  'Recolectando datos públicos',
  'Verificando autenticidad (Ley de Benford)',
  'Estimando personalidad Big Five',
  'Calculando tono y engagement',
  'Generando Brand Fit Score',
]

/**
 * Indicios de Anomalía (Suspicious Hints): patrones en el username que disparan la regla
 * de detección de fraude / granja de bots en la simulación del dominio.
 */
export const SUSPICIOUS_HINTS = ['viralboost', 'bot', 'fake', 'compra']
