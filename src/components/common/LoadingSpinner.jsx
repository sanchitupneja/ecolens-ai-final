import React, { memo } from 'react';

/**
 * Accessible loading indicator.
 * Utilizes status role and polite live region to announce loading state to screen readers.
 *
 * @component
 * @returns {React.ReactElement} The LoadingSpinner element
 */
const LoadingSpinner = memo(() => {
  return (
    <div 
      role="status" 
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        color: 'var(--text-secondary)'
      }}
    >
      <div 
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--border-light)',
          borderTopColor: 'var(--accent-emerald)',
          borderRadius: '50%',
          animation: 'spinSlow 1s linear infinite',
          marginBottom: '16px'
        }}
      />
      <span style={{ fontSize: '13px' }}>Optimizing digital twin calculations...</span>
      <span className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}>
        Loading page content. Please wait.
      </span>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
export default LoadingSpinner;
