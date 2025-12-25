import { motion } from 'framer-motion';
import { BookOpen, GraduationCap } from 'lucide-react';

const courses = {
  graduate: [
    'Algorithms',
    'Probability and Statistics',
    'Databases',
    'Computer Architecture',
    'Optimizations',
    'Machine Learning',
    'Systems for Machine Learning',
    'Cryptography',
    'Distributed Systems',
    'Graphics and Visualization',
    'Computer Systems Security',
  ],
  undergraduate: [
    'Operating Systems',
    'Database Management Systems',
    'Computer Networks',
    'Computer Organization',
    'Digital Logic Design',
    'Discrete Mathematics',
    'Compiler Design',
    'Theory of Computation',
    'C/C++ System Programming',
    'Linux/UNIX',
    'Object Oriented Programming',
  ],
};

export default function StudySection() {
  return (
    <section id="study" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Study</span> & Coursework
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Core computer science courses from undergraduate and graduate programs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Graduate Courses */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Graduate</h3>
                <p className="text-sm text-muted-foreground">IISc Bangalore (2024-2026)</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {courses.graduate.map((course, index) => (
                <motion.span
                  key={course}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Undergraduate Courses */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-accent/20">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Undergraduate</h3>
                <p className="text-sm text-muted-foreground">RGPV Bhopal (2017-2021)</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {courses.undergraduate.map((course, index) => (
                <motion.span
                  key={course}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
