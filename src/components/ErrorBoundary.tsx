import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-anime-darker via-anime-dark to-anime-darker flex items-center justify-center p-4">
          <div className="bg-anime-dark/80 backdrop-blur-sm rounded-2xl border-2 border-red-500/50 p-8 max-w-2xl w-full text-center shadow-2xl">
            {/* Icono de error */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-6xl">💥</span>
              </div>
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold text-red-400 mb-4">
              ¡Oops! Algo salió mal
            </h1>

            {/* Descripción */}
            <p className="text-anime-light text-lg mb-6">
              Ha ocurrido un error inesperado. No te preocupes, puedes intentar volver a la página principal.
            </p>

            {/* Detalles del error (solo en desarrollo) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="bg-anime-darker/60 rounded-lg p-4 mb-6 text-left">
                <p className="text-red-400 font-mono text-sm mb-2">
                  <strong>Error:</strong> {this.state.error.message}
                </p>
                <pre className="text-anime-secondary text-xs overflow-auto max-h-32">
                  {this.state.error.stack}
                </pre>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-gradient-to-r from-anime-primary to-anime-accent text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg"
              >
                🏠 Volver al Inicio
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-anime-secondary/20 text-anime-light font-bold rounded-lg hover:bg-anime-secondary/30 transition-colors border-2 border-anime-secondary/30"
              >
                🔄 Recargar Página
              </button>
            </div>

            {/* Consejos */}
            <div className="mt-8 text-anime-secondary text-sm">
              <p>💡 <strong>Consejo:</strong> Si el problema persiste, intenta limpiar el caché del navegador.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
