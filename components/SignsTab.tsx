import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { SIGN_CARDS } from '../constants';
import { generateRoutine } from '../services/geminiService';

export default function SignsTab() {
  const [activeSignIndex, setActiveSignIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [routineSuggestion, setRoutineSuggestion] = useState<string | null>(null);
  const [isGeneratingRoutine, setIsGeneratingRoutine] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isAutoCycling) {
      interval = window.setInterval(() => {
        setActiveSignIndex(prev => (prev + 1) % SIGN_CARDS.length);
      }, 3000); 
    }
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const handleGenerateRoutine = async () => {
    setIsGeneratingRoutine(true);
    setRoutineSuggestion(null);
    const activity = SIGN_CARDS[activeSignIndex].label;
    
    const result = await generateRoutine(activity);
    
    setRoutineSuggestion(result);
    setIsGeneratingRoutine(false);
  };

  const currentSign = SIGN_CARDS[activeSignIndex];

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-6 bg-slate-50 space-y-4 w-full h-full overflow-y-auto">
      
      {/* Sign Card Display */}
      <div className={`w-full max-w-[280px] ${currentSign.color} rounded-2xl flex flex-col items-center justify-center shadow-lg transition-all duration-500 shrink-0 p-6`}>
        <div className="flex items-center justify-center gap-4 mb-4 w-full">
            {/* Object/Meaning Icon */}
            <div className="bg-white/50 p-3 rounded-full">
                {React.createElement(currentSign.icon, { size: 32 })}
            </div>
            <ArrowRight size={20} className="opacity-40" />
            {/* Hand Sign Gesture */}
            <div className="bg-white p-3 rounded-xl shadow-sm">
                {React.createElement(currentSign.signIcon, { width: 48, height: 48 })}
            </div>
        </div>
        
        <h2 className="text-3xl font-black">{currentSign.label}</h2>
        <p className="mt-2 text-xs opacity-75 font-medium uppercase tracking-widest text-center">{currentSign.signDesc}</p>
      </div>

      <div className="flex gap-2">
        {SIGN_CARDS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setActiveSignIndex(idx); setRoutineSuggestion(null); }}
            className={`w-2 h-2 rounded-full transition-colors ${idx === activeSignIndex ? 'bg-cyan-600' : 'bg-slate-300'}`}
          />
        ))}
      </div>

      <div className="w-full flex gap-2">
        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${isAutoCycling ? 'bg-pink-100 text-pink-600' : 'bg-slate-200 text-slate-500'}`}
        >
          {isAutoCycling ? 'AUTO: ON' : 'AUTO: OFF'}
        </button>
        <button
          onClick={handleGenerateRoutine}
          disabled={isGeneratingRoutine}
          className="flex-1 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center gap-1 hover:opacity-90 disabled:opacity-50"
        >
          {isGeneratingRoutine ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          AI ROUTINE
        </button>
      </div>

      {/* AI Suggestion Box */}
      {routineSuggestion && (
        <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-pink-100 text-left animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-xs font-bold text-pink-500 mb-2 flex items-center gap-1">
            <Sparkles size={12} /> SUGGESTED ROUTINE
          </h3>
          <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
            {routineSuggestion}
          </div>
        </div>
      )}
    </div>
  );
}