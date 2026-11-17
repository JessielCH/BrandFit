// feat: Pantalla de verificación de autenticidad basada en la Ley de Benford
// docs: Compara la distribución de frecuencias de los primeros dígitos contra la curva teórica natural

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { BENFORD_EXPECTED } from '../data/mockData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ScreenHeader } from '../components/ScreenHeader';
import { ArrowRight, ShieldAlert, ShieldCheck } from '../components/Icons';
import { NoAnalysisScreen } from './NoAnalysisScreen';
import { colors } from '../theme/colors';

export function BenfordScreen() {
  const { creator, go } = useApp();

  if (!creator) {
    return <NoAnalysisScreen />;
  }

  const isAuthentic = creator.authentic;
  const maxScale = 35; // Escala porcentual máxima para normalizar las barras
  const observedBarColor = isAuthentic ? colors.primary : colors.danger;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Autenticidad"
        subtitle={`@${creator.username}`}
        onBack={() => go('home')}
      />

      <View style={styles.body}>
        {/* 2. Veredicto de Autenticidad */}
        <Card style={[styles.verdictCard, !isAuthentic && styles.verdictCardAlert]}>
          <View
            style={[
              styles.verdictBadge,
              isAuthentic ? styles.verdictBadgeSuccess : styles.verdictBadgeAlert,
            ]}
          >
            {isAuthentic ? (
              <ShieldCheck size={22} color={colors.successText} strokeWidth={2} />
            ) : (
              <ShieldAlert size={22} color={colors.dangerText} strokeWidth={2} />
            )}
            <Text
              style={[
                styles.verdictBadgeText,
                isAuthentic ? styles.verdictTextSuccess : styles.verdictTextAlert,
              ]}
            >
              {isAuthentic ? 'Cuenta auténtica' : 'Patrón sospechoso'}
            </Text>
          </View>
          <Text style={styles.verdictDescription}>
            {isAuthentic
              ? 'Seguidores y likes siguen una distribución natural conforme a la Ley de Benford.'
              : 'Anomalías detectadas en la distribución de seguidores e interacciones. No recomendamos continuar la colaboración.'}
          </Text>
        </Card>

        {/* 3. Gráfico de Comparativa Benford (Barras 1 a 9) */}
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Ley de Benford</Text>
            <Text style={styles.confidenceText}>Confianza {creator.confidence}%</Text>
          </View>

          {/* Leyenda de colores */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: colors.primaryMint }]} />
              <Text style={styles.legendLabel}>Esperada</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: observedBarColor }]} />
              <Text style={styles.legendLabel}>Observada</Text>
            </View>
          </View>

          {/* Visualización de las barras comparativas */}
          <View style={styles.barsContainer}>
            {BENFORD_EXPECTED.map((expectedValue, index) => {
              const observedValue = creator.benfordObserved[index] || 0;
              const expectedHeightPercent = Math.min(100, (expectedValue / maxScale) * 100);
              const observedHeightPercent = Math.min(100, (observedValue / maxScale) * 100);

              return (
                <View key={index} style={styles.barGroup}>
                  <View style={styles.barsPair}>
                    {/* Barra Esperada */}
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${expectedHeightPercent}%`,
                          backgroundColor: colors.primaryMint,
                        },
                      ]}
                    />
                    {/* Barra Observada */}
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${observedHeightPercent}%`,
                          backgroundColor: observedBarColor,
                        },
                      ]}
                    />
                  </View>
                  {/* Etiqueta del dígito */}
                  <Text style={styles.digitLabel}>{index + 1}</Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.chartFooterCaption}>
            Primer dígito de seguidores, likes y vistas
          </Text>
        </Card>

        {/* 4. Métricas clave del Creador (Grid 2x2) */}
        <Card style={styles.metricsCard}>
          <View style={styles.metricsRow}>
            <View style={[styles.metricBox, styles.metricBoxRightBorder, styles.metricBoxBottomBorder]}>
              <Text style={styles.metricLabel}>Seguidores</Text>
              <Text style={styles.metricValue}>{creator.followers}</Text>
            </View>
            <View style={[styles.metricBox, styles.metricBoxBottomBorder]}>
              <Text style={styles.metricLabel}>Engagement</Text>
              <Text style={styles.metricValue}>{creator.engagement}%</Text>
            </View>
          </View>
          <View style={styles.metricsRow}>
            <View style={[styles.metricBox, styles.metricBoxRightBorder]}>
              <Text style={styles.metricLabel}>Publicaciones</Text>
              <Text style={styles.metricValue}>{creator.posts}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Prom. vistas</Text>
              <Text style={styles.metricValue}>{creator.avgViews}</Text>
            </View>
          </View>
        </Card>

        {/* 5. Acción Principal */}
        <View style={styles.actionContainer}>
          {isAuthentic ? (
            <Button onPress={() => go('score')}>
              <Text style={styles.actionButtonText}>Ver Brand Fit Score</Text>
              <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />
            </Button>
          ) : (
            <Button variant="secondary" onPress={() => go('home')}>
              Analizar otro creador
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 28,
  },
  body: {
    paddingHorizontal: 20,
    gap: 16,
  },
  verdictCard: {
    padding: 18,
  },
  verdictCardAlert: {
    borderColor: colors.dangerBorder,
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  verdictBadgeSuccess: {
    backgroundColor: colors.successSoft,
  },
  verdictBadgeAlert: {
    backgroundColor: colors.dangerSoft,
  },
  verdictBadgeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  verdictTextSuccess: {
    color: colors.successText,
  },
  verdictTextAlert: {
    color: colors.dangerText,
  },
  verdictDescription: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  chartCard: {
    padding: 18,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  confidenceText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.ink,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '500',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingBottom: 4,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barsPair: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 110,
  },
  bar: {
    width: 8,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  digitLabel: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '600',
    color: colors.muted,
  },
  chartFooterCaption: {
    marginTop: 8,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
  },
  metricsCard: {
    overflow: 'hidden',
  },
  metricsRow: {
    flexDirection: 'row',
  },
  metricBox: {
    flex: 1,
    padding: 16,
  },
  metricBoxRightBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.line,
  },
  metricBoxBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  metricLabel: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '500',
  },
  metricValue: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '800',
    color: colors.ink,
  },
  actionContainer: {
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
