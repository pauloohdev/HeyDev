import { SPACING, RADIUS } from '../theme/spacing';
import { colors } from '../theme/colors';

export function createCardStyle() {
  return {
    backgroundColor: colors.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: colors.border
  };
}

export function createBadgeStyle(backgroundColor: string, textColor: string) {
  return {
    backgroundColor,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md
  };
}

export function createDividerStyle() {
  return {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: SPACING.md
  };
}

export const SPACING_CONST = SPACING;
export const RADIUS_CONST = RADIUS;
