import { Factory, Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-steel text-white">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-8 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-4 lg:gap-5">
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <div className="flex items-center gap-2.5 font-display text-lg font-black uppercase tracking-tight text-white sm:text-xl md:text-2xl">
              <img
                src="/images/logo.png"
                alt="Forez Corp"
                className="h-9 w-9 shrink-0 rounded-md sm:h-10 sm:w-10"
              />
              <span className="min-w-0 leading-none">FOREZ CORP</span>
            </div>
            <p className="mt-2 max-w-md text-[11px] font-semibold uppercase leading-snug text-slate-300/90 sm:mt-2.5 sm:text-xs">
              Industrial bulk procurement—reliable, certified, fast.
            </p>
            <div className="mt-3 flex gap-2 sm:mt-4">
              <div className="rounded-md border border-white/15 bg-white/10 p-1.5">
                <Factory className="h-4 w-4 text-industrial-orange sm:h-5 sm:w-5" aria-hidden />
              </div>
              <a
                href="https://www.linkedin.com/company/forez-corporation-b88163323/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/15 bg-white/10 p-1.5 transition hover:bg-white/15"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-industrial-orange sm:h-5 sm:w-5" aria-hidden />
              </a>
              <a
                href="mailto:info@forezcorp.com"
                className="rounded-md border border-white/15 bg-white/10 p-1.5 transition hover:bg-white/15"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-industrial-orange sm:h-5 sm:w-5" aria-hidden />
              </a>
            </div>
          </div>

          <nav className="col-span-1 min-w-0 flex flex-col gap-2 sm:gap-2.5" aria-label="Help and support">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-orange sm:text-xs">
              Help &amp; Support
            </h5>
            <Link to="/shipping" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              Shipping Info
            </Link>
            <Link to="/shipping" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              Returns
            </Link>
            <Link to="/how-to-order" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              How To Order
            </Link>
            <Link to="/how-to-track" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              How To Track
            </Link>
          </nav>

          <div className="col-span-1 min-w-0">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-orange sm:text-xs">Headquarters</h5>
            <div className="mt-2 space-y-2.5 text-xs font-semibold leading-snug text-slate-300 sm:text-sm">
              <div className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-industrial-orange" aria-hidden />
                <span>
                  2402 Ocean Ave
                  <br />
                  Ronkonkoma, NY 11779
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-industrial-orange" aria-hidden />
                <span>+1 (516) 860-2513</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-industrial-orange" aria-hidden />
                <span className="break-all uppercase">info@forezcorp.com</span>
              </div>
            </div>
          </div>

          <nav className="col-span-2 min-w-0 flex flex-col gap-2 sm:gap-2.5 lg:col-span-1" aria-label="Company information">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-orange sm:text-xs">
              Company Info
            </h5>
            <Link to="/about" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              About Us
            </Link>
            <Link to="/testimonial" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              Testimonial
            </Link>
            <Link to="/faqs" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              FAQs
            </Link>
            <Link to="/terms-of-use" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              Terms of Use
            </Link>
            <Link to="/privacy-policy" className="text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-white sm:text-sm">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/35">
        <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-5 md:px-6 lg:px-8">
          <div className="text-center text-[9px] font-black uppercase tracking-widest text-slate-400 sm:text-left sm:text-[10px]">
            © 2026 Forez Corp. NYS/NYC certified MBE.
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 sm:justify-end sm:text-[10px]">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/shipping" className="hover:text-white">
              Shipping
            </Link>
            <Link to="/terms-of-use" className="hover:text-white">
              Compliance
            </Link>
            <Link to="/terms-of-use" className="hover:text-white">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
