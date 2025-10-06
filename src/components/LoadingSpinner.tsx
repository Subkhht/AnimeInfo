import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-anime-primary/30 border-t-anime-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-pulse">⭐</span>
        </div>
      </div>
      <p className="text-anime-light mt-4 text-lg animate-fade-in">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
