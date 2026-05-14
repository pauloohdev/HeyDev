import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { profileByUser } from '../data/mockData';
import { colors } from '../theme/colors';
import type { RootStackParamList, UserType } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'> & {
  userType: UserType;
};

const levels = ['Júnior', 'Pleno', 'Sênior'] as const;

export function EditProfileScreen({ navigation, userType }: Props) {
  const profile = profileByUser[userType];

  const [fullName, setFullName] = useState(profile.fullName);
  const [selectedLevel, setSelectedLevel] = useState(
    userType === 'developer' ? profile.level.split(' •')[0] : ''
  );
  const [bio, setBio] = useState(
    userType === 'developer'
      ? 'Desenvolvedor apaixonado por criar soluções elegantes e performáticas.'
      : 'Empresa focada em inovação digital e desenvolvimento de produtos mobile.'
  );
  const [specializations, setSpecializations] = useState<string[]>([...profile.specializations]);
  const [newTag, setNewTag] = useState('');
  const [website, setWebsite] = useState(userType === 'company' ? 'https://talenthub.com.br' : '');

  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !specializations.includes(tag)) {
      setSpecializations([...specializations, tag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setSpecializations(specializations.filter((t) => t !== tag));
  };

  const handleSave = () => {
    Alert.alert('Perfil atualizado', 'Suas alterações foram salvas com sucesso.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.avatar}</Text>
          </View>
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={14} color="#fff" />
          </View>
        </View>
        <Pressable style={styles.changePhotoBtn}>
          <Text style={styles.changePhotoText}>
            {userType === 'developer' ? 'Alterar foto' : 'Alterar logo'}
          </Text>
        </Pressable>
      </View>

      {/* Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {userType === 'developer' ? 'Informações pessoais' : 'Informações da empresa'}
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {userType === 'developer' ? 'Nome completo' : 'Razão social'}
          </Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholderTextColor={colors.muted}
          />
        </View>

        {userType === 'developer' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nível de experiência</Text>
            <View style={styles.levelRow}>
              {levels.map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setSelectedLevel(level)}
                  style={[styles.levelChip, selectedLevel === level && styles.levelChipActive]}
                >
                  <Text style={[styles.levelText, selectedLevel === level && styles.levelTextActive]}>
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {userType === 'company' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website</Text>
            <TextInput
              value={website}
              onChangeText={setWebsite}
              style={styles.input}
              placeholder="https://seusite.com.br"
              placeholderTextColor={colors.muted}
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {userType === 'developer' ? 'Sobre mim' : 'Sobre a empresa'}
          </Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            style={[styles.input, styles.multiInput]}
            multiline
            placeholderTextColor={colors.muted}
          />
        </View>
      </View>

      {/* Specializations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {userType === 'developer' ? 'Especializações' : 'Áreas de atuação'}
        </Text>

        <View style={styles.tagsWrap}>
          {specializations.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagText}>{tag}</Text>
              <Pressable onPress={() => removeTag(tag)} hitSlop={8}>
                <Ionicons name="close-circle" size={16} color={colors.muted} />
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.addTagRow}>
          <TextInput
            value={newTag}
            onChangeText={setNewTag}
            style={[styles.input, { flex: 1 }]}
            placeholder="Adicionar tag..."
            placeholderTextColor={colors.muted}
            onSubmitEditing={addTag}
            returnKeyType="done"
          />
          <Pressable style={styles.addTagBtn} onPress={addTag}>
            <Ionicons name="add" size={22} color="#0b1120" />
          </Pressable>
        </View>
      </View>

      {/* Save Button */}
      <Pressable style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Salvar alterações</Text>
      </Pressable>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 20 },
  avatarSection: { alignItems: 'center', gap: 10, paddingVertical: 8 },
  avatarRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: { color: '#0b1120', fontSize: 26, fontWeight: '800' },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.accent,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.bg
  },
  changePhotoBtn: { paddingVertical: 4 },
  changePhotoText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border
  },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  inputGroup: { gap: 6 },
  label: { color: colors.muted, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#111c30',
    color: colors.text,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    fontSize: 15
  },
  multiInput: { minHeight: 100, textAlignVertical: 'top' },
  levelRow: { flexDirection: 'row', gap: 8 },
  levelChip: {
    flex: 1,
    backgroundColor: '#111c30',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  levelChipActive: { backgroundColor: '#0c2d4a', borderColor: colors.primary },
  levelText: { color: colors.muted, fontWeight: '600' },
  levelTextActive: { color: colors.primary },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#11203a',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  tagText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  addTagRow: { flexDirection: 'row', gap: 8 },
  addTagBtn: {
    backgroundColor: colors.primary,
    width: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16
  },
  saveBtnText: { color: '#0b1120', textAlign: 'center', fontWeight: '700', fontSize: 16 }
});
