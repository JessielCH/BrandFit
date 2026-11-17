import React from 'react';
import { useBrandFit } from '../context/BrandFitContext';
import { ChartColumnIcon } from '../components/icons/BrandFitIcons';
import { Button, EmptyState } from '../components/ui';
import { palette } from '../theme/tokens';

interface NoAnalysisScreenProps {
  kind?: 'analysis' | 'recs';
}

export function NoAnalysisScreen({ kind = 'analysis' }: NoAnalysisScreenProps) {
  const { go } = useBrandFit();

  return (
    <EmptyState
      icon={<ChartColumnIcon size={26} color={palette.primary} />}
      title={
        kind === 'recs' ? 'Aún no hay recomendaciones' : 'Aún no hay análisis'
      }
      body="Analiza un @username de TikTok para empezar."
      action={
        <Button onPress={() => go('home')}>Analizar un creador</Button>
      }
    />
  );
}
