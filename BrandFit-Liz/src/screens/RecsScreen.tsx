/**
 * RecsScreen – top 3 videos por engagement + formato sugerido.
 * Migrado desde src/brandfit/screens/Recs.tsx del prototipo web.
 */
import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useApp } from '../context'
import { avatarColors } from '../data/helpers'
import { Card, ScreenHeader, ToneChip } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import NoAnalysis from './NoAnalysis'

export default function RecsScreen() {
  const { creator } = useApp()

  if (!creator) return <NoAnalysis kind="recs" />

  // Cuenta con patrón sospechoso: sin recomendaciones
  if (!creator.authentic) {
    return (
      <View style={styles.flex}>
        <ScreenHeader title="Qué contenido funciona mejor" subtitle={`@${creator.username}`} />
        <View style={styles.fraudWrap}>
          <Text style={styles.fraudText}>
            Sin recomendaciones: el engagement de esta cuenta no es confiable.
          </Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado */}
      <ScreenHeader title="Qué contenido funciona mejor" subtitle={`@${creator.username}`} />

      {/* 2. Top 3 por engagement */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Top 3 por engagement</Text>
        {creator.topVideos.map((v, i) => {
          const [colorA, colorB] = avatarColors(v.hue)
          return (
            <View
              key={v.title}
              style={[styles.videoRow, i < creator.topVideos.length - 1 && styles.videoBorder]}
            >
              {/* Miniatura con gradiente */}
              <LinearGradient
                colors={[colorA, colorB]}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.thumbnail}
              >
                <Ionicons name="play" size={20} color={Colors.white} />
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{i + 1}</Text>
                </View>
              </LinearGradient>

              {/* Info del video */}
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>{v.title}</Text>
                <View style={styles.videoMeta}>
                  <Text style={styles.videoEngagement}>{v.engagement.toFixed(2)}%</Text>
                  <ToneChip tone={v.tone} />
                </View>
                <Text style={styles.videoViews}>{v.views} vistas</Text>
              </View>
            </View>
          )
        })}
      </Card>

      {/* 3. Formato sugerido */}
      <View style={styles.formatCard}>
        <View style={styles.formatIconWrap}>
          <Ionicons name="bulb-outline" size={22} color={Colors.white} strokeWidth={1.8} />
        </View>
        <View style={styles.formatBody}>
          <Text style={styles.formatTitle}>Formato sugerido</Text>
          <Text style={styles.formatText}>{creator.format}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1, backgroundColor: Colors.bg },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    gap: 16,
  },

  // Fraude
  fraudWrap: {
    marginHorizontal: Spacing['2xl'],
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
    backgroundColor: '#FEF2F2',
    padding: 16,
  },
  fraudText: { fontSize: FontSize.base, color: Colors.dangerText, lineHeight: FontSize.base * 1.5 },

  // Card top 3
  card: { padding: 20, gap: 0 },
  cardTitle: { fontSize: FontSize.base, fontWeight: '600', color: Colors.ink, marginBottom: 8 },

  // Video row
  videoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  videoBorder: { borderBottomWidth: 1, borderBottomColor: Colors.line },

  thumbnail: {
    width: 64,
    height: 84,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rankBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  rankText: { fontSize: 11, fontWeight: '700', color: Colors.ink },

  videoInfo: { flex: 1, minWidth: 0 },
  videoTitle: {
    fontSize: FontSize.base,
    fontWeight: '500',
    color: Colors.ink,
    lineHeight: FontSize.base * 1.35,
  },
  videoMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  videoEngagement: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.primary },
  videoViews: { fontSize: FontSize.sm, color: Colors.muted, marginTop: 4 },

  // Formato sugerido
  formatCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: 20,
  },
  formatIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  formatBody: { flex: 1 },
  formatTitle: { fontSize: FontSize.base, fontWeight: '600', color: Colors.white },
  formatText: {
    marginTop: 4,
    fontSize: FontSize.sm + 1,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: (FontSize.sm + 1) * 1.6,
  },
})
