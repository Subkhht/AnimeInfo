// Sistema de temas
export type Theme = 'dark' | 'light';

const THEME_KEY = 'animeinfo_theme';

// Obtener tema actual
export const getTheme = (): Theme => {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return (savedTheme as Theme) || 'dark';
  } catch (error) {
    console.error('Error al cargar tema:', error);
    return 'dark';
  }
};

// Guardar tema
export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error al guardar tema:', error);
  }
};

// Toggle tema
export const toggleTheme = (currentTheme: Theme): Theme => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  saveTheme(newTheme);
  return newTheme;
};

// Aplicar tema al DOM
export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  
  if (theme === 'light') {
    root.classList.add('light-theme');
  } else {
    root.classList.remove('light-theme');
  }
};
