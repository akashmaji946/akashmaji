import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowDown, FileText, MessageCircle, Github } from 'lucide-react';
import TypewriterText from '@/components/TypewriterText';
import { Button } from '@/components/ui/button';
import PDFViewerModal from '@/components/PDFViewerModal';
import profileImage from '@/assets/profile-image.jpg';
import ibmLogo from '@/assets/ibm-logo.svg';
import geetaImage from '@/assets/geeta.jpg';

const roles = [
  'M.Tech CSE @ IISC Bangalore',
  'Incoming Hardware Engineer @ IBM',
  'AIR 26 @ GATE CSE 2024',
  'Database Systems Researcher @ DSL',
];

// Floating Icon Component with tooltip
function FloatingIcon({ item, index }: { 
  item: { href: string; emoji: string; angle: number; label: string }; 
  index: number 
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  const r = 205;
  const rad = (item.angle * Math.PI) / 180;
  const x = Math.cos(rad) * r;
  const y = Math.sin(rad) * r;

  return (
    <a
      href={item.href}
      className="absolute left-1/2 top-1/2 z-20"
      style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="relative">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap shadow-lg z-30"
            >
              {item.label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="w-11 h-11 md:w-12 md:h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.15 }}
        >
          <span className="text-lg md:text-xl">{item.emoji}</span>
        </motion.div>
      </div>
    </a>
  );
}

export default function HeroSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 py-20">
        {/* Hero Name (centered across the screen) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 md:gap-3 mb-10 text-center"
        >
          <span className="text-3xl md:text-5xl font-bold font-hindi bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">आकाश</span>
          <span className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">•</span>
          <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">Akash</span>
          <span className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">•</span>
          <span className="text-3xl md:text-5xl font-bold font-hindi bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">আকাশ</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >

            {/* Welcome Text */}
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome, folk!
            </motion.h2>

            {/* Typewriter Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl font-mono font-bold text-yellow-500 mb-6 h-10"
            >
              <TypewriterText texts={roles} speed={80} />
            </motion.div>

            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8 flex-wrap"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <img src={ibmLogo} alt="IBM" className="h-5 w-5" />
                <span className="text-sm">Incoming Hardware Engineer @ IBM</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">IISc Bangalore</span>
              </div>
            </motion.div>

            {/* Bhagavad Gita Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-5 border-l-4 border-primary pl-5 mb-8 max-w-xl"
            >
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 rounded-lg blur-sm opacity-50" />
                  <img 
                    src={geetaImage} 
                    alt="Bhagavad Gita" 
                    className="relative w-24 h-32 md:w-28 md:h-36 object-cover object-center rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-hindi text-base md:text-lg font-semibold text-sky-400 leading-relaxed">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन</p>
                <p className="text-sm md:text-base text-muted-foreground mt-2">(Karmaṇy-evādhikāras te mā phaleṣu kadācana)</p>
                <p className="text-sm md:text-base text-foreground/80 mt-2">"You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."</p>
                <p className="text-sm font-bold text-primary mt-2 uppercase tracking-widest">— Bhagavad Gita 2.47</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0 flex flex-col items-center"
          >
            <div className="relative w-96 h-96 md:w-[460px] md:h-[460px]">
              {/* Glow Effect */}
              <div className="absolute inset-14 bg-gradient rounded-full blur-3xl opacity-20 animate-pulse-slow" />

              {/* Image Container - centered (motion transform-safe) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 glow select-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{ transformOrigin: 'center', WebkitTapHighlightColor: 'transparent' }}
                >
                  <img
                    src={profileImage}
                    alt="Akash Maji"
                    draggable={false}
                    className="w-full h-full object-cover object-[center_20%] scale-[1.4]"
                    loading="eager"
                  />
                </motion.div>
              </div>

              {/* Floating Section Icons - perfectly centered orbit */}
              {(
                [
                  { href: '#about', emoji: '👤', angle: 0, label: 'About' },
                  { href: '#education', emoji: '🎓', angle: 45, label: 'Education' },
                  { href: '#experience', emoji: '💼', angle: 90, label: 'Experience' },
                  { href: '#study', emoji: '📚', angle: 135, label: 'Study' },
                  { href: '#projects', emoji: '💻', angle: 180, label: 'Projects' },
                  { href: '#reports', emoji: '📄', angle: 225, label: 'Reports' },
                  { href: '#achievements', emoji: '🏆', angle: 270, label: 'Achievements' },
                  { href: '#contact', emoji: '📧', angle: 315, label: 'Contact' },
                ] as const
              ).map((item, index) => (
                <FloatingIcon key={item.href} item={item} index={index} />
              ))}
            </div>

            {/* CTA Buttons - Below Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-6"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-border hover:border-sky-400 hover:bg-transparent !text-foreground transition-colors"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-border hover:border-sky-400 hover:bg-transparent !text-foreground transition-colors"
                asChild
              >
                <a href="#projects">
                  <Github className="mr-2 h-4 w-4" />
                  View Projects
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-border hover:border-sky-400 hover:bg-transparent !text-foreground transition-colors"
                onClick={() => setIsResumeOpen(true)}
              >
                <FileText className="mr-2 h-4 w-4" />
                See Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>

      <PDFViewerModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        pdfUrl="/resume/Resume_Akash_Maji.pdf"
        title="Resume - Akash Maji"
      />
    </section>
  );
}
