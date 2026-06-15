/**
 * Computer Vision and OCR Scanner Service.
 * Decouples mock sensor/OCR logic from React Hooks and views.
 */

/**
 * Simulates OCR receipt parsing or waste material classification.
 * 
 * @param {string} scanMode - The scanner mode ('receipt' or 'waste')
 * @param {string} selectedItemId - Selected itemId to scan
 * @param {Array<Object>} mockReceipts - Supermarket receipts database
 * @param {Array<Object>} mockWasteItems - Waste packaging items database
 * @returns {Object} Structured scan result containing type and parsed dataset
 */
export const executeScan = (scanMode, selectedItemId, mockReceipts, mockWasteItems) => {
  if (scanMode === 'receipt') {
    const item = mockReceipts.find(r => r.id === selectedItemId);
    return { type: 'receipt', data: item };
  } else {
    const item = mockWasteItems.find(w => w.id === selectedItemId);
    return { type: 'waste', data: item };
  }
};

/**
 * Retrieves simulated eco-friendly replacement recommendations for supermarket purchases.
 * 
 * @param {string} receiptId - The unique receipt identifier
 * @returns {Object|null} Recommendation object containing savings (number) and text (string), or null if none
 */
export const getReceiptRecommendation = (receiptId) => {
  const recommendations = {
    rec_1: {
      savings: 11.2,
      text: "Swap Organic Ribeye Steak for Plant-Based Meatballs on your next supermarket trip."
    },
    rec_2: {
      savings: 0.7,
      text: "Select Oat Milk instead of Whole Milk dairy for your daily Latte."
    }
  };
  return recommendations[receiptId] || null;
};

export default {
  executeScan,
  getReceiptRecommendation
};
