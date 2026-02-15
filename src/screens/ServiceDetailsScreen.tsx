import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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
    return <View style={styles.container}><Text style={styles.title}>Serviço não encontrado</Text></View>;
  }

  if (userType === 'company' && companyService) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{companyService.title}</Text>

        <View style={styles.stepperRow}>
          {statusOrder.map((status, index) => {
            const reached = statusOrder.indexOf(companyService.status) >= index;
            return (
              <View key={status} style={styles.stepperItem}>
                <View style={[styles.stepDot, reached && styles.stepDotActive]} />
                <Text style={[styles.stepLabel, reached && styles.stepLabelActive]}>{statusLabel[status]}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.sub}>Atualizar status</Text>
          <View style={styles.actionsRow}>
            {availableNextStatuses.map((status) => (
              <Pressable key={status} style={styles.statusBtn} onPress={() => onUpdateServiceStatus(companyService.id, status)}>
                <Text style={styles.statusBtnText}>{statusLabel[status]}</Text>
              </Pressable>
            ))}
            {availableNextStatuses.length === 0 && <Text style={styles.readOnly}>Fluxo concluído: sem novas mudanças de status.</Text>}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sub}>Notas internas</Text>
          <TextInput
            style={[styles.input, styles.multi, isCompleted && styles.readOnlyInput]}
            editable={!isCompleted}
            value={draftNotes}
            onChangeText={setDraftNotes}
            placeholder="Adicione observações para acompanhamento"
            placeholderTextColor={colors.muted}
          />
          <Pressable style={[styles.primary, isCompleted && styles.primaryDisabled]} disabled={isCompleted} onPress={() => onUpdateServiceNotes(companyService.id, draftNotes)}>
            <Text style={styles.primaryText}>Salvar notas</Text>
          </Pressable>
        </View>

        <ChatActionButton
          disabled={!companyService.conversationId || !companyService.conversationTitle}
          onPress={() =>
            companyService.conversationId &&
            companyService.conversationTitle &&
            onOpenChat(companyService.conversationId, companyService.conversationTitle, companyService.id, isCompleted)
          }
          label={isCompleted ? 'Chat (somente leitura)' : 'Abrir chat do serviço'}
        />
        {isCompleted && <Text style={styles.readOnly}>Serviço concluído: edição e chat em modo apenas leitura.</Text>}
      </View>
    );
  }

  if (!feedService) {
    return <View style={styles.container}><Text style={styles.title}>Serviço não encontrado</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{feedService.title}</Text>
      <Text style={styles.sub}>{feedService.company} • {feedService.level}</Text>
      <Text style={styles.desc}>{feedService.description}</Text>
      <Text style={styles.value}>{feedService.value}</Text>
      <Text style={styles.sub}>Prazo estimado: {feedService.deadline}</Text>

      {userType === 'developer' ? (
        <Pressable style={styles.primary} onPress={() => navigation.navigate('ServiceRequestSuccess', { serviceId: feedService.id })}>
          <Text style={styles.primaryText}>Solicitar serviço</Text>
        </Pressable>
      ) : (
        <Text style={styles.readOnly}>Visualização da empresa: sem ações de solicitação neste feed.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  sub: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 20 },
  value: { color: colors.success, fontWeight: '700', fontSize: 18 },
  readOnly: { color: colors.muted, marginTop: 2 },
  primary: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, marginTop: 4 },
  primaryDisabled: { backgroundColor: '#21374d' },
  primaryText: { color: '#0b1120', textAlign: 'center', fontWeight: '700' },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 12, gap: 10 },
  stepperRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  stepperItem: { flex: 1, alignItems: 'center', gap: 4 },
  stepDot: { width: 10, height: 10, borderRadius: 8, backgroundColor: '#243047' },
  stepDotActive: { backgroundColor: colors.primary },
  stepLabel: { color: colors.muted, fontSize: 10, textAlign: 'center' },
  stepLabelActive: { color: colors.text, fontWeight: '600' },
  actionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statusBtn: { backgroundColor: '#183153', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  statusBtnText: { color: colors.primary, fontWeight: '600' },
  input: { backgroundColor: '#111c30', color: colors.text, borderRadius: 10, padding: 12 },
  multi: { minHeight: 100, textAlignVertical: 'top' },
  readOnlyInput: { opacity: 0.7 }
});
