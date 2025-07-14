import React, { useState, useEffect } from 'react';
import { Calendar, Star, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingScreen from '@/components/LoadingScreen';
import LiveClock from '@/components/LiveClock';
import WeekdayCard from '@/components/WeekdayCard';
import AddSlotForm from '@/components/AddSlotForm';
import CalendarPage from '@/components/Calendar';
import NotesPage from '@/components/NotesPage';
import EditableText from '@/components/EditableText';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ScheduleSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  topic: string;
  completed: boolean;
}

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'calendar' | 'notes'>('home');
  const { data, updateSlots, updateCustomQuote, updateAppName } = useLocalStorage();

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const defaultQuotes = [
    "The future depends on what you do today.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Your only limit is your mind.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "The way to get started is to quit talking and begin doing.",
    "Don't watch the clock; do what it does. Keep going."
  ];

  const currentQuote = data.customQuote || defaultQuotes[new Date().getDay()];

  useEffect(() => {
    document.documentElement.className = `theme-${data.theme} ${data.darkMode ? 'dark' : ''}`;
  }, [data.theme, data.darkMode]);

  useEffect(() => {
    weekdays.forEach(day => {
      const daySlots = data.slots.filter(slot => slot.day === day);
      if (daySlots.length > 0 && daySlots.every(slot => slot.completed)) {
        triggerConfetti();
      }
    });
  }, [data.slots]);

  const triggerConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  };

  const handleAddSlot = (slotData: {
    day: string;
    startTime: string;
    endTime: string;
    topic: string;
  }) => {
    const newSlot: ScheduleSlot = {
      id: Date.now().toString(),
      ...slotData,
      completed: false
    };
    updateSlots([...data.slots, newSlot]);
  };

  const handleDeleteSlot = (id: string) => {
    updateSlots(data.slots.filter(slot => slot.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    updateSlots(
      data.slots.map(slot =>
        slot.id === id ? { ...slot, completed: !slot.completed } : slot
      )
    );
  };

  const handleEditSlot = (id: string) => {
    if (confirm('Delete this slot? You can add a new one with updated details.')) {
      handleDeleteSlot(id);
    }
  };

  if (loading) {
    return <LoadingScreen onLoadComplete={() => setLoading(false)} />;
  }

  if (currentPage === 'calendar') {
    return (
      <div className="min-h-screen bg-pink-50">
        <div className="fixed top-4 left-4 z-10">
          <Button
            onClick={() => setCurrentPage('home')}
            variant="outline"
            className="bg-white/90 backdrop-blur-soft"
          >
            ← Back to Home
          </Button>
        </div>
        <CalendarPage />
      </div>
    );
  }

  if (currentPage === 'notes') {
    return (
      <div className="min-h-screen bg-pink-50">
        <div className="fixed top-4 left-4 z-10">
          <Button
            onClick={() => setCurrentPage('home')}
            variant="outline"
            className="bg-white/90 backdrop-blur-soft"
          >
            ← Back to Home
          </Button>
        </div>
        <NotesPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-soft border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <EditableText
              text={data.appName}
              onSave={updateAppName}
              className="text-2xl font-cursive font-bold text-primary"
              inputClassName="text-2xl font-cursive font-bold text-primary bg-white/80"
              placeholder="Enter app name..."
              maxLength={50}
            />
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setCurrentPage('calendar')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Calendar size={18} />
                Calendar
              </Button>
              <Button
                onClick={() => setCurrentPage('notes')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText size={18} />
                Add Notes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Live Clock */}
        <LiveClock />

        {/* Motivational Quote */}
        <div className="bg-white/90 backdrop-blur-soft rounded-2xl p-6 shadow-soft border border-primary/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="text-primary" size={20} />
            <h3 className="text-lg font-cursive font-bold text-primary">
              Daily Motivation
            </h3>
            <Star className="text-primary" size={20} />
          </div>
          <EditableText
            text={currentQuote}
            onSave={updateCustomQuote}
            className="text-gray-700 font-medium italic justify-center"
            inputClassName="text-gray-700 font-medium italic text-center bg-white/80"
            placeholder="Enter your custom quote..."
            maxLength={200}
          />
        </div>

        {/* Add Slot Form */}
        <AddSlotForm onAddSlot={handleAddSlot} />

        {/* Weekday Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {weekdays.map((day) => (
            <WeekdayCard
              key={day}
              day={day}
              slots={data.slots.filter(slot => slot.day === day)}
              onEditSlot={handleEditSlot}
              onDeleteSlot={handleDeleteSlot}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
