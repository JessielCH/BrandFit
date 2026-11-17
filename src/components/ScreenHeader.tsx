// feat: Componente ScreenHeader con botón de retorno, título grande y ranura para acciones
// style: Asegura coherencia tipográfica y espaciado consistente en el encabezado de cada pantalla

import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from './Icons';
import { colors } from '../theme/colors';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
}

export function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={20} color={colors.muted} strokeWidth={2} />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      )}
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {right && <View style={styles.rightSlot}>{right}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginLeft: -4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  backText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.muted,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: colors.muted,
  },
  rightSlot: {
    marginLeft: 8,
  },
});
