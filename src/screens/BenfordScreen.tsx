import { StyleSheet, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { Button, ScreenContainer, ScreenHeader } from '../components/ui';
import { VerdictCard } from '../components/benford/VerdictCard';
import { BenfordChart } from '../components/benford/BenfordChart';
import { MetricsGrid } from '../components/benford/MetricsGrid';
import { NoAnalysisScreen } from './NoAnalysisScreen';
import { colors } from '../theme';

/** Pantalla 3 – Autenticidad: muestra el veredicto, el gráfico de la Ley de Benford y métricas. */
export function BenfordScreen() {
  const { creator, go } = useApp();
  if (!creator) return <NoAnalysisScreen />;

  const { authentic } = creator;

  return (
    <ScreenContainer>
      {/* 1. Encabezado */}
      <ScreenHeader title="Autenticidad" subtitle={`@${creator.username}`} onBack={() => go('home')} />

      <View style={styles.body}>
        {/* 2. Veredicto (auténtica o sospechosa) */}
        <VerdictCard authentic={authentic} />

        {/* 3. Gráfico de barras de la Ley de Benford */}
        <BenfordChart
          observed={creator.benfordObserved}
          confidence={creator.confidence}
          authentic={authentic}
        />

        {/* 4. Cuadrícula de métricas */}
        <MetricsGrid creator={creator} />

        {/* 5. Botón para continuar al Score o volver al inicio si la cuenta es sospechosa */}
        <View style={styles.action}>
          {authentic ? (
            <Button
              label="Ver Brand Fit Score"
              icon={<ArrowRight size={18} color={colors.surface} />}
              onPress={() => go('score')}
            />
          ) : (
            <Button label="Analizar otro creador" variant="secondary" onPress={() => go('home')} />
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, gap: 16, paddingHorizontal: 20 },
  action: { marginTop: 'auto' },
});
