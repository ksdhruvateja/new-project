import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Catalog', href: '/catalog' },
    { name: 'Sourcing', href: '/sourcing' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/catalog') {
      return location.pathname === '/catalog' || location.pathname.startsWith('/catalog/');
    }
    return location.pathname === href;
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] flex w-full min-w-0 max-w-full items-center justify-between gap-2 border-b border-slate-500/35 bg-slate-800/88 px-3 py-2 text-white shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-slate-800/80 sm:px-4 md:px-6 md:py-2.5 relative',
          isOpen && 'shadow-lg'
        )}
        role="navigation"
        aria-label="Primary"
      >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:gap-8">
        <Link
          to="/"
          className="text-base sm:text-xl md:text-2xl font-extrabold tracking-tight text-white font-display flex min-w-0 max-w-full items-center uppercase"
        >
          <img src="/images/logo.png" alt="Forez" className="mr-2 h-7 w-7 shrink-0 rounded-md sm:mr-2.5 sm:h-8 sm:w-8 md:h-9 md:w-9" />
          <span className="min-w-0 truncate">Forez</span>
        </Link>
        <div className="hidden md:flex gap-5 font-display uppercase tracking-wide font-bold text-xs lg:text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-slate-100/90 hover:text-industrial-orange transition-colors pb-1 border-b-2 border-transparent",
                isActive(link.href) && "text-industrial-orange border-industrial-orange"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
        <div className="hidden lg:block text-right">
          <Link
            to="/about"
            className="text-[10px] font-semibold tracking-[0.16em] text-industrial-orange uppercase transition-colors hover:text-white"
          >
            Certified MBE
          </Link>
        </div>
        <Link 
          to="/sourcing"
          className="hidden sm:inline-flex bg-industrial-orange text-white px-3 md:px-4 py-1.5 rounded-lg font-extrabold uppercase tracking-wide hover:brightness-95 transition-all text-[11px] md:text-xs shadow-[0_12px_24px_-16px_rgba(249,115,22,0.8)]"
        >
          REQUEST QUOTE
        </Link>
        <button className="md:hidden text-white p-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="site-mobile-nav"
          className="absolute left-0 top-full z-[101] flex w-full max-h-[min(70vh,24rem)] flex-col gap-3 overflow-y-auto border-b border-slate-500/35 bg-slate-800/95 p-4 shadow-2xl md:hidden"
        >
          <Link
            to="/sourcing"
            className="bg-industrial-orange text-white px-4 py-2 rounded-lg font-extrabold uppercase tracking-wide text-sm inline-flex w-fit"
            onClick={() => setIsOpen(false)}
          >
            Request Quote
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white font-display uppercase font-bold text-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
    </>
  );
}
