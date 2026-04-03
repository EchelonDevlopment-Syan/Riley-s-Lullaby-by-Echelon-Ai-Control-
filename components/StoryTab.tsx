import React, { useState } from 'react';
import { BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { generateStory } from '../services/geminiService';

export default function StoryTab() {
  const [storyPrompt, setStoryPrompt] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const handleGenerateStory = async () => {
    if (!storyPrompt.trim()) return;
    setIsGeneratingStory(true);
    setGeneratedStory("");

    const result = await generateStory(storyPrompt);
    
    setGeneratedStory(result);
    setIsGeneratingStory(false);
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-slate-50 overflow-y-auto w-full h-full">
      <div className="text-center mb-6 shrink-0">
        <h2 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <BookOpen className="text-cyan-500" /> Bedtime Stories
        </h2>
        <p className="text-xs text-slate-500">Generate a soothing tale for Lil-Lil John</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-cyan-100">
          <label className="text-xs font-bold text-cyan-700 block mb-2">STORY THEME</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={storyPrompt}
              onChange={(e) => setStoryPrompt(e.target.value)}
              placeholder="e.g., A sleepy bunny, Clouds..."
              className="flex-1 text-sm p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleGenerateStory}
              disabled={isGeneratingStory || !storyPrompt.trim()}
              className="bg-cyan-500 text-white p-2 rounded-lg disabled:opacity-50 hover:bg-cyan-600"
            >
              {isGeneratingStory ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            </button>
          </div>
        </div>

        {generatedStory ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100 relative animate-in fade-in slide-in-from-bottom-2">
            <div className="absolute -top-3 left-4 bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-1 rounded-full">
              AI GENERATED
            </div>
            <p className="text-sm leading-7 text-slate-700 font-medium font-serif">
              {generatedStory}
            </p>
          </div>
        ) : (
          <div className="text-center py-10 opacity-40">
            <BookOpen size={48} className="mx-auto mb-2 text-slate-300" />
            <p className="text-xs">Enter a theme to begin reading</p>
          </div>
        )}
      </div>
    </div>
  );
}