import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" placeholderTextColor={colors.muted} style={styles.input} />
      <TextInput placeholder="Senha" placeholderTextColor={colors.muted} style={styles.input} secureTextEntry />
      <Pressable style={styles.button} onPress={() => navigation.replace('Main')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center', gap: 12 },
  title: { color: colors.text, fontSize: 30, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: colors.card, color: colors.text, borderRadius: 10, padding: 12 },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, marginTop: 6 },
  buttonText: { textAlign: 'center', color: '#0b1120', fontWeight: '700' }
});
