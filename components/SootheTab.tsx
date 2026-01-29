import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Moon, Sun, ShieldCheck } from 'lucide-react';
import { TRACK_LIST } from '../constants';

export default function SootheTab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioDebugStatus, setAudioDebugStatus] = useState("Audio: Inactive");

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const noteIndexRef = useRef<number>(0);
  const schedulerTimerRef = useRef<number | null>(null);

  const currentSong = TRACK_LIST[currentSongIndex];

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      // Standardize AudioContext creation
      const AudioCtor = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtor();
    }
    return audioContextRef.current;
  };

  const playTone = (freq: number, duration: number, time: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    // Envelope for smoother sound
    const attack = Math.min(0.05, duration * 0.1);
    const release = Math.min(0.05, duration * 0.1);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.4, time + attack);
    gain.gain.setValueAtTime(0.4, time + duration - release);
    gain.gain.linearRampToValueAtTime(0, time + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  };

  const scheduleNotes = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Access current song directly from list to ensure fresh data inside callback
    const activeSong = TRACK_LIST[currentSongIndex];
    if (!activeSong) return;

    const tempoMultiplier = 60 / activeSong.bpm;
    const lookahead = 0.1; // seconds

    // Schedule notes that fall within the lookahead window
    while (nextNoteTimeRef.current < ctx.currentTime + lookahead) {
      const pitch = activeSong.melody[noteIndexRef.current];
      const rhythmVal = activeSong.rhythm[noteIndexRef.current];
      const duration = rhythmVal * tempoMultiplier;

      if (pitch > 0) {
        playTone(pitch, duration, nextNoteTimeRef.current);
      }

      nextNoteTimeRef.current += duration;
      noteIndexRef.current = (noteIndexRef.current + 1) % activeSong.melody.length;
    }

    // Rough progress calculation for UI
    setProgress((prev) => (prev >= 100 ? 0 : prev + 1));

    schedulerTimerRef.current = window.setTimeout(scheduleNotes, 25);
  }, [currentSongIndex]);

  const startMusic = async () => {
    const ctx = getAudioContext();

    // Handle suspended state (browser autoplay policy)
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
        setAudioDebugStatus("Audio: Resumed");
      } catch (e) {
        console.error(e);
        setAudioDebugStatus("Audio: Resume Failed");
      }
    } else {
      setAudioDebugStatus("Audio: Active");
    }

    // Reset cursors if starting from a stopped state
    if (!isPlaying) {
        noteIndexRef.current = 0;
        nextNoteTimeRef.current = ctx.currentTime + 0.05;
    }

    setIsPlaying(true);
    scheduleNotes();
  };

  const stopMusic = () => {
    if (schedulerTimerRef.current) clearTimeout(schedulerTimerRef.current);
    setIsPlaying(false);
    setProgress(0);
    setAudioDebugStatus("Audio: Stopped");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (schedulerTimerRef.current) clearTimeout(schedulerTimerRef.current);
      if (audioContextRef.current) {
          audioContextRef.current.close().catch(console.error);
          audioContextRef.current = null;
      }
    };
  }, []);

  // Handle song change while playing
  useEffect(() => {
    if (isPlaying) {
      if (schedulerTimerRef.current) clearTimeout(schedulerTimerRef.current);
      
      const ctx = getAudioContext();
      // Crucial: Reset note index when song changes
      noteIndexRef.current = 0;
      nextNoteTimeRef.current = ctx.currentTime + 0.05;
      
      scheduleNotes();
    }
  }, [currentSongIndex, isPlaying, scheduleNotes]);

  const handlePlayClick = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const skip = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSongIndex(prev => (prev + 1) % TRACK_LIST.length);
    } else {
      setCurrentSongIndex(prev => (prev - 1 + TRACK_LIST.length) % TRACK_LIST.length);
    }
    // The useEffect above handles the restart logic if isPlaying is true
  };

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 relative w-full">
        {/* Echelon AI Control Badge */}
        <div className="absolute top-2 left-0 w-full px-6 z-10">
          <div className="bg-slate-800 text-cyan-400 text-[10px] p-2 rounded-lg border border-slate-700 flex items-center justify-center gap-2 shadow-md">
            <ShieldCheck size={12} />
            <span className="tracking-widest font-bold">ECHELON AI CONTROL</span>
          </div>
        </div>

        <div className={`mt-8 w-32 h-32 rounded-full flex items-center justify-center shadow-lg transition-all duration-1000 ${isPlaying ? 'scale-110 shadow-pink-200' : 'scale-100'} ${currentSong.category === 'Soothe' ? 'bg-cyan-100 text-cyan-600' : 'bg-orange-100 text-orange-500'}`}>
          {currentSong.category === 'Soothe' ? <Moon size={48} /> : <Sun size={48} />}
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">{currentSong.title}</h2>
          <p className="text-sm text-slate-500 font-medium">{currentSong.description}</p>
          <div className="inline-block px-3 py-1 bg-white rounded-full border border-cyan-200 text-xs text-cyan-600">
            {currentSong.bpm} BPM
          </div>
        </div>

        <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-100 text-xs text-cyan-800 italic">
          "{currentSong.scienceNote}"
        </div>

        {/* Progress Simulation */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-pink-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Debug Status */}
        <div className="text-[10px] text-slate-400 font-mono">
          System Status: {audioDebugStatus}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 border-t border-cyan-100 shrink-0 w-full">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-6">
            <button onClick={() => skip('prev')} className="text-cyan-300 hover:text-cyan-500"><SkipBack size={24} /></button>
            <button
              onClick={handlePlayClick}
              className="w-16 h-16 bg-pink-500 rounded-full text-white flex items-center justify-center shadow-lg shadow-pink-200 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={() => skip('next')} className="text-cyan-300 hover:text-cyan-500"><SkipForward size={24} /></button>
          </div>
        </div>
      </div>
    </>
  );
}