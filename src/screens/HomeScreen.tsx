// feat: Pantalla de inicio (Home) con alternador de modo (Marca / Creador), formulario con validación y lista de recientes
// docs: Permite ingresar cualquier @username de TikTok o seleccionar creadores analizados previamente

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { archetypeLabel, CREATORS } from '../data/mockData';
import { Logo } from '../components/Logo';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { ScoreChip } from '../components/Chip';
import { SectionTitle } from '../components/SectionTitle';
import { AtSign, ChevronRight, CircleAlert, ShieldAlert } from '../components/Icons';
import { colors } from '../theme/colors';

export function HomeScreen() {
  const { mode, setMode, startAnalysis, openCreator, showFraud } = useApp();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const isBrand = mode === 'marca';

  // feat: Validación de formato para nombres de usuario de TikTok
  const handleSubmit = () => {
    const clean = username.trim().replace(/^@/, '');
    if (!clean) {
      setError('Escribe un @username de TikTok.');
      return;
    }
    if (!/^[a-zA-Z0-9._]{2,24}$/.test(clean)) {
      setError('Usa solo letras, números, puntos o guiones bajos.');
      return;
    }
    setError('');
    startAnalysis(clean);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1. Encabezado principal y Logo */}
        <View style={styles.header}>
          <Logo />
          <Text style={styles.headerSubtitle}>
            Compatibilidad de personalidad entre marcas e influencers
          </Text>
        </View>

        {/* 2. Selector de Modo (Marca vs Creador) */}
        <View style={styles.modeSelector}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMode('marca')}
            style={[styles.modeTab, isBrand && styles.modeTabActive]}
          >
            <Text style={[styles.modeText, isBrand && styles.modeTextActive]}>Modo Marca</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMode('creador')}
            style={[styles.modeTab, !isBrand && styles.modeTabActive]}
          >
            <Text style={[styles.modeText, !isBrand && styles.modeTextActive]}>Modo Creador</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Tarjeta de Entrada y Formulario */}
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>
            {isBrand ? '¿A quién analizamos?' : 'Analiza tu cuenta'}
          </Text>

          {/* Campo de texto con icono @ */}
          <View style={[styles.inputContainer, error ? styles.inputError : null]}>
            <AtSign size={20} color={colors.muted} strokeWidth={2} />
            <TextInput
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (error) setError('');
              }}
              placeholder="username de TikTok"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              style={styles.textInput}
            />
          </View>

          {/* Mensaje de error de validación */}
          {Boolean(error) && (
            <View style={styles.errorRow}>
              <CircleAlert size={15} color={colors.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Botón de análisis primario */}
          <Button onPress={handleSubmit} style={styles.submitButton}>
            {isBrand ? 'Analizar creador' : 'Analizar mi cuenta'}
          </Button>

          <Text style={styles.disclaimerText}>Analizamos los últimos 10 videos</Text>
        </Card>

        {/* 4. Lista de Análisis Recientes */}
        <View style={styles.recentSection}>
          <SectionTitle>Análisis recientes</SectionTitle>
          <View style={styles.recentList}>
            {CREATORS.map((creatorItem) => (
              <TouchableOpacity
                key={creatorItem.username}
                activeOpacity={0.7}
                onPress={() => openCreator(creatorItem)}
              >
                <Card style={styles.creatorCard}>
                  <Avatar username={creatorItem.username} hue={creatorItem.hue} size={42} />
                  <View style={styles.creatorInfo}>
                    <Text style={styles.creatorUsername} numberOfLines={1}>
                      @{creatorItem.username}
                    </Text>
                    <Text style={styles.creatorArchetype} numberOfLines={1}>
                      {archetypeLabel(creatorItem.lastArchetype)}
                    </Text>
                  </View>
                  <ScoreChip score={creatorItem.scores[creatorItem.lastArchetype]} />
                  <ChevronRight size={18} color={colors.placeholder} />
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 5. Acceso Rápido para simular anomalías o fraude en demos */}
        <View style={styles.demoSection}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={showFraud}
            style={styles.fraudDemoButton}
          >
            <ShieldAlert size={18} color={colors.dangerText} />
            <Text style={styles.fraudDemoText}>Probar detección de patrón sospechoso</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 20,
  },
  headerSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: colors.muted,
    lineHeight: 20,
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.subtle,
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  modeTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.muted,
  },
  modeTextActive: {
    color: colors.ink,
  },
  formCard: {
    padding: 22,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.4,
    marginBottom: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.2,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  inputError: {
    borderColor: colors.danger,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.ink,
    paddingVertical: 0,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  errorText: {
    fontSize: 13,
    color: colors.dangerText,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 14,
    height: 52,
  },
  disclaimerText: {
    marginTop: 12,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 16,
  },
  recentList: {
    gap: 10,
  },
  creatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  creatorInfo: {
    flex: 1,
    minWidth: 0,
  },
  creatorUsername: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.ink,
  },
  creatorArchetype: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  demoSection: {
    marginTop: 12,
  },
  fraudDemoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    backgroundColor: '#FFF5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  fraudDemoText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.dangerText,
  },
});
