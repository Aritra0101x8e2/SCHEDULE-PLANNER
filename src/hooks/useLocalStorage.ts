
import { useState, useEffect } from 'react';

interface ScheduleSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  topic: string;
  completed: boolean;
}

interface MusicFile {
  id: string;
  name: string;
  url: string;
}

interface AppData {
  slots: ScheduleSlot[];
  musicFiles: MusicFile[];
  theme: string;
  darkMode: boolean;
  customQuote: string;
  appName: string;
}

const DEFAULT_DATA: AppData = {
  slots: [],
  musicFiles: [],
  theme: 'pink',
  darkMode: false,
  customQuote: '',
  appName: 'Schedule Planner'
};

export const useLocalStorage = () => {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('schedule-planner-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData({ ...DEFAULT_DATA, ...parsedData });
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem('schedule-planner-data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [data]);

  const updateSlots = (slots: ScheduleSlot[]) => {
    setData(prev => ({ ...prev, slots }));
  };

  const updateMusicFiles = (musicFiles: MusicFile[]) => {
    setData(prev => ({ ...prev, musicFiles }));
  };

  const updateTheme = (theme: string) => {
    setData(prev => ({ ...prev, theme }));
  };

  const updateDarkMode = (darkMode: boolean) => {
    setData(prev => ({ ...prev, darkMode }));
  };

  const updateCustomQuote = (customQuote: string) => {
    setData(prev => ({ ...prev, customQuote }));
  };

  const updateAppName = (appName: string) => {
    setData(prev => ({ ...prev, appName }));
  };

  return {
    data,
    updateSlots,
    updateMusicFiles,
    updateTheme,
    updateDarkMode,
    updateCustomQuote,
    updateAppName
  };
};
