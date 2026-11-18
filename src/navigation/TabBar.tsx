import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChartColumn, House, Lightbulb, type LucideIcon } from 'lucide-react-native';
import type { ScreenId } from '../types';
import { colors, fonts } from '../theme';

type Tab = {
  label: string;
  icon: LucideIcon;
  screens: ScreenId[]; // Pantallas donde esta pestaña se muestra activa (verde)
  target: ScreenId; // Pantalla a la que lleva al tocar la pestaña
};

// Las 3 pestañas de la barra inferior
const TABS: Tab[] = [
  { label: 'Inicio', icon: House, screens: ['home'], target: 'home' },
  { label: 'Análisis', icon: ChartColumn, screens: ['progress', 'benford', 'score', 'bigfive'], target: 'score' },
  { label: 'Recomendaciones', icon: Lightbulb, screens: ['recs'], target: 'recs' },
];

type Props = {
  screen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
};

/** Barra de navegación inferior con las 3 secciones principales. */
export function TabBar({ screen, onNavigate }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {TABS.map(({ label, icon: Icon, screens, target }) => {
        const active = screens.includes(screen);
        const color = active ? colors.primary : colors.muted;
        return (
          <Pressable key={label} onPress={() => onNavigate(target)} style={styles.tab}>
            <Icon size={22} strokeWidth={active ? 2 : 1.6} color={color} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 4 },
  label: { fontFamily: fonts.medium, fontSize: 11 },
});
