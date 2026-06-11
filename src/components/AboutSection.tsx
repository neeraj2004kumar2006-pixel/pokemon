import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap } from 'lucide-react';
import { ParticleText } from './ParticleText';

export const AboutSection = () => {
  return (
    <section className="py-24 relative" id="about">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            About <ParticleText text="Me" />
          </h2>
          <div className="glass-card p-8 md:p-12 rounded-3xl space-y-6">
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              I'm an independent app developer with a passion for building applications that people love to use. 
              My journey started with a simple curiosity about how things work, and it quickly grew into a full-time obsession with coding and design.
            </p>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              I spend most of my time exploring new frameworks, designing intuitive user interfaces, and turning my ideas into real, downloadable apps. 
              When I'm not coding, I'm probably brainstorming my next big project.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
