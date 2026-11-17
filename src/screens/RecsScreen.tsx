// feat: Pantalla de recomendaciones de contenido y formatos sugeridos según engagement
// docs: Muestra el Top 3 de videos con mejor desempeño, síntesis del formato óptimo y recomendaciones diferenciadas para marca y creador

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { ToneChip } from '../components/Chip';
import { ScreenHeader } from '../components/ScreenHeader';
import { Building2, Lightbulb, Play, UserRound, ShieldAlert } from '../components/Icons';
import { NoAnalysisScreen } from './NoAnalysisScreen';
import { colors } from '../theme/colors';

export function RecsScreen() {
  const { creator, mode } = useApp();

  if (!creator) {
    return <NoAnalysisScreen kind="recs" />;
  }

  // note: Si la cuenta no es auténtica, no se calculan recomendaciones confiables
  if (!creator.authentic) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Qué contenido funciona mejor"
          subtitle={`@${creator.username}`}
        />
        <View style={styles.body}>
          <Card style={styles.alertCard}>
            <View style={styles.alertHeaderRow}>
              <ShieldAlert size={22} color={colors.dangerText} />
              <Text style={styles.alertTitle}>Sin recomendaciones disponibles</Text>
            </View>
            <Text style={styles.alertText}>
              El engagement y las visualizaciones de esta cuenta presentan anomalías estadísticas. No es posible generar patrones de contenido recomendados.
            </Text>
          </Card>
        </View>
      </ScrollView>
    );
  }

  const isBrand = mode === 'marca';

  // feat: Adapta el orden prioritario de recomendaciones según el modo activo
  const recommendationItems = [
    {
      key: 'brand',
      icon: Building2,
      title: 'Para la marca',
      text: creator.forBrand,
    },
    {
      key: 'creator',
      icon: UserRound,
      title: 'Para el creador',
      text: creator.forCreator,
    },
  ];

  if (!isBrand) {
    recommendationItems.reverse();
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Qué contenido funciona mejor"
        subtitle={isBrand ? `@${creator.username}` : 'Tu cuenta'}
      />

      <View style={styles.body}>
        {/* 2. Tarjeta con Top 3 Videos por Engagement */}
        <Card style={styles.topVideosCard}>
          <Text style={styles.sectionHeading}>Top 3 por engagement</Text>
          <View style={styles.videosList}>
            {creator.topVideos.map((video, index) => {
              const bgGradient = `hsl(${video.hue}, 50%, 42%)`;

              return (
                <View key={video.title} style={styles.videoItem}>
                  {/* Thumbnail representativo con número de ranking y play */}
                  <View style={[styles.thumbnail, { backgroundColor: bgGradient }]}>
                    <Play size={16} color="#FFFFFF" />
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankBadgeText}>{index + 1}</Text>
                    </View>
                  </View>

                  {/* Metadatos del video */}
                  <View style={styles.videoMeta}>
                    <Text style={styles.videoTitle} numberOfLines={2}>
                      {video.title}
                    </Text>
                    <View style={styles.videoBadgesRow}>
                      <Text style={styles.engagementText}>
                        {video.engagement.toFixed(2)}%
                      </Text>
                      <ToneChip tone={video.tone} />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>

        {/* 3. Formato Sugerido con icono Lightbulb */}
        <Card style={styles.formatCard}>
          <View style={styles.formatIconCircle}>
            <Lightbulb size={22} color={colors.primary} strokeWidth={2} />
          </View>
          <View style={styles.formatContent}>
            <Text style={styles.formatTitle}>Formato sugerido</Text>
            <Text style={styles.formatBody}>{creator.format}</Text>
          </View>
        </Card>

        {/* 4. Recomendaciones Duales para Marca y Creador */}
        <View style={styles.dualCardsRow}>
          {recommendationItems.map(({ key, icon: IconComponent, title, text }, index) => {
            const isPrimaryCard = index === 0;

            return (
              <View
                key={key}
                style={[
                  styles.dualCard,
                  isPrimaryCard ? styles.dualCardPrimary : styles.dualCardSecondary,
                ]}
              >
                <IconComponent
                  size={20}
                  color={isPrimaryCard ? '#FFFFFF' : colors.primaryDark}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.dualCardTitle,
                    isPrimaryCard ? styles.dualCardTitlePrimary : styles.dualCardTitleSecondary,
                  ]}
                >
                  {title}
                </Text>
                <Text
                  style={[
                    styles.dualCardBody,
                    isPrimaryCard ? styles.dualCardBodyPrimary : styles.dualCardBodySecondary,
                  ]}
                >
                  {text}
                </Text>
              </View>
            );
          })}
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
  alertCard: {
    padding: 18,
    backgroundColor: '#FEF2F2',
    borderColor: colors.dangerBorder,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dangerText,
  },
  alertText: {
    fontSize: 14,
    color: colors.dangerText,
    lineHeight: 20,
  },
  topVideosCard: {
    padding: 18,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 14,
  },
  videosList: {
    gap: 14,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumbnail: {
    width: 48,
    height: 64,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  rankBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  rankBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.ink,
  },
  videoMeta: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
    lineHeight: 18,
  },
  videoBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  engagementText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  formatCard: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  formatIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatContent: {
    flex: 1,
  },
  formatTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
  },
  formatBody: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  dualCardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dualCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
  },
  dualCardPrimary: {
    backgroundColor: colors.primary,
  },
  dualCardSecondary: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primaryMint,
  },
  dualCardTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
  },
  dualCardTitlePrimary: {
    color: '#FFFFFF',
  },
  dualCardTitleSecondary: {
    color: colors.primaryDark,
  },
  dualCardBody: {
    marginTop: 4,
    fontSize: 12.5,
    lineHeight: 18,
  },
  dualCardBodyPrimary: {
    color: 'rgba(255, 255, 255, 0.92)',
  },
  dualCardBodySecondary: {
    color: '#064E3B',
  },
});
