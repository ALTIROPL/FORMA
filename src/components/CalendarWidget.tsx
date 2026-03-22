import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarWidgetProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
}

export function CalendarWidget({ selectedDate, onSelectDate }: CalendarWidgetProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    // Validate date
    if (isNaN(d.getTime())) return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  // Adjust for Monday as first day of week (0 = Sunday, 1 = Monday, etc.)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  const dayNames = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

  const days = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
  }

  // Get today's date string in local timezone
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
    // Format to YYYY-MM-DD locally
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const isSelected = dateString === selectedDate;
    const isToday = dateString === todayString;

    days.push(
      <button
        key={i}
        type="button"
        onClick={() => onSelectDate(dateString)}
        className={`h-8 w-full rounded-lg flex items-center justify-center text-sm transition-colors ${
          isSelected
            ? 'bg-emerald-500 text-zinc-950 font-bold'
            : isToday
            ? 'bg-zinc-800 text-emerald-500 font-bold border border-emerald-500/30'
            : 'text-zinc-300 hover:bg-zinc-800'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-xl p-3 select-none">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={handlePrevMonth} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-bold text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button type="button" onClick={handleNextMonth} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-zinc-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
}
