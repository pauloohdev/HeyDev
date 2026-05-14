import { StyleSheet, TextInput as RNTextInput, View, Text } from 'react-native';
import { colors } from '../theme/colors';
import { SPACING, RADIUS, FONT_SIZES } from '../theme/spacing';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
}

export function TextInput({
  value,
  onChangeText,
  placeholder,
  error,
  disabled = false,
  multiline = false
}: TextInputProps) {
  return (
    <View>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        editable={!disabled}
        multiline={multiline}
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          multiline && styles.inputMultiline
        ]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#111c30',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md
  },
  inputError: {
    borderColor: colors.danger
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: colors.disabledBg
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: SPACING.md,
    textAlignVertical: 'top'
  },
  errorText: {
    color: colors.danger,
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs
  }
});
