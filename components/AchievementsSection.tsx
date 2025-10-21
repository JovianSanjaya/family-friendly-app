import { Achievement } from '@/types';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        Achievements <span className="text-2xl">🏆</span>
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg animate-bounce-once'
                : 'bg-gray-100 opacity-50 grayscale'
            }`}
          >
            <div className="text-4xl mb-2">{achievement.icon}</div>
            <div className={`text-sm font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`}>
              {achievement.name}
            </div>
            <div className={`text-xs mt-1 ${achievement.unlocked ? 'text-yellow-50' : 'text-gray-500'}`}>
              {achievement.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
