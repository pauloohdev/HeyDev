import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

import { notificationsByUser } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList, UserType } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'> & {
  userType: UserType;
};

export function ProfileScreen({ userType }: Props) {
  const notifications = notificationsByUser[userType];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil {userType === 'company' ? 'da empresa' : 'do dev'}</Text>
      <Text style={styles.subtitle}>Notificações recentes</Text>
      {notifications.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 10 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  subtitle: { color: colors.muted, marginBottom: 8 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 12, gap: 2 },
  text: { color: colors.text },
  time: { color: colors.muted, fontSize: 12 }
});
