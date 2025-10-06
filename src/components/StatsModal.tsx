import React from 'react';
import { Anime } from '../types';
import { getAnimeStats } from '../utils/animeNotes';

interface StatsModalProps {
  favorites: Anime[];
  onClose: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ favorites, onClose }) => {
  const stats = getAnimeStats();

  // Calcular géneros más frecuentes
  const genreCounts: { [key: string]: number } = {};
  favorites.forEach((anime) => {
    anime.genres?.forEach((genre) => {
      genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
    });
  });

  const topGenres = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Calcular puntuación promedio de favoritos
  const avgScore =
    favorites.reduce((sum, anime) => sum + (anime.score || 0), 0) / (favorites.length || 1);

  // Animes en emisión
  const airingAnimes = favorites.filter((anime) => anime.airing);

  const statusLabels = {
    watching: { label: '📺 Viendo', color: 'from-blue-500 to-cyan-500' },
    completed: { label: '✅ Completado', color: 'from-green-500 to-emerald-500' },
    'on-hold': { label: '⏸️ En Espera', color: 'from-yellow-500 to-orange-500' },
    dropped: { label: '❌ Abandonado', color: 'from-red-500 to-pink-500' },
    'plan-to-watch': { label: '📋 Planeo Ver', color: 'from-purple-500 to-pink-500' },
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto animate-fade-in">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onClose}
            className="mb-4 px-6 py-3 bg-anime-primary hover:bg-anime-secondary rounded-lg text-white font-semibold transition-all hover:scale-105"
          >
            ← Volver
          </button>

          <div className="bg-gradient-to-br from-anime-darker to-anime-dark rounded-xl shadow-2xl border-2 border-anime-primary/30 p-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-anime-primary via-anime-secondary to-anime-accent mb-8 text-center">
              📊 Tus Estadísticas de Anime
            </h2>

            {/* Estadísticas Generales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-anime-primary/20 to-anime-secondary/20 rounded-xl p-6 border-2 border-anime-primary/30 text-center">
                <div className="text-4xl mb-2">❤️</div>
                <div className="text-3xl font-bold text-anime-primary">{favorites.length}</div>
                <div className="text-anime-light text-sm">Favoritos</div>
              </div>

              <div className="bg-gradient-to-br from-anime-accent/20 to-anime-primary/20 rounded-xl p-6 border-2 border-anime-accent/30 text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-anime-accent">{avgScore.toFixed(2)}</div>
                <div className="text-anime-light text-sm">Puntuación Media</div>
              </div>

              <div className="bg-gradient-to-br from-anime-secondary/20 to-anime-accent/20 rounded-xl p-6 border-2 border-anime-secondary/30 text-center">
                <div className="text-4xl mb-2">🔴</div>
                <div className="text-3xl font-bold text-anime-secondary">{airingAnimes.length}</div>
                <div className="text-anime-light text-sm">En Emisión</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border-2 border-purple-500/30 text-center">
                <div className="text-4xl mb-2">📝</div>
                <div className="text-3xl font-bold text-purple-400">{stats.totalWithNotes}</div>
                <div className="text-anime-light text-sm">Con Notas</div>
              </div>
            </div>

            {/* Top Géneros */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-anime-primary mb-4 flex items-center gap-2">
                🎭 Top 5 Géneros Favoritos
              </h3>
              <div className="space-y-3">
                {topGenres.map(([genre, count], index) => (
                  <div key={genre} className="bg-anime-darker/60 rounded-lg p-4 border border-anime-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-anime-light font-semibold">
                        #{index + 1} {genre}
                      </span>
                      <span className="text-anime-accent font-bold">{count} animes</span>
                    </div>
                    <div className="bg-anime-darker/40 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-anime-primary to-anime-accent transition-all"
                        style={{ width: `${(count / favorites.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estados de Visualización */}
            {stats.totalWithNotes > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-anime-primary mb-4 flex items-center gap-2">
                  📊 Estado de Visualización
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(stats.statusCounts).map(([status, count]) => {
                    const statusInfo = statusLabels[status as keyof typeof statusLabels];
                    if (count === 0) return null;
                    return (
                      <div
                        key={status}
                        className="bg-anime-darker/60 rounded-lg p-4 border border-anime-primary/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-anime-light font-semibold">{statusInfo.label}</span>
                          <span className="text-anime-accent font-bold">{count}</span>
                        </div>
                        <div className="bg-anime-darker/40 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${statusInfo.color} transition-all`}
                            style={{ width: `${(count / stats.totalWithNotes) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rating Personal */}
            {stats.averageRating > 0 && (
              <div className="bg-gradient-to-br from-anime-accent/20 to-anime-primary/20 rounded-xl p-6 border-2 border-anime-accent/30">
                <h3 className="text-xl font-bold text-anime-accent mb-2 flex items-center gap-2">
                  ⭐ Tu Puntuación Promedio
                </h3>
                <div className="text-4xl font-bold text-center text-anime-primary">
                  {stats.averageRating.toFixed(2)} / 10
                </div>
                <p className="text-anime-light text-center text-sm mt-2">
                  Basado en {stats.totalWithNotes} animes calificados
                </p>
              </div>
            )}

            {/* Episodios */}
            {stats.totalEpisodes > 0 && (
              <div className="mt-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border-2 border-purple-500/30 text-center">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-3xl font-bold text-purple-400">{stats.totalEpisodes}</div>
                <div className="text-anime-light text-sm">Episodios Vistos</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
