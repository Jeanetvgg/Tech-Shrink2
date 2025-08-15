
import React from 'react';

const loadingMessages = [
  "The tools are settling onto the couch...",
  "Brewing some digital tea...",
  "Finding the root of the issue...",
  "Consulting the tech spirits...",
  "Translating frustration into conversation...",
];

export const LoadingSpinner: React.FC = () => {
  const [message, setMessage] = React.useState(loadingMessages[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 p-8">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 bg-primary/30 rounded-full animate-breathing"></div>
        <div className="absolute inset-4 bg-primary/50 rounded-full animate-breathing" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute inset-8 bg-primary rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full animate-ping"></div>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-poppins font-bold text-gray-800">Let's work this out...</h2>
        <p className="font-nunito text-gray-600 text-lg transition-opacity duration-500">{message}</p>
      </div>
    </div>
  );
};
