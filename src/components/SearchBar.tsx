import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder: string;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder,
  isLoading = false,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex gap-3 w-full max-w-2xl">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 px-6 py-4 rounded-2xl bg-anime-darker/80 border-4 border-anime-primary/50 text-anime-light text-lg placeholder-anime-cyan/60 focus:outline-none focus:border-anime-cyan focus:ring-4 focus:ring-anime-cyan/30 transition-all shadow-2xl neon-border font-semibold"
        style={{ boxShadow: '0 0 20px rgba(255, 20, 147, 0.3)' }}
        disabled={isLoading}
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="px-10 py-4 bg-gradient-to-r from-anime-neon-pink via-anime-primary to-anime-neon-blue rounded-2xl text-white text-lg font-black hover:from-anime-neon-blue hover:to-anime-neon-pink transition-all hover:scale-110 hover:rotate-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-anime-cyan/70 border-2 border-anime-cyan/50 animate-glow-pulse"
      >
        {isLoading ? (
          <span className="inline-block animate-spin">⏳</span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            <span>BUSCAR</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
