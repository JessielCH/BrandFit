// feat: Pantalla de progreso del análisis con stepper dinámico, porcentaje acumulado y timer secuencial
// docs: Ejecuta la simulación de recolección y análisis estadístico en 5 fases antes de mostrar los resultados

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { ANALYSIS_STEPS } from '../data/mockData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Check, LoaderCircle } from '../components/Icons';
import { colors } from '../theme/colors';

const STEP_INTERVAL_MS = 1000;

export function ProgressScreen() {
  const { pendingUsername, finishAnalysis, go } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = ANALYSIS_STEPS.length;

  // feat: Transición secuencial automática a través de las fases de análisis
  useEffect(() => {
    if (currentStep >= totalSteps) {
      const finishTimer = setTimeout(() => {
        finishAnalysis();
      }, 500);
      return () => clearTimeout(finishTimer);
    }

    const nextStepTimer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, STEP_INTERVAL_MS);

    return () => clearTimeout(nextStepTimer);
  }, [currentStep, totalSteps, finishAnalysis]);

  const percentage = Math.round((Math.min(currentStep, totalSteps) / totalSteps) * 100);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Título con nombre de usuario en proceso */}
      <Text style={styles.title}>
        Analizando a @{pendingUsername || 'creador'}
      </Text>

      {/* 2. Barra de Progreso General */}
      <View style={styles.progressHeaderRow}>
        <Text style={styles.progressLabel}>Progreso</Text>
        <Text style={styles.progressPercentText}>{percentage}%</Text>
      </View>
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
      </View>

      {/* 3. Stepper Vertical de Fases */}
      <Card style={styles.stepperCard}>
        {ANALYSIS_STEPS.map((step, index) => {
          const isDone = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;
          const isLast = index === totalSteps - 1;

          return (
            <View key={step} style={styles.stepRow}>
              {/* Línea conectora entre círculos */}
              {!isLast && (
                <View
                  style={[
                    styles.connectorLine,
                    isDone ? styles.connectorDone : styles.connectorPending,
                  ]}
                />
              )}

              {/* Indicador circular de estado */}
              <View
                style={[
                  styles.stepBadge,
                  isDone && styles.stepBadgeDone,
                  isActive && styles.stepBadgeActive,
                  isPending && styles.stepBadgePending,
                ]}
              >
                {isDone && <Check size={16} color="#FFFFFF" strokeWidth={2.8} />}
                {isActive && <LoaderCircle size={18} color={colors.primary} strokeWidth={2.5} />}
                {isPending && <Text style={styles.pendingNumber}>{index + 1}</Text>}
              </View>

              {/* Texto descriptivo del paso */}
              <View style={styles.stepTextContainer}>
                <Text
                  style={[
                    styles.stepTitle,
                    isDone && styles.stepTitleDone,
                    isActive && styles.stepTitleActive,
                    isPending && styles.stepTitlePending,
                  ]}
                >
                  {step}
                </Text>
              </View>
            </View>
          );
        })}
      </Card>

      {/* 4. Botón de Cancelación */}
      <Button variant="secondary" onPress={() => go('home')} style={styles.cancelButton}>
        Cancelar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.4,
    marginBottom: 20,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: '500',
  },
  progressPercentText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.subtle,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  stepperCard: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  connectorLine: {
    position: 'absolute',
    left: 17,
    top: 36,
    bottom: -14,
    width: 2,
    borderRadius: 1,
    zIndex: 1,
  },
  connectorDone: {
    backgroundColor: colors.success,
  },
  connectorPending: {
    backgroundColor: colors.line,
  },
  stepBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    marginRight: 14,
  },
  stepBadgeDone: {
    backgroundColor: colors.success,
  },
  stepBadgeActive: {
    backgroundColor: colors.primarySoft,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  stepBadgePending: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  pendingNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.placeholder,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
  },
  stepTitleDone: {
    color: colors.ink,
    fontWeight: '500',
  },
  stepTitleActive: {
    color: colors.ink,
    fontWeight: '700',
  },
  stepTitlePending: {
    color: colors.muted,
  },
  cancelButton: {
    marginTop: 'auto',
  },
});
