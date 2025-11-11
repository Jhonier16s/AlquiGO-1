import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // In a real app you could log this to an external service
    console.error('ErrorBoundary caught error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="max-w-xl mx-auto p-6 border rounded-lg bg-muted text-muted-foreground mt-8">
          <h2 className="text-lg font-semibold mb-2">Ocurrió un error al cargar el producto</h2>
          <p className="text-sm mb-4">Intenta volver atrás al catálogo o recarga la página. Si el problema persiste limpia el almacenamiento local.</p>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >Reintentar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function withErrorBoundary<T extends object>(Component: React.ComponentType<T>) {
  return function Wrapped(props: T) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}