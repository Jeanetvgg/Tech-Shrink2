import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';

const faqData = [
  {
    question: "Why is my Outlook search not finding recent emails?",
    answer: "This is often a caching issue. Try this: Go to File > Options > Search > Indexing Options > Advanced > Rebuild. It might take a while, but it usually solves the problem!"
  },
  {
    question: "Teams is showing a notification badge that won't go away.",
    answer: "Ah, the phantom notification! Right-click the Teams icon in your taskbar and select 'Quit'. Then, reopen the application. This forces a full refresh and usually clears stuck notifications."
  },
  {
    question: "My VPN keeps disconnecting, especially during video calls.",
    answer: "A weak Wi-Fi signal is the most common culprit. Try moving closer to your router or connecting via an Ethernet cable if possible. Also, disconnect other devices from the network that might be consuming bandwidth."
  },
  {
    question: "How can I stop getting so many email notifications?",
    answer: "Tame your inbox! In Outlook, go to File > Options > Mail. Under 'Message arrival', you can customize how you're notified. Try turning off desktop alerts and only keeping the envelope icon in the taskbar."
  }
];

const FaqItem: React.FC<{ item: typeof faqData[0] }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-nunito font-semibold text-gray-700">{item.question}</span>
        <ChevronDownIcon className={`w-6 h-6 text-primary transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}
      >
        <p className="p-4 pt-0 text-gray-600 font-nunito bg-teal-50/50 rounded-b-md">{item.answer}</p>
      </div>
    </div>
  );
};

export const FaqSection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 p-6 animate-fade-in-up">
      <h2 className="text-3xl font-poppins font-bold text-gray-800 text-center mb-2">Common Tech Frustrations</h2>
      <p className="text-center font-nunito text-gray-500 mb-8">Quick fixes for frequently asked problems.</p>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 space-y-2">
        {faqData.map((item, index) => (
          <FaqItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};