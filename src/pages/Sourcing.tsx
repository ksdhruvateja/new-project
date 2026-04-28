import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  Building2,
  Mail,
  Phone,
  FileText,
  Paperclip,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Trash2,
  Package,
  Plus,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useBulkQuote } from '../context/BulkQuoteContext';
import { SUBMISSION_EMAIL } from '../constants';
import { hasHostedFormDelivery, submitViaWeb3Forms } from '../lib/submitLead';

const ATTACHMENT_MAX_FILES = 5;
const ATTACHMENT_MAX_BYTES = 20 * 1024 * 1024;

function isAllowedQuoteAttachment(file: File): boolean {
  const name = file.name.toLowerCase();
  if (name.endsWith('.pdf') || file.type === 'application/pdf') return true;
  if (name.endsWith('.jpg') || name.endsWith('.jpeg') || file.type === 'image/jpeg') return true;
  return false;
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}
const makeManualId = () => `manual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const MANUAL_QUOTE_REQUESTS_KEY = 'forez-manual-quote-requests';

function makeCaptchaChallenge() {
  const n1 = Math.floor(Math.random() * 11) + 2;
  const n2 = Math.floor(Math.random() * 11) + 2;
  return { n1, n2, answer: n1 + n2 };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import { useSEO } from '../lib/useSEO';

export default function Sourcing() {
  useSEO({
    title: 'Request a Bulk Quote — Custom Industrial Sourcing',
    description: 'Submit a bulk quote request for industrial products. Forez handles multi-line custom sourcing for bearings, drives, MRO, and more. 24–48 hour quote turnaround.',
    path: '/sourcing',
    keywords: 'bulk quote industrial products, custom sourcing bearings, multi-line procurement, industrial RFQ, request a quote MRO',
    breadcrumbs: [{ name: 'Request a Quote', path: '/sourcing' }],
  });
  const { lines, setQty, setDimensions, removeLine, clearLines } = useBulkQuote();
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [lastMailto, setLastMailto] = React.useState('');
  const [submitDelivery, setSubmitDelivery] = React.useState<'hosted' | 'mailto' | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [customQuoteNotice, setCustomQuoteNotice] = React.useState('');
  const [manualItems, setManualItems] = React.useState([
    { id: makeManualId(), name: '', type: '', dimensions: '', qty: 1 },
  ]);
  const [captcha, setCaptcha] = React.useState(makeCaptchaChallenge);
  const [captchaInput, setCaptchaInput] = React.useState('');
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const attachmentInputRef = React.useRef<HTMLInputElement>(null);

  const refreshCaptcha = React.useCallback(() => {
    setCaptcha(makeCaptchaChallenge());
    setCaptchaInput('');
  }, []);

  const onAttachmentPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError('');
    const picked = e.target.files;
    if (!picked?.length) return;
    const incoming = Array.from(picked);
    for (const f of incoming) {
      if (!isAllowedQuoteAttachment(f)) {
        setFormError('Only PDF or JPG (JPEG) files are allowed.');
        e.target.value = '';
        return;
      }
      if (f.size > ATTACHMENT_MAX_BYTES) {
        setFormError(`Each file must be ${ATTACHMENT_MAX_BYTES / (1024 * 1024)} MB or smaller.`);
        e.target.value = '';
        return;
      }
    }
    setAttachments((prev) => {
      const merged = [...prev, ...incoming];
      if (merged.length > ATTACHMENT_MAX_FILES) {
        setFormError(`You can add up to ${ATTACHMENT_MAX_FILES} files. Extra files were not added.`);
        return merged.slice(0, ATTACHMENT_MAX_FILES);
      }
      return merged;
    });
    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    const manualBrand = searchParams.get('manualBrand')?.trim();
    const manualItem = searchParams.get('manualItem')?.trim();
    const fromRequestAction = searchParams.get('customAdded') === '1';
    let queued: { name: string; type: string; dimensions: string; qty: number }[] = [];
    try {
      const raw = sessionStorage.getItem(MANUAL_QUOTE_REQUESTS_KEY);
      const parsed = raw ? (JSON.parse(raw) as { name: string; type: string; dimensions: string; qty: number }[]) : [];
      queued = Array.isArray(parsed) ? parsed : [];
      if (queued.length > 0) {
        sessionStorage.removeItem(MANUAL_QUOTE_REQUESTS_KEY);
      }
    } catch {
      queued = [];
    }
    if (!manualBrand && !manualItem && queued.length === 0) {
      if (fromRequestAction) {
        setCustomQuoteNotice('Requested quantity has been added to custom quote.');
      }
      return;
    }
    let addedCount = 0;
    setManualItems((prev) => {
      const next = [...prev];
      const pushIfMissing = (entry: { name: string; type: string; dimensions: string; qty: number }) => {
        const name = entry.name.trim();
        const type = entry.type.trim();
        if (!name && !type) return;
        const exists = next.some(
          (item) =>
            item.name.trim().toLowerCase() === name.toLowerCase() &&
            item.type.trim().toLowerCase() === type.toLowerCase()
        );
        if (exists) return;
        next.push({
          id: makeManualId(),
          name,
          type,
          dimensions: entry.dimensions?.trim() || '',
          qty: Math.max(1, Number(entry.qty) || 1),
        });
        addedCount += 1;
      };

      pushIfMissing({
        name: manualItem || manualBrand || '',
        type: manualBrand || '',
        dimensions: '',
        qty: 1,
      });
      queued.forEach((entry) => pushIfMissing(entry));
      return next;
    });
    if (fromRequestAction || addedCount > 0) {
      setCustomQuoteNotice(
        addedCount > 1
          ? `${addedCount} requested brand quantities were added to custom quote.`
          : 'Requested quantity has been added to custom quote.'
      );
    }
  }, [searchParams]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Full name is required.');
      return;
    }
    const emailTrim = email.trim();
    if (!emailTrim) {
      setFormError('Email is required.');
      return;
    }
    if (!EMAIL_RE.test(emailTrim)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    const phoneTrim = phone.trim();
    if (!phoneTrim) {
      setFormError('Phone / contact is required.');
      return;
    }
    const phoneDigits = phoneTrim.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      setFormError('Please enter a valid phone number (at least 7 digits).');
      return;
    }
    const captchaVal = captchaInput.trim();
    if (captchaVal === '' || Number(captchaVal) !== captcha.answer) {
      setFormError('Security check failed. Solve the math problem below and try again.');
      refreshCaptcha();
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
              `- ${l.productName} (${l.categoryName}) | Dimensions: ${l.dimensions.trim() || '—'} | Qty: ${l.qty}${
                l.requestedBrands.length > 0
                  ? ` | Interested Brands: ${l.requestedBrands
                      .map((b) => `${b.brand}${b.partNumber ? ` [Part: ${b.partNumber}]` : ''} (Qty: ${b.qty})`)
                      .join(', ')}`
                  : ''
              }`
          )
          .join('\n')
      : '(No catalog items selected)';

    const manualItemsBlock = validManualItems.length
      ? validManualItems
          .map(
            (item) =>
              `- ${item.name.trim()} | Part number: ${item.dimensions.trim() || '—'} | Brand: ${item.type.trim() || '—'} | Qty: ${item.qty}`
          )
          .join('\n')
      : '(No manual items)';

    const attachmentBlock =
      attachments.length > 0
        ? [
            '',
            'Attachments selected (names & sizes — add these files in your email app; the link below cannot send file data):',
            ...attachments.map((f) => `- ${f.name} (${formatFileSize(f.size)})`),
            '',
            'Important: After your mail program opens, use Attach / Insert and choose the same PDF or JPG files you picked on the form.',
          ].join('\n')
        : '';

    const bodyParts = [
      'BULK QUOTE REQUEST',
      '',
      `Name: ${fullName.trim()}`,
      `Company: ${company.trim() || '—'}`,
      `Email: ${emailTrim}`,
      `Phone: ${phoneTrim}`,
      '',
      'Selected catalog items:',
      catalogItemsBlock,
      '',
      'Manual/direct quote items:',
      manualItemsBlock,
      '',
      'Additional notes:',
      notes.trim() || '—',
    ];
    if (attachmentBlock) bodyParts.push(attachmentBlock);
    const body = bodyParts.join('\n');

    const mailto = `mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(
      'Bulk Quote Request — Forez'
    )}&body=${encodeURIComponent(body)}`;

    if (hasHostedFormDelivery()) {
      setIsSubmitting(true);
      const hosted = await submitViaWeb3Forms({
        subject: 'Bulk Quote Request — Forez',
        name: fullName.trim(),
        replyEmail: emailTrim,
        message: body,
      });
      setIsSubmitting(false);
      if (hosted.success) {
        setFormError('');
        setSubmitDelivery('hosted');
        setLastMailto('');
        clearLines();
        setAttachments([]);
        setSubmitted(true);
        return;
      }
      setFormError(
        hosted.errorMessage
          ? `Automatic send failed (${hosted.errorMessage}). Your email app will open with a draft instead.`
          : 'Automatic send failed. Your email app will open with a draft instead.'
      );
    }

    setSubmitDelivery('mailto');
    setLastMailto(mailto);
    clearLines();
    setAttachments([]);
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
            {submitDelivery === 'hosted'
              ? 'Your quote request was received. Our team will follow up shortly.'
              : 'If your email app opened, review and send the message. Our team will follow up shortly.'}
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
      <section className="lg:w-1/4 shrink-0 bg-engineering-blue text-white p-5 sm:p-7 md:p-12 lg:px-6 lg:pt-14 lg:pb-24 flex flex-col justify-start border-b-4 lg:border-b-0 lg:border-r-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none industrial-hatch"></div>
        <div className="relative z-10 w-full max-w-xl pt-2 sm:pt-3 md:pt-4">
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
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight mb-3 sm:mb-5"
          >
            REQUEST QUOTE
          </motion.h1>
          {lines.length > 0 && (
            <div className="mt-3 flex items-center gap-2 sm:gap-3 text-cyan-300 font-black uppercase text-xs sm:text-sm tracking-wide sm:tracking-widest sm:mt-5">
              <Package className="w-5 h-5 sm:w-6 sm:h-6" />
              {lines.length} line item{lines.length === 1 ? '' : 's'} from catalog
            </div>
          )}
        </div>
      </section>

      <section className="min-w-0 flex-1 bg-white p-8 md:p-12 lg:p-20 flex flex-col justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-display mb-2">
              Here&apos;s your quote details
            </h2>
          </div>
          {customQuoteNotice && (
            <div className="mb-6 rounded-md border-2 border-emerald-700 bg-emerald-50 px-4 py-3 text-xs font-black uppercase tracking-wide text-emerald-900">
              {customQuoteNotice}
            </div>
          )}

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
                      {line.requestedBrands.length > 0 && (
                        <div className="rounded-md border border-black/10 bg-white px-2 py-2">
                          <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                            Requested brands
                          </p>
                          <ul className="mt-1 space-y-1">
                            {line.requestedBrands.map((entry) => (
                              <li key={`${line.productId}-${entry.brand}`} className="text-[10px] font-bold uppercase text-gray-700">
                                {entry.brand}
                                {entry.partNumber ? ` - Part ${entry.partNumber}` : ''}
                                {` - Qty ${entry.qty}`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="grid grid-cols-1 gap-2">
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
            <div className="space-y-2">
              {manualItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-x-auto rounded-md border-2 border-black/15 bg-concrete/50 p-2"
                >
                  <div className="flex min-w-[36rem] max-w-full flex-nowrap items-center gap-2 sm:min-w-0 sm:max-w-none">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateManualItem(item.id, 'name', e.target.value)}
                      placeholder="ITEM NAME"
                      aria-label="Item name"
                      className="h-9 min-w-0 flex-1 px-2 border-2 border-black bg-white text-xs font-bold uppercase"
                    />
                    <input
                      type="text"
                      value={item.dimensions}
                      onChange={(e) => updateManualItem(item.id, 'dimensions', e.target.value)}
                      placeholder="PART NUMBER"
                      aria-label="Part number"
                      className="h-9 min-w-0 flex-1 px-2 border-2 border-black bg-white text-xs font-bold uppercase"
                    />
                    <input
                      type="text"
                      value={item.type}
                      onChange={(e) => updateManualItem(item.id, 'type', e.target.value)}
                      placeholder="BRAND"
                      aria-label="Brand"
                      className="h-9 min-w-0 flex-1 px-2 border-2 border-black bg-white text-xs font-bold uppercase"
                    />
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateManualItem(item.id, 'qty', Number(e.target.value))}
                      placeholder="QTY"
                      aria-label="Quantity"
                      className="h-9 w-14 shrink-0 border-2 border-black bg-white px-1 text-center text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => removeManualItem(item.id)}
                      className="shrink-0 p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                      aria-label="Remove manual item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {lines.length === 0 && (
              <p className="mt-4 text-xs font-black uppercase tracking-wider text-gray-500 line-clamp-2">
                New to quote?{' '}
                <Link to="/catalog" className="text-industrial-orange underline">
                  Open the catalog
                </Link>{' '}
                to add products.
              </p>
            )}
          </div>

          <form noValidate onSubmit={handleSubmit} className="space-y-8">
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
                  Email <span className="text-industrial-orange">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="PROCUREMENT@CORP.COM"
                    className="w-full h-14 pl-12 pr-4 bg-concrete brutalist-border font-bold uppercase focus:ring-4 focus:ring-industrial-orange/20 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500">
                  Phone / contact <span className="text-industrial-orange">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    required
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

            <div className="space-y-3 border-2 border-black bg-white p-4 md:p-5">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-500">
                Attachments <span className="font-bold normal-case text-gray-400">(optional — PDF or JPG)</span>
              </label>
              <p className="text-xs font-semibold leading-relaxed text-gray-600">
                Select files to include with your request. Your email app will open next — you must{' '}
                <span className="font-black text-gray-800">attach the same files there</span>, because the browser cannot
                send file contents through an email link. When you have a final inbox or upload URL, this flow can be
                wired to it.
              </p>
              <input
                ref={attachmentInputRef}
                type="file"
                className="sr-only"
                accept=".pdf,.jpg,.jpeg,application/pdf,image/jpeg"
                multiple
                onChange={onAttachmentPick}
              />
              <button
                type="button"
                onClick={() => attachmentInputRef.current?.click()}
                className="inline-flex items-center gap-2 border-2 border-black bg-concrete px-4 py-2.5 text-xs font-black uppercase tracking-wide transition-colors hover:bg-black hover:text-white"
              >
                <Paperclip className="h-4 w-4" aria-hidden />
                Choose files
              </button>
              {attachments.length > 0 && (
                <ul className="space-y-2 border-t border-black/10 pt-3">
                  {attachments.map((file, index) => (
                    <li
                      key={`${file.name}-${file.size}-${index}`}
                      className="flex items-center justify-between gap-2 text-xs font-bold uppercase text-gray-800"
                    >
                      <span className="min-w-0 truncate">
                        {file.name}{' '}
                        <span className="font-semibold text-gray-500">({formatFileSize(file.size)})</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="shrink-0 border-2 border-black p-1.5 hover:bg-black hover:text-white"
                        aria-label={`Remove ${file.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                Up to {ATTACHMENT_MAX_FILES} files · max {ATTACHMENT_MAX_BYTES / (1024 * 1024)} MB each
              </p>
            </div>

            <div className="space-y-3 border-2 border-black bg-zinc-50 p-4 md:p-5">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-600">
                Security check <span className="text-industrial-orange">*</span>
              </label>
              <p className="text-sm font-bold text-zinc-800">
                What is{' '}
                <span className="font-black tabular-nums">{captcha.n1}</span> +{' '}
                <span className="font-black tabular-nums">{captcha.n2}</span>?
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="ANSWER"
                  autoComplete="off"
                  aria-label="Enter captcha answer"
                  className="h-12 w-28 border-2 border-black bg-white px-3 text-center text-sm font-black tracking-wide outline-none focus:ring-2 focus:ring-industrial-orange/30"
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-xs font-black uppercase tracking-wide text-industrial-orange underline decoration-2 underline-offset-2 hover:text-engineering-blue"
                >
                  New question
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 bg-industrial-orange text-white text-xl font-black uppercase tracking-widest brutalist-border brutalist-shadow transition-all flex items-center justify-center gap-3 group hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:pointer-events-none disabled:opacity-60"
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
