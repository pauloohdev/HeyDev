import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ServiceCard } from '../components/ServiceCard';
import { applications, services } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList, UserType } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Feed'> & {
  userType: UserType;
  onOpenService: (serviceId: string) => void;
};

export function FeedScreen({ userType, onOpenService }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const availableTags = useMemo(() => Array.from(new Set(services.flatMap((service) => service.stack))), []);
  const appliedServiceIds = useMemo(() => new Set(applications.map((application) => application.serviceId)), []);

  const normalizedSearchTag = tagInput.trim().toLowerCase();
  const filteredServices = services.filter((service) => {
    if (userType === 'developer' && appliedServiceIds.has(service.id)) {
      return false;
    }

    const serviceTags = service.stack.map((tag) => tag.toLowerCase());
    const selectedMatch = selectedTags.length === 0 || selectedTags.every((tag) => serviceTags.includes(tag.toLowerCase()));
    const typedMatch = !normalizedSearchTag || serviceTags.some((tag) => tag.includes(normalizedSearchTag));
    return selectedMatch && typedMatch;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  };

  const fillGlobalFilterFromTag = (tag: string) => {
    setTagInput(tag);
    setSelectedTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Feed de serviços</Text>
      {userType === 'company' && <Text style={styles.notice}>Visualização apenas: acompanhe as vagas sem solicitar serviços.</Text>}
      <TextInput
        value={tagInput}
        onChangeText={setTagInput}
        placeholder="Filtrar por tag (ex: Python, Mobile, Freelance)"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsRow}>
        {availableTags.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <Pressable key={tag} onPress={() => toggleTag(tag)} style={[styles.tagBtn, active && styles.tagBtnActive]}>
              <Text style={[styles.tagText, active && styles.tagTextActive]}>{tag}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {filteredServices.map((service) => (
        <ServiceCard key={service.id} service={service} userType={userType} onTagPress={fillGlobalFilterFromTag} onPress={() => onOpenService(service.id)} />
      ))}
      {filteredServices.length === 0 && <Text style={styles.empty}>Nenhum serviço encontrado para os filtros selecionados.</Text>}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 2 },
  notice: { color: colors.muted, marginTop: -2 },
  input: { backgroundColor: colors.card, color: colors.text, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  tagsRow: { gap: 8, paddingVertical: 2 },
  tagBtn: { backgroundColor: '#11203a', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 },
  tagBtnActive: { backgroundColor: colors.primary },
  tagText: { color: colors.primary, fontWeight: '600' },
  tagTextActive: { color: '#0b1120' },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 4 }
});
