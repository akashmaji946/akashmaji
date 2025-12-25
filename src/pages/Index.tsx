import { Suspense, lazy } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import StudySection from '@/components/sections/StudySection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ReportsSection from '@/components/sections/ReportsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';
import Chatbot from '@/components/Chatbot';

const ParticleBackground = lazy(() => import('@/components/ParticleBackground'));

export default function Index() {
  return (
    <div className="relative min-h-screen">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <StudySection />
        <ProjectsSection />
        <ReportsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
