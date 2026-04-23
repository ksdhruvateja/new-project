import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Sourcing from './pages/Sourcing';
import About from './pages/About';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import AdminPortal from './pages/AdminPortal';
import Testimonial from './pages/Testimonial';
import FAQs from './pages/FAQs';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HowToOrder from './pages/HowToOrder';
import HowToTrack from './pages/HowToTrack';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isSourcingPage = location.pathname === '/sourcing';

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((node, idx) => {
      node.classList.add('reveal-on-scroll');
      const delay = node.dataset.revealDelay ?? `${Math.min(idx * 55, 330)}ms`;
      node.style.setProperty('--reveal-delay', delay);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen w-full min-w-0 max-w-full flex-col font-sans selection:bg-engineering-blue selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow w-full min-w-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:categoryId" element={<Catalog />} />
          <Route path="/sourcing" element={<Sourcing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/how-to-track" element={<HowToTrack />} />
        </Routes>
      </main>
      {!isSourcingPage && <Footer />}
    </div>
  );
}
