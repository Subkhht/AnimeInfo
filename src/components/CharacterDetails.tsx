import React, { useState, useEffect } from 'react';
import { Character } from '../types';
import { translateText } from '../utils/translations';

interface CharacterDetailsProps {
  character: Character;
  onClose: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character, onClose }) => {
  const [translatedAbout, setTranslatedAbout] = useState<string>(character.about || '');
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const translateAbout = async () => {
      if (character.about && character.about.length > 0) {
        setIsTranslating(true);
        try {
          const translated = await translateText(character.about, 'es');
          setTranslatedAbout(translated);
        } catch (error) {
          console.error('Error al traducir la biografía:', error);
          setTranslatedAbout(character.about);
        } finally {
          setIsTranslating(false);
        }
      }
    };

    translateAbout();
  }, [character.about]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto animate-fade-in">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="mb-4 px-6 py-3 bg-anime-secondary hover:bg-anime-primary rounded-lg text-white font-semibold transition-all hover:scale-105"
          >
            ← Volver
          </button>

          <div className="bg-gradient-to-br from-anime-darker to-anime-dark rounded-xl shadow-2xl border-2 border-anime-secondary/30 overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="relative">
              <div className="flex flex-col md:flex-row gap-6 p-8">
                <img
                  src={character.images.jpg.image_url || character.images.webp?.image_url}
                  alt={character.name}
                  className="w-full md:w-80 h-96 object-cover rounded-lg shadow-2xl border-4 border-anime-secondary/50"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                  }}
                />
                
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-anime-light mb-2">
                    {character.name}
                  </h1>
                  
                  {character.name_kanji && (
                    <p className="text-2xl text-anime-accent mb-4">{character.name_kanji}</p>
                  )}

                  {/* Favoritos */}
                  {character.favorites && character.favorites > 0 && (
                    <div className="inline-flex items-center gap-2 bg-anime-secondary/90 px-6 py-3 rounded-lg mb-4">
                      <span className="text-red-300 text-2xl">❤️</span>
                      <span className="text-white font-bold text-lg">
                        {character.favorites.toLocaleString()} favoritos
                      </span>
                    </div>
                  )}

                  {/* Apodos */}
                  {character.nicknames && character.nicknames.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-anime-primary font-bold mb-2">📝 Apodos</h3>
                      <div className="flex flex-wrap gap-2">
                        {character.nicknames.map((nickname, index) => (
                          <span
                            key={index}
                            className="bg-anime-secondary/20 text-anime-light px-3 py-1 rounded-full text-sm"
                          >
                            "{nickname}"
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Información */}
            <div className="p-8 border-t border-anime-secondary/20">
              {character.about && (
                <div>
                  <h3 className="text-anime-primary font-bold text-xl mb-4">📖 Acerca de</h3>
                  {isTranslating ? (
                    <div className="flex items-center gap-2 text-anime-light">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-anime-primary"></div>
                      <span>Traduciendo...</span>
                    </div>
                  ) : (
                    <div className="text-anime-light leading-relaxed space-y-4">
                      {translatedAbout.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!character.about && (
                <div className="text-center py-8">
                  <p className="text-anime-secondary text-lg">
                    No hay información detallada disponible para este personaje.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
