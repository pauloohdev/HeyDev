import { NativeStackScreenProps } from '@react-navigation/native-stack';
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

export function CandidatesScreen({ route, companyServices, onOpenChat, onHireCandidate }: Props) {
  const service = companyServices.find((item) => item.id === route.params.serviceId);

  const handleAnalyzeProfile = (candidateName: string) => {
    Alert.alert('Perfil do candidato', `Analisando perfil de ${candidateName}.`);
  };

  const handleRefuse = (candidateName: string) => {
    Alert.alert('Candidato recusado', `${candidateName} foi removido deste processo seletivo.`);
  };

  const handleHire = (candidateId: string, candidateName: string) => {
    if (!service) return;
    onHireCandidate(service.id, candidateId, candidateName);
  };

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Serviço não encontrado</Text>
      </View>
    );
  }

  if (service.status !== 'open' && service.conversationId && service.conversationTitle) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gerenciamento do serviço</Text>
        <Text style={styles.subtitle}>{service.title}</Text>
        <View style={styles.card}>
          <Text style={styles.meta}>Este serviço já saiu da fase de seleção.</Text>
          <ChatActionButton onPress={() => onOpenChat(service.conversationId!, service.conversationTitle!, service.id, service.status === 'completed')} label="Ir para chat/gerenciamento" />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Candidatos</Text>
      <Text style={styles.subtitle}>{service.title}</Text>

      {candidates.map((candidate) => (
        <View key={candidate.id} style={styles.card}>
          <Text style={styles.name}>{candidate.name}</Text>
          <Text style={styles.meta}>{candidate.level} • Match {candidate.score}</Text>

          <View style={styles.actionsRow}>
            <Pressable style={styles.secondaryBtn} onPress={() => handleAnalyzeProfile(candidate.name)}>
              <Text style={styles.secondaryBtnText}>Analisar perfil</Text>
            </Pressable>
            <ChatActionButton onPress={() => onOpenChat(`conv-${route.params.serviceId}-${candidate.id}`, `${service.title} • ${candidate.name}`, service.id)} />
            <Pressable style={styles.hireBtn} onPress={() => handleHire(candidate.id, candidate.name)}>
              <Text style={styles.hireBtnText}>Contratar</Text>
            </Pressable>
            <Pressable style={styles.rejectBtn} onPress={() => handleRefuse(candidate.name)}>
              <Text style={styles.rejectBtnText}>Recusar</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  content: { gap: 10 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  subtitle: { color: colors.muted, marginBottom: 8 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 12, gap: 8 },
  name: { color: colors.text, fontWeight: '700' },
  meta: { color: colors.muted },
  actionsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  secondaryBtn: { backgroundColor: '#11203a', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  secondaryBtnText: { color: colors.text, fontWeight: '600', fontSize: 12 },
  hireBtn: { backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  hireBtnText: { color: '#0b1120', fontWeight: '700', fontSize: 12 },
  rejectBtn: { backgroundColor: '#3a1a20', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  rejectBtnText: { color: '#ffc2cb', fontWeight: '700', fontSize: 12 }
});
