// feat: Pantalla de Brand Fit Score con indicador circular interactivo y selector de arquetipo
// docs: Evalúa el encaje entre los valores de la marca y la personalidad del creador en escala 0 a 100

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { ARCHETYPES, archetypeLabel, engagementBonus } from '../data/mockData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Chip } from '../components/Chip';
import { ScreenHeader } from '../components/ScreenHeader';
import { CircularGauge } from '../components/CircularGauge';
import { Check, ChevronDown, ChevronRight } from '../components/Icons';
import { NoAnalysisScreen } from './NoAnalysisScreen';
import { colors } from '../theme/colors';

export function ScoreScreen() {
  const { creator, archetype, setArchetype, go } = useApp();
  const [modalVisible, setModalVisible] = useState(false);

  if (!creator) {
    return <NoAnalysisScreen />;
  }

  const score = creator.scores[archetype] ?? 0;
  const currentLabel = archetypeLabel(archetype);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* 1. Encabezado con Avatar en la esquina derecha */}
      <ScreenHeader
        title="Brand Fit Score"
        subtitle={`@${creator.username}`}
        right={<Avatar username={creator.username} hue={creator.hue} size={36} />}
      />

      <View style={styles.body}>
        {/* 2. Selector Desplegable de Arquetipo de Marca */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
          style={styles.archetypeSelectorButton}
        >
          <Text style={styles.archetypeSelectorText}>{currentLabel}</Text>
          <ChevronDown size={20} color={colors.muted} />
        </TouchableOpacity>

        {/* Modal de selección de Arquetipos */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecciona el arquetipo de marca</Text>
              <View style={styles.archetypeList}>
                {ARCHETYPES.map((arch) => {
                  const isSelected = arch.id === archetype;
                  return (
                    <TouchableOpacity
                      key={arch.id}
                      activeOpacity={0.7}
                      onPress={() => {
                        setArchetype(arch.id);
                        setModalVisible(false);
                      }}
                      style={[
                        styles.archetypeOption,
                        isSelected && styles.archetypeOptionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.archetypeOptionText,
                          isSelected && styles.archetypeOptionTextSelected,
                        ]}
                      >
                        {arch.label}
                      </Text>
                      {isSelected && (
                        <Check size={18} color={colors.primary} strokeWidth={2.5} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* 3. Tarjeta Principal con Medidor Circular */}
        <Card style={styles.gaugeCard}>
          <CircularGauge score={score} size={230} strokeWidth={15} />
          <Text style={styles.fitTitle}>Fit con {currentLabel}</Text>
          <Text style={styles.fitSubtitle}>Personalidad, engagement y tono</Text>
        </Card>

        {/* 4. Resumen de Métricas de Apoyo (Chips) */}
        <View style={styles.chipsContainer}>
          <Chip tone="success">
            <Text style={styles.chipTextBold}>
              Engagement {creator.engagement}% · Bono +{engagementBonus(creator.engagement)}
            </Text>
          </Chip>
          <Chip tone="neutral">
            <Text style={styles.chipTextNeutral}>
              Tono: {creator.tone.pos} pos / {creator.tone.neu} neu / {creator.tone.neg} neg
            </Text>
          </Chip>
        </View>

        {/* 5. Acción para Desglose Big Five */}
        <Button onPress={() => go('bigfive')} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Ver análisis detallado</Text>
          <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.4} />
        </Button>
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
  archetypeSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  archetypeSelectorText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 14,
  },
  archetypeList: {
    gap: 6,
  },
  archetypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  archetypeOptionSelected: {
    backgroundColor: colors.primarySoft,
  },
  archetypeOptionText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.ink,
  },
  archetypeOptionTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  gaugeCard: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fitTitle: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
    textAlign: 'center',
  },
  fitSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipTextBold: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.successText,
  },
  chipTextNeutral: {
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
  },
  actionButton: {
    marginTop: 8,
    height: 50,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
