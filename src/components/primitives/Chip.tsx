import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';

interface ChipProps {
  label: string;
  onPress?: () => void;
  active?: boolean;
  onClose?: () => void;
  variant?: 'default' | 'filter' | 'input';
}

export function Chip({
  label,
  onPress,
  active = false,
  onClose,
  variant = 'default'
}: ChipProps) {
  const isFilter = variant === 'filter';
  const isInputChip = variant === 'input';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        isFilter && (active ? styles.filterChipActive : styles.filterChipInactive),
        isInputChip && styles.inputChip
      ]}
    >
      {isFilter && active && <Ionicons name="checkmark" size={14} color={colors.darkText} />}
      <Text
        style={[
          styles.text,
          isFilter && (active ? styles.filterTextActive : styles.filterTextInactive),
          isInputChip && styles.inputText
        ]}
      >
        {label}
      </Text>
      {isInputChip && onClose && (
        <Ionicons name="close" size={14} color={colors.primary} onPress={onClose} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: colors.tagBg,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs
  },
  text: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: FONT_SIZES.xs
  },
  filterChipActive: {
    backgroundColor: colors.primary
  },
  filterChipInactive: {
    backgroundColor: colors.tagBg
  },
  filterTextActive: {
    color: colors.darkText
  },
  filterTextInactive: {
    color: colors.primary
  },
  inputChip: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs
  },
  inputText: {
    color: colors.primary,
    fontSize: FONT_SIZES.xs
  }
});
