import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Boxes,
  ClipboardPlus,
  Clock,
  LayoutGrid,
  Truck,
  Search,
  Plane,
  Zap,
  Droplets,
  Wind,
  Factory,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { FALLBACK_PRODUCT_IMAGE, PRODUCT_CATEGORIES, getCategoryPreviewImage } from '../constants';

const SERVICES = [
  {
    Icon: ClipboardPlus,
    title: 'Bulk Procurement',
    desc: 'Submit a single quote request across multiple product lines. We source, consolidate, and fulfill — reducing vendor overhead and saving procurement time.',
    cta: 'Request a Quote',
    href: '/sourcing',
    iconBg: 'bg-industrial-orange',
    border: 'hover:border-industrial-orange/40',
  },
  {
    Icon: Search,
    title: 'Custom Sourcing',
    desc: "Can't find it in the catalog? Our team tracks down hard-to-find and specialty parts through our certified manufacturer network — no matter the spec.",
    cta: 'Start Sourcing',
    href: '/sourcing',
    iconBg: 'bg-engineering-blue',
    border: 'hover:border-engineering-blue/40',
  },
  {
    Icon: Truck,
    title: 'Rapid Fulfillment',
    desc: 'Quotes turned around in 24–48 hours. MRO-ready inventory with documentation that meets public-sector and enterprise procurement standards.',
    cta: 'Shipping Info',
    href: '/shipping',
    iconBg: 'bg-slate-800',
    border: 'hover:border-slate-400/50',
  },
];

const INDUSTRIES = [
  { Icon: Plane, label: 'Airports & Baggage Handling' },
  { Icon: Zap, label: 'Power Generation' },
  { Icon: Droplets, label: 'Wastewater Treatment' },
  { Icon: Wind, label: 'HVAC & Refrigeration' },
  { Icon: Factory, label: 'Manufacturing & MRO' },
  { Icon: Building2, label: 'Mass Transit & Infrastructure' },
];

const FEATURED_BRANDS = [
  'SKF', 'Timken', 'NSK', 'NTN', 'Dodge', 'Browning',
  'Baldor', 'Gates', 'Rexnord', 'Lovejoy', 'Martin', 'Falk',
  'TB Woods', 'Link-Belt', 'Morse', 'Bando', 'Renold', 'Diamond',
];

const GLANCE_ITEMS = [
  'NYC Certified Minority Business Enterprise (MBE)',
  'Bulk quotes & multi-line custom sourcing',
  'NYS / NYC & national procurement programs',
  '24–48 hour quote turnaround standard',
  'Compliant documentation for public-sector orders',
  '20+ product lines — bearings, drives, couplings & more',
];

const FEATURED_CATEGORIES = PRODUCT_CATEGORIES.slice(0, 6);

export default function Home() {
  const totalProducts = PRODUCT_CATEGORIES.reduce((count, cat) => count + cat.products.length, 0);

  return (
    <div className="w-full bg-white font-sans">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[52vh] w-full items-center overflow-hidden bg-slate-950 md:min-h-[58vh]">
        {/* bg image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/02/25/14/68/360_F_225146875_pHG2NHqEtgRUNcvTOAWKmIn8DrW2wHVb.jpg')" }}
          aria-hidden
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-slate-950/55" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-transparent" aria-hidden />

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
          <div className="flex max-w-2xl flex-col gap-6 lg:max-w-3xl">

            {/* eyebrow + MBE badge row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-industrial-orange/50 bg-industrial-orange/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-industrial-orange">
                Industrial Supply · Ronkonkoma, NY
              </span>
              <div className="rounded-lg border border-white/15 bg-white/8 p-1 backdrop-blur-sm">
                <img
                  src="/nyc-certified-mbe.png"
                  alt="NYC Certified MBE"
                  className="h-10 w-auto rounded object-contain sm:h-12"
                  loading="eager"
                />
              </div>
            </div>

            {/* headline */}
            <div>
              <h1 className="font-display text-[2.6rem] font-black uppercase leading-[1.0] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Quality.{' '}
                <span className="text-industrial-orange">Speed.</span>
                <br />
                Reliability.
              </h1>
              <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
                Forez Corp is a certified MBE industrial distributor specializing in bulk procurement, custom sourcing, and rapid fulfillment of power transmission and MRO products.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/sourcing"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-industrial-orange px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_8px_28px_-6px_rgba(59,130,246,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgba(59,130,246,0.65)]"
              >
                Request a Bulk Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                to="/catalog"
                className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-white/25 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/8"
              >
                <LayoutGrid className="h-4 w-4" />
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <section className="w-full border-y border-slate-800 bg-slate-900">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-slate-700/60 px-5 sm:px-8 md:px-10">
          {[
            { Icon: Boxes, value: `${totalProducts}+`, label: 'Quote-Ready SKUs' },
            { Icon: Truck, value: '20+', label: 'Top Brands Sourced' },
            { Icon: Clock, value: '24–48 HR', label: 'Quote Turnaround' },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-5 text-center sm:flex-row sm:gap-4 sm:px-6 sm:py-6 sm:text-left md:px-10">
              <Icon className="h-5 w-5 shrink-0 text-industrial-orange sm:h-6 sm:w-6" />
              <div>
                <p className="text-xl font-black leading-none text-white sm:text-3xl">{value}</p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 sm:text-[10px]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────── */}
      <section className="w-full bg-white px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16" data-reveal>
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">What We Do</p>
          <h2 className="mb-8 font-display text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
            Three Ways We Deliver
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SERVICES.map(({ Icon, title, desc, cta, href, iconBg, border }) => (
              <div
                key={title}
                className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${border}`}
                data-reveal
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} text-white shadow`}>
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mb-3 font-display text-base font-black uppercase tracking-tight text-slate-900">{title}</h3>
                <p className="flex-1 text-sm font-medium leading-relaxed text-slate-500">{desc}</p>
                <Link
                  to={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase text-industrial-orange transition-colors hover:text-engineering-blue"
                >
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCT CATEGORIES ───────────────────────────── */}
      <section className="w-full bg-slate-50 px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">Product Lines</p>
              <h2 className="font-display text-xl font-black uppercase tracking-tight text-slate-900 sm:text-2xl">
                Featured Categories
              </h2>
              <p className="mt-1 max-w-xl text-[11px] font-medium leading-relaxed text-slate-500 sm:text-xs">
                Browse our most-requested product lines — all available for bulk quote.
              </p>
            </div>
            <Link
              to="/catalog"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              View All
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:gap-3">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.id}`}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={getCategoryPreviewImage(cat)}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                    }}
                  />
                </div>
                {/* overlay on hover */}
                <div className="absolute inset-0 bg-industrial-orange/0 transition-colors duration-300 group-hover:bg-industrial-orange/8" aria-hidden />
                <div className="flex items-center justify-between p-2 sm:p-2.5">
                  <div>
                    <p className="text-[9px] font-black uppercase leading-tight tracking-wide text-slate-900 sm:text-[11px]">{cat.name}</p>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-[8px] font-bold uppercase text-industrial-orange sm:text-[9px]">
                      View line <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 transition group-hover:border-industrial-orange/30 group-hover:bg-industrial-orange/8">
                    <ArrowRight className="h-2.5 w-2.5 text-slate-400 transition group-hover:text-industrial-orange" aria-hidden />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES SERVED ─────────────────────────────────────── */}
      <section className="w-full bg-slate-950 px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12" data-reveal>
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">Markets</p>
          <h2 className="mb-2 font-display text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            Industries We Serve
          </h2>
          <p className="mb-6 max-w-2xl text-xs font-medium leading-relaxed text-slate-400 sm:text-sm">
            From NYC infrastructure to national operations — our product lines and sourcing capabilities are built for the industries that can't afford downtime.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {INDUSTRIES.map(({ Icon, label }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-3 py-4 text-center transition hover:border-industrial-orange/30 hover:bg-white/8"
                data-reveal
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-industrial-orange ring-1 ring-white/10 transition group-hover:bg-industrial-orange group-hover:text-white group-hover:ring-industrial-orange">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <p className="text-[9px] font-bold uppercase leading-snug tracking-wide text-slate-300 sm:text-[11px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS WE SOURCE ──────────────────────────────────────── */}
      <section className="w-full overflow-hidden border-y border-slate-100 bg-white px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14" data-reveal>
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">Our Network</p>
          <h2 className="mb-3 font-display text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
            Brands We Source
          </h2>
          <p className="mb-10 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
            We represent and source from the world-class manufacturers that define industrial reliability — ensuring product authenticity, availability, and compliance.
          </p>
          {/* scrolling ticker */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
            <div className="flex overflow-hidden">
              <div className="animate-marquee-slow flex shrink-0 gap-3">
                {[...FEATURED_BRANDS, ...FEATURED_BRANDS].map((brand, i) => (
                  <span
                    key={`${brand}-${i}`}
                    className="inline-flex shrink-0 items-center rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-700 shadow-sm"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT FOREZ ───────────────────────────────────────────── */}
      <section className="w-full bg-slate-50 px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
            {/* left: copy */}
            <div className="flex flex-col justify-center">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">Our Company</p>
              <h2 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
                About Forez Corp
              </h2>
              <div className="space-y-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                <p>
                  Forez Corp is a leading distributor of bearings and industrial power transmission products serving New York and nationwide MRO markets. Our focus is on infrastructure-critical applications — including power generation, airport baggage handling, wastewater treatment, mass transit, and HVAC/R.
                </p>
                <p>
                  As a certified NYC Minority Business Enterprise, we bring compliance-ready documentation and procurement support to public agencies, utilities, and private enterprises operating under strict sourcing requirements.
                </p>
                <p className="font-semibold text-slate-800">
                  Our objective is simple: exceed your expectations — every order, every time.
                </p>
              </div>
              <Link
                to="/about"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl border-2 border-slate-900 px-5 py-3 text-xs font-black uppercase tracking-wide text-slate-900 transition hover:bg-slate-900 hover:text-white"
              >
                Full credentials &amp; story
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
            {/* right: image + checklist card */}
            <aside className="flex flex-col gap-5 md:self-start">
              {/* MBE logo */}
              <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-6 shadow-sm">
                <img
                  src="/nyc-certified-mbe.png"
                  alt="NYC Certified Minority Business Enterprise"
                  className="h-20 w-auto max-w-[160px] object-contain sm:h-24 md:h-28"
                />
              </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">At a Glance</p>
              <ul className="space-y-4">
                {GLANCE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-industrial-orange/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-industrial-orange" />
                    </div>
                    <span className="text-sm font-semibold leading-snug text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── QUOTE CTA BANNER ──────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14" data-reveal>
        {/* subtle bg texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.12),transparent_65%)]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-industrial-orange/30 bg-industrial-orange/10 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-industrial-orange" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-industrial-orange">Certified MBE · Nationwide Fulfillment</span>
              </div>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Ready to Get<br className="hidden sm:block" /> Supplied?
              </h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
                Submit a bulk quote request or browse the catalog — our team responds within 24 hours.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/sourcing"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-industrial-orange px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_8px_28px_-6px_rgba(59,130,246,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgba(59,130,246,0.65)]"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-white/20 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:border-white/40 hover:bg-white/8"
              >
                <LayoutGrid className="h-4 w-4" />
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

