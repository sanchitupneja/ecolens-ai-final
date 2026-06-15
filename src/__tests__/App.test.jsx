import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

describe('App Layout and Router Integration', () => {
  it('renders side navigation and top header widgets', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Check navigation buttons
    expect(screen.getByRole('button', { name: 'View Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View AI Twin Coach Chat' })).toBeInTheDocument();
    
    // Check top header stats
    expect(screen.getByText('Active Streak')).toBeInTheDocument();
    expect(screen.getByText('14 Days')).toBeInTheDocument();
    expect(screen.getByText('Eco-Credits')).toBeInTheDocument();
  });

  it('navigates route tabs on button click', async () => {
    await act(async () => {
      render(<App />);
    });

    // We start at Dashboard tab. Let's switch to OCR & Waste Scan
    const ocrNavButton = screen.getByRole('button', { name: 'View OCR Scanner' });
    
    await act(async () => {
      fireEvent.click(ocrNavButton);
    });

    // Check that lazy scanner is rendered and header exists
    expect(await screen.findByText('Computer Vision & OCR Module')).toBeInTheDocument();
  });
});
