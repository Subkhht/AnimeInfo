import React, { useState } from 'react';
import { Anime } from '../types';
import { translateGenre } from '../utils/translations';
import { toggleFavorite, isFavorite } from '../utils/favorites';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
  onFavoriteChange?: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick, onFavoriteChange }) => {
  const [isFav, setIsFav] = useState(isFavorite(anime.mal_id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleFavorite(anime);
    setIsFav(newState);
    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };
  return (
    <div
      onClick={() => onClick(anime)}
      className="group bg-gradient-to-br from-anime-darker via-anime-dark to-anime-purple rounded-2xl shadow-2xl hover:shadow-anime-neon-pink/50 transition-all duration-300 cursor-pointer overflow-hidden border-4 border-anime-secondary/30 hover:border-anime-primary hover:scale-105 hover:rotate-1 animate-slide-up neon-border"
      style={{ boxShadow: '0 0 30px rgba(255, 20, 147, 0.3)' }}
    >
      {/* Imagen del anime */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-anime-darker via-transparent to-transparent opacity-60"></div>
        
        {/* Botón de favoritos */}
        <button
          onClick={handleFavoriteClick}
          className="absolute bottom-3 right-3 bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 backdrop-blur-sm p-3 rounded-full shadow-2xl border-2 border-red-400/50 transition-all hover:scale-110 z-10"
          title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span className="text-2xl">{isFav ? '❤️' : '🤍'}</span>
        </button>
        
        {/* Badge de puntuación */}
        {anime.score && (
          <div className="absolute top-3 right-3 bg-gradient-to-br from-anime-yellow to-anime-orange backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl border-2 border-anime-yellow/50 animate-glow-pulse">
            <span className="text-white text-2xl animate-spin-slow">⭐</span>
            <span className="text-white font-black text-xl">{anime.score.toFixed(1)}</span>
          </div>
        )}

        {/* Badge de estado */}
        {anime.airing && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl border-2 border-red-400 animate-glow-pulse">
            <span className="text-white font-black text-sm flex items-center gap-2">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              EN EMISIÓN
            </span>
          </div>
        )}
        
        {/* Efecto de brillo al hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-anime-neon-pink/0 to-anime-cyan/0 group-hover:from-anime-neon-pink/20 group-hover:to-anime-cyan/20 transition-all duration-500"></div>
      </div>

      {/* Información del anime */}
      <div className="p-6 bg-gradient-to-b from-transparent to-anime-darker/50">
        <h3 className="text-2xl font-black text-anime-light mb-3 line-clamp-2 group-hover:text-anime-neon-pink transition-colors" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          {anime.title}
        </h3>
        
        {anime.title_english && anime.title_english !== anime.title && (
          <p className="text-sm text-anime-cyan mb-3 line-clamp-1 font-semibold">{anime.title_english}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {anime.genres?.slice(0, 3).map((genre, index) => (
            <span
              key={genre.mal_id}
              className="bg-gradient-to-r from-anime-purple to-anime-blue text-white px-4 py-1.5 rounded-full text-xs font-bold border-2 border-anime-cyan/30 shadow-lg hover:scale-110 transition-transform"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {translateGenre(genre.name)}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm font-bold">
          <span className="flex items-center gap-1 text-anime-cyan">
            <span className="text-lg">📺</span> {anime.episodes || '?'} eps
          </span>
          <span className="text-anime-secondary">
            {anime.status === 'Finished Airing' ? '✓ Finalizado' : 
             anime.status === 'Currently Airing' ? '📡 En emisión' : 
             '⏰ Próximamente'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
