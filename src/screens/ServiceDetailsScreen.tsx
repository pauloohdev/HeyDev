import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { services } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceDetails'>;

export function ServiceDetailsScreen({ navigation, route }: Props) {
  const service = services.find((item) => item.id === route.params.serviceId);
  if (!service) {
    return <View style={styles.container}><Text style={styles.title}>Serviço não encontrado</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.sub}>{service.company} • {service.level}</Text>
      <Text style={styles.desc}>{service.description}</Text>
      <Text style={styles.value}>{service.value}</Text>
      <Text style={styles.sub}>Prazo estimado: {service.deadline}</Text>
      <Pressable style={styles.primary} onPress={() => navigation.navigate('ServiceRequestSuccess', { serviceId: service.id })}>
        <Text style={styles.primaryText}>Solicitar serviço</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  sub: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 20 },
  value: { color: colors.success, fontWeight: '700', fontSize: 18 },
  primary: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, marginTop: 8 },
  primaryText: { color: '#0b1120', textAlign: 'center', fontWeight: '700' }
});
