import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Anime, AnimeCharacter } from '../types';
import { translateGenre, translateText } from '../utils/translations';
import AnimeNoteModal from './AnimeNoteModal';
import { getAnimeNote } from '../utils/animeNotes';

interface AnimeDetailsProps {
  anime: Anime;
  characters: AnimeCharacter[];
  onClose: () => void;
  onNoteUpdate?: () => void;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = React.memo(({ anime, characters, onClose, onNoteUpdate }) => {
  const [translatedSynopsis, setTranslatedSynopsis] = useState<string>(anime.synopsis || '');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [hasNote, setHasNote] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const translateSynopsis = async () => {
      if (anime.synopsis && anime.synopsis.length > 0) {
        setIsTranslating(true);
        try {
          const translated = await translateText(anime.synopsis, 'es');
          if (isMounted) {
            setTranslatedSynopsis(translated);
          }
        } catch (error) {
          console.error('Error al traducir la sinopsis:', error);
          if (isMounted) {
            setTranslatedSynopsis(anime.synopsis);
          }
        } finally {
          if (isMounted) {
            setIsTranslating(false);
          }
        }
      }
    };

    translateSynopsis();
    
    // Verificar si tiene notas
    const note = getAnimeNote(anime.mal_id);
    setHasNote(!!note);
    
    return () => {
      isMounted = false;
    };
  }, [anime.synopsis, anime.mal_id]);

  const handleNoteUpdate = useCallback(() => {
    const note = getAnimeNote(anime.mal_id);
    setHasNote(!!note);
    if (onNoteUpdate) onNoteUpdate();
  }, [anime.mal_id, onNoteUpdate]);
  
  // Memoizar la lista de personajes principales
  const mainCharacters = useMemo(() => 
    characters.slice(0, 12),
    [characters]
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto animate-fade-in">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="mb-4 px-6 py-3 bg-anime-primary hover:bg-anime-secondary rounded-lg text-white font-semibold transition-all hover:scale-105"
          >
            ← Volver
          </button>

          {/* Botón de Notas */}
          <button
            onClick={() => setShowNoteModal(true)}
            className={`mb-4 ml-4 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 ${
              hasNote
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg animate-glow-pulse'
                : 'bg-anime-darker/60 text-anime-light border-2 border-anime-primary/30 hover:bg-anime-darker'
            }`}
          >
            {hasNote ? '📝 Editar Notas' : '📝 Agregar Notas'}
          </button>

          <div className="bg-gradient-to-br from-anime-darker to-anime-dark rounded-xl shadow-2xl border-2 border-anime-primary/30 overflow-hidden animate-slide-up">
            {/* Header con imagen de fondo */}
            <div className="relative h-96 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center blur-sm"
                style={{
                  backgroundImage: `url(${anime.images.jpg.large_image_url || anime.images.jpg.image_url})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anime-darker via-anime-darker/70 to-transparent" />
              
              <div className="relative h-full flex items-end p-8">
                <div className="flex gap-6 w-full">
                  <img
                    src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-48 h-64 object-cover rounded-lg shadow-2xl border-4 border-anime-primary/50"
                  />
                  
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-anime-light mb-2">
                      {anime.title}
                    </h1>
                    {anime.title_english && anime.title_english !== anime.title && (
                      <p className="text-xl text-anime-accent mb-2">{anime.title_english}</p>
                    )}
                    {anime.title_japanese && (
                      <p className="text-lg text-anime-secondary mb-4">{anime.title_japanese}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-3">
                      {anime.score && (
                        <div className="bg-anime-primary/90 px-4 py-2 rounded-lg flex items-center gap-2">
                          <span className="text-yellow-300 text-xl">⭐</span>
                          <span className="text-white font-bold text-lg">{anime.score.toFixed(2)}</span>
                          <span className="text-anime-light text-sm">({anime.scored_by?.toLocaleString()} votos)</span>
                        </div>
                      )}
                      {anime.rank && (
                        <div className="bg-anime-accent/90 px-4 py-2 rounded-lg">
                          <span className="text-white font-bold">🏆 Rank #{anime.rank}</span>
                        </div>
                      )}
                      {anime.airing ? (
                        <div className="bg-green-500/90 px-4 py-2 rounded-lg">
                          <span className="text-white font-bold">🔴 EN EMISIÓN</span>
                        </div>
                      ) : (
                        anime.status && (
                          <div className="bg-anime-secondary/90 px-4 py-2 rounded-lg">
                            <span className="text-white font-bold">
                              {anime.status === 'Finished Airing' ? '✓ FINALIZADO' : 
                               anime.status === 'Not yet aired' ? '⏰ PRÓXIMAMENTE' : 
                               anime.status}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-8">
              {/* Información general */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-anime-dark/50 p-4 rounded-lg border border-anime-primary/20">
                  <h3 className="text-anime-primary font-bold mb-2">📊 Estado</h3>
                  <p className="text-anime-light">
                    {anime.status === 'Finished Airing' ? 'Finalizado' :
                     anime.status === 'Currently Airing' ? 'En emisión' :
                     anime.status === 'Not yet aired' ? 'Próximamente' :
                     anime.status || 'Desconocido'}
                  </p>
                </div>
                
                <div className="bg-anime-dark/50 p-4 rounded-lg border border-anime-primary/20">
                  <h3 className="text-anime-primary font-bold mb-2">📺 Episodios</h3>
                  <p className="text-anime-light">{anime.episodes || 'Desconocido'}</p>
                </div>
                
                <div className="bg-anime-dark/50 p-4 rounded-lg border border-anime-primary/20">
                  <h3 className="text-anime-primary font-bold mb-2">📅 Emisión</h3>
                  <p className="text-anime-light text-sm">{anime.aired?.string || 'Desconocido'}</p>
                </div>

                {anime.rating && (
                  <div className="bg-anime-dark/50 p-4 rounded-lg border border-anime-primary/20">
                    <h3 className="text-anime-primary font-bold mb-2">🔞 Clasificación</h3>
                    <p className="text-anime-light">
                      {anime.rating === 'G - All Ages' ? 'Para todas las edades' :
                       anime.rating === 'PG - Children' ? 'Apto para niños' :
                       anime.rating === 'PG-13 - Teens 13 or older' ? 'Adolescentes +13' :
                       anime.rating === 'R - 17+ (violence & profanity)' ? '+17 (violencia y lenguaje)' :
                       anime.rating === 'R+ - Mild Nudity' ? '+17 (desnudez leve)' :
                       anime.rating === 'Rx - Hentai' ? 'Solo adultos' :
                       anime.rating}
                    </p>
                  </div>
                )}

                {anime.popularity && (
                  <div className="bg-anime-dark/50 p-4 rounded-lg border border-anime-primary/20">
                    <h3 className="text-anime-primary font-bold mb-2">📈 Popularidad</h3>
                    <p className="text-anime-light">#{anime.popularity}</p>
                  </div>
                )}

                {anime.members && (
                  <div className="bg-anime-dark/50 p-4 rounded-lg border border-anime-primary/20">
                    <h3 className="text-anime-primary font-bold mb-2">👥 Miembros</h3>
                    <p className="text-anime-light">{anime.members.toLocaleString()}</p>
                  </div>
                )}
              </div>

              {/* Trailer */}
              {anime.trailer && anime.trailer.embed_url && (
                <div className="mb-8">
                  <h3 className="text-anime-primary font-bold text-xl mb-3">🎬 Trailer</h3>
                  <div className="relative rounded-lg overflow-hidden border-2 border-anime-primary/30 shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={anime.trailer.embed_url}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`Trailer de ${anime.title}`}
                    />
                  </div>
                </div>
              )}

              {/* Géneros */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-anime-primary font-bold text-xl mb-3">🎭 Géneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="bg-anime-primary/20 text-anime-accent px-4 py-2 rounded-full border border-anime-accent/30"
                      >
                        {translateGenre(genre.name)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sinopsis */}
              {anime.synopsis && (
                <div className="mb-8">
                  <h3 className="text-anime-primary font-bold text-xl mb-3">📖 Sinopsis</h3>
                  {isTranslating ? (
                    <div className="flex items-center gap-2 text-anime-light">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-anime-primary"></div>
                      <span>Traduciendo...</span>
                    </div>
                  ) : (
                    <p className="text-anime-light leading-relaxed">{translatedSynopsis}</p>
                  )}
                </div>
              )}

              {/* Studios */}
              {anime.studios && anime.studios.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-anime-primary font-bold text-xl mb-3">🎬 Estudios</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.studios.map((studio) => (
                      <span
                        key={studio.mal_id}
                        className="bg-anime-secondary/20 text-anime-light px-4 py-2 rounded-lg"
                      >
                        {studio.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Personajes */}
              {mainCharacters.length > 0 && (
                <div>
                  <h3 className="text-anime-primary font-bold text-xl mb-4">👥 Personajes Principales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mainCharacters.map((char) => (
                      <div
                        key={char.character.mal_id}
                        className="bg-anime-dark/50 rounded-lg overflow-hidden border border-anime-secondary/20 hover:border-anime-accent/50 transition-all"
                      >
                        <img
                          src={char.character.images.jpg.image_url}
                          alt={char.character.name}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                          }}
                        />
                        <div className="p-3">
                          <p className="text-anime-light font-semibold text-sm line-clamp-2">
                            {char.character.name}
                          </p>
                          <p className="text-anime-accent text-xs mt-1">{char.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Notas */}
      {showNoteModal && (
        <AnimeNoteModal
          anime={anime}
          onClose={() => setShowNoteModal(false)}
          onSave={handleNoteUpdate}
        />
      )}
    </div>
  );
});

AnimeDetails.displayName = 'AnimeDetails';

export default AnimeDetails;
