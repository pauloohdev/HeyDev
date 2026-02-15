import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ServiceCard } from '../components/ServiceCard';
import { services } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Feed'> & {
  onOpenService: (serviceId: string) => void;
};

export function FeedScreen({ onOpenService }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Feed de serviços</Text>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onPress={() => onOpenService(service.id)} />
      ))}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 6 }
});
