"use client";
import React, { Component, ReactNode, ErrorInfo } from "react";

// Define las propiedades y el estado del componente usando interfaces
interface Props {
  children: ReactNode; // ReactNode cubre cualquier cosa que pueda ser renderizable
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // ErrorBoundary lifecycle methods con tipado adecuado
  static getDerivedStateFromError(_: Error): State {
    // Actualiza el estado para que el siguiente renderizado muestre la UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Puedes también integrar un servicio de registro de errores aquí
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza cualquier UI de error si hay un error
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
