import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ChatActionButton } from '../components/ChatActionButton';
import { developerActiveServices, developerCompletedServices } from '../data/mockData';
import { colors } from '../theme/colors';
import type { CompanyService, MainTabParamList, UserType } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'MyServices'> & {
  userType: UserType;
  companyServices: CompanyService[];
  onOpenCandidates: (serviceId: string) => void;
  onOpenService: (serviceId: string) => void;
  onOpenChat: (conversationId: string, title: string, serviceId?: string, readOnly?: boolean) => void;
};

const statusBadgeConfig: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string; label: string }> = {
  open: { icon: 'radio-button-on', color: '#4ade80', bg: '#1a3a2a', label: 'Aberto' },
  development: { icon: 'code-slash', color: '#38bdf8', bg: '#0c2d4a', label: 'Em desenvolvimento' },
  review: { icon: 'eye-outline', color: '#fbbf24', bg: '#2a2410', label: 'Revisão' },
  completed: { icon: 'checkmark-circle', color: '#818cf8', bg: '#1a1a3e', label: 'Concluído' }
};

export function MyServicesScreen({ userType, companyServices, onOpenCandidates, onOpenService, onOpenChat }: Props) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [showBalance, setShowBalance] = useState(true);

  const totalBalance = useMemo(
    () => developerCompletedServices.reduce((sum, service) => sum + service.earned, 0),
    []
  );

  // ─── Company view ───
  if (userType === 'company') {
    const activeServices = companyServices.filter((service) => service.status !== 'completed');
    const completedServices = companyServices.filter((service) => service.status === 'completed');

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Meus serviços</Text>

        <View style={styles.tabsRow}>
          <Pressable onPress={() => setActiveTab('active')} style={[styles.tab, activeTab === 'active' && styles.tabActive]}>
            <Ionicons name="flash-outline" size={14} color={activeTab === 'active' ? '#0b1120' : colors.primary} />
            <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
              Ativos ({activeServices.length})
            </Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab('completed')} style={[styles.tab, activeTab === 'completed' && styles.tabActive]}>
            <Ionicons name="checkmark-done-outline" size={14} color={activeTab === 'completed' ? '#0b1120' : colors.primary} />
            <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
              Encerrados ({completedServices.length})
            </Text>
          </Pressable>
        </View>

        {activeTab === 'active' ? (
          activeServices.length > 0 ? (
            activeServices.map((service) => {
              const badge = statusBadgeConfig[service.status] ?? statusBadgeConfig.open;
              return (
                <View key={service.id} style={styles.card}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{service.title}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                      <Ionicons name={badge.icon} size={12} color={badge.color} />
                      <Text style={[styles.statusText, { color: badge.color }]}>{badge.label}</Text>
                    </View>
                  </View>
                  {service.status === 'open' ? (
                    <>
                      <View style={styles.proposalRow}>
                        <Ionicons name="people-outline" size={14} color={colors.muted} />
                        <Text style={styles.meta}>{service.proposals} candidaturas recebidas</Text>
                      </View>
                      <View style={styles.divider} />
                      <View style={styles.actionsRow}>
                        <Pressable style={styles.primaryBtn} onPress={() => onOpenCandidates(service.id)}>
                          <Ionicons name="people" size={14} color="#0b1120" />
                          <Text style={styles.primaryBtnText}>Ver candidatos</Text>
                        </Pressable>
                        <Pressable style={styles.secondaryBtn} onPress={() => onOpenService(service.id)}>
                          <Text style={styles.secondaryBtnText}>Progresso</Text>
                        </Pressable>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.divider} />
                      <View style={styles.actionsRow}>
                        <ChatActionButton
                          onPress={() =>
                            service.conversationId &&
                            service.conversationTitle &&
                            onOpenChat(service.conversationId, service.conversationTitle, service.id, service.status === 'completed')
                          }
                        />
                        <Pressable style={styles.secondaryBtn} onPress={() => onOpenService(service.id)}>
                          <Text style={styles.secondaryBtnText}>Progresso</Text>
                        </Pressable>
                      </View>
                    </>
                  )}
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="briefcase-outline" size={48} color={colors.cardSoft} />
              <Text style={styles.emptyTitle}>Nenhum serviço ativo</Text>
              <Text style={styles.emptyDesc}>Crie um novo serviço na aba "Criar" para começar.</Text>
            </View>
          )
        ) : completedServices.length > 0 ? (
          completedServices.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{service.title}</Text>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              </View>
              <Text style={styles.meta}>Serviço concluído</Text>
              <Pressable style={styles.secondaryBtn} onPress={() => onOpenService(service.id)}>
                <Text style={styles.secondaryBtnText}>Ver detalhes</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="archive-outline" size={48} color={colors.cardSoft} />
            <Text style={styles.emptyTitle}>Nenhum serviço encerrado</Text>
            <Text style={styles.emptyDesc}>Serviços concluídos aparecerão aqui.</Text>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }

  // ─── Developer view ───
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meus serviços</Text>

      <View style={styles.tabsRow}>
        <Pressable onPress={() => setActiveTab('active')} style={[styles.tab, activeTab === 'active' && styles.tabActive]}>
          <Ionicons name="flash-outline" size={14} color={activeTab === 'active' ? '#0b1120' : colors.primary} />
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>Em andamento</Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('completed')} style={[styles.tab, activeTab === 'completed' && styles.tabActive]}>
          <Ionicons name="wallet-outline" size={14} color={activeTab === 'completed' ? '#0b1120' : colors.primary} />
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>Concluídos</Text>
        </Pressable>
      </View>

      {activeTab === 'active' ? (
        developerActiveServices.map((service) => (
          <View key={service.id} style={styles.card}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <View style={styles.proposalRow}>
              <Ionicons name="business-outline" size={14} color={colors.muted} />
              <Text style={styles.meta}>{service.company}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.actionsRow}>
              <Pressable style={styles.secondaryBtn} onPress={() => onOpenService(service.id)}>
                <Ionicons name="information-circle-outline" size={14} color={colors.text} />
                <Text style={styles.secondaryBtnText}>Detalhes</Text>
              </Pressable>
              <ChatActionButton onPress={() => onOpenChat(service.conversationId, service.conversationTitle, service.id)} label="Chat" />
            </View>
          </View>
        ))
      ) : (
        <>
          {/* Balance card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <View>
                <Text style={styles.balanceLabel}>Saldo total acumulado</Text>
                <Text style={styles.balanceValue}>
                  {showBalance ? `R$ ${totalBalance.toLocaleString('pt-BR')}` : 'R$ ••••••'}
                </Text>
              </View>
              <Pressable style={styles.eyeBtn} onPress={() => setShowBalance((prev) => !prev)}>
                <Ionicons name={showBalance ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.muted} />
              </Pressable>
            </View>
          </View>

          {developerCompletedServices.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.cardTitle}>{service.title}</Text>
                  <View style={styles.proposalRow}>
                    <Ionicons name="business-outline" size={13} color={colors.muted} />
                    <Text style={styles.meta}>{service.company}</Text>
                  </View>
                </View>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              </View>
              <View style={styles.earnedRow}>
                <Ionicons name="trending-up" size={16} color={colors.success} />
                <Text style={styles.earnedValue}>
                  {showBalance ? `+ R$ ${service.earned.toLocaleString('pt-BR')}` : '+ R$ ••••'}
                </Text>
              </View>
            </View>
          ))}
        </>
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  tabsRow: { flexDirection: 'row', gap: 8 },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    backgroundColor: '#11203a',
    paddingVertical: 10,
    paddingHorizontal: 8
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: '#0b1120' },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  cardTitle: { color: colors.text, fontWeight: '700', fontSize: 15, flex: 1 },
  meta: { color: colors.muted, fontSize: 13 },
  proposalRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  statusText: { fontSize: 10, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#1e3a5f' },
  actionsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  primaryBtnText: { color: '#0b1120', fontWeight: '700', fontSize: 13 },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#11203a',
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  secondaryBtnText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  balanceCard: {
    backgroundColor: '#0a1e2e',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1a4a6a'
  },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { color: colors.muted, fontSize: 12, marginBottom: 4 },
  balanceValue: { color: colors.success, fontSize: 28, fontWeight: '800' },
  eyeBtn: { padding: 6 },
  earnedRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  earnedValue: { color: colors.success, fontWeight: '700', fontSize: 15 },
  emptyState: { alignItems: 'center', gap: 8, paddingVertical: 40 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  emptyDesc: { color: colors.muted, fontSize: 13, textAlign: 'center', paddingHorizontal: 20 }
});
