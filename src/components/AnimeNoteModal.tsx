import React, { useState, useEffect } from 'react';
import { Anime, AnimeNote } from '../types';
import { getAnimeNote, saveAnimeNote, deleteAnimeNote } from '../utils/animeNotes';

interface AnimeNoteModalProps {
  anime: Anime;
  onClose: () => void;
  onSave: () => void;
}

const watchStatusLabels = {
  'watching': '📺 Viendo',
  'completed': '✅ Completado',
  'on-hold': '⏸️ En Espera',
  'dropped': '❌ Abandonado',
  'plan-to-watch': '📋 Planeo Ver',
};

const AnimeNoteModal: React.FC<AnimeNoteModalProps> = ({ anime, onClose, onSave }) => {
  const [note, setNote] = useState('');
  const [personalRating, setPersonalRating] = useState<number>(0);
  const [watchStatus, setWatchStatus] = useState<AnimeNote['watchStatus']>('plan-to-watch');
  const [currentEpisode, setCurrentEpisode] = useState<number>(0);

  useEffect(() => {
    const existingNote = getAnimeNote(anime.mal_id);
    if (existingNote) {
      setNote(existingNote.note || '');
      setPersonalRating(existingNote.personalRating || 0);
      setWatchStatus(existingNote.watchStatus || 'plan-to-watch');
      setCurrentEpisode(existingNote.currentEpisode || 0);
    }
  }, [anime.mal_id]);

  const handleSave = () => {
    const animeNote: AnimeNote = {
      animeId: anime.mal_id,
      note,
      personalRating: personalRating > 0 ? personalRating : undefined,
      watchStatus,
      currentEpisode: currentEpisode > 0 ? currentEpisode : undefined,
      lastUpdated: new Date().toISOString(),
    };

    saveAnimeNote(animeNote);
    onSave();
    onClose();
  };

  const handleDelete = () => {
    if (confirm('¿Eliminar todas tus notas de este anime?')) {
      deleteAnimeNote(anime.mal_id);
      onSave();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-anime-darker to-anime-dark rounded-xl shadow-2xl border-2 border-anime-primary/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-24 h-32 object-cover rounded-lg border-2 border-anime-primary/30"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-anime-primary mb-2">{anime.title}</h2>
              <p className="text-anime-light text-sm">
                {anime.title_english || anime.title_japanese}
              </p>
            </div>
          </div>

          {/* Rating Personal */}
          <div className="mb-6">
            <label className="block text-anime-light font-semibold mb-3">
              ⭐ Tu Puntuación
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setPersonalRating(rating)}
                  className={`w-12 h-12 rounded-lg font-bold transition-all ${
                    personalRating >= rating
                      ? 'bg-gradient-to-br from-anime-accent to-anime-primary text-white scale-110 shadow-lg'
                      : 'bg-anime-darker/60 text-anime-secondary hover:bg-anime-darker border border-anime-primary/20'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Estado de Visualización */}
          <div className="mb-6">
            <label className="block text-anime-light font-semibold mb-3">
              📊 Estado
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(watchStatusLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setWatchStatus(key as AnimeNote['watchStatus'])}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    watchStatus === key
                      ? 'bg-gradient-to-r from-anime-primary to-anime-secondary text-white shadow-lg scale-105'
                      : 'bg-anime-darker/60 text-anime-light hover:bg-anime-darker border border-anime-primary/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Episodio Actual */}
          {anime.episodes && (
            <div className="mb-6">
              <label className="block text-anime-light font-semibold mb-3">
                🎬 Episodio Actual
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  max={anime.episodes}
                  value={currentEpisode}
                  onChange={(e) => setCurrentEpisode(parseInt(e.target.value) || 0)}
                  className="flex-1 px-4 py-3 bg-anime-darker/60 border-2 border-anime-primary/30 rounded-lg text-anime-light focus:outline-none focus:border-anime-primary transition-colors"
                  placeholder="0"
                />
                <span className="text-anime-secondary">/ {anime.episodes}</span>
              </div>
              <div className="mt-2 bg-anime-darker/40 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-anime-primary to-anime-accent transition-all"
                  style={{ width: `${((currentEpisode / anime.episodes) * 100).toFixed(1)}%` }}
                />
              </div>
            </div>
          )}

          {/* Notas */}
          <div className="mb-6">
            <label className="block text-anime-light font-semibold mb-3">
              📝 Tus Notas
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escribe tus pensamientos sobre este anime..."
              rows={5}
              className="w-full px-4 py-3 bg-anime-darker/60 border-2 border-anime-primary/30 rounded-lg text-anime-light focus:outline-none focus:border-anime-primary transition-colors resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-anime-primary to-anime-secondary text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-lg"
            >
              💾 Guardar
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500/20 text-red-400 border-2 border-red-500/40 rounded-lg font-semibold hover:bg-red-500/30 transition-all"
            >
              🗑️
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-anime-darker/60 text-anime-light border-2 border-anime-primary/30 rounded-lg font-semibold hover:bg-anime-darker transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeNoteModal;
