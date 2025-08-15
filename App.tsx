import React, { useState } from 'react';
import { Header } from './components/Header';
import { VentingForm } from './components/VentingForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TherapySessionDisplay } from './components/TherapySessionDisplay';
import { FaqSection } from './components/FaqSection';
import { getTherapySession } from './services/geminiService';
import type { TherapyResponse } from './types';
import { ActionCenter } from './components/ActionCenter';

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<TherapyResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setSessionData(null);

    try {
      const data = await getTherapySession(userInput);
      setSessionData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setSessionData(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-blue-50 bg-[length:200%_200%] animate-gradient text-gray-800">
      <main className="container mx-auto px-4 py-8">
        <Header />

        <div className="mt-8">
          {isLoading && <LoadingSpinner />}

          {error && (
            <div className="text-center max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Oh no! </strong>
              <span className="block sm:inline">{error}</span>
              <button onClick={handleReset} className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded">
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && !sessionData && (
            <>
              <VentingForm
                userInput={userInput}
                setUserInput={setUserInput}
                isAnonymous={isAnonymous}
                setIsAnonymous={setIsAnonymous}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
              <FaqSection />
            </>
          )}

          {sessionData && (
            <div className="animate-float">
              <TherapySessionDisplay 
                title={sessionData.sessionTitle}
                sentiment={sessionData.sentiment}
                dialogue={sessionData.therapyDialogue}
              />
              <ActionCenter plan={sessionData.counselingPlan} />

              <div className="text-center mt-12">
                 <button 
                  onClick={handleReset} 
                  className="bg-primary text-white font-poppins font-bold py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transform hover:-translate-y-1 transition-all duration-300">
                  Start a New Session
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 font-nunito text-gray-500">
        <p>Powered by Gemini and a bit of digital empathy.</p>
      </footer>
    </div>
  );
}

export default App;