import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
      <Text style={styles.logo}>HeyDev</Text>
      <Text style={styles.subtitle}>Conectando empresas e devs agora no mobile</Text>
      <Pressable style={styles.button} onPress={() => select('developer')}>
        <Text style={styles.buttonText}>Entrar como desenvolvedor</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.buttonSecondary]} onPress={() => select('company')}>
        <Text style={styles.buttonText}>Entrar como empresa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', padding: 24, gap: 14 },
  logo: { color: colors.text, fontSize: 40, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 16, marginBottom: 16 },
  button: { backgroundColor: colors.primary, padding: 14, borderRadius: 10 },
  buttonSecondary: { backgroundColor: colors.cardSoft },
  buttonText: { color: '#0b1120', fontWeight: '700', textAlign: 'center' }
});
