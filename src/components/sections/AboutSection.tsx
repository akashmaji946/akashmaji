import { motion } from 'framer-motion';
import { Code2, Cloud, Database, Terminal, Cpu, Globe, Layers, Server } from 'lucide-react';

const skills = [
  { name: 'C/C++', icon: Terminal, category: 'Languages' },
  { name: 'Java', icon: Code2, category: 'Languages' },
  { name: 'Python', icon: Code2, category: 'Languages' },
  { name: 'JavaScript', icon: Globe, category: 'Languages' },
  { name: 'Spring Boot', icon: Server, category: 'Backend' },
  { name: 'Oracle DB', icon: Database, category: 'Database' },
  { name: 'Docker', icon: Layers, category: 'DevOps' },
  { name: 'Kubernetes', icon: Cpu, category: 'DevOps' },
  { name: 'OpenGL', icon: Cpu, category: 'Graphics' },
  { name: 'CUDA', icon: Cpu, category: 'HPC' },
  { name: 'Git', icon: Code2, category: 'Tools' },
  { name: 'Linux', icon: Terminal, category: 'OS' },
];

const courses = {
  undergraduate: [
    'Operating Systems', 'Database Management Systems', 'Computer Networks', 
    'Computer Organization', 'Compiler Design', 'Theory of Computation'
  ],
  graduate: [
    'Algorithms', 'Computer Architecture', 'Distributed Systems',
    'Machine Learning', 'Graphics and Visualization', 'Computer Systems Security'
  ]
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A scholar at IISc Bangalore pursuing research in database systems with industry experience in full-stack development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gradient">Hello, I'm Akash!</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I am a <strong className="text-foreground">scholar at IISc Bangalore</strong> pursuing 
                  M.Tech in Computer Science Engineering (2024-2026) in the{' '}
                  <strong className="text-foreground">Computer Science and Automation (CSA)</strong> department.
                </p>
                <p>
                  I am part of the <strong className="text-foreground">Database Systems Lab, SERC, IISc Bangalore</strong> doing 
                  research in database systems. I am a B.Tech CSE graduate from{' '}
                  <strong className="text-foreground">RGPV Bhopal</strong> and secured{' '}
                  <strong className="text-primary">AIR 26 in GATE CSE 2024</strong>.
                </p>
                <p>
                  I have work experience of about 2.5 years having worked as a{' '}
                  <strong className="text-foreground">Full Stack Java Developer at TCS</strong>. 
                  I have a keen interest in advanced studies and research. I love theoretical and applied Computer Science.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '2.5+', label: 'Years @ TCS' },
                { value: 'AIR 26', label: 'GATE 2024' },
                { value: '8.0', label: 'CGPA @ IISc' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Coursework */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-semibold mb-4">Relevant Coursework</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Graduate (IISc)</p>
                  <div className="flex flex-wrap gap-2">
                    {courses.graduate.map((course) => (
                      <span key={course} className="px-2 py-1 rounded-md bg-primary/10 text-xs">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-accent mb-2">Undergraduate (RGPV)</p>
                  <div className="flex flex-wrap gap-2">
                    {courses.undergraduate.map((course) => (
                      <span key={course} className="px-2 py-1 rounded-md bg-accent/10 text-xs">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6">Skills & Technologies</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="glass rounded-xl p-3 flex flex-col items-center gap-2 cursor-default"
                >
                  <skill.icon className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
