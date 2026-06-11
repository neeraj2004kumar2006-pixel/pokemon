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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {websites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden group"
            >
              <div className="relative h-48 md:h-64 overflow-hidden bg-brand-primary/5 p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 z-10" />
                <img 
                  src={site.image} 
                  alt={site.title}
                  className="w-32 h-32 object-cover rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-700 z-0"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">{site.title}</h3>
                <p className="text-zinc-400 mb-6 line-clamp-3">
                  {site.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {site.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={site.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Website
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
