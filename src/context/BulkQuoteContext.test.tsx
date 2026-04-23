import { act, renderHook } from '@testing-library/react';
import { BulkQuoteProvider, useBulkQuote } from './BulkQuoteContext';
import { PRODUCT_CATEGORIES } from '../constants';

function wrapper({ children }: { children: React.ReactNode }) {
  return <BulkQuoteProvider>{children}</BulkQuoteProvider>;
}

describe('BulkQuoteContext', () => {
  const category = PRODUCT_CATEGORIES[0];
  const product = category.products[0];

  it('adds and removes a product line', () => {
    sessionStorage.clear();
    const { result } = renderHook(() => useBulkQuote(), { wrapper });

    act(() => {
      result.current.clearLines();
      result.current.toggleProduct(category.id, product.id);
    });

    expect(result.current.itemCount).toBe(1);
    expect(result.current.isSelected(category.id, product.id)).toBe(true);

    act(() => {
      result.current.toggleProduct(category.id, product.id);
    });

    expect(result.current.itemCount).toBe(0);
    expect(result.current.isSelected(category.id, product.id)).toBe(false);
  });

  it('updates qty, type and dimensions for selected line', () => {
    sessionStorage.clear();
    const { result } = renderHook(() => useBulkQuote(), { wrapper });

    act(() => {
      result.current.clearLines();
      result.current.toggleProduct(category.id, product.id);
      result.current.setQty(category.id, product.id, 7);
      result.current.setType(category.id, product.id, '6204-2RS');
      result.current.setDimensions(category.id, product.id, '20x47x14 mm');
    });

    const line = result.current.lines[0];
    expect(line.qty).toBe(7);
    expect(line.type).toBe('6204-2RS');
    expect(line.dimensions).toBe('20x47x14 mm');
  });
});
