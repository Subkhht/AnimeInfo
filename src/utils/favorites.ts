import { Anime } from '../types';

const FAVORITES_KEY = 'animeinfo_favorites';

export const getFavorites = (): Anime[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al cargar favoritos:', error);
    return [];
  }
};

export const saveFavorites = (favorites: Anime[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error al guardar favoritos:', error);
  }
};

export const addFavorite = (anime: Anime): void => {
  const favorites = getFavorites();
  const exists = favorites.some(fav => fav.mal_id === anime.mal_id);
  
  if (!exists) {
    favorites.push(anime);
    saveFavorites(favorites);
  }
};

export const removeFavorite = (animeId: number): void => {
  const favorites = getFavorites();
  const filtered = favorites.filter(fav => fav.mal_id !== animeId);
  saveFavorites(filtered);
};

export const isFavorite = (animeId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.mal_id === animeId);
};

export const toggleFavorite = (anime: Anime): boolean => {
  if (isFavorite(anime.mal_id)) {
    removeFavorite(anime.mal_id);
    return false;
  } else {
    addFavorite(anime);
    return true;
  }
};
