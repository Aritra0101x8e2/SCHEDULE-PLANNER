import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const indianHolidays = {
    '1-1': "New Year's Day",
    '1-26': 'Republic Day',
    '8-15': 'Independence Day',
    '10-2': 'Gandhi Jayanti',
    '12-25': 'Christmas Day',
    '3-8': 'Holi (varies)',
    '10-24': 'Diwali (varies)',
    '4-14': 'Baisakhi',
    '5-1': 'Labour Day',
    '9-5': "Teachers' Day",
    '11-14': "Children's Day"
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isHoliday = (day: number) => {
    const month = currentDate.getMonth() + 1;
    const key = `${month}-${day}`;
    return indianHolidays[key as keyof typeof indianHolidays];
  };

  const isWeekend = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setFullYear(newDate.getFullYear() - 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  // Empty cells before first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white/90 backdrop-blur-soft rounded-2xl p-4 md:p-8 shadow-soft border border-primary/10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-cursive font-bold text-primary text-center md:text-left">
              Calendar
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center md:justify-end">
              {/* Year Navigation */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateYear('prev')}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-base md:text-lg font-semibold text-gray-700 min-w-[60px] text-center">
                  {currentDate.getFullYear()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateYear('next')}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-base md:text-xl font-cursive font-semibold text-primary min-w-[90px] md:min-w-[120px] text-center">
                  {monthNames[currentDate.getMonth()]}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2 md:mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center p-2 md:p-3 font-semibold text-xs md:text-sm text-gray-600 bg-gray-50 rounded-lg"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="p-2 h-12 md:p-3 md:h-16"></div>;
                }

                const holiday = isHoliday(day);
                const weekend = isWeekend(day);
                const today = isToday(day);

                return (
                  <div
                    key={day}
                    className={`
                      p-2 h-12 md:p-3 md:h-16 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer
                      flex flex-col items-center justify-center text-center text-xs md:text-sm
                      ${
                        today
                          ? 'bg-primary text-white border-primary shadow-lg'
                          : weekend
                          ? 'bg-green-100 border-green-300 text-green-800'
                          : holiday
                          ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-primary/10 hover:border-primary/30'
                      }
                    `}
                    title={weekend ? 'Weekend' : holiday ? holiday : ''}
                  >
                    <span className="font-semibold">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 md:mt-6 flex flex-wrap gap-3 justify-center text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
              <span>Holidays</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Weekends</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
