import { useCallback } from 'react';

/**
 * Custom hook to return a keyboard keydown handler for accessibility activation.
 * Automatically prevents default page scroll on Space/Enter, making custom elements accessible.
 * 
 * @param {Function} callback - Function to trigger on Space/Enter
 * @returns {Function} KeyDown event handler
 */
export const useA11yKeyboard = (callback) => {
  return useCallback((e) => {
    if (!callback) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback(e);
    }
  }, [callback]);
};

export default useA11yKeyboard;
