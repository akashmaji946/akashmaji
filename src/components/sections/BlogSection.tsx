import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample blog posts - in a real app, these would come from markdown files or a CMS
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Volume Rendering in OpenGL',
    excerpt: 'A comprehensive guide to implementing ray casting algorithms for 3D medical imaging visualization using modern OpenGL techniques.',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['OpenGL', 'Graphics', 'Medical Imaging'],
    slug: 'volume-rendering-opengl',
    featured: true,
  },
  {
    id: 2,
    title: 'Cloud-Native Development Best Practices',
    excerpt: 'Lessons learned from building scalable microservices on AWS and Kubernetes, including common pitfalls and optimization strategies.',
    date: '2024-01-08',
    readTime: '12 min read',
    tags: ['Cloud', 'AWS', 'Kubernetes'],
    slug: 'cloud-native-best-practices',
    featured: true,
  },
  {
    id: 3,
    title: 'Understanding CUDA for Parallel Computing',
    excerpt: 'An introduction to GPU programming with CUDA, covering thread hierarchies, memory management, and performance optimization.',
    date: '2023-12-20',
    readTime: '10 min read',
    tags: ['CUDA', 'GPU', 'HPC'],
    slug: 'cuda-parallel-computing',
    featured: false,
  },
  {
    id: 4,
    title: 'My Journey from B.Tech to IISc',
    excerpt: 'Personal reflections on preparing for GATE, the admission process, and life at the Indian Institute of Science.',
    date: '2023-11-15',
    readTime: '6 min read',
    tags: ['Career', 'Education', 'GATE'],
    slug: 'btech-to-iisc-journey',
    featured: false,
  },
  {
    id: 5,
    title: 'Building a Custom Graphics Engine',
    excerpt: 'Step-by-step guide to creating a 3D graphics engine from scratch with PBR materials and modern rendering techniques.',
    date: '2023-10-28',
    readTime: '15 min read',
    tags: ['Graphics', 'C++', 'Game Dev'],
    slug: 'custom-graphics-engine',
    featured: true,
  },
  {
    id: 6,
    title: 'Docker and Kubernetes for Beginners',
    excerpt: 'A practical introduction to containerization and orchestration for developers new to DevOps practices.',
    date: '2023-10-10',
    readTime: '9 min read',
    tags: ['Docker', 'Kubernetes', 'DevOps'],
    slug: 'docker-kubernetes-beginners',
    featured: false,
  },
];

export default function BlogSection() {
  const featuredPosts = blogPosts.filter((p) => p.featured).slice(0, 3);
  const recentPosts = blogPosts.filter((p) => !p.featured).slice(0, 3);

  return (
    <section id="blog" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Blog</span> & Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on technology and software development
          </p>
        </motion.div>

        {/* Featured Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="glass rounded-2xl overflow-hidden h-full flex flex-col group cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
                    📝
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm flex-grow line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>

        {/* Recent Posts List */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-6">More Articles</h3>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                className="glass rounded-xl p-5 cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>{post.readTime}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="glass">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
