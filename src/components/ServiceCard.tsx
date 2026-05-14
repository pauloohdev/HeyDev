import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card, Avatar, LevelBadge, Chip } from './primitives';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';
import type { Service, UserType } from '../types/navigation';

type Props = {
  service: Service;
  userType: UserType;
  onPress?: () => void;
  onTagPress?: (tag: string) => void;
};

export function ServiceCard({ service, onPress, onTagPress, userType }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Card>
        {/* Header row: avatar + title + level badge */}
        <View style={styles.headerRow}>
          <Avatar initials={service.company.charAt(0)} size="sm" />
          <View style={styles.headerInfo}>
            <Text style={styles.title} numberOfLines={2}>
              {service.title}
            </Text>
            <Text style={styles.meta}>{service.company}</Text>
          </View>
          <LevelBadge level={service.level} />
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>

        {/* Value & deadline for devs */}
        {userType === 'developer' && (
          <View style={styles.valueRow}>
            <View style={styles.valueItem}>
              <Ionicons name="cash-outline" size={14} color={colors.success} />
              <Text style={styles.value}>{service.value}</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="time-outline" size={14} color={colors.muted} />
              <Text style={styles.deadline}>{service.deadline}</Text>
            </View>
          </View>
        )}

        {/* Tags */}
        <View style={styles.tags}>
          {service.stack.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="default"
              onPress={() => onTagPress?.(tag)}
            />
          ))}
        </View>

        {userType === 'developer' && (
          <View style={styles.applyBtn}>
            <Ionicons name="arrow-forward-circle-outline" size={16} color={colors.primary} />
            <Text style={styles.applyBtnText}>Ver detalhes e candidatar-se</Text>
          </View>
        )}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.lg
  },
  headerInfo: {
    flex: 1,
    gap: 2
  },
  title: {
    color: colors.text,
    fontWeight: '700',
    fontSize: FONT_SIZES.lg,
    lineHeight: 20
  },
  meta: {
    color: colors.muted,
    fontSize: FONT_SIZES.sm
  },
  description: {
    color: colors.text,
    fontSize: FONT_SIZES.md,
    lineHeight: 19,
    opacity: 0.85
  },
  valueRow: {
    flexDirection: 'row',
    gap: SPACING.lg
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs
  },
  value: {
    color: colors.success,
    fontWeight: '700',
    fontSize: FONT_SIZES.lg
  },
  deadline: {
    color: colors.muted,
    fontSize: FONT_SIZES.md
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    alignSelf: 'flex-start',
    backgroundColor: colors.buttonBg,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: colors.border
  },
  applyBtnText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: FONT_SIZES.xs
  }
});

