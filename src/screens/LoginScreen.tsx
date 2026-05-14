import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>Entre na sua conta para continuar</Text>
      </View>

      {/* Social Login */}
      <View style={styles.socialSection}>
        <Pressable style={styles.googleBtn} onPress={() => navigation.replace('Main')}>
          <Ionicons name="logo-google" size={20} color="#1f1f1f" />
          <Text style={styles.googleText}>Continuar com Google</Text>
        </Pressable>

        <Pressable style={styles.githubBtn} onPress={() => navigation.replace('Main')}>
          <Ionicons name="logo-github" size={20} color="#ffffff" />
          <Text style={styles.githubText}>Continuar com GitHub</Text>
        </Pressable>
      </View>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou entre com email</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Email/Password Form */}
      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="seu@email.com"
            placeholderTextColor={colors.muted}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Senha</Text>
            <Pressable>
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </Pressable>
          </View>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={colors.muted}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <Pressable style={styles.loginBtn} onPress={() => navigation.replace('Main')}>
          <Text style={styles.loginBtnText}>Entrar</Text>
        </Pressable>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem uma conta? </Text>
        <Pressable>
          <Text style={styles.registerText}>Criar conta</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, justifyContent: 'center', flexGrow: 1, gap: 24 },
  header: { gap: 6, marginBottom: 4 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  socialSection: { gap: 10 },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14
  },
  googleText: { color: '#1f1f1f', fontWeight: '600', fontSize: 15 },
  githubBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#24292e',
    borderRadius: 12,
    padding: 14
  },
  githubText: { color: '#ffffff', fontWeight: '600', fontSize: 15 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { color: colors.muted, fontSize: 12, fontWeight: '500' },
  formSection: { gap: 14 },
  inputGroup: { gap: 6 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: colors.muted, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  forgotText: { color: colors.primary, fontSize: 12, fontWeight: '600' },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.border
  },
  loginBtn: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, marginTop: 2 },
  loginBtnText: { textAlign: 'center', color: '#0b1120', fontWeight: '700', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingTop: 4 },
  footerText: { color: colors.muted, fontSize: 14 },
  registerText: { color: colors.primary, fontWeight: '700', fontSize: 14 }
});
