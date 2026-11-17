import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useBrandFit } from '../context/BrandFitContext';
import { BENFORD_EXPECTED } from '../data/creators';
import {
  ArrowRightIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
} from '../components/icons/BrandFitIcons';
import { Button, Card, ScreenHeader } from '../components/ui';
import { palette, radii } from '../theme/tokens';
import { NoAnalysisScreen } from './NoAnalysisScreen';

const MAX_BAR_VALUE = 35;

export function BenfordScreen() {
  const { creator, go } = useBrandFit();
  const [selectedDigit, setSelectedDigit] = useState<number | null>(null);

  if (!creator) {
    return <NoAnalysisScreen />;
  }

  const isAuthentic = creator.authentic;
  const observedColor = isAuthentic ? palette.primary : palette.danger;

  const activeIndex = selectedDigit !== null ? selectedDigit - 1 : null;

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Autenticidad"
        subtitle={`@${creator.username}`}
        onBack={() => go('home')}
      />

      <View style={styles.body}>
        {/* 2. Veredicto */}
        <Card
          style={[
            styles.verdictCard,
            !isAuthentic && styles.verdictCardSuspicious,
          ]}
        >
          <View
            style={[
              styles.verdictBadge,
              isAuthentic
                ? styles.verdictBadgeAuthentic
                : styles.verdictBadgeFraud,
            ]}
          >
            {isAuthentic ? (
              <ShieldCheckIcon size={22} color={palette.primaryDark} />
            ) : (
              <ShieldAlertIcon size={22} color={palette.dangerText} />
            )}
            <Text
              style={[
                styles.verdictTitle,
                isAuthentic
                  ? styles.verdictTitleAuthentic
                  : styles.verdictTitleFraud,
              ]}
            >
              {isAuthentic ? 'Cuenta auténtica' : 'Patrón sospechoso'}
            </Text>
          </View>

          <Text style={styles.verdictDescription}>
            {isAuthentic
              ? 'Seguidores y likes siguen una distribución natural.'
              : 'Anomalías en la distribución de seguidores. No recomendamos continuar.'}
          </Text>
        </Card>

        {/* 3. Gráfico Ley de Benford */}
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Ley de Benford</Text>
            <Text style={styles.confidenceLabel}>
              Confianza {creator.confidence}%
            </Text>
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendSwatch,
                  { backgroundColor: palette.primaryMint },
                ]}
              />
              <Text style={styles.legendText}>Esperada</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendSwatch,
                  { backgroundColor: observedColor },
                ]}
              />
              <Text style={styles.legendText}>Observada</Text>
            </View>
          </View>

          {activeIndex !== null && (
            <View style={styles.tooltipPill}>
              <Text style={styles.tooltipText}>
                Dígito {selectedDigit}: Esperada{' '}
                {BENFORD_EXPECTED[activeIndex]}% · Observada{' '}
                {creator.benfordObserved[activeIndex]}%
              </Text>
            </View>
          )}

          <View style={styles.barsArea}>
            {BENFORD_EXPECTED.map((expected, index) => {
              const observed = creator.benfordObserved[index] ?? 0;
              const expPct = Math.min(100, (expected / MAX_BAR_VALUE) * 100);
              const obsPct = Math.min(100, (observed / MAX_BAR_VALUE) * 100);
              const digit = index + 1;
              const isSelected = selectedDigit === digit;

              return (
                <TouchableOpacity
                  key={digit}
                  activeOpacity={0.75}
                  onPress={() =>
                    setSelectedDigit((prev) => (prev === digit ? null : digit))
                  }
                  style={[
                    styles.barGroup,
                    isSelected && styles.barGroupSelected,
                  ]}
                >
                  <View style={styles.barPairContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${expPct}%`,
                          backgroundColor: palette.primaryMint,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${obsPct}%`,
                          backgroundColor: observedColor,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.digitsRow}>
            {BENFORD_EXPECTED.map((_, index) => {
              const digit = index + 1;
              const isSelected = selectedDigit === digit;
              return (
                <Text
                  key={digit}
                  style={[
                    styles.digitLabel,
                    isSelected && styles.digitLabelActive,
                  ]}
                >
                  {digit}
                </Text>
              );
            })}
          </View>

          <Text style={styles.chartCaption}>
            Primer dígito de seguidores y likes (toca una barra para detallar)
          </Text>
        </Card>

        {/* 4. Cuadrícula de métricas 2x2 */}
        <Card style={styles.metricsGrid}>
          <View style={[styles.metricCell, styles.borderRight, styles.borderBottom]}>
            <Text style={styles.metricLabel}>Seguidores</Text>
            <Text style={styles.metricValue}>{creator.followers}</Text>
          </View>
          <View style={[styles.metricCell, styles.borderBottom]}>
            <Text style={styles.metricLabel}>Engagement</Text>
            <Text style={styles.metricValue}>{creator.engagement}%</Text>
          </View>
          <View style={[styles.metricCell, styles.borderRight]}>
            <Text style={styles.metricLabel}>Publicaciones</Text>
            <Text style={styles.metricValue}>{creator.posts}</Text>
          </View>
          <View style={styles.metricCell}>
            <Text style={styles.metricLabel}>Prom. vistas</Text>
            <Text style={styles.metricValue}>{creator.avgViews}</Text>
          </View>
        </Card>

        {/* 5. Acción */}
        {isAuthentic ? (
          <Button
            onPress={() => go('score')}
            iconRight={<ArrowRightIcon size={18} color="#FFFFFF" />}
            style={styles.actionButton}
          >
            Ver Brand Fit Score
          </Button>
        ) : (
          <Button
            variant="secondary"
            onPress={() => go('home')}
            style={styles.actionButton}
          >
            Analizar otro creador
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
  },
  verdictCard: {
    padding: 18,
  },
  verdictCardSuspicious: {
    borderColor: palette.dangerBorder,
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.md,
  },
  verdictBadgeAuthentic: {
    backgroundColor: palette.successSoft,
  },
  verdictBadgeFraud: {
    backgroundColor: palette.dangerSoft,
  },
  verdictTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  verdictTitleAuthentic: {
    color: palette.primaryDark,
  },
  verdictTitleFraud: {
    color: palette.dangerText,
  },
  verdictDescription: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 21,
    color: palette.muted,
  },
  chartCard: {
    padding: 18,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.ink,
  },
  confidenceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.ink,
    fontVariant: ['tabular-nums'],
  },
  legendRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendSwatch: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 13,
    color: palette.muted,
  },
  tooltipPill: {
    marginTop: 10,
    backgroundColor: palette.surfaceSubtle,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.inkSecondary,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  barsArea: {
    marginTop: 16,
    height: 155,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 4,
  },
  barGroup: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 2,
    borderRadius: 6,
  },
  barGroupSelected: {
    backgroundColor: '#F1F5F9',
  },
  barPairContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 3,
  },
  bar: {
    flex: 1,
    maxWidth: 11,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  digitsRow: {
    marginTop: 6,
    flexDirection: 'row',
  },
  digitLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: palette.muted,
    fontVariant: ['tabular-nums'],
  },
  digitLabelActive: {
    color: palette.primary,
    fontWeight: '700',
  },
  chartCaption: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 12,
    color: palette.muted,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  metricCell: {
    width: '50%',
    padding: 16,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: palette.line,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  metricLabel: {
    fontSize: 13,
    color: palette.muted,
  },
  metricValue: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '700',
    color: palette.ink,
    fontVariant: ['tabular-nums'],
  },
  actionButton: {
    marginTop: 4,
  },
});
