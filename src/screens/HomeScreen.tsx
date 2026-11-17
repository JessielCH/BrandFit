import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useBrandFit } from '../context/BrandFitContext';
import { archetypeLabel } from '../data/creators';
import {
  AtSignIcon,
  ChevronRightIcon,
  CircleAlertIcon,
} from '../components/icons/BrandFitIcons';
import {
  Avatar,
  Button,
  Card,
  Logo,
  ScoreChip,
  SectionTitle,
} from '../components/ui';
import { palette, radii } from '../theme/tokens';
import { UsageMode } from '../types/brandfit';

const QUICK_SUGGESTIONS = ['alexmando15', 'musicadefresh', 'viralboost.mx'];

export function HomeScreen() {
  const { mode, setMode, startAnalysis, openCreator, recentCreators } =
    useBrandFit();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const isBrand = mode === 'marca';

  const handleSubmit = () => {
    const clean = username.trim().replace(/^@/, '');
    if (!clean) {
      setError('Escribe un @username.');
      return;
    }
    if (!/^[a-zA-Z0-9._]{2,24}$/.test(clean)) {
      setError('Usa solo letras, números, puntos o guiones bajos.');
      return;
    }
    setError('');
    startAnalysis(clean);
  };

  const handleQuickFill = (sample: string) => {
    setUsername(sample);
    if (error) setError('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Encabezado */}
        <View style={styles.headerBlock}>
          <Logo />
          <Text style={styles.tagline}>
            Compatibilidad de personalidad entre marcas e influencers
          </Text>
        </View>

        {/* 2. Selector de modo + Formulario */}
        <View style={styles.centerSection}>
          <View style={styles.segmentedControl}>
            {(['marca', 'creador'] as UsageMode[]).map((m) => {
              const active = mode === m;
              return (
                <TouchableOpacity
                  key={m}
                  activeOpacity={0.8}
                  onPress={() => setMode(m)}
                  style={[styles.segmentTab, active && styles.segmentTabActive]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      active && styles.segmentTextActive,
                    ]}
                  >
                    {m === 'marca' ? 'Modo Marca' : 'Modo Creador'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Card style={styles.formCard}>
            <Text style={styles.formTitle}>
              {isBrand ? '¿A quién analizamos?' : 'Analiza tu cuenta'}
            </Text>

            <View
              style={[
                styles.inputWrapper,
                focused && styles.inputWrapperFocused,
                !!error && styles.inputWrapperError,
              ]}
            >
              <AtSignIcon
                size={20}
                color={focused ? palette.primary : palette.muted}
              />
              <TextInput
                value={username}
                onChangeText={(val) => {
                  setUsername(val);
                  if (error) setError('');
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onSubmitEditing={handleSubmit}
                placeholder="username de TikTok"
                placeholderTextColor={palette.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                style={styles.input}
              />
            </View>

            {error ? (
              <View style={styles.errorRow}>
                <CircleAlertIcon size={15} color={palette.dangerDark} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Sugerencias rápidas para probar en Expo Go */}
            <View style={styles.suggestionsRow}>
              <Text style={styles.suggestionsLabel}>Ejemplos:</Text>
              {QUICK_SUGGESTIONS.map((sample) => (
                <TouchableOpacity
                  key={sample}
                  activeOpacity={0.7}
                  onPress={() => handleQuickFill(sample)}
                  style={styles.suggestionPill}
                >
                  <Text style={styles.suggestionText}>@{sample}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button onPress={handleSubmit} style={styles.submitBtn}>
              {isBrand ? 'Analizar creador' : 'Analizar mi cuenta'}
            </Button>

            <Text style={styles.helperCaption}>
              Analizamos los últimos 10 videos
            </Text>
          </Card>
        </View>

        {/* 3. Análisis recientes */}
        <View style={styles.recentSection}>
          <SectionTitle>Análisis recientes</SectionTitle>
          <View style={styles.recentList}>
            {recentCreators.map((item) => (
              <TouchableOpacity
                key={item.username}
                activeOpacity={0.78}
                onPress={() => openCreator(item)}
              >
                <Card style={styles.recentCard}>
                  <Avatar username={item.username} hue={item.hue} size={42} />
                  <View style={styles.recentMeta}>
                    <Text style={styles.recentUsername} numberOfLines={1}>
                      @{item.username}
                    </Text>
                    <Text style={styles.recentArchetype} numberOfLines={1}>
                      {archetypeLabel(item.lastArchetype)} · {item.analyzedAt}
                    </Text>
                  </View>
                  <ScoreChip score={item.scores[item.lastArchetype]} />
                  <ChevronRightIcon size={18} color={palette.placeholder} />
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  headerBlock: {
    marginBottom: 8,
  },
  tagline: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    color: palette.muted,
  },
  centerSection: {
    gap: 16,
    paddingVertical: 18,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: palette.segmentedBg,
    borderRadius: radii.md,
    padding: 4,
  },
  segmentTab: {
    flex: 1,
    height: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentTabActive: {
    backgroundColor: palette.surface,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.muted,
  },
  segmentTextActive: {
    color: palette.ink,
  },
  formCard: {
    padding: 22,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: palette.ink,
    marginBottom: 18,
  },
  inputWrapper: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    paddingHorizontal: 14,
  },
  inputWrapperFocused: {
    borderColor: palette.primary,
  },
  inputWrapperError: {
    borderColor: palette.danger,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: palette.ink,
  },
  errorRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  errorText: {
    fontSize: 13,
    color: palette.dangerDark,
    fontWeight: '500',
  },
  suggestionsRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  suggestionsLabel: {
    fontSize: 12,
    color: palette.muted,
    marginRight: 2,
  },
  suggestionPill: {
    backgroundColor: palette.surfaceSubtle,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
  },
  suggestionText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.inkSecondary,
  },
  submitBtn: {
    marginTop: 14,
    height: 54,
  },
  helperCaption: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 13,
    color: palette.muted,
  },
  recentSection: {
    marginTop: 4,
  },
  recentList: {
    gap: 10,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  recentMeta: {
    flex: 1,
  },
  recentUsername: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.ink,
  },
  recentArchetype: {
    marginTop: 2,
    fontSize: 13,
    color: palette.muted,
  },
});
