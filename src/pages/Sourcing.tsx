import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  Building2,
  Mail,
  Phone,
  FileText,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Verified,
  Truck,
  Trash2,
  Package,
  Plus,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBulkQuote } from '../context/BulkQuoteContext';

const QUOTE_EMAIL = 'INFO@FOREZCORP.COM';
const makeManualId = () => `manual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

import { useSEO } from '../lib/useSEO';

export default function Sourcing() {
  useSEO({
    title: 'Request a Bulk Quote — Custom Industrial Sourcing',
    description: 'Submit a bulk quote request for industrial products. Forez Corp handles multi-line custom sourcing for bearings, drives, MRO, and more. 24–48 hour quote turnaround.',
    path: '/sourcing',
    keywords: 'bulk quote industrial products, custom sourcing bearings, multi-line procurement, industrial RFQ, request a quote MRO',
    breadcrumbs: [{ name: 'Request a Quote', path: '/sourcing' }],
  });
  const { lines, setQty, setType, setDimensions, removeLine, clearLines } = useBulkQuote();
  const [submitted, setSubmitted] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [lastMailto, setLastMailto] = React.useState('');
  const [manualItems, setManualItems] = React.useState([
    { id: makeManualId(), name: '', type: '', dimensions: '', qty: 1 },
  ]);

  const addManualItem = () => {
    setManualItems((prev) => [
      ...prev,
      { id: makeManualId(), name: '', type: '', dimensions: '', qty: 1 },
    ]);
  };

  const updateManualItem = (
    id: string,
    field: 'name' | 'type' | 'dimensions' | 'qty',
    value: string | number
  ) => {
    setManualItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === 'qty') {
          return { ...item, qty: Math.max(1, Number(value) || 1) };
        }
        return { ...item, [field]: String(value) };
      })
    );
  };

  const removeManualItem = (id: string) => {
    setManualItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllItems = () => {
    clearLines();
    setManualItems([{ id: makeManualId(), name: '', type: '', dimensions: '', qty: 1 }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const nameOk = fullName.trim().length > 0;
    const emailOk = email.trim().length > 0;
    const phoneOk = phone.trim().length > 0;

    if (!nameOk) {
      setFormError('Full name is required.');
      return;
    }
    if (!emailOk && !phoneOk) {
      window.alert('Please enter either your contact or your email address.');
      return;
    }

    const validManualItems = manualItems.filter((item) => item.name.trim().length > 0);
    if (lines.length === 0 && validManualItems.length === 0) {
      setFormError('Add at least one item (from catalog or manual line item) before sending.');
      return;
    }

    const catalogItemsBlock = lines.length
      ? lines
          .map(
            (l) =>
              `- ${l.productName} (${l.categoryName}) | Type: ${l.type.trim() || '—'} | Dimensions: ${l.dimensions.trim() || '—'} | Qty: ${l.qty}`
          )
          .join('\n')
      : '(No catalog items selected)';

    const manualItemsBlock = validManualItems.length
      ? validManualItems
          .map(
            (item) =>
              `- ${item.name.trim()} | Type: ${item.type.trim() || '—'} | Dimensions: ${item.dimensions.trim() || '—'} | Qty: ${item.qty}`
          )
          .join('\n')
      : '(No manual items)';

    const body = [
      'BULK QUOTE REQUEST',
      '',
      `Name: ${fullName.trim()}`,
      `Company: ${company.trim() || '—'}`,
      `Email: ${email.trim() || '—'}`,
      `Phone: ${phone.trim() || '—'}`,
      '',
      'Selected catalog items:',
      catalogItemsBlock,
      '',
      'Manual/direct quote items:',
      manualItemsBlock,
      '',
      'Additional notes:',
      notes.trim() || '—',
    ].join('\n');

    const mailto = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(
      'Bulk Quote Request — Forez Corp'
    )}&body=${encodeURIComponent(body)}`;

    setLastMailto(mailto);
    clearLines();
    setSubmitted(true);
    window.open(mailto, '_blank', 'noopener,noreferrer');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-concrete flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white brutalist-border brutalist-shadow p-12 text-center max-w-xl w-full"
        >
          <div className="w-24 h-24 bg-industrial-orange rounded-full flex items-center justify-center mx-auto mb-8 brutalist-border">
            <CheckCircle2 className="text-white w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black uppercase font-display mb-4">REQUEST SENT</h2>
          <p className="text-xl font-bold text-gray-600 uppercase mb-6">
            If your email app opened, review and send the message. Our team will follow up shortly.
          </p>
          {lastMailto && (
            <a
              href={lastMailto}
              className="inline-block mb-8 text-industrial-orange font-black uppercase text-sm underline"
            >
              Open email draft again
            </a>
          )}
          <Link
            to="/catalog"
            className="inline-block bg-black text-white px-8 py-4 font-black uppercase tracking-tighter brutalist-border brutalist-shadow hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
          >
            Back to Catalog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <section className="lg:w-1/2 bg-engineering-blue text-white p-5 sm:p-7 md:p-12 lg:px-24 lg:pt-14 lg:pb-24 flex flex-col justify-start border-b-4 lg:border-b-0 lg:border-r-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none industrial-hatch"></div>
        <div className="relative z-10 max-w-xl pt-2 sm:pt-3 md:pt-4">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 md:mb-8 font-bold uppercase tracking-widest transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Catalog
          </Link>
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.98] sm:leading-[0.92] mb-3 sm:mb-5"
          >
            REQUEST BULK QUOTE
          </motion.h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-blue-100 leading-relaxed max-w-md border-l-4 sm:border-l-6 md:border-l-8 border-industrial-orange pl-4 sm:pl-5 md:pl-6 mb-3 sm:mb-5">
            Add products from any category, set quantities, then send your list with your contact details.
          </p>
          {lines.length > 0 && (
            <div className="flex items-center gap-2 sm:gap-3 text-cyan-300 font-black uppercase text-xs sm:text-sm tracking-wide sm:tracking-widest mb-3 sm:mb-5">
              <Package className="w-5 h-5 sm:w-6 sm:h-6" />
              {lines.length} line item{lines.length === 1 ? '' : 's'} from catalog
            </div>
          )}
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 opacity-80">
            <div className="flex items-center gap-3">
              <Verified className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-300" fill="currentColor" />
              <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-wide md:tracking-widest uppercase text-emerald-300">Certified Network</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-300" />
              <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-wide md:tracking-widest uppercase text-amber-300">Rapid Fulfillment</span>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:w-1/2 bg-white p-8 md:p-12 lg:p-20 flex flex-col justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-display mb-2">Bulk quote</h2>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
              Name required — include item name/type/dimensions/qty
            </p>
          </div>

          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={clearAllItems}
              className="px-4 py-2 border-2 border-black text-xs font-black uppercase hover:bg-black hover:text-white transition-colors"
            >
              Clear Items
            </button>
          </div>

          {lines.length > 0 && (
            <div className="mb-10 border-4 border-black bg-concrete p-4 md:p-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Selected catalog items</h3>
              <ul className="space-y-4">
                {lines.map((line) => (
                  <li
                    key={`${line.categoryId}-${line.productId}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 border-b-2 border-black/10 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="font-black uppercase text-sm truncate">{line.productName}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase">{line.categoryName}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={line.type}
                          onChange={(e) =>
                            setType(line.categoryId, line.productId, e.target.value)
                          }
                          placeholder="TYPE / VARIANT (e.g., 6204-2RS)"
                          className="h-10 px-3 border-2 border-black font-bold uppercase bg-white text-xs"
                        />
                        <input
                          type="text"
                          value={line.dimensions}
                          onChange={(e) =>
                            setDimensions(line.categoryId, line.productId, e.target.value)
                          }
                          placeholder="DIMENSIONS (OPTIONAL)"
                          className="h-10 px-3 border-2 border-black font-bold uppercase bg-white text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 whitespace-nowrap">
                        Qty
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={line.qty}
                        onChange={(e) =>
                          setQty(line.categoryId, line.productId, Number(e.target.value))
                        }
                        className="w-20 h-10 px-2 border-2 border-black font-black text-center bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeLine(line.categoryId, line.productId)}
                        className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                        aria-label="Remove line"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-10 border-4 border-black bg-white p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                Direct quote items (manual)
              </h3>
              <button
                type="button"
                onClick={addManualItem}
                className="inline-flex items-center gap-2 px-3 py-2 border-2 border-black text-xs font-black uppercase hover:bg-black hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <div className="space-y-3">
              {manualItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateManualItem(item.id, 'name', e.target.value)}
                    placeholder="ITEM NAME"
                    className="md:col-span-4 h-10 px-3 border-2 border-black font-bold uppercase bg-concrete text-xs"
                  />
                  <input
                    type="text"
                    value={item.type}
                    onChange={(e) => updateManualItem(item.id, 'type', e.target.value)}
                    placeholder="TYPE"
                    className="md:col-span-3 h-10 px-3 border-2 border-black font-bold uppercase bg-concrete text-xs"
                  />
                  <input
                    type="text"
                    value={item.dimensions}
                    onChange={(e) => updateManualItem(item.id, 'dimensions', e.target.value)}
                    placeholder="DIMENSIONS (OPTIONAL)"
                    className="md:col-span-3 h-10 px-3 border-2 border-black font-bold uppercase bg-concrete text-xs"
                  />
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateManualItem(item.id, 'qty', Number(e.target.value))}
                      placeholder="QTY"
                      className="w-full h-10 px-2 border-2 border-black font-bold text-center bg-concrete text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeManualItem(item.id)}
                      className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                      aria-label="Remove manual item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {lines.length === 0 && (
              <p className="mt-4 text-sm font-bold text-gray-600 uppercase">
                We do have many items in our catalog - please check it out. Some products may not always appear on the website.{' '}
                <Link to="/catalog" className="text-industrial-orange underline">
                  Browse catalog
                </Link>{' '}
                and tap products to auto-add them above.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {formError && (
              <div className="border-2 border-black bg-industrial-orange/10 px-4 py-3 text-sm font-black uppercase text-black">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500">
                  Full name <span className="text-industrial-orange">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="JOHN DOE"
                    className="w-full h-14 pl-12 pr-4 bg-concrete brutalist-border font-bold uppercase focus:ring-4 focus:ring-industrial-orange/20 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500">
                  Company (optional)
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="HEAVY IND. CORP"
                    className="w-full h-14 pl-12 pr-4 bg-concrete brutalist-border font-bold uppercase focus:ring-4 focus:ring-industrial-orange/20 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="PROCUREMENT@CORP.COM"
                    className="w-full h-14 pl-12 pr-4 bg-concrete brutalist-border font-bold uppercase focus:ring-4 focus:ring-industrial-orange/20 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500">
                  Phone / Contact
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full h-14 pl-12 pr-4 bg-concrete brutalist-border font-bold uppercase focus:ring-4 focus:ring-industrial-orange/20 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-500">
                Additional notes (optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="PART NUMBERS, BRANDS, DEADLINES, OR ITEMS NOT IN CATALOG..."
                  className="w-full pl-12 pr-4 py-4 bg-concrete brutalist-border font-bold uppercase focus:ring-4 focus:ring-industrial-orange/20 transition-all outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-16 bg-industrial-orange text-white text-xl font-black uppercase tracking-widest brutalist-border brutalist-shadow hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all flex items-center justify-center gap-3 group"
            >
              Send bulk quote request
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
