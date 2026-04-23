import { Link } from 'react-router-dom';
import { Hash, Truck, Bell, Phone, CheckCircle2, ArrowRight, PackageSearch } from 'lucide-react';
import { useSEO } from '../lib/useSEO';

const STEPS = [
  {
    icon: Hash,
    step: '01',
    title: 'Receive Your Order Number',
    description:
      'Once your order is confirmed and payment or purchase order terms are agreed upon, our team will issue you a unique Order Number (e.g. FZ-2026-00142). This number identifies your order in our system and should be referenced in all communication with our team.',
  },
  {
    icon: Truck,
    step: '02',
    title: 'Receive Your Tracking Number',
    description:
      'As soon as your order ships, we will provide you with a Tracking Number issued by the carrier (UPS, FedEx, or freight forwarder depending on shipment size). This number lets you follow your shipment in real time on the carrier\'s website.',
  },
  {
    icon: PackageSearch,
    step: '03',
    title: 'Track Your Shipment',
    description:
      'Enter your Tracking Number directly on the carrier\'s tracking portal to see live status updates — including dispatch, in-transit checkpoints, out-for-delivery notifications, and delivery confirmation.',
  },
  {
    icon: Bell,
    step: '04',
    title: 'Stay Updated',
    description:
      'Our team proactively monitors fulfillment status and will reach out if there are any delays, partial shipments, or items requiring substitution. You can also contact us directly with your Order Number for a manual status update at any time.',
  },
];

const CARRIERS = [
  { name: 'UPS', portal: 'ups.com/track' },
  { name: 'FedEx', portal: 'fedex.com/tracking' },
  { name: 'Freight / LTL', portal: 'Carrier-specific portal — provided with your tracking number' },
];

const NOTES = [
  'Your Order Number is issued upon order confirmation',
  'Tracking Number is sent via email once the shipment leaves our facility',
  'Large or freight orders may ship in multiple stages — each with its own tracking number',
  'Contact us with your Order Number for any status query or issue',
  'Partial shipments are communicated proactively by our team',
  'For public-sector orders, delivery documentation is available upon request',
];

export default function HowToTrack() {
  useSEO({
    title: 'How to Track Your Order — Order & Tracking Numbers',
    description: 'Find out how to track your Forez order. Every order receives a unique Order Number and carrier Tracking Number for real-time shipment monitoring.',
    path: '/how-to-track',
    keywords: 'track industrial order, order tracking number, shipment tracking industrial supply',
    breadcrumbs: [{ name: 'Help & Support', path: '/shipping' }, { name: 'How to Track', path: '/how-to-track' }],
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
            How to Track Your Order
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
            Every order placed with Forez is assigned a unique Order Number and a carrier Tracking Number so you always know where your shipment stands.
          </p>
        </div>
      </section>

      {/* Order + Tracking number explainer */}
      <section className="px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950">
                <Hash className="h-5 w-5 text-white" aria-hidden />
              </div>
              <h2 className="font-display text-base font-black uppercase tracking-wide text-slate-900 sm:text-lg">
                Order Number
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                A unique internal reference (e.g. <span className="font-black text-slate-800">FZ-2026-00142</span>) issued by Forez at order confirmation. Use this number when contacting our team about your order status, changes, or documentation.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-industrial-orange">
                <Truck className="h-5 w-5 text-white" aria-hidden />
              </div>
              <h2 className="font-display text-base font-black uppercase tracking-wide text-slate-900 sm:text-lg">
                Tracking Number
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                A carrier-issued number sent to you via email once your order ships. Enter it on the carrier's tracking portal for real-time shipment status, estimated delivery date, and delivery confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-slate-100 bg-white px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 sm:text-xs">Step by Step</p>
          <div className="space-y-5">
            {STEPS.map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:gap-6 sm:p-6">
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-[11px] font-black text-white sm:h-11 sm:w-11">
                    {step}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-industrial-orange/10">
                    <Icon className="h-4 w-4 text-industrial-orange" aria-hidden />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-display text-base font-black uppercase tracking-wide text-slate-900 sm:text-lg">
                    {title}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carriers */}
      <section className="border-t border-slate-100 bg-slate-50 px-5 py-10 sm:px-8 sm:py-12 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 sm:text-xs">Carrier Portals</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CARRIERS.map((c) => (
              <div key={c.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wide text-slate-900">{c.name}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{c.portal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section className="border-t border-slate-100 bg-white px-5 py-10 sm:px-8 sm:py-12 md:px-10">
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-950 px-5 py-3">
              <Phone className="h-4 w-4 text-industrial-orange shrink-0" aria-hidden />
              <span className="text-xs font-black uppercase tracking-wide text-white">+1 (516) 860-2513</span>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 px-5 py-3 text-xs font-black uppercase tracking-wide text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              Contact Our Team
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
