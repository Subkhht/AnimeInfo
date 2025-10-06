// Cache para traducciones
const translationCache = new Map<string, string>();

export const getCachedTranslation = (key: string): string | null => {
  return translationCache.get(key) || null;
};

export const setCachedTranslation = (key: string, translation: string): void => {
  translationCache.set(key, translation);
  
  // Limitar el tamaño del caché a 100 traducciones
  if (translationCache.size > 100) {
    const firstKey = translationCache.keys().next().value;
    if (firstKey) {
      translationCache.delete(firstKey);
    }
  }
};

export const clearTranslationCache = (): void => {
  translationCache.clear();
};
