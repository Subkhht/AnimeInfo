import React from 'react';

export interface FilterOptions {
  sortBy: 'score' | 'popularity' | 'title' | 'episodes';
  sortOrder: 'asc' | 'desc';
  genre: string;
  status: string;
  minScore: number;
}

interface FilterBarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  availableGenres: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange, availableGenres }) => {
  return (
    <div className="bg-gradient-to-br from-anime-darker/80 to-anime-dark/80 backdrop-blur-sm rounded-xl p-6 mb-6 border-2 border-anime-primary/20 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔍</span>
        <h3 className="text-xl font-bold text-anime-primary">Filtros y Ordenamiento</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ordenar Por */}
        <div>
          <label className="block text-anime-light text-sm font-semibold mb-2">
            📊 Ordenar por
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
            className="w-full px-4 py-2 bg-anime-darker/60 border-2 border-anime-primary/30 rounded-lg text-anime-light focus:outline-none focus:border-anime-primary transition-colors"
          >
            <option value="score">⭐ Puntuación</option>
            <option value="popularity">🔥 Popularidad</option>
            <option value="title">🔤 Título</option>
            <option value="episodes">🎬 Episodios</option>
          </select>
        </div>

        {/* Orden */}
        <div>
          <label className="block text-anime-light text-sm font-semibold mb-2">
            🔄 Orden
          </label>
          <select
            value={filters.sortOrder}
            onChange={(e) => onChange({ ...filters, sortOrder: e.target.value as 'asc' | 'desc' })}
            className="w-full px-4 py-2 bg-anime-darker/60 border-2 border-anime-primary/30 rounded-lg text-anime-light focus:outline-none focus:border-anime-primary transition-colors"
          >
            <option value="desc">↓ Mayor a Menor</option>
            <option value="asc">↑ Menor a Mayor</option>
          </select>
        </div>

        {/* Género */}
        <div>
          <label className="block text-anime-light text-sm font-semibold mb-2">
            🎭 Género
          </label>
          <select
            value={filters.genre}
            onChange={(e) => onChange({ ...filters, genre: e.target.value })}
            className="w-full px-4 py-2 bg-anime-darker/60 border-2 border-anime-primary/30 rounded-lg text-anime-light focus:outline-none focus:border-anime-primary transition-colors"
          >
            <option value="">Todos los géneros</option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-anime-light text-sm font-semibold mb-2">
            📡 Estado
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="w-full px-4 py-2 bg-anime-darker/60 border-2 border-anime-primary/30 rounded-lg text-anime-light focus:outline-none focus:border-anime-primary transition-colors"
          >
            <option value="">Todos</option>
            <option value="top">⭐ Top Animes</option>
            <option value="airing">🔴 En Emisión</option>
            <option value="complete">✅ Finalizado</option>
            <option value="upcoming">🔜 Próximamente</option>
          </select>
        </div>

        {/* Puntuación Mínima */}
        <div>
          <label className="block text-anime-light text-sm font-semibold mb-2">
            ⭐ Puntuación mínima: {filters.minScore.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={filters.minScore}
            onChange={(e) => onChange({ ...filters, minScore: parseFloat(e.target.value) })}
            className="w-full h-2 bg-anime-darker/60 rounded-lg appearance-none cursor-pointer accent-anime-primary"
          />
        </div>

        {/* Botón Limpiar */}
        <div className="flex items-end">
          <button
            onClick={() =>
              onChange({
                sortBy: 'score',
                sortOrder: 'desc',
                genre: '',
                status: '',
                minScore: 0,
              })
            }
            className="w-full px-4 py-2 bg-anime-darker/60 text-anime-secondary border-2 border-anime-secondary/30 rounded-lg font-semibold hover:bg-anime-darker transition-all"
          >
            🔄 Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
