import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ChipTone, ContentTone } from '../../types/brandfit';
import { scoreTone } from '../../data/creators';
import { palette, radii } from '../../theme/tokens';

interface ChipProps {
  children: React.ReactNode;
  tone?: ChipTone;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const TONE_MAP: Record<ChipTone, { bg: string; fg: string }> = {
  success: { bg: palette.successSoft, fg: palette.successText },
  warning: { bg: palette.warningSoft, fg: palette.warningText },
  danger: { bg: palette.dangerSoft, fg: palette.dangerText },
  neutral: { bg: '#F1F5F9', fg: palette.inkSecondary },
};

export function Chip({
  children,
  tone = 'neutral',
  style,
  textStyle,
}: ChipProps) {
  const colors = TONE_MAP[tone];
  return (
    <View style={[styles.chip, { backgroundColor: colors.bg }, style]}>
      <Text style={[styles.text, { color: colors.fg }, textStyle]}>
        {children}
      </Text>
    </View>
  );
}

export function ScoreChip({ score }: { score: number }) {
  return (
    <Chip
      tone={scoreTone(score)}
      style={styles.scoreChip}
      textStyle={styles.scoreText}
    >
      {score}
    </Chip>
  );
}

export function ToneChip({ tone }: { tone: ContentTone }) {
  const mapped: ChipTone = tone === 'positivo' ? 'success' : 'neutral';
  const label = tone.charAt(0).toUpperCase() + tone.slice(1);
  return <Chip tone={mapped}>{label}</Chip>;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  scoreChip: {
    minWidth: 36,
    justifyContent: 'center',
  },
  scoreText: {
    fontWeight: '700',
  },
});
