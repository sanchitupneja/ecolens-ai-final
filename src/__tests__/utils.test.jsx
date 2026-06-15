import { describe, it, expect } from 'vitest';
import { 
  createMetricLabel, 
  createActionLabel, 
  createBadgeLabel, 
  createChartLabel,
  getTabIndex,
  getContrastRatio
} from '../utils/a11y';
import { 
  calculateCarbonMetrics, 
  calculateWaterMetrics, 
  calculateWasteMetrics,
  debounce,
  throttle
} from '../utils/performance';

describe('Accessibility Utilities', () => {
  it('creates proper ARIA metric labels', () => {
    const label = createMetricLabel('Carbon', 50, 'kg');
    expect(label).toBe('Carbon: 50 kg');
  });

  it('creates proper action toggling labels', () => {
    const label = createActionLabel('Solar Connect', true, '+50 CC');
    expect(label).toBe('Solar Connect, Active. Impact: +50 CC');
  });

  it('creates proper badge labels', () => {
    const label = createBadgeLabel('Level', 8);
    expect(label).toBe('Level: 8');
  });

  it('creates proper chart helper descriptions', () => {
    const label = createChartLabel('Solar Savings', 'Saves 1800kg annually');
    expect(label).toBe('Chart: Solar Savings. Saves 1800kg annually');
  });

  it('verifies tab indexes correctly', () => {
    expect(getTabIndex('BUTTON')).toBe(0);
    expect(getTabIndex('DIV')).toBe(-1);
  });

  it('calculates proper contrast ratios', () => {
    // White (#ffffff) on Dark Background (#070a13)
    const ratio = getContrastRatio('#ffffff', '#070a13');
    expect(ratio).toBeGreaterThan(4.5);
  });
});

describe('Performance Calculations', () => {
  it('converts carbon values to tree analogies', () => {
    const metrics = calculateCarbonMetrics(22.0);
    expect(metrics.treeYears).toBe('1.0');
    expect(metrics.kmDriven).toBe('92');
  });

  it('converts water metrics to shower equivalents', () => {
    const metrics = calculateWaterMetrics(80);
    expect(metrics.showersSaved).toBe('1');
  });

  it('converts waste metrics to plastic bottle equivalents', () => {
    const metrics = calculateWasteMetrics(10);
    expect(metrics.bottlesDiverted).toBe('500');
  });
});
