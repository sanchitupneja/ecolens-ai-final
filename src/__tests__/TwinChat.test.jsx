import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TwinChat from '../components/TwinChat';

vi.useFakeTimers();

describe('TwinChat Component', () => {
  const setChatMessages = vi.fn();
  const initialMessages = [
    {
      sender: 'twin',
      text: 'Hello Maya! I am your AI Climate Twin.',
      timestamp: '12:00 PM'
    }
  ];

  it('renders chat message window and simulation labels', () => {
    render(<TwinChat chatMessages={initialMessages} setChatMessages={setChatMessages} />);
    
    expect(screen.getByText('AI Twin Simulation Agent')).toBeInTheDocument();
    expect(screen.getByText('Hello Maya! I am your AI Climate Twin.')).toBeInTheDocument();
  });

  it('sends user message and shows typing indicator', () => {
    render(<TwinChat chatMessages={initialMessages} setChatMessages={setChatMessages} />);
    
    const inputField = screen.getByPlaceholderText('Ask your Twin about energy, commutes, diet...');
    const sendButton = screen.getByRole('button', { name: 'Send' });

    fireEvent.change(inputField, { target: { value: 'What if I go vegetarian?' } });
    fireEvent.click(sendButton);

    expect(setChatMessages).toHaveBeenCalled();
    
    // Test that typing indicator is shown (represented by visually hidden text)
    expect(screen.getByText('AI is typing...')).toBeInTheDocument();
  });

  it('contains projection trajectory elements', () => {
    render(<TwinChat chatMessages={initialMessages} setChatMessages={setChatMessages} />);
    
    expect(screen.getByText('Simulated Trajectory Visualizer')).toBeInTheDocument();
    expect(screen.getByText('Status Quo (Base Trail)')).toBeInTheDocument();
    expect(screen.getByText('With Lifestyle Change')).toBeInTheDocument();
  });
});
