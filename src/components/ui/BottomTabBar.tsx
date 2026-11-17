import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenId } from '../../types/brandfit';
import {
  HouseIcon,
  ChartColumnIcon,
  LightbulbIcon,
  IconProps,
} from '../icons/BrandFitIcons';
import { palette } from '../../theme/tokens';

interface BottomTabBarProps {
  screen: ScreenId;
  go: (target: ScreenId) => void;
}

const TABS: {
  id: string;
  label: string;
  Icon: React.ComponentType<IconProps>;
  screens: ScreenId[];
  target: ScreenId;
}[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    Icon: HouseIcon,
    screens: ['home'],
    target: 'home',
  },
  {
    id: 'analisis',
    label: 'Análisis',
    Icon: ChartColumnIcon,
    screens: ['progress', 'benford', 'score', 'bigfive'],
    target: 'score',
  },
  {
    id: 'recs',
    label: 'Recomendaciones',
    Icon: LightbulbIcon,
    screens: ['recs'],
    target: 'recs',
  },
];

export function BottomTabBar({ screen, go }: BottomTabBarProps) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const active = tab.screens.includes(screen);
        const Icon = tab.Icon;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.75}
            onPress={() => go(tab.target)}
            style={styles.tabItem}
          >
            <Icon
              size={22}
              color={active ? palette.primary : palette.muted}
              strokeWidth={active ? 2.1 : 1.7}
            />
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: palette.line,
    backgroundColor: palette.surface,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 14,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: palette.muted,
  },
  tabLabelActive: {
    color: palette.primary,
    fontWeight: '700',
  },
});
