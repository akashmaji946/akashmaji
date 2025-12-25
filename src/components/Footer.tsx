import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import githubLogo from '@/assets/github-logo.png';
import linkedinLogo from '@/assets/linkedin-logo.png';
import twitterLogo from '@/assets/twitter-logo.png';
import gmailLogo from '@/assets/gmail-logo.png';

const socialLinks = [
  { icon: githubLogo, href: 'https://github.com/akashmaji946', label: 'GitHub', invertOnDark: true },
  { icon: linkedinLogo, href: 'https://linkedin.com/in/akashmaji946', label: 'LinkedIn', invertOnDark: false },
  { icon: twitterLogo, href: 'https://twitter.com/akashmaji946', label: 'Twitter', invertOnDark: false },
  { icon: gmailLogo, href: 'mailto:akashmaji@iisc.ac.in', label: 'Email', invertOnDark: false },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-hindi text-gradient">आकाश</span>
              <span className="text-xl text-muted-foreground">•</span>
              <span className="text-2xl font-bold text-gradient">Akash</span>
              <span className="text-xl text-muted-foreground">•</span>
              <span className="text-2xl font-bold font-hindi text-gradient">আকাশ</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <img 
                    src={link.icon} 
                    alt={link.label} 
                    className={`h-5 w-5 ${link.invertOnDark ? 'dark:invert' : ''}`} 
                  />
                </motion.a>
              ))}
            </div>
            {/* Current Date/Time */}
            <p className="text-xs text-muted-foreground font-mono">
              {formatDateTime(currentDateTime)} IST
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by Akash Maji
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {currentYear} All rights reserved.
            </p>
          </motion.div>
        </div>

        {/* Bhagavad Gita Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-8 border-t border-border/30"
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-xl font-hindi text-gradient font-bold tracking-wide">
              कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              "You have the right to work, but never to the fruit of work"
            </p>
            <p className="text-xs text-primary/70 mt-2 font-medium tracking-wider uppercase">
              — Bhagavad Gita 2.47
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
