import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { conversations } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export function ChatScreen({ route }: Props) {
  const conversation = conversations.find((item) => item.id === route.params.conversationId);
  const readOnly = !!route.params.readOnly;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.title}</Text>
      {route.params.serviceId && <Text style={styles.subtitle}>Contexto do serviço: {route.params.serviceId}</Text>}
      <ScrollView contentContainerStyle={styles.messages}>
        <View style={styles.me}><Text style={styles.msgText}>Olá! Tenho interesse no serviço.</Text></View>
        <View style={styles.them}><Text style={[styles.msgText, styles.msgTextLight]}>{conversation?.lastMessage ?? 'Vamos conversar.'}</Text></View>
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput editable={!readOnly} style={[styles.input, readOnly && styles.inputDisabled]} placeholder="Digite uma mensagem" placeholderTextColor={colors.muted} />
        <Pressable disabled={readOnly} style={[styles.send, readOnly && styles.sendDisabled]}><Text style={styles.sendText}>{readOnly ? 'Bloqueado' : 'Enviar'}</Text></Pressable>
      </View>
      {readOnly && <Text style={styles.readOnly}>Chat em modo somente leitura para serviço concluído.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: colors.muted, marginBottom: 10 },
  messages: { gap: 8, paddingBottom: 10 },
  me: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderRadius: 10, padding: 10, maxWidth: '80%' },
  them: { alignSelf: 'flex-start', backgroundColor: colors.card, borderRadius: 10, padding: 10, maxWidth: '80%' },
  msgText: { color: '#0b1120' },
  msgTextLight: { color: colors.text },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: colors.card, color: colors.text, borderRadius: 10, padding: 12 },
  inputDisabled: { opacity: 0.6 },
  send: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 14, justifyContent: 'center' },
  sendDisabled: { backgroundColor: '#233144' },
  sendText: { fontWeight: '700', color: '#0b1120' },
  readOnly: { color: colors.muted, marginTop: 8 }
});
