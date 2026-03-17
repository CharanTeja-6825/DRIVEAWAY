import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Home from './Home';
import theme from '@/theme/theme';

vi.mock('gsap', () => {
  const chain = {
    fromTo: vi.fn().mockReturnThis(),
  };

  return {
    gsap: {
      context: (cb) => {
        cb();
        return { revert: vi.fn() };
      },
      timeline: () => chain,
      to: vi.fn(),
    },
  };
});

describe('Home page', () => {
  it('renders hero copy and primary CTAs', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/Book your next drive with confidence/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start booking/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /become a dealer/i })).toBeInTheDocument();
    expect(screen.getByText(/Designed for confidence at every click/i)).toBeInTheDocument();
  });
});
