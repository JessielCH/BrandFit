import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Contenedor con scroll para cada pantalla:
 * permite que el contenido ocupe todo el alto disponible y haga scroll en pantallas pequeñas.
 */
export function ScreenContainer({ children, style }: Props) {
  return (
    <ScrollView
      contentContainerStyle={[styles.content, style]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingBottom: 20 },
});
