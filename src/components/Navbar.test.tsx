import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('highlights catalog link when on catalog route', () => {
    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <Navbar />
      </MemoryRouter>
    );

    const catalogLink = screen.getByRole('link', { name: /catalog/i });
    expect(catalogLink).toHaveClass('border-industrial-orange');
  });

  it('renders quote CTA', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /request quote/i })).toBeInTheDocument();
  });
});
