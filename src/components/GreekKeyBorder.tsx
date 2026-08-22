import React, { useId } from 'react';

interface GreekKeyBorderProps {
  className?: string;
  color?: string;
  height?: number;
}

export const GreekKeyBorder: React.FC<GreekKeyBorderProps> = ({
  className = '',
  color = '#F59E0B',
  height = 18,
}) => {
  const patternId = useId().replace(/:/g, '-');

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
        <defs>
          <pattern id={`greek-meander-${patternId}`} x="0" y="0" width="48" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M0 2H22V22H14V10H18V18H10V6H26V22H0"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
        <rect width="1200" height="24" fill={`url(#greek-meander-${patternId})`} />
      </svg>
    </div>
  );
};

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
      <div className="w-2.5 h-2.5 rotate-45 border border-[#F59E0B] bg-[#0B3D2E]" />
      <div className="w-3.5 h-3.5 rotate-45 border-2 border-[#FEF08A] bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
      <div className="w-2.5 h-2.5 rotate-45 border border-[#F59E0B] bg-[#0B3D2E]" />
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
    </div>
  );
};
