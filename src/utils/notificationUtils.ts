import type { Ionicons } from '@expo/vector-icons';

export function getNotificationIcon(text: string): { icon: keyof typeof Ionicons.glyphMap; color: string } {
  const lower = text.toLowerCase();

  if (lower.includes('candidat') || lower.includes('aplicou')) {
    return { icon: 'person-add-outline', color: '#38bdf8' };
  }
  if (lower.includes('aprova') || lower.includes('sucesso')) {
    return { icon: 'checkmark-circle-outline', color: '#4ade80' };
  }
  if (lower.includes('nega') || lower.includes('recusa')) {
    return { icon: 'close-circle-outline', color: '#f87171' };
  }
  if (lower.includes('atualiza') || lower.includes('progresso')) {
    return { icon: 'refresh-outline', color: '#818cf8' };
  }
  if (lower.includes('mensagem') || lower.includes('chat')) {
    return { icon: 'chatbubble-outline', color: '#38bdf8' };
  }

  return { icon: 'notifications-outline', color: '#94a3b8' };
}
