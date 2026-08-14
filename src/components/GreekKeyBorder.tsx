import React from 'react';

interface GreekKeyBorderProps {
  className?: string;
  color?: string;
  height?: number;
}

export const GreekKeyBorder: React.FC<GreekKeyBorderProps> = ({
  className = '',
  color = '#D4AF37',
  height = 18,
}) => {
  return (
    <div className={`w-full overflow-hidden flex items-center justify-center ${className}`}>
      <svg
        className="w-full"
        height={height}
        preserveAspectRatio="none"
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="greek-meander-pattern" x="0" y="0" width="48" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M0 2H22V22H14V10H18V18H10V6H26V22H0"
            stroke={color}
            strokeWidth="2"
            fill="none"
            strokeLinecap="square"
          />
        </pattern>
        <rect width="1200" height="24" fill="url(#greek-meander-pattern)" />
      </svg>
    </div>
  );
};

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#0B3D2E]" />
      <div className="w-3.5 h-3.5 rotate-45 border-2 border-[#D4AF37] bg-[#D4AF37]" />
      <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#0B3D2E]" />
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </div>
  );
};
