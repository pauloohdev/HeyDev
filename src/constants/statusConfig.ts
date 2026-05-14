import type { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export const STATUS_LABELS: Record<string, string> = {
  'Em análise': 'Em análise',
  'Entrevista marcada': 'Entrevista marcada',
  'Aprovado': 'Aprovado',
  'Recusado': 'Recusado',
  'Desenvolvimento': 'Desenvolvimento',
  'Review': 'Review',
  'Concluído': 'Concluído',
  'Aberto': 'Aberto'
};

export const STATUS_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Em análise': 'hourglass-outline',
  'Entrevista marcada': 'calendar-outline',
  'Aprovado': 'checkmark-circle-outline',
  'Recusado': 'close-circle-outline',
  'Desenvolvimento': 'code-slash-outline',
  'Review': 'eye-outline',
  'Concluído': 'checkmark-done-outline',
  'Aberto': 'open-outline'
};

export const STATUS_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  'Em análise': colors.status.analyzing,
  'Entrevista marcada': colors.status.interview,
  'Aprovado': colors.status.approved,
  'Recusado': colors.status.rejected,
  'Desenvolvimento': colors.status.development,
  'Review': colors.status.review,
  'Concluído': colors.status.completed,
  'Aberto': colors.status.analyzing
};

export const STATUS_CONFIG = {
  labels: STATUS_LABELS,
  icons: STATUS_ICONS,
  colors: STATUS_COLORS
};

export function getStatusStyle(status: string) {
  return STATUS_COLORS[status] ?? STATUS_COLORS['Em análise'];
}

export function getStatusIcon(status: string) {
  return STATUS_ICONS[status] ?? 'help-circle-outline';
}

export function getStatusLabel(status: string) {
  return STATUS_LABELS[status] ?? status;
}
