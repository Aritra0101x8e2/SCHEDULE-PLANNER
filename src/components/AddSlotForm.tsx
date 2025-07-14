
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface AddSlotFormProps {
  onAddSlot: (slot: {
    day: string;
    startTime: string;
    endTime: string;
    topic: string;
  }) => void;
}

const AddSlotForm: React.FC<AddSlotFormProps> = ({ onAddSlot }) => {
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [topic, setTopic] = useState('');

  const weekdays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (day && startTime && endTime && topic) {
      onAddSlot({ day, startTime, endTime, topic });
      setDay('');
      setStartTime('');
      setEndTime('');
      setTopic('');
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-soft rounded-2xl p-6 shadow-soft border border-primary/10">
      <h3 className="text-xl font-cursive font-bold text-primary mb-4">
        Add New Schedule Slot
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="day" className="text-sm font-medium text-gray-700">
              Day
            </Label>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {weekdays.map((weekday) => (
                  <SelectItem key={weekday} value={weekday}>
                    {weekday}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="topic" className="text-sm font-medium text-gray-700">
              Task Topic
            </Label>
            <Input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter task description"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="endTime" className="text-sm font-medium text-gray-700">
              End Time
            </Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200"
        >
          <Plus size={20} className="mr-2" />
          Add Schedule Slot
        </Button>
      </form>
    </div>
  );
};

export default AddSlotForm;
