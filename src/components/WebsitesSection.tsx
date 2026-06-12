import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const websites = [
  {
    id: 1,
    title: 'Pokemon Portfolio',
    image: '/portfolio-logo.png',
    description: 'A premium, highly interactive personal portfolio website featuring 3D mouse parallax effects, glassmorphism, and a custom smooth-scrolling architecture. Fully responsive and beautifully animated.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://pokemon-jade-ten.vercel.app'
  }
];

export const WebsitesSection = () => {
  return (
    <section className="py-24 relative" id="websites">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            My <span className="text-gradient">Websites</span>
          </h2>
          <p className="text-lg text-zinc-400">
            A showcase of the responsive, modern, and interactive web applications I have built.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {websites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col md:flex-row items-stretch"
            >
              <div className="relative w-full md:w-2/5 min-h-[250px] md:min-h-[400px] overflow-hidden bg-brand-primary/10 flex items-center justify-center p-10 border-b md:border-b-0 md:border-r border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-secondary/20 mix-blend-overlay z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
                <img 
                  src={site.image} 
                  alt={site.title}
                  className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-[2rem] shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 z-20"
                />
              </div>
              
              <div className="p-8 md:p-12 w-full md:w-3/5 flex flex-col justify-center">
                <div className="mb-6 flex items-center">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand-secondary/20 border border-brand-secondary/30 backdrop-blur-md">
                    <span className="text-sm font-semibold text-brand-secondary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                      Featured Project
                    </span>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{site.title}</h3>
                <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                  {site.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {site.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 text-sm font-medium rounded-xl bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <a 
                    href={site.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold hover:shadow-lg hover:shadow-brand-primary/25 transition-all hover:-translate-y-1 w-full sm:w-auto"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit Live Website
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
