export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999
} as const;

export const SIZES = {
  avatar: {
    xs: 28,
    sm: 40,
    md: 46,
    lg: 68,
    xl: 80
  },
  icon: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24
  }
} as const;

export const SHADOWS = {
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1
  },
  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3
  }
} as const;

export const FONT_SIZES = {
  xs: 11,
  sm: 12,
  md: 13,
  lg: 14,
  xl: 15,
  '2xl': 16,
  '3xl': 18,
  '4xl': 22
} as const;

export const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800'
} as const;
