import { 
  Anime, 
  Character, 
  AnimeCharacter,
  JikanResponse, 
  JikanPaginatedResponse 
} from '../types';

// Jikan API v4 - MyAnimeList API
const API_BASE_URL = 'https://api.jikan.moe/v4';

// Función helper para hacer fetch con retry en caso de rate limit
const fetchWithRetry = async (url: string, retries = 3, delay = 1000): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      
      if (response.status === 429) {
        // Rate limit - esperar antes de reintentar
        console.warn(`Rate limit alcanzado. Reintento ${i + 1}/${retries} en ${delay}ms...`);
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Backoff exponencial
          continue;
        }
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.warn(`Error en intento ${i + 1}/${retries}. Reintentando...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries alcanzado');
};

export const jikanAPI = {
  // Buscar animes por nombre
  searchAnime: async (query: string): Promise<Anime[]> => {
    try {
      const response = await fetchWithRetry(
        `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=12`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: JikanPaginatedResponse<Anime> = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error en searchAnime:', error);
      throw error;
    }
  },

  // Obtener detalles completos de un anime
  getAnimeDetails: async (animeId: number): Promise<Anime> => {
    try {
      const response = await fetch(`${API_BASE_URL}/anime/${animeId}/full`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: JikanResponse<Anime> = await response.json();
      console.log('Anime Details Response:', data);
      return data.data;
    } catch (error) {
      console.error('Error en getAnimeDetails:', error);
      throw error;
    }
  },

  // Obtener personajes de un anime
  getAnimeCharacters: async (animeId: number): Promise<AnimeCharacter[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/anime/${animeId}/characters`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: JikanPaginatedResponse<AnimeCharacter> = await response.json();
      console.log('Anime Characters Response:', data);
      return data.data;
    } catch (error) {
      console.error('Error en getAnimeCharacters:', error);
      throw error;
    }
  },

  // Buscar personajes por nombre
  searchCharacters: async (query: string): Promise<Character[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/characters?q=${encodeURIComponent(query)}&limit=12`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: JikanPaginatedResponse<Character> = await response.json();
      console.log('Search Characters Response:', data);
      return data.data;
    } catch (error) {
      console.error('Error en searchCharacters:', error);
      throw error;
    }
  },

  // Obtener detalles completos de un personaje
  getCharacterDetails: async (characterId: number): Promise<Character> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/characters/${characterId}/full`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: JikanResponse<Character> = await response.json();
      console.log('Character Details Response:', data);
      return data.data;
    } catch (error) {
      console.error('Error en getCharacterDetails:', error);
      throw error;
    }
  },

  // Obtener animes populares (para la página de inicio)
  getTopAnime: async (limit: number = 12): Promise<Anime[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/top/anime?limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: JikanPaginatedResponse<Anime> = await response.json();
      console.log('Top Anime Response:', data);
      return data.data;
    } catch (error) {
      console.error('Error en getTopAnime:', error);
      throw error;
    }
  },

  // Obtener todos los animes (sin filtro de estado) - para "Todos" con paginación
  // Carga inicial rápida - 250 animes
  getInitialAnimes: async (): Promise<Anime[]> => {
    try {
      const allAnimes: Anime[] = [];
      let page = 1;
      const maxPages = 10; // 10 páginas = 250 animes (carga rápida)
      
      for (let i = 0; i < maxPages; i++) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/top/anime?page=${page}&limit=25`
          );
          
          if (!response.ok) {
            if (response.status === 429) {
              console.warn('Rate limit alcanzado, esperando...');
              await new Promise(resolve => setTimeout(resolve, 1000));
              continue;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data: JikanPaginatedResponse<Anime> = await response.json();
          
          if (data.data && data.data.length > 0) {
            allAnimes.push(...data.data);
          }
          
          page++;
          
          // Esperar entre peticiones
          await new Promise(resolve => setTimeout(resolve, 350));
        } catch (pageError) {
          console.error(`Error en página ${page}:`, pageError);
          break;
        }
      }
      
      console.log(`✅ Carga inicial: ${allAnimes.length} animes`);
      return allAnimes;
    } catch (error) {
      console.error('❌ Error en getInitialAnimes:', error);
      throw error;
    }
  },

  // Carga progresiva en background - hasta 2000 animes
  getAllAnimes: async (
    onProgress?: (loaded: number, total: number) => void
  ): Promise<Anime[]> => {
    try {
      const allAnimes: Anime[] = [];
      let page = 1;
      let hasNextPage = true;
      const maxPages = 80; // 80 páginas = 2000 animes
      
      while (hasNextPage && page <= maxPages) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/top/anime?page=${page}&limit=25`
          );
          
          if (!response.ok) {
            if (response.status === 429) {
              console.warn('Rate limit alcanzado, esperando...');
              await new Promise(resolve => setTimeout(resolve, 1000));
              continue;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data: JikanPaginatedResponse<Anime> = await response.json();
          
          if (data.data && data.data.length > 0) {
            allAnimes.push(...data.data);
            
            // Callback de progreso
            if (onProgress) {
              onProgress(allAnimes.length, maxPages * 25);
            }
          }
          
          hasNextPage = data.pagination?.has_next_page ?? false;
          page++;
          
          // Esperar entre peticiones
          if (hasNextPage && page <= maxPages) {
            await new Promise(resolve => setTimeout(resolve, 400));
          }
        } catch (pageError) {
          console.error(`Error en página ${page}:`, pageError);
          break;
        }
      }
      
      console.log(`✅ Total animes obtenidos: ${allAnimes.length}`);
      
      if (allAnimes.length === 0) {
        throw new Error('No se pudieron obtener animes');
      }
      
      return allAnimes;
    } catch (error) {
      console.error('❌ Error en getAllAnimes:', error);
      throw error;
    }
  },

  // Obtener animes por estado (airing, complete, upcoming)
  getAnimesByStatus: async (status: 'airing' | 'complete' | 'upcoming'): Promise<Anime[]> => {
    try {
      const allAnimes: Anime[] = [];
      let page = 1;
      let hasNextPage = true;
      const maxPages = 5; // Limitar a 5 páginas para cada estado
      
      // Determinar el filtro correcto según el estado
      let apiFilter: string;
      if (status === 'airing') {
        apiFilter = 'airing';
      } else if (status === 'upcoming') {
        apiFilter = 'upcoming';
      } else {
        // Para "complete", usar bypopularity y filtrar localmente
        apiFilter = 'bypopularity';
      }
      
      while (hasNextPage && page <= maxPages) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/top/anime?filter=${apiFilter}&page=${page}&limit=25`
          );
          
          if (!response.ok) {
            if (response.status === 429) {
              console.warn('Rate limit alcanzado, esperando...');
              await new Promise(resolve => setTimeout(resolve, 1000));
              continue;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data: JikanPaginatedResponse<Anime> = await response.json();
          console.log(`Animes ${status} (filter: ${apiFilter}) - Página ${page}:`, data.data.length);
          
          if (data.data && data.data.length > 0) {
            // Si el estado es "complete", filtrar solo los finalizados
            if (status === 'complete') {
              const completedAnimes = data.data.filter(anime => 
                !anime.airing && (anime.status === 'Finished Airing' || anime.status === 'Complete')
              );
              allAnimes.push(...completedAnimes);
            } else {
              allAnimes.push(...data.data);
            }
          }
          
          hasNextPage = data.pagination?.has_next_page ?? false;
          page++;
          
          // Esperar entre peticiones
          if (hasNextPage && page <= maxPages) {
            await new Promise(resolve => setTimeout(resolve, 400));
          }
        } catch (pageError) {
          console.error(`Error en página ${page}:`, pageError);
          break;
        }
      }
      
      console.log(`✅ Total animes ${status} obtenidos: ${allAnimes.length}`);
      
      if (allAnimes.length === 0) {
        throw new Error(`No se pudieron obtener animes ${status}`);
      }
      
      return allAnimes;
    } catch (error) {
      console.error(`❌ Error en getAnimesByStatus(${status}):`, error);
      throw error;
    }
  },

  // Obtener recomendaciones de un anime
  getAnimeRecommendations: async (animeId: number): Promise<Anime[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/anime/${animeId}/recommendations`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      interface RecommendationEntry {
        entry: Anime;
        votes: number;
      }
      
      const data: JikanPaginatedResponse<RecommendationEntry> = await response.json();
      console.log('Anime Recommendations Response:', data);
      
      // Extraer solo los animes y ordenar por votos
      return data.data
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 8)
        .map(rec => rec.entry);
    } catch (error) {
      console.error('Error en getAnimeRecommendations:', error);
      return []; // Retornar array vacío si falla
    }
  },

  // Obtener animes por temporada actual (animes en emisión)
  getCurrentSeasonAnime: async (): Promise<Anime[]> => {
    return jikanAPI.getAnimesByStatus('airing');
  },
};
