/**
 * Eco-Marketplace Transaction Service.
 * Decouples balance validation logic from React hooks.
 */

/**
 * Validates if the user has sufficient Eco-Credits for a purchase.
 * 
 * @param {number} ecoCredits - Current user balance
 * @param {number} cost - Item cost
 * @returns {boolean} True if purchase is valid
 */
export const validatePurchase = (ecoCredits, cost) => {
  return ecoCredits >= cost;
};

/**
 * Formats standard insufficient funds error messages.
 * 
 * @param {string} itemName - Name of coupon/reward
 * @param {number} cost - Required cost in CC
 * @param {number} ecoCredits - Available user CC balance
 * @returns {string} Fully structured readable message
 */
export const formatRedemptionError = (itemName, cost, ecoCredits) => {
  return `Insufficient Eco-Credits! This coupon requires ${cost} CC, but you only have ${ecoCredits} CC.`;
};

export default {
  validatePurchase,
  formatRedemptionError,
};
