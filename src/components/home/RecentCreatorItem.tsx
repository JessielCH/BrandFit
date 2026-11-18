import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Avatar, Card, ScoreChip } from '../ui';
import type { Creator } from '../../types';
import { archetypeLabel } from '../../utils/analysis';
import { colors, fonts } from '../../theme';

type Props = {
  creator: Creator;
  onPress: () => void;
};

/** Tarjeta de un creador en la lista de "Análisis recientes". */
export function RecentCreatorItem({ creator, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <Avatar username={creator.username} hue={creator.hue} />
          <View style={styles.texts}>
            <Text style={styles.username} numberOfLines={1}>
              @{creator.username}
            </Text>
            <Text style={styles.archetype} numberOfLines={1}>
              {archetypeLabel(creator.lastArchetype)}
            </Text>
          </View>
          <ScoreChip score={creator.scores[creator.lastArchetype]} />
          <ChevronRight size={18} color={colors.placeholder} />
        </Card>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  pressed: { borderColor: colors.primaryBorder },
  texts: { flex: 1, minWidth: 0 },
  username: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  archetype: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
});
