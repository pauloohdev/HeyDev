import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { SPACING, RADIUS } from '../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
}

interface CardSectionProps {
  children: React.ReactNode;
  withDivider?: boolean;
}

export function Card({ children, onPress }: CardProps) {
  return (
    <View
      onTouchEnd={onPress}
      style={styles.card}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children }: CardHeaderProps) {
  return <View style={styles.header}>{children}</View>;
}

export function CardSection({ children, withDivider = false }: CardSectionProps) {
  return (
    <>
      {withDivider && <View style={styles.divider} />}
      <View style={styles.section}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.lg
  },
  divider: {
    height: 1,
    backgroundColor: colors.border
  },
  section: {
    gap: SPACING.md
  }
});
