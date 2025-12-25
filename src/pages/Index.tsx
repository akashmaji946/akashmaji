import { Suspense, lazy } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';

const ParticleBackground = lazy(() => import('@/components/ParticleBackground'));

export default function Index() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Particle Background */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
