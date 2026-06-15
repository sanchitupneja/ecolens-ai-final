import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ClimateTwinIsland from '../components/ClimateTwinIsland';

describe('ClimateTwinIsland Component', () => {
  const defaultActions = { solar: false, bike: false, thermostat: false, meat: false };

  it('renders correctly with default values', () => {
    render(<ClimateTwinIsland actions={defaultActions} carbonSaved={100} />);
    
    // Check heading
    expect(screen.getByText('AI Climate Twin (3D Island)')).toBeInTheDocument();
    
    // Check ecosystem status
    expect(screen.getByText('Ecosystem: Threatened')).toBeInTheDocument();
    
    // Check carbon text
    expect(screen.getByText('100 kg')).toBeInTheDocument();
  });

  it('shows flourishing ecosystem status when multiple actions are active', () => {
    const activeActions = { solar: true, bike: true, thermostat: true, meat: true };
    render(<ClimateTwinIsland actions={activeActions} carbonSaved={250} />);
    
    expect(screen.getByText('Ecosystem: Flourishing')).toBeInTheDocument();
  });

  it('contains accessible SVG title and description', () => {
    const { container } = render(<ClimateTwinIsland actions={defaultActions} carbonSaved={10} />);
    
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-label', 'Isometric illustration of floating digital twin island');
  });
});
