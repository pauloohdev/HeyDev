import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';

type Props = {
  label?: string;
  disabled?: boolean;
  onPress?: () => void;
};

export function ChatActionButton({ label = 'Abrir chat', disabled = false, onPress }: Props) {
  return (
    <Pressable disabled={disabled} style={[styles.button, disabled && styles.buttonDisabled]} onPress={onPress}>
      <Text style={[styles.text, disabled && styles.textDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary, alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  buttonDisabled: { backgroundColor: '#233144' },
  text: { color: '#0b1120', fontWeight: '700' },
  textDisabled: { color: colors.muted }
});
