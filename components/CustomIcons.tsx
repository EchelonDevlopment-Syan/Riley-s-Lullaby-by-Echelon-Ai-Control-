import React from 'react';

const strokeProps = { 
  stroke: "currentColor", 
  strokeWidth: "2", 
  strokeLinecap: "round" as const, 
  strokeLinejoin: "round" as const, 
  fill: "none" 
};

export const SignEat = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} {...strokeProps}>
    {/* Simple Face Profile */}
    <path d="M15 6C15 6 19 9 19 12C19 15 15 18 15 18" />
    {/* Hand moving to mouth */}
    <path d="M5 20L13 13" />
    {/* Fingers */}
    <circle cx="14" cy="12" r="2" fill="currentColor" fillOpacity="0.2" />
    <path d="M14 12L12 12" />
  </svg>
);

export const SignMore = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} {...strokeProps}>
    {/* Left Hand Shape */}
    <path d="M4 12C4 10 7 10 8 12C9 14 6 16 4 16C2 16 2 12 4 12Z" />
    {/* Right Hand Shape */}
    <path d="M20 12C20 10 17 10 16 12C15 14 18 16 20 16C22 16 22 12 20 12Z" />
    {/* Touch Point */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    {/* Movement Arrows */}
    <path d="M8 8L10 10" strokeWidth="1.5" />
    <path d="M16 8L14 10" strokeWidth="1.5" />
  </svg>
);

export const SignMilk = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} {...strokeProps}>
    {/* Fist */}
    <rect x="9" y="8" width="6" height="10" rx="2" />
    <path d="M9 12H15" />
    <path d="M9 15H15" />
    {/* Squeeze Action Arrows */}
    <path d="M5 12L7 13" strokeWidth="1.5" />
    <path d="M19 12L17 13" strokeWidth="1.5" />
  </svg>
);

export const SignAllDone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} {...strokeProps}>
    {/* Left Hand Open */}
    <path d="M5 10L7 6L9 10L7 14L5 10Z" />
    {/* Right Hand Open */}
    <path d="M19 10L17 6L15 10L17 14L19 10Z" />
    {/* Twist Arrows */}
    <path d="M7 16C7 16 5 18 9 18" strokeWidth="1.5" />
    <path d="M17 16C17 16 19 18 15 18" strokeWidth="1.5" />
  </svg>
);