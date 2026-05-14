import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ChatActionButton } from '../components/ChatActionButton';
import { services } from '../data/mockData';
import { colors } from '../theme/colors';
import type { CompanyService, RootStackParamList, ServiceProgressStatus, UserType } from '../types/navigation';

const statusOrder: ServiceProgressStatus[] = ['open', 'development', 'review', 'completed'];
const statusLabel: Record<ServiceProgressStatus, string> = {
  open: 'Aberto',
  development: 'Em Desenvolvimento',
  review: 'Revisão',
  completed: 'Concluído'
};
const statusIcon: Record<ServiceProgressStatus, keyof typeof Ionicons.glyphMap> = {
  open: 'radio-button-on',
  development: 'code-slash',
  review: 'eye-outline',
  completed: 'checkmark-circle'
};

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceDetails'> & {
  userType: UserType;
  companyServices: CompanyService[];
  onUpdateServiceStatus: (serviceId: string, status: ServiceProgressStatus) => void;
  onUpdateServiceNotes: (serviceId: string, notes: string) => void;
  onOpenChat: (conversationId: string, title: string, serviceId?: string, readOnly?: boolean) => void;
};

export function ServiceDetailsScreen({ navigation, route, userType, companyServices, onUpdateServiceStatus, onUpdateServiceNotes, onOpenChat }: Props) {
  const feedService = services.find((item) => item.id === route.params.serviceId);
  const companyService = companyServices.find((item) => item.id === route.params.serviceId);

  const [draftNotes, setDraftNotes] = useState(companyService?.notes ?? '');

  const currentStatus = companyService?.status;
  const isCompleted = currentStatus === 'completed';
  const availableNextStatuses = useMemo(() => {
    if (!currentStatus || currentStatus === 'completed') return [];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder.slice(currentIndex + 1);
  }, [currentStatus]);

  if (!feedService && !companyService) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.cardSoft} />
          <Text style={styles.emptyTitle}>Serviço não encontrado</Text>
        </View>
      </View>
    );
  }

  // ─── Company view ───
  if (userType === 'company' && companyService) {
    return (
      <ScrollView style={styles.containerScroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{companyService.title}</Text>

        {/* Stepper */}
        <View style={styles.stepperCard}>
          {statusOrder.map((status, index) => {
            const reached = statusOrder.indexOf(companyService.status) >= index;
            const isCurrent = companyService.status === status;
            return (
              <View key={status} style={styles.stepperItem}>
                <View style={[styles.stepCircle, reached && styles.stepCircleActive, isCurrent && styles.stepCircleCurrent]}>
                  <Ionicons name={statusIcon[status]} size={14} color={reached ? '#0b1120' : colors.muted} />
                </View>
                {index < statusOrder.length - 1 && (
                  <View style={[styles.stepLine, reached && styles.stepLineActive]} />
                )}
                <Text style={[styles.stepLabel, reached && styles.stepLabelActive]}>{statusLabel[status]}</Text>
              </View>
            );
          })}
        </View>

        {/* Update Status */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="swap-horizontal-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Atualizar status</Text>
          </View>
          <View style={styles.actionsRow}>
            {availableNextStatuses.map((status) => (
              <Pressable key={status} style={styles.statusBtn} onPress={() => onUpdateServiceStatus(companyService.id, status)}>
                <Ionicons name={statusIcon[status]} size={14} color={colors.primary} />
                <Text style={styles.statusBtnText}>{statusLabel[status]}</Text>
              </Pressable>
            ))}
            {availableNextStatuses.length === 0 && (
              <View style={styles.doneRow}>
                <Ionicons name="checkmark-done" size={18} color={colors.success} />
                <Text style={styles.doneText}>Fluxo concluído.</Text>
              </View>
            )}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="create-outline" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Notas internas</Text>
          </View>
          <TextInput
            style={[styles.input, styles.multi, isCompleted && styles.readOnlyInput]}
            editable={!isCompleted}
            value={draftNotes}
            onChangeText={setDraftNotes}
            placeholder="Adicione observações para acompanhamento..."
            placeholderTextColor={colors.muted}
          />
          <Pressable
            style={[styles.saveBtn, isCompleted && styles.saveBtnDisabled]}
            disabled={isCompleted}
            onPress={() => onUpdateServiceNotes(companyService.id, draftNotes)}
          >
            <Ionicons name="save-outline" size={16} color={isCompleted ? colors.muted : '#0b1120'} />
            <Text style={[styles.saveBtnText, isCompleted && styles.saveBtnTextDisabled]}>Salvar notas</Text>
          </Pressable>
        </View>

        {/* Chat */}
        <ChatActionButton
          disabled={!companyService.conversationId || !companyService.conversationTitle}
          onPress={() =>
            companyService.conversationId &&
            companyService.conversationTitle &&
            onOpenChat(companyService.conversationId, companyService.conversationTitle, companyService.id, isCompleted)
          }
          label={isCompleted ? 'Chat (somente leitura)' : 'Abrir chat do serviço'}
        />
        {isCompleted && (
          <View style={styles.readOnlyBanner}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.warning} />
            <Text style={styles.readOnlyText}>Serviço concluído: edição e chat em modo apenas leitura.</Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }

  // ─── Developer view ───
  if (!feedService) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.cardSoft} />
          <Text style={styles.emptyTitle}>Serviço não encontrado</Text>
        </View>
      </View>
    );
  }

  const levelColors: Record<string, { bg: string; text: string }> = {
    'Júnior': { bg: '#1a3a2a', text: '#4ade80' },
    'Pleno': { bg: '#1a2a3e', text: '#38bdf8' },
    'Sênior': { bg: '#2a1a3e', text: '#a78bfa' }
  };
  const lvl = levelColors[feedService.level] ?? levelColors['Pleno'];

  return (
    <ScrollView style={styles.containerScroll} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <View style={styles.companyAvatar}>
          <Text style={styles.companyInitial}>{feedService.company.charAt(0)}</Text>
        </View>
        <View style={styles.detailHeaderInfo}>
          <Text style={styles.title}>{feedService.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>{feedService.company}</Text>
            <View style={[styles.levelBadge, { backgroundColor: lvl.bg }]}>
              <Text style={[styles.levelText, { color: lvl.text }]}>{feedService.level}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="document-text-outline" size={18} color={colors.primary} />
          <Text style={styles.cardTitle}>Descrição</Text>
        </View>
        <Text style={styles.desc}>{feedService.description}</Text>
      </View>

      {/* Value & Deadline */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="cash-outline" size={20} color={colors.success} />
          <Text style={styles.statValue}>{feedService.value}</Text>
          <Text style={styles.statLabel}>Valor</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time-outline" size={20} color={colors.primary} />
          <Text style={styles.statValue}>{feedService.deadline}</Text>
          <Text style={styles.statLabel}>Prazo</Text>
        </View>
      </View>

      {/* Stack */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="layers-outline" size={18} color={colors.primary} />
          <Text style={styles.cardTitle}>Tecnologias</Text>
        </View>
        <View style={styles.tagsRow}>
          {feedService.stack.map((tag) => (
            <View key={tag} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      {userType === 'developer' ? (
        <Pressable style={styles.ctaBtn} onPress={() => navigation.navigate('ServiceRequestSuccess', { serviceId: feedService.id })}>
          <Ionicons name="paper-plane-outline" size={18} color="#0b1120" />
          <Text style={styles.ctaBtnText}>Solicitar serviço</Text>
        </Pressable>
      ) : (
        <View style={styles.readOnlyBanner}>
          <Ionicons name="information-circle-outline" size={16} color={colors.accent} />
          <Text style={styles.readOnlyBannerText}>Visualização da empresa: sem ações de solicitação.</Text>
        </View>
      )}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  containerScroll: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { padding: 16, gap: 14 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  meta: { color: colors.muted, fontSize: 13 },
  desc: { color: colors.text, lineHeight: 21, fontSize: 14 },

  // Detail header (dev view)
  detailHeader: { flexDirection: 'row', gap: 14 },
  companyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0c2d4a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyInitial: { color: colors.primary, fontWeight: '800', fontSize: 20 },
  detailHeaderInfo: { flex: 1, gap: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  levelBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  levelText: { fontSize: 11, fontWeight: '700' },

  // Cards
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  statValue: { color: colors.text, fontSize: 18, fontWeight: '800' },
  statLabel: { color: colors.muted, fontSize: 11 },

  // Tags
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tagPill: { backgroundColor: '#11203a', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { color: colors.primary, fontSize: 12, fontWeight: '600' },

  // CTA
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16
  },
  ctaBtnText: { color: '#0b1120', fontWeight: '700', fontSize: 16 },

  // Stepper
  stepperCard: { flexDirection: 'row', justifyContent: 'space-between', gap: 2, paddingVertical: 4 },
  stepperItem: { flex: 1, alignItems: 'center', gap: 6, position: 'relative' },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  stepCircleActive: { backgroundColor: colors.primary },
  stepCircleCurrent: { borderWidth: 2, borderColor: '#fff' },
  stepLine: {
    position: 'absolute',
    top: 14,
    left: '65%',
    right: '-35%',
    height: 2,
    backgroundColor: '#243047',
    zIndex: 0
  },
  stepLineActive: { backgroundColor: colors.primary },
  stepLabel: { color: colors.muted, fontSize: 9, textAlign: 'center', fontWeight: '500' },
  stepLabelActive: { color: colors.text, fontWeight: '700' },

  // Status buttons
  actionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statusBtn: {
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
  statusBtnText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  doneRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  doneText: { color: colors.success, fontWeight: '600' },

  // Notes
  input: { backgroundColor: '#111c30', color: colors.text, borderRadius: 10, padding: 12, fontSize: 14, borderWidth: 1, borderColor: '#1e3a5f' },
  multi: { minHeight: 100, textAlignVertical: 'top' },
  readOnlyInput: { opacity: 0.5 },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12
  },
  saveBtnDisabled: { backgroundColor: '#233144' },
  saveBtnText: { color: '#0b1120', fontWeight: '700' },
  saveBtnTextDisabled: { color: colors.muted },

  // Banners
  readOnlyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2a2410',
    borderRadius: 10,
    padding: 12
  },
  readOnlyText: { color: colors.warning, fontSize: 12, flex: 1 },
  readOnlyBannerText: { color: colors.accent, fontSize: 13, flex: 1 },

  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700' }
});
