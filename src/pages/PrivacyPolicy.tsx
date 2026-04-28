import { useSEO } from '../lib/useSEO';

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: 'General Policy',
    body: [
      'Unless otherwise stated in writing, most products sold by Forez Corp are considered non-cancellable and non-returnable (NCNR). Customers are responsible for carefully reviewing all specifications, compatibility, and requirements prior to purchase.',
    ],
  },
  {
    title: 'International / Export Orders',
    body: [
      'All international and export sales are final and are not eligible for return or exchange. The only exception applies in cases where items are received defective or damaged upon arrival.',
      'Any such claims must be reported within three (3) calendar days of delivery and must include clear photographic evidence and a detailed description of the issue. Claims submitted after this period may not be accepted.',
    ],
  },
  {
    title: 'Domestic Orders',
    body: [
      'Domestic returns may be accepted within three (3) calendar days of delivery, where applicable and subject to approval. Returned items must be unused, in original packaging, and accompanied by valid proof of purchase.',
      'All domestic returns require prior written Return Merchandise Authorization (RMA). Unauthorized returns will not be accepted.',
    ],
  },
  {
    title: 'Non-Returnable Items',
    body: [
      'Customized, modified, or made-to-order products are strictly non-returnable and non-refundable under all circumstances.',
    ],
  },
  {
    title: 'Damaged Shipments',
    body: [
      'If a product arrives with visible damage to packaging or shipment, the customer must note the damage on the carrier’s delivery receipt or proof of delivery at the time of receipt. Failure to do so may impact the ability to file or support a carrier claim.',
    ],
  },
  {
    title: 'Return Shipping',
    body: [
      'Unless otherwise agreed in writing, customers are responsible for return shipping costs. Forez Corp will only cover return shipping in cases where the product is confirmed to be defective or incorrectly fulfilled.',
    ],
  },
  {
    title: 'Refund Process',
    body: [
      'Approved refunds are issued only after returned items have been received and inspected. Refunds will be processed to the original payment method only. Processing may take up to fifteen (15) business days, excluding additional time required by financial institutions.',
    ],
  },
  {
    title: 'Warranty Disclaimer',
    body: [
      'Forez Corp does not provide any independent warranty unless explicitly stated in writing on the invoice. All products are otherwise covered solely under the original manufacturer’s warranty, if applicable. Forez Corp makes no additional express or implied warranties beyond those stated on the invoice.',
      'Customers are responsible for reviewing and adhering to manufacturer warranty terms, as all warranty claims must be handled directly under the manufacturer’s policies.',
    ],
  },
];

export default function PrivacyPolicy() {
  useSEO({
    title: 'Policy — Returns, NCNR, RMA & Warranty | Forez Corp',
    description:
      'Forez Corp policy: NCNR terms, international and domestic returns, RMA, damaged shipments, refunds, and manufacturer warranty disclaimer.',
    path: '/privacy-policy',
    keywords:
      'Forez policy, NCNR returns, RMA industrial parts, international sales final, warranty disclaimer, damaged shipment claims',
    breadcrumbs: [{ name: 'Policy', path: '/privacy-policy' }],
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b-4 border-black bg-steel py-12 px-5 text-white sm:px-8 md:py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100 sm:text-xs">Legal</p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl">
            Policy
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-blue-100/90 sm:text-base">
            Returns, NCNR, RMA, refunds, and warranty
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 md:px-10 md:py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          {SECTIONS.map(({ title, body }) => (
            <div key={title}>
              <h2 className="border-b-2 border-slate-900 pb-2 font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">
                {title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                {body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
