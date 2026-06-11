import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden" id="home">
      {/* Optimized soft static gradients instead of laggy animated blobs */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand-primary/10 via-zinc-950 to-zinc-950 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-secondary/10 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-primary text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              App Developer
            </motion.div>

            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight"
            >
              Hi, I'm <span className="text-gradient">Neeraj</span>.<br/> I build apps.
            </motion.h1>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
              className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Welcome to my personal space! I love turning ideas into reality by building clean and user-friendly applications. Check out my latest work below.
            </motion.p>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12"
            >
              <a href="#apps" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                View My Apps <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                Contact Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
              className="flex items-center gap-5 justify-center lg:justify-start text-zinc-400"
            >
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative hidden md:block"
          >
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Decorative elements behind image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-primary/30 to-brand-secondary/30 blur-2xl" />
              <div className="absolute inset-0 rounded-3xl border border-white/10 glass-card flex items-center justify-center overflow-hidden p-12">
                <img 
                  src="/iq-notes.png" 
                  alt="IQ Notes" 
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating badge */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 px-6 py-4 rounded-2xl glass-card flex flex-col gap-1"
              >
                <span className="text-2xl font-bold text-white">IQ Notes</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Featured App</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
