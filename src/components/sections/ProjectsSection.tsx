import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'VM-Diffing-Tool (VMTOOL)',
    description: 'A powerful tool for analyzing and comparing VM disk images. Built with Flask and a C++ core (pybind11) that uses libguestfs for robust disk access. Features file browsing, side‑by‑side file diffs, directory and block comparisons, image conversion, VM launch utilities, and exportable JSON/PDF reports. Supports web-based and CLI (vmt) interfaces.',
    technologies: ['Python (Flask)', 'C++ (pybind11)', 'libguestfs', 'Docker', 'SQLite'],
    github: 'https://github.com/akashmaji946/VM-Diffing-Tool',
    docs: 'https://akashmaji946.github.io/VM-Diffing-Tool/',
    releases: 'https://github.com/akashmaji946/VM-Diffing-Tool/releases',
    featured: true,
    year: '2025',
    location: 'Bangalore, IN',
    course: 'Computer Systems Security Course Project',
  },
  {
    title: 'Medical Volume Renderer (MVR)',
    description: 'Lightweight OpenGL-based 3D volume renderer with a compact PyQt6 UI. Loads medical and scientific volumes (NIfTI: .nii/.nii.gz, DICOM: .dcm, VTK: .vtk) and supports GPU-accelerated volume rendering, slice/slicer view, isosurface rendering, custom & interactive transfer functions, overlays/annotations, and saving/exporting images. Distributed as a standalone Linux binary and shared library. Docker image available for easy deployment.',
    technologies: ['C++', 'OpenGL', 'Python', 'PyQt6', 'pybind11', 'VTK', 'DCMTK', 'Docker', 'NIfTI'],
    github: 'https://github.com/akashmaji/MedicalVolumeRenderer',
    releases: 'https://github.com/akashmaji/MedicalVolumeRenderer/releases',
    docker: 'https://hub.docker.com/r/akashmaji/renderer-v0',
    featured: true,
    year: '2025',
    location: 'Bangalore, IN',
    course: 'Graphics and Visualization Course Project',
  },
  {
    title: 'Market Microservice',
    description: 'Implemented three microservices (account-service, marketplace-service, wallet-service) using a dockerized Akka cluster. These services handle concurrent RESTful requests through a CLI interface while maintaining consistency and correctness.',
    technologies: ['Java 21', 'Spring Boot 3', 'Akka Library', 'Docker', 'Kubernetes', 'IntelliJ', 'Git'],
    github: 'https://github.com/akashmaji946/PODS-Project-2-Phase-2-v1/tree/docker',
    featured: true,
    year: '2024',
    location: 'Bangalore, IN',
    course: 'Distributed Systems Course Project',
  },
  {
    title: 'DuckDB',
    description: 'Implemented two operators, "Join" and "GroupJoin" in the open-source DuckDB source-code, with "Join" being simple nested loop join, and "GroupJoin" being used when we have any "join" followed by "group by" in the query.',
    technologies: ['C++', 'CMake', 'Git', 'SQL', 'VSCode'],
    github: 'https://github.com/akashmaji946/myduckdb/',
    featured: false,
    year: '2024',
    location: 'Bangalore, IN',
    course: 'Database Systems Course Project',
  },
  {
    title: 'ChampSim-IISc',
    description: 'ChampSim-IISc is an adapted version of ChampSim (open-source simulator) with various kinds of branch predictors implemented for calculating performance metrics like prediction accuracy, MPKI, IPC etc. from program traces.',
    technologies: ['C/C++', 'Shell Scripting', 'Git', 'VSCode'],
    github: 'https://github.com/akashmaji946/ChampSim-IISc/',
    featured: false,
    year: '2024',
    location: 'Bangalore, IN',
    course: 'Computer Architecture Course Project',
  },
  {
    title: 'Large Page Allocator',
    description: 'Used "perf mem" tool to obtain a sampled report of TLB misses at different logical addresses, and identified top N TLB-miss regions and allocated large pages to improve performance.',
    technologies: ['C/C++', 'Python', 'Git', 'Make', 'VSCode'],
    github: 'https://github.com/akashmaji946/HPCA-Assignment-02/',
    featured: false,
    year: '2024',
    location: 'Bangalore, IN',
    course: 'Computer Architecture Course Project',
  },
  {
    title: 'MINI Transformer Model',
    description: 'Built from scratch in Python without using deep-learning frameworks. Implements core Transformer components including positional encoding, scaled dot-product self-attention, multi-head attention, layer normalization, residual connections, and final output prediction following the original Transformer architecture.',
    technologies: ['Python3', 'NumPy', 'Git', 'VSCode', 'Shell Scripting'],
    github: 'https://github.com/akashmaji946/Assignment-02-SysML',
    featured: false,
    year: '2025',
    location: 'Bangalore, IN',
    course: 'Systems for Machine Learning Project',
  },
  {
    title: 'CNN Memory Profiling',
    description: 'Profiled and optimized CNN inference across RTX 3060, GTX 1050, and Tesla T4 GPUs. Techniques include FP16 inference, mixed-precision (AMP+AMC), and tiled inference to reduce peak memory and improve throughput. Experiments were performed on ResNet-20/32/44/56 models trained on CIFAR-10 and Mini-ImageNet, with detailed analysis of memory, latency and accuracy tradeoffs.',
    technologies: ['Python3', 'PyTorch', 'CUDA', 'NVIDIA GPUs', 'Git', 'VSCode'],
    github: 'https://github.com/akashmaji946/CNN-Memory-Profiling-And-Optimization-v2',
    report: 'https://akashmaj.me/reports/CNN_Memory_Profiling_And_Optimisation_Report.pdf',
    featured: false,
    year: '2025',
    location: 'Bangalore, IN',
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
                  <div className="text-xs text-muted-foreground">{project.year} | {project.location}</div>
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
                    {project.docker && (
                      <motion.a
                        href={project.docker}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs text-primary mb-2">{project.course}</p>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-xl p-5 h-full group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Folder className="h-5 w-5 text-primary" />
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.report && (
                      <a href={project.report} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <FileText className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-primary mb-1">{project.course}</p>
                <h4 className="font-semibold group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-xs mb-3 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={tech} className="text-xs text-muted-foreground font-mono">
                      {tech}{i < 2 && ' •'}
                    </span>
                  ))}
                </div>
              </motion.div>
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
