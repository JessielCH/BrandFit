/**
 * HomeScreen – formulario de búsqueda + lista de análisis recientes.
 * Migrado desde src/brandfit/screens/Home.tsx del prototipo web.
 */
import React, { useState } from 'react'
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { CREATORS } from '../domain'
import { archetypeLabel, validateCreatorUsername } from '../domain'
import { Avatar, Button, Card, Logo, ScoreChip, SectionTitle, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'

export default function HomeScreen() {
  const { startAnalysis, openCreator } = useApp()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function submit() {
    // RN-01: validación y sanitización del @username via Domain Service
    const { valid, clean, error: ruleError } = validateCreatorUsername(value)
    if (!valid) return setError(ruleError ?? 'Username inválido.')
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
              returnKeyType="search"
              onSubmitEditing={submit}
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

          {/* Tip interactivo para probar estado de fraude */}
          <View style={styles.tipBox}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
            <Text style={styles.tipText}>
              Tip: analiza <Text style={styles.tipBold}>"bot"</Text> o <Text style={styles.tipBold}>"fake"</Text> para ver el flujo con anomalías.
            </Text>
          </View>
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
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.sm + 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginTop: 4,
  },
  tipText: {
    flex: 1,
    fontSize: FontSize.xs + 1,
    color: Colors.primaryDark,
    lineHeight: 18,
  },
  tipBold: {
    fontWeight: '700',
    color: Colors.primaryDark,
  },

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
