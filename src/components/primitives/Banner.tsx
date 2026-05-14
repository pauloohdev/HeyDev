import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';

interface BannerProps {
  variant?: 'info' | 'warning' | 'success';
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const variants = {
  info: {
    bg: colors.infoBg,
    text: colors.infoText,
    icon: colors.accent,
    border: '#2a2a5e'
  },
  warning: {
    bg: '#2a2410',
    text: colors.warning,
    icon: colors.warning,
    border: '#4a3a10'
  },
  success: {
    bg: '#1a3a2a',
    text: colors.success,
    icon: colors.success,
    border: '#2a5a4a'
  }
};

export function Banner({ variant = 'info', children, icon = 'information-circle-outline' }: BannerProps) {
  const style = variants[variant];

  return (
    <View style={[styles.banner, { backgroundColor: style.bg, borderColor: style.border }]}>
      <Ionicons name={icon} size={16} color={style.icon} />
      <Text style={[styles.text, { color: style.text }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: colors.infoBg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1
  },
  text: {
    color: colors.accent,
    fontSize: FONT_SIZES.md,
    flex: 1
  }
});
