import React from 'react';
import { Theme } from '../utils/theme';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="relative bg-gradient-to-r from-anime-darker via-anime-purple to-anime-darker border-b-4 border-anime-primary shadow-2xl overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-anime-neon-pink rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-anime-cyan rounded-full blur-3xl animate-float-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Botón de Tema */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onToggleTheme}
            className="px-4 py-2 bg-anime-darker/80 backdrop-blur-sm border-2 border-anime-primary/40 rounded-lg text-white font-semibold hover:bg-anime-darker hover:scale-110 transition-all shadow-lg flex items-center gap-2"
            title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          >
            {theme === 'dark' ? (
              <>
                <span className="text-2xl">☀️</span>
                <span className="hidden sm:inline">Claro</span>
              </>
            ) : (
              <>
                <span className="text-2xl">🌙</span>
                <span className="hidden sm:inline">Oscuro</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-3 px-4">
          <span className="text-6xl animate-bounce-slow">🌸</span>
          <h1 className="text-6xl md:text-7xl font-black text-center px-8 py-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 inline-block" style={{ 
              fontFamily: 'Bangers, Poppins, sans-serif',
              textShadow: '0 0 30px rgba(236, 72, 153, 0.7), 0 0 60px rgba(168, 85, 247, 0.4)',
              filter: 'brightness(1.2)',
              padding: '0 20px'
            }}>
              ANIMEINFO
            </span>
          </h1>
          <span className="text-6xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🌸</span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl animate-wiggle">✨</span>
          <p className="text-center text-white text-xl font-bold tracking-wider" style={{ 
            textShadow: '0 0 15px rgba(236, 72, 153, 0.6), 0 2px 8px rgba(0,0,0,0.4)'
          }}>
            Tu Portal al Mundo del Anime
          </p>
          <span className="text-2xl animate-wiggle" style={{ animationDelay: '0.3s' }}>✨</span>
        </div>
        
        {/* Decoraciones adicionales */}
        <div className="flex justify-center gap-4 mt-4 text-3xl">
          <span className="animate-float">⭐</span>
          <span className="animate-float" style={{ animationDelay: '0.5s' }}>💫</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>🌟</span>
          <span className="animate-float" style={{ animationDelay: '1.5s' }}>💫</span>
          <span className="animate-float" style={{ animationDelay: '2s' }}>⭐</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
