import { useSEO } from '../lib/useSEO';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy — How Forez Handles Your Data',
    description: 'Read Forez\'s privacy policy. Covers what data we collect through contact and quote forms, how it is used, and how it is protected.',
    path: '/privacy-policy',
    keywords: 'privacy policy, data protection, industrial supplier privacy',
    breadcrumbs: [{ name: 'Privacy Policy', path: '/privacy-policy' }],
  });
  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-concrete p-6 shadow-sm sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-orange sm:text-xs">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>

        <div className="mt-6 space-y-4 text-sm font-medium leading-relaxed text-slate-600">
          <p>
            Forez may collect contact details you submit through quote or contact forms, including name, company, email, phone number, and request details.
          </p>
          <p>
            This information is used to respond to inquiries, provide quotes, and support customer communication. We do not sell your personal information.
          </p>
          <p>
            We maintain reasonable administrative and technical safeguards to protect submitted data. For updates or removal requests, contact us directly through the Contact page.
          </p>
          <p>
            By using this website, you acknowledge this policy and consent to the use of your information for business communication and order support.
          </p>
        </div>
      </div>
    </div>
  );
}
