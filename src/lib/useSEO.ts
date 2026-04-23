import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
  /** canonical path, e.g. "/faqs" — defaults to current pathname */
  path?: string;
  /** extra keywords appended to global keywords */
  keywords?: string;
  /** override og:type, defaults to "website" */
  ogType?: string;
  /** breadcrumb trail: [{name, path}] — root "/" is prepended automatically */
  breadcrumbs?: Array<{ name: string; path: string }>;
}

const BASE_URL = 'https://www.forezcorp.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/og-cover.png`;
const GLOBAL_KEYWORDS =
  'industrial supply, bearings, power transmission, MRO, bulk procurement, custom sourcing, NYC MBE, minority business enterprise, Ronkonkoma NY, industrial distributor';

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setOG(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: object) {
  let el = document.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-seo-id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data, null, 2);
}

export function useSEO({
  title,
  description,
  path,
  keywords,
  ogType = 'website',
  breadcrumbs = [],
}: SEOOptions) {
  useEffect(() => {
    const fullTitle = `${title} | Forez Corp`;
    const canonical = `${BASE_URL}${path ?? window.location.pathname}`;
    const allKeywords = keywords
      ? `${keywords}, ${GLOBAL_KEYWORDS}`
      : GLOBAL_KEYWORDS;

    // Core
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('keywords', allKeywords);
    setCanonical(canonical);

    // Open Graph
    setOG('og:title', fullTitle);
    setOG('og:description', description);
    setOG('og:url', canonical);
    setOG('og:image', DEFAULT_IMAGE);
    setOG('og:image:alt', 'Forez Corp — Industrial Sourcing & Bulk Procurement');
    setOG('og:image:width', '1200');
    setOG('og:image:height', '630');
    setOG('og:type', ogType);
    setOG('og:site_name', 'Forez Corp');
    setOG('og:locale', 'en_US');

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', DEFAULT_IMAGE);
    setMeta('twitter:image:alt', 'Forez Corp industrial supply');
    setMeta('twitter:site', '@forezcorp');

    // Breadcrumb JSON-LD
    const crumbs = [
      { name: 'Home', path: '/' },
      ...breadcrumbs,
    ];
    setJsonLd('breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: `${BASE_URL}${c.path}`,
      })),
    });

    // WebPage JSON-LD
    setJsonLd('webpage', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: fullTitle,
      description,
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'en-US',
    });
  }, [title, description, path, keywords, ogType, breadcrumbs]);
}
