import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../components/Dashboard';

describe('Dashboard Component', () => {
  const mockToggle = vi.fn();
  const defaultProps = {
    carbonSaved: 182.4,
    waterSaved: 4200,
    wasteDiverted: 22.8,
    actions: { solar: false, bike: false, thermostat: false, meat: false },
    onToggleAction: mockToggle
  };

  it('renders all metrics cards successfully', () => {
    render(<Dashboard {...defaultProps} />);
    
    // Check titles
    expect(screen.getByText('Carbon Analogy')).toBeInTheDocument();
    expect(screen.getByText('Water Preserved')).toBeInTheDocument();
    expect(screen.getByText('Waste Diverted')).toBeInTheDocument();

    // Check specific calculations rendering
    expect(screen.getByText('8.3 Tree-Years')).toBeInTheDocument();
    expect(screen.getByText('4,200 Liters')).toBeInTheDocument();
    expect(screen.getByText('22.8 kg')).toBeInTheDocument();
  });

  it('renders action habit cards and supports click events', () => {
    render(<Dashboard {...defaultProps} />);
    
    // Find Community Solar Connect button
    const solarButton = screen.getByLabelText('Community Solar Link, Inactive. Impact: +60 CC, +80 XP');
    expect(solarButton).toBeInTheDocument();
    
    // Click connect
    fireEvent.click(solarButton);
    expect(mockToggle).toHaveBeenCalledWith('solar');
  });

  it('displays proper label texts for active actions', () => {
    const activeActions = { solar: true, bike: true, thermostat: false, meat: false };
    render(<Dashboard {...defaultProps} actions={activeActions} />);
    
    const activeSolarBtn = screen.getByLabelText('Community Solar Link, Active. Impact: +60 CC, +80 XP');
    expect(activeSolarBtn).toHaveTextContent('Disconnect');
  });
});
