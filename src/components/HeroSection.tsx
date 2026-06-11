import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden" id="home">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-primary text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              Available for new projects
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
              Building <span className="text-gradient">digital experiences</span> that matter.
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              I'm a full-stack developer specializing in building exceptional digital experiences. 
              Currently, I'm focused on building accessible, human-centered products.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
              <a href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                View Projects <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 justify-center lg:justify-start text-zinc-400">
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
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
              <div className="absolute inset-0 rounded-3xl border border-white/10 glass-card overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop" 
                  alt="Developer workspace" 
                  className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
              </div>
              
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 px-6 py-4 rounded-2xl glass-card flex flex-col gap-1"
              >
                <span className="text-3xl font-bold text-white">5+</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Years Exp</span>
              </motion.div>

              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 bottom-1/4 px-6 py-4 rounded-2xl glass-card flex flex-col gap-1"
              >
                <span className="text-3xl font-bold text-white">50+</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
