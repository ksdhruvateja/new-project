import { Link } from 'react-router-dom';
import { Search, ShoppingCart, FileText, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSEO } from '../lib/useSEO';

const STEPS = [
  {
    icon: Search,
    step: '01',
    title: 'Browse the Catalog',
    description:
      'Start by exploring our product catalog. We carry bearings, power transmission components, couplings, belts, MRO supplies, and more. Use the category filters to narrow down exactly what you need.',
    cta: { label: 'Browse Catalog', to: '/catalog' },
  },
  {
    icon: ShoppingCart,
    step: '02',
    title: 'Add Items to Your Quote',
    description:
      'Once you find a product, click "Add to Quote" to queue it for your bulk quote request. You can add as many line items as needed — including custom or non-catalog items using our manual entry fields on the Sourcing page.',
    cta: { label: 'Go to Sourcing', to: '/sourcing' },
  },
  {
    icon: FileText,
    step: '03',
    title: 'Fill Out the Quote Form',
    description:
      'On the Sourcing page, review your line items and enter your contact details — name, company, email, and phone. Add any special notes, specifications, or application context that will help our team source the right product.',
    cta: null,
  },
  {
    icon: Mail,
    step: '04',
    title: 'Submit & Receive Your Quote',
    description:
      'Click "Send Quote Request" to submit directly to our procurement team at info@forezcorp.com. We typically respond within 24–48 business hours with a formal quote, availability confirmation, and lead time estimate.',
    cta: null,
  },
  {
    icon: CheckCircle2,
    step: '05',
    title: 'Confirm & Place Your Order',
    description:
      'Once you approve the quote, our team will confirm your order in writing and begin fulfillment. For public-sector or institutional buyers, we can provide compliance documentation, purchase order support, and MBE certification paperwork at this stage.',
    cta: null,
  },
];

const NOTES = [
  'No account or login required to request a quote',
  'Multi-line and mixed-product orders are fully supported',
  'Custom sourcing available for non-catalog or hard-to-find parts',
  'NYC Certified MBE — compliant with public-sector procurement programs',
  'NYS, NYC, and national institutional buyers welcome',
];

export default function HowToOrder() {
  useSEO({
    title: 'How to Order — Step-by-Step Ordering Guide',
    description: 'Learn how to place an order with Forez Corp. Browse our catalog, build a bulk quote, submit your request, and receive a formal quote within 24–48 hours.',
    path: '/how-to-order',
    keywords: 'how to order industrial parts, place industrial order, bulk order guide, submit procurement request',
    breadcrumbs: [{ name: 'Help & Support', path: '/shipping' }, { name: 'How to Order', path: '/how-to-order' }],
  });
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-950 px-5 py-12 sm:px-8 sm:py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">
            Help &amp; Support
          </p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            How to Order
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
            Ordering from Forez Corp is straightforward. Browse our catalog, build your quote, and our team handles the rest — from sourcing to delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/catalog"
              className="group inline-flex items-center gap-2 rounded-xl bg-industrial-orange px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5"
            >
              Browse Catalog
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              to="/sourcing"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-white/45"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-5 py-12 sm:px-8 sm:py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {STEPS.map(({ icon: Icon, step, title, description, cta }) => (
              <div key={step} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:gap-6 sm:p-6">
                {/* step number */}
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-[11px] font-black text-white sm:h-11 sm:w-11">
                    {step}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-industrial-orange/10">
                    <Icon className="h-4 w-4 text-industrial-orange" aria-hidden />
                  </div>
                </div>
                {/* content */}
                <div className="flex flex-col justify-center">
                  <h2 className="font-display text-base font-black uppercase tracking-wide text-slate-900 sm:text-lg">
                    {title}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-600">{description}</p>
                  {cta && (
                    <Link
                      to={cta.to}
                      className="group mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-black uppercase tracking-wide text-industrial-orange transition hover:underline"
                    >
                      {cta.label}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section className="border-t border-slate-100 bg-slate-50 px-5 py-10 sm:px-8 sm:py-12 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 sm:text-xs">Good to Know</p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {NOTES.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-industrial-orange/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-industrial-orange" />
                </div>
                <span className="text-sm font-semibold leading-snug text-slate-700">{note}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 px-5 py-3 text-xs font-black uppercase tracking-wide text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              Contact Our Team
            </Link>
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-5 py-3 text-xs font-black uppercase tracking-wide text-slate-600 transition hover:border-slate-500"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
