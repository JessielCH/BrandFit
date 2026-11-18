import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { ToneChip } from '../ui';
import type { Video } from '../../types';
import { hsl } from '../../utils/color';
import { colors, fonts, radius } from '../../theme';

type Props = {
  video: Video;
  rank: number;
};

/** Fila de un video en el Top 3: miniatura con degradado, título, engagement y tono. */
export function VideoItem({ video, rank }: Props) {
  return (
    <View style={styles.row}>
      <LinearGradient
        colors={[hsl(video.hue, 55, 78), hsl(video.hue, 50, 38)]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={styles.thumbnail}
      >
        <Play size={16} color={colors.surface} fill={colors.surface} />
        <Text style={styles.rank}>{rank}</Text>
      </LinearGradient>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {video.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.engagement}>{video.engagement.toFixed(2)}%</Text>
          <ToneChip tone={video.tone} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumbnail: {
    width: 48,
    height: 64,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rank: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.9)',
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.ink,
  },
  info: { flex: 1, minWidth: 0 },
  title: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  engagement: { fontFamily: fonts.bold, fontSize: 15, color: colors.primary },
});
