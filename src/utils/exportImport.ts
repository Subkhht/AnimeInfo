import { Anime } from '../types';
import { getFavorites, saveFavorites } from './favorites';
import { getAllNotes } from './animeNotes';

export interface ExportData {
  favorites: Anime[];
  notes: any[];
  exportDate: string;
  version: string;
}

// Exportar favoritos y notas a JSON
export const exportData = (): void => {
  const data: ExportData = {
    favorites: getFavorites(),
    notes: getAllNotes(),
    exportDate: new Date().toISOString(),
    version: '1.0',
  };

  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `animeinfo-backup-${new Date().toISOString().split('T')[0]}.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Importar datos desde JSON
export const importData = (file: File): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data: ExportData = JSON.parse(content);
        
        // Validar formato
        if (!data.favorites || !Array.isArray(data.favorites)) {
          resolve({ success: false, message: 'Formato de archivo inválido' });
          return;
        }
        
        // Importar favoritos
        data.favorites.forEach(anime => {
          const currentFavorites = getFavorites();
          if (!currentFavorites.find(f => f.mal_id === anime.mal_id)) {
            saveFavorites([...currentFavorites, anime]);
          }
        });
        
        // Importar notas si existen
        if (data.notes && Array.isArray(data.notes)) {
          const currentNotes = getAllNotes();
          const notesKey = 'animeinfo_notes';
          const mergedNotes = [...currentNotes];
          
          data.notes.forEach(note => {
            const existingIndex = mergedNotes.findIndex(n => n.animeId === note.animeId);
            if (existingIndex >= 0) {
              mergedNotes[existingIndex] = note;
            } else {
              mergedNotes.push(note);
            }
          });
          
          localStorage.setItem(notesKey, JSON.stringify(mergedNotes));
        }
        
        resolve({ 
          success: true, 
          message: `Importados ${data.favorites.length} favoritos y ${data.notes?.length || 0} notas` 
        });
      } catch (error) {
        console.error('Error al importar:', error);
        resolve({ success: false, message: 'Error al procesar el archivo' });
      }
    };
    
    reader.onerror = () => {
      resolve({ success: false, message: 'Error al leer el archivo' });
    };
    
    reader.readAsText(file);
  });
};
