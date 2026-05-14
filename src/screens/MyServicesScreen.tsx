import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ChatActionButton } from '../components/ChatActionButton';
import { developerActiveServices, developerCompletedServices } from '../data/mockData';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';
import { Card, StatusBadge, PrimaryButton, SecondaryButton, Divider, EmptyState } from '../components/primitives';
import type { CompanyService, MainTabParamList, UserType } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'MyServices'> & {
  userType: UserType;
  companyServices: CompanyService[];
  onOpenCandidates: (serviceId: string) => void;
  onOpenService: (serviceId: string) => void;
  onOpenChat: (conversationId: string, title: string, serviceId?: string, readOnly?: boolean) => void;
};

const STATUS_LABELS: Record<string, string> = {
  open: 'Aberto',
  development: 'Em desenvolvimento',
  review: 'Revisão',
  completed: 'Concluído'
};

export function MyServicesScreen({ userType, companyServices, onOpenCandidates, onOpenService, onOpenChat }: Props) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [showBalance, setShowBalance] = useState(true);

  const totalBalance = useMemo(
    () => developerCompletedServices.reduce((sum, service) => sum + service.earned, 0),
    []
  );

  if (userType === 'company') {
    const activeServices = companyServices.filter((service) => service.status !== 'completed');
    const completedServices = companyServices.filter((service) => service.status === 'completed');

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Meus serviços</Text>

        <View style={styles.tabsRow}>
          <Pressable onPress={() => setActiveTab('active')} style={[styles.tab, activeTab === 'active' && styles.tabActive]}>
            <Ionicons name="flash-outline" size={14} color={activeTab === 'active' ? colors.darkText : colors.primary} />
            <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
              Ativos ({activeServices.length})
            </Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab('completed')} style={[styles.tab, activeTab === 'completed' && styles.tabActive]}>
            <Ionicons name="checkmark-done-outline" size={14} color={activeTab === 'completed' ? colors.darkText : colors.primary} />
            <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
              Encerrados ({completedServices.length})
            </Text>
          </Pressable>
        </View>

        {activeTab === 'active' ? (
          activeServices.length > 0 ? (
            activeServices.map((service) => (
              <Card key={service.id}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {service.title}
                  </Text>
                  <StatusBadge status={STATUS_LABELS[service.status] || service.status} />
                </View>
                {service.status === 'open' ? (
                  <>
                    <View style={styles.proposalRow}>
                      <Ionicons name="people-outline" size={14} color={colors.muted} />
                      <Text style={styles.meta}>{service.proposals} candidaturas recebidas</Text>
                    </View>
                    <Divider />
                    <View style={styles.actionsRow}>
                      <PrimaryButton onPress={() => onOpenCandidates(service.id)}>
                        Ver candidatos
                      </PrimaryButton>
                      <SecondaryButton onPress={() => onOpenService(service.id)}>
                        Progresso
                      </SecondaryButton>
                    </View>
                  </>
                ) : (
                  <>
                    <Divider />
                    <View style={styles.actionsRow}>
                      <ChatActionButton
                        onPress={() =>
                          service.conversationId &&
                          service.conversationTitle &&
                          onOpenChat(service.conversationId, service.conversationTitle, service.id, service.status === 'completed')
                        }
                      />
                      <SecondaryButton onPress={() => onOpenService(service.id)}>
                        Progresso
                      </SecondaryButton>
                    </View>
                  </>
                )}
              </Card>
            ))
          ) : (
            <EmptyState
              icon="briefcase-outline"
              title="Nenhum serviço ativo"
              description='Crie um novo serviço na aba "Criar" para começar.'
            />
          )
        ) : completedServices.length > 0 ? (
          completedServices.map((service) => (
            <Card key={service.id}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{service.title}</Text>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              </View>
              <Text style={styles.meta}>Serviço concluído</Text>
              <SecondaryButton onPress={() => onOpenService(service.id)}>
                Ver detalhes
              </SecondaryButton>
            </Card>
          ))
        ) : (
          <EmptyState
            icon="archive-outline"
            title="Nenhum serviço encerrado"
            description="Serviços concluídos aparecerão aqui."
          />
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meus serviços</Text>

      <View style={styles.tabsRow}>
        <Pressable onPress={() => setActiveTab('active')} style={[styles.tab, activeTab === 'active' && styles.tabActive]}>
          <Ionicons name="flash-outline" size={14} color={activeTab === 'active' ? colors.darkText : colors.primary} />
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>Em andamento</Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('completed')} style={[styles.tab, activeTab === 'completed' && styles.tabActive]}>
          <Ionicons name="wallet-outline" size={14} color={activeTab === 'completed' ? colors.darkText : colors.primary} />
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>Concluídos</Text>
        </Pressable>
      </View>

      {activeTab === 'active' ? (
        developerActiveServices.map((service) => (
          <Card key={service.id}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <View style={styles.proposalRow}>
              <Ionicons name="business-outline" size={14} color={colors.muted} />
              <Text style={styles.meta}>{service.company}</Text>
            </View>
            <Divider />
            <View style={styles.actionsRow}>
              <SecondaryButton onPress={() => onOpenService(service.id)}>
                Detalhes
              </SecondaryButton>
              <ChatActionButton onPress={() => onOpenChat(service.conversationId, service.conversationTitle, service.id)} label="Chat" />
            </View>
          </Card>
        ))
      ) : (
        <>
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
            <Card key={service.id}>
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
            </Card>
          ))}
        </>
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: SPACING.lg, gap: SPACING.md },
  title: { color: colors.text, fontSize: FONT_SIZES['3xl'], fontWeight: '800' },
  tabsRow: { flexDirection: 'row', gap: SPACING.md },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: colors.tagBg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { color: colors.primary, fontWeight: '600', fontSize: FONT_SIZES.md },
  tabTextActive: { color: colors.darkText },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: SPACING.md },
  cardTitle: { color: colors.text, fontWeight: '700', fontSize: FONT_SIZES.lg, flex: 1 },
  meta: { color: colors.muted, fontSize: FONT_SIZES.md },
  proposalRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  actionsRow: { flexDirection: 'row', gap: SPACING.md, flexWrap: 'wrap' },
  balanceCard: {
    backgroundColor: '#0a1e2e',
    borderRadius: RADIUS.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1a4a6a'
  },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { color: colors.muted, fontSize: FONT_SIZES.sm, marginBottom: SPACING.xs },
  balanceValue: { color: colors.success, fontSize: 28, fontWeight: '800' },
  eyeBtn: { padding: SPACING.md },
  earnedRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  earnedValue: { color: colors.success, fontWeight: '700', fontSize: FONT_SIZES.lg }
});

