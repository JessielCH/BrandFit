import type { Archetype, ArchetypeId } from '../types';

/** Lista de arquetipos de marca que se pueden elegir en el selector. */
export const ARCHETYPES: Archetype[] = [
  { id: 'tech', label: 'Tecnología / Innovación', short: 'Tecnología' },
  { id: 'bienestar', label: 'Bienestar / Estilo de vida', short: 'Bienestar' },
  { id: 'entretenimiento', label: 'Entretenimiento / Juvenil', short: 'Entretenimiento' },
  { id: 'finanzas', label: 'Finanzas / Confianza', short: 'Finanzas' },
  { id: 'causas', label: 'Causas sociales / Activismo', short: 'Causas sociales' },
];

/** Los 5 rasgos del modelo de personalidad Big Five. */
export const TRAITS = [
  'Apertura',
  'Responsabilidad',
  'Extraversión',
  'Amabilidad',
  'Neuroticismo',
] as const;

/** Puntaje ideal (0–100) de cada rasgo Big Five según el arquetipo elegido. */
export const IDEALS: Record<ArchetypeId, number[]> = {
  tech: [85, 87, 60, 55, 25],
  bienestar: [70, 65, 55, 85, 20],
  entretenimiento: [75, 40, 90, 70, 45],
  finanzas: [45, 90, 45, 65, 15],
  causas: [80, 60, 70, 90, 35],
};
