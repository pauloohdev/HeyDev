import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import type { Service } from '../types/navigation';

type Props = {
  service: Service;
  onPress?: () => void;
};

export function ServiceCard({ service, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.meta}>{service.company} • {service.level}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.value}>{service.value} • prazo {service.deadline}</Text>
      <View style={styles.tags}>
        {service.stack.map((tag) => (
          <Text key={tag} style={styles.tag}>{tag}</Text>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    gap: 8
  },
  title: { color: colors.text, fontWeight: '700', fontSize: 16 },
  meta: { color: colors.muted, fontSize: 12 },
  description: { color: colors.text, fontSize: 13 },
  value: { color: colors.success, fontWeight: '600' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: colors.cardSoft,
    color: colors.text,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11
  }
});
