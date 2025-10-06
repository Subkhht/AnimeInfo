import React from 'react';
import { Anime } from '../types';
import { translateGenre } from '../utils/translations';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { getAnimeNote } from '../utils/animeNotes';
import { useState, useEffect } from 'react';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
  onFavoriteChange?: () => void;
  viewMode?: 'grid' | 'list';
}

const AnimeListCard: React.FC<AnimeCardProps> = ({ anime, onClick, onFavoriteChange, viewMode = 'grid' }) => {
  const [isFav, setIsFav] = useState(false);
  const [hasNote, setHasNote] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(anime.mal_id));
    setHasNote(!!getAnimeNote(anime.mal_id));
  }, [anime.mal_id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(anime);
    setIsFav(!isFav);
    if (onFavoriteChange) onFavoriteChange();
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onClick(anime)}
        className="bg-gradient-to-r from-anime-darker/80 to-anime-dark/80 backdrop-blur-sm rounded-lg border-2 border-anime-primary/20 hover:border-anime-secondary/60 transition-all cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-anime-primary/20 animate-fade-in overflow-hidden"
      >
        <div className="flex gap-4 p-4">
          {/* Imagen */}
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="w-24 h-32 object-cover rounded-lg border-2 border-anime-primary/30"
            loading="lazy"
          />

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-anime-light font-bold text-lg line-clamp-2 flex-1">
                {anime.title}
              </h3>
              <div className="flex gap-2 flex-shrink-0">
                {hasNote && (
                  <div className="w-8 h-8 flex items-center justify-center bg-purple-500/20 border border-purple-400/40 rounded-full">
                    <span className="text-sm">📝</span>
                  </div>
                )}
                <button
                  onClick={handleFavoriteClick}
                  className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                  <span className="text-sm">{isFav ? '❤️' : '🤍'}</span>
                </button>
              </div>
            </div>

            {/* Info en una línea */}
            <div className="flex flex-wrap gap-2 mb-2">
              {anime.score && (
                <div className="flex items-center gap-1 bg-anime-primary/20 px-2 py-1 rounded-md">
                  <span className="text-yellow-400 text-xs">⭐</span>
                  <span className="text-anime-accent font-bold text-sm">{anime.score.toFixed(2)}</span>
                </div>
              )}
              {anime.episodes && (
                <div className="bg-anime-secondary/20 px-2 py-1 rounded-md">
                  <span className="text-anime-light text-xs">📺 {anime.episodes} eps</span>
                </div>
              )}
              {anime.airing && (
                <div className="bg-green-500/20 px-2 py-1 rounded-md">
                  <span className="text-green-400 text-xs">🔴 En emisión</span>
                </div>
              )}
            </div>

            {/* Géneros */}
            {anime.genres && anime.genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {anime.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="text-anime-secondary text-xs bg-anime-darker/60 px-2 py-1 rounded-md border border-anime-primary/20"
                  >
                    {translateGenre(genre.name)}
                  </span>
                ))}
                {anime.genres.length > 3 && (
                  <span className="text-anime-secondary text-xs">+{anime.genres.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Vista Grid (por defecto)
  return (
    <div
      onClick={() => onClick(anime)}
      className="group bg-gradient-to-br from-anime-darker/80 to-anime-dark/80 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-anime-primary/20 hover:border-anime-secondary/60 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-anime-primary/20 animate-fade-in"
    >
      <div className="relative overflow-hidden">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-anime-darker via-anime-darker/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Botones superpuestos */}
        <div className="absolute top-2 right-2 flex gap-2">
          {hasNote && (
            <div className="w-10 h-10 flex items-center justify-center bg-purple-500/90 border-2 border-purple-300 rounded-full shadow-lg backdrop-blur-sm">
              <span>📝</span>
            </div>
          )}
          <button
            onClick={handleFavoriteClick}
            className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 rounded-full hover:scale-110 transition-transform shadow-lg border-2 border-white/50"
          >
            <span>{isFav ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* Badge de estado */}
        {anime.airing && (
          <div className="absolute top-2 left-2 bg-green-500/90 px-3 py-1 rounded-full border-2 border-green-300 shadow-lg backdrop-blur-sm">
            <span className="text-white font-bold text-xs">🔴 EN VIVO</span>
          </div>
        )}

        {/* Score */}
        {anime.score && (
          <div className="absolute bottom-2 left-2 bg-anime-primary/90 px-3 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm border border-anime-accent/30">
            <span className="text-yellow-300">⭐</span>
            <span className="text-white font-bold">{anime.score.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-anime-light font-bold text-lg mb-2 line-clamp-2 group-hover:text-anime-primary transition-colors">
          {anime.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-2">
          {anime.episodes && (
            <span className="text-anime-secondary text-sm">📺 {anime.episodes} eps</span>
          )}
        </div>

        {anime.genres && anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.mal_id}
                className="text-anime-accent text-xs bg-anime-primary/10 px-2 py-1 rounded-md border border-anime-primary/30"
              >
                {translateGenre(genre.name)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeListCard;
