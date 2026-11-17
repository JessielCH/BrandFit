// feat: Pantalla de fallback cuando se intenta ver análisis o recomendaciones sin datos cargados
// docs: Muestra un EmptyState con llamada a la acción para redirigir al usuario al formulario inicial

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/EmptyState';
import { ChartColumn } from '../components/Icons';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';

interface NoAnalysisProps {
  kind?: 'analysis' | 'recs';
}

export function NoAnalysisScreen({ kind = 'analysis' }: NoAnalysisProps) {
  const { go } = useApp();

  return (
    <View style={styles.container}>
      <EmptyState
        icon={<ChartColumn size={28} color={colors.primary} strokeWidth={2} />}
        title={kind === 'recs' ? 'Aún no hay recomendaciones' : 'Aún no hay análisis'}
        body="Analiza un @username de TikTok para empezar a descubrir métricas de compatibilidad."
        action={
          <Button onPress={() => go('home')}>
            Analizar un creador
          </Button>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
