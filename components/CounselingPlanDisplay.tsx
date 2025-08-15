import React from 'react';
import type { CounselingPlan, CounselingPlanItem } from '../types';
import { 
    BrainIcon, ClipboardIcon, EtiquetteIcon, SyncIcon, CacheIcon, 
    RestartIcon, UpdateIcon, SettingIcon, LinkIcon, CalendarIcon, 
    CollaborationIcon, CommunicationIcon, CheckIcon, SpeakerOnIcon, SpeakerOffIcon
} from './icons';

interface CounselingPlanDisplayProps {
  plan: CounselingPlan;
}

const SolutionStepIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => {
    const icons: { [key: string]: React.FC<any> } = {
      sync: SyncIcon,
      cache: CacheIcon,
      restart: RestartIcon,
      update: UpdateIcon,
      setting: SettingIcon,
      link: LinkIcon,
      calendar: CalendarIcon,
      collaboration: CollaborationIcon,
      communication: CommunicationIcon,
      check: CheckIcon,
    };
    const IconComponent = icons[icon.toLowerCase()] || CheckIcon;
    return <IconComponent className={className} />;
};

const PlanCard: React.FC<{ title: string; items: CounselingPlanItem[]; icon: React.ReactNode }> = ({ title, items, icon }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex-1 min-w-[280px]">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-poppins font-semibold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-4 font-nunito text-gray-600">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
                <SolutionStepIcon icon={item.icon} className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <span>{item.description}</span>
            </li>
        ))}
      </ul>
    </div>
  );
};

export const CounselingPlanDisplay: React.FC<CounselingPlanDisplayProps> = ({ plan }) => {
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
      const technicalFixes = `Technical Fixes: ${plan.technicalFixes.map(item => item.description).join(', ')}.`;
      const workflowAdjustments = `Workflow Adjustments: ${plan.workflowAdjustments.map(item => item.description).join(', ')}.`;
      const etiquetteTips = `Etiquette and Best Practices: ${plan.etiquetteTips.map(item => item.description).join(', ')}.`;
      
      const textToSpeak = [technicalFixes, workflowAdjustments, etiquetteTips].join(' ');
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  React.useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8 relative">
        <h2 className="text-3xl font-poppins font-bold text-gray-800">Your Relationship Counseling Plan</h2>
        <p className="font-nunito text-lg text-gray-600 mt-2">Here are some practical steps to restore harmony.</p>
        <button 
          onClick={handleToggleSpeech} 
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label={isSpeaking ? "Stop reading plan aloud" : "Read plan aloud"}
        >
          {isSpeaking ? <SpeakerOffIcon className="w-6 h-6 text-secondary" /> : <SpeakerOnIcon className="w-6 h-6 text-primary" />}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <PlanCard title="Technical Fixes" items={plan.technicalFixes} icon={<BrainIcon className="w-6 h-6 text-primary" />} />
        <PlanCard title="Workflow Adjustments" items={plan.workflowAdjustments} icon={<ClipboardIcon className="w-6 h-6 text-secondary" />} />
        <PlanCard title="Etiquette & Best Practices" items={plan.etiquetteTips} icon={<EtiquetteIcon className="w-6 h-6 text-accent" />} />
      </div>
    </div>
  );
};
