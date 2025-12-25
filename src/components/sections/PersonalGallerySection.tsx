import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, ArrowRight, Minus, Square, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import convocationCollage from '@/assets/convocation-collage.jpg';

// Gallery images with captions
import pravegaFest from '@/assets/gallery/iisc-pravega-fest-2025.jpg';
import openDay from '@/assets/gallery/iisc-2025-open-day.jpg';
import durgaPuja from '@/assets/gallery/iisc-durga-puja-2025.jpg';
import ganeshPuja from '@/assets/gallery/iisc-ganesh-puja-2025.jpg';
import pravegaFest2 from '@/assets/gallery/iisc-pravega-fest-2025-2.jpg';
import pravegaFest3 from '@/assets/gallery/iisc-pravega-fest-2025-3.jpg';
import rhapsody from '@/assets/gallery/iisc-rhapsody-2025.jpg';
import rhapsody2 from '@/assets/gallery/iisc-rhapsody-2025-2.jpg';
import openDay2 from '@/assets/gallery/iisc-open-day-2025-2.jpg';
import janmashtami from '@/assets/gallery/iisc-janmashtami-2024.jpg';

const portraitImages = [
  { src: pravegaFest, caption: 'IISc Pravega Fest 2025' },
  { src: ganeshPuja, caption: 'IISc Ganesh Puja 2025' },
  { src: pravegaFest2, caption: 'IISc Pravega Fest 2025' },
];

const landscapeImages = [
  { src: openDay, caption: 'IISc Open Day 2025' },
  { src: durgaPuja, caption: 'IISc Durga Puja 2025' },
  { src: pravegaFest3, caption: 'IISc Pravega Fest 2025' },
  { src: rhapsody, caption: 'IISc Rhapsody 2025' },
  { src: rhapsody2, caption: 'IISc Rhapsody 2025' },
  { src: openDay2, caption: 'IISc Open Day 2025' },
  { src: janmashtami, caption: 'IISc Janmashtami 2024' },
];

export default function PersonalGallerySection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMaximized(false);
    setIsMinimized(false);
  };

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
              onClick={() => setIsOpen(true)}
            >
              View More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent 
          className={`p-0 overflow-hidden transition-all duration-300 [&>button]:hidden ${
            isMaximized 
              ? 'max-w-[100vw] w-[100vw] h-[100vh] rounded-none' 
              : 'max-w-5xl w-[95vw] h-[90vh]'
          } ${isMinimized ? 'h-auto' : ''}`}
        >
          {/* Window Controls */}
          <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
            <button
              onClick={handleMinimize}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors"
              title="Minimize"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Square className="h-3.5 w-3.5" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <DialogTitle className="p-4 border-b border-border text-xl font-bold flex items-center gap-2 pr-24">
            <ImageIcon className="h-5 w-5 text-primary" />
            Life at IISc Bangalore
          </DialogTitle>
          {!isMinimized && (
            <ScrollArea className={isMaximized ? "h-[calc(100vh-60px)]" : "h-[calc(90vh-60px)]"}>
              <div className="p-4 space-y-6">
                {/* Portrait Photos Row */}
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    {portraitImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative overflow-hidden rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <img
                          src={image.src}
                          alt={image.caption}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-sm font-medium drop-shadow-lg">
                            {image.caption}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Landscape Photos 2x2 Grid */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {landscapeImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index + 3) * 0.05 }}
                        className="group relative overflow-hidden rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <img
                          src={image.src}
                          alt={image.caption}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-sm font-medium drop-shadow-lg">
                            {image.caption}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}