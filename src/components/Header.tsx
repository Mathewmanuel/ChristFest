import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, BookOpen, Calendar, Award, Compass, Church, Languages, Menu, X } from 'lucide-react';
import { sacredAudio } from '../lib/audio';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    // Attempt auto-starting the sacred ambient soundscape on load
    sacredAudio.start();

    // Auto-unlock Web Audio context on the first user interaction (click/touch/scroll/key)
    const unlockAudioOnGesture = () => {
      sacredAudio.start();
      window.removeEventListener('click', unlockAudioOnGesture);
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('scroll', unlockAudioOnGesture);
      window.removeEventListener('keydown', unlockAudioOnGesture);
    };

    window.addEventListener('click', unlockAudioOnGesture, { passive: true });
    window.addEventListener('touchstart', unlockAudioOnGesture, { passive: true });
    window.addEventListener('scroll', unlockAudioOnGesture, { passive: true });
    window.addEventListener('keydown', unlockAudioOnGesture, { passive: true });

    return () => {
      window.removeEventListener('click', unlockAudioOnGesture);
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('scroll', unlockAudioOnGesture);
      window.removeEventListener('keydown', unlockAudioOnGesture);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false); // Hide floating bar on scroll down
      } else {
        setIsVisible(true);  // Show on scroll up or top
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const handleToggleAudio = () => {
    const playing = sacredAudio.toggleSound();
    setIsAudioPlaying(playing);
  };

  const navLinks = [
    { id: 'hero', label: t('nav.gateway', 'Gateway'), icon: Compass },
    { id: 'about', label: t('nav.about', 'TELC Church & CII'), icon: Church },
    { id: 'biblical', label: t('nav.biblical', 'Theme Scripture'), icon: BookOpen },
    { id: 'events', label: t('nav.events', 'Competitions'), icon: Award },
    { id: 'schedule', label: t('nav.schedule', 'Schedule'), icon: Calendar },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Floating Emerald Classical Temple Dock */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-2 sm:pt-3">
        <div className="bg-[#062017]/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-2xl px-3 sm:px-5 h-16 sm:h-20 flex items-center justify-between">
          {/* KLESIS 35th Brand Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#0B3D2E] to-[#041E15] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-[#D4AF37] text-sm sm:text-lg">35</span>
            </div>
            <div>
              <div className="font-serif tracking-widest text-sm sm:text-lg font-bold text-gold-gradient uppercase leading-none">
                {language === 'ta' ? 'கிளீசிஸ் 2026' : 'KLESIS 2026'}
              </div>
              <div className="text-[8px] sm:text-[10px] text-[#A7F3D0] tracking-wider uppercase mt-0.5">
                {language === 'ta' ? 'TELC தாம்பரம்' : 'TELC Christ Church'}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/60 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Controls: Language Toggle, Ambient Sound, Register & Mobile Menu Button */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Tamil / English Toggle Button */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch website language to Tamil (தமிழ்)' : 'Switch website language to English'}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#0B3D2E] to-[#041E15] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0f0d] transition-all flex items-center gap-1 text-[10px] sm:text-xs font-serif font-bold shadow-md active:scale-95 cursor-pointer"
            >
              <Languages className="w-3 h-3 text-[#D4AF37]" />
              <span className="tracking-wide">
                {language === 'en' ? 'தமிழ்' : 'EN'}
              </span>
            </button>

            {/* Ambient Church Sound Toggle (Desktop/Tablet) */}
            <button
              onClick={handleToggleAudio}
              title={isAudioPlaying ? 'Mute Sacred Organ & Choir Chimes' : 'Play Ambient Church Choir Soundscape'}
              className={`hidden sm:flex p-2 rounded-full border transition-all items-center gap-1 text-xs font-medium ${
                isAudioPlaying
                  ? 'bg-[#0B3D2E] border-[#D4AF37] text-[#D4AF37] animate-pulse-gold'
                  : 'bg-stone-900/80 border-stone-700 text-stone-400 hover:text-white hover:border-[#D4AF37]/50'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="hidden md:inline text-[11px]">{t('nav.soundOn', 'Sound On')}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden md:inline text-[11px]">{t('nav.soundOff', 'Sound Off')}</span>
                </>
              )}
            </button>



            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg bg-[#0B3D2E] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0f0d] transition-all lg:hidden ml-0.5 min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#061812]/98 backdrop-blur-xl border border-[#D4AF37]/50 rounded-2xl px-4 pt-3 pb-5 space-y-2 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between text-[10px] font-serif uppercase tracking-widest text-[#D4AF37] font-bold px-1 py-1 border-b border-stone-800">
              <span>{language === 'ta' ? 'வழிகாட்டி / வழிசெலுத்தல்' : 'Navigation Menu'}</span>
              
              {/* Mobile Sound Toggle Item */}
              <button
                onClick={handleToggleAudio}
                className="flex items-center gap-1 text-[#A7F3D0] hover:text-[#D4AF37]"
              >
                {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isAudioPlaying ? 'Sound ON' : 'Sound OFF'}</span>
              </button>
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-3 min-h-[44px] ${
                    isActive
                      ? 'bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37] shadow-md'
                      : 'text-stone-200 hover:bg-[#08231b] hover:text-[#D4AF37]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#D4AF37]" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

