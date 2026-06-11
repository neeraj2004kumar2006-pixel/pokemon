import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <Code2 className="w-6 h-6 text-brand-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Pokemon</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {['About', 'Apps', 'Websites', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
                {item}
              </a>
            ))}
          </nav>

          <button 
            onClick={scrollToTop}
            className="p-3 rounded-xl glass hover:bg-white/10 text-white transition-colors group flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Pokemon. All rights reserved.</p>
          <p>
            Designed & Built with <span className="text-rose-500">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
