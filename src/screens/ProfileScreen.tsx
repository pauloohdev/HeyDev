import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

import { profileByUser } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList, UserType } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'> & {
  userType: UserType;
};

export function ProfileScreen({ userType }: Props) {
  const profile = profileByUser[userType];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>

      <View style={styles.headerCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{profile.avatar}</Text></View>
        <View style={{ gap: 4 }}>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.level}>{profile.level}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Especializações</Text>
      <View style={styles.tagsWrap}>
        {profile.specializations.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  headerCard: { backgroundColor: colors.card, borderRadius: 14, padding: 16, flexDirection: 'row', gap: 14, alignItems: 'center' },
  avatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#0b1120', fontSize: 20, fontWeight: '800' },
  name: { color: colors.text, fontSize: 18, fontWeight: '700' },
  level: { color: colors.muted, fontSize: 13 },
  subtitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 4 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#11203a', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  tagText: { color: colors.primary, fontWeight: '600' }
});
