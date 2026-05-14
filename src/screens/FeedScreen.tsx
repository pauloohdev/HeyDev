import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ServiceCard } from '../components/ServiceCard';
import { developerInvolvedServiceIds, services } from '../data/mockData';
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

  const normalizedSearchTag = tagInput.trim().toLowerCase();
  const filteredServices = services.filter((service) => {
    if (userType === 'developer' && developerInvolvedServiceIds.has(service.id)) {
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
      {/* Greeting */}
      <View style={styles.greetingRow}>
        <View>
          <Text style={styles.greeting}>
            {userType === 'developer' ? 'Encontre seu próximo projeto' : 'Explore o mercado'}
          </Text>
          <Text style={styles.greetingSub}>
            {filteredServices.length} {filteredServices.length === 1 ? 'serviço disponível' : 'serviços disponíveis'}
          </Text>
        </View>
      </View>

      {userType === 'company' && (
        <View style={styles.noticeBanner}>
          <Ionicons name="information-circle-outline" size={16} color={colors.accent} />
          <Text style={styles.noticeText}>Visualização apenas: acompanhe as vagas sem solicitar serviços.</Text>
        </View>
      )}

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={colors.muted} style={styles.searchIcon} />
        <TextInput
          value={tagInput}
          onChangeText={setTagInput}
          placeholder="Buscar por tag, stack ou tecnologia..."
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
        {tagInput.length > 0 && (
          <Pressable onPress={() => setTagInput('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {/* Tags */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsRow}>
        {availableTags.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <Pressable key={tag} onPress={() => toggleTag(tag)} style={[styles.tagBtn, active && styles.tagBtnActive]}>
              {active && <Ionicons name="checkmark" size={14} color="#0b1120" />}
              <Text style={[styles.tagText, active && styles.tagTextActive]}>{tag}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Active filters indicator */}
      {selectedTags.length > 0 && (
        <Pressable style={styles.clearFilters} onPress={() => setSelectedTags([])}>
          <Ionicons name="filter" size={14} color={colors.primary} />
          <Text style={styles.clearFiltersText}>{selectedTags.length} filtro(s) ativo(s)</Text>
          <Ionicons name="close" size={14} color={colors.muted} />
        </Pressable>
      )}

      {/* Service Cards */}
      {filteredServices.map((service) => (
        <ServiceCard key={service.id} service={service} userType={userType} onTagPress={fillGlobalFilterFromTag} onPress={() => onOpenService(service.id)} />
      ))}

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="search" size={48} color={colors.cardSoft} />
          <Text style={styles.emptyTitle}>Nenhum serviço encontrado</Text>
          <Text style={styles.emptyDesc}>Tente ajustar os filtros ou buscar por outra tecnologia.</Text>
        </View>
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12 },
  greetingRow: { marginBottom: 2 },
  greeting: { color: colors.text, fontSize: 22, fontWeight: '800' },
  greetingSub: { color: colors.muted, fontSize: 13, marginTop: 2 },
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1a1a3e',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2a2a5e'
  },
  noticeText: { color: colors.accent, fontSize: 13, flex: 1 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: colors.text, paddingVertical: 12, fontSize: 14 },
  tagsRow: { gap: 8, paddingVertical: 2 },
  tagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#11203a',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  tagBtnActive: { backgroundColor: colors.primary },
  tagText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  tagTextActive: { color: '#0b1120' },
  clearFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: '#0c2d4a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  clearFiltersText: { color: colors.primary, fontSize: 12, fontWeight: '600' },
  emptyState: { alignItems: 'center', gap: 8, paddingVertical: 40 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  emptyDesc: { color: colors.muted, fontSize: 13, textAlign: 'center' }
});
