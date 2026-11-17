// feat: Barra de navegación inferior móvil (TabBar) con soporte para Safe Area Insets
// note: Mapea las 6 pantallas del flujo a 3 pestañas principales (Inicio, Análisis, Recomendaciones)

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { House, ChartColumn, Lightbulb } from './Icons';
import { ScreenId } from '../types';
import { colors } from '../theme/colors';

interface TabItem {
  id: string;
  label: string;
  icon: (props: { size?: number; color?: string; strokeWidth?: number }) => React.ReactElement;
  screens: ScreenId[];
  target: ScreenId;
}

const TABS: TabItem[] = [
  { id: 'inicio', label: 'Inicio', icon: House, screens: ['home'], target: 'home' },
  {
    id: 'analisis',
    label: 'Análisis',
    icon: ChartColumn,
    screens: ['progress', 'benford', 'score', 'bigfive'],
    target: 'score',
  },
  { id: 'recs', label: 'Recomendaciones', icon: Lightbulb, screens: ['recs'], target: 'recs' },
];

interface TabBarProps {
  screen: ScreenId;
  go: (s: ScreenId) => void;
}

export function TabBar({ screen, go }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const isActive = tab.screens.includes(screen);
          const Icon = tab.icon;
          const color = isActive ? colors.primary : colors.muted;

          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => go(tab.target)}
              style={styles.tabButton}
            >
              <Icon size={22} color={color} strokeWidth={isActive ? 2.4 : 1.8} />
              <Text style={[styles.tabLabel, { color }, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 8,
    // style: Sombra suave superior
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  activeTabLabel: {
    fontWeight: '700',
  },
});
