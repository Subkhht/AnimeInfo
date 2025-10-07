import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimeListCard from './components/AnimeListCard';
import CharacterCard from './components/CharacterCard';
import AnimeDetails from './components/AnimeDetails';
import CharacterDetails from './components/CharacterDetails';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import FilterBar, { FilterOptions } from './components/FilterBar';
import StatsModal from './components/StatsModal';
import ScrollToTop from './components/ScrollToTop';
import RecommendationsModal from './components/RecommendationsModal';
import { jikanAPI } from './services/api';
import { Anime, Character, AnimeCharacter } from './types';
import { getFavorites } from './utils/favorites';
import { exportData, importData } from './utils/exportImport';
import { translateGenre } from './utils/translations';
import { Theme, getTheme, toggleTheme as toggleThemeUtil, applyTheme } from './utils/theme';
import { animeCache } from './utils/animeCache';

function App() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [animeCharacters, setAnimeCharacters] = useState<AnimeCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'anime' | 'character'>('anime');
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24); // 24 animes por página
  
  // Estados para carga progresiva (2000 animes)
  const [loadingProgress, setLoadingProgress] = useState<{ loaded: number; total: number } | null>(null);
  const [isLoadingBackground, setIsLoadingBackground] = useState(false);
  const backgroundLoadRef = useRef<boolean>(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'score',
    sortOrder: 'desc',
    genre: '',
    status: 'top', // Top Animes por defecto
    minScore: 0,
  });

  // Scroll hacia arriba cuando cambia la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Cargar favoritos
  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  // Cargar animes populares al inicio
  useEffect(() => {
    loadTopAnime();
    loadFavorites();
    
    // Cargar y aplicar tema
    const savedTheme = getTheme();
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Toggle tema
  const handleToggleTheme = () => {
    const newTheme = toggleThemeUtil(theme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const loadTopAnime = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await jikanAPI.getTopAnime(12);
      setAnimes(data);
      setCharacters([]);
      // setCurrentLoadType('top');
    } catch (err: any) {
      setError('Error al cargar animes populares. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Por favor, introduce un término de búsqueda');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedAnime(null);
    setSelectedCharacter(null);
    
    try {
      if (searchType === 'anime') {
        const data = await jikanAPI.searchAnime(searchTerm);
        if (data.length === 0) {
          setError(`No se encontraron animes con el nombre: "${searchTerm}"`);
        }
        setAnimes(data);
        setCharacters([]);
        // setCurrentLoadType('search');
      } else {
        const data = await jikanAPI.searchCharacters(searchTerm);
        if (data.length === 0) {
          setError(`No se encontraron personajes con el nombre: "${searchTerm}"`);
        }
        setCharacters(data);
        setAnimes([]);
      }
    } catch (err: any) {
      console.error('Error en handleSearch:', err);
      const errorMessage = err?.message || 'Error desconocido';
      
      if (errorMessage.includes('429')) {
        setError('⚠️ Demasiadas solicitudes a la API de MyAnimeList. Estamos reintentando automáticamente... Si persiste, espera 1 minuto e intenta de nuevo.');
      } else if (errorMessage.includes('404')) {
        setError(`❌ No se encontraron resultados para "${searchTerm}". Intenta con otro nombre.`);
      } else if (errorMessage.includes('Failed to fetch')) {
        setError('🌐 Error de conexión. Verifica tu conexión a internet.');
      } else {
        setError(`❌ Error al buscar: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimeClick = async (anime: Anime) => {
    setIsLoading(true);
    setError(null);
    try {
      const [details, chars] = await Promise.all([
        jikanAPI.getAnimeDetails(anime.mal_id),
        jikanAPI.getAnimeCharacters(anime.mal_id)
      ]);
      setSelectedAnime(details);
      setAnimeCharacters(chars);
    } catch (err: any) {
      setError('Error al cargar detalles del anime. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCharacterClick = async (character: Character) => {
    setIsLoading(true);
    setError(null);
    try {
      const details = await jikanAPI.getCharacterDetails(character.mal_id);
      setSelectedCharacter(details);
    } catch (err: any) {
      setError('Error al cargar detalles del personaje. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedAnime(null);
    setSelectedCharacter(null);
    setAnimeCharacters([]);
  };

  // Filtrar y ordenar animes
  const getFilteredAndSortedAnimes = (animesToFilter: Anime[]): Anime[] => {
    let filtered = [...animesToFilter];

    console.log('🔍 Iniciando filtrado:', {
      totalAnimes: animesToFilter.length,
      genre: filters.genre,
      minScore: filters.minScore,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder
    });

    // Filtrar por género
    if (filters.genre) {
      const beforeFilter = filtered.length;
      filtered = filtered.filter(anime => {
        if (!anime.genres || anime.genres.length === 0) return false;
        
        // Comparar el género seleccionado con los géneros traducidos del anime
        const hasGenre = anime.genres.some(g => {
          const translatedGenre = translateGenre(g.name);
          return translatedGenre === filters.genre;
        });
        
        return hasGenre;
      });
      console.log(`📝 Filtro de género "${filters.genre}": ${beforeFilter} → ${filtered.length} animes`);
      
      // Log de ejemplo de géneros para debugging
      if (filtered.length > 0 && filtered.length < 3) {
        console.log('Ejemplo de anime filtrado:', {
          title: filtered[0].title,
          genres: filtered[0].genres?.map(g => `${g.name} → ${translateGenre(g.name)}`)
        });
      }
    }

    // Filtrar por puntuación mínima
    if (filters.minScore > 0) {
      const beforeFilter = filtered.length;
      filtered = filtered.filter(anime => (anime.score || 0) >= filters.minScore);
      console.log(`⭐ Filtro de puntuación ≥${filters.minScore}: ${beforeFilter} → ${filtered.length} animes`);
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case 'score':
          aValue = a.score || 0;
          bValue = b.score || 0;
          break;
        case 'popularity':
          // Para popularidad, menor número = más popular
          aValue = a.popularity || 999999;
          bValue = b.popularity || 999999;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'episodes':
          aValue = a.episodes || 0;
          bValue = b.episodes || 0;
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === 'asc') {
        if (typeof aValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        return aValue - bValue;
      } else {
        if (typeof aValue === 'string') {
          return bValue.localeCompare(aValue);
        }
        return bValue - aValue;
      }
    });

    console.log(`✅ Resultado final: ${filtered.length} animes después de filtrar y ordenar`);
    return filtered;
  };

  // Obtener géneros disponibles desde los animes realmente cargados
  const getAvailableGenres = (): string[] => {
    const genresSet = new Set<string>();
    
    // Extraer géneros únicos de todos los animes cargados
    animes.forEach((anime: Anime) => {
      if (anime.genres && anime.genres.length > 0) {
        anime.genres.forEach((genre: { mal_id: number; name: string }) => {
          const translatedGenre = translateGenre(genre.name);
          genresSet.add(translatedGenre);
        });
      }
    });
    
    // Convertir a array y ordenar alfabéticamente
    return Array.from(genresSet).sort();
  };

  // Manejar cambios en filtros
  const handleFilterChange = async (newFilters: FilterOptions) => {
    const oldFilters = filters;
    setFilters(newFilters);
    
    console.log('🔄 Cambio de filtros:', { old: oldFilters, new: newFilters });
    
    // Detectar si cambió el estado y cargar animes específicos
    const statusChanged = newFilters.status !== oldFilters.status;
    
    // Detectar si cambió género u ordenamiento (reiniciar paginación)
    const genreChanged = newFilters.genre !== oldFilters.genre;
    const sortChanged = newFilters.sortBy !== oldFilters.sortBy;
    const minScoreChanged = newFilters.minScore !== oldFilters.minScore;
    
    if (genreChanged || sortChanged || minScoreChanged) {
      console.log('🔄 Filtros de visualización cambiados - Reiniciando página');
      setCurrentPage(1);
    }
    
    console.log('📊 Estado cambió:', statusChanged, 'Mostrar favoritos:', showFavorites);
    
    if (statusChanged && !showFavorites) {
      // Reiniciar página al cambiar de estado
      setCurrentPage(1);
      
      // Si se selecciona un estado específico, cargar todos los animes de ese estado
      if (newFilters.status === 'airing' || newFilters.status === 'complete' || newFilters.status === 'upcoming') {
        console.log(`🚀 Cargando animes con estado: ${newFilters.status}`);
        setIsLoading(true);
        setError(null);
        try {
          const statusAnimes = await jikanAPI.getAnimesByStatus(newFilters.status);
          console.log(`✅ Animes cargados: ${statusAnimes.length}`);
          if (statusAnimes.length > 0) {
            setAnimes(statusAnimes);
            setError(null);
          } else {
            const statusLabels = {
              airing: 'en emisión',
              complete: 'finalizados',
              upcoming: 'próximos'
            };
            setError(`⚠️ No se encontraron animes ${statusLabels[newFilters.status]} en este momento.`);
          }
        } catch (err: any) {
          console.error(`❌ Error al cargar animes ${newFilters.status}:`, err);
          const errorMessage = err?.message || 'Error desconocido';
          
          const statusLabels = {
            airing: 'en emisión',
            complete: 'finalizados',
            upcoming: 'próximos'
          };
          
          if (errorMessage.includes('429')) {
            setError('⚠️ Demasiadas solicitudes a la API. Por favor, espera un momento e intenta de nuevo.');
          } else if (errorMessage.includes('Failed to fetch')) {
            setError('🌐 Error de conexión. Verifica tu conexión a internet e intenta de nuevo.');
          } else {
            setError(`❌ Error al cargar animes ${statusLabels[newFilters.status]}. Por favor, intenta de nuevo en unos momentos.`);
          }
          // Revertir el filtro si falla
          setFilters(oldFilters);
        } finally {
          setIsLoading(false);
        }
      }
      // Si se selecciona "Top Animes"
      else if (newFilters.status === 'top') {
        console.log('⭐ Cargando Top Animes (12)');
        loadTopAnime();
      }
      // Si se selecciona "Todos" (estado vacío), cargar todos los animes con sistema progresivo
      else if (newFilters.status === '' && oldFilters.status !== '') {
        console.log('🌐 Iniciando carga progresiva de animes...');
        
        // Verificar si hay caché válido
        const cachedAnimes = animeCache.load();
        
        if (cachedAnimes && cachedAnimes.length > 0) {
          console.log(`⚡ Usando caché: ${cachedAnimes.length} animes`);
          setAnimes(cachedAnimes);
          setError(null);
          
          // Actualizar en background si el caché tiene más de 12 horas
          const cacheAge = animeCache.getCacheAge();
          if (cacheAge && cacheAge > 720) { // 12 horas
            console.log('🔄 Caché antiguo, actualizando en background...');
            loadAllAnimesInBackground();
          }
        } else {
          // No hay caché - carga progresiva
          setIsLoading(true);
          setError(null);
          
          try {
            // Paso 1: Carga inicial rápida (250 animes)
            console.log('📦 Paso 1/2: Carga inicial rápida...');
            const initialAnimes = await jikanAPI.getInitialAnimes();
            console.log(`✅ Carga inicial completa: ${initialAnimes.length} animes`);
            
            if (initialAnimes.length > 0) {
              setAnimes(initialAnimes);
              setIsLoading(false);
              setError(null);
              
              // Paso 2: Continuar cargando en background
              console.log('🚀 Paso 2/2: Cargando más animes en background...');
              loadAllAnimesInBackground();
            } else {
              setError('⚠️ No se encontraron animes en este momento.');
              setIsLoading(false);
            }
          } catch (err: any) {
            console.error('❌ Error en carga inicial:', err);
            const errorMessage = err?.message || 'Error desconocido';
            
            if (errorMessage.includes('429')) {
              setError('⚠️ Demasiadas solicitudes a la API. Por favor, espera un momento e intenta de nuevo.');
            } else if (errorMessage.includes('Failed to fetch')) {
              setError('🌐 Error de conexión. Verifica tu conexión a internet e intenta de nuevo.');
            } else {
              setError('❌ Error al cargar animes. Por favor, intenta de nuevo en unos momentos.');
            }
            setFilters(oldFilters);
            setIsLoading(false);
          }
        }
      }
    }
  };

  // Función para cargar todos los animes en background
  const loadAllAnimesInBackground = async () => {
    if (backgroundLoadRef.current) {
      console.log('⏸️ Ya hay una carga en background en progreso');
      return;
    }

    backgroundLoadRef.current = true;
    setIsLoadingBackground(true);
    setLoadingProgress({ loaded: 0, total: 2000 });

    try {
      const allAnimes = await jikanAPI.getAllAnimes((loaded, total) => {
        setLoadingProgress({ loaded, total });
        console.log(`📊 Progreso: ${loaded}/${total} animes`);
      });

      console.log(`✅ Carga completa: ${allAnimes.length} animes`);
      setAnimes(allAnimes);
      animeCache.save(allAnimes);
      setLoadingProgress(null);
      setIsLoadingBackground(false);
    } catch (err: any) {
      console.error('❌ Error en carga background:', err);
      setLoadingProgress(null);
      setIsLoadingBackground(false);
    } finally {
      backgroundLoadRef.current = false;
    }
  };

  // Manejar exportación
  const handleExport = () => {
    exportData();
  };

  // Manejar importación
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importData(file);
    if (result.success) {
      setError(null);
      loadFavorites();
      alert(result.message);
    } else {
      setError(result.message);
    }

    // Limpiar el input
    event.target.value = '';
  };

  const filteredAnimes = getFilteredAndSortedAnimes(animes);
  const filteredFavorites = getFilteredAndSortedAnimes(favorites);
  const airingFavorites = favorites.filter(anime => anime.airing);

  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} onToggleTheme={handleToggleTheme} />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Sección de búsqueda */}
        <div className="mb-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => { setSearchType('anime'); setShowFavorites(false); }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  searchType === 'anime' && !showFavorites
                    ? 'bg-anime-primary text-white shadow-lg scale-105'
                    : 'bg-anime-darker/60 text-anime-light hover:bg-anime-darker border border-anime-primary/40'
                }`}
              >
                🎬 Buscar Anime
              </button>
              <button
                onClick={() => { setSearchType('character'); setShowFavorites(false); }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  searchType === 'character' && !showFavorites
                    ? 'bg-anime-secondary text-white shadow-lg scale-105'
                    : 'bg-anime-darker/60 text-anime-light hover:bg-anime-darker border border-anime-secondary/40'
                }`}
              >
                👤 Buscar Personaje
              </button>
              <button
                onClick={() => { setShowFavorites(true); loadFavorites(); }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  showFavorites
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105 animate-glow-pulse'
                    : 'bg-anime-darker/60 text-anime-light hover:bg-anime-darker border border-red-400/40'
                }`}
              >
                ❤️ Mis Favoritos ({favorites.length})
              </button>
              <button
                onClick={() => setShowStats(true)}
                className="px-6 py-3 rounded-lg font-semibold bg-anime-darker/60 text-anime-accent hover:bg-anime-darker border border-anime-accent/40 transition-all hover:scale-105"
              >
                📊 Estadísticas
              </button>
              <button
                onClick={handleExport}
                className="px-6 py-3 rounded-lg font-semibold bg-anime-darker/60 text-anime-secondary hover:bg-anime-darker border border-anime-secondary/40 transition-all hover:scale-105"
              >
                📤 Exportar
              </button>
              <label className="px-6 py-3 rounded-lg font-semibold bg-anime-darker/60 text-anime-primary hover:bg-anime-darker border border-anime-primary/40 transition-all hover:scale-105 cursor-pointer">
                📥 Importar
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
            
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={handleSearch}
              placeholder={
                searchType === 'anime'
                  ? 'Ej: Naruto, One Piece, Death Note...'
                  : 'Ej: Naruto Uzumaki, Monkey D. Luffy, Light Yagami...'
              }
              isLoading={isLoading}
            />
            
            {/* Tips de búsqueda */}
            <div className="text-anime-light text-sm text-center max-w-2xl">
              <p className="mb-2">
                💡 <span className="text-anime-accent">Tip:</span> Usa nombres completos para mejores resultados
              </p>
              <p className="text-anime-secondary text-xs">
                Powered by Jikan API (MyAnimeList)
              </p>
            </div>
          </div>
        </div>

        {/* Mensajes de error */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border-2 border-red-500/50 rounded-xl text-red-200 text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Indicador de progreso de carga en background */}
        {isLoadingBackground && loadingProgress && (
          <div className="mb-8 p-4 bg-gradient-to-r from-anime-primary/20 to-anime-accent/20 border-2 border-anime-primary/50 rounded-xl animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl animate-spin">⚙️</span>
                <span className="text-anime-light font-semibold">
                  Actualizando catálogo en segundo plano...
                </span>
              </div>
              <span className="text-anime-accent font-bold">
                {loadingProgress.loaded} / {loadingProgress.total}
              </span>
            </div>
            <div className="w-full bg-anime-darker/60 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-anime-primary to-anime-accent h-full transition-all duration-500 rounded-full"
                style={{ width: `${(loadingProgress.loaded / loadingProgress.total) * 100}%` }}
              />
            </div>
            <p className="text-anime-secondary text-xs mt-2 text-center">
              Puedes seguir navegando mientras se completa la carga
            </p>
          </div>
        )}

        {/* Spinner de carga */}
        {isLoading && !selectedAnime && !selectedCharacter && (
          <LoadingSpinner message="Buscando en la base de datos de MyAnimeList..." />
        )}

        {/* Sección de Favoritos */}
        {showFavorites && !selectedAnime && !selectedCharacter && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 animate-glow-pulse">
                ❤️ Mis Animes Favoritos
              </h2>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-2 bg-anime-darker/60 text-anime-light border-2 border-anime-primary/30 rounded-lg font-semibold hover:bg-anime-darker transition-all"
              >
                {viewMode === 'grid' ? '📋 Vista Lista' : '🔲 Vista Grid'}
              </button>
            </div>
            
            {/* Animes en Emisión */}
            {airingFavorites.length > 0 && (
              <div className="mb-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  🔴 En Emisión ({airingFavorites.length})
                </h3>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                  {airingFavorites.map((anime) => (
                    <AnimeListCard 
                      key={anime.mal_id} 
                      anime={anime} 
                      onClick={handleAnimeClick}
                      onFavoriteChange={loadFavorites}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Filtros */}
            {favorites.length > 0 && (
              <FilterBar
                filters={filters}
                onChange={handleFilterChange}
                availableGenres={getAvailableGenres()}
              />
            )}
            
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-anime-light mb-4">😢 Aún no tienes favoritos</p>
                <p className="text-anime-secondary">Haz clic en el corazón ❤️ de cualquier anime para agregarlo a tus favoritos</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                {filteredFavorites.map((anime) => (
                  <AnimeListCard 
                    key={anime.mal_id} 
                    anime={anime} 
                    onClick={handleAnimeClick}
                    onFavoriteChange={loadFavorites}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Grid de animes */}
        {!isLoading && animes.length > 0 && !selectedAnime && !selectedCharacter && !showFavorites && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-anime-primary">
                {searchTerm ? `Resultados para "${searchTerm}"` : '⭐ Top Animes'}
              </h2>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-2 bg-anime-darker/60 text-anime-light border-2 border-anime-primary/30 rounded-lg font-semibold hover:bg-anime-darker transition-all"
              >
                {viewMode === 'grid' ? '📋 Vista Lista' : '🔲 Vista Grid'}
              </button>
            </div>
            
            {/* Filtros */}
            <FilterBar
              filters={filters}
              onChange={handleFilterChange}
              availableGenres={getAvailableGenres()}
            />
            
            {/* Paginación - Info y controles superiores */}
            {filteredAnimes.length > itemsPerPage && (
              <div className="mb-6 flex items-center justify-between bg-anime-darker/40 p-4 rounded-xl border border-anime-primary/30">
                <div className="text-anime-light">
                  Mostrando <span className="text-anime-primary font-semibold">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredAnimes.length)}</span> - <span className="text-anime-primary font-semibold">{Math.min(currentPage * itemsPerPage, filteredAnimes.length)}</span> de <span className="text-anime-accent font-semibold">{filteredAnimes.length}</span> animes
                </div>
                <div className="text-anime-secondary text-sm">
                  Página {currentPage} de {Math.ceil(filteredAnimes.length / itemsPerPage)}
                </div>
              </div>
            )}
            
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
              {(() => {
                // Calcular índices para la paginación
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const paginatedAnimes = filteredAnimes.slice(startIndex, endIndex);
                
                return paginatedAnimes.map((anime) => (
                  <AnimeListCard 
                    key={anime.mal_id} 
                    anime={anime} 
                    onClick={handleAnimeClick}
                    onFavoriteChange={loadFavorites}
                    viewMode={viewMode}
                  />
                ));
              })()}
            </div>
            
            {/* Paginación - Controles inferiores */}
            {filteredAnimes.length > itemsPerPage && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* Botón Anterior */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-anime-darker/60 text-anime-light border-2 border-anime-primary/30 rounded-lg font-semibold hover:bg-anime-darker transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Anterior
                  </button>
                  
                  {/* Números de página */}
                  <div className="flex items-center gap-1">
                    {(() => {
                      const totalPages = Math.ceil(filteredAnimes.length / itemsPerPage);
                      const pages = [];
                      const maxVisiblePages = 7;
                      
                      if (totalPages <= maxVisiblePages) {
                        // Mostrar todas las páginas si son pocas
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else {
                        // Mostrar páginas con elipsis
                        if (currentPage <= 4) {
                          // Inicio: 1 2 3 4 5 ... último
                          for (let i = 1; i <= 5; i++) pages.push(i);
                          pages.push(-1); // Elipsis
                          pages.push(totalPages);
                        } else if (currentPage >= totalPages - 3) {
                          // Final: 1 ... antepenúltimo penúltimo último
                          pages.push(1);
                          pages.push(-1); // Elipsis
                          for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                        } else {
                          // Medio: 1 ... actual-1 actual actual+1 ... último
                          pages.push(1);
                          pages.push(-1); // Elipsis
                          pages.push(currentPage - 1);
                          pages.push(currentPage);
                          pages.push(currentPage + 1);
                          pages.push(-2); // Elipsis
                          pages.push(totalPages);
                        }
                      }
                      
                      return pages.map((page, index) => {
                        if (page === -1 || page === -2) {
                          return (
                            <span key={`ellipsis-${index}`} className="px-2 text-anime-secondary">
                              ...
                            </span>
                          );
                        }
                        
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-anime-primary to-anime-accent text-white shadow-lg scale-110'
                                : 'bg-anime-darker/60 text-anime-light hover:bg-anime-darker border border-anime-primary/30'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      });
                    })()}
                  </div>
                  
                  {/* Botón Siguiente */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredAnimes.length / itemsPerPage), prev + 1))}
                    disabled={currentPage >= Math.ceil(filteredAnimes.length / itemsPerPage)}
                    className="px-4 py-2 bg-anime-darker/60 text-anime-light border-2 border-anime-primary/30 rounded-lg font-semibold hover:bg-anime-darker transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Siguiente →
                  </button>
                </div>
                
                {/* Info adicional */}
                <div className="text-anime-secondary text-sm">
                  Total: {filteredAnimes.length} animes • {Math.ceil(filteredAnimes.length / itemsPerPage)} páginas
                </div>
              </div>
            )}
          </div>
        )}

        {/* Grid de personajes */}
        {!isLoading && characters.length > 0 && !selectedAnime && !selectedCharacter && (
          <div>
            <h2 className="text-2xl font-bold text-anime-secondary mb-6">
              Resultados para "{searchTerm}"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.mal_id} character={character} onClick={handleCharacterClick} />
              ))}
            </div>
          </div>
        )}

        {/* Mensaje cuando no hay resultados */}
        {!isLoading && animes.length === 0 && characters.length === 0 && !error && !selectedAnime && !selectedCharacter && (
          <div className="text-center text-anime-light text-xl mt-12">
            <p className="mb-4">🌸 ¡Bienvenido a AnimeInfo! 🌸</p>
            <p className="text-anime-secondary">Busca tu anime o personaje favorito para comenzar</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Modal de detalles de anime */}
      {selectedAnime && (
        <AnimeDetails
          anime={selectedAnime}
          characters={animeCharacters}
          onClose={closeDetails}
          onNoteUpdate={loadFavorites}
        />
      )}

      {/* Modal de detalles de personaje */}
      {selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          onClose={closeDetails}
        />
      )}

      {/* Modal de estadísticas */}
      {showStats && (
        <StatsModal
          favorites={favorites}
          onClose={() => setShowStats(false)}
        />
      )}

      {/* Modal de recomendaciones */}
      {showRecommendations && (
        <RecommendationsModal
          favorites={favorites}
          onClose={() => setShowRecommendations(false)}
          onAnimeClick={handleAnimeClick}
          onFavoriteChange={loadFavorites}
        />
      )}

      {/* Botón Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}

export default App;
