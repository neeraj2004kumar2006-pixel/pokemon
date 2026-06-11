import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`New Contact Message from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    
    window.location.href = `mailto:neerajpoonia27@gmail.com?subject=${subject}&body=${body}`;
    
    setFormState({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 relative" id="contact">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Have a project in mind? Looking to partner or work together? Reach out through the form and I'll get back to you within the next 48 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card p-8 rounded-3xl space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Email</p>
                    <a href="mailto:neerajpoonia27@gmail.com" className="text-white font-medium hover:text-brand-primary transition-colors">
                      neerajpoonia27@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-400/10 text-emerald-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Location</p>
                    <p className="text-white font-medium">Bikaner, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-zinc-400 mb-4">Follow Me</p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 rounded-xl glass hover:bg-white/10 text-white transition-colors">
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 rounded-xl glass hover:bg-white/10 text-white transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 rounded-xl glass hover:bg-white/10 text-white transition-colors">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-300">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-300">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
