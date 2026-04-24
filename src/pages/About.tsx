import { motion } from 'motion/react';
import { Verified, Ship, Landmark, ArrowRight, ShieldCheck, Globe, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../lib/useSEO';

export default function About() {
  useSEO({
    title: 'About Forez — NYC Certified MBE Industrial Distributor',
    description: 'Learn about Forez — a NYC Certified Minority Business Enterprise specializing in industrial distribution of bearings, power transmission, and MRO products for public and private sector clients.',
    path: '/about',
    keywords: 'about Forez, MBE certification, minority business enterprise New York, industrial distributor history',
    breadcrumbs: [{ name: 'About', path: '/about' }],
  });
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-steel text-white py-9 md:py-12 px-4 sm:px-6 border-b border-white/15">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl text-center text-2xl font-black uppercase leading-[1] tracking-tight sm:text-3xl md:text-4xl"
          >
            ABOUT US
          </motion.h1>
          <div className="mt-3 w-full max-w-4xl rounded-2xl border border-blue-300/35 bg-blue-600/90 p-5 sm:p-6 shadow-[0_16px_34px_-20px_rgba(30,64,175,0.9)]">
            <h2 className="text-sm sm:text-base font-black uppercase tracking-[0.18em] text-blue-100">Why Forez</h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base font-semibold leading-relaxed text-blue-50/95">
              We built Forez around eliminating risk. Our team knows bearings and power transmission — not just part numbers, but applications. We verify fitment before anything ships, respond fast, and turn orders around on tight timelines.
            </p>
            <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold leading-relaxed text-blue-50/95">
              As a certified MBE, we simplify diverse spend compliance without adding procurement friction.
            </p>
          </div>
        </div>
      </section>

      {/* At Forez Section */}
      <section className="py-12 md:py-16 px-5 sm:px-8 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-7 shadow-sm">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">Who We Are</h3>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-600">
              Forez is a trusted distributor of bearings and industrial power transmission products, serving customers across the country. We support maintenance, repair, and operations (MRO) needs with reliable products and responsive service.
            </p>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              Our work focuses on essential infrastructure and industries — including power generation, airport baggage systems, wastewater treatment, mass transit, OEM manufacturing, and HVAC/R. We understand how critical these operations are, which is why we prioritize consistency, speed, and accuracy in every order.
            </p>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              As a certified Minority Business Enterprise, we provide compliance-ready documentation and procurement support for public agencies, utilities, and private companies with strict sourcing requirements.
            </p>
            <p className="mt-3 text-base md:text-lg font-semibold leading-relaxed text-slate-700">
              At Forez, we keep things simple: deliver quality products, offer dependable service, and build long-term relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Our Mission Card */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-900 mb-3">Our Mission</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Deliver dependable industrial solutions that keep critical operations running smoothly. We are committed to providing high-quality products, responsive service, and practical support — so our customers can focus on uptime, not supply chains.
              </p>
            </div>

            {/* Our Vision Card */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-900 mb-3">Our Vision</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Be a trusted, long-term partner for businesses across industries — known for reliability, integrity, and consistent performance. We aim to grow alongside our customers and set the standard for service excellence in the MRO supply space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-10 md:py-12 px-3 sm:px-5 md:px-6 bg-concrete">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-300 pb-4">
            <Verified className="text-engineering-blue w-7 h-7" fill="currentColor" />
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                title: "Minority-Owned Business",
                desc: "Certified Minority-Owned Business Enterprise (MBE) demonstrating commitment to diverse supply chains.",
                icon: <Award className="w-16 h-16 text-gray-400" />,
                color: "bg-gray-50",
                image: "https://static1.squarespace.com/static/62fe71b24783ac627463dbeb/638791279a1cf272f8885d1d/6388cb3ea0392739e9fde45a/1671768750513/website_MWBE.jpg?format=1500w",
                pdf: "/NYS Certification.pdf"
              },
              {
                title: "Port Authority Certified",
                desc: "Official certification for NY/NJ Port Authority contracts and heavy industrial procurement.",
                icon: <Ship className="w-16 h-16 text-engineering-blue" />,
                color: "bg-blue-50",
                image: "https://images.squarespace-cdn.com/content/v1/54f63721e4b028af4a737125/1565026201471-RZG8HP1E54WWLDC0AF2N/PANYNJ.jpeg"
              },
              {
                title: "NYS/NYC Certified",
                desc: "Approved vendor for New York State and New York City municipal and enterprise sourcing.",
                icon: <Landmark className="w-16 h-16 text-industrial-orange" />,
                color: "bg-blue-50",
                image: "https://stratcomllc.com/wp-content/uploads/2018/09/NYS-WBE-Certified-Business.gif",
                pdf: "/NYC Certification.pdf"
              }
            ].map((cert, idx) => (
              <motion.div 
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                onClick={() => {
                  if (cert.pdf) window.open(cert.pdf, '_blank', 'noopener,noreferrer');
                }}
                className={`bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 flex flex-col min-h-[220px] sm:min-h-[240px] shadow-[0_12px_24px_-18px_rgba(15,23,42,0.3)] hover:border-industrial-orange/50 group transition-all ${cert.pdf ? 'cursor-pointer' : ''}`}
              >
                <div className={`flex h-28 sm:h-32 items-center justify-center mb-2.5 rounded-lg border border-slate-200 ${cert.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 industrial-hatch opacity-10"></div>
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={`${cert.title} certification badge`}
                      className="max-h-full max-w-full object-contain p-2 relative z-10"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/600x400?text=Product+Image+Coming+Soon';
                      }}
                    />
                  ) : (
                    cert.icon
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-black uppercase group-hover:text-industrial-orange transition-colors">{cert.title}</h3>
                  <p className="text-gray-500 font-semibold text-[10px] sm:text-xs uppercase leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-white py-10 md:py-12 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center">
            {[
              { val: "24hr", label: "Quote Turnaround", icon: <Zap /> },
              { val: "10k+", label: "Parts Available", icon: <Globe /> },
              { val: "100%", label: "Sourcing Guarantee", icon: <ShieldCheck /> },
              { val: "Tier 1", label: "Supplier Status", icon: <Verified /> }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight">{stat.val}</span>
                <span className="text-[10px] sm:text-xs font-black uppercase text-gray-400 mt-2 tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-industrial-orange py-4 md:py-5 px-3 sm:px-4">
        <div className="mx-auto w-full max-w-2xl rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-4">
          <h2 className="text-base sm:text-lg md:text-xl font-black uppercase text-white tracking-tight leading-none">Ready to Procure?</h2>
          <p className="mt-2 text-[10px] sm:text-xs md:text-sm font-semibold uppercase max-w-xl mx-auto text-white/95 leading-relaxed">
            Partner with a certified, high-performing supplier for your next bulk order or complex sourcing requirement.
          </p>
          <Link 
            to="/contact"
            className="mt-3 bg-white text-black px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wide rounded-md shadow-[0_10px_20px_-16px_rgba(15,23,42,0.55)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-1.5 group"
          >
            Contact Us
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
