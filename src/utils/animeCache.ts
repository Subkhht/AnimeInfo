import { Anime } from '../types';

const CACHE_KEY = 'animeinfo_all_animes_cache';
const CACHE_TIMESTAMP_KEY = 'animeinfo_cache_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export const animeCache = {
  // Guardar animes en caché
  save: (animes: Anime[]): void => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(animes));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('❌ Error al guardar caché:', error);
    }
  },

  // Cargar animes desde caché
  load: (): Anime[] | null => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (!cachedData || !timestamp) {
        return null;
      }

      const cacheAge = Date.now() - parseInt(timestamp);
      if (cacheAge > CACHE_DURATION) {
        animeCache.clear();
        return null;
      }

      const animes = JSON.parse(cachedData);
      return animes;
    } catch (error) {
      console.error('❌ Error al cargar caché:', error);
      return null;
    }
  },

  // Limpiar caché
  clear: (): void => {
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    } catch (error) {
      console.error('❌ Error al limpiar caché:', error);
    }
  },

  // Verificar si hay caché válido
  hasValidCache: (): boolean => {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return false;

    const cacheAge = Date.now() - parseInt(timestamp);
    return cacheAge <= CACHE_DURATION;
  },

  // Obtener edad del caché en minutos
  getCacheAge: (): number | null => {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return null;

    const cacheAge = Date.now() - parseInt(timestamp);
    return Math.round(cacheAge / 1000 / 60);
  }
};
