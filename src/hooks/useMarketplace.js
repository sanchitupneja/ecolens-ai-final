import { useState, useCallback } from 'react';
import { validatePurchase, formatRedemptionError } from '../services/marketplaceService';

/**
 * Custom hook to manage the Eco-Marketplace transactions, voucher unlocks, and redemption dialogs.
 * 
 * @returns {{ activePromo: Object|null, setActivePromo: Function, redeemError: string|null, setRedeemError: Function, handleRedeemItem: Function }} Eco-marketplace transaction state and utilities
 */
export const useMarketplace = () => {
  const [activePromo, setActivePromo] = useState(null);
  const [redeemError, setRedeemError] = useState(null);

  const handleRedeemItem = useCallback((item, ecoCredits, setEcoCredits, setUnlockedVouchers) => {
    setRedeemError(null);
    if (!item || typeof item.cost !== 'number') return false;

    if (validatePurchase(ecoCredits, item.cost)) {
      setEcoCredits(prev => prev - item.cost);
      setUnlockedVouchers(prev => ({
        ...prev,
        [item.id]: item.code
      }));
      setActivePromo(item);
      return true;
    } else {
      const errorMsg = formatRedemptionError(item.name, item.cost, ecoCredits);
      setRedeemError(errorMsg);
      return false;
    }
  }, []);

  return {
    activePromo,
    setActivePromo,
    redeemError,
    setRedeemError,
    handleRedeemItem
  };
};

export default useMarketplace;
