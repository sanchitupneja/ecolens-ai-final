import { useState, useCallback } from 'react';

/**
 * Custom hook to manage XP progression, Level calculations, and Eco-Credits.
 * Validates state adjustments to prevent security/integrity issues like negative balances.
 * 
 * @returns {{ level: number, xp: number, ecoCredits: number, addXp: Function, addCredits: Function, setEcoCredits: Function }} XP and level status utilities
 */
export const useXPProgress = () => {
  const [level, setLevel] = useState(8);
  const [xp, setXp] = useState(320); // out of 500 XP to next level
  const [ecoCredits, setEcoCredits] = useState(420);

  const addXp = useCallback((amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return;

    setXp(prevXp => {
      let newXp = prevXp + amount;
      let newLevel = level;

      if (newXp >= 500) {
        while (newXp >= 500) {
          newXp -= 500;
          newLevel += 1;
          setEcoCredits(prev => prev + 100); // Level up bonus
        }
      } else if (newXp < 0) {
        // Simple rollback support
        while (newXp < 0 && newLevel > 1) {
          newLevel -= 1;
          newXp += 500;
          setEcoCredits(prev => Math.max(0, prev - 100));
        }
        newXp = Math.max(0, newXp);
      }

      setLevel(newLevel);
      return newXp;
    });
  }, [level]);

  const addCredits = useCallback((amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return;
    setEcoCredits(prev => Math.max(0, prev + amount));
  }, []);

  return {
    level,
    xp,
    ecoCredits,
    addXp,
    addCredits,
    setEcoCredits
  };
};

export default useXPProgress;
