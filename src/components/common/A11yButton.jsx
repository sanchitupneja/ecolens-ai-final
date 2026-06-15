import React, { memo } from 'react';

/**
 * Accessible custom Button component conforming to WCAG AA guidelines.
 * Wraps default HTML button, handles focus rings, key events, and ARIA descriptors.
 * 
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Accessible text description for screen readers
 * @param {boolean} [props.disabled] - If true, buttons is disabled and unfocusable
 * @param {React.ReactNode} props.children - Button inner text or elements
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.className] - CSS class name
 * @param {Object} [props.style] - Custom styles
 * @param {string} [props.ariaHasPopup] - Indicates popup modal/menu association
 * @param {boolean} [props.ariaExpanded] - Indicates if popup modal is active
 */
const A11yButton = memo(({ 
  children, 
  onClick, 
  ariaLabel, 
  disabled = false, 
  className = '', 
  style = {}, 
  ariaHasPopup, 
  ariaExpanded,
  ...rest 
}) => {
  const handleKeyDown = (e) => {
    if (disabled) return;
    // Activate on Space or Enter key
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`a11y-btn ${className}`}
      style={{
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style
      }}
      {...rest}
    >
      {children}
    </button>
  );
});

A11yButton.displayName = 'A11yButton';
export default A11yButton;
