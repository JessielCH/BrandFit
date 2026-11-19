/**
 * @file HomeScreen.tsx
 * @description Pantalla principal de BrandFit Mobile.
 * Ofrece la barra de búsqueda y validación de nombres de usuario de TikTok/redes sociales,
 * junto con la visualización interactiva de análisis recientes y consejos de prueba.
 *
 * @author BrandFit Team
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
import { useApp } from '../application'
import { CREATORS } from '../infrastructure'
import { archetypeLabel, validateCreatorUsername } from '../domain'
import { Avatar, Button, Card, Logo, ScoreChip, SectionTitle, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'

/**
 * Pantalla de Inicio: Punto de entrada donde la marca ingresa el nombre de usuario
 * a auditar o consulta perfiles previamente analizados.
 */
export default function HomeScreen() {
  const { startAnalysis, openCreator } = useApp()
  // docs: Estado local del campo de entrada de texto
  const [value, setValue] = useState('')
  // docs: Estado local de errores de validación de formato
  const [error, setError] = useState('')

  /**
   * Invoca la regla de negocio RN-01 (`validateCreatorUsername`) de la Capa de Dominio
   * antes de disparar el Caso de Uso de análisis (`startAnalysis`).
   */
  function submit() {
    const { clean, error: validationError } = validateCreatorUsername(value)
    if (validationError) return setError(validationError)
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
        {/* 1. Encabezado con Logotipo institucional */}
        <View style={styles.header}>
          <Logo />
          <Text style={styles.tagline}>
            Compatibilidad de personalidad entre marcas e influencers
          </Text>
        </View>

        {/* 2. Tarjeta del Formulario de Búsqueda */}
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>¿A quién analizamos?</Text>

          {/* docs: Input estilizado con icono de arroba y estado de error dinámico */}
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

          {/* docs: Mensaje de error si la validación falla */}
          {error ? (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={15} color={Colors.dangerText} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* docs: Botón de envío */}
          <Button onPress={submit} style={styles.submitBtn}>
            Analizar creador
          </Button>

          <Text style={styles.hint}>Analizamos los últimos 10 videos</Text>

          {/* docs: Sugerencia interactiva para probar casos de cuentas con anomalías */}
          <View style={styles.tipBox}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
            <Text style={styles.tipText}>
              Tip: analiza <Text style={styles.tipBold}>"bot"</Text> o <Text style={styles.tipBold}>"fake"</Text> para ver el flujo con anomalías.
            </Text>
          </View>
        </Card>

        {/* 3. Sección de Análisis Recientes */}
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
