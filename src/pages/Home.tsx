import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, ClipboardPlus, Clock, LayoutGrid, Truck } from 'lucide-react';
import { FALLBACK_PRODUCT_IMAGE, PRODUCT_CATEGORIES, getProductImage } from '../constants';

export default function Home() {
  const totalProducts = PRODUCT_CATEGORIES.reduce((count, category) => count + category.products.length, 0);
  const featuredProducts = PRODUCT_CATEGORIES.flatMap((category) =>
    category.products.map((product) => ({ category, product }))
  ).slice(0, 3);

  return (
    <div className="min-h-screen w-full min-w-0 max-w-full bg-white">
      <section
        className="relative w-full min-w-0 max-w-full overflow-hidden border-b border-slate-200 bg-slate-950 pt-12 sm:pt-14 md:pt-[4.5rem]"
        data-reveal
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/02/25/14/68/360_F_225146875_pHG2NHqEtgRUNcvTOAWKmIn8DrW2wHVb.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031a43]/28 via-[#0b2f6f]/22 to-[#102f57]/26"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.1),transparent_38%)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950/12 to-transparent"></div>

        <div className="relative z-10 w-full max-w-full min-w-0 px-3 sm:px-5 md:px-8 py-2 sm:py-4 md:py-6">
          <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col items-center gap-3 text-center sm:gap-4 md:max-w-5xl md:gap-5">
            <div className="w-full max-w-[min(100%,260px)] shrink-0 sm:max-w-[280px]">
              <div className="rounded-2xl border border-white/30 bg-white/95 p-2 shadow-[0_20px_50px_-24px_rgba(2,8,23,0.75)]">
                <img
                  src="/nyc-certified-mbe.png"
                  alt="Certified NYC Minority Business Enterprise"
                  className="w-full rounded-xl object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            <h1 className="w-full max-w-3xl text-balance text-base font-bold leading-snug tracking-tight text-white [text-shadow:0_2px_24px_rgba(2,8,23,0.65)] sm:text-lg md:text-[1.15rem] lg:text-[1.3rem]">
              Bulk Procurement Experts for Critical Operations
            </h1>
            <div className="flex w-full max-w-lg flex-col items-center gap-2 sm:max-w-2xl sm:flex-row sm:justify-center sm:gap-3">
              <Link
                to="/sourcing"
                className="group relative flex min-h-[2.85rem] w-full min-w-0 max-w-md items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-sky-500 via-blue-600 to-blue-800 px-2 py-2 font-display shadow-[0_8px_28px_-8px_rgba(37,99,235,0.5)] ring-1 ring-sky-200/35 transition duration-200 [text-shadow:0_1px_10px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:min-h-[3.25rem] sm:flex-1 sm:rounded-xl sm:px-4 sm:py-3.5 sm:shadow-[0_14px_44px_-10px_rgba(37,99,235,0.55)] sm:ring-sky-200/40 sm:hover:shadow-[0_18px_52px_-10px_rgba(37,99,235,0.62)] md:max-w-xs"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/25 text-white sm:h-11 sm:rounded-lg sm:w-11"
                  aria-hidden
                >
                  <ClipboardPlus className="h-[15px] w-[15px] sm:h-5 sm:w-5" strokeWidth={2.25} />
                </span>
                <span className="min-w-0 flex-1 text-center">
                  <span className="block text-[9px] font-bold uppercase leading-tight tracking-wide text-white sm:text-sm">
                    Start new request
                  </span>
                  <span className="mt-px block text-[7px] font-semibold uppercase leading-snug tracking-wide text-white/90 sm:mt-0.5 sm:text-[10px]">
                    Quote &amp; custom sourcing
                  </span>
                </span>
                <ArrowRight
                  className="h-3 w-3 shrink-0 text-white/90 transition duration-200 group-hover:translate-x-0.5 sm:h-4 sm:w-4 sm:group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link
                to="/catalog"
                className="group flex min-h-[2.85rem] w-full min-w-0 max-w-md items-center justify-center gap-2 rounded-lg border border-white/45 bg-slate-950/40 px-2 py-2 font-display shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition duration-200 hover:border-sky-200/55 hover:bg-slate-900/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 sm:min-h-[3.25rem] sm:flex-1 sm:rounded-xl sm:border-2 sm:px-4 sm:py-3.5 md:max-w-xs"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-sky-300/35 bg-sky-500/15 text-sky-200 sm:h-11 sm:rounded-lg sm:w-11"
                  aria-hidden
                >
                  <LayoutGrid className="h-[15px] w-[15px] sm:h-5 sm:w-5" strokeWidth={2.25} />
                </span>
                <span className="min-w-0 flex-1 text-center">
                  <span className="block text-[9px] font-bold uppercase leading-tight tracking-wide text-white [text-shadow:0_1px_14px_rgba(2,8,23,0.5)] sm:text-sm">
                    Browse catalog
                  </span>
                  <span className="mt-px block text-[7px] font-semibold uppercase leading-snug tracking-wider text-sky-100/95 sm:mt-0.5 sm:text-[10px]">
                    Categories &amp; quote-ready SKUs
                  </span>
                </span>
                <ArrowRight
                  className="h-3 w-3 shrink-0 text-sky-200 transition duration-200 group-hover:translate-x-0.5 sm:h-4 sm:w-4 sm:group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-w-0 max-w-full border-b border-slate-200 bg-concrete px-3 sm:px-5 md:px-8 py-5 sm:py-6 md:py-7" data-reveal>
        <div className="mx-auto grid w-full min-w-0 max-w-6xl grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
          <div className="bg-white border border-slate-200 rounded-md sm:rounded-lg md:rounded-xl p-1.5 sm:p-3 md:p-3.5 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 md:gap-3 shadow-sm text-center sm:text-left" data-reveal data-reveal-delay="40ms">
            <Boxes className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-industrial-orange" />
            <div>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black leading-none">{totalProducts}+</p>
              <p className="text-[7px] sm:text-[10px] md:text-xs uppercase font-bold tracking-wide text-gray-500">Quote-Ready SKUs</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-md sm:rounded-lg md:rounded-xl p-1.5 sm:p-3 md:p-3.5 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 md:gap-3 shadow-sm text-center sm:text-left" data-reveal data-reveal-delay="110ms">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-industrial-orange" />
            <div>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black leading-none">{PRODUCT_CATEGORIES.length}+</p>
              <p className="text-[7px] sm:text-[10px] md:text-xs uppercase font-bold tracking-wide text-gray-500">Supply Categories</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-md sm:rounded-lg md:rounded-xl p-1.5 sm:p-3 md:p-3.5 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 md:gap-3 shadow-sm text-center sm:text-left" data-reveal data-reveal-delay="180ms">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-industrial-orange" />
            <div>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black leading-none">24–48 HR</p>
              <p className="text-[7px] sm:text-[10px] md:text-xs uppercase font-bold tracking-wide text-gray-500">Typical quote turnaround</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-w-0 max-w-full border-b border-slate-200 px-2.5 py-4 sm:px-5 sm:py-7 md:px-8 md:py-8" data-reveal>
        <div className="mx-auto w-full min-w-0 max-w-6xl">
          <h2 className="text-base font-black uppercase tracking-tight text-slate-900 sm:text-xl md:text-2xl">
            Quick Access
          </h2>
          <p className="mt-0.5 max-w-xl text-[10px] font-medium leading-snug text-slate-600 sm:mt-1.5 sm:text-sm">
            Featured SKUs; the fourth tile opens the full product catalog.
          </p>
          <div className="mt-2 sm:mt-4 md:mt-5" data-reveal data-reveal-delay="80ms">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-2 md:gap-2.5">
              {featuredProducts.map(({ category, product }) => (
                <article
                  key={`${category.id}-${product.id}`}
                  className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm sm:rounded-lg md:rounded-lg"
                >
                  <div className="h-14 shrink-0 bg-slate-100 sm:aspect-[5/3] sm:h-auto sm:min-h-0">
                    <img
                      src={getProductImage(product, category)}
                      alt={`${product.name} in ${category.name}`}
                      className="h-full w-full object-contain p-0.5 sm:object-cover sm:p-0"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                      }}
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col px-1 py-1 sm:p-2">
                    <p className="text-[7px] font-bold uppercase tracking-wide text-slate-500 sm:text-[9px] sm:tracking-wider">
                      {category.name}
                    </p>
                    <h3 className="mt-px line-clamp-2 text-[8px] font-black uppercase leading-tight text-slate-900 sm:mt-0.5 sm:text-[11px] sm:leading-snug">
                      {product.name}
                    </h3>
                  </div>
                </article>
              ))}
              <Link
                to="/catalog"
                className="group flex min-h-0 min-w-0 flex-col overflow-hidden rounded-md border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/90 shadow-sm ring-1 ring-inset ring-slate-200/80 transition hover:border-industrial-orange/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-industrial-orange sm:rounded-lg md:rounded-lg"
              >
                <div className="flex h-11 shrink-0 items-center justify-center bg-slate-200/60 sm:aspect-[5/3] sm:h-auto sm:min-h-0">
                  <LayoutGrid
                    className="h-5 w-5 text-industrial-orange transition-transform group-hover:scale-105 sm:h-8 sm:w-8"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                <div className="flex min-h-0 flex-1 flex-col justify-center px-1 py-1 sm:p-2">
                  <p className="text-[7px] font-bold uppercase tracking-wide text-slate-500 sm:text-[9px] sm:tracking-wider">
                    Full catalog
                  </p>
                  <p className="mt-px line-clamp-3 text-[8px] font-black uppercase leading-tight text-slate-900 sm:mt-0.5 sm:line-clamp-none sm:text-[11px] sm:leading-snug">
                    Click here to view all our products
                  </p>
                  <span className="mt-px inline-flex items-center gap-0.5 text-[7px] font-black uppercase text-industrial-orange sm:mt-1 sm:text-[10px]">
                    Open
                    <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5 sm:h-3 sm:w-3" aria-hidden />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="w-full min-w-0 max-w-full border-b border-slate-200 bg-concrete px-3 py-5 sm:px-5 sm:py-6 md:px-8 md:py-8"
        data-reveal
      >
        <div className="mx-auto w-full min-w-0 max-w-6xl">
          <h2 className="text-base font-black uppercase tracking-tight text-slate-900 sm:text-lg md:text-xl">
            About Forez Corp
          </h2>
          <p className="mt-1 max-w-2xl text-[11px] font-medium leading-relaxed text-slate-600 sm:mt-1.5 sm:text-xs md:text-sm">
            Certified industrial supply partner for bulk orders, complex sourcing, and time-sensitive operations.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-6 lg:gap-7">
            <div className="min-w-0 space-y-2.5 text-xs font-medium leading-relaxed text-slate-700 sm:text-sm">
              <p>
                Forez Corp focuses on bulk procurement and mission-critical supply with quote-ready SKUs, custom sourcing,
                and documentation that meets public and enterprise procurement standards.
              </p>
              <p>
                From NYC MBE certification to nationwide fulfillment support, we align inventory, logistics, and compliance
                so your operations stay supplied without friction.
              </p>
            </div>
            <aside className="min-w-0 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4 md:self-start md:p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">At a glance</p>
              <ul className="mt-2.5 space-y-2 text-[10px] font-bold uppercase tracking-wide text-slate-700 sm:mt-3 sm:space-y-2.5 sm:text-xs">
                <li className="flex gap-2">
                  <span className="text-industrial-orange" aria-hidden>
                    —
                  </span>
                  <span>NYC certified MBE</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-industrial-orange" aria-hidden>
                    —
                  </span>
                  <span>Bulk quotes &amp; custom sourcing</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-industrial-orange" aria-hidden>
                    —
                  </span>
                  <span>NYS / NYC &amp; national programs</span>
                </li>
              </ul>
              <Link
                to="/about"
                className="group mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase text-industrial-orange transition-colors hover:text-blue-700 sm:mt-4"
              >
                Full credentials &amp; story
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

