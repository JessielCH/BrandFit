/**
 * @layer Infrastructure – Repositories
 * @boundedContext BC1 (Fraud & Benford Audit Context)
 *
 * Repositorio en memoria que simula la fuente de datos de Creadores Auditados.
 * Lenguaje Ubicuo: resolveAuditedCreator
 */

import { CREATORS, FRAUD_CREATOR } from '../../domain/models/constants'
import { hasSuspiciousPattern } from '../../domain/services/rules'
import type { Creator } from '../../domain/models/types'

/**
 * Resuelve un Creador Auditado a partir de su username.
 * 1. Si activa RN-02 → devuelve FRAUD_CREATOR.
 * 2. Si existe en CREATORS → devuelve ese Creator.
 * 3. Si no → genera un Creator auténtico simulado.
 */
export function resolveAuditedCreator(username: string): Creator {
  const lower = username.toLowerCase()

  // RN-02: cuenta con patrón sospechoso
  if (hasSuspiciousPattern(lower)) {
    return { ...FRAUD_CREATOR, username }
  }

  // Búsqueda en catálogo conocido
  const found = CREATORS.find((c) => c.username.toLowerCase() === lower)
  if (found) return found

  // Creador simulado genérico
  return {
    ...CREATORS[0],
    username,
    name: username,
    analyzedAt: 'Ahora',
    hue: 140 + ((username.length * 7) % 40),
  }
}
