import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { conversations } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Conversations'>;

export function ConversationsScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Conversas ativas</Text>
      {conversations.map((conversation) => (
        <Pressable
          key={conversation.id}
          style={styles.card}
          onPress={() => navigation.navigate('Chat', { conversationId: conversation.id, title: conversation.title })}
        >
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={styles.name}>{conversation.title}</Text>
            <Text style={styles.msg}>{conversation.lastMessage}</Text>
          </View>
          {conversation.unread > 0 && (
            <View style={styles.badge}><Text style={styles.badgeText}>{conversation.unread}</Text></View>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 10 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 2 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  name: { color: colors.text, fontWeight: '700' },
  msg: { color: colors.muted },
  badge: { minWidth: 24, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', paddingHorizontal: 7, paddingVertical: 4 },
  badgeText: { color: '#0b1120', fontWeight: '800' }
});
