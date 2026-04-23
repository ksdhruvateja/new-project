import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_CATEGORIES = [
  {
    category: 'Ordering & Quotes',
    items: [
      {
        q: 'How do I request a bulk quote?',
        a: 'Navigate to our Sourcing page, add products from the catalog or enter custom items manually, then fill in your contact details and submit. Our procurement team reviews every request and typically responds with a formal quote within 24–48 business hours. For urgent requests, call us directly at +1 (516) 860-2513.',
      },
      {
        q: 'Is there a minimum order quantity?',
        a: 'We specialize in bulk and multi-line orders but we accommodate all order sizes. For smaller orders, our team will advise on the most cost-effective approach. There is no hard minimum — just submit your request and we will work with you.',
      },
      {
        q: 'Can I submit a purchase order (PO)?',
        a: 'Yes. We accept purchase orders from government agencies, municipalities, utilities, and established businesses. Once we issue a quote and you approve it, you can submit your PO and we will confirm against it before fulfillment begins.',
      },
      {
        q: 'How long does it take to receive a quote?',
        a: 'Standard turnaround is 24–48 business hours. Complex multi-line requests or items requiring overseas sourcing may take slightly longer, in which case we will communicate an updated timeline proactively.',
      },
      {
        q: 'Can I request a quote for items in multiple categories?',
        a: 'Absolutely. Our Sourcing page supports unlimited line items across categories — bearings, belts, couplings, MRO, HVAC components, and more — all in a single request. Multi-line sourcing is one of our core capabilities.',
      },
    ],
  },
  {
    category: 'Products & Sourcing',
    items: [
      {
        q: 'Can you source products not listed in the catalog?',
        a: 'Yes. Our custom sourcing process is designed for exactly this scenario. Provide us with part numbers, specifications, application details, or even a sample description and our team will identify the right product or a qualified equivalent. We work with a wide network of OEM and aftermarket suppliers.',
      },
      {
        q: 'Do you carry OEM parts or aftermarket equivalents?',
        a: 'We carry both. Where OEM availability is limited or lead times are excessive, we can propose aftermarket equivalents from trusted manufacturers such as SKF, Timken, NSK, Gates, and others — all with full spec transparency.',
      },
      {
        q: 'What brands do you distribute?',
        a: 'We work with leading manufacturers including SKF, Timken, NSK, NTN, Dodge, Browning, Baldor, Gates, Rexnord, Lovejoy, Martin, Falk, TB Woods, Link-Belt, Morse, Bando, Renold, and Diamond, among others. If a specific brand is required, let us know in your quote request.',
      },
      {
        q: 'Can you source hard-to-find or obsolete parts?',
        a: 'Yes. We have experience sourcing discontinued and low-availability parts for legacy equipment in power generation, transit, and industrial facilities. Provide as much detail as possible — dimensions, application, original manufacturer — and our team will research availability.',
      },
      {
        q: 'Do you offer product substitution recommendations?',
        a: 'Yes. When a specified part is unavailable or on extended backorder, our sourcing team proactively recommends qualified substitutes with equivalent performance ratings, backed by documentation for approval.',
      },
    ],
  },
  {
    category: 'Shipping & Fulfillment',
    items: [
      {
        q: 'How can I track my order?',
        a: 'After your order is confirmed, we issue a unique Order Number (e.g. FZ-2026-00142). Once shipped, you will receive a carrier Tracking Number via your primary contact method. You can use this to monitor your shipment in real time on the carrier portal (UPS, FedEx, or freight provider).',
      },
      {
        q: 'What carriers do you ship with?',
        a: 'We ship via UPS and FedEx for standard orders. For large or heavy freight shipments, we use LTL freight carriers and will provide carrier and tracking details specific to that shipment.',
      },
      {
        q: 'Do you ship nationwide?',
        a: 'Yes. While we are headquartered in Ronkonkoma, NY, we fulfill orders across the continental United States. We also support regional same-day or next-day arrangements for local customers in the New York metro area.',
      },
      {
        q: 'Can you handle partial shipments?',
        a: 'Yes. For large multi-line orders where certain items are available sooner, we can arrange partial shipments to keep your project moving. We will communicate each shipment separately with its own tracking number.',
      },
    ],
  },
  {
    category: 'Public Sector & Compliance',
    items: [
      {
        q: 'Do you support public-sector procurement requirements?',
        a: 'Yes. As a NYC Certified Minority Business Enterprise (MBE), we are fully equipped to support public-sector procurement workflows including NYS OGS, NYC Agency purchasing, and other institutional programs. We provide all required compliance documentation with your order.',
      },
      {
        q: 'Are you MBE certified?',
        a: 'Yes. Forez is a certified NYC Minority Business Enterprise (MBE). This certification supports agency diversity spend goals and allows us to participate in set-aside and preference programs across New York City and State procurement.',
      },
      {
        q: 'Can you provide documentation for government orders?',
        a: 'Yes. We supply packing slips, certificates of conformance, material certifications, MBE certification documentation, and any other compliance paperwork required for your agency or institutional purchasing process.',
      },
      {
        q: 'Do you work with utilities and infrastructure operators?',
        a: 'Yes. We regularly serve power generation facilities, wastewater treatment plants, airport baggage handling systems, mass transit agencies, and HVAC/R contractors — all of which have stringent sourcing and documentation requirements that we are experienced in meeting.',
      },
    ],
  },
  {
    category: 'Account & Support',
    items: [
      {
        q: 'Do I need an account to place an order?',
        a: 'No account or login is required to submit a quote request. Simply use the Sourcing page, fill in your details, and our team will handle the rest.',
      },
      {
        q: 'How do I contact your team directly?',
        a: 'You can reach us by phone at +1 (516) 860-2513, by email at info@forezcorp.com, or through our Contact page. We are available during standard business hours and aim to respond to all inquiries within one business day.',
      },
      {
        q: 'What if I have a problem with my order?',
        a: 'Contact our team immediately with your Order Number and a description of the issue. We will review and resolve discrepancies, shortages, or quality concerns as quickly as possible. Customer satisfaction is our highest priority.',
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-xl border transition-colors duration-200 ${open ? 'border-industrial-orange/40 bg-white' : 'border-slate-200 bg-concrete'}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        aria-expanded={open}
      >
        <span className="text-sm font-black uppercase tracking-wide text-slate-900 sm:text-base">{q}</span>
        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 text-industrial-orange transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm font-medium leading-relaxed text-slate-600 sm:px-6 sm:pb-6">{a}</p>
        </div>
      </div>
    </div>
  );
}

import { useSEO } from '../lib/useSEO';

export default function FAQs() {
  useSEO({
    title: 'FAQs — Ordering, Sourcing & Fulfillment Questions',
    description: 'Answers to common questions about how to order from Forez, custom sourcing, shipping, public-sector procurement, MBE compliance, and more.',
    path: '/faqs',
    keywords: 'industrial supply FAQ, how to order bearings, MBE procurement questions, bulk sourcing FAQ, industrial distributor FAQ',
    breadcrumbs: [{ name: 'FAQs', path: '/faqs' }],
  });
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-950 px-5 py-12 sm:px-8 sm:py-14 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-orange sm:text-xs">Help &amp; Support</p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
            Everything you need to know about ordering, sourcing, shipping, and working with Forez.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
        <div className="mx-auto max-w-5xl space-y-10">
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.category}>
              <h2 className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">
                {cat.category}
              </h2>
              <div className="space-y-2.5">
                {cat.items.map((item) => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
