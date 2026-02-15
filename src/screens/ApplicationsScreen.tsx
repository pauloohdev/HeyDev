import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { applications, services } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Applications'> & {
  onOpenChat: (conversationId: string, title: string) => void;
};

export function ApplicationsScreen({ onOpenChat }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Minhas candidaturas</Text>
      {applications.map((application) => {
        const service = services.find((item) => item.id === application.serviceId);
        if (!service) return null;

        return (
          <View key={application.id} style={styles.card}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.info}>{application.status} • {application.updatedAt}</Text>
            <Pressable style={styles.chatBtn} onPress={() => onOpenChat('conv-1', service.company)}>
              <Text style={styles.chatText}>Abrir chat</Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700' },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, gap: 8 },
  cardTitle: { color: colors.text, fontWeight: '700' },
  info: { color: colors.muted },
  chatBtn: { backgroundColor: colors.cardSoft, borderRadius: 8, padding: 10, alignSelf: 'flex-start' },
  chatText: { color: colors.text, fontWeight: '600' }
});
