/**
 * BenfordScreen – resultado de autenticidad + gráfico de barras de Benford.
 * Migrado desde src/brandfit/screens/Benford.tsx del prototipo web.
 */
import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { BENFORD_EXPECTED } from '../data/constants'
import { Button, Card, ScreenHeader } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import NoAnalysis from './NoAnalysis'

const CHART_HEIGHT = 160
const MAX_VAL = 35

export default function BenfordScreen() {
  const { creator, go } = useApp()
  if (!creator) return <NoAnalysis />

  const ok = creator.authentic
  const barColor = ok ? Colors.primary : Colors.danger

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Autenticidad"
        subtitle={`@${creator.username}`}
        onBack={() => go('home')}
      />

      {/* 2. Veredicto */}
      <Card style={[styles.card, !ok && styles.cardFraud]}>
        <View style={[styles.verdict, ok ? styles.verdictOk : styles.verdictFraud]}>
          <Ionicons
            name={ok ? 'shield-checkmark' : 'shield'}
            size={22}
            color={ok ? Colors.successText : Colors.dangerText}
          />
          <Text style={[styles.verdictText, ok ? styles.verdictTextOk : styles.verdictTextFraud]}>
            {ok ? 'Cuenta auténtica' : 'Patrón sospechoso'}
          </Text>
        </View>
        <Text style={styles.verdictBody}>
          {ok
            ? 'Seguidores y likes siguen una distribución natural.'
            : 'Anomalías en la distribución de seguidores. No recomendamos continuar.'}
        </Text>
      </Card>

      {/* 3. Gráfico Benford */}
      <Card style={styles.card}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Ley de Benford</Text>
          <Text style={styles.confidence}>Confianza {creator.confidence}%</Text>
        </View>

        {/* Leyenda */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.successBar }]} />
            <Text style={styles.legendLabel}>Esperada</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: barColor }]} />
            <Text style={styles.legendLabel}>Observada</Text>
          </View>
        </View>

        {/* Barras */}
        <View style={styles.chartArea}>
          {BENFORD_EXPECTED.map((exp, i) => (
            <View key={i} style={styles.barGroup}>
              {/* Barra esperada */}
              <View
                style={[
                  styles.bar,
                  {
                    height: (exp / MAX_VAL) * CHART_HEIGHT,
                    backgroundColor: Colors.successBar,
                  },
                ]}
              />
              {/* Barra observada */}
              <View
                style={[
                  styles.bar,
                  {
                    height: (creator.benfordObserved[i] / MAX_VAL) * CHART_HEIGHT,
                    backgroundColor: barColor,
                  },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Etiquetas eje X */}
        <View style={styles.axisRow}>
          {BENFORD_EXPECTED.map((_, i) => (
            <Text key={i} style={styles.axisLabel}>{i + 1}</Text>
          ))}
        </View>
        <Text style={styles.axisCaption}>Primer dígito de seguidores y likes</Text>
      </Card>

      {/* 4. Métricas */}
      <Card style={styles.metricsCard}>
        {[
          { label: 'Seguidores', value: creator.followers },
          { label: 'Engagement', value: `${creator.engagement}%` },
          { label: 'Publicaciones', value: String(creator.posts) },
          { label: 'Prom. vistas', value: creator.avgViews },
        ].map((m, i) => (
          <View
            key={m.label}
            style={[
              styles.metric,
              i < 2 && styles.metricBorderBottom,
              i % 2 === 0 && styles.metricBorderRight,
            ]}
          >
            <Text style={styles.metricLabel}>{m.label}</Text>
            <Text style={styles.metricValue}>{m.value}</Text>
          </View>
        ))}
      </Card>

      {/* 5. Acción */}
      {ok ? (
        <Button onPress={() => go('score')}>
          Ver Brand Fit Score →
        </Button>
      ) : (
        <Button variant="secondary" onPress={() => go('home')}>
          Analizar otro creador
        </Button>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Colors.bg },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    gap: 16,
  },
  card: { padding: 20 },
  cardFraud: { borderColor: Colors.dangerBorder },

  // Veredicto
  verdict: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  verdictOk: { backgroundColor: Colors.successBg },
  verdictFraud: { backgroundColor: Colors.dangerBg },
  verdictText: { fontSize: FontSize.lg, fontWeight: '600' },
  verdictTextOk: { color: Colors.successText },
  verdictTextFraud: { color: Colors.dangerText },
  verdictBody: { fontSize: FontSize.base, color: Colors.muted, lineHeight: FontSize.base * 1.5 },

  // Gráfico
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  chartTitle: { fontSize: FontSize.base, fontWeight: '600', color: Colors.ink },
  confidence: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.ink },
  legend: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 2 },
  legendLabel: { fontSize: FontSize.sm, color: Colors.muted },
  chartArea: {
    height: CHART_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  barGroup: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 2 },
  bar: { flex: 1, maxWidth: 10, borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  axisRow: { flexDirection: 'row', marginTop: 6 },
  axisLabel: { flex: 1, fontSize: 11, color: Colors.muted, textAlign: 'center' },
  axisCaption: { fontSize: 11, color: Colors.muted, textAlign: 'center', marginTop: 4 },

  // Métricas
  metricsCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
    overflow: 'hidden',
  },
  metric: { width: '50%', padding: 16 },
  metricBorderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.line },
  metricBorderRight: { borderRightWidth: 1, borderRightColor: Colors.line },
  metricLabel: { fontSize: FontSize.sm, color: Colors.muted },
  metricValue: { fontSize: FontSize['2xl'], fontWeight: '700', color: Colors.ink, marginTop: 4 },
})
