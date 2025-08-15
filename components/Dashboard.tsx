
import React from 'react';
import { TeamsIcon, OutlookIcon, DefaultToolIcon } from './icons';

const tensions = [
  {
    title: "Calendar Sync Errors",
    issue: "Outlook and Teams are not agreeing on meeting times.",
    score: 88,
    icon: <OutlookIcon className="w-8 h-8 text-white" />
  },
  {
    title: "VPN Connectivity Drops",
    issue: "Users are frequently getting disconnected during peak hours.",
    score: 75,
    icon: <DefaultToolIcon className="w-8 h-8 text-white" />
  },
  {
    title: "The Phantom Notification",
    issue: "Teams shows a notification badge that never goes away.",
    score: 62,
    icon: <TeamsIcon className="w-8 h-8 text-white" />
  },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 p-6">
      <h2 className="text-3xl font-poppins font-bold text-gray-800 text-center mb-8">This Week's Top Tech Tensions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tensions.map((tension, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${index === 0 ? 'bg-secondary' : index === 1 ? 'bg-accent' : 'bg-primary'}`}>
                {tension.icon}
              </div>
              <div className="text-right">
                <p className="font-nunito text-sm text-gray-500">Stress Score</p>
                <p className="font-poppins text-3xl font-bold text-gray-800">{tension.score}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-poppins font-semibold text-gray-800">{tension.title}</h3>
              <p className="font-nunito text-gray-600 mt-1">{tension.issue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
