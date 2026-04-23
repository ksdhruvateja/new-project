import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import { PRODUCT_CATEGORIES } from '../constants';

export type BulkQuoteLine = {
  categoryId: string;
  categoryName: string;
  productId: string;
  productName: string;
  qty: number;
  type: string;
  dimensions: string;
};

const STORAGE_KEY = 'forez-bulk-quote-lines';

function lineKey(categoryId: string, productId: string) {
  return `${categoryId}::${productId}`;
}

function loadFromStorage(): BulkQuoteLine[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BulkQuoteLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(lines: BulkQuoteLine[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // ignore
  }
}

let store: BulkQuoteLine[] = loadFromStorage();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot() {
  return store;
}

function setStore(next: BulkQuoteLine[]) {
  store = next;
  saveToStorage(next);
  emit();
}

type BulkQuoteContextValue = {
  lines: BulkQuoteLine[];
  itemCount: number;
  isSelected: (categoryId: string, productId: string) => boolean;
  toggleProduct: (categoryId: string, productId: string) => void;
  setQty: (categoryId: string, productId: string, qty: number) => void;
  setType: (categoryId: string, productId: string, type: string) => void;
  setDimensions: (categoryId: string, productId: string, dimensions: string) => void;
  removeLine: (categoryId: string, productId: string) => void;
  clearLines: () => void;
};

const BulkQuoteContext = createContext<BulkQuoteContextValue | null>(null);

export function BulkQuoteProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const value = useMemo<BulkQuoteContextValue>(() => {
    const resolveCategory = (categoryId: string) =>
      PRODUCT_CATEGORIES.find((c) => c.id === categoryId);

    const resolveProduct = (categoryId: string, productId: string) => {
      const cat = resolveCategory(categoryId);
      return cat?.products.find((p) => p.id === productId);
    };

    return {
      lines,
      itemCount: lines.length,
      isSelected: (categoryId, productId) =>
        lines.some((l) => l.categoryId === categoryId && l.productId === productId),
      toggleProduct: (categoryId, productId) => {
        const cat = resolveCategory(categoryId);
        const product = resolveProduct(categoryId, productId);
        if (!cat || !product) return;

        const key = lineKey(categoryId, productId);
        const exists = store.some((l) => lineKey(l.categoryId, l.productId) === key);
        if (exists) {
          setStore(store.filter((l) => lineKey(l.categoryId, l.productId) !== key));
        } else {
          setStore([
            ...store,
            {
              categoryId: cat.id,
              categoryName: cat.name,
              productId: product.id,
              productName: product.name,
              qty: 1,
              type: '',
              dimensions: '',
            },
          ]);
        }
      },
      setQty: (categoryId, productId, qty) => {
        const safe = Math.max(1, Math.floor(Number(qty)) || 1);
        setStore(
          store.map((l) =>
            l.categoryId === categoryId && l.productId === productId ? { ...l, qty: safe } : l
          )
        );
      },
      setType: (categoryId, productId, type) => {
        setStore(
          store.map((l) =>
            l.categoryId === categoryId && l.productId === productId ? { ...l, type } : l
          )
        );
      },
      setDimensions: (categoryId, productId, dimensions) => {
        setStore(
          store.map((l) =>
            l.categoryId === categoryId && l.productId === productId
              ? { ...l, dimensions }
              : l
          )
        );
      },
      removeLine: (categoryId, productId) => {
        setStore(
          store.filter((l) => !(l.categoryId === categoryId && l.productId === productId))
        );
      },
      clearLines: () => setStore([]),
    };
  }, [lines]);

  return <BulkQuoteContext.Provider value={value}>{children}</BulkQuoteContext.Provider>;
}

export function useBulkQuote() {
  const ctx = useContext(BulkQuoteContext);
  if (!ctx) {
    throw new Error('useBulkQuote must be used within BulkQuoteProvider');
  }
  return ctx;
}

export function useBulkQuoteOptional() {
  return useContext(BulkQuoteContext);
}
