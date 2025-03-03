import React, { Component, ReactNode } from 'react';
import { RotateCcw } from 'lucide-react'
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>
        <h1>Refresh The Page <RotateCcw /></h1>
        <p>Something went wrong. Please try again later.</p>
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
