import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home page', () => {
  it('renders primary heading and CTAs', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /bulk procurement experts for critical operations/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start new request/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /browse catalog/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /about forez corp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /full credentials & story/i })).toHaveAttribute('href', '/about');
  });

  it('uses the industrial hero background image', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const bgNode = container.querySelector(
      "div[style*='225146875_pHG2NHqEtgRUNcvTOAWKmIn8DrW2wHVb.jpg']"
    );
    expect(bgNode).toBeInTheDocument();
  });
});
