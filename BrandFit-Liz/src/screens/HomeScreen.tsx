/**
 * HomeScreen – formulario de búsqueda + lista de análisis recientes.
 * Migrado desde src/brandfit/screens/Home.tsx del prototipo web.
 */
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { CREATORS } from '../data/constants'
import { archetypeLabel } from '../data/helpers'
import { Avatar, Button, Card, Logo, ScoreChip, SectionTitle } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'

export default function HomeScreen() {
  const { startAnalysis, openCreator } = useApp()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function submit() {
    const clean = value.trim().replace(/^@/, '')
    if (!clean) return setError('Escribe un @username.')
    if (!/^[a-zA-Z0-9._]{2,24}$/.test(clean))
      return setError('Usa solo letras, números, puntos o guiones bajos.')
    setError('')
    startAnalysis(clean)
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Encabezado */}
        <View style={styles.header}>
          <Logo />
          <Text style={styles.tagline}>
            Compatibilidad de personalidad entre marcas e influencers
          </Text>
        </View>

        {/* 2. Formulario */}
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>¿A quién analizamos?</Text>

          <View style={[styles.inputRow, error ? styles.inputError : styles.inputNormal]}>
            <Ionicons name="at" size={20} color={Colors.muted} />
            <TextInput
              value={value}
              onChangeText={(t) => { setValue(t); if (error) setError('') }}
              placeholder="username de TikTok"
              placeholderTextColor={Colors.placeholder}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>

          {error ? (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={15} color={Colors.dangerText} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Button onPress={submit} style={styles.submitBtn}>
            Analizar creador
          </Button>

          <Text style={styles.hint}>Analizamos los últimos 10 videos</Text>
        </Card>

        {/* 3. Recientes */}
        <View style={styles.recent}>
          <SectionTitle>Análisis recientes</SectionTitle>
          {CREATORS.map((c) => (
            <TouchableOpacity
              key={c.username}
              onPress={() => openCreator(c)}
              activeOpacity={0.75}
              style={styles.creatorBtn}
            >
              <Card style={styles.creatorCard}>
                <Avatar username={c.username} hue={c.hue} />
                <View style={styles.creatorInfo}>
                  <Text style={styles.creatorName} numberOfLines={1}>
                    @{c.username}
                  </Text>
                  <Text style={styles.creatorArchetype} numberOfLines={1}>
                    {archetypeLabel(c.lastArchetype)}
                  </Text>
                </View>
                <ScoreChip score={c.scores[c.lastArchetype]} />
                <Ionicons name="chevron-forward" size={18} color={Colors.placeholder} />
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flex: 1, backgroundColor: Colors.bg },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },

  // Header
  header: { gap: Spacing.md },
  tagline: { fontSize: FontSize.base, color: Colors.muted, lineHeight: FontSize.base * 1.4 },

  // Form card
  formCard: { padding: 24, gap: Spacing.lg },
  formTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.ink,
    letterSpacing: -0.4,
    marginBottom: Spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  inputNormal: { borderColor: Colors.line },
  inputError: { borderColor: Colors.danger },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.ink,
    height: '100%',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -Spacing.sm,
  },
  errorText: { fontSize: FontSize.sm, color: Colors.dangerText },
  submitBtn: { marginTop: Spacing.sm },
  hint: { fontSize: FontSize.sm, color: Colors.muted, textAlign: 'center' },

  // Recientes
  recent: { gap: Spacing.md },
  creatorBtn: {},
  creatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  creatorInfo: { flex: 1, minWidth: 0 },
  creatorName: { fontSize: FontSize.base, fontWeight: '600', color: Colors.ink },
  creatorArchetype: { fontSize: FontSize.sm, color: Colors.muted, marginTop: 2 },
})
