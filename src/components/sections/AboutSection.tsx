import { motion } from 'framer-motion';
import { Code2, Cloud, Database, Terminal, Cpu, Globe } from 'lucide-react';

const skills = [
  { name: 'C/C++', icon: Terminal, category: 'Languages' },
  { name: 'Java', icon: Code2, category: 'Languages' },
  { name: 'Python', icon: Code2, category: 'Languages' },
  { name: 'TypeScript', icon: Code2, category: 'Languages' },
  { name: 'React', icon: Globe, category: 'Frontend' },
  { name: 'Node.js', icon: Terminal, category: 'Backend' },
  { name: 'AWS', icon: Cloud, category: 'Cloud' },
  { name: 'Azure', icon: Cloud, category: 'Cloud' },
  { name: 'Docker', icon: Database, category: 'DevOps' },
  { name: 'Kubernetes', icon: Cpu, category: 'DevOps' },
  { name: 'OpenGL', icon: Cpu, category: 'Graphics' },
  { name: 'WebGL', icon: Globe, category: 'Graphics' },
];

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
            A passionate software developer specializing in cloud computing, graphics programming, and full-stack development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                  I'm a Software Developer at <strong className="text-foreground">IBM, Bangalore</strong>, 
                  working on cloud infrastructure and enterprise solutions. I completed my{' '}
                  <strong className="text-foreground">M.Tech in Computational and Data Science</strong> from 
                  the prestigious <strong className="text-foreground">Indian Institute of Science (IISc), Bangalore</strong>.
                </p>
                <p>
                  My expertise spans across cloud computing, graphics programming with OpenGL/WebGL, 
                  and building scalable full-stack applications. I'm passionate about creating 
                  efficient solutions and contributing to open-source projects.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, reading about 
                  ancient Indian philosophy, or enjoying a good game of chess.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '15+', label: 'Projects' },
                { value: '5+', label: 'Certifications' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
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
