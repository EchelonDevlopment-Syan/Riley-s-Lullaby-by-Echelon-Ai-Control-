import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface Song {
  id: string;
  title: string;
  category: 'Soothe' | 'Play';
  bpm: number;
  description: string;
  scienceNote: string;
  melody: number[]; 
  rhythm: number[]; 
}

export interface SignCard {
  id: string;
  label: string;
  icon: LucideIcon;
  signIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  signDesc: string;
}

export type TabType = 'music' | 'monitor' | 'mimic' | 'story';