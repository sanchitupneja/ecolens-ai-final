/**
 * Performance optimization utilities
 * Implements memoization, lazy loading, and rendering optimization patterns
 */

import React, { useMemo, useCallback } from 'react';

/**
 * Lazy load a component without JSX syntax.
 * 
 * @param {Function} importFunc - Dynamic import function returning a Promise
 * @param {Object} [options={}] - Optional configuration
 * @param {React.ReactNode} [options.fallback] - Loading fallback component
 * @returns {React.Component} Lazy-loaded React component wrapped in Suspense
 */
export const lazyLoadComponent = (importFunc, options = {}) => {
  const Component = React.lazy(importFunc);
  return (props) => React.createElement(
    React.Suspense,
    { fallback: options.fallback || React.createElement('div', null, 'Loading...') },
    React.createElement(Component, props)
  );
};

/**
 * Debounce function for event handlers
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for event handlers
 * @param {Function} func - Function to throttle
 * @param {number} limit - Throttle limit in ms
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Memoize expensive calculations
 * @param {Function} func - Function to memoize
 * @returns {Function} Memoized function
 */
export const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = func(...args);
    cache[key] = result;
    return result;
  };
};

/**
 * Calculate carbon metrics efficiently (memoized).
 * 
 * @param {number} carbonSaved - Saved carbon value in kg CO2
 * @returns {{ treeYears: string, kmDriven: string }} Object containing tree-years and km driven analogies
 */
export const calculateCarbonMetrics = memoize((carbonSaved) => {
  return {
    treeYears: (carbonSaved / 22.0).toFixed(1),
    kmDriven: (carbonSaved * 4.2).toFixed(0),
  };
});

/**
 * Calculate water metrics efficiently (memoized).
 * 
 * @param {number} waterSaved - Saved water value in Liters
 * @returns {{ showersSaved: string }} Object containing showers saved analogies
 */
export const calculateWaterMetrics = memoize((waterSaved) => {
  return {
    showersSaved: (waterSaved / 80).toFixed(0),
  };
});

/**
 * Calculate waste metrics efficiently (memoized).
 * 
 * @param {number} wasteDiverted - Diverted waste value in kg
 * @returns {{ bottlesDiverted: string }} Object containing plastic bottles diverted analogies
 */
export const calculateWasteMetrics = memoize((wasteDiverted) => {
  return {
    bottlesDiverted: (wasteDiverted * 50).toFixed(0),
  };
});

/**
 * Custom hook: useMemoizedCallback for React components
 * @param {Function} callback - Function to memoize
 * @param {Array} deps - Dependency array
 * @returns {Function} Memoized callback
 */
export const useMemoizedCallback = useCallback;

/**
 * Custom hook: useMemoizedValue for React components
 * @param {Function} computeValue - Function that computes value
 * @param {Array} deps - Dependency array
 * @returns {*} Memoized value
 */
export const useMemoizedValue = useMemo;

export default {
  lazyLoadComponent,
  debounce,
  throttle,
  memoize,
  calculateCarbonMetrics,
  calculateWaterMetrics,
  calculateWasteMetrics,
  useMemoizedCallback,
  useMemoizedValue,
};

