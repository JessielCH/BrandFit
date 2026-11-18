import { ChartColumn } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { Button, EmptyState } from '../components/ui';
import { colors } from '../theme';

type Props = {
  kind?: 'analysis' | 'recs';
};

/** Pantalla de estado vacío cuando el usuario toca una pestaña sin haber analizado a nadie aún. */
export function NoAnalysisScreen({ kind = 'analysis' }: Props) {
  const { go } = useApp();

  return (
    <EmptyState
      icon={<ChartColumn size={26} strokeWidth={1.75} color={colors.primary} />}
      title={kind === 'recs' ? 'Aún no hay recomendaciones' : 'Aún no hay análisis'}
      body="Analiza un @username de TikTok para empezar."
      action={<Button label="Analizar un creador" onPress={() => go('home')} />}
    />
  );
}
