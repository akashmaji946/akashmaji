import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import csaOpenDay from '@/assets/gallery/CSA-Open-Day-2026.jpg';
import iiScLibrary from '@/assets/gallery/IISc-Library.jpg';
import iiScOpenDay2026 from '@/assets/gallery/IISc-Open-Day-2026.jpg';
import pgConfIndia from '@/assets/gallery/PGConf-India-2026.jpg';
import pravega2026 from '@/assets/gallery/Pravega-2026.jpg';
import rhapsody2026 from '@/assets/gallery/Rhapsody-2026.jpg';

interface GalleryImage {
  id: number;
  src?: string;
  alt: string;
}

export default function ImageGallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: GalleryImage[] = [
    { id: 1, src: csaOpenDay, alt: 'CSA Open Day 2026' },
    { id: 2, src: iiScLibrary, alt: 'IISc Library' },
    { id: 3, src: iiScOpenDay2026, alt: 'IISc Open Day 2026' },
    { id: 4, src: pgConfIndia, alt: 'PGConf India 2026' },
    // { id: 5, src: pravega2026, alt: 'Pravega 2026' },
    { id: 6, src: rhapsody2026, alt: 'Rhapsody 2026' },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex justify-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl"
      >
        {/* Main Image Container */}
        <div className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video">
          {/* Image Display */}
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900"
            >
              {images[currentIndex].src ? (
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-6xl sm:text-8xl text-slate-600 mb-4">📷</div>
                  <p className="text-slate-400 font-medium text-lg">
                    {images[currentIndex].alt}
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    Photo placeholder - awaiting image
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 z-20 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-3 mt-6">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`h-3 transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 w-8'
                  : 'bg-slate-600 hover:bg-slate-500 w-3'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Optional: Info Text */}
        <p className="text-center text-slate-400 text-sm mt-4">
          Click the arrows or dots to navigate through the gallery
        </p>
      </motion.div>
    </div>
  );
}
