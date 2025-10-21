import { KindnessAct, Stats, KindnessCategory } from '@/types';

export function calculateStats(acts: KindnessAct[]): Stats {
  const totalActs = acts.length;
  const currentStreak = calculateCurrentStreak(acts);
  const longestStreak = calculateLongestStreak(acts);
  const level = calculateLevel(totalActs);
  const categoryBreakdown = calculateCategoryBreakdown(acts);

  return {
    totalActs,
    currentStreak,
    longestStreak,
    level,
    categoryBreakdown,
  };
}

function calculateCurrentStreak(acts: KindnessAct[]): number {
  if (acts.length === 0) return 0;

  const sortedActs = [...acts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const act of sortedActs) {
    const actDate = new Date(act.date);
    actDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate.getTime() - actDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === streak) {
      streak++;
      currentDate = actDate;
    } else if (daysDiff > streak) {
      break;
    }
  }

  return streak;
}

function calculateLongestStreak(acts: KindnessAct[]): number {
  if (acts.length === 0) return 0;

  const sortedActs = [...acts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const uniqueDates = [...new Set(sortedActs.map(act => act.date))].sort();
  
  let longestStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    
    const daysDiff = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return Math.max(longestStreak, 1);
}

function calculateLevel(totalActs: number): number {
  return Math.floor(totalActs / 10) + 1;
}

function calculateCategoryBreakdown(acts: KindnessAct[]): Record<KindnessCategory, number> {
  const breakdown: Record<KindnessCategory, number> = {
    helping: 0,
    compliments: 0,
    donations: 0,
    volunteering: 0,
    environmental: 0,
    random: 0,
  };

  acts.forEach(act => {
    breakdown[act.category]++;
  });

  return breakdown;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function hasCheckedInToday(lastCheckIn?: string): boolean {
  if (!lastCheckIn) return false;
  return lastCheckIn === getTodayDateString();
}
