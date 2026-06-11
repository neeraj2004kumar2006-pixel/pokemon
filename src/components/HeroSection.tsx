import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Code2, Smartphone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const x1 = useTransform(smoothX, [-1, 1], [-30, 30]);
  const y1 = useTransform(smoothY, [-1, 1], [-30, 30]);
  
  const x2 = useTransform(smoothX, [-1, 1], [40, -40]);
  const y2 = useTransform(smoothY, [-1, 1], [40, -40]);

  const x3 = useTransform(smoothX, [-1, 1], [-50, 50]);
  const y3 = useTransform(smoothY, [-1, 1], [50, -50]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden" id="home">
      {/* Dynamic Color Changing Background */}
      <motion.div 
        animate={{ 
          filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(270deg)", "hue-rotate(360deg)"] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand-primary/20 via-zinc-950 to-zinc-950" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-secondary/20 via-zinc-950/0 to-zinc-950/0" />
      </motion.div>

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
            className="flex-1 text-center lg:text-left z-20"
          >
            {/* Same text content as before */}
            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-primary text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              App Developer
            </motion.div>

            <motion.h1 variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
              Hi, I'm <span className="text-gradient">Neeraj</span>.<br/> I build apps.
            </motion.h1>
            
            <motion.p variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }} className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to my personal space! I love turning ideas into reality by building clean and user-friendly applications. Check out my latest work below.
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
              <a href="#apps" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                View My Apps <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                Contact Me
              </a>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } }} className="flex items-center gap-5 justify-center lg:justify-start text-zinc-400">
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all"><FaGithub className="w-5 h-5" /></a>
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all"><FaLinkedin className="w-5 h-5" /></a>
              <a href="#" className="p-3 rounded-full glass-card hover:text-white hover:-translate-y-1 transition-all"><Mail className="w-5 h-5" /></a>
            </motion.div>
          </motion.div>

          {/* Interactive Parallax Right Side */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1 relative hidden lg:block h-[600px] w-full"
          >
            {/* Floating App 3: Portfolio Site (Replaced the Code2 Icon) */}
            <motion.div style={{ x: x1, y: y1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="p-4 rounded-2xl glass-card border-brand-primary/20 flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                <img src="/portfolio-logo.png" alt="Pokemon Portfolio" className="w-16 h-16 rounded-xl object-cover shadow-lg" />
                <div className="text-center">
                  <h3 className="text-white font-bold text-sm">Pokemon Portfolio</h3>
                  <p className="text-brand-primary text-xs font-medium">React + Vite Web App</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full shadow-lg shadow-brand-primary/20 transform rotate-6">
                Neeraj
              </div>
            </motion.div>

            {/* Floating App 1: IQ Notes */}
            <motion.div style={{ x: x2, y: y2 }} className="absolute top-10 left-0 z-20">
              <div className="p-4 rounded-2xl glass-card border-brand-secondary/20 flex items-center gap-4 hover:scale-110 transition-transform">
                <img src="/iq-notes.png" alt="IQ Notes" className="w-12 h-12 object-contain" />
                <div>
                  <h3 className="text-white font-bold text-sm">IQ Notes</h3>
                  <p className="text-zinc-400 text-xs">Productivity App</p>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 px-3 py-1 bg-violet-500 text-white text-xs font-bold rounded-full shadow-lg shadow-violet-500/20 transform -rotate-12">
                Mario
              </div>
            </motion.div>

            {/* Floating App 2: Coin Tapper */}
            <motion.div style={{ x: x3, y: y3 }} className="absolute bottom-20 right-0 z-20">
              <div className="p-4 rounded-2xl glass-card border-emerald-500/20 flex items-center gap-4 hover:scale-110 transition-transform">
                <img src="/coin-tapper.png" alt="Coin Tapper" className="w-12 h-12 object-contain" />
                <div>
                  <h3 className="text-white font-bold text-sm">Coin Tapper</h3>
                  <p className="text-zinc-400 text-xs">Gaming App</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg shadow-emerald-500/20 transform rotate-12">
                Jessica
              </div>
            </motion.div>

            {/* Floating Tech Icon */}
            <motion.div style={{ x: x1, y: y3 }} className="absolute top-20 right-10 z-0">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center opacity-50">
                <Smartphone className="w-8 h-8 text-zinc-400" />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
