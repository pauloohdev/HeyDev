import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { profileByUser } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList, UserType } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'> & {
  userType: UserType;
  onEditProfile: () => void;
};

export function ProfileScreen({ userType, onEditProfile }: Props) {
  const profile = profileByUser[userType];

  const stats =
    userType === 'developer'
      ? [
          { label: 'Projetos', value: '14' },
          { label: 'Avaliação', value: '4.9 ★' },
          { label: 'Ganhos', value: 'R$ 38k' }
        ]
      : [
          { label: 'Publicados', value: '92' },
          { label: 'Ativos', value: '3' },
          { label: 'Avaliação', value: '4.8 ★' }
        ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>

      <View style={styles.headerCard}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.avatar}</Text>
          </View>
        </View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.level}>{profile.level}</Text>

        <Pressable style={styles.editBtn} onPress={onEditProfile}>
          <Ionicons name="create-outline" size={16} color={colors.primary} />
          <Text style={styles.editBtnText}>Editar perfil</Text>
        </Pressable>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>
        {userType === 'developer' ? 'Especializações' : 'Áreas de atuação'}
      </Text>
      <View style={styles.tagsWrap}>
        {profile.specializations.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Logout */}
      <Pressable style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={18} color={colors.danger} />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 14 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  headerCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  avatarRing: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: { color: '#0b1120', fontSize: 22, fontWeight: '800' },
  name: { color: colors.text, fontSize: 20, fontWeight: '700' },
  level: { color: colors.muted, fontSize: 13 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    backgroundColor: '#0c2d4a',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  editBtnText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border
  },
  statValue: { color: colors.text, fontSize: 18, fontWeight: '800' },
  statLabel: { color: colors.muted, fontSize: 11, fontWeight: '500' },
  subtitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 2 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#11203a', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 7 },
  tagText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
    backgroundColor: '#2a1419',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#3a1a20'
  },
  logoutText: { color: colors.danger, fontWeight: '600' }
});
