import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { SIZES } from '../theme/spacing';

type AvatarSize = keyof typeof SIZES.avatar;

interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  backgroundColor?: string;
}

export function Avatar({ initials, size = 'md', backgroundColor = colors.buttonBg }: AvatarProps) {
  const sizeValue = SIZES.avatar[size];
  const isSquare = size === 'sm';

  return (
    <View
      style={[
        styles.avatar,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: isSquare ? 10 : sizeValue / 2,
          backgroundColor
        }
      ]}
    >
      <Text style={[styles.text, { fontSize: sizeValue / 2.2 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.primary,
    fontWeight: '800'
  }
});
