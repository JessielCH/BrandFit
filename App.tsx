// feat: Componente raíz de la aplicación BrandFit Mobile compatible con Expo Go
// docs: Configura SafeAreaProvider, AppProvider, barra de estado y enrutamiento dinámico de pantallas

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AppProvider, useApp } from './src/context/AppContext';
import { ScreenId } from './src/types';
import { CREATORS } from './src/data/mockData';
import { TabBar } from './src/components/TabBar';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { BenfordScreen } from './src/screens/BenfordScreen';
import { ScoreScreen } from './src/screens/ScoreScreen';
import { BigFiveScreen } from './src/screens/BigFiveScreen';
import { RecsScreen } from './src/screens/RecsScreen';
import { ShieldAlert } from './src/components/Icons';
import { colors } from './src/theme/colors';

// docs: Lista de frames para inspección rápida y navegación directa durante desarrollo o demos
const FRAMES: { id: ScreenId; label: string }[] = [
  { id: 'home', label: '1. Inicio / Input' },
  { id: 'progress', label: '2. Progreso del análisis' },
  { id: 'benford', label: '3. Autenticidad (Benford)' },
  { id: 'score', label: '4. Brand Fit Score' },
  { id: 'bigfive', label: '5. Desglose Big Five' },
  { id: 'recs', label: '6. Recomendaciones' },
];

function MainNavigator() {
  const { screen, go, creator, setCreator, startAnalysis, showFraud } = useApp();
  const [devMenuVisible, setDevMenuVisible] = useState(false);

  // feat: Navegador rápido de frames para pruebas y demostración
  const jumpToScreen = (targetId: ScreenId) => {
    if (targetId === 'progress') {
      startAnalysis(creator?.username ?? 'alexmando15');
      setDevMenuVisible(false);
      return;
    }
    const needsData = ['benford', 'score', 'bigfive', 'recs'].includes(targetId);
    if (needsData && (!creator || (!creator.authentic && targetId !== 'benford'))) {
      setCreator(CREATORS[0]);
    }
    go(targetId);
    setDevMenuVisible(false);
  };

  // note: Renderizado condicional de la pantalla activa
  const renderScreen = () => {
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

  const showTabs = screen !== 'progress';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" backgroundColor={colors.background} />

      {/* Barra superior con botón flotante discreto para demo/cambio rápido de frames */}
      <View style={styles.topUtilityBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setDevMenuVisible(true)}
          style={styles.devMenuTrigger}
        >
          <Text style={styles.devMenuTriggerText}>⚙️ Flujo / Frames</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor principal de la pantalla */}
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {/* Barra de navegación inferior móvil */}
      {showTabs && <TabBar screen={screen} go={go} />}

      {/* Modal interactivo de navegación rápida por frames */}
      <Modal
        visible={devMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDevMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setDevMenuVisible(false)}
        >
          <View style={styles.devMenuSheet}>
            <View style={styles.devMenuHeader}>
              <Text style={styles.devMenuTitle}>Navegador de Pantallas (Figma Frames)</Text>
              <TouchableOpacity onPress={() => setDevMenuVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.framesScrollView}>
              <Text style={styles.sectionSubtitle}>PANTALLAS DISPONIBLES</Text>
              {FRAMES.map((f) => {
                const isCurrent = screen === f.id;
                return (
                  <TouchableOpacity
                    key={f.id}
                    onPress={() => jumpToScreen(f.id)}
                    style={[styles.frameRow, isCurrent && styles.frameRowActive]}
                  >
                    <Text
                      style={[
                        styles.frameRowText,
                        isCurrent && styles.frameRowTextActive,
                      ]}
                    >
                      {f.label}
                    </Text>
                    {isCurrent && <Text style={styles.activePill}>Activa</Text>}
                  </TouchableOpacity>
                );
              })}

              <View style={styles.devMenuDivider} />

              <Text style={styles.sectionSubtitle}>ESTADOS ESPECIALES</Text>
              <TouchableOpacity
                onPress={() => {
                  showFraud();
                  setDevMenuVisible(false);
                }}
                style={styles.fraudTestButton}
              >
                <ShieldAlert size={18} color={colors.dangerText} />
                <Text style={styles.fraudTestText}>Simular cuenta con patrón sospechoso</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setCreator(null);
                  go('score');
                  setDevMenuVisible(false);
                }}
                style={styles.emptyTestButton}
              >
                <Text style={styles.emptyTestText}>Simular análisis vacío (sin datos)</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topUtilityBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  devMenuTrigger: {
    backgroundColor: colors.subtle,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  devMenuTriggerText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  screenContainer: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  devMenuSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  devMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  devMenuTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.ink,
  },
  closeButtonText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: '600',
  },
  framesScrollView: {
    marginVertical: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    marginBottom: 8,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  frameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  frameRowActive: {
    backgroundColor: colors.primarySoft,
  },
  frameRowText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.ink,
  },
  frameRowTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  activePill: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primaryMint,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  devMenuDivider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 14,
  },
  fraudTestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.dangerSoft,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  fraudTestText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dangerText,
  },
  emptyTestButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    borderRadius: 10,
  },
  emptyTestText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.ink,
  },
});
