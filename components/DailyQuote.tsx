interface DailyQuoteProps {
  quote: string;
}

export default function DailyQuote({ quote }: DailyQuoteProps) {
  if (!quote) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400 animate-fade-in">
      <p className="text-gray-700 italic text-lg leading-relaxed">
        <span className="text-4xl text-pink-500 mr-2">&ldquo;</span>
        {quote}
      </p>
    </div>
  );
}
