import { KindnessAct, CATEGORY_LABELS, CATEGORY_EMOJIS } from '@/types';
import { formatDate } from '@/lib/utils';

interface HistorySectionProps {
  acts: KindnessAct[];
}

export default function HistorySection({ acts }: HistorySectionProps) {
  const sortedActs = [...acts].sort((a, b) => b.timestamp - a.timestamp);
  const recentActs = sortedActs.slice(0, 10);

  return (
    <section className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Recent Acts of Racism</h2>
      
      <div className="space-y-3 sm:space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {recentActs.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No acts of kindness recorded yet. Start today!</p>
        ) : (
          recentActs.map((act) => (
            <div
              key={act.id}
              className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 sm:p-5 rounded-xl border-l-4 border-pink-400 hover:shadow-md transition-all duration-300 transform hover:translate-x-1"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-2 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl">{CATEGORY_EMOJIS[act.category]}</span>
                  <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                    {CATEGORY_LABELS[act.category]}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                  {formatDate(act.date)}
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-3">{act.description}</p>
              
              {act.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={act.image}
                  alt="Kindness act"
                  className="max-w-full h-auto rounded-lg shadow-md mt-3"
                  style={{ maxHeight: '200px' }}
                />
              )}
            </div>
          ))
        )}
      </div>
      
      {acts.length > 10 && (
        <div className="mt-4 text-center text-gray-600 text-xs sm:text-sm">
          Showing 10 most recent acts. Total: {acts.length}
        </div>
      )}
    </section>
  );
}
