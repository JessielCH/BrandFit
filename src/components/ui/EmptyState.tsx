import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../../theme';

type Props = {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
};

/** Vista centrada cuando aún no se ha analizado ningún creador. */
export function EmptyState({ icon, title, body, action }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radius.xl,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontFamily: fonts.semibold, fontSize: 18, color: colors.ink, textAlign: 'center' },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 6,
  },
  action: { width: '100%', marginTop: 24 },
});
