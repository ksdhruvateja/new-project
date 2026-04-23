import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ChevronRight, Check, ChevronDown } from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  getProductImage,
  FALLBACK_PRODUCT_IMAGE,
  type Product,
  type Category,
} from '../constants';
import { cn } from '../lib/utils';
import { useBulkQuote } from '../context/BulkQuoteContext';

function productKey(categoryId: string, productId: string) {
  return `${categoryId}::${productId}`;
}

function productMatchesBrandFilter(product: Product, selectedBrands: string[]) {
  if (selectedBrands.length === 0) return true;
  return product.brands.some((b) => selectedBrands.includes(b));
}

/** Case-insensitive partial match across category, product line, ids, and brands. */
function entryMatchesCatalogSearch(
  category: Category,
  product: Product,
  query: string
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const fields = [category.name, category.id, product.name, product.id, ...product.brands];
  return fields.some((f) => f.toLowerCase().includes(q));
}

/** Flat list preserving category order: one entry per product line (catalog card). */
function getCatalogEntries(
  selectedBrands: string[],
  catalogSearch: string
): { category: Category; product: Product }[] {
  const out: { category: Category; product: Product }[] = [];
  for (const cat of PRODUCT_CATEGORIES) {
    for (const product of cat.products) {
      if (!productMatchesBrandFilter(product, selectedBrands)) continue;
      if (!entryMatchesCatalogSearch(cat, product, catalogSearch)) continue;
      out.push({ category: cat, product });
    }
  }
  return out;
}

import { useSEO } from '../lib/useSEO';

export default function Catalog() {
  useSEO({
    title: 'Product Catalog — Bearings, Drives, Couplings & MRO',
    description: 'Browse Forez Corp\'s full industrial product catalog. Request bulk quotes on bearings, power transmission, belts, couplings, HVAC components, and more from top brands like SKF, Timken, NSK, and Gates.',
    path: '/catalog',
    keywords: 'industrial product catalog, buy bearings online, SKF Timken NSK bearings, power transmission products, buy couplings belts drives, MRO catalog New York',
    breadcrumbs: [{ name: 'Catalog', path: '/catalog' }],
  });
  const { categoryId } = useParams();
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [catalogSearch, setCatalogSearch] = React.useState('');
  const [brandSearch, setBrandSearch] = React.useState('');
  const [expandedBrandsByProduct, setExpandedBrandsByProduct] = React.useState<Record<string, boolean>>({});
  const { isSelected, toggleProduct, itemCount, clearLines } = useBulkQuote();

  const allBrands = useMemo(
    () =>
      Array.from(
        new Set(PRODUCT_CATEGORIES.flatMap((c) => c.products.flatMap((p) => p.brands)))
      ).sort(),
    []
  );

  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.trim().toLowerCase())
  );

  const catalogEntries = useMemo(
    () => getCatalogEntries(selectedBrands, catalogSearch),
    [selectedBrands, catalogSearch]
  );

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleBrandList = (key: string) => {
    setExpandedBrandsByProduct((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (categoryId) {
    return <Navigate to="/catalog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] pb-36">
      <div className="border-b border-zinc-800/10 bg-zinc-900 py-4 px-6 text-white md:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 sm:text-sm">
            <Link to="/" className="shrink-0 hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-zinc-600" />
            <span className="truncate text-zinc-300">Catalog</span>
          </div>
          <div className="relative flex w-full min-w-0 items-center border border-zinc-600 bg-zinc-800/50 px-3 py-2 sm:max-w-md sm:flex-1 sm:justify-end lg:w-72 lg:max-w-none lg:flex-none">
            <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
            <input
              type="search"
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              placeholder="Search products, categories, brands"
              autoComplete="off"
              aria-label="Search catalog by product name, category, or brand"
              className="min-w-0 flex-1 border-none bg-transparent text-xs font-semibold uppercase tracking-wider text-zinc-200 placeholder:text-zinc-600 outline-none"
            />
            {catalogSearch.trim() !== '' && (
              <button
                type="button"
                onClick={() => setCatalogSearch('')}
                className="ml-1 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-4 py-10 sm:px-6 md:flex-row md:gap-12 md:px-8 lg:px-12">
        <aside className="w-full shrink-0 space-y-8 md:w-72 lg:w-80">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-sm font-black uppercase tracking-wide text-zinc-900">Filter brands</h3>
              {selectedBrands.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedBrands([])}
                  className="text-[11px] font-bold uppercase text-zinc-600 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search brands"
                className="h-11 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-10 pr-3 text-sm font-semibold uppercase outline-none transition-colors focus:border-zinc-400"
              />
            </div>
            <div className="max-h-[min(55vh,22rem)] space-y-2 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
              {filteredBrands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => toggleBrand(brand)}
                  className={cn(
                    'flex min-h-[2.75rem] w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-colors',
                    selectedBrands.includes(brand)
                      ? 'border-zinc-400 bg-zinc-100'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  )}
                >
                  <span className="text-[10px] font-bold uppercase leading-snug text-zinc-800 sm:text-xs">{brand}</span>
                  <div
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded border',
                      selectedBrands.includes(brand)
                        ? 'border-zinc-700 bg-zinc-700'
                        : 'border-zinc-300 bg-white'
                    )}
                  >
                    {selectedBrands.includes(brand) && <Check className="h-3 w-3 text-white" />}
                  </div>
                </button>
              ))}
              {filteredBrands.length === 0 && (
                <p className="px-1 py-2 text-xs font-semibold uppercase text-zinc-400">No brands found</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/10 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-zinc-900">Bulk sourcing</h3>
            <p className="mb-5 text-xs font-medium uppercase leading-relaxed text-zinc-500">
              Need something not listed? We can source it.
            </p>
            <Link
              to="/sourcing"
              className="block w-full rounded-lg border-2 border-zinc-900 bg-zinc-900 py-3 text-center text-xs font-black uppercase text-white transition-colors hover:bg-zinc-800"
            >
              Custom request
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-10">
            <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              Product catalog
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium uppercase leading-relaxed text-zinc-500">
              Each card is one product line. Category appears on every card; multiple lines in a category each get their
              own card. Select photos for your bulk quote — expand brands without leaving the grid.
            </p>
          </header>

          {catalogEntries.length === 0 ? (
            <p className="rounded-xl border-2 border-dashed border-zinc-300 bg-white px-6 py-14 text-center text-sm font-semibold uppercase text-zinc-500">
              No lines match your search or brand filters. Clear the catalog search, brand selections, or try different
              keywords.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {catalogEntries.map(({ category, product }, idx) => (
                <CatalogProductCard
                  key={productKey(category.id, product.id)}
                  category={category}
                  product={product}
                  idx={idx}
                  expanded={!!expandedBrandsByProduct[productKey(category.id, product.id)]}
                  onToggleBrands={() => toggleBrandList(productKey(category.id, product.id))}
                  isSelected={isSelected(category.id, product.id)}
                  onToggleQuote={() => toggleProduct(category.id, product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {itemCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 z-50 w-full border-t-2 border-zinc-400 bg-zinc-200 py-5 px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:px-12"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white text-2xl font-black text-zinc-900">
                {itemCount}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-black uppercase leading-tight text-zinc-900 sm:text-xl">Bulk quote</h2>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-800/80">
                  Continue to request quote for contact details
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={clearLines}
                className="rounded-lg border-2 border-zinc-900 bg-zinc-900 px-5 py-3 text-sm font-black uppercase text-white transition-colors hover:bg-zinc-800"
              >
                Clear
              </button>
              <Link
                to="/sourcing"
                className="rounded-lg border-2 border-zinc-900 bg-white px-8 py-3 text-center text-sm font-black uppercase text-zinc-900 shadow-sm transition-transform hover:-translate-y-0.5 sm:text-base"
              >
                Request quote
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function CatalogProductCard({
  category,
  product,
  idx,
  expanded,
  onToggleBrands,
  isSelected,
  onToggleQuote,
}: {
  category: Category;
  product: Product;
  idx: number;
  expanded: boolean;
  onToggleBrands: () => void;
  isSelected: boolean;
  onToggleQuote: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(idx * 0.015, 0.35), duration: 0.35 }}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-[0_2px_0_0_rgba(24,24,27,0.06)] transition-all duration-300',
        'hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_12px_40px_-12px_rgba(24,24,27,0.18)]',
        isSelected && 'border-zinc-500 ring-2 ring-zinc-400/40 ring-offset-2 ring-offset-[#f4f4f5]'
      )}
    >
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={onToggleQuote}
        className="relative aspect-square w-full shrink-0 overflow-hidden bg-zinc-100 text-left outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 sm:aspect-[4/3]"
      >
        <div
          className={cn(
            'absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded border-2 border-zinc-900/90 bg-white/95 shadow-sm transition-colors',
            isSelected && 'border-zinc-700 bg-zinc-600'
          )}
        >
          {isSelected && <Check className="h-4 w-4 text-white" strokeWidth={2.5} />}
        </div>
        <img
          src={getProductImage(product, category)}
          alt={`${product.name} industrial part in ${category.name} category`}
          className="h-full w-full object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.04] group-hover:grayscale-[0.35]"
          loading={idx < 16 ? 'eager' : 'lazy'}
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
          }}
        />
        <span className="sr-only">
          {isSelected ? 'Remove' : 'Add'} {category.name} — {product.name} from bulk quote
        </span>
      </button>

      <div className="flex flex-1 flex-col p-2 sm:p-5">
        <p className="hidden text-[11px] font-black uppercase tracking-[0.12em] text-zinc-900 sm:block">{category.name}</p>
        <h3 className="line-clamp-2 text-[10px] font-bold uppercase leading-tight text-zinc-700 sm:mt-1.5 sm:text-sm sm:leading-snug sm:text-zinc-600">{product.name}</h3>
        <p className="mt-2 hidden text-[10px] font-semibold uppercase tracking-wider text-zinc-400 sm:block sm:mt-3">
          {product.brands.length} brands available
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBrands();
          }}
          className={cn(
            'mt-4 hidden min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-lg border-2 text-xs font-black uppercase tracking-wide transition-colors sm:flex',
            expanded
              ? 'border-zinc-900 bg-zinc-900 text-white'
              : 'border-zinc-800/20 bg-zinc-50 text-zinc-800 hover:border-zinc-400 hover:bg-white'
          )}
        >
          Brands we carry
          <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform duration-200', expanded && 'rotate-180')} />
        </button>

        {expanded && (
          <div
            className="mt-4 hidden border-t border-zinc-200 pt-4 sm:block"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Brands in this line</p>
            <ul className="flex flex-wrap gap-2">
              {product.brands.map((brand) => (
                <li
                  key={brand}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[10px] font-bold uppercase leading-snug text-zinc-800"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.article>
  );
}
