import React, { useState } from 'react';
import { EVENTS_DATA, TAMIL_EVENTS_DATA } from '../data/eventData';
import { EventItem } from '../types';
import { GoldDivider, GreekKeyBorder } from './GreekKeyBorder';
import { Award, Music, Theater, BookOpen, Users, Palette, Sparkles, Search, Clock, MapPin, X, Trophy, Phone, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EventsSectionProps {}

export const EventsSection: React.FC<EventsSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const { language, t } = useLanguage();

  const currentEvents = language === 'ta' ? TAMIL_EVENTS_DATA : EVENTS_DATA;
  const activeEvent = activeModalEvent ? (currentEvents.find(e => e.id === activeModalEvent.id) || activeModalEvent) : null;

  const categories = language === 'ta' ? [
    { id: 'all', label: 'அனைத்து போட்டிகள் (All)' },
    { id: 'biblical', label: 'வேதம் & பிரசங்கம்' },
    { id: 'music', label: 'குழுப் பாடல் (Music)' },
    { id: 'drama', label: 'குறும்படம் & நாடகம்' },
    { id: 'arts', label: 'கலை & போஸ்டர்' },
  ] : [
    { id: 'all', label: 'All 7 Events' },
    { id: 'biblical', label: 'Preaching & Scripture' },
    { id: 'music', label: 'Music & Choral' },
    { id: 'drama', label: 'Short Film & Drama' },
    { id: 'arts', label: 'Poster & Fine Arts' },
  ];

  const filteredEvents = currentEvents.filter((e) => {
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getEventIcon = (name: string) => {
    switch (name) {
      case 'Music':
      case 'Mic':
        return <Music className="w-5 h-5 text-[#D4AF37]" />;
      case 'Theater':
        return <Theater className="w-5 h-5 text-[#D4AF37]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#D4AF37]" />;
      case 'Users':
      case 'Flame':
        return <Users className="w-5 h-5 text-[#D4AF37]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <Award className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="events" className="relative py-24 bg-[#04120d] text-white overflow-hidden scroll-mt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div id="competitions-header" className="text-center mb-10 scroll-mt-24 sm:scroll-mt-28">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-serif uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('events.header', 'GRAND COMPETITIONS & TALENT FEST')}</span>
          </div>

          <h2 id="competitions-title" className="text-3xl sm:text-5xl font-serif font-extrabold text-gold-gradient tracking-tight my-2 scroll-mt-24 sm:scroll-mt-28">
            {t('events.title', '35th Anniversary ChristFest Competitions')}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            {t('events.desc', 'Click any plaque to inspect event rules, prize categories, guidelines, and venue schedules.')}
          </p>

          <GoldDivider />
        </div>

        {/* Search & Category Filter Control Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Category Selector Tabs with Smooth Horizontal Touch Scroll */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 pt-1 px-1 flex items-center justify-start md:justify-center gap-2 no-scrollbar scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-serif font-semibold uppercase tracking-wider transition-all border shrink-0 min-h-[38px] active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B3D2E] text-[#D4AF37] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-105'
                    : 'bg-[#0a0f0d] text-stone-300 border-stone-800 hover:border-[#D4AF37]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('events.searchPlaceholder', 'Search competitions or keywords...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-[#0a0f0d] border border-[#D4AF37]/40 text-stone-200 text-xs focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-stone-500 min-h-[40px]"
            />
          </div>
        </div>

        {/* Event Plaques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setActiveModalEvent(event)}
              className="marble-card rounded-2xl p-5 sm:p-6 border-2 border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all duration-200 cursor-pointer shadow-xl active:scale-[0.98] active:border-[#D4AF37] hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden select-none"
            >
              {/* Top Accent Greek Meander Pattern */}
              <div className="mb-2.5 sm:mb-3">
                <GreekKeyBorder height={12} color="#F59E0B" />
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#0B3D2E] border border-[#D4AF37] shadow-inner">
                    {getEventIcon(event.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#0B3D2E]/90 text-[#D4AF37] font-serif font-bold text-[10px] uppercase border border-[#D4AF37]/30">
                    {event.categoryLabel}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base sm:text-lg text-[#0B3D2E] group-hover:text-[#D4AF37] transition-colors leading-snug my-1">
                  {event.title}
                </h3>

                <p className="text-xs text-stone-700 font-sans line-clamp-2 my-2 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#D4AF37]/30 space-y-2 text-xs text-stone-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span className="font-medium text-stone-700 truncate max-w-[140px] sm:max-w-[160px]">{event.venue}</span>
                  </div>
                  <span className="font-serif font-bold text-[#0B3D2E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t('events.btnRules', 'View Rules')} <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal View for Event Guidelines */}
        {activeEvent && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 pt-20 sm:pt-24 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="marble-card max-w-2xl w-full rounded-2xl p-4 sm:p-8 border-2 border-[#D4AF37] shadow-2xl relative my-auto max-h-[88vh] sm:max-h-[85vh] overflow-y-auto">
              {/* Sticky Top Header Bar inside Modal so Close Button is Always Visible */}
              <div className="sticky top-0 z-30 bg-[#fbf9f4]/98 backdrop-blur-md pb-2.5 mb-3 border-b border-[#D4AF37]/40 flex items-center justify-between gap-3 -mx-2 px-2 pt-1">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 rounded-lg bg-[#0B3D2E] border border-[#D4AF37] shrink-0">
                    {getEventIcon(activeEvent.iconName)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#F59E0B] font-bold block truncate">
                      {activeEvent.categoryLabel}
                    </span>
                    <h3 className="font-serif font-extrabold text-base sm:text-xl text-[#0B3D2E] truncate">
                      {activeEvent.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="p-2 sm:p-2.5 rounded-full bg-[#0B3D2E] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0f0d] transition-all shadow-md shrink-0 flex items-center justify-center min-h-[44px] min-w-[44px]"
                  title="Close Guidelines"
                  aria-label="Close Guidelines"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <GreekKeyBorder height={14} color="#F59E0B" className="mb-4" />

              <p className="text-sm text-stone-700 font-sans my-4 leading-relaxed">
                {activeEvent.description}
              </p>

              {/* Event Meta Details */}
              <div className="grid sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/90 border border-[#D4AF37]/40 my-4 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <div>
                    <span className="block text-stone-500 font-serif">{t('events.timeLabel', 'Time Slot:')}</span>
                    <span className="font-bold text-[#0B3D2E]">{activeEvent.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <div>
                    <span className="block text-stone-500 font-serif">{t('events.venueLabel', 'Venue Location:')}</span>
                    <span className="font-bold text-[#0B3D2E]">{activeEvent.venue}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:col-span-1">
                  <Trophy className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <div>
                    <span className="block text-stone-500 font-serif">{t('events.prizeLabel', 'Honors & Awards:')}</span>
                    <span className="font-bold text-[#0B3D2E]">{activeEvent.awards}</span>
                  </div>
                </div>
              </div>

              {/* Event Rules List */}
              <div className="my-4">
                <h4 className="font-serif font-bold text-sm text-[#0B3D2E] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  {language === 'ta' ? 'விதிமுறைகள் & வழிகாட்டுதல்கள்' : 'Rules & Event Guidelines'}
                </h4>
                <ul className="space-y-2 text-xs text-stone-700 font-sans">
                  {activeEvent.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons - Removed Register Team button as requested */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#0B3D2E] font-serif font-semibold">
                  <Trophy className="w-4 h-4 text-[#F59E0B]" />
                  <span>{activeEvent.awards}</span>
                </div>
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="px-5 py-2.5 rounded-lg bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#041E15] transition-all min-h-[44px]"
                >
                  {language === 'ta' ? 'மூடுக' : 'Close Guidelines'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

