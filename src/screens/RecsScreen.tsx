import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card, ScreenContainer, ScreenHeader } from '../components/ui';
import { VideoItem } from '../components/recs/VideoItem';
import { RecommendationCard } from '../components/recs/RecommendationCard';
import { NoAnalysisScreen } from './NoAnalysisScreen';
import { colors, fonts, radius } from '../theme';

const TITLE = 'Qué contenido funciona mejor';

/** Pantalla 6 – Recomendaciones: muestra el Top 3 de videos y la tarjeta amplia de formato sugerido + recomendación. */
export function RecsScreen() {
  const { creator } = useApp();
  if (!creator) return <NoAnalysisScreen kind="recs" />;

  // Si la cuenta es sospechosa, se muestra un aviso en lugar de recomendaciones
  if (!creator.authentic) {
    return (
      <ScreenContainer>
        <ScreenHeader title={TITLE} subtitle={`@${creator.username}`} />
        <Text style={styles.warning}>Sin recomendaciones: el engagement de esta cuenta no es confiable.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      {/* 1. Encabezado */}
      <ScreenHeader title={TITLE} subtitle={`@${creator.username}`} />

      <View style={styles.body}>
        {/* 2. Top 3 videos con mayor engagement */}
        <Card style={styles.topCard}>
          <Text style={styles.cardTitle}>Top 3 por engagement</Text>
          <View style={styles.videos}>
            {creator.topVideos.map((video, i) => (
              <VideoItem key={video.title} video={video} rank={i + 1} />
            ))}
          </View>
        </Card>

        {/* 3. Tarjeta grande de Formato sugerido + recomendación */}
        <RecommendationCard format={creator.format} recommendation={creator.recommendation} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, gap: 16, paddingHorizontal: 20 },
  warning: {
    marginHorizontal: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    borderRadius: radius.lg,
    backgroundColor: colors.dangerSoft,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.dangerText,
  },
  topCard: { padding: 16 },
  cardTitle: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  videos: { gap: 16, marginTop: 16 },
});
