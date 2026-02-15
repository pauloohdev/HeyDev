import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { myServices } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList, UserType } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'MyServices'> & {
  userType: UserType;
  onOpenCandidates: (serviceId: string) => void;
};

export function MyServicesScreen({ userType, onOpenCandidates }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{userType === 'company' ? 'Serviços publicados' : 'Meus serviços'}</Text>
      {myServices.map((service) => (
        <View key={service.id} style={styles.card}>
          <Text style={styles.cardTitle}>{service.title}</Text>
          <Text style={styles.meta}>{service.status} • {service.proposals} propostas</Text>
          {userType === 'company' && (
            <Pressable style={styles.btn} onPress={() => onOpenCandidates(service.id)}>
              <Text style={styles.btnText}>Ver candidatos</Text>
            </Pressable>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700' },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, gap: 8 },
  cardTitle: { color: colors.text, fontWeight: '700' },
  meta: { color: colors.muted },
  btn: { backgroundColor: colors.primary, alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  btnText: { color: '#0b1120', fontWeight: '700' }
});
