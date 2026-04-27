import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { BulkQuoteProvider } from '../context/BulkQuoteContext';

function renderHome() {
  return render(
    <MemoryRouter>
      <BulkQuoteProvider>
        <Home />
      </BulkQuoteProvider>
    </MemoryRouter>
  );
}

describe('Home page', () => {
  it('renders primary heading and CTAs', () => {
    const { container } = renderHome();

    expect(screen.getByRole('heading', { name: /quality/i, level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /request (a )?quote|request a bulk quote/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /browse catalog/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /why forez/i })).toBeInTheDocument();
    expect(container.querySelector('a[href="/about"]')).toBeInTheDocument();
  });

  it('uses the industrial hero background image', () => {
    const { container } = renderHome();

    const bgNode = container.querySelector(
      "div[style*='225146875_pHG2NHqEtgRUNcvTOAWKmIn8DrW2wHVb.jpg']"
    );
    expect(bgNode).toBeInTheDocument();
  });
});
