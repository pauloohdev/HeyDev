import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import type { Service, UserType } from '../types/navigation';

type Props = {
  service: Service;
  userType: UserType;
  onPress?: () => void;
  onTagPress?: (tag: string) => void;
};

export function ServiceCard({ service, onPress, onTagPress, userType }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.meta}>{service.company} • {service.level}</Text>
      <Text style={styles.description}>{service.description}</Text>
      {userType === 'developer' && <Text style={styles.value}>{service.value} • prazo {service.deadline}</Text>}
      <View style={styles.tags}>
        {service.stack.map((tag) => (
          <Pressable key={tag} onPress={() => onTagPress?.(tag)} style={styles.tagPill}>
            <Text style={styles.tag}>{tag}</Text>
          </Pressable>
        ))}
      </View>
      {userType === 'developer' && (
        <View style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>Candidatar-se</Text>
        </View>
      )}
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
  tagPill: { backgroundColor: colors.cardSoft, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  tag: {
    color: colors.text,
    fontSize: 11
  },
  applyBtn: { marginTop: 4, alignSelf: 'flex-start', backgroundColor: '#183153', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  applyBtnText: { color: colors.primary, fontWeight: '600', fontSize: 12 }
});
