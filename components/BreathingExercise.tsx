import React, { useState, useEffect } from 'react';

const breathingCycle = [
    { text: 'Breathe In...', duration: 4000, scale: 1 },
    { text: 'Hold', duration: 2000, scale: 1 },
    { text: 'Breathe Out...', duration: 4000, scale: 0.8 },
    { text: 'Ready', duration: 1000, scale: 0.8 },
];

export const BreathingExercise: React.FC = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const currentPhase = breathingCycle[phaseIndex];
    const timer = setTimeout(() => {
      setPhaseIndex((prevIndex) => (prevIndex + 1) % breathingCycle.length);
    }, currentPhase.duration);

    return () => clearTimeout(timer);
  }, [phaseIndex]);
  
  const currentPhase = breathingCycle[phaseIndex];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-soft-gray rounded-xl">
        <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-slow"></div>
            <div 
                className="absolute inset-0 bg-primary rounded-full transition-transform duration-[4000ms] ease-in-out"
                style={{
                    transform: `scale(${currentPhase.scale})`
                }}
            ></div>
            <span className="relative text-2xl font-poppins font-bold text-white z-10 select-none transition-opacity duration-500">
                {currentPhase.text}
            </span>
        </div>
    </div>
  );
};
