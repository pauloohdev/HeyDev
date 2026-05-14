import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: string;
}

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
  size?: number;
  color?: string;
}

export function PrimaryButton({ onPress, disabled = false, loading = false, children }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.primary,
        pressed && !disabled && styles.primaryPressed,
        disabled && styles.disabled
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.darkText} />
      ) : (
        <Text style={styles.primaryText}>{children}</Text>
      )}
    </Pressable>
  );
}

export function SecondaryButton({ onPress, disabled = false, loading = false, children }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.secondary,
        pressed && !disabled && styles.secondaryPressed,
        disabled && styles.disabled
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <Text style={styles.secondaryText}>{children}</Text>
      )}
    </Pressable>
  );
}

export function IconButton({
  icon,
  onPress,
  disabled = false,
  size = 24,
  color = colors.primary
}: IconButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => pressed && styles.iconPressed}>
      <Ionicons name={icon} size={size} color={disabled ? colors.muted : color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryPressed: {
    opacity: 0.8
  },
  primaryText: {
    color: colors.darkText,
    fontWeight: '600',
    fontSize: FONT_SIZES.md
  },
  secondary: {
    backgroundColor: colors.buttonBg,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  secondaryPressed: {
    opacity: 0.8
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: FONT_SIZES.md
  },
  disabled: {
    opacity: 0.5
  },
  iconPressed: {
    opacity: 0.6
  }
});
