import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useBrandFit } from '../context/BrandFitContext';
import {
  BuildingIcon,
  LightbulbIcon,
  PlayIcon,
  UserRoundIcon,
} from '../components/icons/BrandFitIcons';
import { Card, ScreenHeader, ToneChip } from '../components/ui';
import { hslToHex, palette, radii } from '../theme/tokens';
import { NoAnalysisScreen } from './NoAnalysisScreen';

export function RecsScreen() {
  const { creator, mode } = useBrandFit();

  if (!creator) {
    return <NoAnalysisScreen kind="recs" />;
  }

  if (!creator.authentic) {
    return (
      <View style={styles.flex}>
        <ScreenHeader
          title="Qué contenido funciona mejor"
          subtitle={`@${creator.username}`}
        />
        <View style={styles.fraudWarningBox}>
          <Text style={styles.fraudWarningText}>
            Sin recomendaciones: el engagement de esta cuenta no es confiable.
          </Text>
        </View>
      </View>
    );
  }

  const isBrand = mode === 'marca';
  const cards = [
    {
      key: 'brand',
      Icon: BuildingIcon,
      title: 'Para la marca',
      text: creator.forBrand,
    },
    {
      key: 'creator',
      Icon: UserRoundIcon,
      title: 'Para el creador',
      text: creator.forCreator,
    },
  ];

  if (!isBrand) {
    cards.reverse();
  }

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Qué contenido funciona mejor"
        subtitle={isBrand ? `@${creator.username}` : 'Tu cuenta'}
      />

      <View style={styles.body}>
        {/* 2. Top 3 por engagement */}
        <Card style={styles.topCard}>
          <Text style={styles.cardSectionTitle}>Top 3 por engagement</Text>
          <View style={styles.videoList}>
            {creator.topVideos.map((video, index) => {
              const thumbBg = hslToHex(video.hue, 52, 46);
              return (
                <View key={video.title} style={styles.videoRow}>
                  <View
                    style={[styles.thumbnail, { backgroundColor: thumbBg }]}
                  >
                    <PlayIcon size={16} color="#FFFFFF" />
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankText}>{index + 1}</Text>
                    </View>
                  </View>

                  <View style={styles.videoDetails}>
                    <Text style={styles.videoTitle} numberOfLines={1}>
                      {video.title}
                    </Text>
                    <View style={styles.videoMetaRow}>
                      <Text style={styles.videoEngagement}>
                        {video.engagement.toFixed(2)}%
                      </Text>
                      <ToneChip tone={video.tone} />
                      <Text style={styles.videoViews}>{video.views} vistas</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>

        {/* 3. Formato sugerido */}
        <Card style={styles.formatCard}>
          <View style={styles.formatIconBox}>
            <LightbulbIcon size={20} color={palette.primary} />
          </View>
          <View style={styles.formatTextCol}>
            <Text style={styles.cardSectionTitle}>Formato sugerido</Text>
            <Text style={styles.formatBody}>{creator.format}</Text>
          </View>
        </Card>

        {/* 4. Recomendaciones duales (Marca / Creador) */}
        <View style={styles.dualGrid}>
          {cards.map(({ key, Icon, title, text }, idx) => {
            const isHighlighted = idx === 0;
            return (
              <View
                key={key}
                style={[
                  styles.dualCard,
                  isHighlighted
                    ? styles.dualCardPrimary
                    : styles.dualCardSecondary,
                ]}
              >
                <Icon
                  size={20}
                  color={isHighlighted ? '#FFFFFF' : palette.primaryDeep}
                />
                <Text
                  style={[
                    styles.dualTitle,
                    isHighlighted
                      ? styles.dualTitlePrimary
                      : styles.dualTitleSecondary,
                  ]}
                >
                  {title}
                </Text>
                <Text
                  style={[
                    styles.dualBody,
                    isHighlighted
                      ? styles.dualBodyPrimary
                      : styles.dualBodySecondary,
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
  fraudWarningBox: {
    marginHorizontal: 20,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: palette.dangerBorder,
    backgroundColor: palette.dangerSurface,
    padding: 16,
  },
  fraudWarningText: {
    fontSize: 15,
    color: palette.dangerText,
    lineHeight: 22,
  },
  topCard: {
    padding: 16,
  },
  cardSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.ink,
  },
  videoList: {
    marginTop: 14,
    gap: 14,
  },
  videoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumbnail: {
    width: 48,
    height: 64,
    borderRadius: radii.sm,
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
  rankText: {
    fontSize: 11,
    fontWeight: '700',
    color: palette.ink,
    fontVariant: ['tabular-nums'],
  },
  videoDetails: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.ink,
  },
  videoMetaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  videoEngagement: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.primary,
    fontVariant: ['tabular-nums'],
  },
  videoViews: {
    fontSize: 12,
    color: palette.muted,
    marginLeft: 'auto',
  },
  formatCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
  },
  formatIconBox: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: palette.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatTextCol: {
    flex: 1,
  },
  formatBody: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: palette.inkSecondary,
  },
  dualGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  dualCard: {
    flex: 1,
    borderRadius: radii.lg,
    padding: 16,
  },
  dualCardPrimary: {
    backgroundColor: palette.primary,
  },
  dualCardSecondary: {
    backgroundColor: palette.primarySoft,
    borderWidth: 1,
    borderColor: palette.primaryMint,
  },
  dualTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
  },
  dualTitlePrimary: {
    color: '#FFFFFF',
  },
  dualTitleSecondary: {
    color: palette.primaryDeep,
  },
  dualBody: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },
  dualBodyPrimary: {
    color: 'rgba(255, 255, 255, 0.92)',
  },
  dualBodySecondary: {
    color: palette.primaryDeep,
  },
});
