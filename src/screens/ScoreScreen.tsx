import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useBrandFit } from '../context/BrandFitContext';
import {
  ARCHETYPES,
  archetypeDescription,
  archetypeLabel,
  engagementBonus,
} from '../data/creators';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '../components/icons/BrandFitIcons';
import {
  Avatar,
  Button,
  Card,
  Chip,
  ScoreRing,
  ScreenHeader,
} from '../components/ui';
import { palette, radii } from '../theme/tokens';
import { NoAnalysisScreen } from './NoAnalysisScreen';

export function ScoreScreen() {
  const { creator, archetype, setArchetype, go } = useBrandFit();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!creator) {
    return <NoAnalysisScreen />;
  }

  const score = creator.scores[archetype];
  const label = archetypeLabel(archetype);
  const description = archetypeDescription(archetype);
  const bonus = engagementBonus(creator.engagement);

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Brand Fit Score"
        subtitle={`@${creator.username}`}
        right={
          <Avatar username={creator.username} hue={creator.hue} size={38} />
        }
      />

      <View style={styles.body}>
        {/* 2. Selector de arquetipo */}
        <View style={styles.selectorWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setDropdownOpen((prev) => !prev)}
            style={[
              styles.selectorTrigger,
              dropdownOpen && styles.selectorTriggerOpen,
            ]}
          >
            <Text style={styles.selectorLabel} numberOfLines={1}>
              {label}
            </Text>
            <View
              style={
                dropdownOpen ? styles.chevronRotated : undefined
              }
            >
              <ChevronDownIcon size={20} color={palette.muted} />
            </View>
          </TouchableOpacity>

          {dropdownOpen && (
            <Card style={styles.dropdownMenu}>
              {ARCHETYPES.map((item) => {
                const selected = item.id === archetype;
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.75}
                    onPress={() => {
                      setArchetype(item.id);
                      setDropdownOpen(false);
                    }}
                    style={[
                      styles.dropdownOption,
                      selected && styles.dropdownOptionSelected,
                    ]}
                  >
                    <View style={styles.dropdownTextCol}>
                      <Text
                        style={[
                          styles.dropdownOptionTitle,
                          selected && styles.dropdownOptionTitleSelected,
                        ]}
                      >
                        {item.label}
                      </Text>
                      <Text style={styles.dropdownOptionSub}>
                        {item.description}
                      </Text>
                    </View>
                    {selected && (
                      <CheckIcon size={16} color={palette.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </Card>
          )}
        </View>

        {/* 3. Indicador circular Score */}
        <Card style={styles.scoreCard}>
          <ScoreRing score={score} size={228} />
          <Text style={styles.fitHeading}>Fit con {label}</Text>
          <Text style={styles.fitSubheading}>{description}</Text>
        </Card>

        {/* 4. Resumen de métricas clave */}
        <View style={styles.chipsWrap}>
          <Chip tone="success">
            Engagement {creator.engagement}% · Bono +{bonus}
          </Chip>
          <Chip tone="neutral">
            Tono: {creator.tone.pos} pos / {creator.tone.neu} neu /{' '}
            {creator.tone.neg} neg
          </Chip>
        </View>

        {/* 5. Acción */}
        <Button
          onPress={() => go('bigfive')}
          iconRight={<ChevronRightIcon size={18} color="#FFFFFF" />}
          style={styles.ctaButton}
        >
          Ver análisis detallado
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
  },
  selectorWrapper: {
    zIndex: 20,
  },
  selectorTrigger: {
    height: 48,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorTriggerOpen: {
    borderColor: palette.primaryBorder,
  },
  selectorLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: palette.ink,
    marginRight: 8,
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownMenu: {
    marginTop: 6,
    padding: 6,
    gap: 2,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.sm,
    gap: 10,
  },
  dropdownOptionSelected: {
    backgroundColor: palette.primarySoft,
  },
  dropdownTextCol: {
    flex: 1,
  },
  dropdownOptionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: palette.ink,
  },
  dropdownOptionTitleSelected: {
    color: palette.primary,
    fontWeight: '700',
  },
  dropdownOptionSub: {
    marginTop: 2,
    fontSize: 12,
    color: palette.muted,
  },
  scoreCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  fitHeading: {
    marginTop: 16,
    fontSize: 17,
    fontWeight: '700',
    color: palette.ink,
    textAlign: 'center',
  },
  fitSubheading: {
    marginTop: 4,
    fontSize: 13,
    color: palette.muted,
    textAlign: 'center',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ctaButton: {
    marginTop: 2,
  },
});
