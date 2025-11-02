import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // Hook para logging
    console.error("ErrorBoundary", error, info);
  }
  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };
  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback;
      return Fallback ? (
        <Fallback error={this.state.error} onRetry={this.handleRetry} />
      ) : null;
    }
    return this.props.children;
  }
}
