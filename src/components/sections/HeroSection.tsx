import { motion } from 'framer-motion';
import { MapPin, ArrowDown, FileText } from 'lucide-react';
import TypewriterText from '@/components/TypewriterText';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/profile-image.jpg';
import ibmLogo from '@/assets/ibm-logo.svg';

const roles = [
  'M.Tech Scholar @ IISc Bangalore',
  'Incoming Software Engineer @ IBM',
  'Database Systems Researcher @ DSL',
  'GATE 2024 AIR 26',
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
            {/* Name in 3 Languages - Hindi • English • Bengali */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-hindi text-gradient inline-block">
                आकाश
              </h1>
              <span className="mx-3 text-muted-foreground text-3xl">•</span>
              <h1 className="text-5xl md:text-7xl font-bold text-gradient inline-block">
                Akash
              </h1>
              <span className="mx-3 text-muted-foreground text-3xl">•</span>
              <h1 className="text-5xl md:text-7xl font-bold font-hindi text-gradient inline-block">
                আকাশ
              </h1>
            </motion.div>

            {/* Welcome Text */}
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-foreground mb-4"
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
              className="text-2xl md:text-3xl font-mono font-bold text-yellow-500 mb-6 h-12"
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

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-8"
            >
              <p className="font-hindi text-lg">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |</p>
              <p className="text-sm mt-1">(Karmaṇy-evādhikāras te mā phaleṣu kadācana)</p>
              <p className="text-sm mt-1">"You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."</p>
              <footer className="text-sm mt-1 text-primary">— Bhagavad Gita, Chapter 2, Verse 47</footer>
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
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Glow Effect */}
              <div className="absolute inset-8 md:inset-12 bg-gradient rounded-full blur-3xl opacity-20 animate-pulse-slow" />
              
              {/* Spokes connecting icons to center */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x2 = 50 + 42 * Math.sin(rad);
                  const y2 = 50 - 42 * Math.cos(rad);
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={x2}
                      y2={y2}
                      stroke="hsl(var(--primary))"
                      strokeWidth="0.3"
                      opacity="0.4"
                    />
                  );
                })}
              </svg>

              {/* Image Container - centered */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 glow z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={profileImage} 
                  alt="Akash Maji"
                  className="w-full h-full object-cover object-[center_20%] scale-[1.4]"
                />
              </motion.div>

              {/* Floating Section Icons - 8 icons positioned at 45° intervals */}
              {[
                { href: '#about', emoji: '👤', angle: 0 },
                { href: '#education', emoji: '🎓', angle: 45 },
                { href: '#experience', emoji: '💼', angle: 90 },
                { href: '#study', emoji: '📚', angle: 135 },
                { href: '#projects', emoji: '💻', angle: 180 },
                { href: '#reports', emoji: '📄', angle: 225 },
                { href: '#achievements', emoji: '🏆', angle: 270 },
                { href: '#contact', emoji: '📧', angle: 315 },
              ].map((item, index) => {
                const rad = (item.angle * Math.PI) / 180;
                const radius = 42; // percentage from center
                const x = 50 + radius * Math.sin(rad);
                const y = 50 - radius * Math.cos(rad);
                
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform z-20"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: index * 0.3,
                    }}
                  >
                    <span className="text-lg md:text-xl">{item.emoji}</span>
                  </motion.a>
                );
              })}
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
