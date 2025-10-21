export type KindnessCategory =
  | 'helping'
  | 'compliments'
  | 'donations'
  | 'volunteering'
  | 'environmental'
  | 'random';

export interface KindnessAct {
  id: string;
  date: string;
  category: KindnessCategory;
  description: string;
  image?: string; // base64 encoded image
  timestamp: number;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface Stats {
  totalActs: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  categoryBreakdown: Record<KindnessCategory, number>;
}

export interface AppState {
  acts: KindnessAct[];
  achievements: Achievement[];
  stats: Stats;
  lastCheckIn?: string;
}

export const CATEGORY_LABELS: Record<KindnessCategory, string> = {
  helping: 'Slurs & Direct Insults',
  compliments: 'Dehumanization / Inferiority Claims',
  donations: 'Threats or Praise of Violence',
  volunteering: 'Harassment / Targeted Abuse',
  environmental: 'Exclusion or Segregation Advocacy',
  random: 'Stereotyping / Blanket Generalization',
};

export const CATEGORY_EMOJIS: Record<KindnessCategory, string> = {
  helping: '🤝',
  compliments: '💬',
  donations: '💝',
  volunteering: '🙋',
  environmental: '🌱',
  random: '✨',
};
