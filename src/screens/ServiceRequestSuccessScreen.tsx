import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceRequestSuccess'>;

export function ServiceRequestSuccessScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <View style={styles.iconRing}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={44} color="#fff" />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Solicitação enviada!</Text>
      <Text style={styles.sub}>
        A empresa recebeu sua proposta e entrará em contato em breve.{'\n'}
        Acompanhe o status na aba <Text style={styles.highlight}>Candidaturas</Text>.
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="notifications-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>Você receberá uma notificação quando houver atualização.</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>O chat será habilitado quando a empresa responder.</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.replace('Main')}>
        <Text style={styles.buttonText}>Voltar para o app</Text>
        <Ionicons name="arrow-forward" size={18} color="#0b1120" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', padding: 24, gap: 16 },
  iconWrap: { alignItems: 'center', marginBottom: 8 },
  iconRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#1a3a2a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4ade80',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: { color: colors.text, fontWeight: '800', fontSize: 26, textAlign: 'center' },
  sub: { color: colors.muted, lineHeight: 22, textAlign: 'center', fontSize: 14 },
  highlight: { color: colors.primary, fontWeight: '700' },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { color: colors.text, fontSize: 13, flex: 1, lineHeight: 19 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 4
  },
  buttonText: { color: '#0b1120', fontWeight: '700', fontSize: 16 }
});
