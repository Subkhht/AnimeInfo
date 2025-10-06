import { AnimeNote } from '../types';

const NOTES_KEY = 'animeinfo_notes';

// Obtener todas las notas
export const getAllNotes = (): AnimeNote[] => {
  try {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error al cargar notas:', error);
    return [];
  }
};

// Guardar notas
const saveNotes = (notes: AnimeNote[]): void => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error al guardar notas:', error);
  }
};

// Obtener nota de un anime específico
export const getAnimeNote = (animeId: number): AnimeNote | null => {
  const notes = getAllNotes();
  return notes.find(note => note.animeId === animeId) || null;
};

// Guardar o actualizar nota
export const saveAnimeNote = (note: AnimeNote): void => {
  const notes = getAllNotes();
  const existingIndex = notes.findIndex(n => n.animeId === note.animeId);
  
  note.lastUpdated = new Date().toISOString();
  
  if (existingIndex >= 0) {
    notes[existingIndex] = note;
  } else {
    notes.push(note);
  }
  
  saveNotes(notes);
};

// Eliminar nota
export const deleteAnimeNote = (animeId: number): void => {
  const notes = getAllNotes();
  const filtered = notes.filter(note => note.animeId !== animeId);
  saveNotes(filtered);
};

// Obtener estadísticas
export interface AnimeStats {
  totalWithNotes: number;
  averageRating: number;
  statusCounts: {
    watching: number;
    completed: number;
    'on-hold': number;
    dropped: number;
    'plan-to-watch': number;
  };
  totalEpisodes: number;
}

export const getAnimeStats = (): AnimeStats => {
  const notes = getAllNotes();
  
  const stats: AnimeStats = {
    totalWithNotes: notes.length,
    averageRating: 0,
    statusCounts: {
      watching: 0,
      completed: 0,
      'on-hold': 0,
      dropped: 0,
      'plan-to-watch': 0,
    },
    totalEpisodes: 0,
  };
  
  let ratingSum = 0;
  let ratingCount = 0;
  
  notes.forEach(note => {
    if (note.personalRating) {
      ratingSum += note.personalRating;
      ratingCount++;
    }
    
    if (note.watchStatus) {
      stats.statusCounts[note.watchStatus]++;
    }
    
    if (note.currentEpisode) {
      stats.totalEpisodes += note.currentEpisode;
    }
  });
  
  stats.averageRating = ratingCount > 0 ? ratingSum / ratingCount : 0;
  
  return stats;
};
