import React, { useState } from 'react';
import { CounselingPlanDisplay } from './CounselingPlanDisplay';
import { CalmDownCorner } from './CalmDownCorner';
import type { CounselingPlan } from '../types';

interface ActionCenterProps {
    plan: CounselingPlan;
}

type ActiveTab = 'plan' | 'games';

export const ActionCenter: React.FC<ActionCenterProps> = ({ plan }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('plan');

    const getTabClass = (tabName: ActiveTab) => {
        return `px-6 py-3 font-poppins font-bold text-lg rounded-t-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            activeTab === tabName 
            ? 'bg-white text-primary border-b-0 shadow-md' 
            : 'bg-transparent text-gray-500 hover:text-primary'
        }`;
    }

    return (
        <div className="w-full max-w-5xl mx-auto mt-12">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-2" aria-label="Tabs">
                    <button onClick={() => setActiveTab('plan')} className={getTabClass('plan')}>
                        Counseling Plan
                    </button>
                    <button onClick={() => setActiveTab('games')} className={getTabClass('games')}>
                        Calm Down Corner
                    </button>
                </nav>
            </div>

            <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6 md:p-8 shadow-2xl border-x border-b border-gray-200">
                {activeTab === 'plan' && <CounselingPlanDisplay plan={plan} />}
                {activeTab === 'games' && <CalmDownCorner />}
            </div>
        </div>
    );
};
