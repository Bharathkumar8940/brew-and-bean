import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error?.toString() || 'Unknown Error' };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#F7EFE5', backgroundColor: '#1A0B05', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#C67C38' }}>Brew & Bean Café</h1>
          <h2>Application Rendering Notice</h2>
          <p style={{ opacity: 0.8 }}>The 3D Canvas / WebGL context encountered a browser compatibility fallback:</p>
          <pre style={{ background: '#2C1305', padding: '15px', borderRadius: '8px', color: '#ff8888', overflowX: 'auto' }}>
            {this.state.error}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '10px 20px', backgroundColor: '#C67C38', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', marginTop: '20px' }}
          >
            Reload Website
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
