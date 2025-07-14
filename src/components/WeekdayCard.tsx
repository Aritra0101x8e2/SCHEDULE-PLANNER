
import React from 'react';
import { Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScheduleSlot {
  id: string;
  startTime: string;
  endTime: string;
  topic: string;
  completed: boolean;
}

interface WeekdayCardProps {
  day: string;
  slots: ScheduleSlot[];
  onEditSlot: (id: string) => void;
  onDeleteSlot: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const WeekdayCard: React.FC<WeekdayCardProps> = ({
  day,
  slots,
  onEditSlot,
  onDeleteSlot,
  onToggleComplete
}) => {
  const completedSlots = slots.filter(slot => slot.completed).length;
  const totalSlots = slots.length;
  const isAllComplete = totalSlots > 0 && completedSlots === totalSlots;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-soft border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
      isAllComplete ? 'border-green-300 bg-gradient-to-br from-green-50 to-white' : 'border-primary/20'
    }`}>
      <div className="mb-4">
        <h3 className="text-xl font-cursive font-bold text-primary mb-2">
          {day}
        </h3>
        {totalSlots > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{completedSlots}/{totalSlots} completed</span>
            {isAllComplete && (
              <CheckCircle size={16} className="text-green-500" />
            )}
          </div>
        )}
      </div>

      <div className="space-y-3 min-h-[200px]">
        {slots.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p className="font-cursive text-lg">No tasks scheduled</p>
          </div>
        ) : (
          slots.map((slot) => (
            <div
              key={slot.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                slot.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200 hover:border-primary/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => onToggleComplete(slot.id)}
                      className="text-primary hover:text-primary/70 transition-colors"
                    >
                      {slot.completed ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>
                    <span className={`text-sm font-medium ${
                      slot.completed ? 'text-green-700' : 'text-primary'
                    }`}>
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    slot.completed ? 'text-green-600 line-through' : 'text-gray-700'
                  }`}>
                    {slot.topic}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditSlot(slot.id)}
                    className="p-1 h-auto text-gray-400 hover:text-primary"
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSlot(slot.id)}
                    className="p-1 h-auto text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeekdayCard;
