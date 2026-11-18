import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { hsl } from '../../utils/color';
import { colors, fonts } from '../../theme';

type Props = {
  username: string;
  hue: number;
  size?: number;
};

/** Círculo con degradado verde y las 2 primeras letras del @username en mayúsculas. */
export function Avatar({ username, hue, size = 40 }: Props) {
  return (
    <LinearGradient
      colors={[hsl(hue, 60, 52), hsl(hue + 40, 58, 40)]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>
        {username.slice(0, 2).toUpperCase()}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.surface, fontFamily: fonts.semibold },
});
