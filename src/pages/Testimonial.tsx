const testimonials = [
  // Transit & Infrastructure
  { name: 'Procurement Lead, Regional Transit Authority', role: 'Transit & Infrastructure', quote: 'Forez Corp helped us consolidate multiple hard-to-source components into one clean procurement cycle. Fast response and reliable fulfillment.' },
  { name: 'Fleet Maintenance Supervisor, Metro Transit Agency', role: 'Transit & Infrastructure', quote: 'We needed certified MBE suppliers for our diversity spend goals. Forez Corp met every compliance requirement and delivered on time — every time.' },
  { name: 'Capital Projects Buyer, Regional Rail Operator', role: 'Transit & Infrastructure', quote: 'Their team turned around a 47-line quote in under 24 hours. That kind of responsiveness is rare in industrial procurement.' },
  { name: 'Director of Supply Chain, Port Authority Contractor', role: 'Transit & Infrastructure', quote: 'Documentation for public contracts can be a headache. Forez Corp came prepared with everything we needed — MBE cert, COCs, packing slips. Seamless.' },
  // Power Generation
  { name: 'Maintenance Manager, Power Generation Site', role: 'Power Generation', quote: 'When lead times were tight, their sourcing team delivered practical alternatives and complete documentation that kept our maintenance schedule on track.' },
  { name: 'Reliability Engineer, Gas Turbine Facility', role: 'Power Generation', quote: 'We rely on Forez Corp for bearing replacements during planned outages. Their knowledge of OEM equivalents has saved us significant downtime costs.' },
  { name: 'Plant Maintenance Coordinator, Combined-Cycle Plant', role: 'Power Generation', quote: 'Hard-to-find shaft couplings on short notice — Forez Corp sourced them in 72 hours when our regular supplier quoted 6 weeks.' },
  { name: 'Procurement Specialist, Nuclear Support Contractor', role: 'Power Generation', quote: 'The quality of documentation they provide meets our strict traceability requirements. We have made them a preferred vendor.' },
  // Wastewater & Utilities
  { name: 'Operations Buyer, Industrial Facility', role: 'Wastewater & Utilities', quote: 'Their quote turnaround is consistently quick, and communication is clear from inquiry through delivery.' },
  { name: 'Maintenance Director, Municipal Water Authority', role: 'Wastewater & Utilities', quote: 'We needed a supplier who understands NYC agency procurement. Forez Corp knew exactly what we needed and had the certifications to back it up.' },
  { name: 'Mechanical Supervisor, Wastewater Treatment Plant', role: 'Wastewater & Utilities', quote: 'Solid, consistent service. We have used them for MRO restocking for over two years now and they have never missed a commitment.' },
  { name: 'Facilities Procurement Lead, Public Utility', role: 'Wastewater & Utilities', quote: 'Their ability to handle multi-line MRO orders across multiple product categories is exactly what our operation needs.' },
  // HVAC & Facilities
  { name: 'HVAC Contractor, Commercial Property Management', role: 'HVAC & Facilities', quote: 'Fast shipping and the right parts the first time. We switched to Forez Corp after too many delays with our previous supplier.' },
  { name: 'Facilities Manager, Large Healthcare Campus', role: 'HVAC & Facilities', quote: 'Critical equipment means we can not wait. Forez Corp has consistently delivered within tight windows for our facility maintenance team.' },
  { name: 'Mechanical Engineer, Building Systems Firm', role: 'HVAC & Facilities', quote: 'They sourced a specialty coupling for a rooftop unit that three other distributors told us was unavailable. Genuinely impressed.' },
  { name: 'Purchasing Agent, Property Management Group', role: 'HVAC & Facilities', quote: 'Competitive pricing, real communication, and no surprise lead times. A refreshing change from the larger distributors.' },
  // Manufacturing & MRO
  { name: 'Production Manager, Metal Fabrication Shop', role: 'Manufacturing & MRO', quote: 'We run lean — downtime is not an option. Forez Corp keeps our critical spares stocked and our line running.' },
  { name: 'Maintenance Planner, Consumer Goods Manufacturer', role: 'Manufacturing & MRO', quote: 'Their custom sourcing handled an entire belt and drive replacement project for our conveyor system. Great value, no issues.' },
  { name: 'Engineering Buyer, Precision Parts Manufacturer', role: 'Manufacturing & MRO', quote: 'We needed exact OEM spec bearings with full certifications. Forez Corp sourced and delivered within two days. Exceptional.' },
  { name: 'Inventory Manager, Distribution Warehouse', role: 'Manufacturing & MRO', quote: 'We consolidated our MRO sourcing to Forez Corp for simplicity. Single point of contact, clean invoicing, reliable delivery.' },
  { name: 'Plant Engineer, Food Processing Facility', role: 'Manufacturing & MRO', quote: 'Forez Corp understands the urgency of food production environments. They have never let us down on a critical call.' },
  // Airport & Baggage Handling
  { name: 'Technical Supervisor, Airport Ground Systems', role: 'Airport & Baggage Handling', quote: 'Baggage system downtime costs airlines thousands per minute. Forez Corp is one of the few suppliers who truly understands that urgency.' },
  { name: 'Procurement Coordinator, Airport Maintenance Contractor', role: 'Airport & Baggage Handling', quote: 'They had NSK bearings for our conveyor drives in stock and shipped same-day. That kind of availability is what we need.' },
  { name: 'Operations Lead, Terminal Facilities Group', role: 'Airport & Baggage Handling', quote: 'Reliable, certified, and fast. Those three words describe every order we have placed with Forez Corp.' },
  // General Positive
  { name: 'Buyer, Industrial Services Company', role: 'Industrial Services', quote: 'I have worked with a lot of distributors. Forez Corp is one of the few that actually follows through on every commitment.' },
  { name: 'Supply Chain Analyst, Engineering Firm', role: 'Engineering', quote: 'Transparent pricing, accurate lead times, and a team that actually knows the products. Highly recommended.' },
  { name: 'Project Manager, Mechanical Contractor', role: 'Mechanical Contracting', quote: 'We use Forez Corp for multi-site projects. Their ability to coordinate deliveries across locations saves us real time.' },
  { name: 'Operations Director, Mid-Size Industrial Company', role: 'Industrial Operations', quote: 'From first inquiry to delivery confirmation, everything is handled professionally. This is how industrial supply should work.' },
  { name: 'Senior Buyer, Government Contracting Firm', role: 'Government Contracting', quote: 'Their MBE status and documentation capabilities make them invaluable to our compliance-heavy procurement process.' },
  { name: 'Maintenance Supervisor, Chemical Processing Plant', role: 'Chemical Processing', quote: 'Forez Corp sourced specialty couplings with material certifications required for our plant environment. Outstanding service.' },
  { name: 'Regional Facilities Director, Healthcare Network', role: 'Healthcare Facilities', quote: 'Multi-facility orders, tight delivery windows, and regulatory requirements — Forez Corp handles it all without missing a beat.' },
];

const ROLES = ['All', ...Array.from(new Set(testimonials.map((t) => t.role)))];

import { useState } from 'react';

export default function Testimonial() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? testimonials : testimonials.filter((t) => t.role === active);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-950 px-5 py-12 sm:px-8 sm:py-14 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-orange sm:text-xs">Company Info</p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Testimonials
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
            Feedback from organizations across transit, power generation, utilities, manufacturing, and more.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-0 z-10 border-b border-slate-200 bg-white px-5 py-3 sm:px-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setActive(role)}
                className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide transition sm:text-xs ${
                  active === role
                    ? 'border-industrial-orange bg-industrial-orange text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="px-5 py-10 sm:px-8 sm:py-12 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.name} className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="flex-grow text-sm font-medium leading-relaxed text-slate-700">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-4 border-t border-slate-200 pt-3">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-800">{item.name}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-industrial-orange">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-xs font-semibold text-slate-400">{filtered.length} testimonial{filtered.length !== 1 ? 's' : ''} shown</p>
        </div>
      </section>
    </div>
  );
}
