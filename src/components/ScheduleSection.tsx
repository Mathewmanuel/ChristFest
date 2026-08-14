import React from 'react';
import { SCHEDULE_DATA, TAMIL_SCHEDULE_DATA, CII_INFO } from '../data/eventData';
import { GoldDivider, GreekKeyBorder } from './GreekKeyBorder';
import { Calendar, Clock, MapPin, User, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sacredAudio } from '../lib/audio';

export const ScheduleSection: React.FC = () => {
  const { language, t } = useLanguage();
  const currentSchedule = language === 'ta' ? TAMIL_SCHEDULE_DATA : SCHEDULE_DATA;

  return (
    <section id="schedule" className="relative py-24 bg-[#04120d] text-white overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37] text-xs font-serif uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold">{language === 'ta' ? 'உத்தேச நிகழ்வு நிரல் • TENTATIVE EVENT SCHEDULE' : 'TENTATIVE EVENT SCHEDULE • SUBJECT TO UPDATES'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-gold-gradient tracking-tight my-2">
            {language === 'ta' ? 'கிறிஸ்ட்ஃபெஸ்ட் ’26 உத்தேச நிகழ்வு நிரல்' : 'ChristFest ’26 Tentative Event Schedule'}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            {language === 'ta'
              ? 'அக்டோபர் 2, 2026 (வெள்ளிக்கிழமை) • TELC கிறிஸ்துநாதர் ஆலயம், தாம்பரம் • காலை 9:00 முதல் மாலை 6:00 வரை'
              : 'OCTOBER 2, 2026 (FRIDAY) • TELC CHRIST CHURCH TAMBARAM • 9:00 AM TO 6:00 PM'}
          </p>

          <GoldDivider />
        </div>

        {/* Schedule Date Banner */}
        <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-xl dark-monument-card border border-[#D4AF37]/60 mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="font-serif font-bold text-sm text-[#D4AF37] block">
                {language === 'ta' ? 'அக்டோபர் 2, வெள்ளிக்கிழமை • காலை 9:00 மணி' : 'OCT 2ND, FRIDAY • AT 9:00 AM'}
              </span>
              <span className="text-xs text-stone-300 font-sans">
                {language === 'ta' ? 'செய்தியாளர்: அருள்திரு. C. W. ஜார்ஜ் • முழு நாள் நிகழ்வு நிரல்' : 'Message by Rev. C. W. George • Full-Day Event Schedule'}
              </span>
            </div>
          </div>

          {/* Clickable Venue Location in Google Maps */}
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-serif hover:bg-[#D4AF37] hover:text-[#0a0f0d] transition-all cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'TELC கிறிஸ்துநாதர் ஆலயம், தாம்பரம்' : 'TELC Christ Church, Tambaram'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Schedule List */}
        <div className="dark-monument-card rounded-2xl p-6 sm:p-10 border-2 border-[#D4AF37] relative shadow-2xl">
          <GreekKeyBorder height={18} color="#D4AF37" className="mb-6" />

          <div className="space-y-6">
            {currentSchedule.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#062c22]/60 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Time & Title Info */}
                <div className="space-y-1 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0B3D2E] text-[#D4AF37] font-serif font-bold text-xs border border-[#D4AF37]/40 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-[#A7F3D0] font-serif text-[10px] uppercase">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors pt-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 font-serif pt-2">
                    <a
                      href={CII_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#D4AF37] hover:underline"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {item.location}
                    </a>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {item.speakerOrLeader}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <GreekKeyBorder height={18} color="#D4AF37" className="mt-8" />
        </div>
      </div>
    </section>
  );
};

