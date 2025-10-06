// Diccionario de traducciones de géneros de anime
export const genreTranslations: Record<string, string> = {
  'Action': 'Acción',
  'Adventure': 'Aventura',
  'Comedy': 'Comedia',
  'Drama': 'Drama',
  'Fantasy': 'Fantasía',
  'Horror': 'Terror',
  'Mystery': 'Misterio',
  'Romance': 'Romance',
  'Sci-Fi': 'Ciencia Ficción',
  'Slice of Life': 'Vida Cotidiana',
  'Sports': 'Deportes',
  'Supernatural': 'Sobrenatural',
  'Thriller': 'Suspenso',
  'Psychological': 'Psicológico',
  'Seinen': 'Seinen',
  'Shounen': 'Shounen',
  'Shoujo': 'Shoujo',
  'Josei': 'Josei',
  'Mecha': 'Mecha',
  'Music': 'Música',
  'Parody': 'Parodia',
  'Historical': 'Histórico',
  'School': 'Escolar',
  'Military': 'Militar',
  'Demons': 'Demonios',
  'Magic': 'Magia',
  'Game': 'Juego',
  'Ecchi': 'Ecchi',
  'Harem': 'Harem',
  'Vampire': 'Vampiros',
  'Martial Arts': 'Artes Marciales',
  'Super Power': 'Super Poderes',
  'Space': 'Espacio',
  'Samurai': 'Samurái',
  'Hentai': 'Hentai',
  'Kids': 'Niños',
  'Police': 'Policía',
  'Cars': 'Autos',
  'Dementia': 'Demencia',
  'Yaoi': 'Yaoi',
  'Yuri': 'Yuri',
  'Award Winning': 'Ganador de Premios',
  'Gourmet': 'Gourmet',
  'Work Life': 'Vida Laboral',
  'Erotica': 'Erótico',
  'Avant Garde': 'Vanguardia',
  'Suspense': 'Suspenso',
  'Girls Love': 'Amor entre Chicas',
  'Boys Love': 'Amor entre Chicos',
  'Childcare': 'Cuidado de Niños',
  'Combat Sports': 'Deportes de Combate',
  'Delinquents': 'Delincuentes',
  'Detective': 'Detective',
  'Educational': 'Educativo',
  'Iyashikei': 'Iyashikei',
  'Magical Sex Shift': 'Cambio de Sexo Mágico',
  'Mahou Shoujo': 'Chica Mágica',
  'Medical': 'Médico',
  'Organized Crime': 'Crimen Organizado',
  'Otaku Culture': 'Cultura Otaku',
  'Performing Arts': 'Artes Escénicas',
  'Pets': 'Mascotas',
  'Racing': 'Carreras',
  'Reincarnation': 'Reencarnación',
  'Reverse Harem': 'Harem Inverso',
  'Romantic Subtext': 'Subtexto Romántico',
  'Showbiz': 'Farándula',
  'Survival': 'Supervivencia',
  'Team Sports': 'Deportes de Equipo',
  'Time Travel': 'Viajes en el Tiempo',
  'Video Game': 'Videojuego',
  'Visual Arts': 'Artes Visuales',
  'Workplace': 'Lugar de Trabajo',
  'Mythology': 'Mitología',
  'Crossdressing': 'Travestismo',
  'Adult Cast': 'Elenco Adulto',
  'Anthropomorphic': 'Antropomórfico',
  'CGDCT': 'Chicas Lindas Haciendo Cosas Lindas',
  'High Stakes Game': 'Juego de Apuestas Altas',
  'Idols (Female)': 'Ídolos (Femenino)',
  'Idols (Male)': 'Ídolos (Masculino)',
  'Love Polygon': 'Polígono Amoroso',
  'Strategy Game': 'Juego de Estrategia',
  'Urban Fantasy': 'Fantasía Urbana',
  'Villainess': 'Villana',
};

// Función para traducir un género
export const translateGenre = (genre: string): string => {
  return genreTranslations[genre] || genre;
};

// Función para traducir texto usando una API de traducción simple
// Esta es una versión básica, en producción usarías un servicio real como Google Translate API
export const translateText = async (text: string, targetLang: string = 'es'): Promise<string> => {
  // Por ahora, retornamos el texto original ya que la API de traducción requiere credenciales
  // En una implementación real, usarías:
  // - Google Cloud Translation API
  // - DeepL API
  // - LibreTranslate
  // - MyMemory Translation API (gratis con límites)
  
  try {
    // Usamos MyMemory Translation API (gratuita con límites)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );
    
    if (!response.ok) {
      throw new Error('Error en la traducción');
    }
    
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    
    return text;
  } catch (error) {
    console.error('Error al traducir texto:', error);
    return text;
  }
};
