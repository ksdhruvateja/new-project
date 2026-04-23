import { useState } from 'react';
import { Truck, RefreshCw } from 'lucide-react';
import { useSEO } from '../lib/useSEO';

export default function Shipping() {
  useSEO({
    title: 'Shipping & Returns — Forez Fulfillment Policies',
    description: 'Learn about Forez shipping timelines, carrier options, and returns policy for industrial product orders.',
    path: '/shipping',
    keywords: 'industrial supply shipping, order fulfillment policy, returns policy industrial parts',
    breadcrumbs: [{ name: 'Shipping & Returns', path: '/shipping' }],
  });
  const [policyTab, setPolicyTab] = useState<'shipping' | 'returns'>('shipping');

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-steel text-white py-20 px-6 border-b-8 border-black">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-5">
            ForezCorp Shipping Information
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-400 uppercase max-w-3xl">
            Shipping, returns, and delivery policy details for domestic and international orders.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex border-2 border-black bg-black/5 mb-8">
            <button
              type="button"
              onClick={() => setPolicyTab('shipping')}
              className={`px-5 py-2 font-black uppercase tracking-wide transition-colors ${
                policyTab === 'shipping' ? 'bg-industrial-orange text-black' : 'text-black hover:bg-black/10'
              }`}
            >
              <span className="inline-flex items-center gap-2"><Truck className="w-4 h-4" />Shipping</span>
            </button>
            <button
              type="button"
              onClick={() => setPolicyTab('returns')}
              className={`px-5 py-2 font-black uppercase tracking-wide transition-colors ${
                policyTab === 'returns' ? 'bg-industrial-orange text-black' : 'text-black hover:bg-black/10'
              }`}
            >
              <span className="inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" />Returns</span>
            </button>
          </div>

          {policyTab === 'shipping' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
              <div className="space-y-4 text-sm md:text-base font-semibold border-2 border-black p-6">
                <p className="text-black font-black uppercase">Shipping Carriers</p>
                <p>Primarily ships via UPS.</p>
                <p>International orders may use other carriers when provided by the customer.</p>

                <p className="text-black font-black uppercase pt-2">Delivery Options & Timeframes</p>
                <p>UPS Ground: about 5 business days.</p>
                <p>UPS 3-Day Select: about 3 business days.</p>
                <p>UPS 2nd Day Air: about 2 business days.</p>
                <p>UPS Next Day Air: about 1 business day.</p>
                <p>Orders should typically be placed before 10 AM PST (Mon-Fri) for these timelines.</p>
                <p className="text-industrial-orange">Alaska & Hawaii: add 1 extra day.</p>
              </div>

              <div className="space-y-4 text-sm md:text-base font-semibold border-2 border-black p-6">
                <p className="text-black font-black uppercase">Order Processing & Dispatch</p>
                <p>Orders may ship same day if placed early enough.</p>
                <p>Otherwise, processing can take up to 3 business days.</p>
                <p>Orders before about 11 AM PST have a higher chance of same-day shipping.</p>
                <p>Orders after about 2 PM PST may ship next day.</p>
                <p>UPS pickup cutoff is about 4 PM PST.</p>

                <p className="text-black font-black uppercase pt-2">International Shipping</p>
                <p>International shipping is available.</p>
                <p>You may need to provide your own carrier details.</p>
                <p>ForezCorp will confirm feasibility before shipment.</p>

                <p className="text-black font-black uppercase pt-2">Important Policies</p>
                <p>ForezCorp is not responsible for lost, damaged, or delivered-but-not-received shipments.</p>
                <p>Customers must contact the shipping carrier directly for shipping issues.</p>
                <p>Tracking updates can be delayed; wait a few days before escalating.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
              <div className="space-y-4 text-sm md:text-base font-semibold border-2 border-black p-6">
                <p className="text-black font-black uppercase">General Policy</p>
                <p>Most products are non-cancellable / non-returnable (NCNR).</p>
                <p>Customers are expected to review carefully before purchasing.</p>

                <p className="text-black font-black uppercase pt-2">International / Export Orders</p>
                <p>No returns or exchanges are allowed.</p>
                <p>Exception: only if item is defective or damaged on arrival.</p>
                <p>Claims must be reported within 3 days of delivery with photos and a description.</p>

                <p className="text-black font-black uppercase pt-2">Domestic Orders</p>
                <p>Returns are allowed within 3 days of delivery, when applicable.</p>
                <p>Items must be unused and in original packaging with proof of purchase.</p>
                <p>Return authorization is required before sending anything back.</p>
              </div>

              <div className="space-y-4 text-sm md:text-base font-semibold border-2 border-black p-6">
                <p className="text-black font-black uppercase">Non-Returnable Items</p>
                <p>Customized and made-to-order products are strictly non-returnable.</p>

                <p className="text-black font-black uppercase pt-2">Return Shipping</p>
                <p>Customer pays return shipping unless the item is confirmed defective.</p>

                <p className="text-black font-black uppercase pt-2">Refund Process</p>
                <p>Refunds are issued only after inspection and approval.</p>
                <p>Approved refunds go to the original payment method.</p>
                <p>Refund processing may take up to 15 business days plus bank processing time.</p>

                <p className="text-black font-black uppercase pt-2">Warranty</p>
                <p>1-year limited warranty covers manufacturing defects and normal-use failures.</p>
                <p>Warranty does not cover misuse, physical damage, unauthorized modifications, or improper installation/conditions.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
