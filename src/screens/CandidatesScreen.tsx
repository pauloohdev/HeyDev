import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { candidates, myServices } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Candidates'>;

export function CandidatesScreen({ route }: Props) {
  const service = myServices.find((item) => item.id === route.params.serviceId);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Candidatos</Text>
      <Text style={styles.subtitle}>{service?.title ?? 'Serviço selecionado'}</Text>
      {candidates.map((candidate) => (
        <View key={candidate.id} style={styles.card}>
          <Text style={styles.name}>{candidate.name}</Text>
          <Text style={styles.meta}>{candidate.level} • Match {candidate.score}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 10 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  subtitle: { color: colors.muted, marginBottom: 8 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 12 },
  name: { color: colors.text, fontWeight: '700' },
  meta: { color: colors.muted }
});
