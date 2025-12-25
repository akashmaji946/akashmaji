import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const education = [
  {
    degree: 'M.Tech in Computational and Data Science',
    institution: 'Indian Institute of Science (IISc)',
    location: 'Bangalore, Karnataka',
    period: '2021 - 2023',
    description: 'Specialized in High Performance Computing, Computer Graphics, and Machine Learning. GATE CS qualified with AIR.',
    highlights: ['GATE CS Qualified', 'CDS Department', 'Research Focus'],
    logo: '🏛️',
  },
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)',
    location: 'Bhopal, Madhya Pradesh',
    period: '2017 - 2021',
    description: 'Graduated with distinction. Active participant in coding competitions and technical events. Awarded University Silver Medal.',
    highlights: ['University Silver Medal', 'CGPA: 8.5+', 'CSE Branch'],
    logo: '🎓',
  },
  {
    degree: 'Higher Secondary (XII)',
    institution: 'Central Board of Secondary Education',
    location: 'India',
    period: '2015 - 2017',
    description: 'Completed with focus on Physics, Chemistry, and Mathematics. Strong foundation in analytical thinking.',
    highlights: ['PCM Stream', '90%+ Score'],
    logo: '📚',
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30" />

            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient glow-sm z-10" />

                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-2xl p-6 md:p-8"
                  >
                    <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="text-4xl">{edu.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                        <div className="flex items-center gap-2 text-primary mb-2 flex-wrap">
                          <GraduationCap className="h-4 w-4" />
                          <span className="font-medium">{edu.institution}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {edu.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {edu.location}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{edu.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {edu.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                            >
                              <Award className="h-3 w-3" />
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
