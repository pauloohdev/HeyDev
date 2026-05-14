import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { notificationsByUser } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList, UserType } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'> & {
  userType: UserType;
};

const getNotificationIcon = (title: string): { name: keyof typeof Ionicons.glyphMap; color: string; bg: string } => {
  if (title.includes('candidatura') || title.includes('visualizada')) {
    return { name: 'eye-outline', color: '#38bdf8', bg: '#0c2d4a' };
  }
  if (title.includes('mensagem') || title.includes('chat')) {
    return { name: 'chatbubble-outline', color: '#818cf8', bg: '#1a1a3e' };
  }
  if (title.includes('candidatos') || title.includes('novos')) {
    return { name: 'people-outline', color: '#4ade80', bg: '#1a3a2a' };
  }
  if (title.includes('prazo') || title.includes('urgente')) {
    return { name: 'warning-outline', color: '#fbbf24', bg: '#2a2410' };
  }
  return { name: 'notifications-outline', color: '#38bdf8', bg: '#0c2d4a' };
};

export function NotificationsScreen({ userType }: Props) {
  const notifications = notificationsByUser[userType];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Notificações</Text>
      <Text style={styles.subtitle}>{notifications.length} notificação(ões) recente(s)</Text>

      {notifications.map((notification) => {
        const icon = getNotificationIcon(notification.title);
        return (
          <View key={notification.id} style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: icon.bg }]}>
              <Ionicons name={icon.name} size={18} color={icon.color} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.text}>{notification.title}</Text>
              <Text style={styles.time}>{notification.time}</Text>
            </View>
            <View style={styles.dot} />
          </View>
        );
      })}

      {notifications.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off-outline" size={48} color={colors.cardSoft} />
          <Text style={styles.emptyTitle}>Tudo certo por aqui!</Text>
          <Text style={styles.emptyDesc}>Você não tem notificações no momento.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 10 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: -2, marginBottom: 4 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardInfo: { flex: 1, gap: 3 },
  text: { color: colors.text, fontSize: 14, lineHeight: 19 },
  time: { color: colors.muted, fontSize: 11 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary
  },
  emptyState: { alignItems: 'center', gap: 8, paddingVertical: 40 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  emptyDesc: { color: colors.muted, fontSize: 13, textAlign: 'center' }
});
