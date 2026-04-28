import { useSEO } from '../lib/useSEO';

const POLICY_INTRO =
  'This Shipping Policy governs the terms under which Forez Corp processes, ships, and delivers orders. By placing an order, the customer acknowledges and agrees to the terms outlined below.';

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: 'Shipping Carriers and Methods',
    body: [
      'Forez Corp primarily utilizes UPS for domestic shipments. Depending on order requirements, shipment size, weight, and destination, additional shipping methods may be used, including LTL (Less Than Truckload) freight carriers or other parcel services. For international shipments, alternative carriers may be used when specified by the customer or deemed necessary for delivery execution.',
    ],
  },
  {
    title: 'Delivery Services and Estimates',
    body: [
      'Where applicable, UPS service levels (including Ground, 3-Day Select, 2nd Day Air, and Next Day Air) may be used. Delivery timelines provided by carriers are estimates only and are not guaranteed. All transit times are subject to change based on carrier operations, weather conditions, customs processing, and other factors outside Forez Corp’s control. Shipments to Alaska and Hawaii may require additional transit time.',
    ],
  },
  {
    title: 'Order Processing and Dispatch',
    body: [
      'Order processing begins upon confirmation of payment and inventory availability. While Forez Corp may, at its discretion, ship orders the same day they are placed, standard processing may require up to three (3) business days. Orders submitted prior to approximately 11:00 AM PST (Monday–Friday) have a higher likelihood of same-day dispatch. Orders placed after approximately 2:00 PM PST are generally processed on the following business day. Carrier pickups typically occur around 4:00 PM PST, which may impact same-day shipping eligibility.',
    ],
  },
  {
    title: 'International Shipping',
    body: [
      'International shipping is available on a case-by-case basis. Certain international shipments may require the customer to provide preferred carrier information or additional documentation. Forez Corp reserves the right to review, approve, or decline international shipments at its sole discretion. All customs duties, taxes, and import fees are the responsibility of the customer unless otherwise agreed in writing.',
    ],
  },
  {
    title: 'Risk of Loss and Liability',
    body: [
      'All shipments are made under FOB origin terms unless otherwise stated in writing. Title and risk of loss transfer to the customer upon handoff of the shipment to the carrier. Forez Corp is not responsible for any loss, theft, damage, or misdelivery occurring during transit or after carrier confirmation of delivery. Customers are responsible for filing all claims directly with the shipping carrier.',
      'While responsibility for transit issues lies with the carrier once the shipment has been transferred, Forez Corp will make reasonable efforts to assist customers in resolving shipping-related issues, including providing documentation and supporting claim submissions where applicable.',
    ],
  },
  {
    title: 'Tracking and Delivery Issues',
    body: [
      'Tracking information is provided for convenience and may be subject to delays in updates by the carrier. Forez Corp does not guarantee real-time tracking accuracy. Customers are advised to allow reasonable time for tracking updates to reflect shipment progress before initiating support inquiries',
    ],
  },
];

export default function Shipping() {
  useSEO({
    title: 'Shipping Policy — Carriers, Delivery & International | Forez',
    description:
      'Forez Corp shipping policy: UPS and other carriers, delivery estimates, order processing, international shipping, risk of loss, tracking, and related terms.',
    path: '/shipping',
    keywords:
      'Forez shipping, UPS industrial orders, LTL freight, international shipping policy, FOB origin, order processing',
    breadcrumbs: [{ name: 'Shipping', path: '/shipping' }],
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b-4 border-black bg-steel py-12 px-5 text-white sm:px-8 md:py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl">
            Shipping
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-blue-100/90 sm:text-base">
            Carriers, delivery, processing, and liability
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 md:px-10 md:py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{POLICY_INTRO}</p>

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

          <div>
            <h2 className="border-b-2 border-slate-900 pb-2 font-display text-lg font-black uppercase tracking-tight text-slate-900 sm:text-xl">
              Returns, Refunds &amp; Warranty Policy
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              Return, Refund, and Warranty terms are set out in our Terms of Use. For questions about a specific order,
              contact Forez Corp directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
