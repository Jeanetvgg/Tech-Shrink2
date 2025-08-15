
import React from 'react';
import { BrainIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-5xl mx-auto p-6 text-center">
      <div className="flex items-center justify-center gap-4 mb-2">
        <BrainIcon className="w-12 h-12 text-primary" />
        <h1 className="text-5xl font-poppins font-bold text-gray-800">TechShrink</h1>
      </div>
      <p className="font-nunito text-lg text-gray-500 italic">"Where people and their tools learn to get along"</p>
    </header>
  );
};
