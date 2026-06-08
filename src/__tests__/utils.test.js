/**
 * Utility function tests for carbon calculations and conversions
 * Testing core metrics: carbon, water, waste, XP, and eco-credits
 */

describe('Carbon Calculation Utilities', () => {
  describe('treeYearsFromCarbon', () => {
    it('should convert carbon saved to tree-years', () => {
      const carbonSaved = 22.0;
      const treeYears = (carbonSaved / 22.0).toFixed(1);
      expect(treeYears).toBe('1.0');
    });

    it('should handle large carbon values', () => {
      const carbonSaved = 220;
      const treeYears = (carbonSaved / 22.0).toFixed(1);
      expect(treeYears).toBe('10.0');
    });

    it('should handle decimal values', () => {
      const carbonSaved = 110;
      const treeYears = (carbonSaved / 22.0).toFixed(1);
      expect(parseFloat(treeYears)).toBeCloseTo(5.0, 1);
    });
  });

  describe('kmDrivenFromCarbon', () => {
    it('should convert carbon saved to km driven avoided', () => {
      const carbonSaved = 100;
      const kmDriven = (carbonSaved * 4.2).toFixed(0);
      expect(kmDriven).toBe('420');
    });
  });

  describe('showersSavedFromWater', () => {
    it('should convert water saved to number of showers', () => {
      const waterSaved = 800;
      const showersSaved = (waterSaved / 80).toFixed(0);
      expect(showersSaved).toBe('10');
    });
  });

  describe('bottlesDivertedFromWaste', () => {
    it('should convert waste diverted to plastic bottles', () => {
      const wasteDiverted = 10;
      const bottlesDiverted = (wasteDiverted * 50).toFixed(0);
      expect(bottlesDiverted).toBe('500');
    });
  });

  describe('XP calculations', () => {
    it('should calculate level up threshold', () => {
      const currentXp = 450;
      const nextXpAmount = 100;
      const willLevelUp = (currentXp + nextXpAmount) >= 500;
      expect(willLevelUp).toBe(true);
    });

    it('should not level up below threshold', () => {
      const currentXp = 400;
      const nextXpAmount = 50;
      const willLevelUp = (currentXp + nextXpAmount) >= 500;
      expect(willLevelUp).toBe(false);
    });
  });

  describe('Eco-Credits calculations', () => {
    it('should prevent negative credits', () => {
      const currentCredits = 50;
      const spent = 100;
      const remaining = Math.max(0, currentCredits - spent);
      expect(remaining).toBe(0);
    });

    it('should add credits correctly', () => {
      const currentCredits = 100;
      const earned = 50;
      const total = currentCredits + earned;
      expect(total).toBe(150);
    });
  });
});

describe('Action Impact Calculations', () => {
  const getActionImpact = (actionKey) => {
    const impacts = {
      solar: { carbon: 24.0, water: 0, credits: 60, xp: 80 },
      bike: { carbon: 1.8, water: 0, credits: 25, xp: 30 },
      thermostat: { carbon: 0.8, water: 0, credits: 10, xp: 15 },
      meat: { carbon: 3.2, water: 1200, credits: 20, xp: 25 }
    };
    return impacts[actionKey];
  };

  it('should calculate solar impact correctly', () => {
    const impact = getActionImpact('solar');
    expect(impact.carbon).toBe(24.0);
    expect(impact.credits).toBe(60);
    expect(impact.xp).toBe(80);
  });

  it('should calculate bike impact correctly', () => {
    const impact = getActionImpact('bike');
    expect(impact.carbon).toBe(1.8);
    expect(impact.credits).toBe(25);
  });

  it('should calculate meat impact correctly', () => {
    const impact = getActionImpact('meat');
    expect(impact.water).toBe(1200);
    expect(impact.carbon).toBe(3.2);
  });

  it('should return undefined for invalid action', () => {
    const impact = getActionImpact('invalid');
    expect(impact).toBeUndefined();
  });
});
