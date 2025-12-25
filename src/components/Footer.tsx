import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/akashmaji946', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/akash-maji-iisc', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/akash_maji_', label: 'Twitter' },
  { icon: Mail, href: 'mailto:akashmaji@iisc.ac.in', label: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            <span className="text-3xl font-bold font-hindi text-gradient">आकाश</span>
            <p className="text-sm text-muted-foreground mt-1">Akash Maji</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
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
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
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
          className="mt-8 pt-8 border-t border-border/30 text-center"
        >
          <p className="text-sm italic text-muted-foreground font-hindi">
            "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            — Bhagavad Gita 2.47
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
