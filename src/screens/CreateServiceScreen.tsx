import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';
import type { MainTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'CreateService'>;

export function CreateServiceScreen(_: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [tags, setTags] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const hasDeadlineError = showErrors && !deadline.trim();
  const hasTagsError = showErrors && !tags.trim();

  const handleSubmit = () => {
    const invalid = !deadline.trim() || !tags.trim();
    setShowErrors(invalid);
    if (invalid) {
      return;
    }

    setShowErrors(false);
    setTitle('');
    setDescription('');
    setDeadline('');
    setBudget('');
    setTags('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Publicar novo serviço</Text>
      <Text style={styles.subtitle}>Preencha os dados para receber candidatos qualificados com mais rapidez.</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações principais</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder="Título da vaga/serviço" placeholderTextColor={colors.muted} />
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.multi]}
          multiline
          placeholder="Descrição detalhada do escopo"
          placeholderTextColor={colors.muted}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Planejamento e orçamento</Text>
        <Text style={styles.label}>Prazo de entrega *</Text>
        <TextInput
          value={deadline}
          onChangeText={setDeadline}
          style={[styles.input, hasDeadlineError && styles.inputError]}
          placeholder="Ex: 30/04/2026 ou 3 semanas"
          placeholderTextColor={colors.muted}
        />
        {hasDeadlineError && <Text style={styles.errorText}>Preencha o prazo para publicar o serviço.</Text>}

        <Text style={styles.label}>Valor / orçamento *</Text>
        <TextInput value={budget} onChangeText={setBudget} style={styles.input} placeholder="Ex: R$ 8.000" placeholderTextColor={colors.muted} keyboardType="numeric" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <Text style={styles.label}>Tags *</Text>
        <TextInput
          value={tags}
          onChangeText={setTags}
          style={[styles.input, hasTagsError && styles.inputError]}
          placeholder="Ex: Node.js, AWS, PostgreSQL"
          placeholderTextColor={colors.muted}
        />
        {hasTagsError && <Text style={styles.errorText}>Informe ao menos uma tag obrigatória.</Text>}
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar serviço</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 14 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  subtitle: { color: colors.muted, marginTop: -4, lineHeight: 20 },
  section: { backgroundColor: colors.card, borderRadius: 14, padding: 14, gap: 10, borderWidth: 1, borderColor: '#16243c' },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 2 },
  label: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  input: { backgroundColor: '#111c30', color: colors.text, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'transparent' },
  inputError: { borderColor: '#ff6b6b' },
  errorText: { color: '#ff6b6b', fontSize: 12, marginTop: -4 },
  multi: { minHeight: 120, textAlignVertical: 'top' },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, marginBottom: 16 },
  buttonText: { color: '#0b1120', textAlign: 'center', fontWeight: '700' }
});
