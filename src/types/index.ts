// Tipos para Anime (Jikan API)
export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  synopsis?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  episodes?: number;
  status?: string;
  airing?: boolean;
  aired?: {
    from?: string;
    to?: string;
    string?: string;
  };
  rating?: string;
  genres?: Array<{ mal_id: number; name: string }>;
  studios?: Array<{ mal_id: number; name: string }>;
  images: {
    jpg: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  trailer?: {
    youtube_id?: string;
    url?: string;
    embed_url?: string;
  };
}

// Tipos para sistema de notas personales
export interface AnimeNote {
  animeId: number;
  note: string;
  personalRating?: number;
  watchStatus?: 'watching' | 'completed' | 'on-hold' | 'dropped' | 'plan-to-watch';
  currentEpisode?: number;
  lastUpdated: string;
}

// Tipos para Personajes (Jikan API)
export interface Character {
  mal_id: number;
  name: string;
  name_kanji?: string;
  nicknames?: string[];
  favorites?: number;
  about?: string;
  images: {
    jpg: {
      image_url?: string;
    };
    webp?: {
      image_url?: string;
      small_image_url?: string;
    };
  };
}

// Personaje con información de anime
export interface AnimeCharacter {
  character: Character;
  role: string;
  voice_actors?: Array<{
    person: {
      mal_id: number;
      name: string;
      images: {
        jpg: {
          image_url?: string;
        };
      };
    };
    language: string;
  }>;
}

// Respuestas de la API
export interface JikanResponse<T> {
  data: T;
}

export interface JikanPaginatedResponse<T> {
  data: T[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}
