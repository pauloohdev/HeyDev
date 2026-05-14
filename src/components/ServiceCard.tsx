import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import type { Service, UserType } from '../types/navigation';

type Props = {
  service: Service;
  userType: UserType;
  onPress?: () => void;
  onTagPress?: (tag: string) => void;
};

const levelColors: Record<string, { bg: string; text: string }> = {
  'Júnior': { bg: '#1a3a2a', text: '#4ade80' },
  'Pleno': { bg: '#1a2a3e', text: '#38bdf8' },
  'Sênior': { bg: '#2a1a3e', text: '#a78bfa' }
};

export function ServiceCard({ service, onPress, onTagPress, userType }: Props) {
  const levelStyle = levelColors[service.level] ?? levelColors['Pleno'];

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Header row: avatar + title + level badge */}
      <View style={styles.headerRow}>
        <View style={styles.companyAvatar}>
          <Text style={styles.companyInitial}>{service.company.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.title} numberOfLines={2}>{service.title}</Text>
          <Text style={styles.meta}>{service.company}</Text>
        </View>
        <View style={[styles.levelBadge, { backgroundColor: levelStyle.bg }]}>
          <Text style={[styles.levelText, { color: levelStyle.text }]}>{service.level}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>{service.description}</Text>

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
          <Pressable key={tag} onPress={() => onTagPress?.(tag)} style={styles.tagPill}>
            <Text style={styles.tag}>{tag}</Text>
          </Pressable>
        ))}
      </View>

      {userType === 'developer' && (
        <View style={styles.applyBtn}>
          <Ionicons name="arrow-forward-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.applyBtnText}>Ver detalhes e candidatar-se</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  companyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0c2d4a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyInitial: { color: colors.primary, fontWeight: '800', fontSize: 16 },
  headerInfo: { flex: 1, gap: 2 },
  title: { color: colors.text, fontWeight: '700', fontSize: 15, lineHeight: 20 },
  meta: { color: colors.muted, fontSize: 12 },
  levelBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  levelText: { fontSize: 11, fontWeight: '700' },
  description: { color: colors.text, fontSize: 13, lineHeight: 19, opacity: 0.85 },
  valueRow: { flexDirection: 'row', gap: 16 },
  valueItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  value: { color: colors.success, fontWeight: '700', fontSize: 14 },
  deadline: { color: colors.muted, fontSize: 13 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tagPill: { backgroundColor: '#11203a', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  tag: { color: colors.primary, fontSize: 11, fontWeight: '600' },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#0c2d4a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  applyBtnText: { color: colors.primary, fontWeight: '600', fontSize: 12 }
});
