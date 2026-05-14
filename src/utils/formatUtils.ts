export function formatValue(value: string): string {
  if (!value) return 'R$ 0';
  const numValue = parseFloat(value.replace(/[^\d.-]/g, ''));
  if (isNaN(numValue)) return value;
  return `R$ ${numValue.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatDeadline(deadline: string): string {
  if (!deadline) return 'Sem prazo';

  const lower = deadline.toLowerCase();
  if (lower.includes('dia')) {
    return deadline;
  }
  if (lower.includes('semana')) {
    return deadline;
  }
  if (lower.includes('mês')) {
    return deadline;
  }

  return deadline;
}

export function formatTime(timestamp: string): string {
  if (!timestamp) return 'agora';

  const lower = timestamp.toLowerCase();
  if (lower.includes('hora')) return timestamp;
  if (lower.includes('minuto')) return timestamp;
  if (lower.includes('dia')) return timestamp;

  return timestamp;
}

export function formatDate(date: string): string {
  if (!date) return '';
  try {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  } catch {
    return date;
  }
}
