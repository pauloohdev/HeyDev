import { colors } from '../theme/colors';

export const LEVEL_TIERS = ['Júnior', 'Pleno', 'Sênior'] as const;

export type LevelTier = typeof LEVEL_TIERS[number];

export const LEVEL_COLORS: Record<LevelTier, { bg: string; text: string }> = {
  'Júnior': colors.levels.junior,
  'Pleno': colors.levels.pleno,
  'Sênior': colors.levels.senior
};

export function getLevelColors(level: string) {
  return LEVEL_COLORS[level as LevelTier] ?? LEVEL_COLORS['Pleno'];
}

export const LEVEL_DESCRIPTIONS: Record<LevelTier, string> = {
  'Júnior': 'Iniciante, com menos experiência',
  'Pleno': 'Intermediário, com experiência sólida',
  'Sênior': 'Experiente, especialista na área'
};
