import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { BiblicalSection } from './components/BiblicalSection';
import { EventsSection } from './components/EventsSection';
import { ScheduleSection } from './components/ScheduleSection';
import { Footer } from './components/Footer';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'biblical', 'events', 'schedule'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#04120d] text-[#ffffff] ${language === 'ta' ? 'font-tamil' : 'font-sans'} selection:bg-[#10B981] selection:text-[#04120d] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#062c22] via-[#04120d] to-[#020a07]`}>
      {/* Header Bar */}
      <Header
        activeSection={activeSection}
      />

      {/* Main Single-Page Sections */}
      <main>
        <Hero
          onExploreEvents={handleScrollToEvents}
        />
        <AboutSection />
        <BiblicalSection />
        <EventsSection />
        <ScheduleSection />
      </main>

      {/* Footer & Contact */}
      <Footer />
    </div>
  );
}

