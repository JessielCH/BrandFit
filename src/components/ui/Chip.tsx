import { StyleSheet, Text, View } from 'react-native';
import type { ChipTone, Tone } from '../../types';
import { scoreTone } from '../../utils/analysis';
import { colors, fonts, radius } from '../../theme';

// Colores de fondo y texto para cada variante de Chip
const TONE_COLORS: Record<ChipTone, { bg: string; text: string }> = {
  success: { bg: colors.successBg, text: colors.primaryDark },
  warning: { bg: colors.warningBg, text: colors.warningText },
  danger: { bg: colors.dangerBg, text: colors.dangerText },
  neutral: { bg: colors.slate100, text: colors.slate700 },
};

type Props = {
  label: string;
  tone?: ChipTone;
  bold?: boolean;
};

/** Etiqueta pequeña de color usada para puntajes, bonos y tonos. */
export function Chip({ label, tone = 'neutral', bold = false }: Props) {
  const { bg, text } = TONE_COLORS[tone];
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text, fontFamily: bold ? fonts.semibold : fonts.medium }]}>
        {label}
      </Text>
    </View>
  );
}

/** Chip que cambia de color automáticamente según el puntaje (verde, amarillo o rojo). */
export function ScoreChip({ score }: { score: number }) {
  return <Chip label={String(score)} tone={scoreTone(score)} bold />;
}

/** Chip que muestra el sentimiento de un video (Positivo, Neutro o Negativo). */
export function ToneChip({ tone }: { tone: Tone }) {
  const label = tone[0].toUpperCase() + tone.slice(1);
  return <Chip label={label} tone={tone === 'positivo' ? 'success' : 'neutral'} />;
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: { fontSize: 13 },
});
