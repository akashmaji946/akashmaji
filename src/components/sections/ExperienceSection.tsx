import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import ibmLogo from '@/assets/ibm-logo.svg';
import tcsLogo from '@/assets/tcs-logo.png';

const experiences = [
  {
    title: 'Incoming Hardware Engineer',
    company: 'International Business Machines (IBM)',
    companyUrl: 'https://www.ibm.com',
    location: 'Bangalore, India',
    period: 'July 2026',
    type: 'Full-time',
    status: 'incoming', // incoming = yellow
    description: 'Will be joining IBM as a Hardware Engineer after completing M.Tech at IISc Bangalore.',
    responsibilities: [],
    technologies: [],
    logo: ibmLogo,
  },
  {
    title: 'System Engineer (Full Stack Java Developer)',
    company: 'Tata Consultancy Services (TCS)',
    companyUrl: 'https://www.tcs.com',
    location: 'Indore, India',
    period: 'Aug 2021 - May 2024',
    type: 'Full-time',
    status: 'past', // past = red
    description: 'Worked as a System Engineer in TCS Digital Profile as a Full Stack Java Web Developer.',
    responsibilities: [
      'Developed and maintained enterprise web applications using Spring Boot and Oracle DB',
      'Built responsive frontends with JavaScript and modern frameworks',
      'Collaborated with cross-functional teams using Git and JIRA',
      'Received 3x Star of the Month Award for exceptional performance',
    ],
    technologies: ['Spring Boot', 'Oracle DB', 'Java', 'JavaScript', 'Git', 'JIRA'],
    logo: tcsLogo,
  },
];

export default function ExperienceSection() {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'incoming':
        return 'bg-yellow-500/20 text-yellow-500 font-mono text-base font-bold';
      case 'past':
        return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'incoming':
        return 'Incoming';
      case 'past':
        return 'Past';
      default:
        return 'Current';
    }
  };

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and contributions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group"
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <img src={exp.logo} alt={exp.company} className="w-14 h-14 rounded-lg object-contain bg-white p-1" />
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {exp.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(exp.status)}`}>
                          {getStatusLabel(exp.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {/* Responsibilities */}
                  {exp.responsibilities.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">▹</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
