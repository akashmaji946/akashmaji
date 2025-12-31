import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import iiscLogo from '@/assets/iisc-logo.png';
import rgpvLogo from '@/assets/rgpv-logo.png';
import kpsLogo from '@/assets/kps-logo.jpg';
import dpsLogo from '@/assets/dps-logo.png';

const education = [
  {
    degree: 'M.Tech in Computer Science Engineering',
    institution: 'Indian Institute of Science (IISc)',
    institutionUrl: 'https://iisc.ac.in',
    location: 'Bangalore, Karnataka',
    period: '2024 - 2026',
    description: 'CSA Department. Part of Database Systems Lab, SERC. Research focus on database systems.',
    highlights: ['8.2/10.0 CGPA', 'GATE 2024 AIR 26', 'GATE 2023 AIR 608'],
    logo: iiscLogo,
  },
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Rajiv Gandhi Technological University (RGPV)',
    institutionUrl: 'https://rgpv.ac.in',
    location: 'Bhopal, Madhya Pradesh',
    period: '2017 - 2021',
    description: 'Graduated with distinction. Active participant in coding competitions and technical events.',
    highlights: ['CGPA: 9.39/10', 'Silver Medal 🥈', 'Chancellor Award 2019'],
    logo: rgpvLogo,
  },
  {
    degree: 'Higher Secondary (Class XII)',
    institution: 'Krishna Public School, Bhilai',
    institutionUrl: 'https://krishnapublicschool.com/default.aspx',
    location: 'Bhilai, Chhattisgarh',
    period: '2015 - 2017',
    description: 'Physics, Chemistry, Mathematics stream. Strong foundation in analytical thinking.',
    highlights: ['95.40% in CBSE', 'JEE Mains Qualified'],
    logo: kpsLogo,
  },
  {
    degree: 'Secondary School (Class X)',
    institution: 'Daffodil Public School, Raigarh',
    institutionUrl: null,
    location: 'Raigarh, Chhattisgarh',
    period: '2005 - 2015',
    description: 'Science stream. Awarded by District Collector for academic excellence.',
    highlights: ['94.50% in CGBSE', 'District Award'],
    logo: dpsLogo,
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Education Cards - Center Justified */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-6 md:p-8 w-full max-w-3xl"
                >
                  <div className="flex items-start gap-6">
                    <img src={edu.logo} alt={edu.institution} className="w-20 h-20 rounded-lg object-contain bg-white p-2 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                      <div className="flex items-center gap-2 text-primary mb-2 flex-wrap">
                        <GraduationCap className="h-4 w-4" />
                        {edu.institutionUrl ? (
                          <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                            {edu.institution}
                          </a>
                        ) : (
                          <span className="font-medium">{edu.institution}</span>
                        )}
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
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-medium"
                          >
                            <Award className="h-3 w-3" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
