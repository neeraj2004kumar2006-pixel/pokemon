import React from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, LayoutTemplate, Layers, Cpu, PenTool } from 'lucide-react';

const services = [
  {
    icon: <MonitorSmartphone className="w-8 h-8" />,
    title: 'Mobile App Development',
    description: 'High-performance, native-feeling mobile applications for iOS and Android using React Native and Flutter.',
    color: 'text-blue-400'
  },
  {
    icon: <LayoutTemplate className="w-8 h-8" />,
    title: 'Website Development',
    description: 'Beautiful, responsive, and SEO-optimized websites built with modern frameworks like React and Next.js.',
    color: 'text-violet-400'
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Full Stack Applications',
    description: 'End-to-end web solutions with robust backends, scalable databases, and seamless API integrations.',
    color: 'text-emerald-400'
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'AI Powered Solutions',
    description: 'Integrating large language models and machine learning APIs to create intelligent, automated workflows.',
    color: 'text-amber-400'
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: 'UI/UX Development',
    description: 'Translating complex designs into pixel-perfect, accessible, and highly interactive user interfaces.',
    color: 'text-rose-400'
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-24 relative bg-zinc-950/50" id="services">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Premium <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-zinc-400">
            I offer a comprehensive suite of development services designed to bring your ideas to life 
            with cutting-edge technology and exceptional design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-3xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
