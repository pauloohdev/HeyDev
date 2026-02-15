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
            <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>Ativos</Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab('completed')} style={[styles.tab, activeTab === 'completed' && styles.tabActive]}>
            <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>Encerrados</Text>
          </Pressable>
        </View>

        {activeTab === 'active' ? (
          activeServices.length > 0 ? (
            activeServices.map((service) => (
              <View key={service.id} style={styles.card}>
                <Text style={styles.cardTitle}>{service.title}</Text>
                {service.status === 'open' ? (
                  <>
                    <Text style={styles.meta}>Fase aberta • {service.proposals} candidaturas</Text>
                    <View style={styles.actionsRow}>
                      <Pressable style={styles.btn} onPress={() => onOpenCandidates(service.id)}>
                        <Text style={styles.btnText}>Ver candidatos</Text>
                      </Pressable>
                      <Pressable style={styles.secondaryBtn} onPress={() => onOpenService(service.id)}>
                        <Text style={styles.secondaryBtnText}>Acompanhar progresso</Text>
                      </Pressable>
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.meta}>Serviço em execução</Text>
                    <View style={styles.actionsRow}>
                      <ChatActionButton
                        onPress={() =>
                          service.conversationId &&
                          service.conversationTitle &&
                          onOpenChat(service.conversationId, service.conversationTitle, service.id, service.status === 'completed')
                        }
                      />
                      <Pressable style={styles.secondaryBtn} onPress={() => onOpenService(service.id)}>
                        <Text style={styles.secondaryBtnText}>Acompanhar progresso</Text>
                      </Pressable>
                    </View>
                  </>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum serviço ativo no momento.</Text>
          )
        ) : completedServices.length > 0 ? (
          completedServices.map((service) => (
            <View key={service.id} style={styles.card}>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.meta}>Serviço concluído • Histórico da empresa</Text>
              <Pressable style={styles.secondaryBtn} onPress={() => onOpenService(service.id)}>
                <Text style={styles.secondaryBtnText}>Ver detalhes</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Ainda não há serviços encerrados.</Text>
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meus serviços</Text>

      <View style={styles.tabsRow}>
        <Pressable onPress={() => setActiveTab('active')} style={[styles.tab, activeTab === 'active' && styles.tabActive]}>
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>Em andamento/Ativos</Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('completed')} style={[styles.tab, activeTab === 'completed' && styles.tabActive]}>
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>Concluídos</Text>
        </Pressable>
      </View>

      {activeTab === 'active' ? (
        developerActiveServices.map((service) => (
          <View key={service.id} style={styles.card}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.meta}>{service.company}</Text>
            <View style={styles.actionsRow}>
              <Pressable style={styles.secondaryBtn} onPress={() => onOpenService(service.id)}>
                <Text style={styles.secondaryBtnText}>Detalhes do serviço</Text>
              </Pressable>
              <ChatActionButton onPress={() => onOpenChat(service.conversationId, service.conversationTitle, service.id)} label="Chat do serviço" />
            </View>
          </View>
        ))
      ) : (
        <>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Saldo total acumulado</Text>
              <Pressable onPress={() => setShowBalance((prev) => !prev)}>
                <Ionicons name={showBalance ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.muted} />
              </Pressable>
            </View>
            <Text style={styles.balanceValue}>{showBalance ? `R$ ${totalBalance.toLocaleString('pt-BR')}` : 'R$ ••••••'}</Text>
          </View>

          {developerCompletedServices.map((service) => (
            <View key={service.id} style={styles.card}>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.meta}>{service.company} • Finalizado</Text>
              <Text style={styles.value}>{showBalance ? `+ R$ ${service.earned.toLocaleString('pt-BR')}` : '+ R$ ••••'}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700' },
  tabsRow: { flexDirection: 'row', gap: 8 },
  tab: { flex: 1, borderRadius: 10, backgroundColor: '#11203a', paddingVertical: 10, paddingHorizontal: 8 },
  tabActive: { backgroundColor: colors.primary },
  tabText: { color: colors.primary, textAlign: 'center', fontWeight: '600', fontSize: 12 },
  tabTextActive: { color: '#0b1120' },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, gap: 8 },
  cardTitle: { color: colors.text, fontWeight: '700' },
  meta: { color: colors.muted },
  actionsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  btn: { backgroundColor: colors.primary, alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  btnText: { color: '#0b1120', fontWeight: '700' },
  secondaryBtn: { backgroundColor: '#11203a', alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  secondaryBtnText: { color: colors.text, fontWeight: '600' },
  balanceCard: { backgroundColor: '#102432', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#275878', gap: 8 },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { color: colors.muted, fontSize: 12 },
  balanceValue: { color: colors.success, fontSize: 24, fontWeight: '800' },
  value: { color: colors.success, fontWeight: '700' },
  emptyText: { color: colors.muted, textAlign: 'center', marginTop: 24 }
});
