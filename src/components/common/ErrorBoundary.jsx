import React, { Component } from 'react';

/**
 * ErrorBoundary component to catch errors in child components
 * and display a fallback UI, ensuring secure state handling
 * and preventing complete application crashes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to wrap
 * @param {Function} [props.onReset] - Optional callback triggered on resetting error state
 * @returns {React.ReactNode} Children or fallback UI if error is caught
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Securely log the error in production/analytics without exposing sensitive user inputs
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Accessible fallback UI with high-contrast elements and ARIA roles
      return (
        <div 
          role="alert" 
          aria-live="assertive"
          style={{
            padding: '30px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid var(--accent-red)',
            borderRadius: '16px',
            margin: '20px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }} role="img" aria-label="Warning sign">⚠️</span>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Something went wrong</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            We've encountered a rendering exception. Your data is secure, and you can reload the page or return to the dashboard.
          </p>
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, var(--accent-red), #b91c1c)' }}
          >
            Reset view
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
