import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.gateway': 'Gateway',
    'nav.about': 'TELC Church & CII',
    'nav.biblical': 'Theme Scripture',
    'nav.events': 'Competitions',
    'nav.schedule': 'Schedule',
    'nav.register': 'Register',
    'nav.soundOn': 'Sound On',
    'nav.soundOff': 'Mute Sound',
    'nav.langSwitch': 'தமிழ்',

    // CII Info
    'cii.org': 'The Christava Illaignar Iyakkam (CII)',
    'cii.church': 'TELC Christ Church, Tambaram',
    'cii.title': 'KLESIS 35th ChristFest 2026',
    'cii.tagline': 'The Divine Calling — Living Worthy of the High Calling of God',
    'cii.dates': 'October 2, 2026',
    'cii.location': 'TELC Christ Church Campus, Tambaram, Chennai',
    'cii.anniversary': '35 Landmark Years of ChristFest',

    // Hero
    'hero.badge': '35th Edition • ChristFest MMXXVI',
    'hero.subTitle': 'Christava Illaignar Iyakkam (CII) of TELC Christ Church Tambaram Presents',
    'hero.mainTitle': 'KLESIS 2026',
    'hero.themeBadge': 'The Divine Calling (κλῆσις)',
    'hero.scriptureRef': '1 Timothy 6:12–14',
    'hero.tagline': 'Fight the good fight of faith, lay hold on eternal life, to which you were also called and have confessed the good confession in the presence of many witnesses...',
    'hero.btnRegister': 'Event Details',
    'hero.btnExplore': 'Explore Competitions',
    'hero.dateLabel': 'Event Date',
    'hero.dateVal': 'Friday, Oct 2, 2026',
    'hero.venueLabel': 'Sanctuary Venue',
    'hero.venueVal': 'TELC Christ Church, Tambaram',
    'hero.milestoneLabel': 'Grace Milestone',
    'hero.milestoneVal': '35 Years of ChristFest (1991–2026)',

    // About
    'about.archHeader': '35 YEARS OF CHRISTFEST',
    'about.archSub': '35 Landmark Years of ChristFest (1991–2026) organized by Christava Illaignar Iyakkam (CII) of TELC Christ Church Tambaram',
    'about.churchTitle': '35 Landmark Years of ChristFest (1991–2026)',
    'about.churchDesc': 'Celebrated for 35 continuous milestone years (1991–2026), ChristFest is hosted by the Christava Illaignar Iyakkam (CII) of TELC Christ Church Tambaram—a historic youth ministry whose rich heritage and spiritual fellowship spans across decades.',
    'about.ciiTitle': 'Christava Illaignar Iyakkam (CII)',
    'about.ciiDesc': 'The Christava Illaignar Iyakkam (CII) is the long-standing and vibrant youth wing of TELC Christ Church Tambaram. It has nurtured generations of young Christians in spiritual leadership, Lutheran choral music, biblical scholarship, and gospel outreach, hosting 35 historic editions of ChristFest.',
    'about.stat1Label': 'ChristFest Editions',
    'about.stat1Val': '35',
    'about.stat2Label': 'Youth Delegates',
    'about.stat2Val': '500+',
    'about.stat3Label': 'Partner Churches',
    'about.stat3Val': '25+',
    'about.stat4Label': 'Competitions',
    'about.stat4Val': '7 Events',

    // Biblical
    'biblical.header': 'DIVINE THEME SCRIPTURE',
    'biblical.sub': '1 TIMOTHY 6:12–14 • THE CALLING OF GOD (κλῆσις)',
    'biblical.title': 'The Divine Calling to Unwavering Faith',
    'biblical.desc': 'KLESIS (κλῆσις) is the ancient Greek word for "Divine Calling" or "Invitation of God." St. Paul urges Timothy—and every young believer—to fight the good fight of faith with unwavering perseverance.',
    'biblical.pillar1Title': 'Agōnizomai (The Good Fight)',
    'biblical.pillar1Desc': 'Spiritual battle requires dedication, endurance, and courage in defending truth.',
    'biblical.pillar2Title': 'Epilambanomai (Lay Hold)',
    'biblical.pillar2Desc': 'Seize eternal life actively—faith is an intentional pursuit of heavenly promise.',
    'biblical.pillar3Title': 'Homologia (Good Confession)',
    'biblical.pillar3Desc': 'Declare your testimony boldly before God and many witnesses without fear.',

    // Events / Competitions
    'events.header': 'GRAND COMPETITIONS & EVENT',
    'events.sub': 'MUSIC • DRAMA • BIBLE QUIZ • PREACHING • POSTER MAKING • SHORT FILM',
    'events.title': '35th Anniversary ChristFest Competitions',
    'events.desc': 'Showcase your God-given talents in choral singing, dramatic portrayal, scripture quiz, preaching, and creative arts. Open to all church youth fellowships.',
    'events.catAll': 'All Events',
    'events.catMusic': 'Music & Choir',
    'events.catDrama': 'Drama & Short Film',
    'events.catBiblical': 'Bible Trivia & Preaching',
    'events.catYouth': 'Poster Making',
    'events.btnRules': 'View Event Guidelines',
    'events.btnRegisterCard': 'Event Details',
    'events.prizeLabel': 'Honors & Awards',
    'events.coordinatorLabel': 'Event Coordinator',
    'events.timeLabel': 'Timing',
    'events.venueLabel': 'Venue',
    'events.searchPlaceholder': 'Search competitions or keywords...',

    // Schedule
    'schedule.header': 'EVENT PROGRAMME SCHEDULE',
    'schedule.sub': 'OCTOBER 2, 2026 (FRIDAY) • TIMETABLE OF EVENTS',
    'schedule.title': 'Official Order of Events',
    'schedule.downloadBtn': 'Download PDF Schedule',

    // Registration Modal
    'reg.title': 'KLESIS 2026 Delegate Registration',
    'reg.subtitle': 'TELC Christ Church Tambaram • 35th Anniversary',
    'reg.fullName': 'Full Name / Team Leader Name',
    'reg.email': 'Email Address',
    'reg.phone': 'Phone Number (WhatsApp)',
    'reg.churchName': 'Church / Congregation Name & City',
    'reg.category': 'Select Competition',
    'reg.btnSubmit': 'Confirm Registration',
    'reg.successTitle': 'Registration Confirmed!',
    'reg.successMsg': 'Praise the Lord! Your entry for KLESIS 2026 has been registered successfully.',
    'reg.ticketId': 'Your Delegate ID:',
    'reg.btnPrint': 'Print Delegate Ticket',

    // Footer
    'footer.church': 'TELC Christ Church, Tambaram',
    'footer.address': 'GST Road, Opposite Railway Station, Tambaram, Chennai - 600045, Tamil Nadu',
    'footer.phone': '+91 98401 23456 / +91 98402 34567',
    'footer.email': 'cii.tambaram@telc.org.in',
    'footer.rights': '© 2026 Christava Illaignar Iyakkam (CII) • TELC Christ Church Tambaram. All rights reserved.',
  },
  ta: {
    // Nav
    'nav.gateway': 'முகப்பு',
    'nav.about': 'சபை & CII',
    'nav.biblical': 'வேத வசனம்',
    'nav.events': 'போட்டிகள்',
    'nav.schedule': 'நிகழ்வு நிரல்',
    'nav.register': 'பதிவு செய்க',
    'nav.soundOn': 'ஒலி ஆன்',
    'nav.soundOff': 'ஒலி ஆஃப்',
    'nav.langSwitch': 'English',

    // CII Info
    'cii.org': 'கிறிஸ்தவ இளைஞர் இயக்கம் (CII)',
    'cii.church': 'TELC கிறிஸ்துநாதர் ஆலயம், தாம்பரம்',
    'cii.title': 'கிளீசிஸ் 35-வது கிறிஸ்ட்ஃபெஸ்ட் 2026',
    'cii.tagline': 'தேவ அழைப்பு — மேலான அழைப்பிற்கு பாத்திரமாய் வாழ்வது',
    'cii.dates': 'அக்டோபர் 2, 2026',
    'cii.location': 'TELC கிறிஸ்துநாதர் ஆலய வளாகம், தாம்பரம், சென்னை',
    'cii.anniversary': '35-வது வரலாற்று சிறப்புமிக்க ஆண்டுவிழா',

    // Hero
    'hero.badge': '35-வது பதிப்பு • கிறிஸ்ட்ஃபெஸ்ட் 2026',
    'hero.subTitle': 'TELC கிறிஸ்துநாதர் ஆலயம் தாம்பரத்தின் கிறிஸ்தவ இளைஞர் இயக்கம் (CII) வழங்கும்',
    'hero.mainTitle': 'கிளீசிஸ் 2026',
    'hero.themeBadge': 'தேவனின் அழைப்பு (KLESIS)',
    'hero.scriptureRef': '1 தீமோத்தேயு 6:12–14',
    'hero.tagline': 'விசுவாசத்தின் நல்ல போராட்டத்தைப் போராடு, நித்தியஜீவனைப் பற்றிக்கொள்; அதற்காகவே நீ அழைக்கப்பட்டாய்; அநேக சாட்சிகளுக்கு முன்பாக நல்ல அறிக்கைபண்ணினவனுமாயிருக்கிறாய்...',
    'hero.btnRegister': 'போட்டிகளை அறிய',
    'hero.btnExplore': 'போட்டிகளை அறிய',
    'hero.dateLabel': 'நிகழ்வு நாள்',
    'hero.dateVal': 'வெள்ளிக்கிழமை, அக் 2, 2026',
    'hero.venueLabel': 'நிகழ்வு இடம்',
    'hero.venueVal': 'TELC கிறிஸ்துநாதர் ஆலயம், தாம்பரம்',
    'hero.milestoneLabel': 'இறைப்பணி மைல்கல்',
    'hero.milestoneVal': '35 ஆண்டுகள் கிறிஸ்ட்ஃபெஸ்ட் (1991–2026)',

    // About
    'about.archHeader': '35 ஆண்டுகள் கிறிஸ்ட்ஃபெஸ்ட்',
    'about.archSub': 'தாம்பரம் TELC கிறிஸ்துநாதர் ஆலயத்தின் நீண்டகால கிறிஸ்தவ இளைஞர் இயக்கம் (CII) வழங்கும் 35-வது வரலாற்றுச் சிறப்புமிக்க கிறிஸ்ட்ஃபெஸ்ட் (1991–2026)',
    'about.churchTitle': '35 ஆண்டுகள் கிறிஸ்ட்ஃபெஸ்ட் (1991–2026)',
    'about.churchDesc': '35 வரலாற்று மைல்கல் ஆண்டுகளாக (1991–2026) நடத்தப்பட்டு வரும் கிறிஸ்ட்ஃபெஸ்ட் நிகழ்வை, பல தசாப்த கால ஆவிக்குரிய பாரம்பரியம் கொண்ட தாம்பரம் TELC கிறிஸ்துநாதர் ஆலய கிறிஸ்தவ இளைஞர் இயக்கம் (CII) பெருமையுடன் நடத்துகிறது.',
    'about.ciiTitle': 'கிறிஸ்தவ இளைஞர் இயக்கம் (CII)',
    'about.ciiDesc': 'கிறிஸ்தவ இளைஞர் இயக்கம் (CII), தாம்பரம் TELC ஆலயத்தின் நீண்டகால சுறுசுறுப்பான இளைஞர் அமைப்பாகும். பல தலைமுறை இளைஞர்களை ஆவிக்குரிய தலைமைத்துவம், லூத்தரன் பாடகர் குழு இசை, வேத அறிவு மற்றும் நற்செய்தி பணியில் வழிநடத்தி, 35 வரலாற்று சிறப்புமிக்க கிறிஸ்ட்ஃபெஸ்ட் நிகழ்வுகளை ஒருங்கிணைத்துள்ளது.',
    'about.stat1Label': 'கிறிஸ்ட்ஃபெஸ்ட் பதிப்புகள்',
    'about.stat1Val': '35',
    'about.stat2Label': 'இளைஞர் பிரதிநிதிகள்',
    'about.stat2Val': '500+',
    'about.stat3Label': 'பங்கேற்கும் ஆலயங்கள்',
    'about.stat3Val': '25+',
    'about.stat4Label': 'கலைப் போட்டிகள்',
    'about.stat4Val': '7 நிகழ்வுகள்',

    // Biblical
    'biblical.header': 'முக்கிய வேத வசனம்',
    'biblical.sub': '1 தீமோத்தேயு 6:12–14 • தேவனின் அழைப்பு (KLESIS)',
    'biblical.title': 'உறுதியான விசுவாசத்திற்கான தேவ அழைப்பு',
    'biblical.desc': 'கிளீசிஸ் (KLESIS) என்பது "தேவ அழைப்பு" அல்லது "தேவனுடைய அழைப்பிதழ்" என்பதற்கான கிரேக்க வார்த்தையாகும். அப்போஸ்தலனாகிய பவுல் தீமோத்தேயுவுக்கும் ஒவ்வொரு வாலிபனுக்கும் விசுவாசத்தின் நல்ல போராட்டத்தை தைரியத்தோடு போராட அறைக்கூவல் விடுக்கிறார்.',
    'biblical.pillar1Title': 'அகோனிசோமை (நல்ல போராட்டம்)',
    'biblical.pillar1Desc': 'ஆவிக்குரிய யுத்தத்திற்கு உறுதி, சகிப்புத்தன்மை மற்றும் சத்தியத்தை காக்கும் தைரியம் தேவை.',
    'biblical.pillar2Title': 'எபிலம்பனோமை (பற்றிப்பிடித்தல்)',
    'biblical.pillar2Desc': 'நித்திய ஜீவனை தீவிரமாய் பிடித்துக்கொள்ளுங்கள் — விசுவாசம் என்பது தேவ வாக்குத்தத்தத்தை நாடுவது.',
    'biblical.pillar3Title': 'ஹோமோலோகியா (நல்ல அறிக்கை)',
    'biblical.pillar3Desc': 'தேவனுக்கு முன்பாகவும் அநேக சாட்சிகளுக்கு முன்பாகவும் உங்கள் விசுவாசத்தை தைரியமாய் அறிக்கை செய்யுங்கள்.',

    // Events / Competitions
    'events.header': 'பிரம்மாண்ட கலை & வேதப் போட்டிகள்',
    'events.sub': 'இசை • நாடகம் • வேத வினாடி வினா • பிரசங்கம் • சுவரொட்டி ஓவியம் • குறும்படம்',
    'events.title': '35-வது ஆண்டுவிழா கிறிஸ்ட்ஃபெஸ்ட் போட்டிகள்',
    'events.desc': 'தேவன் தந்த தாலந்துகளை பாடகர் குழு இசை, நாடகம், வினாடி வினா, பிரசங்கம் மற்றும் கலை வெளிப்பாடுகளில் வெளிப்படுத்துங்கள். அனைத்து திருச்சபை இளைஞர்களுக்கும் அழைப்பு!',
    'events.catAll': 'அனைத்து போட்டிகள்',
    'events.catMusic': 'இசை & பாடகர் குழு',
    'events.catDrama': 'நாடகம் & குறும்படம்',
    'events.catBiblical': 'வேத வினாடி வினா & பிரசங்கம்',
    'events.catYouth': 'சுவரொட்டி ஓவியம்',
    'events.btnRules': 'போட்டி வழிகாட்டுதல் அறிய',
    'events.btnRegisterCard': 'விவரங்கள் அறிய',
    'events.prizeLabel': 'பரிசுத் தொகை & கேடயம்',
    'events.coordinatorLabel': 'ஒருங்கிணைப்பாளர்',
    'events.timeLabel': 'நேரம்',
    'events.venueLabel': 'இடம்',
    'events.searchPlaceholder': 'போட்டிகள் அல்லது சொற்களைத் தேடுக...',

    // Schedule
    'schedule.header': 'நிகழ்வு நிரல்',
    'schedule.sub': 'அக்டோபர் 2, 2026 (வெள்ளிக்கிழமை) • நேர அட்டவணை',
    'schedule.title': 'நிகழ்ச்சிகளின் முறைமை',
    'schedule.downloadBtn': 'நிகழ்வு நிரலை பதிவிறக்குக (PDF)',

    // Registration Modal
    'reg.title': 'கிளீசிஸ் 2026 இளைஞர் பதிவு',
    'reg.subtitle': 'TELC கிறிஸ்துநாதர் ஆலயம் தாம்பரம் • 35-வது ஆண்டுவிழா',
    'reg.fullName': 'முழு பெயர் / குழு தலைவர் பெயர்',
    'reg.email': 'மின்னஞ்சல் முகவரி',
    'reg.phone': 'தொலைபேசி எண் (வாட்ஸ்அப்)',
    'reg.churchName': 'ஆலயம் / சபை பெயர் & ஊர்',
    'reg.category': 'தேர்ந்தெடுக்கும் போட்டி',
    'reg.btnSubmit': 'பதிவை உறுதி செய்க',
    'reg.successTitle': 'பதிவு வெற்றிகரமாக முடிந்தது!',
    'reg.successMsg': 'கர்த்தருக்கு ஸ்தோத்திரம்! கிளீசிஸ் 2026 நிகழ்வுக்கான உங்கள் பதிவு உறுதி செய்யப்பட்டது.',
    'reg.ticketId': 'உங்கள் அடையாள எண்:',
    'reg.btnPrint': 'அடையாள அட்டையை அச்சிடுக',

    // Footer
    'footer.church': 'TELC கிறிஸ்துநாதர் ஆலயம், தாம்பரம்',
    'footer.address': 'ஜி.எஸ்.டி சாலை, இரயில் நிலைய எதிரில், தாம்பரம், சென்னை - 600045, தமிழ்நாடு',
    'footer.phone': '+91 98401 23456 / +91 98402 34567',
    'footer.email': 'cii.tambaram@telc.org.in',
    'footer.rights': '© 2026 கிறிஸ்தவ இளைஞர் இயக்கம் (CII) • TELC கிறிஸ்துநாதர் ஆலயம் தாம்பரம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'ta' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
