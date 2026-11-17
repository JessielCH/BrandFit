import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { palette, radii } from '../../theme/tokens';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  iconRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  iconRight,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        disabled && variant === 'primary' && styles.disabledPrimary,
        style,
      ]}
    >
      <View style={styles.content}>
        {typeof children === 'string' ? (
          <Text
            style={[
              styles.label,
              variant === 'primary' && styles.primaryLabel,
              variant === 'secondary' && styles.secondaryLabel,
              variant === 'ghost' && styles.ghostLabel,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
        {iconRight}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    width: '100%',
    borderRadius: radii.md,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primary: {
    backgroundColor: palette.primary,
  },
  disabledPrimary: {
    backgroundColor: palette.primaryDisabled,
  },
  secondary: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  primaryLabel: {
    color: '#FFFFFF',
  },
  secondaryLabel: {
    color: palette.ink,
  },
  ghostLabel: {
    color: palette.primary,
  },
});
