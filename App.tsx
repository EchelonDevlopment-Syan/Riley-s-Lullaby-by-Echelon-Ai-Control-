import React, { useState } from 'react';
import { Volume2, RefreshCw, BookOpen, Baby } from 'lucide-react';
import SootheTab from './components/SootheTab';
import SignsTab from './components/SignsTab';
import StoryTab from './components/StoryTab';
import MimicTab from './components/MimicTab';
import { TabType } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('music');

  return (
    <div className="min-h-screen bg-cyan-50 flex items-center justify-center p-4 font-sans text-slate-700">
      
      {/* Device Chassis - Cyan Blue with Pink Highlights */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-8 border-cyan-200 overflow-hidden relative flex flex-col h-[700px]">
        
        {/* Top Bar / Status */}
        <div className="bg-cyan-100 p-4 flex justify-center items-center shrink-0">
          <div className="text-xs font-bold text-cyan-700 tracking-wider uppercase text-center">
            For Lil-Lil John from Syan & Scott
          </div>
        </div>

        {/* Main Display Area - Flex 1 to take remaining space */}
        <div className="flex-1 bg-slate-50 relative flex flex-col overflow-hidden">
          {/* Conditional Rendering of Tabs */}
          {activeTab === 'music' && <SootheTab />}
          {activeTab === 'monitor' && <SignsTab />}
          {activeTab === 'story' && <StoryTab />}
          {activeTab === 'mimic' && <MimicTab />}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white p-4 border-t border-cyan-100 shrink-0">
          <div className="grid grid-cols-4 gap-2 bg-cyan-50 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('music')}
              className={`py-3 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${activeTab === 'music' ? 'bg-white shadow-sm text-pink-500' : 'text-cyan-400'}`}
            >
              <Volume2 size={18} />
              SOOTHE
            </button>
            <button 
              onClick={() => setActiveTab('monitor')}
              className={`py-3 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${activeTab === 'monitor' ? 'bg-white shadow-sm text-pink-500' : 'text-cyan-400'}`}
            >
              <RefreshCw size={18} />
              SIGNS
            </button>
            <button 
              onClick={() => setActiveTab('story')}
              className={`py-3 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${activeTab === 'story' ? 'bg-white shadow-sm text-pink-500' : 'text-cyan-400'}`}
            >
              <BookOpen size={18} />
              STORY
            </button>
            <button 
              onClick={() => setActiveTab('mimic')}
              className={`py-3 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${activeTab === 'mimic' ? 'bg-white shadow-sm text-pink-500' : 'text-cyan-400'}`}
            >
              <Baby size={18} />
              MIMIC
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}