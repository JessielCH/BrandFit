/**
 * @file RecsScreen.tsx
 * @description Pantalla de recomendaciones estratégicas de contenido para la marca.
 * Aísla los 3 videos de mayor tracción del creador (con tasa de engagement, vistas y tono)
 * y emite una recomendación accionable sobre el formato específico de contenido más efectivo.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useApp } from '../context'
import { canShowRecommendations } from '../domain'
import { avatarColors } from '../data/helpers'
import { Card, ScreenHeader, ToneChip, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import NoAnalysis from './NoAnalysis'

/**
 * Pantalla de Recomendaciones: Entrega directrices operativas a la marca para orientar
 * los formatos de video de la campaña comercial con el creador.
 */
export default function RecsScreen() {
  const { creator } = useApp()

  // docs: Si no hay análisis activo en memoria, muestra el estado vacío informativo
  if (!creator) return <NoAnalysis kind="recs" />

  // RN-06: Bloqueo de recomendaciones si la cuenta no es auténtica
  if (!canShowRecommendations(creator.authentic)) {
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
      {/* 1. Encabezado de la pantalla */}
      <ScreenHeader title="Qué contenido funciona mejor" subtitle={`@${creator.username}`} />

      {/* 2. Lista de los 3 videos con mayor rendimiento orgánico */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Top 3 por engagement</Text>
        {creator.topVideos.map((v, i) => {
          const [colorA, colorB] = avatarColors(v.hue)
          return (
            <View
              key={v.title}
              style={[styles.videoRow, i < creator.topVideos.length - 1 && styles.videoBorder]}
            >
              {/* Miniatura generada con gradiente dinámico e icono de reproducción */}
              <LinearGradient
                colors={[colorA, colorB]}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.thumbnail}
              >
                <Ionicons name="play" size={20} color={Colors.white} />
              </LinearGradient>

              {/* Información y métricas del video */}
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {v.title}
                </Text>
                <View style={styles.videoMeta}>
                  <Text style={styles.videoEngagement}>{v.engagement}% eng.</Text>
                  <Text style={styles.metaDot}>·</Text>
                  <Text style={styles.videoViews}>{v.views} vistas</Text>
                  <ToneChip tone={v.tone} />
                </View>
              </View>
            </View>
          )
        })}
      </Card>

      {/* 3. Tarjeta de Formato Sugerido para la Marca */}
      <Card style={styles.card}>
        <View style={styles.suggestedHeader}>
          <Ionicons name="bulb-outline" size={20} color={Colors.primary} />
          <Text style={styles.cardTitle}>Formato sugerido</Text>
        </View>
        <Text style={styles.suggestedBody}>{creator.format}</Text>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1, backgroundColor: Colors.bg },
  content: {
    paddingBottom: Spacing['3xl'],
  },
  card: {
    marginHorizontal: Spacing['2xl'],
    padding: Spacing['2xl'],
    marginBottom: Spacing.xl,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.lg,
  },
  videoRow: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 12,
  },
  videoBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  videoInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  videoTitle: {
    fontSize: FontSize.base,
    fontWeight: '500',
    color: Colors.ink,
    lineHeight: FontSize.base * 1.35,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  videoEngagement: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  metaDot: {
    fontSize: FontSize.xs,
    color: Colors.muted,
  },
  videoViews: {
    fontSize: FontSize.sm,
    color: Colors.muted,
  },
  suggestedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  suggestedBody: {
    fontSize: FontSize.base,
    color: Colors.muted,
    lineHeight: FontSize.base * 1.5,
  },
  fraudWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing['3xl'],
  },
  fraudText: {
    fontSize: FontSize.base,
    color: Colors.dangerText,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.4,
  },
})
