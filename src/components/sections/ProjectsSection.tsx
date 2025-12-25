import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'VM-Diffing-Tool (VMTOOL)',
    description: 'A powerful tool for analyzing and comparing VM disk images. Built with Flask and a C++ core (pybind11) using libguestfs for robust disk access. Features file browsing, side-by-side diffs, and exportable JSON/PDF reports.',
    technologies: ['Python', 'Flask', 'C++', 'pybind11', 'libguestfs', 'Docker', 'SQLite'],
    github: 'https://github.com/akashmaji946/VM-Diffing-Tool',
    demo: null,
    docs: 'https://akashmaji946.github.io/VM-Diffing-Tool/',
    featured: true,
    year: '2025',
    course: 'Computer Systems Security Course Project',
  },
  {
    title: 'Medical Volume Renderer (MVR)',
    description: 'Lightweight OpenGL-based 3D volume renderer with PyQt6 UI. Loads medical volumes (NIfTI, DICOM, VTK) with GPU-accelerated rendering, slice views, isosurface rendering, and custom transfer functions.',
    technologies: ['C++', 'OpenGL', 'Python', 'PyQt6', 'pybind11', 'VTK', 'DCMTK', 'Docker'],
    github: 'https://github.com/akashmaji/MedicalVolumeRenderer',
    demo: 'https://hub.docker.com/r/akashmaji/renderer-v0',
    docs: null,
    featured: true,
    year: '2025',
    course: 'Graphics and Visualization Course Project',
  },
  {
    title: 'Market Microservice',
    description: 'Implemented three microservices (account, marketplace, wallet) using a dockerized Akka cluster. Handles concurrent RESTful requests through CLI while maintaining consistency.',
    technologies: ['Java 21', 'Spring Boot 3', 'Akka', 'Docker', 'Kubernetes'],
    github: 'https://github.com/akashmaji946/PODS-Project-2-Phase-2-v1/tree/docker',
    demo: null,
    docs: null,
    featured: true,
    year: '2024',
    course: 'Distributed Systems Course Project',
  },
  {
    title: 'DuckDB Join Operators',
    description: 'Implemented two operators, "Join" and "GroupJoin" in DuckDB source-code, with nested loop join and optimized group-by handling.',
    technologies: ['C++', 'CMake', 'Git', 'SQL'],
    github: 'https://github.com/akashmaji946/myduckdb/',
    demo: null,
    docs: null,
    featured: false,
    year: '2024',
    course: 'Database Systems Course Project',
  },
  {
    title: 'ChampSim-IISc',
    description: 'Adapted ChampSim simulator with various branch predictors for calculating performance metrics like prediction accuracy, MPKI, IPC from program traces.',
    technologies: ['C/C++', 'Shell Scripting', 'Git'],
    github: 'https://github.com/akashmaji946/ChampSim-IISc/',
    demo: null,
    docs: null,
    featured: false,
    year: '2024',
    course: 'Computer Architecture Course Project',
  },
  {
    title: 'MINI Transformer Model',
    description: 'Built from scratch in Python without deep-learning frameworks. Implements core Transformer components including attention, multi-head attention, and layer normalization.',
    technologies: ['Python3', 'NumPy', 'Shell Scripting'],
    github: 'https://github.com/akashmaji946/Assignment-02-SysML',
    demo: null,
    docs: null,
    featured: false,
    year: '2025',
    course: 'Systems for ML Course Project',
  },
  {
    title: 'CNN Memory Profiling',
    description: 'Memory profiling and optimization for CNN inference. Analyzes memory usage patterns and implements optimization strategies for efficient deep learning.',
    technologies: ['Python3', 'PyTorch', 'CUDA', 'NVIDIA GPUs'],
    github: 'https://github.com/akashmaji946/CNN-Memory-Profiling-And-Optimization-v2',
    demo: null,
    docs: null,
    featured: false,
    year: '2025',
    course: 'Machine Learning Project',
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
            Academic and personal projects in systems, graphics, and machine learning
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
                  <div className="text-xs text-muted-foreground">{project.year} • {project.course}</div>
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
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                      +{project.technologies.length - 5}
                    </span>
                  )}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <h4 className="font-semibold group-hover:text-primary transition-colors text-sm">
                    {project.title}
                  </h4>
                </div>
                <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
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
