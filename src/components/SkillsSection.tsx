import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 95 },
  { name: 'Next.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'Node.js', level: 80 },
  { name: 'Express', level: 85 },
  { name: 'MongoDB', level: 75 },
  { name: 'PostgreSQL', level: 80 },
  { name: 'Firebase', level: 85 },
  { name: 'Flutter', level: 70 },
  { name: 'OpenAI APIs', level: 80 },
  { name: 'Git & GitHub', level: 90 },
];

export const SkillsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="skills">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Tools & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-lg text-zinc-400">
            The tech stack I use to bring ideas to life.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="px-6 py-3 rounded-full glass-card flex items-center gap-3 border-white/10 hover:border-brand-primary/50 cursor-default"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
              <span className="text-white font-medium text-lg">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
