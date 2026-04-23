import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useSEO } from '../lib/useSEO';

export default function Contact() {
  useSEO({
    title: 'Contact Us — Get in Touch with Forez',
    description: 'Contact Forez for industrial sourcing inquiries, quote requests, or procurement support. Reach us by phone, email, or our contact form. Based in Ronkonkoma, NY.',
    path: '/contact',
    keywords: 'contact Forez, industrial supplier contact, procurement inquiry, Ronkonkoma NY supplier',
    breadcrumbs: [{ name: 'Contact', path: '/contact' }],
  });
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-steel text-white py-10 px-6 border-b-8 border-black">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3">Get in Touch</h1>
          <p className="text-sm md:text-base font-bold text-gray-400 uppercase max-w-2xl">
            Direct access to our engineering and procurement specialists.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-3">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="bg-industrial-orange p-2.5 brutalist-border brutalist-shadow group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone</h3>
                  <p className="text-base md:text-lg font-black uppercase">+1 (516)-860-2513</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="bg-engineering-blue p-2.5 brutalist-border brutalist-shadow group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</h3>
                  <p className="text-base md:text-lg font-black uppercase">INFO@FOREZCORP.COM</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="bg-black p-2.5 brutalist-border brutalist-shadow group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Address</h3>
                  <p className="text-base md:text-lg font-black uppercase">2402 OCEAN AVE<br />RONKONKOMA, NY 11779</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="bg-gray-200 p-2.5 brutalist-border brutalist-shadow group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Hours</h3>
                  <p className="text-base md:text-lg font-black uppercase">MON - FRI: 8AM - 6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-concrete brutalist-border p-8 md:p-12 brutalist-shadow">
          <h2 className="text-3xl font-black uppercase mb-8">Send a Message</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500">Full Name</label>
              <input type="text" className="w-full h-14 px-4 bg-white brutalist-border font-bold uppercase outline-none focus:ring-4 focus:ring-industrial-orange/20" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500">Email Address</label>
              <input type="email" className="w-full h-14 px-4 bg-white brutalist-border font-bold uppercase outline-none focus:ring-4 focus:ring-industrial-orange/20" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500">Message</label>
              <textarea rows={5} className="w-full p-4 bg-white brutalist-border font-bold uppercase outline-none focus:ring-4 focus:ring-industrial-orange/20 resize-none" />
            </div>
            <button className="w-full h-16 bg-black text-white text-xl font-black uppercase tracking-widest brutalist-border brutalist-shadow hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all flex items-center justify-center gap-3">
              Send Message
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
