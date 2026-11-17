/**
 * ProgressScreen – stepper animado con 5 pasos del análisis.
 * Migrado desde src/brandfit/screens/Progress.tsx del prototipo web.
 */
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { ANALYSIS_STEPS } from '../data/constants'
import { Button, Card, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'

const STEP_MS = 1100

export default function ProgressScreen() {
  const { pendingUsername, finishAnalysis, go } = useApp()
  const [current, setCurrent] = useState(0)
  const total = ANALYSIS_STEPS.length

  useEffect(() => {
    if (current >= total) {
      const t = setTimeout(finishAnalysis, 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [current, total, finishAnalysis])

  const pct = Math.round((Math.min(current, total) / total) * 100)

  return (
    <View style={styles.container}>
      {/* 1. Título */}
      <Text style={styles.title}>
        Analizando a @{pendingUsername || 'creador'}
      </Text>

      {/* 2. Barra de progreso */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Progreso</Text>
          <Text style={styles.progressPct}>{pct}%</Text>
        </View>
        <View style={styles.trackBg}>
          <View style={[styles.trackFill, { width: `${pct}%` }]} />
        </View>
      </View>

      {/* 3. Stepper */}
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
                    state === 'done' ? styles.connectorDone : styles.connectorPending,
                  ]}
                />
              )}

              {/* Ícono de estado */}
              <View
                style={[
                  styles.dot,
                  state === 'done' && styles.dotDone,
                  state === 'active' && styles.dotActive,
                  state === 'pending' && styles.dotPending,
                ]}
              >
                {state === 'done' && (
                  <Ionicons name="checkmark" size={14} color={Colors.white} strokeWidth={2.5} />
                )}
                {state === 'active' && (
                  <ActivityIndicator size="small" color={Colors.primary} />
                )}
                {state === 'pending' && (
                  <Text style={styles.dotNumber}>{i + 1}</Text>
                )}
              </View>

              {/* Texto del paso */}
              <Text
                style={[
                  styles.stepText,
                  state === 'pending' && styles.stepTextPending,
                  state === 'active' && styles.stepTextActive,
                  state === 'done' && styles.stepTextDone,
                ]}
              >
                {step}
              </Text>
            </View>
          )
        })}
      </Card>

      {/* 4. Cancelar */}
      <Button variant="secondary" onPress={() => go('home')} style={styles.cancelBtn}>
        Cancelar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    gap: 24,
    backgroundColor: Colors.bg,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.ink,
    letterSpacing: -0.4,
    lineHeight: 32,
  },

  // Barra de progreso
  progressSection: { gap: Spacing.md },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  progressLabel: { fontSize: FontSize.sm, color: Colors.muted },
  progressPct: { fontSize: FontSize.base, fontWeight: '700', color: Colors.primary },
  trackBg: {
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: '#E7EFEB',
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
  },

  // Stepper
  card: { padding: 20, gap: 0 },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 14,
    position: 'relative',
  },
  stepRowBorder: {
    borderBottomWidth: 0, // usamos el conector en lugar
  },
  connector: {
    position: 'absolute',
    left: 15,
    top: 46,
    width: 2,
    height: 28,
    borderRadius: 1,
  },
  connectorDone: { backgroundColor: Colors.success },
  connectorPending: { backgroundColor: Colors.line },

  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    zIndex: 1,
  },
  dotDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  dotActive: { backgroundColor: Colors.primarySoft, borderColor: Colors.primary },
  dotPending: { backgroundColor: Colors.white, borderColor: Colors.line },
  dotNumber: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.placeholder },

  stepText: { flex: 1, fontSize: FontSize.base },
  stepTextPending: { color: Colors.muted },
  stepTextActive: { color: Colors.ink, fontWeight: '600' },
  stepTextDone: { color: Colors.ink, fontWeight: '500' },

  cancelBtn: { marginTop: 'auto' },
})
