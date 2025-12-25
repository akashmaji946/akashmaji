import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import emailjs from '@emailjs/browser';
import qrCode from '@/assets/qrcode.png';
import gmailLogo from '@/assets/gmail-logo.png';
import outlookIcon from '@/assets/outlook-icon.png';
import whatsappLogo from '@/assets/whatsapp-logo.png';
import githubLogo from '@/assets/github-logo.png';
import linkedinLogo from '@/assets/linkedin-logo.png';
import twitterLogo from '@/assets/twitter-logo.png';
import geetaImage from '@/assets/geeta.jpg';

// Initialize EmailJS
emailjs.init("59dg56bFBgGKAQAdD");

const socialLinks = [
  { 
    icon: githubLogo, 
    href: 'https://github.com/akashmaji946', 
    label: 'GitHub',
    invertOnDark: true
  },
  { 
    icon: linkedinLogo, 
    href: 'https://linkedin.com/in/akashmaji946', 
    label: 'LinkedIn',
    invertOnDark: false
  },
  { 
    icon: twitterLogo, 
    href: 'https://twitter.com/akashmaji946', 
    label: 'X (Twitter)',
    invertOnDark: false
  },
  { 
    icon: whatsappLogo, 
    href: 'https://wa.me/9131697371', 
    label: 'WhatsApp',
    invertOnDark: false
  },
  { 
    icon: gmailLogo, 
    href: 'mailto:akashmaji945@gmail.com', 
    label: 'Gmail',
    invertOnDark: false
  },
  { 
    icon: outlookIcon, 
    href: 'mailto:akashmaji@iisc.ac.in', 
    label: 'Academic Email',
    invertOnDark: false
  },
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already sent a message
    if (localStorage.getItem('hireMessageSent') === 'true') {
      setMessageSent(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate message has at least 10 words
    const wordCount = formData.message.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 10) {
      toast({
        title: "Message too short",
        description: "Please enter at least 10 words in the message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        to_name: "Akash Maji",
        subject: "HIRING REQUEST",
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send("service_akashmaji945", "template_xz6re3g", templateParams);
      
      localStorage.setItem('hireMessageSent', 'true');
      setMessageSent(true);
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* Bhagavad Gita Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto glass rounded-2xl p-8 md:p-12 overflow-hidden relative">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-yellow-500/5 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 rounded-xl blur-sm opacity-50" />
                  <img 
                    src={geetaImage} 
                    alt="Bhagavad Gita - Krishna and Arjuna" 
                    className="relative w-32 h-40 md:w-40 md:h-52 object-cover object-center rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>

              {/* Quote Content */}
              <div className="flex-1 text-center md:text-left">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl md:text-3xl font-bold font-hindi text-gradient mb-3 leading-relaxed"
                >
                  कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-sm md:text-base text-muted-foreground mb-4 font-medium tracking-wide"
                >
                  (Karmaṇy-evādhikāras te mā phaleṣu kadācana)
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-base md:text-lg text-foreground/80 mb-4 leading-relaxed"
                >
                  "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-sm font-semibold text-primary tracking-wider uppercase"
                >
                  — Bhagavad Gita, Chapter 2, Verse 47
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {messageSent ? (
              <div className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center h-full min-h-[400px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-center">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-6">
                <h3 className="text-xl font-semibold">Contact Akash Maji</h3>
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Query
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please specify your query (minimum 10 words)"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-background/50 resize-none"
                  />
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Note: You can send only one query, so write properly.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient hover:opacity-90 glow-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >

            {/* Connect with me */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-4">Connect with me</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors flex items-center gap-2"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <img 
                      src={link.icon} 
                      alt={link.label} 
                      className={`h-6 w-6 ${link.invertOnDark ? 'dark:invert' : ''}`} 
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Book 1:1 Call */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-semibold mb-3">Book a 1:1 Call</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Want to discuss something in detail? Schedule a personal call with me.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient hover:opacity-90 glow-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center">Scan to Book a Call</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center py-6">
                    <img 
                      src={qrCode} 
                      alt="Book a call QR Code" 
                      className="w-48 h-48 rounded-lg bg-white p-2" 
                    />
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Scan this QR code to schedule a 1:1 call with Akash Maji
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}