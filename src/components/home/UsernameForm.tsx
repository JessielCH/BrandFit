import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AtSign, CircleAlert } from 'lucide-react-native';
import { Button, Card } from '../ui';
import { validateUsername } from '../../utils/analysis';
import { colors, fonts, radius } from '../../theme';

type Props = {
  onSubmit: (username: string) => void;
};

/** Tarjeta principal del inicio: campo para escribir el @username de TikTok y botón "Analizar creador". */
export function UsernameForm({ onSubmit }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  // Valida el usuario ingresado antes de pasar a la pantalla de progreso
  function handleSubmit() {
    const clean = value.trim().replace(/^@/, '');
    const validationError = validateUsername(clean);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    onSubmit(clean);
  }

  function handleChange(text: string) {
    setValue(text);
    if (error) setError('');
  }

  // El borde cambia a rojo si hay error o a verde cuando el campo está seleccionado
  const borderColor = error ? colors.danger : focused ? colors.primary : colors.line;

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>¿A quién analizamos?</Text>

      <View style={[styles.inputBox, { borderColor }]}>
        <AtSign size={20} strokeWidth={1.75} color={colors.muted} />
        <TextInput
          value={value}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleSubmit}
          placeholder="username de TikTok"
          placeholderTextColor={colors.placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          style={styles.input}
        />
      </View>

      {error !== '' && (
        <View style={styles.errorRow}>
          <CircleAlert size={15} color={colors.dangerStrong} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Button label="Analizar creador" onPress={handleSubmit} style={styles.button} />
      <Text style={styles.note}>Analizamos los últimos 10 videos</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 24 },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: colors.ink,
    marginBottom: 20,
  },
  inputBox: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  input: { flex: 1, height: '100%', fontFamily: fonts.regular, fontSize: 16, color: colors.ink },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  errorText: { flex: 1, fontFamily: fonts.regular, fontSize: 13, color: colors.dangerStrong },
  button: { height: 56, marginTop: 12 },
  note: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 12,
  },
});
