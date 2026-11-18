/**
 * Distribución teórica esperada (%) del primer dígito (1 al 9) según la Ley de Benford.
 * Sirve como referencia visual para comparar contra los datos del creador.
 */
export const BENFORD_EXPECTED = [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6];

/** Pasos que se muestran uno por uno en la pantalla de carga simulada. */
export const ANALYSIS_STEPS = [
  'Recolectando datos públicos',
  'Verificando autenticidad (Ley de Benford)',
  'Estimando personalidad Big Five',
  'Calculando tono y engagement',
  'Generando Brand Fit Score',
];

/** Si el @username escrito contiene alguna de estas palabras, se muestra el caso de cuenta sospechosa. */
export const SUSPICIOUS_HINTS = ['viralboost', 'bot', 'fake', 'compra'];
