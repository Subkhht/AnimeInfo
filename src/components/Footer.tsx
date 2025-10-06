import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-r from-anime-darker via-anime-purple to-anime-darker border-t-4 border-anime-primary mt-20 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-anime-neon-pink rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-0 right-1/3 w-48 h-48 bg-anime-cyan rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center gap-2 items-center mb-4">
            <span className="text-3xl animate-float">💖</span>
            <p className="text-anime-light text-lg font-bold neon-text">
              Desarrollado con amor por un fan del anime
            </p>
            <span className="text-3xl animate-float" style={{ animationDelay: '0.5s' }}>💖</span>
          </div>
          
          <p className="text-anime-cyan text-sm font-semibold mb-4">
            Powered by{' '}
            <a
              href="https://jikan.moe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anime-neon-pink hover:text-anime-yellow transition-colors underline font-bold"
            >
              Jikan API
            </a>
            {' '}(MyAnimeList)
          </p>
          
          <div className="flex justify-center gap-6 mb-4">
            <span className="text-2xl animate-float">🌸</span>
            <span className="text-2xl animate-float" style={{ animationDelay: '0.3s' }}>⭐</span>
            <span className="text-2xl animate-float" style={{ animationDelay: '0.6s' }}>💫</span>
            <span className="text-2xl animate-float" style={{ animationDelay: '0.9s' }}>✨</span>
          </div>
          
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://github.com/jikan-me/jikan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anime-accent hover:text-anime-neon-blue transition-colors font-bold hover:scale-110 transform inline-block"
            >
              GitHub
            </a>
            <span className="text-anime-secondary">•</span>
            <a
              href="https://docs.api.jikan.moe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anime-primary hover:text-anime-accent transition-colors"
            >
              API Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
