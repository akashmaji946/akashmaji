import { motion } from 'framer-motion';
import { ImageIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import convocationCollage from '@/assets/convocation-collage.jpg';

export default function PersonalGallerySection() {
  return (
    <section id="personal-gallery" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Personal <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Memorable moments and milestones
          </p>
        </motion.div>

        {/* Convocation Collage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-center flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-primary" />
            Convocation Ceremony
          </h3>
          <div className="max-w-md w-full rounded-2xl overflow-hidden shadow-2xl border border-border/30">
            <img
              src={convocationCollage}
              alt="12th Convocation Ceremony at RGPV University, May 2025"
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-center text-muted-foreground mt-4 text-sm">
            12th Convocation Ceremony • RGPV University • May 2025
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Button
              variant="outline"
              className="group"
              onClick={() => {
                const gallerySection = document.getElementById('gallery');
                gallerySection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
