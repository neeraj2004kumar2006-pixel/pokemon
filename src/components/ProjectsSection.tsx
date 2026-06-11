import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { FaGooglePlay } from 'react-icons/fa';

const apps = [
  {
    id: 1,
    title: 'IQ Notes',
    image: '/iq-notes.png',
    description: 'A smart, intuitive note-taking application designed to help you capture your thoughts, organize your ideas, and boost your daily productivity effortlessly.',
    tags: ['Flutter', 'Android', 'Productivity'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.iqnotes.iq_notes'
  },
  {
    id: 2,
    title: 'Coin Tapper',
    image: '/coin-tapper.png',
    description: 'An addictive and fun tapping game where you collect coins, beat your high scores, and enjoy endless entertainment. Simple to learn, hard to master!',
    tags: ['Flutter', 'Android', 'Game'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.me.cointapper'
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
            Check out the applications I have built and published on the Google Play Store.
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
              <div className="relative h-48 md:h-64 overflow-hidden bg-brand-primary/5 p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 z-10" />
                <img 
                  src={app.image} 
                  alt={app.title}
                  className="w-32 h-32 object-contain rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-700 z-0"
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
                  <a href={app.demoUrl} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
                    <FaGooglePlay className="w-4 h-4" /> Get on Play Store
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
