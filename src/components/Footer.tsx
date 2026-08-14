import React from 'react';
import { GoldDivider, GreekKeyBorder } from './GreekKeyBorder';
import { MapPin, Phone, Mail, Compass, ExternalLink, UserCheck } from 'lucide-react';
import { CII_INFO } from '../data/eventData';
import { useLanguage } from '../context/LanguageContext';
import { sacredAudio } from '../lib/audio';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="relative bg-[#03100b] text-white pt-16 pb-12 border-t-2 border-[#D4AF37]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GreekKeyBorder height={18} color="#D4AF37" className="mb-12" />

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Col 1: CII & TELC Church Heritage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#0B3D2E] flex items-center justify-center font-serif font-bold text-xl text-[#D4AF37]">
                35
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-xl text-gold-gradient uppercase tracking-widest">
                  KLESIS 2026
                </h3>
                <div className="text-xs text-[#A7F3D0] uppercase font-serif">
                  {language === 'ta' ? '35-வது கிறிஸ்ட்ஃபெஸ்ட் விழா' : '35th Edition of ChristFest'}
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              {language === 'ta'
                ? 'தாம்பரம் TELC கிறிஸ்துநாதர் ஆலயத்தின் கிறிஸ்ட்ஃபெஸ்ட் ஒருங்கிணைப்பு குழு வழங்கும் 35-வது கிறிஸ்ட்ஃபெஸ்ட் பெருவிழா (1 தீமோத்தேயு 6:12–14).'
                : `Organized by ${CII_INFO.organization} of ${CII_INFO.church}. Join us for the monumental 35th Edition of ChristFest celebrating the theme of 1 Timothy 6:12–14.`}
            </p>

            {/* Clickable Church Address linked to Google Maps */}
            <div className="p-4 rounded-xl bg-[#0a0f0d] border border-[#D4AF37]/30 text-xs text-stone-300 font-serif space-y-2">
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
                className="flex items-start gap-2 text-[#D4AF37] hover:text-[#A7F3D0] transition-colors group cursor-pointer"
                title="Click to view church location on Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 group-hover:animate-bounce" />
                <span className="underline decoration-dotted">
                  {language === 'ta'
                    ? 'TELC கிறிஸ்துநாதர் ஆலய வளாகம், GST சாலை, தாம்பரம், சென்னை – 600045, தமிழ்நாடு, இந்தியா.'
                    : 'TELC Christ Church Campus, GST Road, Tambaram, Chennai – 600045, Tamil Nadu, India.'}
                </span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>

              <div className="flex items-center gap-2 pt-1 text-stone-300 min-w-0">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="break-all text-[11px] sm:text-xs">cii.christfest2026@telcchristchurch.org</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3 font-serif">
            <h4 className="font-bold text-sm text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              {language === 'ta' ? 'முக்கிய இணைப்புகள்' : 'Event Links'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#hero" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  • {t('nav.home', 'Home')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  • {t('nav.about', 'TELC Church Heritage')}
                </a>
              </li>
              <li>
                <a href="#biblical" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  • {t('nav.biblical', 'Scripture & Theme')}
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  • {t('nav.events', 'Competitions')}
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  • {t('nav.schedule', 'Schedule')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts (Secretary & CII Members) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              {t('footer.contacts', 'Contact Persons')}
            </h4>

            <p className="text-xs text-stone-300 font-sans">
              {language === 'ta' ? 'நிகழ்ச்சி மற்றும் வழிகாட்டுதல் தொடர்புகளுக்கு:' : 'For event inquiries, guidelines, and general assistance:'}
            </p>

            <div className="space-y-2.5">
              {CII_INFO.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#0a0f0d] border border-[#D4AF37]/30 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-serif font-bold text-xs text-white">
                      {contact.name}
                    </div>
                    <div className="text-[11px] text-[#A7F3D0] font-serif">
                      {contact.role}
                    </div>
                  </div>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="px-2.5 py-1.5 rounded bg-[#0B3D2E] text-[#D4AF37] text-xs font-serif font-bold border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#060a08] transition-colors flex items-center gap-1 shrink-0 ml-auto sm:ml-0"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <GoldDivider className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 font-serif gap-4 pt-4 border-t border-stone-800">
          <div>
            © 2026 KLESIS 35th Edition of ChristFest • TELC Christ Church Tambaram.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#A7F3D0]">
            <span>1 Timothy 6:12–14</span>
            <span>•</span>
            <a
              href={CII_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#D4AF37]"
            >
              TELC Christ Church Tambaram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

