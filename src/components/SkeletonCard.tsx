import React from 'react';

interface SkeletonCardProps {
  count?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 24 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-anime-dark/50 rounded-xl overflow-hidden border-2 border-anime-secondary/20 animate-pulse"
        >
          {/* Imagen skeleton */}
          <div className="w-full h-72 bg-gradient-to-br from-anime-secondary/20 to-anime-primary/20" />
          
          {/* Contenido skeleton */}
          <div className="p-4 space-y-3">
            {/* Título */}
            <div className="h-6 bg-anime-secondary/30 rounded w-3/4" />
            
            {/* Descripción */}
            <div className="space-y-2">
              <div className="h-3 bg-anime-secondary/20 rounded w-full" />
              <div className="h-3 bg-anime-secondary/20 rounded w-5/6" />
            </div>
            
            {/* Rating y badges */}
            <div className="flex gap-2">
              <div className="h-6 bg-anime-primary/20 rounded-full w-16" />
              <div className="h-6 bg-anime-accent/20 rounded-full w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
