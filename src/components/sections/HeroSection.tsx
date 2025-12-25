import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowDown, FileText } from 'lucide-react';
import TypewriterText from '@/components/TypewriterText';
import { Button } from '@/components/ui/button';

const roles = [
  'Software Developer',
  'Cloud Engineer',
  'Graphics Enthusiast',
  'MTech @ IISc Bangalore',
];

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Hindi Name */}
            <motion.h1
              className="text-6xl md:text-8xl font-bold font-hindi text-gradient mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              आकाश
            </motion.h1>

            {/* English Name */}
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Akash Maji
            </motion.h2>

            {/* Typewriter Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6 h-10"
            >
              <TypewriterText texts={roles} speed={80} />
            </motion.div>

            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="text-sm">IBM, Bangalore</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">India</span>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-8"
            >
              <p className="font-hindi text-lg">"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"</p>
              <footer className="text-sm mt-1">— Bhagavad Gita 2.47</footer>
            </motion.blockquote>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient hover:opacity-90 glow-sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass"
                asChild
              >
                <a href="#projects">
                  <FileText className="mr-2 h-4 w-4" />
                  View Projects
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient rounded-full blur-3xl opacity-30 animate-pulse-slow" />
              
              {/* Image Container */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 glow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full bg-gradient flex items-center justify-center">
                  <span className="text-6xl md:text-8xl font-bold text-primary-foreground font-hindi">
                    आ
                  </span>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-2xl">💻</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-2xl">☁️</span>
              </motion.div>
            </div>
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
    </section>
  );
}
