import React, { useState } from 'react';
import { SCRIPTURES } from '../data/eventData';
import { ScripturePassage } from '../types';
import { GoldDivider, GreekKeyBorder } from './GreekKeyBorder';
import { BookOpen, Sparkles, Feather, Shield, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BiblicalSection: React.FC = () => {
  const [selectedPassage, setSelectedPassage] = useState<ScripturePassage>(SCRIPTURES[0]);
  const { language, t } = useLanguage();

  const tamilPassages: Record<string, { text: string; meaning: string }> = {
    '1 Timothy 6:12–14 (Full)': {
      text: 'விசுவாசத்தின் நல்ல போராட்டத்தைப் போராடு, நித்தியஜீவனைப் பற்றிக்கொள்; அதற்காகவே நீ அழைக்கப்பட்டாய்; அநேக சாட்சிகளுக்கு முன்பாக நல்ல அறிக்கைபண்ணினவனுமாயிருக்கிறாய். நம்முடைய கர்த்தராகிய இயேசுகிறிஸ்து பிரசன்னமாகும்வரைக்கும், நீ இந்தக் கற்பனையை மாசில்லாமலும் குற்றமில்லாமலும் கைக்கொள்ளும்படிக்கு, எல்லாவற்றையும் உயிரோடிருக்கச்செய்கிற தேவனுடைய சந்நிதானத்திலேயும், பொந்தியுபிலாத்துவின் முன்னின்று நல்ல அறிக்கையைச் சாட்சியாக விளங்கப்பண்ணின கிறிஸ்து இயேசுவினுடைய சந்நிதானத்திலேயும் உனக்குக் கட்டளையிடுகிறேன்.',
      meaning: 'கிளீசிஸ் தேவனின் அழைப்பின் முழுமையான வேதக் கட்டளை — விசுவாசத்தின் நல்ல போராட்டம், நித்தியஜீவனைப் பற்றிக்கொள்ளுதல், மற்றும் கிறிஸ்து இயேசுவின் வருகை வரை கறையற்ற பரிசுத்த வாழ்க்கை.'
    },
    '1 Timothy 6:12': {
      text: 'விசுவாசத்தின் நல்ல போராட்டத்தைப் போராடு, நித்தியஜீவனைப் பற்றிக்கொள்; அதற்காகவே நீ அழைக்கப்பட்டாய்; அநேக சாட்சிகளுக்கு முன்பாக நல்ல அறிக்கைபண்ணினவனுமாயிருக்கிறாய்.',
      meaning: 'தேவனின் அழைப்பு (கிளீசிஸ்) ஆவிக்குரிய தைரியத்தையும், தளராத விசுவாசப் போராட்டத்தையும், நித்தியஜீவனைப் பற்றிக்கொள்ளும் உறுதியையும் வேண்டுகிறது.'
    },
    '1 Timothy 6:13': {
      text: 'எல்லாவற்றையும் உயிரோடிருக்கச்செய்கிற தேவனுடைய சந்நிதானத்திலேயும், பொந்தியுபிலாத்துவின் முன்னின்று நல்ல அறிக்கையைச் சாட்சியாக விளங்கப்பண்ணின கிறிஸ்து இயேசுவினுடைய சந்நிதானத்திலேயும் உனக்குக் கட்டளையிடுகிறேன்,',
      meaning: 'நம்முடைய தேவனின் அழைப்பு ஜீவனுள்ள தேவனுக்கு முன்பாகவும், இயேசு கிறிஸ்துவின் சத்திய சாட்சிக்கு முன்பாகவும் நிலைநிறுத்தப்பட்டுள்ளது.'
    },
    '1 Timothy 6:14': {
      text: 'நம்முடைய கர்த்தராகிய இயேசுகிறிஸ்து பிரசன்னமாகும்வரைக்கும், நீ இந்தக் கற்பனையை மாசில்லாமலும் குற்றமில்லாமலும் கைக்கொள்ளும்படிக்கு உனக்குக் கட்டளையிடுகிறேன்.',
      meaning: 'தேவ அழைப்பிற்கு பாத்திரமாய் வாழ்வது என்பது கிறிஸ்து மீண்டும் வரும் வரை தூய்மையையும், உண்மையையும், பக்தியையும் கைக்கொள்வதாகும்.'
    }
  };

  const wordStudy = language === 'ta' ? [
    {
      greek: 'κλῆσις (கிளீசிஸ்)',
      transliteration: 'Klesis',
      meaning: 'தேவனிடமிருந்து வரும் அழைப்பும் நித்திய ஜீவனுக்கான அழைப்பிதழும்.',
      ref: '1 தீமோ 6:12',
    },
    {
      greek: 'ἀγών (அகோன்)',
      transliteration: 'Agōn',
      meaning: 'விசுவாசப் போராட்டத்தில் காட்டும் ஆவிக்குரிய உறுதி மற்றும் வீரம்.',
      ref: '1 தீமோ 6:12',
    },
    {
      greek: 'ὁμολογία (ஹோமோலோகியா)',
      transliteration: 'Homologia',
      meaning: 'தேவனுக்கு முன்பாகவும் அநேக சாட்சிகளுக்கு முன்பாகவும் பண்ணும் நல்ல அறிக்கை.',
      ref: '1 தீமோ 6:12–13',
    },
    {
      greek: 'ἐντολή (எண்டோலே)',
      transliteration: 'Entolē',
      meaning: 'கிறிஸ்துவின் வருகை வரை கறையின்றிக் காக்கப்பட வேண்டிய பரிசுத்த கட்டளை.',
      ref: '1 தீமோ 6:14',
    },
  ] : [
    {
      greek: 'κλῆσις (Klēsis)',
      transliteration: 'Klēsis',
      meaning: 'The divine calling and heavenly summons from God into eternal life.',
      ref: '1 Tim 6:12',
    },
    {
      greek: 'ἀγών (Agōn)',
      transliteration: 'Agōn',
      meaning: 'The honorable struggle, athletic discipline, and spiritual vigor in the fight of faith.',
      ref: '1 Tim 6:12',
    },
    {
      greek: 'ὁμολογία (Homologia)',
      transliteration: 'Homologia',
      meaning: 'The good confession made before God, Christ, and many witnesses.',
      ref: '1 Tim 6:12–13',
    },
    {
      greek: 'ἐντολή (Entolē)',
      transliteration: 'Entolē',
      meaning: 'The sacred commandment kept spotless and blameless until Christ’s appearing.',
      ref: '1 Tim 6:14',
    },
  ];

  const currentDisplayPassage = language === 'ta' && tamilPassages[selectedPassage.reference]
    ? {
        ...selectedPassage,
        englishText: tamilPassages[selectedPassage.reference].text,
        meaning: tamilPassages[selectedPassage.reference].meaning,
      }
    : selectedPassage;

  return (
    <section id="biblical" className="relative py-24 bg-radial from-[#062a1e] via-[#04120d] to-[#020a07] text-white overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-serif uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('biblical.sub', 'Theme Scripture • 1 Timothy 6:12–14')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-gold-gradient tracking-tight my-2">
            {t('biblical.title', 'The Biblical Mandate of KLESIS')}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            {t('biblical.desc', 'Exposition of 1 Timothy 6:12–14 — Fighting the good fight of faith, taking hold of eternal life, and standing blameless before God.')}
          </p>

          <GoldDivider />
        </div>

        {/* 2-Column Passage Selector & Scripture Display Plaque */}
        <div className="grid lg:grid-cols-12 gap-8 items-start my-8">
          {/* Passage Selector Side Panel */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              <Feather className="w-4 h-4" />
              {language === 'ta' ? '1 தீமோத்தேயு 6:12–14 வசனங்கள்' : '1 Timothy 6:12–14 Passages'}
            </h3>

            {SCRIPTURES.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPassage(item)}
                className={`p-5 rounded-xl border transition-all cursor-pointer shadow-lg ${
                  selectedPassage.reference === item.reference
                    ? 'bg-[#0B3D2E] border-[#D4AF37] text-white shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]'
                    : 'dark-monument-card border-stone-800 text-stone-300 hover:border-[#D4AF37]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-bold text-sm text-[#D4AF37]">
                    {item.reference}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      selectedPassage.reference === item.reference ? 'rotate-90 text-[#D4AF37]' : 'text-stone-500'
                    }`}
                  />
                </div>
                <p className="text-xs text-stone-300 line-clamp-2 font-serif italic">
                  "{language === 'ta' && tamilPassages[item.reference] ? tamilPassages[item.reference].text : item.englishText}"
                </p>
              </div>
            ))}
          </div>

          {/* Active Scripture Display Plaque */}
          <div className="lg:col-span-7 dark-monument-card rounded-2xl p-6 sm:p-10 border-2 border-[#D4AF37] relative shadow-2xl overflow-hidden">
            <GreekKeyBorder height={18} color="#D4AF37" className="mb-6" />

            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#0B3D2E] text-[#D4AF37] font-serif font-bold text-xs uppercase border border-[#D4AF37]/40">
                {language === 'ta' ? 'பரிசுத்த வேத வசனம்' : 'Biblical Inscription'}
              </span>
            </div>

            <div className="font-serif text-lg sm:text-2xl font-bold text-[#D4AF37] mb-2">
              {currentDisplayPassage.reference}
            </div>

            {/* Ancient Greek Text */}
            <div className="p-4 rounded-xl bg-[#062c22]/80 border border-[#D4AF37]/30 my-4 text-[#A7F3D0] font-serif italic text-sm sm:text-base leading-relaxed">
              {currentDisplayPassage.greekText}
            </div>

            {/* English / Tamil Sacred Translation */}
            <blockquote className="font-serif text-stone-100 text-base sm:text-lg leading-relaxed italic my-4 border-l-4 border-[#D4AF37] pl-4">
              “{currentDisplayPassage.englishText}”
            </blockquote>

            {/* Theological & Spiritual Meaning */}
            <div className="mt-6 pt-6 border-t border-[#D4AF37]/30 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
              <div>
                <h5 className="font-serif font-bold text-xs text-[#D4AF37] uppercase tracking-wider">
                  {language === 'ta' ? 'வேத விளக்கவுரை & ஆவிக்குரிய பாடங்கள்' : 'Exegesis & Spiritual Application'}
                </h5>
                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed mt-1">
                  {currentDisplayPassage.meaning}
                </p>
              </div>
            </div>

            <GreekKeyBorder height={18} color="#D4AF37" className="mt-8" />
          </div>
        </div>

        {/* Greek Key Terms Grid (2 Panels Side-by-Side) */}
        <div className="mt-12 pt-8 border-t border-[#D4AF37]/30">
          <h4 className="font-serif font-bold text-base sm:text-lg text-[#A7F3D0] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            {language === 'ta' ? '1 தீமோத்தேயு 6:12–14 கிரேக்க சொற்களின் விளக்கம்' : 'Greek Key Terms in 1 Timothy 6:12–14'}
          </h4>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {wordStudy.map((w, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-[#0A2218]/90 border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-[#D4AF37]">{w.greek}</span>
                    <span className="text-[10px] font-serif uppercase px-2 py-0.5 rounded bg-[#062c22] text-[#A7F3D0] border border-[#D4AF37]/30 w-fit">
                      {w.ref}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-stone-400 italic mb-2 font-serif">{w.transliteration}</div>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">{w.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};




