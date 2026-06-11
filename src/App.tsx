import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WebsitesSection } from './components/WebsitesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-inter selection:bg-brand-primary/30 relative">
      {/* Global Grain Overlay - Static and highly optimized */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <WebsitesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
