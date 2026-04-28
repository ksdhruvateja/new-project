import { useSEO } from '../lib/useSEO';

export default function TermsOfUse() {
  useSEO({
    title: 'Returns, Refunds & Warranty Policy — Forez',
    description:
      'Review Forez Corp policy terms for returns, refunds, warranty, NCNR items, international/export orders, domestic returns, and damaged shipment claims.',
    path: '/terms-of-use',
    keywords: 'returns policy, refunds policy, warranty policy, NCNR, RMA, Forez terms',
    breadcrumbs: [{ name: 'Returns, Refunds & Warranty Policy', path: '/terms-of-use' }],
  });

  return (
    <div className="min-h-screen bg-concrete px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-orange sm:text-xs">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
          Returns, Refunds &amp; Warranty Policy
        </h1>

        <div className="mt-6 space-y-6 text-sm font-medium leading-relaxed text-slate-600">
          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">General Policy</h2>
            <p className="mt-2">
              Unless otherwise stated in writing, most products sold by Forez Corp are considered non-cancellable and
              non-returnable (NCNR). Customers are responsible for carefully reviewing all specifications,
              compatibility, and requirements prior to purchase.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">
              International / Export Orders
            </h2>
            <p className="mt-2">
              All international and export sales are final and are not eligible for return or exchange. The only
              exception applies in cases where items are received defective or damaged upon arrival.
            </p>
            <p className="mt-2">
              Any such claims must be reported within three (3) calendar days of delivery and must include clear
              photographic evidence and a detailed description of the issue. Claims submitted after this period may not
              be accepted.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">Domestic Orders</h2>
            <p className="mt-2">
              Domestic returns may be accepted within three (3) calendar days of delivery, where applicable and subject
              to approval. Returned items must be unused, in original packaging, and accompanied by valid proof of
              purchase.
            </p>
            <p className="mt-2">
              All domestic returns require prior written Return Merchandise Authorization (RMA). Unauthorized returns
              will not be accepted.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">
              Non-Returnable Items
            </h2>
            <p className="mt-2">
              Customized, modified, or made-to-order products are strictly non-returnable and non-refundable under all
              circumstances.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">
              Damaged Shipments
            </h2>
            <p className="mt-2">
              If a product arrives with visible damage to packaging or shipment, the customer must note the damage on
              the carrier&apos;s delivery receipt or proof of delivery at the time of receipt. Failure to do so may impact
              the ability to file or support a carrier claim.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">Return Shipping</h2>
            <p className="mt-2">
              Unless otherwise agreed in writing, customers are responsible for return shipping costs. Forez Corp will
              only cover return shipping in cases where the product is confirmed to be defective or incorrectly
              fulfilled.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">Refund Process</h2>
            <p className="mt-2">
              Approved refunds are issued only after returned items have been received and inspected. Refunds will be
              processed to the original payment method only. Processing may take up to fifteen (15) business days,
              excluding additional time required by financial institutions.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">
              Warranty Disclaimer
            </h2>
            <p className="mt-2">
              Forez Corp does not provide any independent warranty unless explicitly stated in writing on the invoice.
              All products are otherwise covered solely under the original manufacturer&apos;s warranty, if applicable.
              Forez Corp makes no additional express or implied warranties beyond those stated on the invoice.
            </p>
            <p className="mt-2">
              Customers are responsible for reviewing and adhering to manufacturer warranty terms, as all warranty
              claims must be handled directly under the manufacturer&apos;s policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
