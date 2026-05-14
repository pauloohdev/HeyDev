import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput as RNTextInput, View } from 'react-native';

import { ServiceCard } from '../components/ServiceCard';
import { Chip, EmptyState, Banner } from '../components/primitives';
import { developerInvolvedServiceIds, services } from '../data/mockData';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';
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
        <Banner variant="info">
          Visualização apenas: acompanhe as vagas sem solicitar serviços.
        </Banner>
      )}

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={colors.muted} style={styles.searchIcon} />
        <RNTextInput
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
            <Chip
              key={tag}
              label={tag}
              active={active}
              variant="filter"
              onPress={() => toggleTag(tag)}
            />
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
        <EmptyState
          icon="search"
          title="Nenhum serviço encontrado"
          description="Tente ajustar os filtros ou buscar por outra tecnologia."
        />
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: SPACING.lg, gap: SPACING.md },
  greetingRow: { marginBottom: 2 },
  greeting: { color: colors.text, fontSize: FONT_SIZES['3xl'], fontWeight: '800' },
  greetingSub: { color: colors.muted, fontSize: FONT_SIZES.md, marginTop: 2 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: colors.border
  },
  searchIcon: { marginRight: SPACING.md },
  searchInput: { flex: 1, color: colors.text, paddingVertical: SPACING.md, fontSize: FONT_SIZES.md },
  tagsRow: { gap: SPACING.md, paddingVertical: 2 },
  clearFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: SPACING.sm,
    backgroundColor: colors.buttonBg,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm
  },
  clearFiltersText: { color: colors.primary, fontSize: FONT_SIZES.xs, fontWeight: '600' }
});
