
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-pink-50 to-pink-100 flex items-center justify-center z-50">
      <div className="text-center space-y-8 animate-fade-in-up">
        {/* Animated Clock */}
        <div className="relative">
          <Clock 
            size={80} 
            className="text-primary animate-spin-slow mx-auto" 
          />
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-slow"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-cursive text-primary font-bold">
            Your Schedule Awaits...
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Creating your perfect planning experience
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-pink-400 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
