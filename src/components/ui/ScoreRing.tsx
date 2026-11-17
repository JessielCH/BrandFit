import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { palette } from '../../theme/tokens';

interface ScoreRingProps {
  score: number;
  size?: number;
}

export function ScoreRing({ score, size = 224 }: ScoreRingProps) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    scaleAnim.setValue(0.85);
    opacityAnim.setValue(0.3);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 75,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [score, scaleAnim, opacityAnim]);

  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference * (1 - clamped / 100);

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        style={styles.svgRotated}
      >
        <Circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={palette.primarySoft}
          strokeWidth={14}
        />
        <Circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={palette.primary}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>

      <Animated.View
        style={[
          styles.centerOverlay,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.scoreNumber}>{clamped}</Text>
        <Text style={styles.scoreUnit}>de 100</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgRotated: {
    transform: [{ rotate: '-90deg' }],
  },
  centerOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 74,
    fontWeight: '800',
    letterSpacing: -2,
    color: palette.primary,
    lineHeight: 78,
    fontVariant: ['tabular-nums'],
  },
  scoreUnit: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '500',
    color: palette.muted,
  },
});
