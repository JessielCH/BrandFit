import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { useBrandFit } from '../context/BrandFitContext';
import { ANALYSIS_STEPS } from '../data/creators';
import { CheckIcon, LoaderCircleIcon } from '../components/icons/BrandFitIcons';
import { Button, Card } from '../components/ui';
import { palette } from '../theme/tokens';

const STEP_DURATION_MS = 950;

export function ProgressScreen() {
  const { pendingUsername, finishAnalysis, go } = useBrandFit();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = ANALYSIS_STEPS.length;

  const spinAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [spinAnim]);

  useEffect(() => {
    const targetPct = Math.min(currentStep, totalSteps) / totalSteps;
    Animated.timing(progressAnim, {
      toValue: targetPct,
      duration: 450,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    if (currentStep >= totalSteps) {
      const finishTimer = setTimeout(() => {
        finishAnalysis();
      }, 420);
      return () => clearTimeout(finishTimer);
    }

    const stepTimer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, STEP_DURATION_MS);

    return () => clearTimeout(stepTimer);
  }, [currentStep, totalSteps, finishAnalysis, progressAnim]);

  const percentage = Math.round(
    (Math.min(currentStep, totalSteps) / totalSteps) * 100
  );

  const rotateInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const widthInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* 1. Título */}
      <Text style={styles.title}>
        Analizando a @{pendingUsername || 'creador'}
      </Text>

      {/* 2. Barra de progreso */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progreso</Text>
          <Text style={styles.progressPct}>{percentage}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: widthInterpolate }]}
          />
        </View>
      </View>

      {/* 3. Stepper vertical */}
      <Card style={styles.stepperCard}>
        {ANALYSIS_STEPS.map((label, index) => {
          const status =
            index < currentStep
              ? 'done'
              : index === currentStep
                ? 'active'
                : 'pending';
          const isLast = index === totalSteps - 1;

          return (
            <View key={label} style={styles.stepRow}>
              <View style={styles.stepIndicatorCol}>
                <View
                  style={[
                    styles.stepCircle,
                    status === 'done' && styles.stepCircleDone,
                    status === 'active' && styles.stepCircleActive,
                    status === 'pending' && styles.stepCirclePending,
                  ]}
                >
                  {status === 'done' && (
                    <CheckIcon size={16} color="#FFFFFF" />
                  )}
                  {status === 'active' && (
                    <Animated.View
                      style={{ transform: [{ rotate: rotateInterpolate }] }}
                    >
                      <LoaderCircleIcon size={16} color={palette.primary} />
                    </Animated.View>
                  )}
                  {status === 'pending' && (
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  )}
                </View>

                {!isLast && (
                  <View
                    style={[
                      styles.stepConnector,
                      status === 'done' && styles.stepConnectorDone,
                    ]}
                  />
                )}
              </View>

              <View style={styles.stepTextCol}>
                <Text
                  style={[
                    styles.stepText,
                    status === 'done' && styles.stepTextDone,
                    status === 'active' && styles.stepTextActive,
                  ]}
                >
                  {label}
                </Text>
              </View>
            </View>
          );
        })}
      </Card>

      {/* 4. Cancelar */}
      <Button
        variant="secondary"
        onPress={() => go('home')}
        style={styles.cancelBtn}
      >
        Cancelar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    gap: 22,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: palette.ink,
    lineHeight: 33,
  },
  progressSection: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 13,
    color: palette.muted,
    fontWeight: '500',
  },
  progressPct: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.primary,
    fontVariant: ['tabular-nums'],
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.segmentedBg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: palette.primary,
  },
  stepperCard: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  stepRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  stepIndicatorCol: {
    alignItems: 'center',
    height: '100%',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDone: {
    borderColor: palette.success,
    backgroundColor: palette.success,
  },
  stepCircleActive: {
    borderColor: palette.primary,
    backgroundColor: palette.primarySoft,
  },
  stepCirclePending: {
    borderColor: palette.line,
    backgroundColor: palette.surface,
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.placeholder,
    fontVariant: ['tabular-nums'],
  },
  stepConnector: {
    flex: 1,
    width: 2,
    backgroundColor: palette.line,
    marginVertical: 4,
    borderRadius: 2,
  },
  stepConnectorDone: {
    backgroundColor: palette.success,
  },
  stepTextCol: {
    flex: 1,
    paddingTop: 5,
  },
  stepText: {
    fontSize: 15,
    color: palette.muted,
  },
  stepTextDone: {
    color: palette.ink,
    fontWeight: '500',
  },
  stepTextActive: {
    color: palette.ink,
    fontWeight: '700',
  },
  cancelBtn: {
    marginTop: 'auto',
  },
});
