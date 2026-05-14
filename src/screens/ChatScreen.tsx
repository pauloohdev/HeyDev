import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { conversations } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

type MockMessage = {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
};

const mockMessages: MockMessage[] = [
  { id: '1', text: 'Olá! Tenho interesse no serviço. Posso ver o escopo completo?', sender: 'me', time: '10:20' },
  { id: '2', text: 'Claro! Vou compartilhar o documento do projeto.', sender: 'them', time: '10:22' },
  { id: '3', text: 'Tenho experiência com a stack solicitada. Trabalhei em projetos semelhantes.', sender: 'me', time: '10:25' },
  { id: '4', text: 'Ótimo! Podemos alinhar o escopo e prazos numa call rápida?', sender: 'them', time: '10:28' },
  { id: '5', text: 'Perfeito, estou disponível amanhã às 14h. 👍', sender: 'me', time: '10:30' },
];

export function ChatScreen({ route }: Props) {
  const conversation = conversations.find((item) => item.id === route.params.conversationId);
  const readOnly = !!route.params.readOnly;

  const messages = conversation
    ? [...mockMessages.slice(0, -1), { ...mockMessages[mockMessages.length - 1], text: conversation.lastMessage }]
    : mockMessages;

  return (
    <View style={styles.container}>
      {/* Chat header info */}
      {route.params.serviceId && (
        <View style={styles.contextBanner}>
          <Ionicons name="briefcase-outline" size={14} color={colors.accent} />
          <Text style={styles.contextText} numberOfLines={1}>
            Contexto: {route.params.title}
          </Text>
        </View>
      )}

      {readOnly && (
        <View style={styles.readOnlyBanner}>
          <Ionicons name="lock-closed-outline" size={14} color={colors.warning} />
          <Text style={styles.readOnlyText}>Chat em modo somente leitura — serviço concluído</Text>
        </View>
      )}

      {/* Messages */}
      <ScrollView style={styles.messagesArea} contentContainerStyle={styles.messagesContent}>
        <Text style={styles.dateSeparator}>Hoje</Text>
        {messages.map((msg) => (
          <View key={msg.id} style={msg.sender === 'me' ? styles.meRow : styles.themRow}>
            {msg.sender === 'them' && (
              <View style={styles.avatarSmall}>
                <Text style={styles.avatarSmallText}>{(route.params.title || 'U').charAt(0)}</Text>
              </View>
            )}
            <View style={msg.sender === 'me' ? styles.meBubble : styles.themBubble}>
              <Text style={msg.sender === 'me' ? styles.meText : styles.themText}>{msg.text}</Text>
              <Text style={msg.sender === 'me' ? styles.meTime : styles.themTime}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputRow}>
        <Pressable style={styles.attachBtn}>
          <Ionicons name="attach-outline" size={22} color={colors.muted} />
        </Pressable>
        <TextInput
          editable={!readOnly}
          style={[styles.input, readOnly && styles.inputDisabled]}
          placeholder={readOnly ? 'Chat bloqueado' : 'Digite uma mensagem...'}
          placeholderTextColor={colors.muted}
        />
        <Pressable disabled={readOnly} style={[styles.sendBtn, readOnly && styles.sendDisabled]}>
          <Ionicons name="send" size={18} color={readOnly ? colors.muted : '#0b1120'} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1a1a3e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a5e'
  },
  contextText: { color: colors.accent, fontSize: 12, flex: 1 },
  readOnlyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2a2410',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  readOnlyText: { color: colors.warning, fontSize: 12 },
  messagesArea: { flex: 1 },
  messagesContent: { padding: 16, gap: 8, paddingBottom: 10 },
  dateSeparator: {
    color: colors.muted,
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600'
  },
  meRow: { alignItems: 'flex-end' },
  themRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0c2d4a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarSmallText: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  meBubble: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 12,
    maxWidth: '78%'
  },
  themBubble: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    maxWidth: '78%',
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  meText: { color: '#0b1120', fontSize: 14, lineHeight: 20 },
  themText: { color: colors.text, fontSize: 14, lineHeight: 20 },
  meTime: { color: '#0b112088', fontSize: 10, textAlign: 'right', marginTop: 4 },
  themTime: { color: colors.muted, fontSize: 10, marginTop: 4 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b'
  },
  attachBtn: { padding: 4 },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  inputDisabled: { opacity: 0.5 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendDisabled: { backgroundColor: '#233144' }
});
