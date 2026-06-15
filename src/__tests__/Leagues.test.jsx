import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Leagues from '../components/Leagues';

describe('Leagues Component', () => {
  const setEcoCredits = vi.fn();
  const setStreakShields = vi.fn();
  const addXp = vi.fn();

  const defaultProps = {
    ecoCredits: 420,
    setEcoCredits,
    streakShields: 1,
    setStreakShields,
    addXp
  };

  it('renders leagues standing rows and badges', () => {
    render(<Leagues {...defaultProps} />);
    
    expect(screen.getByText('Regional Carbon Leagues')).toBeInTheDocument();
    expect(screen.getByText('Oakridge League Board')).toBeInTheDocument();
    expect(screen.getByText('You (Maya) (You)')).toBeInTheDocument();
    expect(screen.getByText('Solar Pioneer')).toBeInTheDocument();
  });

  it('allows user to purchase a streak safeguard shield', () => {
    render(<Leagues {...defaultProps} />);
    
    const purchaseBtn = screen.getByLabelText('Purchase one active streak shield for one hundred eco-credits');
    fireEvent.click(purchaseBtn);

    expect(setEcoCredits).toHaveBeenCalled();
    expect(setStreakShields).toHaveBeenCalled();
  });

  it('prevents purchase of streak shield if credits are insufficient', () => {
    render(<Leagues {...defaultProps} ecoCredits={50} />);
    
    const purchaseBtn = screen.getByLabelText('Purchase one active streak shield for one hundred eco-credits');
    fireEvent.click(purchaseBtn);

    expect(setEcoCredits).not.toHaveBeenCalled();
    expect(screen.getByText(/Insufficient Eco-Credits to purchase/i)).toBeInTheDocument();
  });

  it('allows user to log simulated activity to climb rankings', () => {
    render(<Leagues {...defaultProps} />);
    
    const climbBtn = screen.getByText('Log Activity & Climb Rank');
    fireEvent.click(climbBtn);

    expect(addXp).toHaveBeenCalledWith(60);
    expect(screen.getByText('✓ Rank Updated (+60 XP)')).toBeInTheDocument();
  });
});
