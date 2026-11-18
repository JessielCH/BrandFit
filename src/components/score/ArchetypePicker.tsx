import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Check, ChevronDown } from 'lucide-react-native';
import { ARCHETYPES } from '../../data/archetypes';
import type { ArchetypeId } from '../../types';
import { archetypeLabel } from '../../utils/analysis';
import { colors, fonts, radius } from '../../theme';

type Props = {
  value: ArchetypeId;
  onChange: (id: ArchetypeId) => void;
};

/** Menú desplegable para cambiar el arquetipo de marca y ver cómo cambia el puntaje. */
export function ArchetypePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  function select(id: ArchetypeId) {
    onChange(id);
    setOpen(false);
  }

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={() => setOpen((o) => !o)} style={styles.trigger}>
        <Text style={styles.triggerText}>{archetypeLabel(value)}</Text>
        <ChevronDown
          size={20}
          color={colors.muted}
          style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
        />
      </Pressable>

      {open && (
        <View style={styles.menu}>
          {ARCHETYPES.map((a) => {
            const selected = a.id === value;
            return (
              <Pressable
                key={a.id}
                onPress={() => select(a.id)}
                style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected && { fontFamily: fonts.semibold, color: colors.primary },
                  ]}
                >
                  {a.label}
                </Text>
                {selected && <Check size={16} color={colors.primary} />}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { zIndex: 20 }, // Mantiene el menú desplegable por encima de la tarjeta del puntaje
  trigger: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  triggerText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  menu: {
    position: 'absolute',
    top: 54,
    left: 0,
    right: 0,
    padding: 6,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    shadowColor: colors.ink,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radius.sm,
  },
  optionPressed: { backgroundColor: colors.primarySoft },
  optionText: { fontFamily: fonts.regular, fontSize: 15, color: colors.ink },
});
