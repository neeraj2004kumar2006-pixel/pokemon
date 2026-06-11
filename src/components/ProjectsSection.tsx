import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Nexus SaaS Platform',
    category: 'SaaS Products',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    description: 'A comprehensive business management dashboard with real-time analytics, user roles, and integrated payment processing.',
    tags: ['React', 'Next.js', 'Tailwind', 'PostgreSQL'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'Aura Fitness App',
    category: 'Mobile Apps',
    image: 'https://images.unsplash.com/photo-1526506114642-990a42398b16?q=80&w=1974&auto=format&fit=crop',
    description: 'Cross-platform mobile application for personalized workout tracking, diet planning, and community engagement.',
    tags: ['React Native', 'Firebase', 'Redux', 'Stripe'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'Synth AI Generator',
    category: 'AI Tools',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
    description: 'An intelligent platform utilizing OpenAI APIs to generate high-quality marketing copy and blog posts instantly.',
    tags: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'Elevate E-Commerce',
    category: 'Websites',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1970&auto=format&fit=crop',
    description: 'Modern headless e-commerce storefront with lightning-fast page loads and a seamless checkout experience.',
    tags: ['Next.js', 'Shopify', 'Framer Motion'],
    demoUrl: '#',
    githubUrl: '#'
  }
];

const categories = ['All', 'Websites', 'Mobile Apps', 'SaaS Products', 'AI Tools'];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 relative bg-zinc-950/50" id="projects">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-zinc-400">
            A selection of my recent work. These projects showcase my ability to build scalable, 
            beautiful, and performant applications across different platforms.
          </p>
        </motion.div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-brand-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                  : 'glass text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-3xl overflow-hidden group flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium text-zinc-300 glass rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                    <a href={project.demoUrl} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                    <a href={project.githubUrl} className="p-3 rounded-xl glass hover:bg-white/10 text-white transition-colors">
                      <FaGithub className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-primary hover:text-white font-medium transition-colors group">
            View more projects on GitHub
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
