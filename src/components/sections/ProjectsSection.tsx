import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'VM Diffing Tool',
    description: 'A sophisticated tool for comparing and analyzing differences between virtual machine snapshots. Enables efficient detection of changes in VM states for debugging and development.',
    technologies: ['C++', 'Python', 'QEMU', 'Linux', 'Docker'],
    github: 'https://github.com/akashmaji946/vm-diffing-tool',
    demo: null,
    docs: 'https://github.com/akashmaji946/vm-diffing-tool#readme',
    featured: true,
    image: '🖥️',
  },
  {
    title: 'Medical Volume Renderer',
    description: 'High-performance 3D volume rendering application for medical imaging data. Implements ray casting algorithms with transfer functions for CT/MRI visualization.',
    technologies: ['C++', 'OpenGL', 'GLSL', 'VTK', 'CUDA'],
    github: 'https://github.com/akashmaji946/medical-volume-renderer',
    demo: null,
    docs: null,
    featured: true,
    image: '🏥',
  },
  {
    title: 'Cloud Resource Monitor',
    description: 'Real-time monitoring dashboard for cloud resources across AWS and Azure. Features alerts, cost analysis, and resource optimization recommendations.',
    technologies: ['React', 'Node.js', 'AWS SDK', 'Azure SDK', 'Chart.js'],
    github: 'https://github.com/akashmaji946/cloud-monitor',
    demo: null,
    docs: null,
    featured: true,
    image: '☁️',
  },
  {
    title: 'Distributed Cache System',
    description: 'Implementation of a distributed caching system with consistent hashing, replication, and failure recovery mechanisms.',
    technologies: ['Java', 'Redis', 'gRPC', 'Docker', 'Kubernetes'],
    github: 'https://github.com/akashmaji946/dist-cache',
    demo: null,
    docs: null,
    featured: false,
    image: '🗄️',
  },
  {
    title: 'Graphics Engine',
    description: 'A custom 3D graphics engine built from scratch with support for PBR materials, shadow mapping, and post-processing effects.',
    technologies: ['C++', 'OpenGL', 'GLSL', 'ImGui', 'Assimp'],
    github: 'https://github.com/akashmaji946/graphics-engine',
    demo: null,
    docs: null,
    featured: false,
    image: '🎮',
  },
  {
    title: 'Algorithm Visualizer',
    description: 'Interactive web application for visualizing various algorithms including sorting, pathfinding, and graph algorithms.',
    technologies: ['React', 'TypeScript', 'Canvas API', 'Tailwind CSS'],
    github: 'https://github.com/akashmaji946/algo-viz',
    demo: 'https://algo-viz.vercel.app',
    docs: null,
    featured: false,
    image: '📊',
  },
];

export default function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I've built and contributed to
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-6 h-full flex flex-col group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{project.image}</div>
                  <div className="flex gap-2">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>
                    )}
                    {project.docs && (
                      <motion.a
                        href={project.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                      >
                        <FileText className="h-5 w-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm flex-grow mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">Other Noteworthy Projects</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.a
                href={project.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="block glass rounded-xl p-5 h-full group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Folder className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs text-muted-foreground font-mono">
                      {tech}
                      {project.technologies.indexOf(tech) < 2 && ' •'}
                    </span>
                  ))}
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="glass" asChild>
            <a href="https://github.com/akashmaji946" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
