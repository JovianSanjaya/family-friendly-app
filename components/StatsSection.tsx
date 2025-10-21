import { Stats } from '@/types';

interface StatsSectionProps {
  stats: Stats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-gradient-to-r from-pink-500 to-purple-500 pb-3 inline-block">
        Your Impact
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300 shadow-md">
          <div className="text-4xl font-bold text-pink-600 mb-2">
            {stats.totalActs}
          </div>
          <div className="text-sm font-medium text-gray-600">Total Acts</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300 shadow-md">
          <div className="text-4xl font-bold text-orange-600 mb-2 flex items-center justify-center gap-1">
            {stats.currentStreak}
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-sm font-medium text-gray-600">Current Streak</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300 shadow-md">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {stats.longestStreak}
          </div>
          <div className="text-sm font-medium text-gray-600">Longest Streak</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300 shadow-md">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {stats.level}
          </div>
          <div className="text-sm font-medium text-gray-600">Level</div>
        </div>
      </div>
    </section>
  );
}
