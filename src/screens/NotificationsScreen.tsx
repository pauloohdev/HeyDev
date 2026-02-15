import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { notificationsByUser } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList, UserType } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'> & {
  userType: UserType;
};

export function NotificationsScreen({ userType }: Props) {
  const notifications = notificationsByUser[userType];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Notificações recentes</Text>
      {notifications.map((notification) => (
        <View key={notification.id} style={styles.card}>
          <Text style={styles.text}>{notification.title}</Text>
          <Text style={styles.time}>{notification.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 10 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 2 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 12, gap: 4 },
  text: { color: colors.text },
  time: { color: colors.muted, fontSize: 12 }
});
