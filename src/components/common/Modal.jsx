import React, { useEffect, useRef, memo } from 'react';
import A11yButton from './A11yButton';

/**
 * Accessible Modal dialog component with focus trapping, Escape key support,
 * and semantic ARIA labeling for dialog navigation.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Visibility status
 * @param {Function} props.onClose - Dismiss callback
 * @param {string} props.title - Modal title (aria-labelledby association)
 * @param {React.ReactNode} props.children - Modal content
 */
const Modal = memo(({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Record currently focused element to restore it on close
      previousFocus.current = document.activeElement;
      
      // Send focus to modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Add Escape key handler
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
        
        // Trap focus inside modal
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex="0"]'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (previousFocus.current) {
          previousFocus.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: '0', 
        left: '0', 
        width: '100vw', 
        height: '100vh', 
        background: 'rgba(7, 10, 19, 0.85)', 
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
        className="glass-card emerald-glow" 
        style={{ 
          padding: '30px', 
          maxWidth: '380px', 
          width: '90%', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          outline: 'none'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal clicking
      >
        <h3 id="modal-title" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';
export default Modal;
