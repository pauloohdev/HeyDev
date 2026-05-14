import { Ionicons } from '@expo/vector-icons';
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
      <Ionicons name="chatbubble-outline" size={14} color={disabled ? colors.muted : '#0b1120'} />
      <Text style={[styles.text, disabled && styles.textDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  buttonDisabled: { backgroundColor: '#233144' },
  text: { color: '#0b1120', fontWeight: '700', fontSize: 13 },
  textDisabled: { color: colors.muted }
});
