import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';
import type { MainTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'CreateService'>;

const levels = ['Júnior', 'Pleno', 'Sênior'] as const;

export function CreateServiceScreen(_: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [tags, setTags] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [showErrors, setShowErrors] = useState(false);

  const hasDeadlineError = showErrors && !deadline.trim();
  const hasTagsError = showErrors && !tags.trim();
  const maxDescLength = 500;

  const handleSubmit = () => {
    const invalid = !deadline.trim() || !tags.trim();
    setShowErrors(invalid);
    if (invalid) return;

    Alert.alert('Serviço publicado!', 'Sua vaga foi publicada e já está visível para desenvolvedores.', [
      {
        text: 'OK',
        onPress: () => {
          setShowErrors(false);
          setTitle('');
          setDescription('');
          setDeadline('');
          setBudget('');
          setTags('');
          setSelectedLevel('');
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Publicar novo serviço</Text>
      <Text style={styles.subtitle}>Preencha os dados para receber candidatos qualificados com mais rapidez.</Text>

      {/* Section: Main Info */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="document-text-outline" size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Informações principais</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>TÍTULO DA VAGA</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Ex: Refatorar módulo de autenticação"
            placeholderTextColor={colors.muted}
          />
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>DESCRIÇÃO DO ESCOPO</Text>
            <Text style={[styles.counter, description.length > maxDescLength && styles.counterError]}>
              {description.length}/{maxDescLength}
            </Text>
          </View>
          <TextInput
            value={description}
            onChangeText={(text) => text.length <= maxDescLength && setDescription(text)}
            style={[styles.input, styles.multi]}
            multiline
            placeholder="Descreva em detalhes o que precisa ser feito, requisitos técnicos, e entregáveis esperados..."
            placeholderTextColor={colors.muted}
          />
        </View>
      </View>

      {/* Section: Level */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bar-chart-outline" size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Nível desejado</Text>
        </View>
        <View style={styles.levelRow}>
          {levels.map((level) => (
            <Pressable
              key={level}
              onPress={() => setSelectedLevel(level)}
              style={[styles.levelChip, selectedLevel === level && styles.levelChipActive]}
            >
              <Text style={[styles.levelText, selectedLevel === level && styles.levelTextActive]}>{level}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Section: Planning */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="calendar-outline" size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Planejamento e orçamento</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>PRAZO DE ENTREGA *</Text>
          <TextInput
            value={deadline}
            onChangeText={setDeadline}
            style={[styles.input, hasDeadlineError && styles.inputError]}
            placeholder="Ex: 30/04/2026 ou 3 semanas"
            placeholderTextColor={colors.muted}
          />
          {hasDeadlineError && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color={colors.danger} />
              <Text style={styles.errorText}>Preencha o prazo para publicar o serviço.</Text>
            </View>
          )}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>VALOR / ORÇAMENTO</Text>
          <TextInput
            value={budget}
            onChangeText={setBudget}
            style={styles.input}
            placeholder="Ex: R$ 8.000"
            placeholderTextColor={colors.muted}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Section: Skills */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="pricetag-outline" size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Habilidades requeridas</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>TAGS *</Text>
          <TextInput
            value={tags}
            onChangeText={setTags}
            style={[styles.input, hasTagsError && styles.inputError]}
            placeholder="Ex: Node.js, AWS, PostgreSQL"
            placeholderTextColor={colors.muted}
          />
          {hasTagsError && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color={colors.danger} />
              <Text style={styles.errorText}>Informe ao menos uma tag obrigatória.</Text>
            </View>
          )}
          <Text style={styles.hint}>Separe as tags por vírgula.</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Ionicons name="rocket-outline" size={18} color="#0b1120" />
        <Text style={styles.buttonText}>Publicar serviço</Text>
      </Pressable>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 14 },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: -4, lineHeight: 20, fontSize: 14 },
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1e3a5f'
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  inputGroup: { gap: 6 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: colors.muted, fontSize: 11, fontWeight: '600', letterSpacing: 0.5 },
  counter: { color: colors.muted, fontSize: 11 },
  counterError: { color: colors.danger },
  hint: { color: colors.muted, fontSize: 11, fontStyle: 'italic' },
  input: {
    backgroundColor: '#111c30',
    color: colors.text,
    borderRadius: 10,
    padding: 13,
    borderWidth: 1,
    borderColor: 'transparent',
    fontSize: 14
  },
  inputError: { borderColor: colors.danger },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: -2 },
  errorText: { color: colors.danger, fontSize: 12 },
  multi: { minHeight: 120, textAlignVertical: 'top' },
  levelRow: { flexDirection: 'row', gap: 8 },
  levelChip: {
    flex: 1,
    backgroundColor: '#111c30',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  levelChipActive: { backgroundColor: '#0c2d4a', borderColor: colors.primary },
  levelText: { color: colors.muted, fontWeight: '600' },
  levelTextActive: { color: colors.primary },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  buttonText: { color: '#0b1120', fontWeight: '700', fontSize: 16 }
});
