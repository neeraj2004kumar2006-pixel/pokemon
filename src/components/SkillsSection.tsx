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
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Technical <span className="text-gradient">Arsenal</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              I've cultivated a diverse skill set that allows me to tackle projects from conception to deployment. 
              My expertise spans the entire modern web and mobile development stack.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="px-5 py-2.5 rounded-full glass-card flex items-center gap-2 border-white/10 hover:border-brand-primary/50 cursor-default"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-primary" />
                  <span className="text-white font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8">Proficiency Levels</h3>
              
              {[
                { category: 'Frontend Development', value: 95 },
                { category: 'Backend & APIs', value: 85 },
                { category: 'Mobile App Development', value: 75 },
                { category: 'Database Design', value: 80 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-zinc-300">
                    <span>{item.category}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 w-full animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
