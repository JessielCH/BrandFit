import type { ComponentType } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import type { ScreenId } from '../types';
import { colors } from '../theme';
import { TabBar } from './TabBar';
import { HomeScreen } from '../screens/HomeScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { BenfordScreen } from '../screens/BenfordScreen';
import { ScoreScreen } from '../screens/ScoreScreen';
import { BigFiveScreen } from '../screens/BigFiveScreen';
import { RecsScreen } from '../screens/RecsScreen';

// Diccionario que relaciona el nombre de cada pantalla con su componente visual
const SCREENS: Record<ScreenId, ComponentType> = {
  home: HomeScreen,
  progress: ProgressScreen,
  benford: BenfordScreen,
  score: ScoreScreen,
  bigfive: BigFiveScreen,
  recs: RecsScreen,
};

/**
 * Navegador principal:
 * muestra la pantalla activa según el estado `screen` y dibuja el TabBar abajo.
 */
export function AppNavigator() {
  const { screen, go } = useApp();
  const CurrentScreen = SCREENS[screen];
  const showTabs = screen !== 'progress'; // En la pantalla de carga se oculta el TabBar

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* `key={screen}` reinicia el scroll al cambiar de pantalla */}
      <View style={styles.content} key={screen}>
        <CurrentScreen />
      </View>
      {showTabs && <TabBar screen={screen} onNavigate={go} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
});
