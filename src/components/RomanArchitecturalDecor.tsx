import React from 'react';
import { Landmark, Shield, Sparkles, Award } from 'lucide-react';

// Golden Laurel Wreath Badge with Chi-Rho or Roman Numeral Crest
export const RomanLaurelWreathBadge: React.FC<{
  title?: string;
  subtitle?: string;
  className?: string;
}> = ({ title = '35 YEARS OF CHRISTFEST', subtitle = 'MMXXVI', className = '' }) => (
  <div className={`inline-flex flex-col items-center justify-center p-3 relative select-none ${className}`}>
    <div className="flex items-center justify-center gap-3">
      {/* Left Golden Laurel Branch */}
      <svg viewBox="0 0 40 80" className="w-8 h-16 text-[#D4AF37] fill-current drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
        <path d="M35 75 C10 60 5 35 20 10 C22 18 15 28 22 38 C28 48 20 58 35 75 Z" opacity="0.85" />
        <circle cx="15" cy="20" r="2.5" />
        <circle cx="12" cy="35" r="2.5" />
        <circle cx="18" cy="50" r="2.5" />
        <circle cx="28" cy="65" r="2.5" />
      </svg>

      {/* Center Shield / Crest */}
      <div className="flex flex-col items-center px-4 py-1.5 bg-gradient-to-b from-[#0B3D2E] via-[#082b20] to-[#04120d] border-2 border-[#D4AF37] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)]">
        <span className="text-[10px] font-serif font-extrabold text-[#D4AF37] uppercase tracking-[0.25em]">
          {subtitle}
        </span>
        <span className="text-xs font-serif font-bold text-white uppercase tracking-wider">
          {title}
        </span>
      </div>

      {/* Right Golden Laurel Branch */}
      <svg viewBox="0 0 40 80" className="w-8 h-16 text-[#D4AF37] fill-current drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] transform scale-x-[-1]">
        <path d="M35 75 C10 60 5 35 20 10 C22 18 15 28 22 38 C28 48 20 58 35 75 Z" opacity="0.85" />
        <circle cx="15" cy="20" r="2.5" />
        <circle cx="12" cy="35" r="2.5" />
        <circle cx="18" cy="50" r="2.5" />
        <circle cx="28" cy="65" r="2.5" />
      </svg>
    </div>
  </div>
);

// Grand Roman Aqueduct / Triumphal Arch Section Header Frame
export const RomanAqueductArchHeader: React.FC<{
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ title, subtitle, className = '' }) => (
  <div className={`relative w-full max-w-4xl mx-auto my-8 text-center select-none ${className}`}>
    {/* Architectural Pediment Top Arch */}
    <div className="relative mx-auto w-full flex flex-col items-center">
      {/* Triangular Temple Tympanum Top */}
      <svg viewBox="0 0 800 90" fill="none" className="w-full h-auto text-[#D4AF37]">
        {/* Outer Temple Roof Pediment */}
        <path d="M20 80 L400 10 L780 80" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M40 85 L400 20 L760 85" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Central Keystone Boss Medallion */}
        <g transform="translate(400, 20)">
          <polygon points="0,-12 18,-4 14,22 -14,22 -18,-4" fill="#0B3D2E" stroke="currentColor" strokeWidth="2" />
          <text x="0" y="10" textAnchor="middle" fill="#D4AF37" fontSize="10" fontWeight="bold" fontFamily="serif">
            SPQR
          </text>
        </g>

        {/* Acanthus Scrolls inside Tympanum */}
        <path d="M120 70 C200 40 280 80 340 40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M680 70 C600 40 520 80 460 40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>

      {/* Main Arch Inscription Block */}
      <div className="w-full py-4 px-6 bg-gradient-to-r from-[#0B3D2E]/90 via-[#0a0f0d] to-[#0B3D2E]/90 border-x-2 border-y border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {subtitle && (
          <p className="text-xs sm:text-sm font-serif font-semibold tracking-[0.3em] text-[#A7F3D0] uppercase mb-1">
            {subtitle}
          </p>
        )}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight text-gold-gradient drop-shadow-md">
          {title}
        </h2>
      </div>

      {/* Arch Bottom Frieze Border */}
      <div className="w-full h-2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />
    </div>
  </div>
);

// Roman Marble Niche with Sculpted Statue Bust
export const RomanMarbleBustNiche: React.FC<{
  title: string;
  role: string;
  description: string;
  imageSrc?: string;
  className?: string;
}> = ({ title, role, description, className = '' }) => (
  <div
    className={`relative group p-6 rounded-3xl bg-gradient-to-b from-[#0B3D2E]/80 via-[#04120d] to-[#020a07] border-2 border-[#D4AF37]/50 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:border-[#D4AF37] transition-all duration-500 ${className}`}
  >
    {/* Roman Arch Wall Niche Frame */}
    <div className="relative w-full h-56 rounded-t-full rounded-b-xl border-4 border-[#D4AF37]/40 bg-[#020805] overflow-hidden flex items-center justify-center shadow-inner my-2">
      {/* Background Stained Glass Cathedral / Niche Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#10B981]/30 via-transparent to-transparent opacity-60" />

      {/* Sculpted Roman Statue Bust Graphic */}
      <svg viewBox="0 0 200 240" className="w-40 h-52 text-[#E2E8F0] filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] transform group-hover:scale-110 transition-transform duration-500">
        <defs>
          <linearGradient id="marbleSculptGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <radialGradient id="goldCrownHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Golden Saint / Emperor Halo */}
        <circle cx="100" cy="85" r="55" fill="url(#goldCrownHalo)" />

        {/* Marble Plinth Pedestal */}
        <rect x="50" y="200" width="100" height="25" rx="4" fill="url(#marbleSculptGrad)" stroke="#D4AF37" strokeWidth="1" />
        <rect x="65" y="185" width="70" height="18" fill="url(#marbleSculptGrad)" />

        {/* Sculpted Toga Chest */}
        <path d="M40 185 C40 135 160 135 160 185 Z" fill="url(#marbleSculptGrad)" stroke="#94A3B8" strokeWidth="1" />
        <path d="M50 145 C80 175 120 175 150 145" stroke="#475569" strokeWidth="2" fill="none" />
        <path d="M60 155 C90 180 110 180 140 155" stroke="#475569" strokeWidth="1.5" fill="none" />

        {/* Neck */}
        <rect x="85" y="115" width="30" height="30" rx="6" fill="url(#marbleSculptGrad)" />

        {/* Sculpted Head */}
        <ellipse cx="100" cy="85" rx="32" ry="42" fill="url(#marbleSculptGrad)" />

        {/* Roman Laurel Crown */}
        <path d="M70 70 C80 55 120 55 130 70" stroke="#D4AF37" strokeWidth="4" fill="none" />
        <circle cx="70" cy="70" r="4" fill="#FBBF24" />
        <circle cx="130" cy="70" r="4" fill="#FBBF24" />
      </svg>
    </div>

    {/* Niche Inscription Plaque */}
    <div className="text-center mt-4">
      <span className="text-[10px] font-serif tracking-[0.2em] text-[#D4AF37] uppercase block font-bold">
        {role}
      </span>
      <h3 className="text-lg font-serif font-extrabold text-white my-1">
        {title}
      </h3>
      <p className="text-xs text-stone-300 font-sans leading-relaxed line-clamp-3">
        {description}
      </p>
    </div>
  </div>
);
