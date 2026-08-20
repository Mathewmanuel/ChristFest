import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { GreekKeyBorder } from './GreekKeyBorder';
import { 
  ChevronDown, 
  ShieldCheck, 
  Clock, 
  Users, 
  Scale, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Scroll as ScrollIcon,
  Check
} from 'lucide-react';
import { sacredAudio } from '../lib/audio';

export const GeneralRulesSection: React.FC = () => {
  const [isUnrolled, setIsUnrolled] = useState(false);
  const { language } = useLanguage();

  const handleOpen = () => {
    if (!isUnrolled) {
      sacredAudio.playParchmentRoll();
      setIsUnrolled(true);
    }
  };

  const generalRulesData = language === 'ta' ? [
    {
      id: 1,
      numeral: 'I',
      icon: Users,
      highlight: 'வயது வரம்பு:',
      text: 'போட்டியாளர்கள் 16 முதல் 35 வயதுக்கு உட்பட்டவராக இருக்க வேண்டும் (பிறந்த தேதி 03 அக்டோபர் 1990 முதல் 02 அக்டோபர் 2010-க்குள் இருக்க வேண்டும்).',
    },
    {
      id: 2,
      numeral: 'II',
      icon: Scale,
      highlight: 'நடுவர் தீர்ப்பு:',
      text: 'நடுவர்களின் தீர்ப்பே இறுதியானது மற்றும் மாறாதது.',
    },
    {
      id: 3,
      numeral: 'III',
      icon: Award,
      highlight: 'சபை பிரதிநிதிகள்:',
      text: 'ஒவ்வொரு திருச்சபையிலிருந்தும் அதிகபட்சமாக 25 போட்டியாளர்கள் மட்டுமே அனுமதிக்கப்படுவர்.',
    },
    {
      id: 4,
      numeral: 'IV',
      icon: ShieldCheck,
      highlight: 'போட்டி விதிமுறைகள்:',
      text: 'ஒவ்வொரு போட்டிக்குமான விதிமுறைகள் மற்றும் வழிகாட்டுதல்கள் அந்தந்தப் போட்டி தொடங்கும் போது விளக்கப்படும்.',
    },
    {
      id: 5,
      numeral: 'V',
      icon: Clock,
      highlight: 'ஒரே நேரத்தில் நடைபெறும் போட்டிகள்:',
      text: 'வேத வினாடி வினா, பிரசங்கம் மற்றும் சுவரொட்டி ஓவியம் ஆகிய போட்டிகள் ஒரே நேரத்தில் நடைபெறும். எனவே, ஒரே போட்டியாளர் ஒரே நேரத்தில் இரண்டு போட்டிகளில் பங்கேற்க இயலாது; அதற்கேற்ப முன்கூட்டியே திட்டமிடுங்கள்.',
    },
    {
      id: 6,
      numeral: 'VI',
      icon: Clock,
      highlight: 'நேர வரம்பு கணக்கீடு:',
      text: 'நேர வரம்புள்ள போட்டிகளுக்கு (பிரசங்கம், வேதாகம சித்தரிப்பு, குறும்படம், குழு கானம்), நேரம் துல்லியமாகக் கணக்கிடப்படும்.',
    },
    {
      id: 7,
      numeral: 'VII',
      icon: ShieldCheck,
      highlight: 'ஒழுங்கு நெறிமுறை:',
      text: 'அனைத்துப் போட்டியாளர்களும் ஒழுங்கு நெறிமுறைகளைத் தவறாமல் பின்பற்றி, விழா மற்றும் போட்டிகளின் விதிமுறைகளுக்குக் கட்டுப்பட்டு நடக்க வேண்டும்.',
    },
  ] : [
    {
      id: 1,
      numeral: 'I',
      icon: Users,
      highlight: 'Age Criteria:',
      text: 'Participants must be between 16 and 35 years of age and should be born between 03 October 1990 and 02 October 2010.',
    },
    {
      id: 2,
      numeral: 'II',
      icon: Scale,
      highlight: 'Judges’ Authority:',
      text: 'The decision of the judges will be final.',
    },
    {
      id: 3,
      numeral: 'III',
      icon: Award,
      highlight: 'Delegation Quota:',
      text: 'Each church shall be allowed to send only 25 participants.',
    },
    {
      id: 4,
      numeral: 'IV',
      icon: ShieldCheck,
      highlight: 'Event Briefing:',
      text: 'Rules and regulations for each event will be explained at the start of the respective event.',
    },
    {
      id: 5,
      numeral: 'V',
      icon: Clock,
      highlight: 'Simultaneous Events:',
      text: 'Events such as Bible quiz, Preaching and Poster Making will happen simultaneously. Therefore, the same participant will not be permitted to take part in both events simultaneously; plan accordingly.',
    },
    {
      id: 6,
      numeral: 'VI',
      icon: Clock,
      highlight: 'Time Tracking:',
      text: 'For events with time constraints (Preaching, Depiction, Short Film, Group Singing), the timing will be calculated.',
    },
    {
      id: 7,
      numeral: 'VII',
      icon: ShieldCheck,
      highlight: 'Code of Conduct:',
      text: 'Participants must follow the code of discipline and adhere to the rules and regulations of the event.',
    },
  ];

  return (
    <section id="general-rules" className="py-12 sm:py-20 relative bg-[#020e0a] overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      {/* Ambient background divine gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 relative z-10">
        
        {/* ========================================================================= */}
        {/* VERTICAL 3D ROMAN SCROLL SIMULATION (TOP-TO-BOTTOM UNROLLING)             */}
        {/* ========================================================================= */}
        <div className="relative group select-none perspective-[1400px]">
          
          {/* Dynamic Ground Ambient Drop Shadow that expands with scroll length */}
          <motion.div 
            className="absolute -inset-x-6 sm:-inset-x-10 bg-black/90 blur-2xl rounded-[60px] pointer-events-none"
            animate={{
              bottom: isUnrolled ? -28 : -14,
              height: isUnrolled ? 60 : 35,
              opacity: isUnrolled ? 0.95 : 0.75
            }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* ======================================================================= */}
          {/* 1. TOP HORIZONTAL 3D CYLINDRICAL ROLLER                                 */}
          {/* ======================================================================= */}
          <motion.div 
            className={`relative z-30 flex items-center justify-center -mb-3 sm:-mb-4 ${!isUnrolled ? 'cursor-pointer' : ''}`}
            onClick={!isUnrolled ? handleOpen : undefined}
            animate={{
              rotateX: isUnrolled ? -25 : 0,
              y: isUnrolled ? -2 : 0
            }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Left Carved Wooden Finial & Gold Ring Cap */}
            <div className="w-8 sm:w-12 h-10 sm:h-14 rounded-l-full bg-gradient-to-r from-[#D4AF37] via-[#8c5924] via-40% to-[#2d180b] border-y-2 border-l-2 border-[#FFE898] shadow-[0_12px_24px_rgba(0,0,0,0.95)] flex items-center justify-center relative shrink-0">
              <div className="w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-full bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#8C5924] shadow-inner" />
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#1a0e06] shadow-sm" />
            </div>

            {/* Horizontal Cylinder Core (Specular cylindrical 3D gradient + parchment spiral grooves) */}
            <div className="flex-1 h-9 sm:h-12 bg-gradient-to-b from-[#FFF9EE] via-[#d5be90] via-30% to-[#48280f] border-y-2 border-[#D4AF37] shadow-[0_14px_28px_rgba(0,0,0,0.95),inset_0_3px_6px_rgba(255,255,255,0.8),inset_0_-4px_8px_rgba(0,0,0,0.65)] flex items-center justify-between px-4 sm:px-8 relative overflow-hidden">
              {/* Coiled Parchment Layers Effect */}
              <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_18px)] pointer-events-none" />
              
              {/* Top Specular Highlight Gleam along cylinder apex */}
              <div className="absolute inset-x-0 top-1 h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
              
              {/* Ancient Roman Medallion Boss Insets */}
              <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-[#D4AF37] border-2 border-[#2d180b] shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d180b]" />
              </div>
              <div className="h-1 flex-1 mx-3 sm:mx-6 rounded-full bg-gradient-to-r from-transparent via-[#2d180b]/35 to-transparent" />
              <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-[#D4AF37] border-2 border-[#2d180b] shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d180b]" />
              </div>
            </div>

            {/* Right Carved Wooden Finial & Gold Ring Cap */}
            <div className="w-8 sm:w-12 h-10 sm:h-14 rounded-r-full bg-gradient-to-l from-[#D4AF37] via-[#8c5924] via-40% to-[#2d180b] border-y-2 border-r-2 border-[#FFE898] shadow-[0_12px_24px_rgba(0,0,0,0.95)] flex items-center justify-center relative shrink-0">
              <div className="w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-full bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#8C5924] shadow-inner" />
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1a0e06] shadow-sm" />
            </div>
          </motion.div>

          {/* ======================================================================= */}
          {/* 2. AGED WEATHERED PARCHMENT SHEET (EXTENDING DOWNWARD ON UNROLL)        */}
          {/* ======================================================================= */}
          <div 
            className="relative z-20 mx-3 sm:mx-6 rounded-b-xl border-x-4 sm:border-x-8 border-[#633a17]/80 shadow-[inset_35px_0_45px_rgba(95,55,18,0.3),inset_-35px_0_45px_rgba(95,55,18,0.3),inset_0_25px_35px_rgba(60,35,10,0.4),0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 ease-out"
            style={{
              backgroundColor: '#f5edd4',
              backgroundImage: `
                radial-gradient(#b3915f 0.9px, transparent 0.9px),
                radial-gradient(circle at 10% 20%, rgba(139,90,43,0.09) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(139,90,43,0.13) 0%, transparent 45%),
                linear-gradient(180deg, #fffcf5 0%, #faeed0 25%, #f3e2ba 70%, #ebd29c 100%)
              `,
              backgroundSize: '20px 20px, 100% 100%, 100% 100%, 100% 100%'
            }}
          >
            {/* Top Inward Curled Parchment Cavity Shadow */}
            <div className="h-6 sm:h-8 bg-gradient-to-b from-[#241306]/70 via-[#3a200a]/25 to-transparent pointer-events-none" />

            {/* Weathered / Darkened Deckle Side Edges Simulation */}
            <div className="absolute inset-y-0 left-0 w-3 sm:w-5 bg-gradient-to-r from-[#3d220c]/40 via-[#3d220c]/15 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-3 sm:w-5 bg-gradient-to-l from-[#3d220c]/40 via-[#3d220c]/15 to-transparent pointer-events-none" />

            {/* Inner Parchment Typography & Controls */}
            <div className="px-4 sm:px-12 pt-1 pb-8">
              
              {/* Greek Key Classical Meander Inscription */}
              <div className="mb-6 opacity-85">
                <GreekKeyBorder height={15} color="#633a17" />
              </div>

              {/* ================= HEADER SECTION ================= */}
              <div 
                onClick={!isUnrolled ? handleOpen : undefined}
                className={`text-center pb-6 border-b-2 border-[#8c5930]/35 relative ${!isUnrolled ? 'cursor-pointer group' : ''}`}
              >
                {/* Festival Crest Ribbon Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0B3D2E] via-[#14533d] to-[#0B3D2E] text-[#D4AF37] text-xs sm:text-sm font-serif font-black uppercase tracking-widest mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.35)] border border-[#D4AF37]/80">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>KLESIS 2026 • 35TH CHRISTFEST</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>

                {/* EXTRA BOLD 3D RELIEF TITLE */}
                <h3 className="font-serif font-black text-3xl sm:text-5xl text-[#0B3D2E] tracking-tight sm:tracking-normal uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] [text-shadow:_0_2px_0_#d8b97d,_0_4px_8px_rgba(0,0,0,0.25)]">
                  {language === 'ta' ? 'GENERAL RULES:' : 'GENERAL RULES:'}
                </h3>
                
                {/* Subtitle */}
                <h4 className="font-serif font-extrabold text-base sm:text-2xl text-[#633C19] uppercase tracking-wider mt-1 drop-shadow-xs">
                  {language === 'ta' ? 'General Rules & Regulations (பொது விதிமுறைகள்)' : 'General Rules and Regulations'}
                </h4>

                {/* Primary Action / Status Indicator */}
                <div className="mt-5 flex justify-center">
                  {!isUnrolled ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                      className="inline-flex items-center gap-3 px-6 sm:px-9 py-3 rounded-full text-xs sm:text-base font-serif font-black tracking-wide uppercase transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.35)] transform hover:scale-105 cursor-pointer bg-gradient-to-r from-[#0B3D2E] via-[#14533d] to-[#0B3D2E] text-[#D4AF37] border-2 border-[#D4AF37] animate-pulse-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                    >
                      <ScrollIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0" />
                      <span>
                        {language === 'ta' 
                          ? 'விதிமுறைகள் அனைத்தையும் காண கிளிக் செய்க (Click to view all rules)' 
                          : 'Click to view all rules'}
                      </span>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0" />
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B3D2E]/10 border border-[#8B5A2B]/40 text-[#0B3D2E] text-xs sm:text-sm font-serif font-bold tracking-wide">
                      <Check className="w-4 h-4 text-[#0B3D2E]" />
                      <span>
                        {language === 'ta' 
                          ? 'அனைத்து பொது விதிமுறைகளும் கீழே திறக்கப்பட்டுள்ளன' 
                          : 'Official General Rules & Regulations Unveiled Below'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ================= LINEAR TEXT REVEAL ON VERTICAL EXPANSION ================= */}
              <AnimatePresence>
                {isUnrolled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: 'auto',
                      transition: {
                        height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                        opacity: { duration: 0.35, delay: 0.08 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 space-y-4 sm:space-y-5">
                      {generalRulesData.map((rule, idx) => (
                        <motion.div
                          key={rule.id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: 0.05 + idx * 0.04, duration: 0.3 }
                          }}
                          className="flex items-start gap-3.5 sm:gap-5 p-4 sm:p-5 rounded-xl bg-white/85 hover:bg-white border-2 border-[#8B5A2B]/30 shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all hover:border-[#8B5A2B]/60"
                        >
                          {/* 3D Roman Numeral Wax Seal Tile */}
                          <div className="shrink-0 pt-0.5">
                            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0B3D2E] via-[#0e4433] to-[#051c14] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center font-serif font-black text-sm sm:text-base shadow-[0_4px_10px_rgba(0,0,0,0.35)]">
                              {rule.numeral}
                            </div>
                          </div>

                          {/* Rule Text Description */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-serif font-extrabold text-sm sm:text-base text-[#0B3D2E] tracking-wide">
                                {rule.highlight}
                              </span>
                              <CheckCircle2 className="w-4 h-4 text-[#0B3D2E]/80 shrink-0 hidden sm:inline" />
                            </div>
                            <p className="font-sans text-xs sm:text-base text-stone-900 leading-relaxed font-semibold">
                              {rule.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}

                      {/* Official Verification Seal */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.3 } }}
                        className="mt-10 pt-6 border-t-2 border-[#8B5A2B]/35 flex items-center justify-center text-center"
                      >
                        <div className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-serif font-extrabold text-[#0B3D2E]">
                          <ShieldCheck className="w-5 h-5 text-[#8B5A2B] shrink-0" />
                          <span>
                            {language === 'ta'
                              ? 'CII தாம்பரம் TELC நிர்வாகக் குழுவினால் அங்கீகரிக்கப்பட்டது'
                              : 'Authorized by CII TELC Christ Church Tambaram Organizing Committee'}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Greek Key meander border */}
              <div className="mt-7 opacity-85">
                <GreekKeyBorder height={15} color="#633a17" />
              </div>

            </div>

            {/* Bottom Inward Curled Parchment Cavity Shadow */}
            <div className="h-6 sm:h-8 bg-gradient-to-t from-[#241306]/70 via-[#3a200a]/25 to-transparent pointer-events-none" />
          </div>

          {/* ======================================================================= */}
          {/* 3. BOTTOM HORIZONTAL 3D CYLINDRICAL ROLLER (DESCENDS ON UNROLL)         */}
          {/* ======================================================================= */}
          <motion.div 
            className={`relative z-30 flex items-center justify-center -mt-3 sm:-mt-4 ${!isUnrolled ? 'cursor-pointer' : ''}`}
            onClick={!isUnrolled ? handleOpen : undefined}
            animate={{
              rotateX: isUnrolled ? 180 : 0,
              y: isUnrolled ? 2 : 0
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 1, 0.5, 1] 
            }}
          >
            {/* Left Carved Wooden Finial & Gold Ring Cap */}
            <div className="w-8 sm:w-12 h-10 sm:h-14 rounded-l-full bg-gradient-to-r from-[#D4AF37] via-[#8c5924] via-40% to-[#2d180b] border-y-2 border-l-2 border-[#FFE898] shadow-[0_16px_32px_rgba(0,0,0,0.98)] flex items-center justify-center relative shrink-0">
              <div className="w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-full bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#8C5924] shadow-inner" />
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#1a0e06] shadow-sm" />
            </div>

            {/* Horizontal Cylinder Core (Specular cylindrical 3D gradient) */}
            <div className="flex-1 h-9 sm:h-12 bg-gradient-to-b from-[#FFF9EE] via-[#d5be90] via-30% to-[#48280f] border-y-2 border-[#D4AF37] shadow-[0_16px_32px_rgba(0,0,0,0.98),inset_0_3px_6px_rgba(255,255,255,0.8),inset_0_-4px_8px_rgba(0,0,0,0.65)] flex items-center justify-between px-4 sm:px-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_18px)] pointer-events-none" />
              <div className="absolute inset-x-0 top-1 h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
              
              <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-[#D4AF37] border-2 border-[#2d180b] shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d180b]" />
              </div>
              <div className="h-1 flex-1 mx-3 sm:mx-6 rounded-full bg-gradient-to-r from-transparent via-[#2d180b]/35 to-transparent" />
              <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-[#D4AF37] border-2 border-[#2d180b] shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d180b]" />
              </div>
            </div>

            {/* Right Carved Wooden Finial & Gold Ring Cap */}
            <div className="w-8 sm:w-12 h-10 sm:h-14 rounded-r-full bg-gradient-to-l from-[#D4AF37] via-[#8c5924] via-40% to-[#2d180b] border-y-2 border-r-2 border-[#FFE898] shadow-[0_16px_32px_rgba(0,0,0,0.98)] flex items-center justify-center relative shrink-0">
              <div className="w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-full bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#8C5924] shadow-inner" />
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1a0e06] shadow-sm" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
