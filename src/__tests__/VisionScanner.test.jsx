import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VisionScanner from '../components/VisionScanner';

// Mock timer functions
vi.useFakeTimers();

describe('VisionScanner Component', () => {
  const addCarbonSaved = vi.fn();
  const addWasteDiverted = vi.fn();
  const addCredits = vi.fn();
  const addXp = vi.fn();

  const getProps = () => ({
    addCarbonSaved,
    addWasteDiverted,
    addCredits,
    addXp
  });

  it('renders tab triggers and scanner options', () => {
    render(<VisionScanner {...getProps()} />);
    
    expect(screen.getByText('Computer Vision & OCR Module')).toBeInTheDocument();
    expect(screen.getByText('Receipt OCR')).toBeInTheDocument();
    expect(screen.getByText('Waste Object Detector')).toBeInTheDocument();
  });

  it('simulates receipt OCR scanning process and updates state', () => {
    render(<VisionScanner {...getProps()} />);
    
    const snapBtn = screen.getByRole('button', { name: 'Simulate Snap' });
    
    // Trigger scanning
    fireEvent.click(snapBtn);
    expect(screen.getByText('Extracting LCA Values...')).toBeInTheDocument();

    // Advance mock timers to finish scanning simulation
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByText('Extracting LCA Values...')).not.toBeInTheDocument();
    expect(screen.getByText('Whole Foods Market #1024')).toBeInTheDocument();
    expect(screen.getByText('ORGANIC RIBEYE STEAK (0.8 kg)')).toBeInTheDocument();
  });

  it('applies alternative eco-choices and rewards user', () => {
    render(<VisionScanner {...getProps()} />);
    
    const snapBtn = screen.getByRole('button', { name: 'Simulate Snap' });
    fireEvent.click(snapBtn);
    
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const commitBtn = screen.getByRole('button', { name: 'Commit to Alternative (+30 Eco-Credits)' });
    fireEvent.click(commitBtn);

    expect(addCarbonSaved).toHaveBeenCalledWith(11.2);
    expect(addCredits).toHaveBeenCalledWith(30);
    expect(addXp).toHaveBeenCalledWith(40);
    expect(screen.getByText('✓ Swap Decision Logged (+30 CC)')).toBeInTheDocument();
  });
});
