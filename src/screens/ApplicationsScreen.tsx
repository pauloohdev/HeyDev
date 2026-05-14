import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { applications, services } from '../data/mockData';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';
import { Card, Avatar, StatusBadge, PrimaryButton, EmptyState, Divider } from '../components/primitives';
import type { MainTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Applications'> & {
  onOpenChat: (conversationId: string, title: string) => void;
};

export function ApplicationsScreen({ onOpenChat }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Minhas candidaturas</Text>
      <Text style={styles.subtitle}>{applications.length} candidatura(s) em andamento</Text>

      {applications.map((application) => {
        const service = services.find((item) => item.id === application.serviceId);
        if (!service) return null;

        return (
          <Card key={application.id}>
            {/* Service header */}
            <View style={styles.cardHeader}>
              <Avatar initials={service.company.charAt(0)} size="sm" />
              <View style={styles.cardHeaderInfo}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {service.title}
                </Text>
                <Text style={styles.company}>{service.company}</Text>
              </View>
            </View>

            {/* Status badge */}
            <View style={styles.statusRow}>
              <StatusBadge status={application.status} />
              <Text style={styles.time}>{application.updatedAt}</Text>
            </View>

            <Divider />

            {/* Actions */}
            <View style={styles.actionsRow}>
              <PrimaryButton onPress={() => onOpenChat(application.conversationId, service.company)}>
                Chat
              </PrimaryButton>
              <View style={styles.valueTag}>
                <Ionicons name="cash-outline" size={12} color={colors.success} />
                <Text style={styles.valueText}>{service.value}</Text>
              </View>
            </View>
          </Card>
        );
      })}

      {applications.length === 0 && (
        <EmptyState
          icon="document-text-outline"
          title="Nenhuma candidatura ainda"
          description="Explore o feed e candidate-se a serviços que combinam com seu perfil."
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: SPACING.lg, gap: SPACING.md },
  title: { color: colors.text, fontSize: FONT_SIZES['3xl'], fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: FONT_SIZES.md, marginTop: -4 },
  cardHeader: { flexDirection: 'row', gap: SPACING.lg },
  cardHeaderInfo: { flex: 1, gap: 2 },
  cardTitle: { color: colors.text, fontWeight: '700', fontSize: FONT_SIZES.lg },
  company: { color: colors.muted, fontSize: FONT_SIZES.sm },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  time: { color: colors.muted, fontSize: FONT_SIZES.xs },
  actionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  valueTag: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  valueText: { color: colors.success, fontWeight: '600', fontSize: FONT_SIZES.lg }
});
