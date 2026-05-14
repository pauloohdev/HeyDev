import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';
import { getLevelColors } from '../constants/levelConfig';
import { getStatusStyle, getStatusIcon } from '../constants/statusConfig';

interface LevelBadgeProps {
  level: string;
}

interface StatusBadgeProps {
  status: string;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  const levelStyle = getLevelColors(level);

  return (
    <View style={[styles.badge, { backgroundColor: levelStyle.bg }]}>
      <Text style={[styles.badgeText, { color: levelStyle.text }]}>{level}</Text>
    </View>
  );
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyle = getStatusStyle(status);
  const icon = getStatusIcon(status);

  return (
    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
      <Ionicons name={icon} size={14} color={statusStyle.icon} />
      <Text style={[styles.statusText, { color: statusStyle.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700'
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs
  },
  statusText: {
    fontWeight: '600',
    fontSize: FONT_SIZES.xs
  }
});
