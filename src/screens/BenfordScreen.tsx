/**
 * @file BenfordScreen.tsx
 * @description Pantalla de evaluación de autenticidad basada en la Ley de Benford.
 * Muestra el veredicto de autenticidad (o alerta de fraude en caso de detección de bots),
 * el nivel de confianza estadística y un gráfico interactivo de barras que compara
 * la distribución observada frente a la teórica para los dígitos del 1 al 9.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../application'
import { BENFORD_EXPECTED } from '../domain'
import { Button, Card, ScreenHeader, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import NoAnalysis from './NoAnalysis'

/** Altura base del gráfico de barras en píxeles */
const CHART_HEIGHT = 160
/** Valor máximo en porcentaje para el escalado vertical de las barras */
const MAX_VAL = 35

/**
 * Pantalla de Autenticidad: Visualiza el contraste entre la curva esperada por la Ley de Benford
 * y los valores muestreados de la cuenta del influencer.
 */
export default function BenfordScreen() {
  const { creator, go } = useApp()
  // docs: Si no hay análisis activo en memoria, muestra el estado vacío informativo
  if (!creator) return <NoAnalysis />

  const ok = creator.authentic
  const barColor = ok ? Colors.primary : Colors.danger

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado con navegación de retorno hacia Home */}
      <ScreenHeader
        title="Autenticidad"
        subtitle={`@${creator.username}`}
        onBack={() => go('home')}
      />

      {/* 2. Tarjeta de Veredicto (Auténtico vs Patrón Sospechoso) */}
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

      {/* 3. Gráfico de Comparación de la Ley de Benford */}
      <Card style={styles.card}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Ley de Benford</Text>
          <Text style={styles.confidence}>Confianza {creator.confidence}%</Text>
        </View>
        <Text style={styles.chartDesc}>
          Primer dígito de métricas vs. distribución natural esperada.
        </Text>

        {/* docs: Gráfico de 9 columnas para los dígitos del 1 al 9 */}
        <View style={styles.chartArea}>
          {BENFORD_EXPECTED.map((exp, i) => {
            const obs = creator.benfordObserved[i] ?? 0
            const obsH = Math.min((obs / MAX_VAL) * CHART_HEIGHT, CHART_HEIGHT)
            const expH = Math.min((exp / MAX_VAL) * CHART_HEIGHT, CHART_HEIGHT)

            return (
              <View key={i} style={styles.barCol}>
                {/* Contenedor de las dos barras (Observada y Esperada) */}
                <View style={styles.barTrack}>
                  {/* Barra de valor observado */}
                  <View
                    style={[
                      styles.barObs,
                      { height: obsH, backgroundColor: barColor },
                    ]}
                  />
                  {/* Barra de valor teórico esperado por la Ley de Benford */}
                  <View
                    style={[
                      styles.barExp,
                      { height: expH, backgroundColor: Colors.line },
                    ]}
                  />
                </View>
                {/* Etiqueta del dígito (1 a 9) */}
                <Text style={styles.digitLabel}>{i + 1}</Text>
              </View>
            )
          })}
        </View>

        {/* Leyenda de colores del gráfico */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: barColor }]} />
            <Text style={styles.legendText}>Observado</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.line }]} />
            <Text style={styles.legendText}>Esperado (Benford)</Text>
          </View>
        </View>
      </Card>

      {/* 4. Botón de acción para avanzar hacia el Brand Fit Score */}
      <View style={styles.nextBtnWrap}>
        <Button onPress={() => go('score')}>
          {ok ? 'Continuar a Brand Fit Score' : 'Ver análisis de todos modos'}
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Colors.bg },
  content: {
    paddingBottom: Spacing['3xl'],
  },
  card: {
    marginHorizontal: Spacing['2xl'],
    marginBottom: Spacing.xl,
    padding: Spacing['2xl'],
  },
  cardFraud: {
    borderColor: Colors.dangerBorder,
  },
  verdict: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  verdictOk: {
    backgroundColor: Colors.successBg,
  },
  verdictFraud: {
    backgroundColor: Colors.dangerBg,
  },
  verdictText: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  verdictTextOk: {
    color: Colors.successText,
  },
  verdictTextFraud: {
    color: Colors.dangerText,
  },
  verdictBody: {
    fontSize: FontSize.base,
    color: Colors.muted,
    lineHeight: FontSize.base * 1.45,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chartTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.ink,
  },
  confidence: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  chartDesc: {
    fontSize: FontSize.sm,
    color: Colors.muted,
    marginBottom: Spacing.xl,
  },
  chartArea: {
    height: CHART_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    flex: 1,
    justifyContent: 'center',
  },
  barObs: {
    width: 10,
    borderRadius: 2,
  },
  barExp: {
    width: 6,
    borderRadius: 2,
  },
  digitLabel: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    marginTop: 6,
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: FontSize.xs,
    color: Colors.muted,
  },
  nextBtnWrap: {
    paddingHorizontal: Spacing['2xl'],
    marginTop: Spacing.sm,
  },
})
