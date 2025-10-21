'use client';

import { useState, useEffect } from 'react';
import { KindnessAct, Achievement, AppState, Stats } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { calculateStats, getTodayDateString, hasCheckedInToday } from '@/lib/utils';
import { INITIAL_ACHIEVEMENTS, KINDNESS_QUOTES } from '@/lib/constants';

import Header from './Header';
import DailyQuote from './DailyQuote';
import DailyCheckIn from './DailyCheckIn';
import StatsSection from './StatsSection';
import AchievementsSection from './AchievementsSection';
import CalendarSection from './CalendarSection';
import ChartsSection from './ChartsSection';
import HistorySection from './HistorySection';

interface KindnessTrackerProps {
  onBack?: () => void;
}

const INITIAL_STATE: AppState = {
  acts: [],
  achievements: INITIAL_ACHIEVEMENTS,
  stats: {
    totalActs: 0,
    currentStreak: 0,
    longestStreak: 0,
    level: 1,
    categoryBreakdown: {
      helping: 0,
      compliments: 0,
      donations: 0,
      volunteering: 0,
      environmental: 0,
      random: 0,
    },
  },
  lastCheckIn: undefined,
};

export default function KindnessTracker({ onBack }: KindnessTrackerProps = {}) {
  const [appState, setAppState, isLoading] = useLocalStorage<AppState>('kindness-tracker-state', INITIAL_STATE);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Set random daily quote
    const randomQuote = KINDNESS_QUOTES[Math.floor(Math.random() * KINDNESS_QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  const handleAddKindnessAct = (act: Omit<KindnessAct, 'id' | 'timestamp'>) => {
    const newAct: KindnessAct = {
      ...act,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const updatedActs = [...appState.acts, newAct];
    const newStats = calculateStats(updatedActs);
    const updatedAchievements = checkAndUnlockAchievements(updatedActs, appState.achievements, newStats);

    setAppState({
      ...appState,
      acts: updatedActs,
      stats: newStats,
      achievements: updatedAchievements,
      lastCheckIn: getTodayDateString(),
    });
  };

  const checkAndUnlockAchievements = (
    acts: KindnessAct[],
    currentAchievements: Achievement[],
    stats: Stats
  ): Achievement[] => {
    return currentAchievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;

      switch (achievement.id) {
        case 'first-act':
          shouldUnlock = acts.length >= 1;
          break;
        case 'week-streak':
          shouldUnlock = stats.currentStreak >= 7;
          break;
        case 'month-streak':
          shouldUnlock = stats.currentStreak >= 30;
          break;
        case '10-acts':
          shouldUnlock = acts.length >= 10;
          break;
        case '50-acts':
          shouldUnlock = acts.length >= 50;
          break;
        case '100-acts':
          shouldUnlock = acts.length >= 100;
          break;
        case 'all-categories':
          shouldUnlock = Object.values(stats.categoryBreakdown).every(count => (count as number) > 0);
          break;
        case 'category-master':
          shouldUnlock = Object.values(stats.categoryBreakdown).some(count => (count as number) >= 10);
          break;
      }

      if (shouldUnlock) {
        return { ...achievement, unlocked: true, unlockedAt: Date.now() };
      }

      return achievement;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-2xl font-semibold text-pink-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  const checkedInToday = hasCheckedInToday(appState.lastCheckIn);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            ← Back to Home
          </button>
        )}
        
        <Header />
        
        <div className="space-y-6">
          <DailyQuote quote={quote} />
          
          <DailyCheckIn
            onSubmit={handleAddKindnessAct}
            checkedInToday={checkedInToday}
          />
          
          <StatsSection stats={appState.stats} />
          
          <AchievementsSection achievements={appState.achievements} />
          
          <CalendarSection acts={appState.acts} />
          
          {appState.acts.length > 0 && (
            <>
              <ChartsSection acts={appState.acts} stats={appState.stats} />
              <HistorySection acts={appState.acts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
