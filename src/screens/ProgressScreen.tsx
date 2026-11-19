/**
 * @file ProgressScreen.tsx
 * @description Pantalla de simulación del progreso del análisis con stepper animado de 5 etapas.
 * Ilustra la recolección de datos, verificación de Benford, cálculo psicométrico Big Five,
 * estimación de engagement y consolidación del Brand Fit Score.
 *
 * @author BrandFit Team
 */

import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../application'
import { ANALYSIS_STEPS } from '../domain'
import { Button, Card, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'

/** Duración en milisegundos de cada paso del stepper */
const STEP_MS = 1100

/**
 * Pantalla de Progreso: Muestra una barra porcentual continua y un stepper vertical
 * que avanza automáticamente hasta completar el análisis simulado.
 */
export default function ProgressScreen() {
  const { pendingUsername, finishAnalysis, go } = useApp()
  // docs: Índice del paso actualmente activo (0 a total)
  const [current, setCurrent] = useState(0)
  const total = ANALYSIS_STEPS.length

  // docs: Efecto temporizador que avanza paso a paso hasta concluir y llamar a finishAnalysis()
  useEffect(() => {
    if (current >= total) {
      const t = setTimeout(finishAnalysis, 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [current, total, finishAnalysis])

  // docs: Cálculo de porcentaje completado (0 a 100)
  const pct = Math.round((Math.min(current, total) / total) * 100)

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Título principal */}
      <Text style={styles.title} numberOfLines={2}>
        Analizando a @{pendingUsername || 'creador'}
      </Text>

      {/* 2. Barra de progreso lineal */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Progreso</Text>
          <Text style={styles.progressPct}>{pct}%</Text>
        </View>
        <View style={styles.trackBg}>
          <View style={[styles.trackFill, { width: `${pct}%` }]} />
        </View>
      </View>

      {/* 3. Stepper vertical con estados (hecho, activo, pendiente) */}
      <Card style={styles.card}>
        {ANALYSIS_STEPS.map((step, i) => {
          const state = i < current ? 'done' : i === current ? 'active' : 'pending'
          const isLast = i === total - 1
          return (
            <View key={step} style={[styles.stepRow, !isLast && styles.stepRowBorder]}>
              {/* Línea vertical conectora */}
              {!isLast && (
                <View
                  style={[
                    styles.connector,
                    i < current ? styles.connectorDone : styles.connectorPending,
                  ]}
                />
              )}

              {/* Indicador de estado del paso: icono de check, spinner activo o círculo vacío */}
              <View
                style={[
                  styles.circle,
                  state === 'done' && styles.circleDone,
                  state === 'active' && styles.circleActive,
                  state === 'pending' && styles.circlePending,
                ]}
              >
                {state === 'done' ? (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                ) : state === 'active' ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  <View style={styles.pendingDot} />
                )}
              </View>

              {/* Etiqueta textual del paso */}
              <View style={styles.stepInfo}>
                <Text
                  style={[
                    styles.stepLabel,
                    state === 'done' && styles.stepLabelDone,
                    state === 'active' && styles.stepLabelActive,
                    state === 'pending' && styles.stepLabelPending,
                  ]}
                >
                  {step}
                </Text>
              </View>
            </View>
          )
        })}
      </Card>

      {/* 4. Acción de Cancelar para volver a la pantalla de Inicio */}
      <Button variant="ghost" onPress={() => go('home')} style={styles.cancelBtn}>
        Cancelar
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
  },
  title: {
    fontSize: FontSize['3xl'],
    fontWeight: '600',
    color: Colors.ink,
    letterSpacing: -0.4,
    marginBottom: Spacing.xl,
  },
  progressSection: {
    gap: 8,
    marginBottom: Spacing.xl,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: FontSize.sm,
    color: Colors.muted,
  },
  progressPct: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  trackBg: {
    height: 8,
    backgroundColor: Colors.line,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  card: {
    padding: Spacing['2xl'],
    marginBottom: Spacing.xl,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    position: 'relative',
  },
  stepRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  connector: {
    position: 'absolute',
    left: 13,
    top: 36,
    bottom: -14,
    width: 2,
    zIndex: 0,
  },
  connectorDone: {
    backgroundColor: Colors.primary,
  },
  connectorPending: {
    backgroundColor: Colors.line,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  circleDone: {
    backgroundColor: Colors.primary,
  },
  circleActive: {
    backgroundColor: Colors.primarySoft,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  circlePending: {
    backgroundColor: Colors.line,
  },
  pendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.placeholder,
  },
  stepInfo: {
    flex: 1,
  },
  stepLabel: {
    fontSize: FontSize.base,
  },
  stepLabelDone: {
    color: Colors.ink,
    fontWeight: '500',
  },
  stepLabelActive: {
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  stepLabelPending: {
    color: Colors.muted,
  },
  cancelBtn: {
    marginTop: 'auto',
  },
})
