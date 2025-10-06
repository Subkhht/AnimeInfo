import React, { useState, useEffect } from 'react';
import { Anime } from '../types';
import { jikanAPI } from '../services/api';
import AnimeListCard from './AnimeListCard';
import LoadingSpinner from './LoadingSpinner';

interface RecommendationsModalProps {
  favorites: Anime[];
  onClose: () => void;
  onAnimeClick: (anime: Anime) => void;
  onFavoriteChange: () => void;
}

const RecommendationsModal: React.FC<RecommendationsModalProps> = ({
  favorites,
  onClose,
  onAnimeClick,
  onFavoriteChange,
}) => {
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadRecommendations();
  }, [favorites]);

  const loadRecommendations = async () => {
    if (favorites.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Obtener recomendaciones de los últimos 3 favoritos
      const recentFavorites = favorites.slice(-3);
      const allRecommendations: Anime[] = [];
      
      for (const anime of recentFavorites) {
        const recs = await jikanAPI.getAnimeRecommendations(anime.mal_id);
        allRecommendations.push(...recs);
        
        // Pequeño delay para no saturar la API
        await new Promise(resolve => setTimeout(resolve, 350));
      }

      // Eliminar duplicados y animes que ya están en favoritos
      const uniqueRecs = allRecommendations.filter((rec, index, self) => {
        const isUnique = self.findIndex(r => r.mal_id === rec.mal_id) === index;
        const notInFavorites = !favorites.some(fav => fav.mal_id === rec.mal_id);
        return isUnique && notInFavorites;
      });

      // Limitar a 12 recomendaciones
      setRecommendations(uniqueRecs.slice(0, 12));
    } catch (error) {
      console.error('Error al cargar recomendaciones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto animate-fade-in">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-anime-primary hover:bg-anime-secondary rounded-lg text-white font-semibold transition-all hover:scale-105"
            >
              ← Volver
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 bg-anime-darker/60 text-anime-light border-2 border-anime-primary/30 rounded-lg font-semibold hover:bg-anime-darker transition-all"
            >
              {viewMode === 'grid' ? '📋 Vista Lista' : '🔲 Vista Grid'}
            </button>
          </div>

          <div className="bg-gradient-to-br from-anime-darker to-anime-dark rounded-xl shadow-2xl border-2 border-anime-primary/30 p-8 animate-slide-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-anime-primary via-anime-secondary to-anime-accent mb-2 text-center">
                🎯 Recomendaciones Para Ti
              </h2>
              <p className="text-anime-light text-center">
                Basado en tus {favorites.length} animes favoritos
              </p>
            </div>

            {isLoading ? (
              <LoadingSpinner message="Analizando tus gustos y buscando recomendaciones..." />
            ) : recommendations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-anime-light mb-4">
                  {favorites.length === 0
                    ? '📋 Agrega animes a tus favoritos para recibir recomendaciones'
                    : '😅 No se encontraron recomendaciones en este momento'}
                </p>
                <p className="text-anime-secondary">
                  Intenta agregar más animes a tus favoritos para mejores recomendaciones
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 bg-anime-primary/10 border-2 border-anime-primary/30 rounded-lg p-4">
                  <p className="text-anime-light text-center">
                    💡 <span className="font-bold text-anime-accent">
                      {recommendations.length} animes recomendados
                    </span>{' '}
                    basados en tus favoritos más recientes
                  </p>
                </div>

                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                  {recommendations.map((anime) => (
                    <AnimeListCard
                      key={anime.mal_id}
                      anime={anime}
                      onClick={onAnimeClick}
                      onFavoriteChange={onFavoriteChange}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={loadRecommendations}
                    className="px-6 py-3 bg-gradient-to-r from-anime-accent to-anime-primary text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-lg"
                  >
                    🔄 Actualizar Recomendaciones
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModal;
