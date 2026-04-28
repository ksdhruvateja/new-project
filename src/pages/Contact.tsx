import { useState, useCallback } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useSEO } from '../lib/useSEO';
import { SUBMISSION_EMAIL } from '../constants';
import { hasHostedFormDelivery, submitViaWeb3Forms } from '../lib/submitLead';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeCaptchaChallenge() {
  const n1 = Math.floor(Math.random() * 11) + 2;
  const n2 = Math.floor(Math.random() * 11) + 2;
  return { n1, n2, answer: n1 + n2 };
}

export default function Contact() {
  useSEO({
    title: 'Contact Us — Get in Touch with Forez',
    description:
      'Contact Forez for industrial sourcing inquiries, quote requests, or procurement support. Reach us by phone, email, or our contact form. Based in Ronkonkoma, NY.',
    path: '/contact',
    keywords: 'contact Forez, industrial supplier contact, procurement inquiry, Ronkonkoma NY supplier',
    breadcrumbs: [{ name: 'Contact', path: '/contact' }],
  });

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState(makeCaptchaChallenge);
  const [captchaInput, setCaptchaInput] = useState('');

  const refreshCaptcha = useCallback(() => {
    setCaptcha(makeCaptchaChallenge());
    setCaptchaInput('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

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
    if (!message.trim()) {
      setFormError('Please enter a message.');
      return;
    }
    const captchaVal = captchaInput.trim();
    if (captchaVal === '' || Number(captchaVal) !== captcha.answer) {
      setFormError('Security check failed. Solve the math problem below and try again.');
      refreshCaptcha();
      return;
    }

    const body = [
      `Name: ${fullName.trim()}`,
      `Email: ${emailTrim}`,
      '',
      'Message:',
      message.trim(),
    ].join('\n');

    const subject = 'Website contact — ' + fullName.trim();

    if (hasHostedFormDelivery()) {
      setIsSubmitting(true);
      const hosted = await submitViaWeb3Forms({
        subject,
        name: fullName.trim(),
        replyEmail: emailTrim,
        message: body,
      });
      setIsSubmitting(false);
      if (hosted.success) {
        setFormError('');
        setFormSuccess('Message sent. We will get back to you shortly.');
        setFullName('');
        setEmail('');
        setMessage('');
        refreshCaptcha();
        return;
      }
      setFormError(
        hosted.errorMessage
          ? `Automatic send failed (${hosted.errorMessage}). Your email app will open with a draft instead.`
          : 'Automatic send failed. Your email app will open with a draft instead.'
      );
    }

    const mailto = `mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(mailto, '_blank', 'noopener,noreferrer');
    setFullName('');
    setEmail('');
    setMessage('');
    refreshCaptcha();
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b-8 border-black bg-steel py-10 px-6 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-3xl font-black uppercase tracking-tight md:text-4xl">Get in Touch</h1>
          <p className="max-w-2xl text-sm font-bold uppercase text-gray-400 md:text-base">
            Direct access to our engineering and procurement specialists.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-5">
            <h2 className="border-b-4 border-black pb-3 text-2xl font-black uppercase">Contact Details</h2>
            <div className="space-y-4">
              <div className="group flex items-start gap-4">
                <div className="brutalist-border brutalist-shadow bg-industrial-orange p-2.5 transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</h3>
                  <p className="text-base font-black uppercase md:text-lg">+1 (516)-860-2513</p>
                </div>
              </div>
              <div className="group flex items-start gap-4">
                <div className="brutalist-border brutalist-shadow bg-engineering-blue p-2.5 transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Email</h3>
                  <p className="text-base font-black uppercase md:text-lg">{SUBMISSION_EMAIL.toUpperCase()}</p>
                </div>
              </div>
              <div className="group flex items-start gap-4">
                <div className="brutalist-border brutalist-shadow bg-black p-2.5 transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Address</h3>
                  <p className="text-base font-black uppercase md:text-lg">
                    2402 OCEAN AVE
                    <br />
                    RONKONKOMA, NY 11779
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-4">
                <div className="brutalist-border brutalist-shadow bg-gray-200 p-2.5 transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
                  <Clock className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Hours</h3>
                  <p className="text-base font-black uppercase md:text-lg">MON - FRI: 8AM - 6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="brutalist-border brutalist-shadow bg-concrete p-8 md:p-12">
          <h2 className="mb-8 text-3xl font-black uppercase">Send a Message</h2>
          <form noValidate onSubmit={handleSubmit} className="space-y-6">
            {formError && (
              <div className="border-2 border-black bg-industrial-orange/15 px-4 py-3 text-sm font-black uppercase text-black">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="border-2 border-black bg-emerald-100 px-4 py-3 text-sm font-black uppercase text-black">
                {formSuccess}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="contact-full-name" className="text-xs font-black uppercase tracking-widest text-gray-500">
                Full name <span className="text-industrial-orange">*</span>
              </label>
              <input
                id="contact-full-name"
                name="name"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="brutalist-border h-14 w-full bg-white px-4 font-bold uppercase outline-none focus:ring-4 focus:ring-industrial-orange/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs font-black uppercase tracking-widest text-gray-500">
                Email address <span className="text-industrial-orange">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="brutalist-border h-14 w-full bg-white px-4 font-bold uppercase outline-none focus:ring-4 focus:ring-industrial-orange/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-xs font-black uppercase tracking-widest text-gray-500">
                Message <span className="text-industrial-orange">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="brutalist-border w-full resize-none bg-white p-4 font-bold uppercase outline-none focus:ring-4 focus:ring-industrial-orange/20"
              />
            </div>

            <div className="space-y-3 border-2 border-black bg-zinc-50 p-4 md:p-5">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-600">
                Security check <span className="text-industrial-orange">*</span>
              </label>
              <p className="text-sm font-bold text-zinc-800">
                What is <span className="font-black tabular-nums">{captcha.n1}</span> +{' '}
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
              className="brutalist-border brutalist-shadow flex h-16 w-full items-center justify-center gap-3 bg-black text-xl font-black uppercase tracking-widest text-white transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:pointer-events-none disabled:opacity-60"
            >
              Send message
              <ArrowRight className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
