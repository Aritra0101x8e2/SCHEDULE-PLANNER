
import React, { useEffect, useState } from 'react';

const LiveClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-soft rounded-2xl p-6 shadow-soft border border-primary/10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-cursive text-primary font-bold">
          {formatTime(currentTime)}
        </h2>
        <p className="text-lg text-gray-600 font-medium">
          {formatDate(currentTime)}
        </p>
      </div>
    </div>
  );
};

export default LiveClock;
