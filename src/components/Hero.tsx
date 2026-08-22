import React, { useState } from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { MobilePillars3D } from './MobilePillars3D';
import { GreekKeyBorder, GoldDivider } from './GreekKeyBorder';
import { RomanLaurelWreathBadge } from './RomanArchitecturalDecor';
import { Calendar, MapPin, Sparkles, Compass, ShieldCheck, Play, ExternalLink } from 'lucide-react';
import { sacredAudio } from '../lib/audio';
import { CII_INFO } from '../data/eventData';
import { useLanguage } from '../context/LanguageContext';
import stainedGlassLight from '../assets/images/stained_glass_light_1785817990370.jpg';

interface HeroProps {
  onExploreEvents: () => void;
  onExploreSchedule?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreEvents }) => {
  const [columnGlow, setColumnGlow] = useState(false);
  const { language, t } = useLanguage();

  const handleColumnTouch = () => {
    setColumnGlow(true);
    sacredAudio.playChime();
    setTimeout(() => setColumnGlow(false), 2000);
  };

  const handleScrollToSchedule = () => {
    const el = document.getElementById('schedule');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 flex items-center justify-center overflow-hidden bg-[#04120d] text-white">
      {/* Background Stained Glass Light Shafts Image Overlay with CSS Gradient fallback */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none bg-gradient-to-b from-[#0B3D2E]/50 via-transparent to-[#04120d]">
        <img
          src={stainedGlassLight}
          alt="Church Stained Glass Divine Light"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>

      {/* Art Nouveau Radial Sunlight Beam FX */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0B3D2E]/40 via-transparent to-[#0a0f0d]" />

      {/* Three.js Interactive 3D Background Canvas */}
      <div className="hidden md:block absolute inset-0 z-0">
        <ThreeCanvas onColumnTouch={handleColumnTouch} />
      </div>
      <div className="block md:hidden absolute inset-0 z-0 opacity-80">
        <MobilePillars3D onColumnTouch={handleColumnTouch} />
      </div>

      {/* Hero Foreground Content Layer */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-2 sm:mt-6">
        {/* Top Roman Laurel Wreath Badge Header */}
        <div className="flex justify-center mb-2">
          <RomanLaurelWreathBadge
            title={t('hero.badge', '35th Edition • ChristFest')}
            subtitle="MMXXVI"
          />
        </div>

        {/* Botanical Flourish & Greek Frame */}
        <div className="my-2">
          <GreekKeyBorder height={20} color="#D4AF37" className="opacity-80" />
        </div>

        {/* Monumental Inscription Title */}
        <div
          onClick={handleColumnTouch}
          className={`py-5 sm:py-6 px-3 sm:px-6 rounded-2xl bg-[#0a0f0d]/85 backdrop-blur-md border transition-all duration-500 shadow-2xl my-3 sm:my-4 cursor-pointer select-none active:scale-[0.99] ${
            columnGlow
              ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-[#0c241b]/95'
              : 'border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
          }`}
        >
          <h2 className="text-[11px] sm:text-sm font-serif tracking-wider sm:tracking-[0.2em] text-[#A7F3D0] uppercase mb-1.5 sm:mb-2 leading-relaxed break-words px-2 text-center">
            {t('hero.subTitle', 'Christava Illaignar Iyakkam (CII) of TELC Christ Church Tambaram Presents')}
          </h2>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-extrabold tracking-tight text-gold-gradient drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] my-1.5 sm:my-2">
            {t('hero.mainTitle', 'KLESIS 2026')}
          </h1>

          <div className="text-xs sm:text-2xl font-serif font-semibold text-stone-200 tracking-wider my-2 sm:my-3 flex items-center justify-center gap-1.5 sm:gap-3 px-1">
            <span className="h-[1px] w-4 sm:w-12 bg-[#D4AF37] shrink-0" />
            <span className="break-words text-center">{t('hero.themeBadge', 'The Heavenly Calling (KLESIS)')}</span>
            <span className="h-[1px] w-4 sm:w-12 bg-[#D4AF37] shrink-0" />
          </div>

          <p className="max-w-2xl mx-auto text-xs sm:text-base text-stone-300 font-sans italic my-2 sm:my-4 leading-relaxed px-1">
            “{t('hero.tagline', 'Fight the good fight of the faith. Take hold of the eternal life to which you were called...')}”
            <span className="block text-[11px] sm:text-xs text-[#D4AF37] not-italic mt-1 font-serif font-medium">
              — {t('hero.scriptureRef', '1 Timothy 6:12–14')}
            </span>
          </p>
        </div>

        <GoldDivider className="my-3 sm:my-4" />

        {/* Event Quick Meta Badges */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-serif my-4 sm:my-6 text-stone-200">
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[#0B3D2E]/80 border border-[#D4AF37]/40 shadow-md">
            <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{t('hero.dateVal', 'Friday, Oct 2, 2026')}</span>
          </div>

          <a
            href={CII_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              sacredAudio.playChime();
              try {
                window.open(CII_INFO.mapsUrl, '_blank', 'noopener,noreferrer');
              } catch {
                window.location.href = CII_INFO.mapsUrl;
              }
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[#0B3D2E]/80 border border-[#D4AF37]/40 shadow-md hover:bg-[#D4AF37] hover:text-[#0a0f0d] transition-all text-center cursor-pointer group"
            title="Open location in Google Maps"
          >
            <MapPin className="w-4 h-4 text-[#D4AF37] group-hover:text-[#0a0f0d] shrink-0" />
            <span className="break-words text-xs">{t('hero.venueVal', 'TELC Christ Church Campus, Tambaram')}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
          </a>

          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[#0B3D2E]/80 border border-[#D4AF37]/40 shadow-md">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{t('hero.milestoneVal', '35 Years of ChristFest (1991–2026)')}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-md sm:max-w-2xl mx-auto mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <button
              id="hero-explore-btn"
              onClick={onExploreEvents}
              className="w-full sm:flex-1 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#0B3D2E]/90 border-2 border-[#F59E0B] text-[#FEF08A] font-serif font-bold text-sm sm:text-base uppercase tracking-widest shadow-xl hover:bg-[#F59E0B] hover:text-[#04120d] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-[#FEF08A]" />
              {t('hero.btnExplore', 'Explore Competitions')}
            </button>

            <button
              id="hero-schedule-btn"
              onClick={handleScrollToSchedule}
              className="w-full sm:flex-1 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#0B3D2E]/90 border-2 border-[#F59E0B] text-[#FEF08A] font-serif font-bold text-sm sm:text-base uppercase tracking-widest shadow-xl hover:bg-[#F59E0B] hover:text-[#04120d] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#FEF08A]" />
              {language === 'ta' ? 'நிகழ்வு நிரல் காண்க' : 'View Event Schedule'}
            </button>
          </div>

          {/* Long Golden Click to Register Bar */}
          <a
            id="hero-register-banner-btn"
            href="https://forms.gle/bsHNv3r6JjnoNkj27"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sacredAudio.playChime()}
            className="group relative w-full px-6 sm:px-8 py-4 sm:py-4.5 rounded-xl bg-gradient-to-r from-[#F59E0B] via-[#FFFBEB] to-[#F59E0B] border-2 border-[#FFFDF0] text-[#051a12] font-serif font-extrabold text-base sm:text-lg md:text-xl uppercase tracking-wider sm:tracking-widest shadow-[0_10px_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(253,224,71,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 min-h-[54px] text-center overflow-hidden block cursor-pointer"
            title="Open KLESIS 2026 Registration"
          >
            {/* Ambient shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#04120d] group-hover:scale-110 group-hover:rotate-12 transition-transform shrink-0" />
            
            <span className="font-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              {language === 'ta' ? 'பதிவு செய்ய இங்கே கிளிக் செய்யவும்' : 'Click to Register'}
            </span>

            <ExternalLink className="w-5 h-5 text-[#04120d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};


