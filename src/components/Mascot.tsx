import React from 'react';

interface MascotProps {
  type?: 'float' | 'wiggle' | 'static';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Mascot: React.FC<MascotProps> = ({ type = 'static', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-32 h-32',
    lg: 'w-64 h-64'
  };

  const animationClasses = {
    float: 'animate-float',
    wiggle: 'animate-wiggle',
    static: ''
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${animationClasses[type]} ${className}`}>
      {/* Abstract Owl using SVG Shapes for Kid-Friendly Look */}
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <circle cx="100" cy="110" r="80" fill="#BA68C8" />
        <circle cx="100" cy="110" r="70" fill="#CE93D8" />
        
        {/* Ears */}
        <path d="M40 50 L70 90 L30 100 Z" fill="#BA68C8" />
        <path d="M160 50 L130 90 L170 100 Z" fill="#BA68C8" />
        
        {/* Wings */}
        <path d="M20 120 Q5 140 30 160" stroke="#9C27B0" strokeWidth="8" strokeLinecap="round" />
        <path d="M180 120 Q195 140 170 160" stroke="#9C27B0" strokeWidth="8" strokeLinecap="round" />

        {/* Belly Feathers */}
        <path d="M80 140 Q100 150 120 140" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
        <path d="M85 155 Q100 165 115 155" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>

        {/* Eyes (Big and Cute) */}
        <circle cx="75" cy="90" r="25" fill="white" stroke="#333" strokeWidth="3" />
        <circle cx="125" cy="90" r="25" fill="white" stroke="#333" strokeWidth="3" />
        <circle cx="75" cy="90" r="10" fill="#333" />
        <circle cx="125" cy="90" r="10" fill="#333" />
        <circle cx="78" cy="86" r="3" fill="white" />
        <circle cx="128" cy="86" r="3" fill="white" />

        {/* Beak */}
        <path d="M90 110 L110 110 L100 130 Z" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="2" />
        
        {/* Feet */}
        <path d="M80 190 L90 190" stroke="#FF6F61" strokeWidth="8" strokeLinecap="round" />
        <path d="M110 190 L120 190" stroke="#FF6F61" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Mascot;