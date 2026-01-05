import { Id } from '@/component/icon/types';

export type Roles = 'client' | 'investor' | 'contractor' | 'dao';
export type SurveyContent = {
  roles: Roles[];
  name: string;
  icon: Id;
  description: string;
};

export const survey: SurveyContent[] = [
  {
    roles: ['client'],
    name: 'Raise Funds (Project Developer)',
    icon: 'raiseFund',
    description:
      'I am a project owner or developer seeking capital for a renewable energy infrastructure or NetZero project.',
  },
  {
    roles: ['investor'],
    name: 'Invest in Assets (Investor)',
    icon: 'invest',
    description:
      'I want to discover, fund, and track high-impact, transparent green project.',
  },
  {
    roles: ['contractor'],
    name: 'Manage Construction (Contractor)',
    icon: 'manage',
    description:
      'I am an EPC or General Contractor to build a project and will be reporting on milestone progress.',
  },
  {
    roles: ['dao'],
    name: 'Join the DAO (Governance Member)',
    icon: 'join',
    description:
      "I want to participate in protocol governance, vote on which projects get listed, and help manage the platform's treasury.",
  },
];
