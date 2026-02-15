import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { conversations } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export function ChatScreen({ route }: Props) {
  const conversation = conversations.find((item) => item.id === route.params.conversationId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.title}</Text>
      <ScrollView contentContainerStyle={styles.messages}>
        <View style={styles.me}><Text style={styles.msgText}>Olá! Tenho interesse no serviço.</Text></View>
        <View style={styles.them}><Text style={styles.msgText}>{conversation?.lastMessage ?? 'Vamos conversar.'}</Text></View>
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Digite uma mensagem" placeholderTextColor={colors.muted} />
        <Pressable style={styles.send}><Text style={styles.sendText}>Enviar</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', marginBottom: 10 },
  messages: { gap: 8, paddingBottom: 10 },
  me: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderRadius: 10, padding: 10, maxWidth: '80%' },
  them: { alignSelf: 'flex-start', backgroundColor: colors.card, borderRadius: 10, padding: 10, maxWidth: '80%' },
  msgText: { color: '#0b1120' },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: colors.card, color: colors.text, borderRadius: 10, padding: 12 },
  send: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 14, justifyContent: 'center' },
  sendText: { fontWeight: '700', color: '#0b1120' }
});
