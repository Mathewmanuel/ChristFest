import React, { useState } from 'react';
import { GoldDivider } from './GreekKeyBorder';
import { Church, Sparkles, ChevronRight, Award, BookOpenCheck, X } from 'lucide-react';
import { Altar3DViewer } from './Altar3DViewer';
import { GoldenButterflies } from './GoldenButterflies';
import { sacredAudio } from '../lib/audio';
import { useLanguage } from '../context/LanguageContext';
import marbleTexture from '../assets/images/marble_texture_gold_1785817976745.jpg';

export const AboutSection: React.FC = () => {
  const [isCiiModalOpen, setIsCiiModalOpen] = useState(false);
  const [butterflyTriggerKey, setButterflyTriggerKey] = useState(0);
  const { language } = useLanguage();

  const handleOpenCiiModal = () => {
    setIsCiiModalOpen(true);
    setButterflyTriggerKey(Date.now());
    sacredAudio.playChime();
  };

  const milestoneTimeline = language === 'ta' ? [
    { year: '1991', title: 'தொடக்கக் காலம்', desc: 'தாம்பரம் TELC ஆலயத்தில் கிறிஸ்தவ இளைஞர் இயக்கம் (CII) கிறிஸ்ட்ஃபெஸ்ட் (ChristFest) நிகழ்வை நிறுவியது.' },
    { year: '2000', title: 'புதிய நூற்றாண்டு', desc: 'புதிய நூற்றாண்டில் பிரமாண்டமான தொடக்கம்! தமிழக இளைஞர் பாடகர் குழுக்கள் மற்றும் சுவிசேஷ இசைப் போட்டிகளுடன் புதிய உச்சம் தொட்டது.' },
    { year: '2011', title: 'வெள்ளி விழா (25-வது)', desc: 'தமிழ்நாடெங்கிலுமிருந்து திரளான இளைஞர்களின் உற்சாகப் பங்கேற்புடன் 25-வது வெள்ளி விழாவை மிகச் சிறப்பாகக் கொண்டாடியது.' },
    { year: '2020', title: 'இணையவழி ஐக்கியம்', desc: 'சவாலான காலத்திலும் இளைஞர்களை இணைய வழியில் ஒருங்கிணைத்தது.' },
    { year: '2026', title: '35-வது வரலாற்று மைல்கல்', desc: '1 தீமோத்தேயு 6:12–14 மையப் கருப்பொருளில் 35-வது கிளீசிஸ் கிறிஸ்ட்ஃபெஸ்ட் கொண்டாட்டம்.' },
  ] : [
    { year: '1991', title: 'The Genesis', desc: 'CII established ChristFest at TELC Christ Church Tambaram, building on its rich legacy of youth ministry.' },
    { year: '2000', title: 'The New Millennium', desc: 'Entered the new millennium with a bang! Expanded across youth fellowships with musical and choir competitions.' },
    { year: '2011', title: 'Silver Jubilee (25th)', desc: 'Celebrated 25 years with much pomp with a large number of participants from all over Tamil Nadu.' },
    { year: '2020', title: 'Digital Fellowship', desc: 'Adapted during global challenges to connect youth members virtually.' },
    { year: '2026', title: '35th KLESIS Milestone', desc: 'The monumental 35th Edition of ChristFest celebrating the theme of 1 Timothy 6:12–14.' },
  ];

  const ciiHighlights = language === 'ta' ? [
    {
      title: '35 ஆண்டுகள் கிறிஸ்ட்ஃபெஸ்ட் (1991–2026)',
      description: 'கிறிஸ்தவ வாலிபர்களின் ஆவிக்குரிய விசுவாசம், பாடகர் குழு இசை மற்றும் வேத அறிவை வளர்க்கும் 35 வரலாற்றுச் சிறப்புமிக்க கிறிஸ்ட்ஃபெஸ்ட் பதிப்புகள்.',
    },
    {
      title: 'கிறிஸ்தவ இளைஞர் இயக்கம் (CII)',
      description: 'தாம்பரம் TELC ஆலயத்தின் பல தசாப்த கால நீண்ட வரலாறும் ஆன்மீகப் பாரம்பரியமும் கொண்ட சுறுசுறுப்பான இளைஞர் அமைப்பு.',
    },
    {
      title: 'பாடகர் குழு & நற்செய்தி பணி',
      description: 'செவ்வியல் பாடகர் குழு இசை மரபு, வேத வினாடி வினா, இளைஞர் தலைமைத்துவம் மற்றும் நற்செய்திப் பணியில் இளைஞர்களை வழிநடத்துகிறது.',
    },
  ] : [
    {
      title: '35 Historic Years of ChristFest (1991–2026)',
      description: '35 landmark editions of ChristFest empowering Christian youth in spiritual faith, choral worship, and biblical truth.',
    },
    {
      title: 'Christava Illaignar Iyakkam (CII)',
      description: 'The long-standing youth fellowship of TELC Christ Church Tambaram, possessing decades of unbroken spiritual ministry.',
    },
    {
      title: 'Musical Excellence & Gospel Outreach',
      description: 'Fostering classical choral traditions, biblical trivia, youth leadership, and community service across Tamil Nadu.',
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#04120d] text-white overflow-hidden">
      {/* Background Marble Pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-gradient-to-b from-[#04120d] via-[#082a1f] to-[#04120d]">
        <img
          src={marbleTexture}
          alt="Marble Texture Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2 flex flex-col items-center justify-center">
          <div className="inline-flex max-w-full items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/50 text-[11px] sm:text-xs font-serif uppercase tracking-wider mb-3 shadow-md text-center">
            <Church className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="break-words">{language === 'ta' ? '35 ஆண்டுகள் கிறிஸ்ட்ஃபெஸ்ட் (1991–2026)' : '35 Years of ChristFest (1991–2026)'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-gold-gradient tracking-tight my-2 break-words text-center leading-tight mx-auto">
            {language === 'ta' ? '35 ஆண்டுகள் கிறிஸ்ட்ஃபெஸ்ட்' : '35 Years of ChristFest'}
          </h2>
          <p className="text-stone-300 text-xs sm:text-base max-w-3xl mx-auto font-sans leading-relaxed mt-2 font-medium text-center">
            {language === 'ta'
              ? 'தாம்பரம் TELC கிறிஸ்துநாதர் ஆலயத்தின் நீண்டகால கிறிஸ்தவ இளைஞர் இயக்கம் (CII) பெருமையுடன் வழங்கும் 35-வது வரலாற்றுச் சிறப்புமிக்க கிறிஸ்ட்ஃபெஸ்ட் (1991–2026)'
              : '35 Landmark Years of ChristFest (1991–2026) organized by Christava Illaignar Iyakkam (CII) of TELC Christ Church Tambaram'}
          </p>

          <div className="w-full flex justify-center mt-2">
            <GoldDivider />
          </div>
        </div>

        {/* Center: 3D 35th Anniversary Altar & Logo Viewer */}
        <div className="w-full max-w-4xl mx-auto mb-6">
          <Altar3DViewer />
        </div>

        {/* Explore Full 35-Year History Button */}
        <div className="mt-2 w-full max-w-md mx-auto">
          <button
            onClick={handleOpenCiiModal}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0B3D2E] via-[#D4AF37] to-[#0B3D2E] text-[#04120d] font-serif font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-[#FFE67C] group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#04120d] animate-pulse" />
            <span>
              {language === 'ta'
                ? '35 ஆண்டுகால வரலாற்று ஆவணக் குறிப்பு'
                : 'VIEW FULL 35-YEAR ARCHIVE & RECORD'}
            </span>
            <ChevronRight className="w-5 h-5 text-[#04120d] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 35-YEAR HISTORY POP-UP MODAL WITH GOLDEN BUTTERFLIES */}
      {isCiiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto">
          <div className="relative max-w-4xl w-full my-auto bg-gradient-to-b from-[#082a1f] via-[#041610] to-[#020d09] rounded-3xl border-2 border-[#D4AF37] p-5 sm:p-8 shadow-[0_0_60px_rgba(212,175,55,0.4)] text-white overflow-hidden max-h-[90vh] flex flex-col justify-between">
            {/* FLOATING GOLDEN BUTTERFLIES */}
            <GoldenButterflies active={isCiiModalOpen} key={butterflyTriggerKey} count={28} />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#D4AF37]/40 pb-4 mb-4 relative z-20">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/50 text-[10px] sm:text-xs font-serif uppercase tracking-wider mb-2">
                  <Church className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>TELC Christ Church, Tambaram</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-gold-gradient tracking-tight">
                  {language === 'ta' ? '35 ஆண்டுகள் கிறிஸ்ட்ஃபெஸ்ட்' : '35 Years of ChristFest'}
                </h2>
                <p className="text-xs sm:text-sm text-[#A7F3D0] font-serif italic mt-0.5">
                  {language === 'ta'
                    ? '1991 – 2026: 35 ஆண்டுகள் ஆன்மீக இறைப்பணி & கிறிஸ்ட்ஃபெஸ்ட் கொண்டாட்டம்'
                    : '1991 – 2026: 35 Milestone Years of Youth Ministry, Spiritual Fellowship & Gospel Outreach'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCiiModalOpen(false)}
                  className="p-2 rounded-full bg-stone-800/80 text-stone-300 hover:text-white hover:bg-red-900/80 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="space-y-6 overflow-y-auto pr-2 relative z-20 custom-scrollbar">
              {/* History Highlights */}
              <div className="grid sm:grid-cols-3 gap-3">
                {ciiHighlights.map((hl, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#062c22]/90 border border-[#D4AF37]/40 shadow-lg">
                    <BookOpenCheck className="w-6 h-6 text-[#D4AF37] mb-2" />
                    <h4 className="font-serif font-bold text-xs text-[#D4AF37] uppercase tracking-wider mb-1">
                      {hl.title}
                    </h4>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed">
                      {hl.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* 35-Year Milestone Timeline */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-widest">
                    {language === 'ta' ? '35 ஆண்டுகள் வரலாற்று மைல்கற்கள் (1991–2026)' : '35-Year Historic Milestone Timeline (1991–2026)'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {milestoneTimeline.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0B3D2E]/80 border border-[#D4AF37]/40 text-stone-200"
                    >
                      <div className="font-serif font-extrabold text-xl text-[#D4AF37] mb-0.5">
                        {item.year}
                      </div>
                      <div className="font-serif font-bold text-xs text-[#A7F3D0] mb-1">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs text-stone-400 font-serif relative z-20">
              <span className="flex items-center gap-1 text-[#D4AF37]">
                1991 – 2026 TELC Christ Church Tambaram CII
              </span>
              <button
                onClick={() => setIsCiiModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/50 font-bold hover:bg-[#D4AF37] hover:text-[#04120d] transition-all cursor-pointer"
              >
                {language === 'ta' ? 'மூடுக' : 'Close Panel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
