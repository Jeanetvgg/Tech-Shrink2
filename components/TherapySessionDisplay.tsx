import React from 'react';
import type { DialogueLine } from '../types';
import { TeamsIcon, OutlookIcon, DefaultToolIcon, SpeakerOnIcon, SpeakerOffIcon } from './icons';

interface TherapySessionDisplayProps {
  title: string;
  sentiment: string;
  dialogue: DialogueLine[];
}

const ToolAvatar: React.FC<{ toolName: string }> = ({ toolName }) => {
  const normalizedName = toolName.toLowerCase();
  let IconComponent;
  let bgColor = 'bg-gray-400';

  if (normalizedName.includes('teams')) {
    IconComponent = TeamsIcon;
    bgColor = 'bg-indigo-100';
  } else if (normalizedName.includes('outlook')) {
    IconComponent = OutlookIcon;
    bgColor = 'bg-blue-100';
  } else {
    IconComponent = DefaultToolIcon;
    bgColor = 'bg-yellow-100';
  }
  
  return (
    <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${bgColor}`}>
      <IconComponent className="w-8 h-8" />
    </div>
  );
};


export const TherapySessionDisplay: React.FC<TherapySessionDisplayProps> = ({ title, sentiment, dialogue }) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Sorry, your browser doesn't support text-to-speech.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToSpeak = dialogue.map(d => `${d.speaker} says: ${d.line}`).join('. ');
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        console.error("Speech synthesis error");
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  React.useEffect(() => {
    // Cleanup speech synthesis on component unmount
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200">
      <div className="text-center mb-8 relative">
        <p className="text-sm font-bold text-primary uppercase tracking-wider font-nunito">{sentiment} Detected</p>
        <h2 className="text-4xl font-poppins font-bold text-gray-800 mt-2">{title}</h2>
        <button 
          onClick={handleToggleSpeech} 
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label={isSpeaking ? "Stop reading aloud" : "Read aloud"}
        >
          {isSpeaking ? <SpeakerOffIcon className="w-6 h-6 text-secondary" /> : <SpeakerOnIcon className="w-6 h-6 text-primary" />}
        </button>
      </div>

      <div className="space-y-6 font-comic-neue text-lg text-gray-700">
        {dialogue.map((item, index) => (
          <div key={index} className={`flex gap-4 items-start animate-fade-in-up animation-delay-${index * 200}`}>
            <ToolAvatar toolName={item.speaker} />
            <div className="bg-soft-gray p-4 rounded-xl rounded-tl-none w-full">
              <p className="font-bold text-gray-900 mb-1">{item.speaker}:</p>
              <p className="leading-relaxed">{item.line}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
