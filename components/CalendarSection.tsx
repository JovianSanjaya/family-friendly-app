'use client';

import { useState } from 'react';
import { KindnessAct } from '@/types';

interface CalendarSectionProps {
  acts: KindnessAct[];
}

export default function CalendarSection({ acts }: CalendarSectionProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const hasKindnessAct = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const checkDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Don't mark future dates
    if (checkDate > today) {
      return false;
    }
    
    const dateString = new Date(year, month, day).toISOString().split('T')[0];
    return acts.some(act => act.date === dateString);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }
  // Actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const hasKindness = hasKindnessAct(day);
    const today = isToday(day);

    days.push(
      <div
        key={day}
        className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 ${
          hasKindness
            ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md scale-105'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } ${today ? 'ring-2 ring-pink-500 ring-offset-2' : ''}`}
      >
        {day}
        {hasKindness && <span className="ml-1">✓</span>}
      </div>
    );
  }

  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Racism Calendar</h2>
      
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-lg font-medium text-pink-700 transition-colors duration-300"
        >
          ◀ Prev
        </button>
        <span className="text-xl font-semibold text-gray-700">{monthName}</span>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-lg font-medium text-pink-700 transition-colors duration-300"
        >
          Next ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
            {day}
          </div>
        ))}
        {days}
      </div>
    </section>
  );
}
