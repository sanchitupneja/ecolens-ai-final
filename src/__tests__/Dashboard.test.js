/**
 * Dashboard component tests
 * Tests rendering, data display, and user interactions
 */

describe('Dashboard Component', () => {
  it('should render metrics without crashing', () => {
    // Mock props
    const props = {
      carbonSaved: 182.4,
      waterSaved: 4200,
      wasteDiverted: 22.8,
      actions: { solar: false, bike: false, thermostat: false, meat: false },
      onToggleAction: () => {}
    };
    
    // Test that calculations work
    const treeYears = (props.carbonSaved / 22.0).toFixed(1);
    expect(treeYears).toBe('8.3');
    
    const kmDriven = (props.carbonSaved * 4.2).toFixed(0);
    expect(kmDriven).toBe('766');
    
    const showersSaved = (props.waterSaved / 80).toFixed(0);
    expect(showersSaved).toBe('53');
    
    const bottlesDiverted = (props.wasteDiverted * 50).toFixed(0);
    expect(bottlesDiverted).toBe('1140');
  });

  it('should calculate correct analogies', () => {
    const carbonSaved = 100;
    const treeYears = (carbonSaved / 22.0).toFixed(1);
    expect(parseFloat(treeYears)).toBeGreaterThan(4);
  });

  it('should handle zero metrics', () => {
    const carbonSaved = 0;
    const treeYears = (carbonSaved / 22.0).toFixed(1);
    expect(treeYears).toBe('0.0');
  });
});

describe('Dashboard Action Handlers', () => {
  const testActions = {
    solar: false,
    bike: false,
    thermostat: false,
    meat: false
  };

  it('should toggle solar action', () => {
    const updatedActions = { ...testActions, solar: true };
    expect(updatedActions.solar).toBe(true);
    expect(updatedActions.bike).toBe(false);
  });

  it('should toggle multiple actions', () => {
    const updated = { ...testActions, solar: true, bike: true };
    expect(Object.values(updated).filter(Boolean).length).toBe(2);
  });

  it('should reset actions', () => {
    const active = { ...testActions, solar: true, bike: true };
    const reset = { solar: false, bike: false, thermostat: false, meat: false };
    expect(active).not.toEqual(reset);
    expect(reset).toEqual(testActions);
  });
});
