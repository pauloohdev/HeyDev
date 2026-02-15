export type UserType = 'developer' | 'company';

export type Service = {
  id: string;
  title: string;
  description: string;
  company: string;
  value: string;
  deadline: string;
  stack: string[];
  level: 'Júnior' | 'Pleno' | 'Sênior';
};

export type ServiceProgressStatus = 'open' | 'development' | 'review' | 'completed';

export type Candidate = {
  id: string;
  name: string;
  level: 'Júnior' | 'Pleno' | 'Sênior';
  score: string;
};

export type CompanyServiceStatus = ServiceProgressStatus;

export type CompanyService = {
  id: string;
  title: string;
  proposals: number;
  status: CompanyServiceStatus;
  hiredCandidateId?: string;
  conversationId?: string;
  conversationTitle?: string;
  notes?: string;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Main: undefined;
  ServiceDetails: { serviceId: string };
  ServiceRequestSuccess: { serviceId: string };
  Chat: { conversationId: string; title: string; serviceId?: string; readOnly?: boolean };
  Conversations: undefined;
  Notifications: undefined;
  Candidates: { serviceId: string };
};

export type MainTabParamList = {
  Feed: undefined;
  Applications: undefined;
  MyServices: undefined;
  CreateService: undefined;
  Profile: undefined;
};
