import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { BrandFitProvider, useBrandFit } from './src/context/BrandFitContext';
import { CREATORS } from './src/data/creators';
import { ScreenId } from './src/types/brandfit';
import { BottomTabBar } from './src/components/ui';
import {
  LayersIcon,
  ShieldAlertIcon,
} from './src/components/icons/BrandFitIcons';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { BenfordScreen } from './src/screens/BenfordScreen';
import { ScoreScreen } from './src/screens/ScoreScreen';
import { BigFiveScreen } from './src/screens/BigFiveScreen';
import { RecsScreen } from './src/screens/RecsScreen';
import { palette, radii } from './src/theme/tokens';

const PROTOTYPE_FRAMES: { id: ScreenId; label: string }[] = [
  { id: 'home', label: 'Inicio / Input' },
  { id: 'progress', label: 'Progreso del análisis' },
  { id: 'benford', label: 'Autenticidad (Benford)' },
  { id: 'score', label: 'Brand Fit Score' },
  { id: 'bigfive', label: 'Desglose Big Five' },
  { id: 'recs', label: 'Recomendaciones' },
];

function BrandFitShell() {
  const {
    screen,
    go,
    creator,
    setCreator,
    startAnalysis,
    simulateFraudAccount,
    simulateEmptyState,
  } = useBrandFit();
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const handleJumpFrame = (target: ScreenId) => {
    setInspectorOpen(false);
    if (target === 'progress') {
      startAnalysis(creator?.username ?? 'alexmando15');
      return;
    }
    const requiresData = ['benford', 'score', 'bigfive', 'recs'].includes(
      target
    );
    if (
      requiresData &&
      (!creator || (!creator.authentic && target !== 'benford'))
    ) {
      setCreator(CREATORS[0]);
    }
    go(target);
  };

  const renderActiveScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'benford':
        return <BenfordScreen />;
      case 'score':
        return <ScoreScreen />;
      case 'bigfive':
        return <BigFiveScreen />;
      case 'recs':
        return <RecsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showBottomTabs = screen !== 'progress';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />

      {/* Barra superior compacta para inspección de frames del prototipo */}
      <View style={styles.utilityBar}>
        <TouchableOpacity
          activeOpacity={0.78}
          onPress={() => setInspectorOpen(true)}
          style={styles.inspectorTrigger}
        >
          <LayersIcon size={14} color={palette.primary} />
          <Text style={styles.inspectorTriggerText}>Flujo de pantallas</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor principal de pantalla */}
      <View style={styles.mainContent}>{renderActiveScreen()}</View>

      {/* Navegación inferior */}
      {showBottomTabs && <BottomTabBar screen={screen} go={go} />}

      {/* Modal Inspector de Flujo y Estados Alternativos */}
      <Modal
        visible={inspectorOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setInspectorOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setInspectorOpen(false)}
          style={styles.modalBackdrop}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.sheetContainer}
          >
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetOverline}>PROTOTIPO BRANDFIT</Text>
                <Text style={styles.sheetTitle}>Flujo de pantallas</Text>
              </View>
              <TouchableOpacity
                onPress={() => setInspectorOpen(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>Cerrar</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.frameList}>
                {PROTOTYPE_FRAMES.map((frame, index) => {
                  const active = screen === frame.id;
                  return (
                    <TouchableOpacity
                      key={frame.id}
                      activeOpacity={0.78}
                      onPress={() => handleJumpFrame(frame.id)}
                      style={[
                        styles.frameItem,
                        active && styles.frameItemActive,
                      ]}
                    >
                      <View
                        style={[
                          styles.frameIndexBadge,
                          active && styles.frameIndexBadgeActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.frameIndexText,
                            active && styles.frameIndexTextActive,
                          ]}
                        >
                          {index + 1}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.frameLabel,
                          active && styles.frameLabelActive,
                        ]}
                      >
                        {frame.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.divider} />

              <Text style={styles.altStatesHeading}>Estados alternativos</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setInspectorOpen(false);
                  simulateFraudAccount();
                }}
                style={styles.fraudButton}
              >
                <ShieldAlertIcon size={18} color={palette.dangerDark} />
                <Text style={styles.fraudButtonText}>
                  Cuenta con patrón sospechoso
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setInspectorOpen(false);
                  simulateEmptyState();
                }}
                style={styles.emptyStateButton}
              >
                <Text style={styles.emptyStateButtonText}>
                  Análisis sin datos (vacío)
                </Text>
              </TouchableOpacity>

              <Text style={styles.tipCaption}>
                Tip: analiza un usuario con “bot” o “fake” para ver el flujo de
                fraude.
              </Text>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <BrandFitProvider>
        <BrandFitShell />
      </BrandFitProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  utilityBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 2,
  },
  inspectorTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: palette.primarySoft,
    borderWidth: 1,
    borderColor: palette.primaryBorder,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: radii.full,
  },
  inspectorTriggerText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.primaryDark,
  },
  mainContent: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: palette.surface,
    borderTopLeftRadius: radii.xxl,
    borderTopRightRadius: radii.xxl,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    maxHeight: '82%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sheetOverline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: palette.muted,
  },
  sheetTitle: {
    marginTop: 2,
    fontSize: 19,
    fontWeight: '700',
    color: palette.ink,
  },
  closeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.sm,
    backgroundColor: palette.surfaceSubtle,
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.inkSecondary,
  },
  frameList: {
    gap: 6,
  },
  frameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: radii.md,
    backgroundColor: palette.background,
  },
  frameItemActive: {
    backgroundColor: palette.primarySoft,
    borderWidth: 1,
    borderColor: palette.primaryBorder,
  },
  frameIndexBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameIndexBadgeActive: {
    backgroundColor: palette.primary,
  },
  frameIndexText: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.muted,
    fontVariant: ['tabular-nums'],
  },
  frameIndexTextActive: {
    color: '#FFFFFF',
  },
  frameLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: palette.inkSecondary,
  },
  frameLabelActive: {
    fontWeight: '700',
    color: palette.ink,
  },
  divider: {
    height: 1,
    backgroundColor: palette.line,
    marginVertical: 16,
  },
  altStatesHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.muted,
    marginBottom: 10,
  },
  fraudButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: palette.dangerBorder,
    backgroundColor: palette.dangerSurface,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  fraudButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.dangerDark,
  },
  emptyStateButton: {
    marginTop: 8,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.ink,
  },
  tipCaption: {
    marginTop: 12,
    fontSize: 13,
    lineHeight: 19,
    color: palette.muted,
  },
});
