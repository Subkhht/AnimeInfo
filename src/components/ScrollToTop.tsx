import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-anime-primary to-anime-secondary text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center justify-center animate-bounce-slow border-2 border-white/30"
      aria-label="Volver arriba"
    >
      <span className="text-2xl">⬆️</span>
    </button>
  );
};

export default ScrollToTop;
