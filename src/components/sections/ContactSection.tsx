import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    label: 'Personal Email',
    value: 'akashmaji945@gmail.com',
    href: 'mailto:akashmaji945@gmail.com',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg',
    label: 'Academic Email',
    value: 'akashmaji@iisc.ac.in',
    href: 'mailto:akashmaji@iisc.ac.in',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    label: 'WhatsApp',
    value: '+91 9131697371',
    href: 'https://wa.me/9131697371',
  },
];

const socialLinks = [
  { 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 
    href: 'https://github.com/akashmaji946', 
    label: 'GitHub',
    invertOnDark: true
  },
  { 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', 
    href: 'https://linkedin.com/in/akashmaji946', 
    label: 'LinkedIn',
    invertOnDark: false
  },
  { 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg', 
    href: 'https://twitter.com/akashmaji946', 
    label: 'Twitter',
    invertOnDark: false
  },
  { 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', 
    href: 'https://wa.me/9131697371', 
    label: 'WhatsApp',
    invertOnDark: false
  },
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
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
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="text-xl font-semibold mb-4">Contact Akash Maji</h3>
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
                  placeholder="Please specify your query"
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
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass rounded-xl p-5 flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-lg bg-muted">
                    <img src={info.icon} alt={info.label} className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
              
              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass rounded-xl p-5 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-gradient">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">IISc Bangalore, India</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links with Real Icons */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-4">Connect with me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                    aria-label={link.label}
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

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 text-center"
            >
              <p className="text-lg italic text-muted-foreground font-hindi mb-2">
                "संगच्छध्वं संवदध्वं"
              </p>
              <p className="text-sm text-muted-foreground">
                "Let us move together, let us speak together"
              </p>
              <p className="text-xs text-muted-foreground mt-1">— Rigveda</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
