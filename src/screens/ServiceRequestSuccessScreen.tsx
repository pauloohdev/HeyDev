import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceRequestSuccess'>;

export function ServiceRequestSuccessScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitação enviada 🎉</Text>
      <Text style={styles.sub}>A empresa recebeu sua proposta e você pode acompanhar em Minhas candidaturas.</Text>
      <Pressable style={styles.button} onPress={() => navigation.replace('Main')}>
        <Text style={styles.buttonText}>Ir para o app</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', padding: 16, gap: 14 },
  title: { color: colors.text, fontWeight: '700', fontSize: 24 },
  sub: { color: colors.muted, lineHeight: 20 },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: 14 },
  buttonText: { color: '#0b1120', textAlign: 'center', fontWeight: '700' }
});
