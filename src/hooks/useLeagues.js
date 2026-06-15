import { useState, useCallback } from 'react';
import { updateLeaderboard } from '../services/leagueService';

/**
 * Custom hook to manage carbon league leaderboards, gamified rank updating, and safeguarding daily streaks.
 * 
 * @param {Array<Object>} initialLeagues - Initial array of league participant standings
 * @returns {{ leaguesList: Array<Object>, activityLogged: boolean, shieldError: string|null, setShieldError: Function, handleSimulateActivity: Function, handleBuyShield: Function }} League management state and utilities
 */
export const useLeagues = (initialLeagues) => {
  const [leaguesList, setLeaguesList] = useState(initialLeagues);
  const [activityLogged, setActivityLogged] = useState(false);
  const [shieldError, setShieldError] = useState(null);

  const handleSimulateActivity = useCallback((addXp) => {
    if (activityLogged) return;

    setLeaguesList(prev => updateLeaderboard(prev));

    addXp(60);
    setActivityLogged(true);
  }, [activityLogged]);

  const handleBuyShield = useCallback((ecoCredits, setEcoCredits, setStreakShields) => {
    setShieldError(null);
    if (ecoCredits >= 100) {
      setEcoCredits(prev => prev - 100);
      setStreakShields(prev => prev + 1);
      return true;
    } else {
      setShieldError('Insufficient Eco-Credits to purchase a Streak Shield!');
      return false;
    }
  }, []);

  return {
    leaguesList,
    activityLogged,
    shieldError,
    setShieldError,
    handleSimulateActivity,
    handleBuyShield
  };
};

export default useLeagues;
