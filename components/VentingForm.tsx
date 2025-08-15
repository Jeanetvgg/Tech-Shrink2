import React from 'react';

interface VentingFormProps {
  userInput: string;
  setUserInput: (value: string) => void;
  isAnonymous: boolean;
  setIsAnonymous: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const VentingForm: React.FC<VentingFormProps> = ({ userInput, setUserInput, isAnonymous, setIsAnonymous, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center">
            <h2 className="text-2xl font-poppins font-bold text-gray-800">Welcome to the Session Couch</h2>
            <p className="font-nunito text-lg text-gray-600 mt-2 mb-6">
              Let it all out. What's causing the tech tension today? Be specific! <br/>
              (e.g., "Outlook search is broken and I can't find my meeting with finance.")
            </p>
        </div>
        <textarea
          id="vent"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="My computer is making a weird noise and Teams just sent my boss a GIF of a cat falling off a chair..."
          className="w-full h-48 p-4 font-nunito text-lg text-gray-800 bg-soft-gray rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-inner"
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md">
          <input
            id="anonymous"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            disabled={isLoading}
            className="h-5 w-5 rounded text-primary focus:ring-primary border-gray-300"
          />
          <label htmlFor="anonymous" className="font-nunito text-gray-600 select-none">
            Keep this session anonymous
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading || !userInput}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-white font-poppins font-bold text-lg rounded-full shadow-lg hover:bg-red-500 transform hover:-translate-y-1 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? "Analyzing..." : "Start Session"}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
};