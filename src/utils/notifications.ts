import toast from 'react-hot-toast';

// Estilos personalizados para las notificaciones
const toastStyles = {
  success: {
    style: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: '2px solid #34d399',
      boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10b981',
    },
  },
  error: {
    style: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: '2px solid #f87171',
      boxShadow: '0 10px 40px rgba(239, 68, 68, 0.3)',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#ef4444',
    },
  },
  loading: {
    style: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: '2px solid #60a5fa',
      boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#3b82f6',
    },
  },
  custom: {
    style: {
      background: 'linear-gradient(135deg, #FF1493 0%, #00FFFF 100%)',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '12px',
      border: '2px solid #FF1493',
      boxShadow: '0 10px 40px rgba(255, 20, 147, 0.3)',
    },
  },
};

export const notify = {
  success: (message: string) => {
    toast.success(message, toastStyles.success);
  },
  
  error: (message: string) => {
    toast.error(message, toastStyles.error);
  },
  
  loading: (message: string) => {
    return toast.loading(message, toastStyles.loading);
  },
  
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        success: toastStyles.success,
        error: toastStyles.error,
        loading: toastStyles.loading,
      }
    );
  },
  
  custom: (message: string, icon?: string) => {
    toast(message, {
      icon: icon || '🎌',
      ...toastStyles.custom,
    });
  },
  
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },
  
  // Notificaciones específicas de la app
  favoriteAdded: (animeName: string) => {
    toast.success(`❤️ ${animeName} agregado a favoritos`, toastStyles.success);
  },
  
  favoriteRemoved: (animeName: string) => {
    toast.success(`💔 ${animeName} eliminado de favoritos`, toastStyles.success);
  },
  
  noteSaved: (animeName: string) => {
    toast.success(`📝 Nota guardada para ${animeName}`, toastStyles.success);
  },
  
  noteDeleted: (animeName: string) => {
    toast.success(`🗑️ Nota eliminada de ${animeName}`, toastStyles.success);
  },
  
  dataExported: () => {
    toast.success('📤 Datos exportados exitosamente', toastStyles.success);
  },
  
  dataImported: () => {
    toast.success('📥 Datos importados exitosamente', toastStyles.success);
  },
  
  cacheCleared: () => {
    toast.success('🗑️ Caché limpiado', toastStyles.success);
  },
  
  error404: () => {
    toast.error('❌ No se encontró el recurso', toastStyles.error);
  },
  
  networkError: () => {
    toast.error('🌐 Error de conexión. Verifica tu internet.', toastStyles.error);
  },
  
  rateLimitError: () => {
    toast.error('⏰ Demasiadas peticiones. Espera un momento.', toastStyles.error);
  },
};

export default notify;
