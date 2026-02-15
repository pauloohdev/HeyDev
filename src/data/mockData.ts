import type { Candidate, CompanyService, Service, UserType } from '../types/navigation';

export const services: Service[] = [
  {
    id: 'svc-1',
    title: 'Refatorar módulo de autenticação com JWT',
    description: 'Atualizar o fluxo de autenticação, refresh token e monitoramento de sessões.',
    company: 'Tech Solutions',
    value: 'R$ 3.500',
    deadline: '5 dias',
    stack: ['Node.js', 'JWT', 'TypeScript', 'Freelance'],
    level: 'Pleno'
  },
  {
    id: 'svc-2',
    title: 'Criar dashboard de métricas para RH',
    description: 'Painel mobile com gráficos de contratação e funil de entrevistas.',
    company: 'Talent Hub',
    value: 'R$ 4.200',
    deadline: '8 dias',
    stack: ['React Native', 'Mobile', 'API REST', 'UI/UX'],
    level: 'Sênior'
  },
  {
    id: 'svc-3',
    title: 'Implementar checkout com PIX e cartão',
    description: 'Integração completa com gateway e tratamento de eventos de pagamento.',
    company: 'Blue Commerce',
    value: 'R$ 2.900',
    deadline: '6 dias',
    stack: ['Python', 'Payments', 'Testing', 'Freelance'],
    level: 'Júnior'
  }
];

export const applications = [
  { id: 'app-1', serviceId: 'svc-1', status: 'Em análise', updatedAt: 'Hoje, 10:20' },
  { id: 'app-2', serviceId: 'svc-2', status: 'Entrevista marcada', updatedAt: 'Ontem, 15:00' }
];

export const initialCompanyServices: CompanyService[] = [
  { id: 'svc-11', title: 'Migrar app para Expo', proposals: 12, status: 'open', notes: 'Backlog inicial aprovado.' },
  {
    id: 'svc-12',
    title: 'Design System mobile',
    proposals: 8,
    status: 'development',
    hiredCandidateId: 'cand-2',
    conversationId: 'conv-cand-2-svc-12',
    conversationTitle: 'Design System mobile • Carlos Lima',
    notes: 'Executar handoff no Figma e documentar tokens.'
  },
  {
    id: 'svc-13',
    title: 'Landing page institucional com animações',
    proposals: 6,
    status: 'completed',
    hiredCandidateId: 'cand-1',
    conversationId: 'conv-cand-1-svc-13',
    conversationTitle: 'Landing Page • Ana Souza',
    notes: 'Projeto entregue e aprovado.'
  }
];

export const developerActiveServices = [
  { id: 'svc-1', title: 'Refatorar módulo de autenticação com JWT', company: 'Tech Solutions', conversationId: 'conv-1', conversationTitle: 'Tech Solutions' },
  { id: 'svc-2', title: 'Criar dashboard de métricas para RH', company: 'Talent Hub', conversationId: 'conv-2', conversationTitle: 'Talent Hub' }
];

export const developerCompletedServices = [
  { id: 'svc-3', title: 'Implementar checkout com PIX e cartão', company: 'Blue Commerce', earned: 2900 },
  { id: 'svc-21', title: 'Otimização de performance React Native', company: 'Motion Apps', earned: 3600 }
];

export const candidates: Candidate[] = [
  { id: 'cand-1', name: 'Ana Souza', level: 'Sênior', score: '98%' },
  { id: 'cand-2', name: 'Carlos Lima', level: 'Pleno', score: '91%' },
  { id: 'cand-3', name: 'Marina Alves', level: 'Júnior', score: '87%' }
];

export const conversations = [
  { id: 'conv-1', title: 'Tech Solutions', lastMessage: 'Podemos alinhar o escopo?', unread: 2 },
  { id: 'conv-2', title: 'Talent Hub', lastMessage: 'A entrevista foi confirmada.', unread: 0 }
];

export const notificationsByUser: Record<UserType, { id: string; title: string; time: string }[]> = {
  developer: [
    { id: 'n-1', title: 'Sua candidatura foi visualizada', time: 'há 20 min' },
    { id: 'n-2', title: 'Nova mensagem de Tech Solutions', time: 'há 1h' }
  ],
  company: [
    { id: 'n-3', title: '3 novos candidatos para Migrar app para Expo', time: 'há 10 min' },
    { id: 'n-4', title: 'Serviço "Design System mobile" quase no prazo', time: 'há 2h' }
  ]
};

export const profileByUser: Record<UserType, { avatar: string; fullName: string; level: string; specializations: string[] }> = {
  developer: {
    avatar: 'LC',
    fullName: 'Lucas Carvalho',
    level: 'Sênior • 4.9 ★',
    specializations: ['React', 'Node.js', 'UI/UX', 'TypeScript']
  },
  company: {
    avatar: 'TH',
    fullName: 'Talent Hub LTDA',
    level: 'Parceiro Gold • 92 projetos',
    specializations: ['Produto Digital', 'Mobile', 'Recrutamento Tech']
  }
};
