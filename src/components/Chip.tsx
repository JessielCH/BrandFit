// style: Componentes Chip, ScoreChip y ToneChip para visualización de badges y estados
// note: Adapta los estilos tailwind del prototipo original a StyleSheet de React Native

import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Tone } from '../types';
import { scoreTone } from '../data/mockData';
import { colors } from '../theme/colors';

export type ChipTone = 'neutral' | 'success' | 'warning' | 'danger';

interface ChipProps {
  children: ReactNode;
  tone?: ChipTone;
  style?: StyleProp<ViewStyle>;
}

export function Chip({ children, tone = 'neutral', style }: ChipProps) {
  const getContainerStyle = () => {
    switch (tone) {
      case 'success':
        return styles.successContainer;
      case 'warning':
        return styles.warningContainer;
      case 'danger':
        return styles.dangerContainer;
      case 'neutral':
      default:
        return styles.neutralContainer;
    }
  };

  const getTextStyle = () => {
    switch (tone) {
      case 'success':
        return styles.successText;
      case 'warning':
        return styles.warningText;
      case 'danger':
        return styles.dangerText;
      case 'neutral':
      default:
        return styles.neutralText;
    }
  };

  return (
    <View style={[styles.base, getContainerStyle(), style]}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[styles.text, getTextStyle()]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

export function ScoreChip({ score, style }: { score: number; style?: StyleProp<ViewStyle> }) {
  const tone = scoreTone(score);
  return (
    <Chip tone={tone} style={style}>
      <Text style={[styles.text, styles.boldScore, tone === 'success' && styles.successText, tone === 'warning' && styles.warningText, tone === 'danger' && styles.dangerText]}>
        {score}
      </Text>
    </Chip>
  );
}

export function ToneChip({ tone, style }: { tone: Tone; style?: StyleProp<ViewStyle> }) {
  const map: Record<Tone, ChipTone> = {
    positivo: 'success',
    neutro: 'neutral',
    negativo: 'neutral',
  };
  const label = tone.charAt(0).toUpperCase() + tone.slice(1);
  return (
    <Chip tone={map[tone]} style={style}>
      <Text style={[styles.text, map[tone] === 'success' ? styles.successText : styles.neutralText]}>
        {label}
      </Text>
    </Chip>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
  },
  boldScore: {
    fontWeight: '700',
    fontSize: 14,
  },
  neutralContainer: {
    backgroundColor: '#F1F5F9',
  },
  neutralText: {
    color: '#334155',
  },
  successContainer: {
    backgroundColor: colors.successSoft,
  },
  successText: {
    color: colors.successText,
  },
  warningContainer: {
    backgroundColor: colors.warningSoft,
  },
  warningText: {
    color: colors.warningText,
  },
  dangerContainer: {
    backgroundColor: colors.dangerSoft,
  },
  dangerText: {
    color: colors.dangerText,
  },
});
