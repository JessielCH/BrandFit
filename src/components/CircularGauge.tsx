// feat: Indicador circular de porcentaje (Gauge) renderizado con react-native-svg
// docs: Muestra el Brand Fit Score sobre 100 con arco dinámico de color esmeralda y métrica central

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '../theme/colors';

interface CircularGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularGauge({ score, size = 220, strokeWidth = 14 }: CircularGaugeProps) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  // note: Limita el valor entre 0 y 100 para evitar desbordes en el arco visual
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (circumference * clampedScore) / 100;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          {/* Círculo de fondo tenue */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.primarySoft}
            strokeWidth={strokeWidth}
          />
          {/* Arco de progreso del Score */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      {/* Contenido central: Número del score y escala */}
      <View style={styles.centerTextContainer}>
        <Text style={styles.scoreText}>{clampedScore}</Text>
        <Text style={styles.scaleText}>de 100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 72,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -2,
    lineHeight: 80,
  },
  scaleText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.muted,
    marginTop: -4,
  },
});
