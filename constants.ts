import { Utensils, Hand, Milk, Plus } from 'lucide-react';
import { Song, SignCard } from './types';
import { SignEat, SignMore, SignMilk, SignAllDone } from './components/CustomIcons';

// Frequencies
export const NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, G3: 196.00
};

export const TRACK_LIST: Song[] = [
  {
    id: '1',
    title: "Lil-Lil John",
    category: 'Soothe',
    bpm: 60,
    description: "Traditional Piano & Hum",
    scienceNote: "Matches infant resting heart rate (60 BPM). Promotes entrainment.",
    melody: [NOTES.E4, NOTES.E4, NOTES.G4, NOTES.E4, NOTES.E4, NOTES.G4, NOTES.E4, NOTES.G4, NOTES.C5, NOTES.B4, NOTES.A4, NOTES.A4, NOTES.G4],
    rhythm: [0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 2]
  },
  {
    id: '2',
    title: "Twinkle Twinkle (Slow)",
    category: 'Soothe',
    bpm: 65,
    description: "Simple Melody",
    scienceNote: "High predictability reduces cognitive load, lowering cortisol.",
    melody: [NOTES.C4, NOTES.C4, NOTES.G4, NOTES.G4, NOTES.A4, NOTES.A4, NOTES.G4, 0, NOTES.F4, NOTES.F4, NOTES.E4, NOTES.E4, NOTES.D4, NOTES.D4, NOTES.C4],
    rhythm: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1]
  },
  {
    id: '3',
    title: "Descending Scales",
    category: 'Soothe',
    bpm: 55,
    description: "Vocal Humming",
    scienceNote: "Descending melodic contours are universally recognized as 'soothing'.",
    melody: [NOTES.C5, NOTES.B4, NOTES.A4, NOTES.G4, NOTES.F4, NOTES.E4, NOTES.D4, NOTES.C4],
    rhythm: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 2]
  },
  {
    id: '4',
    title: "Pop Goes the Weasel",
    category: 'Play',
    bpm: 110,
    description: "Upbeat Rhythmic",
    scienceNote: "Syncopation creates surprise (dopamine) for active engagement.",
    melody: [NOTES.C4, NOTES.C4, NOTES.D4, NOTES.D4, NOTES.E4, NOTES.G4, NOTES.E4, NOTES.C4],
    rhythm: [0.3, 0.15, 0.3, 0.15, 0.3, 0.3, 0.3, 0.3]
  },
  {
    id: '5',
    title: "Clapping Song",
    category: 'Play',
    bpm: 120,
    description: "High Pitch & Fast",
    scienceNote: "Higher pitch registers engage the motor cortex for movement.",
    melody: [NOTES.G4, NOTES.G4, NOTES.E4, NOTES.G4, NOTES.G4, NOTES.E4, NOTES.G4, NOTES.A4, NOTES.G4, NOTES.E4, NOTES.C4],
    rhythm: [0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.25, 0.25, 1]
  }
];

export const SIGN_CARDS: SignCard[] = [
  { 
    id: 'more', 
    label: 'MORE', 
    icon: Plus,
    signIcon: SignMore,
    color: 'bg-purple-100 text-purple-600', 
    signDesc: 'Tap fingertips together' 
  },
  { 
    id: 'eat', 
    label: 'EAT', 
    icon: Utensils,
    signIcon: SignEat,
    color: 'bg-orange-100 text-orange-600', 
    signDesc: 'Tap fingers to mouth' 
  },
  { 
    id: 'milk', 
    label: 'MILK', 
    icon: Milk,
    signIcon: SignMilk,
    color: 'bg-blue-100 text-blue-600', 
    signDesc: 'Open and close fist' 
  },
  { 
    id: 'all_done', 
    label: 'ALL DONE', 
    icon: Hand,
    signIcon: SignAllDone,
    color: 'bg-red-100 text-red-600', 
    signDesc: 'Twist hands back and forth' 
  },
];