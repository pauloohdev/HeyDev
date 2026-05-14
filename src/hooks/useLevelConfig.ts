import { LEVEL_COLORS, getLevelColors, LEVEL_TIERS, LEVEL_DESCRIPTIONS } from '../constants/levelConfig';

export function useLevelConfig() {
  return {
    colors: LEVEL_COLORS,
    getColors: getLevelColors,
    tiers: LEVEL_TIERS,
    descriptions: LEVEL_DESCRIPTIONS
  };
}
