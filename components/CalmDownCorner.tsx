import React, { useState } from 'react';
import { BreathingExercise } from './BreathingExercise';
import { MindfulDotConnect } from './MindfulDotConnect';
import { BreathingIcon, PenIcon } from './icons';

type ActiveGame = 'breathing' | 'dots';

export const CalmDownCorner: React.FC = () => {
    const [activeGame, setActiveGame] = useState<ActiveGame>('breathing');

    const getGameButtonClass = (game: ActiveGame) => {
        return `flex items-center gap-3 px-6 py-3 font-poppins font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-0.5 ${
            activeGame === game
            ? 'bg-primary text-white shadow-lg'
            : 'bg-soft-gray text-gray-600 hover:bg-gray-200'
        }`;
    }

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-poppins font-bold text-gray-800">A Moment of Calm</h2>
                <p className="font-nunito text-lg text-gray-600 mt-2">Choose an activity to relax and refocus.</p>
            </div>
            
            <div className="flex justify-center items-center gap-4 mb-8">
                <button onClick={() => setActiveGame('breathing')} className={getGameButtonClass('breathing')}>
                    <BreathingIcon className="w-6 h-6" />
                    Breathing
                </button>
                <button onClick={() => setActiveGame('dots')} className={getGameButtonClass('dots')}>
                    <PenIcon className="w-6 h-6" />
                    Mindful Drawing
                </button>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-inner border border-gray-200">
                {activeGame === 'breathing' && <BreathingExercise />}
                {activeGame === 'dots' && <MindfulDotConnect />}
            </div>
        </div>
    );
};