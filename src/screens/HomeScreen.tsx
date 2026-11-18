import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { CREATORS } from '../data/creators';
import { Logo, ScreenContainer, SectionTitle } from '../components/ui';
import { UsernameForm } from '../components/home/UsernameForm';
import { RecentCreatorItem } from '../components/home/RecentCreatorItem';
import { colors, fonts } from '../theme';

/** Pantalla 1 – Inicio: permite escribir el @username a analizar y ver análisis recientes. */
export function HomeScreen() {
  const { startAnalysis, openCreator } = useApp();

  return (
    <ScreenContainer style={styles.container}>
      {/* 1. Encabezado con el logo */}
      <View>
        <Logo />
        <Text style={styles.subtitle}>Compatibilidad de personalidad entre marcas e influencers</Text>
      </View>

      {/* 2. Formulario principal ("¿A quién analizamos?") */}
      <View style={styles.main}>
        <UsernameForm onSubmit={startAnalysis} />
      </View>

      {/* 3. Lista de análisis recientes */}
      <View>
        <SectionTitle>Análisis recientes</SectionTitle>
        <View style={styles.list}>
          {CREATORS.map((creator) => (
            <RecentCreatorItem
              key={creator.username}
              creator={creator}
              onPress={() => openCreator(creator)}
            />
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 12 },
  subtitle: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 20, color: colors.muted, marginTop: 8 },
  main: { flex: 1, justifyContent: 'center', paddingVertical: 24 },
  list: { gap: 10 },
});
