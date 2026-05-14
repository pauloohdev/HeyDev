import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { applications, services } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Applications'> & {
  onOpenChat: (conversationId: string, title: string) => void;
};

const statusConfig: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string }> = {
  'Em análise': { icon: 'hourglass-outline', color: '#fbbf24', bg: '#2a2410' },
  'Entrevista marcada': { icon: 'calendar-outline', color: '#38bdf8', bg: '#0c2d4a' },
  'Aprovado': { icon: 'checkmark-circle-outline', color: '#4ade80', bg: '#1a3a2a' },
  'Recusado': { icon: 'close-circle-outline', color: '#f87171', bg: '#2a1419' }
};

export function ApplicationsScreen({ onOpenChat }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Minhas candidaturas</Text>
      <Text style={styles.subtitle}>{applications.length} candidatura(s) em andamento</Text>

      {applications.map((application) => {
        const service = services.find((item) => item.id === application.serviceId);
        if (!service) return null;
        const statusStyle = statusConfig[application.status] ?? statusConfig['Em análise'];

        return (
          <View key={application.id} style={styles.card}>
            {/* Service header */}
            <View style={styles.cardHeader}>
              <View style={styles.companyAvatar}>
                <Text style={styles.companyInitial}>{service.company.charAt(0)}</Text>
              </View>
              <View style={styles.cardHeaderInfo}>
                <Text style={styles.cardTitle} numberOfLines={2}>{service.title}</Text>
                <Text style={styles.company}>{service.company}</Text>
              </View>
            </View>

            {/* Status badge */}
            <View style={styles.statusRow}>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                <Ionicons name={statusStyle.icon} size={14} color={statusStyle.color} />
                <Text style={[styles.statusText, { color: statusStyle.color }]}>{application.status}</Text>
              </View>
              <Text style={styles.time}>{application.updatedAt}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Actions */}
            <View style={styles.actionsRow}>
              <Pressable style={styles.chatBtn} onPress={() => onOpenChat('conv-1', service.company)}>
                <Ionicons name="chatbubble-outline" size={14} color={colors.primary} />
                <Text style={styles.chatText}>Abrir chat</Text>
              </Pressable>
              <View style={styles.valueTag}>
                <Ionicons name="cash-outline" size={12} color={colors.success} />
                <Text style={styles.valueText}>{service.value}</Text>
              </View>
            </View>
          </View>
        );
      })}

      {applications.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={48} color={colors.cardSoft} />
          <Text style={styles.emptyTitle}>Nenhuma candidatura ainda</Text>
          <Text style={styles.emptyDesc}>Explore o feed e candidate-se a serviços que combinam com seu perfil.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: -4 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  cardHeader: { flexDirection: 'row', gap: 12 },
  companyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0c2d4a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyInitial: { color: colors.primary, fontWeight: '800', fontSize: 16 },
  cardHeaderInfo: { flex: 1, gap: 2 },
  cardTitle: { color: colors.text, fontWeight: '700', fontSize: 15 },
  company: { color: colors.muted, fontSize: 12 },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  statusText: { fontWeight: '600', fontSize: 12 },
  time: { color: colors.muted, fontSize: 11 },
  divider: { height: 1, backgroundColor: '#1e3a5f' },
  actionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0c2d4a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  chatText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  valueTag: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  valueText: { color: colors.success, fontWeight: '600', fontSize: 13 },
  emptyState: { alignItems: 'center', gap: 8, paddingVertical: 40 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  emptyDesc: { color: colors.muted, fontSize: 13, textAlign: 'center', paddingHorizontal: 20 }
});
