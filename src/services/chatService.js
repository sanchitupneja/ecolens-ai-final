/**
 * Chat Simulation Service.
 * Decouples chatbot business logic from the React UI component view.
 */

import { mockChatTemplates } from '../data/mockData';

/**
 * Sanitizes input to prevent basic cross-site scripting (XSS).
 * 
 * @param {string} input - User raw input text
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Classifies scenario keywords based on user input text.
 * 
 * @param {string} text - Sanitized user message text
 * @returns {string} The matched scenario category ('meat', 'ev', 'solar', or 'general')
 */
export const classifyScenario = (text) => {
  const cleanText = text.toLowerCase();
  if (cleanText.includes('meat') || cleanText.includes('beef') || cleanText.includes('vegetarian') || cleanText.includes('vegan') || cleanText.includes('food')) {
    return 'meat';
  }
  if (cleanText.includes('ev') || cleanText.includes('car') || cleanText.includes('electric vehicle') || cleanText.includes('drive')) {
    return 'ev';
  }
  if (cleanText.includes('solar') || cleanText.includes('panels') || cleanText.includes('community solar') || cleanText.includes('electricity')) {
    return 'solar';
  }
  return 'general';
};

/**
 * Gets simulated chat reply details for a specific scenario.
 * 
 * @param {string} scenario - The classified scenario keyword
 * @returns {Object} Message text and 10-year projection chart data
 */
export const getChatResponse = (scenario) => {
  return mockChatTemplates[scenario] || mockChatTemplates.general;
};

export default {
  sanitizeInput,
  classifyScenario,
  getChatResponse,
};
