import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Marketplace from '../components/Marketplace';

describe('Marketplace Component', () => {
  const setEcoCredits = vi.fn();
  const setUnlockedVouchers = vi.fn();

  const defaultProps = {
    ecoCredits: 420,
    setEcoCredits,
    unlockedVouchers: {},
    setUnlockedVouchers
  };

  it('renders marketplace partner list and credits successfully', () => {
    render(<Marketplace {...defaultProps} />);
    
    expect(screen.getByText('Eco-Alternative Marketplace')).toBeInTheDocument();
    expect(screen.getByText('1-Month E-Bike Rental')).toBeInTheDocument();
  });

  it('unlocks a voucher when user has sufficient credits', () => {
    render(<Marketplace {...defaultProps} />);
    
    // Redeem Lime E-Bike (cost 300 CC)
    const redeemLimeBtn = screen.getByLabelText('Redeem Voucher for Lime / Spin Share costing 300 credits');
    fireEvent.click(redeemLimeBtn);

    expect(setEcoCredits).toHaveBeenCalled();
    expect(setUnlockedVouchers).toHaveBeenCalled();
  });

  it('prevents voucher redemption when credits are insufficient', () => {
    render(<Marketplace {...defaultProps} ecoCredits={50} />);
    
    // Redeem Lime E-Bike (cost 300 CC)
    const redeemLimeBtn = screen.getByLabelText('Redeem Voucher for Lime / Spin Share costing 300 credits');
    fireEvent.click(redeemLimeBtn);

    expect(setEcoCredits).not.toHaveBeenCalled();
    expect(screen.getByText(/Insufficient Eco-Credits/i)).toBeInTheDocument();
  });

  it('renders active promo codes in modal view', () => {
    const unlocked = { market_1: 'LIME-TERRA-20' };
    render(<Marketplace {...defaultProps} unlockedVouchers={unlocked} />);
    
    // Since Lime E-bike is unlocked, it should render unclaimed trigger with "Claimed Voucher" title
    const claimedBtn = screen.getByText('✓ Claimed Voucher (LIME-TERRA-20)');
    fireEvent.click(claimedBtn);

    // Modal popup should render
    expect(screen.getByText('Redeem at Checkout')).toBeInTheDocument();
    expect(screen.getAllByText('LIME-TERRA-20').length).toBeGreaterThan(0);
  });
});
