import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';
import type { MainTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'CreateService'>;

export function CreateServiceScreen(_: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar serviço</Text>
      <TextInput style={styles.input} placeholder="Título" placeholderTextColor={colors.muted} />
      <TextInput style={[styles.input, styles.multi]} multiline placeholder="Descrição" placeholderTextColor={colors.muted} />
      <TextInput style={styles.input} placeholder="Valor" placeholderTextColor={colors.muted} />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Publicar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 10 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  input: { backgroundColor: colors.card, color: colors.text, borderRadius: 10, padding: 12 },
  multi: { minHeight: 120, textAlignVertical: 'top' },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: 14 },
  buttonText: { color: '#0b1120', textAlign: 'center', fontWeight: '700' }
});
