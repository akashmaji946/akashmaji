import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import PDFViewerModal from '@/components/PDFViewerModal';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Study', href: '#study' },
  { label: 'Projects', href: '#projects' },
  { label: 'Reports', href: '#reports' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '/resume/Resume_Akash_Maji.pdf', isResume: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsResumeOpen(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong shadow-elegant py-3' : 'py-5'
        }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="text-2xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Akash Maji
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.isResume ? (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleResumeClick}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ) : (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.label}
                </motion.a>
              )
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-strong border-t border-border/50"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  item.isResume ? (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={handleResumeClick}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-3 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                    >
                      {item.label}
                    </motion.a>
                  ) : (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === item.href.slice(1)
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <PDFViewerModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        pdfUrl="/resume/Resume_Akash_Maji.pdf"
        title="Resume - Akash Maji"
      />
    </>
  );
}
