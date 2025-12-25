import { motion } from 'framer-motion';
import { Award, ExternalLink, Medal, Trophy, Shield, Star } from 'lucide-react';

const certifications = [
  {
    title: 'Oracle Cloud Infrastructure Foundations',
    issuer: 'Oracle',
    date: '2023',
    credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge',
    icon: '🔶',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    date: '2023',
    credentialUrl: 'https://www.credly.com/badges/',
    icon: '🔷',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'GATE CS 2021',
    issuer: 'IIT Bombay',
    date: '2021',
    credentialUrl: null,
    icon: '📜',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2022',
    credentialUrl: 'https://aws.amazon.com/verification',
    icon: '🟠',
    color: 'from-amber-500 to-orange-500',
  },
];

const awards = [
  {
    title: 'RGPV University Silver Medal',
    description: 'Awarded for academic excellence and outstanding performance in B.Tech Computer Science & Engineering.',
    year: '2021',
    icon: Medal,
  },
  {
    title: 'GATE Qualified',
    description: 'Graduate Aptitude Test in Engineering (GATE) qualified in Computer Science and Information Technology.',
    year: '2021',
    icon: Trophy,
  },
  {
    title: 'Dean\'s List',
    description: 'Recognized for maintaining excellent academic performance throughout undergraduate studies.',
    year: '2020',
    icon: Star,
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Achievements</span> & Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition and professional credentials
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass rounded-xl p-5 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl p-2 rounded-lg bg-gradient-to-br ${cert.color} bg-opacity-20`}>
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors">
                            {cert.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {cert.date}
                        </span>
                      </div>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary mt-2 hover:underline"
                        >
                          Verify Credential
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-accent" />
              Awards & Honors
            </h3>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient">
                      <award.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-semibold">{award.title}</h4>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {award.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
