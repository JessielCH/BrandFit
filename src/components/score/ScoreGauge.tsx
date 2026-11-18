import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, fonts } from '../../theme';

const SIZE = 230;
const STROKE = 14;
const RADIUS = 84;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Anillo circular hecho con SVG que muestra el Brand Fit Score de 0 a 100. */
export function ScoreGauge({ score }: { score: number }) {
  // Calcula cuánto del círculo debe pintarse según el porcentaje del score
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <View style={styles.container}>
      {/* Se rota -90 grados para que el arco empiece desde arriba */}
      <Svg width={SIZE} height={SIZE} viewBox="0 0 200 200" style={styles.svg}>
        <Circle cx={100} cy={100} r={RADIUS} fill="none" stroke={colors.primarySoft} strokeWidth={STROKE} />
        <Circle
          cx={100}
          cy={100}
          r={RADIUS}
          fill="none"
          stroke={colors.primary}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.caption}>de 100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: SIZE, height: SIZE },
  svg: { transform: [{ rotate: '-90deg' }] },
  center: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  score: {
    fontFamily: fonts.bold,
    fontSize: 80,
    lineHeight: 84,
    letterSpacing: -2,
    color: colors.primary,
  },
  caption: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 4 },
});
