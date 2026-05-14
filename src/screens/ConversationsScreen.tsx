import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { conversations } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Conversations'>;

export function ConversationsScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Conversas</Text>
      <Text style={styles.subtitle}>{conversations.length} conversa(s) ativa(s)</Text>

      {conversations.map((conversation) => (
        <Pressable
          key={conversation.id}
          style={styles.card}
          onPress={() => navigation.navigate('Chat', { conversationId: conversation.id, title: conversation.title })}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{conversation.title.charAt(0)}</Text>
          </View>

          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.name} numberOfLines={1}>{conversation.title}</Text>
              <Text style={styles.time}>10:28</Text>
            </View>
            <View style={styles.msgRow}>
              <Text style={styles.msg} numberOfLines={1}>{conversation.lastMessage}</Text>
              {conversation.unread > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{conversation.unread}</Text>
                </View>
              )}
            </View>
          </View>

          <Ionicons name="chevron-forward" size={16} color={colors.muted} />
        </Pressable>
      ))}

      {conversations.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="chatbubbles-outline" size={48} color={colors.cardSoft} />
          <Text style={styles.emptyTitle}>Nenhuma conversa ainda</Text>
          <Text style={styles.emptyDesc}>Suas conversas com empresas e desenvolvedores aparecerão aqui.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 10 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: -2, marginBottom: 4 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#0c2d4a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: { color: colors.primary, fontWeight: '800', fontSize: 18 },
  info: { flex: 1, gap: 4 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: colors.text, fontWeight: '700', fontSize: 15, flex: 1, marginRight: 8 },
  time: { color: colors.muted, fontSize: 11 },
  msgRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  msg: { color: colors.muted, fontSize: 13, flex: 1, marginRight: 8 },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6
  },
  badgeText: { color: '#0b1120', fontWeight: '800', fontSize: 11 },
  emptyState: { alignItems: 'center', gap: 8, paddingVertical: 40 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  emptyDesc: { color: colors.muted, fontSize: 13, textAlign: 'center', paddingHorizontal: 20 }
});
