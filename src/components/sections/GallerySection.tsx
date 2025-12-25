import { motion } from 'framer-motion';
import csaDept from '@/assets/gallery/csa-dept.jpg';
import csaLogo from '@/assets/gallery/csa-logo.png';
import serc from '@/assets/gallery/serc.webp';
import iiscWall from '@/assets/gallery/iisc-wall.jpg';

const galleryImages = [
  {
    src: iiscWall,
    alt: 'IISc Main Building',
    caption: 'IISc Bangalore Main Building',
  },
  {
    src: csaDept,
    alt: 'CSA Department',
    caption: 'Department of Computer Science & Automation',
  },
  {
    src: serc,
    alt: 'SERC Building',
    caption: 'Supercomputer Education & Research Centre',
  },
  {
    src: csaLogo,
    alt: 'CSA Logo',
    caption: 'CSA Department Logo',
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Campus <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Glimpses from IISc Bangalore campus
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="glass rounded-xl overflow-hidden group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm font-medium text-foreground">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
