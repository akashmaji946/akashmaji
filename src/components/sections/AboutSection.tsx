import { motion } from 'framer-motion';

// Technology icons using devicons CDN
const skills = [
  { name: 'C/C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Oracle DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'OpenGL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'IntelliJ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
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
                  I am a <a href="https://www.csa.iisc.ac.in/people/akash-maji/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">scholar</a> at{' '}
                  <a href="https://iisc.ac.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">IISc Bangalore</a>{' '}
                  pursuing M.Tech in Computer Science Engineering (2024-2026), in the{' '}
                  <a href="https://www.csa.iisc.ac.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Computer Science and Automation (CSA)</a> department.
                </p>
                <p>
                  I am part of the{' '}
                  <a href="https://dsl.cds.iisc.ac.in/index.php" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Database Systems Lab, SERC, IISc Bangalore (DSL)</a>{' '}
                  doing research in database systems. I am a B.Tech CSE graduate from{' '}
                  <a href="https://www.rgpv.ac.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">RGPV Bhopal</a>. 
                  I secured <strong className="text-primary">AIR 26 in GATE CSE 2024</strong>.
                </p>
                <p>
                  I have work experience of about 2.5 years having worked as a{' '}
                  <strong className="text-foreground">Full Stack Java Developer</strong> at{' '}
                  <a href="https://www.tcs.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">TCS</a>. 
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
          </motion.div>

          {/* Skills Grid with Real Icons */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6">Languages & Tools</h3>
            <div className="grid grid-cols-4 gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="glass rounded-xl p-3 flex flex-col items-center gap-2 cursor-default"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="h-8 w-8"
                  />
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
