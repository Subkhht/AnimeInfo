import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  return (
    <div
      onClick={() => onClick(character)}
      className="group bg-gradient-to-br from-anime-darker via-anime-dark to-anime-blue rounded-2xl overflow-hidden shadow-2xl hover:shadow-anime-cyan/50 border-4 border-anime-blue/30 hover:border-anime-cyan hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-pointer animate-slide-up neon-border"
      style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}
    >
      {/* Imagen del personaje */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={character.images.jpg.image_url || character.images.webp?.image_url}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-anime-darker via-transparent to-transparent opacity-60"></div>
        
        {/* Badge de favoritos */}
        {character.favorites && character.favorites > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-br from-red-500 to-pink-500 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl border-2 border-red-400/50 animate-glow-pulse">
            <span className="text-white text-2xl animate-float">❤️</span>
            <span className="text-white font-black text-lg">
              {character.favorites > 1000 
                ? `${(character.favorites / 1000).toFixed(1)}k` 
                : character.favorites}
            </span>
          </div>
        )}
        
        {/* Efecto de brillo al hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-anime-cyan/0 to-anime-purple/0 group-hover:from-anime-cyan/20 group-hover:to-anime-purple/20 transition-all duration-500"></div>
      </div>

      {/* Información del personaje */}
      <div className="p-6 bg-gradient-to-b from-transparent to-anime-darker/50">
        <h3 className="text-2xl font-black text-anime-light mb-3 line-clamp-2 group-hover:text-anime-cyan transition-colors" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          {character.name}
        </h3>
        
        {character.name_kanji && (
          <p className="text-anime-purple text-base mb-3 font-semibold">
            {character.name_kanji}
          </p>
        )}

        {character.nicknames && character.nicknames.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {character.nicknames.slice(0, 2).map((nickname, index) => (
              <span
                key={index}
                className="text-xs bg-gradient-to-r from-anime-cyan to-anime-blue text-white px-3 py-1.5 rounded-full font-bold border-2 border-anime-cyan/30 shadow-lg"
              >
                "{nickname}"
              </span>
            ))}
          </div>
        )}

        {character.about && (
          <p className="text-anime-secondary text-sm line-clamp-3">
            {character.about}
          </p>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
