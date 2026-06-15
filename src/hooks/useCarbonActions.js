import { useState, useCallback } from 'react';

/**
 * Custom hook to manage carbon reduction actions and impact metrics.
 * 
 * @param {Object} params - Initialization parameters
 * @param {Function} params.addXp - Callback to award XP
 * @param {Function} params.addCredits - Callback to award Eco-Credits
 * @returns {{ carbonSaved: number, waterSaved: number, wasteDiverted: number, actions: Object, handleToggleAction: Function, setCarbonSaved: Function, setWaterSaved: Function, setWasteDiverted: Function }} Carbon action metrics and change triggers
 */
export const useCarbonActions = ({ addXp, addCredits }) => {
  const [carbonSaved, setCarbonSaved] = useState(182.4); // in kg
  const [waterSaved, setWaterSaved] = useState(4200);   // in Liters
  const [wasteDiverted, setWasteDiverted] = useState(22.8); // in kg

  const [actions, setActions] = useState({
    solar: false,
    bike: false,
    thermostat: false,
    meat: false
  });

  const handleToggleAction = useCallback((actionKey) => {
    setActions(prev => {
      const isActivating = !prev[actionKey];
      const nextActions = { ...prev, [actionKey]: isActivating };

      let carbonChange = 0;
      let waterChange = 0;
      let creditChange = 0;
      let xpChange = 0;

      switch (actionKey) {
        case 'solar':
          carbonChange = 24.0;
          creditChange = 60;
          xpChange = 80;
          break;
        case 'bike':
          carbonChange = 1.8;
          creditChange = 25;
          xpChange = 30;
          break;
        case 'thermostat':
          carbonChange = 0.8;
          creditChange = 10;
          xpChange = 15;
          break;
        case 'meat':
          carbonChange = 3.2;
          waterChange = 1200;
          creditChange = 20;
          xpChange = 25;
          break;
        default:
          break;
      }

      if (isActivating) {
        setCarbonSaved(c => parseFloat((c + carbonChange).toFixed(1)));
        if (waterChange > 0) setWaterSaved(w => w + waterChange);
        addCredits(creditChange);
        addXp(xpChange);
      } else {
        setCarbonSaved(c => parseFloat(Math.max(0, c - carbonChange).toFixed(1)));
        if (waterChange > 0) setWaterSaved(w => Math.max(0, w - waterChange));
        addCredits(-creditChange);
        addXp(-xpChange);
      }

      return nextActions;
    });
  }, [addXp, addCredits]);

  return {
    carbonSaved,
    waterSaved,
    wasteDiverted,
    actions,
    handleToggleAction,
    setCarbonSaved,
    setWaterSaved,
    setWasteDiverted
  };
};

export default useCarbonActions;
