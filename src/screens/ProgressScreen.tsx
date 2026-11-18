import { Fragment, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { ANALYSIS_STEPS } from '../data/analysis';
import { Button, Card, ScreenContainer } from '../components/ui';
import { ProgressBar } from '../components/progress/ProgressBar';
import { AnalysisStep, StepConnector, type StepState } from '../components/progress/AnalysisStep';
import { colors, fonts } from '../theme';

// Duración de cada paso simulado (en milisegundos)
const STEP_DURATION = 1100;
const FINISH_DELAY = 450;

/** Pantalla 2 – Progreso: simula paso a paso el análisis y al terminar abre la pantalla de Benford. */
export function ProgressScreen() {
  const { pendingUsername, finishAnalysis, go } = useApp();
  const [current, setCurrent] = useState(0);
  const total = ANALYSIS_STEPS.length;

  // Avanza automáticamente un paso cada 1.1 segundos
  useEffect(() => {
    const isFinished = current >= total;
    const timer = setTimeout(
      isFinished ? finishAnalysis : () => setCurrent((c) => c + 1),
      isFinished ? FINISH_DELAY : STEP_DURATION,
    );
    return () => clearTimeout(timer);
  }, [current, total, finishAnalysis]);

  const percent = Math.round((Math.min(current, total) / total) * 100);

  function stepState(index: number): StepState {
    if (index < current) return 'done';
    if (index === current) return 'active';
    return 'pending';
  }

  return (
    <ScreenContainer style={styles.container}>
      {/* 1. Título con el @username */}
      <Text style={styles.title}>Analizando a @{pendingUsername || 'creador'}</Text>

      {/* 2. Barra de porcentaje */}
      <ProgressBar percent={percent} />

      {/* 3. Lista vertical de los 5 pasos */}
      <Card style={styles.stepper}>
        {ANALYSIS_STEPS.map((step, i) => (
          <Fragment key={step}>
            <AnalysisStep index={i} label={step} state={stepState(i)} />
            {i < total - 1 && <StepConnector done={i < current} />}
          </Fragment>
        ))}
      </Card>

      {/* 4. Botón para volver al inicio */}
      <Button label="Cancelar" variant="secondary" onPress={() => go('home')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { gap: 24, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  stepper: { flex: 1, minHeight: 340, paddingHorizontal: 20, paddingVertical: 20 },
});
