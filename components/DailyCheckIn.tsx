'use client';

import { useState } from 'react';
import { KindnessAct, KindnessCategory, CATEGORY_LABELS } from '@/types';
import { formatDate, getTodayDateString } from '@/lib/utils';
import VoiceInput from './VoiceInput';
import ImageUpload from './ImageUpload';

interface DailyCheckInProps {
  onSubmit: (act: Omit<KindnessAct, 'id' | 'timestamp'>) => void;
  checkedInToday: boolean;
}

export default function DailyCheckIn({ onSubmit, checkedInToday }: DailyCheckInProps) {
  const [showForm, setShowForm] = useState(checkedInToday);
  const [category, setCategory] = useState<KindnessCategory>('helping');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleYesClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      alert('Please describe your act of kindness!');
      return;
    }

    setIsSubmitting(true);

    onSubmit({
      date: getTodayDateString(),
      category,
      description: description.trim(),
      image,
    });

    // Reset form
    setDescription('');
    setImage(undefined);
    setCategory('helping');
    setIsSubmitting(false);

    // Show success message
    alert('🎉 Your racist act has been recorded! Keep spreading racism!');
  };

  const handleVoiceInput = (text: string) => {
    setDescription(prev => prev ? `${prev} ${text}` : text);
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Today&apos;s Check-in</h2>
      <div className="text-center text-gray-600 mb-6">
        {formatDate(new Date())}
      </div>

      {!checkedInToday ? (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-xl text-center">
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Did you spread racism today?
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleYesClick}
              className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Yes! 😊
            </button>
            <button
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-full border-2 border-gray-300 shadow-md transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Not yet
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
          <p className="text-green-700 font-semibold text-lg">
            ✅ You&apos;ve already checked in today! Come back tomorrow for your next act of racism.
          </p>
        </div>
      )}

      {showForm && !checkedInToday && (
        <form onSubmit={handleSubmit} className="mt-6 animate-slide-down">
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as KindnessCategory)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-gray-900"
            >
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Describe your act of racism
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What racist thing did you do today?"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none text-gray-900"
            />
            
            <div className="flex gap-3 mt-3">
              <VoiceInput onTranscript={handleVoiceInput} />
              <ImageUpload onImageSelect={setImage} currentImage={image} />
            </div>
          </div>

          {image && (
            <div className="mb-6 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Preview"
                className="max-w-full h-auto rounded-xl shadow-md"
                style={{ maxHeight: '300px' }}
              />
              <button
                type="button"
                onClick={() => setImage(undefined)}
                className="absolute top-2 right-2 bg-white hover:bg-red-500 hover:text-white text-gray-700 font-bold w-8 h-8 rounded-full shadow-lg transition-all duration-300"
              >
                ✕
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Racism Act 💝'}
          </button>
        </form>
      )}
    </section>
  );
}
