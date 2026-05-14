import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ChatActionButton } from '../components/ChatActionButton';
import { candidates } from '../data/mockData';
import { colors } from '../theme/colors';
import type { CompanyService, RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Candidates'> & {
  companyServices: CompanyService[];
  onOpenChat: (conversationId: string, title: string, serviceId?: string, readOnly?: boolean) => void;
  onHireCandidate: (serviceId: string, candidateId: string, candidateName: string) => void;
};

const levelColors: Record<string, { bg: string; text: string }> = {
  'Júnior': { bg: '#1a3a2a', text: '#4ade80' },
  'Pleno': { bg: '#1a2a3e', text: '#38bdf8' },
  'Sênior': { bg: '#2a1a3e', text: '#a78bfa' }
};

export function CandidatesScreen({ route, companyServices, onOpenChat, onHireCandidate }: Props) {
  const service = companyServices.find((item) => item.id === route.params.serviceId);

  const handleAnalyzeProfile = (candidateName: string) => {
    Alert.alert('Perfil do candidato', `Analisando perfil de ${candidateName}.`);
  };

  const handleRefuse = (candidateName: string) => {
    Alert.alert('Recusar candidato', `Deseja remover ${candidateName} do processo seletivo?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', style: 'destructive' }
    ]);
  };

  const handleHire = (candidateId: string, candidateName: string) => {
    if (!service) return;
    Alert.alert('Contratar candidato', `Confirma a contratação de ${candidateName}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', onPress: () => onHireCandidate(service.id, candidateId, candidateName) }
    ]);
  };

  if (!service) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.cardSoft} />
          <Text style={styles.emptyTitle}>Serviço não encontrado</Text>
        </View>
      </View>
    );
  }

  if (service.status !== 'open' && service.conversationId && service.conversationTitle) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gerenciamento do serviço</Text>
        <Text style={styles.subtitle}>{service.title}</Text>
        <View style={styles.infoCard}>
          <Ionicons name="checkmark-circle-outline" size={28} color={colors.success} />
          <Text style={styles.infoText}>Este serviço já saiu da fase de seleção. Use o chat para acompanhar o progresso.</Text>
          <ChatActionButton
            onPress={() => onOpenChat(service.conversationId!, service.conversationTitle!, service.id, service.status === 'completed')}
            label="Ir para chat"
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Candidatos</Text>
      <Text style={styles.subtitle}>{service.title} • {candidates.length} candidato(s)</Text>

      {candidates.map((candidate) => {
        const scoreNum = parseInt(candidate.score);
        const lvl = levelColors[candidate.level] ?? levelColors['Pleno'];

        return (
          <View key={candidate.id} style={styles.card}>
            {/* Candidate header */}
            <View style={styles.candidateHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {candidate.name.split(' ').map((n) => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.candidateInfo}>
                <Text style={styles.name}>{candidate.name}</Text>
                <View style={styles.metaRow}>
                  <View style={[styles.levelBadge, { backgroundColor: lvl.bg }]}>
                    <Text style={[styles.levelText, { color: lvl.text }]}>{candidate.level}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Score bar */}
            <View style={styles.scoreSection}>
              <View style={styles.scoreHeader}>
                <Text style={styles.scoreLabel}>Match Score</Text>
                <Text style={styles.scoreValue}>{candidate.score}</Text>
              </View>
              <View style={styles.scoreBarBg}>
                <View style={[styles.scoreBarFill, { width: `${scoreNum}%` }]} />
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Actions */}
            <View style={styles.actionsRow}>
              <Pressable style={styles.actionBtn} onPress={() => handleAnalyzeProfile(candidate.name)}>
                <Ionicons name="person-outline" size={14} color={colors.text} />
                <Text style={styles.actionBtnText}>Perfil</Text>
              </Pressable>
              <ChatActionButton
                onPress={() => onOpenChat(`conv-${route.params.serviceId}-${candidate.id}`, `${service.title} • ${candidate.name}`, service.id)}
              />
              <Pressable style={styles.hireBtn} onPress={() => handleHire(candidate.id, candidate.name)}>
                <Ionicons name="checkmark-circle-outline" size={14} color="#0b1120" />
                <Text style={styles.hireBtnText}>Contratar</Text>
              </Pressable>
              <Pressable style={styles.rejectBtn} onPress={() => handleRefuse(candidate.name)}>
                <Ionicons name="close-outline" size={16} color="#ffc2cb" />
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  content: { gap: 12 },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  subtitle: { color: colors.muted, marginBottom: 4, fontSize: 13 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  candidateHeader: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#0c2d4a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: { color: colors.primary, fontWeight: '800', fontSize: 15 },
  candidateInfo: { flex: 1, gap: 4 },
  name: { color: colors.text, fontWeight: '700', fontSize: 16 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  levelBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  levelText: { fontSize: 11, fontWeight: '700' },
  scoreSection: { gap: 6 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreLabel: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  scoreValue: { color: colors.primary, fontWeight: '800', fontSize: 14 },
  scoreBarBg: { height: 6, backgroundColor: '#11203a', borderRadius: 3 },
  scoreBarFill: { height: 6, backgroundColor: colors.primary, borderRadius: 3 },
  divider: { height: 1, backgroundColor: '#1e3a5f' },
  actionsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', alignItems: 'center' },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#11203a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  actionBtnText: { color: colors.text, fontWeight: '600', fontSize: 12 },
  hireBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.success,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  hireBtnText: { color: '#0b1120', fontWeight: '700', fontSize: 12 },
  rejectBtn: {
    backgroundColor: '#3a1a20',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 20,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  infoText: { color: colors.text, textAlign: 'center', lineHeight: 20, fontSize: 14 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700' }
});
