import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import type { RootStackParamList, UserType } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'> & {
  onSelectUserType: (type: UserType) => void;
};

export function OnboardingScreen({ navigation, onSelectUserType }: Props) {
  const select = (type: UserType) => {
    onSelectUserType(type);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.iconCircle}>
          <Ionicons name="code-slash" size={44} color={colors.primary} />
        </View>
        <Text style={styles.logo}>HeyDev</Text>
        <Text style={styles.subtitle}>
          Conectando empresas e desenvolvedores{'\n'}de forma rápida e inteligente
        </Text>
      </View>

      <View style={styles.cards}>
        <Text style={styles.prompt}>Como deseja continuar?</Text>

        <Pressable style={styles.devCard} onPress={() => select('developer')}>
          <View style={styles.cardLeft}>
            <View style={[styles.cardIcon, { backgroundColor: '#0c2d4a' }]}>
              <Ionicons name="code" size={22} color={colors.primary} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Sou Desenvolvedor</Text>
              <Text style={styles.cardDesc}>Encontre projetos e ganhe dinheiro</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </Pressable>

        <Pressable style={styles.compCard} onPress={() => select('company')}>
          <View style={styles.cardLeft}>
            <View style={[styles.cardIcon, { backgroundColor: '#1a1a3e' }]}>
              <Ionicons name="business" size={22} color={colors.accent} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Sou Empresa</Text>
              <Text style={styles.cardDesc}>Publique projetos e encontre talentos</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </Pressable>
      </View>

      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, justifyContent: 'space-between', padding: 24, paddingTop: 80 },
  hero: { alignItems: 'center', gap: 12 },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#0f2440',
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  },
  logo: { color: colors.text, fontSize: 42, fontWeight: '900', letterSpacing: -1 },
  subtitle: { color: colors.muted, fontSize: 15, textAlign: 'center', lineHeight: 22 },
  cards: { gap: 12 },
  prompt: { color: colors.muted, fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  devCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border
  },
  compCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  cardIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { gap: 2 },
  cardTitle: { color: colors.text, fontWeight: '700', fontSize: 16 },
  cardDesc: { color: colors.muted, fontSize: 13 },
  version: { color: colors.muted, textAlign: 'center', fontSize: 12, opacity: 0.6, paddingBottom: 16 }
});
