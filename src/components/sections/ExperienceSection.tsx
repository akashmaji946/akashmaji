import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experiences = [
  {
    title: 'Software Developer',
    company: 'IBM',
    companyUrl: 'https://www.ibm.com',
    location: 'Bangalore, India',
    period: 'July 2023 - Present',
    type: 'Full-time',
    description: 'Working on cloud infrastructure, enterprise solutions, and building scalable applications for global clients.',
    responsibilities: [
      'Developing and maintaining cloud-native applications on IBM Cloud and AWS',
      'Building microservices architecture using Java, Node.js, and Kubernetes',
      'Implementing CI/CD pipelines and DevOps practices',
      'Collaborating with cross-functional teams across multiple time zones',
    ],
    technologies: ['Java', 'Node.js', 'Kubernetes', 'Docker', 'AWS', 'IBM Cloud', 'React'],
    logo: '💼',
  },
  {
    title: 'Research Intern',
    company: 'IISc Bangalore',
    companyUrl: 'https://www.iisc.ac.in',
    location: 'Bangalore, India',
    period: 'Jan 2023 - June 2023',
    type: 'Internship',
    description: 'Conducted research on high-performance computing and graphics algorithms as part of M.Tech thesis.',
    responsibilities: [
      'Developed efficient volume rendering algorithms using OpenGL',
      'Implemented parallel processing techniques using CUDA',
      'Published research findings in academic conferences',
      'Mentored junior students on graphics programming concepts',
    ],
    technologies: ['C++', 'OpenGL', 'CUDA', 'Python', 'GLSL', 'VTK'],
    logo: '🔬',
  },
  {
    title: 'Software Engineering Intern',
    company: 'Tech Startup',
    companyUrl: '#',
    location: 'Remote',
    period: 'May 2020 - July 2020',
    type: 'Internship',
    description: 'Worked on full-stack web development and learned industry best practices.',
    responsibilities: [
      'Built responsive web applications using React and Node.js',
      'Implemented RESTful APIs and database integration',
      'Participated in agile development processes',
      'Collaborated with designers for UI/UX improvements',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Git'],
    logo: '🚀',
  },
];

export default function ExperienceSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
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
                      <div className="text-4xl">{exp.logo}</div>
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
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {exp.type}
                      </span>
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
                  <ul className="space-y-2 mb-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">▹</span>
                        {resp}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
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
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
