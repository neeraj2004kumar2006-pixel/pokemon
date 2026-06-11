import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Database, Sparkles } from 'lucide-react';

const specializations = [
  {
    icon: <Smartphone className="w-6 h-6 text-brand-primary" />,
    title: 'Mobile Development',
    description: 'Building native-feeling cross-platform applications using React Native and Flutter.'
  },
  {
    icon: <Code className="w-6 h-6 text-brand-secondary" />,
    title: 'Web Development',
    description: 'Creating responsive, high-performance web applications with modern frontend frameworks.'
  },
  {
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    title: 'Full Stack',
    description: 'Designing scalable architectures and robust APIs using Node.js and modern databases.'
  },
  {
    icon: <Sparkles className="w-6 h-6 text-amber-400" />,
    title: 'AI Integration',
    description: 'Implementing LLMs and AI features to create smart, next-generation applications.'
  }
];

export const AboutSection = () => {
  return (
    <section className="py-24 relative" id="about">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            I'm a passionate developer with a deep love for creating elegant solutions to complex problems. 
            My journey in software development started over 5 years ago, and since then, I've had the privilege 
            of building products for startups, agencies, and enterprise clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">My Development Journey</h3>
            <div className="relative border-l border-white/10 pl-8 ml-4 space-y-8">
              {[
                { year: '2023 - Present', role: 'Senior Full Stack Developer', company: 'Tech Innovators Inc.' },
                { year: '2021 - 2023', role: 'Frontend Engineer', company: 'Creative Digital Agency' },
                { year: '2019 - 2021', role: 'Mobile App Developer', company: 'Startup Hub' }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-zinc-950 border-2 border-brand-primary" />
                  <span className="text-sm text-brand-primary font-semibold tracking-wider uppercase">{item.year}</span>
                  <h4 className="text-lg font-bold text-white mt-1">{item.role}</h4>
                  <p className="text-zinc-400 text-sm mt-1">{item.company}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {specializations.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {spec.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{spec.title}</h4>
                <p className="text-sm text-zinc-400">{spec.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
