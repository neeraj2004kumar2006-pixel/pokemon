import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Smartphone } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const apps = [
  {
    id: 1,
    title: 'My First App',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    description: 'This is a placeholder for your first app. Describe what it does, who it is for, and why you built it. It features a clean UI and smooth performance.',
    tags: ['React Native', 'Firebase', 'Redux'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'My Second App',
    image: 'https://images.unsplash.com/photo-1526506114642-990a42398b16?q=80&w=1974&auto=format&fit=crop',
    description: 'This is a placeholder for your second app. You can easily edit these details in the code to showcase your actual work and provide links to the app store or GitHub.',
    tags: ['Flutter', 'Node.js', 'MongoDB'],
    demoUrl: '#',
    githubUrl: '#'
  }
];

export const ProjectsSection = () => {
  return (
    <section className="py-24 relative bg-zinc-950/50" id="apps">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 glass-card rounded-2xl mb-6">
            <Smartphone className="w-8 h-8 text-brand-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            My <span className="text-gradient">Apps</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Check out the applications I have built. I handle everything from design to deployment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
                <img 
                  src={app.image} 
                  alt={app.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
                  {app.title}
                </h3>
                <p className="text-zinc-400 mb-6 flex-1 leading-relaxed">
                  {app.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {app.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium text-zinc-300 glass rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                  <a href={app.demoUrl} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
                    <ExternalLink className="w-4 h-4" /> View App
                  </a>
                  <a href={app.githubUrl} className="p-3 rounded-xl glass hover:bg-white/10 text-white transition-colors" aria-label="View Source">
                    <FaGithub className="w-5 h-5" />
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
