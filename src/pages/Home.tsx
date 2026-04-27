import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Boxes,
  ClipboardPlus,
  Clock,
  LayoutGrid,
  Truck,
  Search,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { FALLBACK_PRODUCT_IMAGE, PRODUCT_CATEGORIES, getCategoryPreviewImage } from '../constants';
import { useBulkQuote } from '../context/BulkQuoteContext';

const SERVICES = [
  {
    Icon: ClipboardPlus,
    title: 'Procurement',
    desc: 'Submit a single quote request across multiple product lines. We source, consolidate, and fulfill — reducing vendor overhead and saving procurement time.',
    cta: 'Request a Quote',
    href: '/sourcing',
    iconBg: 'bg-industrial-orange',
    border: 'hover:border-industrial-orange/40',
  },
  {
    Icon: Search,
    title: 'Custom Sourcing',
    desc: "Can't find it in the catalog? Our team tracks down hard-to-find and specialty parts through our certified manufacturer network — no matter the spec.",
    cta: 'Start Sourcing',
    href: '/sourcing',
    iconBg: 'bg-engineering-blue',
    border: 'hover:border-engineering-blue/40',
  },
  {
    Icon: Truck,
    title: 'Rapid Fulfillment',
    desc: 'Quotes turned around in 24–48 hours. MRO-ready inventory with documentation that meets public-sector and enterprise procurement standards.',
    cta: 'Shipping Info',
    href: '/shipping',
    iconBg: 'bg-slate-800',
    border: 'hover:border-slate-400/50',
  },
];

const BASE = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets';
const INDUSTRIES = [
  { icon: `${BASE}/Airplane/3D/airplane_3d.png`,               label: 'Airports & Baggage Handling' },
  { icon: `${BASE}/High%20voltage/3D/high_voltage_3d.png`,    label: 'Power Generation' },
  { icon: `${BASE}/Droplet/3D/droplet_3d.png`,                label: 'Wastewater Treatment' },
  { icon: `${BASE}/Snowflake/3D/snowflake_3d.png`,            label: 'HVAC & Refrigeration' },
  { icon: `${BASE}/Factory/3D/factory_3d.png`,                label: 'Manufacturing & MRO' },
  { icon: `${BASE}/Metro/3D/metro_3d.png`,                    label: 'Mass Transit & Infrastructure' },
];

const FEATURED_BRANDS = [
  'SKF', 'Timken', 'NSK', 'NTN', 'Dodge', 'Browning',
  'Baldor', 'Gates', 'Rexnord', 'Lovejoy', 'Martin', 'Falk',
  'TB Woods', 'Link-Belt', 'Morse', 'Bando', 'Renold', 'Diamond',
];

const BRAND_LOGO_ORIGINALS: Record<string, string> = {
  'ALLEN BRADLEY': '/brand-logos/allen-bradley.png',
  'ALLIGATOR LACING': '/brand-logos/alligator-lacing.png',
  'CHICAGO RAWHIDE': '/brand-logos/chicago-rawhide.png',
  'CLIPPER LACING': '/brand-logos/clipper-lacing.png',
  COILHOSE: '/brand-logos/coilhose.png',
  'AMERICAN CYLINDER': '/brand-logos/american-cylinder.png',
  'AMERICAN PULLEY': '/brand-logos/american-pulley.png',
  AMERIDRIVES: '/brand-logos/ameridrives.png',
  AMI: '/brand-logos/ametric.png',
  AMETRIC: '/brand-logos/ametric.png',
  BANDO: '/brand-logos/bando.png',
  BOSTON: '/brand-logos/boston.png',
  'BAGEL BELTING': '/brand-logos/bagel-belting.png',
  'BISHOP WISECARVER': '/brand-logos/bishop-wisecarver.png',
  'BIMBA CYLINDERS': '/brand-logos/bimba-cylinders.png',
  'COTTON BELTING': '/brand-logos/cotton-belting.png',
  'FOOD BELTING': '/brand-logos/food-belting.svg',
  ABC: '/brand-logos/abc.png',
  BALDOR: '/brand-logos/baldor.png',
  BRECOFLEX: '/brand-logos/brecoflex.png',
  BRYANT: '/brand-logos/bryant.png',
  CRAFT: '/brand-logos/craft.png',
  DAYCO: '/brand-logos/dayco.png',
  DIAMOND: '/brand-logos/diamond.png',
  DUNLOP: '/brand-logos/dunlop.png',
  DYNACORE: '/brand-logos/dynacore.png',
  DYNACORP: '/brand-logos/dyncorp.png',
  ELECTROID: '/brand-logos/electroid.png',
  FALK: '/brand-logos/falk.png',
  FENNAR: '/brand-logos/fenner.png',
  'FITTINGS UNLIMITED': '/brand-logos/fittings-unlimited.png',
  FORBO: '/brand-logos/forbo.png',
  FORMSPRAG: '/brand-logos/formsprag.png',
  FYH: '/brand-logos/fyh.png',
  GARLOCK: '/brand-logos/garlock.png',
  GATES: '/brand-logos/gates.png',
  'GENERAL ELECTRIC': '/brand-logos/general-electric.png',
  GERBING: '/brand-logos/gerbing.png',
  AETNA: '/brand-logos/aetna.png',
  'AIR PIPE USA': '/brand-logos/air-pipe-usa.png',
  ALEMITE: '/brand-logos/alemite.png',
  MARTIN: '/brand-logos/martin.png',
  'BREWER TENSIONERS': '/brand-logos/brewer-tensioners.png',
  HEIM: '/brand-logos/heim.png',
  HEPA: '/brand-logos/hepa.png',
  'HEWITT ROBINS': '/brand-logos/hewitt-robins.png',
  'HITACHI MAXCO': '/brand-logos/hitachi-maxco.png',
  HKK: '/brand-logos/hkk.png',
  HORTON: '/brand-logos/horton.png',
  'HOSE & FITTINGS': '/brand-logos/hose-fittings.png',
  'HUB CITY': '/brand-logos/hub-city.png',
  IDC: '/brand-logos/idc.png',
  IKO: '/brand-logos/iko.png',
  INA: '/brand-logos/ina.png',
  IWIS: '/brand-logos/iwis.png',
  INTEROLL: '/brand-logos/interroll.png',
  INTERROLL: '/brand-logos/interroll.png',
  INTRALOX: '/brand-logos/intralox.png',
  JEFFREY: '/brand-logos/jeffrey.png',
  KEYSTONE: '/brand-logos/keystone.png',
  'KOP FLEX': '/brand-logos/kop-flex.png',
  'LEESON ELECTRIC': '/brand-logos/leeson.png',
  LINCOLN: '/brand-logos/lincoln.png',
  'LINK-BELT': '/brand-logos/link-belt.png',
  KOYO: '/brand-logos/koyo.png',
  'LINN GEAR': '/brand-logos/linn-gear.png',
  'LOCKNUTS & WASHERS': '/brand-logos/locknuts-washers.png',
  LUBRIKO: '/brand-logos/lubriko.png',
  LUBRIPLATE: '/brand-logos/lubriplate.png',
  MAGNETEK: '/brand-logos/magnetek.png',
  MCGILL: '/brand-logos/mcgill.png',
  MASKA: '/brand-logos/maska.png',
  MAUREY: '/brand-logos/maurey.png',
  'MFD PNEUMATIC VALVES': '/brand-logos/mfd.png',
  MOBIL: '/brand-logos/mobil.png',
  MOLINE: '/brand-logos/moline.png',
  MORSE: '/brand-logos/morse.png',
  NACHI: '/brand-logos/nachi.png',
  NATIONAL: '/brand-logos/national-seals.png',
  'NATIONAL ROD ENDS': '/brand-logos/national-rod-ends.png',
  'NEVER SEEZ': '/brand-logos/never-seez.png',
  NOK: '/brand-logos/nok.png',
  NORGREN: '/brand-logos/norgren.png',
  'O RINGS': '/brand-logos/o-rings.png',
  'OIL RITE': '/brand-logos/oil-rite.png',
  OILITE: '/brand-logos/oilite.png',
  OMEGA: '/brand-logos/omega.png',
  'OSHKOSH AEROTECH': '/brand-logos/oshkosh-aerotech.png',
  'OWATONNA TOOL': '/brand-logos/owatonna-tool.png',
  'PACIFIC BEARING': '/brand-logos/pacific-bearing.png',
  'PAGE (LEATHER)': '/brand-logos/page-leather.png',
  'PNEUFORCE / VACUFORCE': '/brand-logos/pneuforce-vacuforce.png',
  PRECISION: '/brand-logos/precision.png',
  RAMSEY: '/brand-logos/ramsey.png',
  RANDALL: '/brand-logos/randall.png',
  REELCRAFT: '/brand-logos/reelcraft.png',
  RELIANCE: '/brand-logos/reliance.png',
  RENOLD: '/brand-logos/renold.png',
  RINGSPAN: '/brand-logos/ringspann.png',
  REX: '/brand-logos/rex.png',
  ROLLWAY: '/brand-logos/rollway.png',
  ROYERSFORD: '/brand-logos/royersford.png',
  RTI: '/brand-logos/rti.png',
  RBC: '/brand-logos/rbc.png',
  SCHATZ: '/brand-logos/schatz.png',
  SCHMIDT: '/brand-logos/schmidt.png',
  'SEW EURODRIVES': '/brand-logos/sew-eurodrive.png',
  SIEMENS: '/brand-logos/siemens.png',
  SIERRATH: '/brand-logos/sierrath.png',
  'STAR LINEAR': '/brand-logos/star-linear.png',
  'STARCYL CYLINDERS': '/brand-logos/starcyl-cylinders.png',
  STEARNS: '/brand-logos/stearns.png',
  'STEPHENS ADAMSON': '/brand-logos/stephens-adamson.png',
  SUMITOMO: '/brand-logos/sumitomo.png',
  SUPERIOR: '/brand-logos/superior.png',
  'TB WOODS': '/brand-logos/tb-woods.png',
  TCM: '/brand-logos/tcm.png',
  THOMAS: '/brand-logos/thomas.png',
  THOMSON: '/brand-logos/thomson.png',
  ULPA: '/brand-logos/ulpa.png',
  UNION: '/brand-logos/union.png',
  'US ELECTRIC': '/brand-logos/us-electric.png',
  'US SEAL': '/brand-logos/us-seal.png',
  UST: '/brand-logos/ust.png',
  'VAN GORP': '/brand-logos/van-gorp.png',
  WALDRON: '/brand-logos/waldron.png',
  WARNER: '/brand-logos/warner.png',
  WD40: '/brand-logos/wd40.png',
  WHITNEY: '/brand-logos/whitney.png',
  'WIRE MESH BELTS': '/brand-logos/wire-mesh-belts.png',
  YAMADA: '/brand-logos/yamada.png',
  ZURN: '/brand-logos/zurn.png',
  LOVEJOY: '/brand-logos/lovejoy.png',
  SKF: 'https://googleusercontent.com/image_collection/image_retrieval/2947497633612133775_0',
  'SKF MAINTENANCE': '/brand-logos/skf-maintenance.png',
  'SKF/LINCOLN': '/brand-logos/skf-lincoln.png',
  DODGE: 'https://googleusercontent.com/image_collection/image_retrieval/5409773030784320301_0',
  BROWNING: '/brand-logos/browning.png',
  'TIMKEN TORRINGTON': 'https://googleusercontent.com/image_collection/image_retrieval/3366957255698520401_0',
  NSK: 'https://googleusercontent.com/image_collection/image_retrieval/4062728077605395253_0',
};

const BRAND_LOGO_DOMAINS: Record<string, string> = {
  ALEMITE: 'skf.com',
  'AIR PIPE USA': 'airpipeusa.com',
  'ALLEN BRADLEY': 'rockwellautomation.com',
  'ALLIGATOR LACING': 'flexco.com',
  'CLIPPER LACING': 'flexco.com',
  'CHICAGO RAWHIDE': 'skf.com',
  COILHOSE: 'coilhose.com',
  'AMERICAN CYLINDER': 'americancylinder.com',
  'AMERICAN PULLEY': 'americanpulley.com',
  AMERIDRIVES: 'ameridrives.com',
  AMI: 'asahiamerica.com',
  AMETRIC: 'ametric.com',
  BRECOFLEX: 'brecoflex.com',
  BRYANT: 'bryantpipe.com',
  'BIMBA CYLINDERS': 'bimba.com',
  SKF: 'skf.com',
  'SKF MAINTENANCE': 'skf.com',
  'SKF/LINCOLN': 'orderlincoln.com',
  TIMKEN: 'timken.com',
  'TIMKEN TORRINGTON': 'timken.com',
  NSK: 'nsk.com',
  NTN: 'ntnamericas.com',
  DODGE: 'dodgeindustrial.com',
  BROWNING: 'baldor.com',
  BALDOR: 'baldor.com',
  GARLOCK: 'garlock.com',
  GATES: 'gates.com',
  'GENERAL ELECTRIC': 'ge.com',
  GERBING: 'gerbing.com',
  CRAFT: 'craftbearing.com',
  DAYCO: 'dayco.com',
  DUNLOP: 'dunlopbelting.com',
  DYNACORE: 'flexco.com',
  DYNACORP: 'dyn-intl.com',
  ELECTROID: 'electroid.com',
  FENNAR: 'fennerppd.com',
  'FITTINGS UNLIMITED': 'myfui.com',
  FORBO: 'forbo.com',
  FORMSPRAG: 'formsprag.com',
  FYH: 'fyh.com',
  REXNORD: 'rexnord.com',
  REX: 'rexindustrial.com',
  LOVEJOY: 'timken.com',
  MARTIN: 'martinsprocket.com',
  HEIM: 'rbcbearings.com',
  HEPA: 'hepafiltersales.com',
  'HEWITT ROBINS': 'hewittrobins.com',
  'HITACHI MAXCO': 'hitachi.com',
  HKK: 'hkkchain.com',
  HORTON: 'hortonsupply.com',
  'HOSE & FITTINGS': 'ghxinc.com',
  'HUB CITY': 'regalrexnord.com',
  IDC: 'idcind.com',
  IKO: 'ikont.co.jp',
  INA: 'schaeffler.com',
  IWIS: 'iwis.com',
  INTEROLL: 'interroll.com',
  INTERROLL: 'interroll.com',
  INTRALOX: 'intralox.com',
  JEFFREY: 'jeffreymachine.com',
  KEYSTONE: 'lubricants.totalenergies.com',
  'KOP FLEX': 'kopflex.com',
  LINCOLN: 'orderlincoln.com',
  KOYO: 'koyo.com',
  'LINN GEAR': 'linngear.com',
  'LOCKNUTS & WASHERS': 'stdlocknut.com',
  LUBRIKO: 'pack-logix.com',
  LUBRIPLATE: 'lubriplate.com',
  MAGNETEK: 'cmco.com',
  MCGILL: 'mcgillbearings.com',
  MASKA: 'abb.com',
  MAUREY: 'maurey.biz',
  'MFD PNEUMATIC VALVES': 'bimba.com',
  MOBIL: 'mobil.com',
  MOLINE: 'molinebearing.com',
  MORSE: 'morseindustries.com',
  NACHI: 'nachi.com',
  NATIONAL: 'skf.com',
  'NATIONAL ROD ENDS': 'nationalrodends.com',
  'NEVER SEEZ': 'bostik.com',
  NOK: 'nok.com',
  NORGREN: 'norgren.com',
  'O RINGS': 'oringslimited.co.uk',
  'OIL RITE': 'oilrite.com',
  OILITE: 'oilite.com',
  OMEGA: 'onlyomega.com',
  'OSHKOSH AEROTECH': 'oshkoshaerotech.com',
  'OWATONNA TOOL': 'otctools.com',
  'PACIFIC BEARING': 'pacificbearing.com',
  'PAGE (LEATHER)': 'pagebelting.com',
  'PNEUFORCE / VACUFORCE': 'pneuforce.com',
  PRECISION: 'precisionindustrialproducts.com',
  RAMSEY: 'ramsey.com',
  RANDALL: 'randallbearings.com',
  REELCRAFT: 'reelcraft.com',
  RELIANCE: 'ril.com',
  ROLLWAY: 'rbcbearings.com',
  ROYERSFORD: 'royersford.com',
  RTI: 'rti-industries.com',
  RBC: 'rbcbearings.com',
  SCHATZ: 'rbcbearings.com',
  SCHMIDT: 'zero-max.com',
  'SEW EURODRIVES': 'sew-eurodrive.com',
  SIEMENS: 'siemens.com',
  SIERRATH: 'sierradistributors.com',
  'STAR LINEAR': 'boschrexroth.com',
  'STARCYL CYLINDERS': 'starcyl.com',
  STEARNS: 'stearnsbrakes.com',
  'STEPHENS ADAMSON': 'syntronmh.com',
  SUMITOMO: 'sumitomo.com',
  SUPERIOR: 'superiorindsupply.com',
  ULPA: 'hepafiltersales.com',
  UNION: 'unionindustrialsupply.com',
  'US SEAL': 'ussealmfg.com',
  UST: 'ustpower.com',
  'VAN GORP': 'ppi-global.com',
  WALDRON: 'regalrexnord.com',
  WARNER: 'warrenelectric.com',
  WHITNEY: 'renoldjeffrey.com',
  'WIRE MESH BELTS': 'wiremeshproducts.com',
  YAMADA: 'yamadapump.com',
  ZURN: 'zurn.com',
  FALK: 'rexnord.com',
  'TB WOODS': 'tbwoods.com',
  TCM: 'nok.com',
  THOMAS: 'thomasindustrialsupply.com',
  THOMSON: 'thomsonlinear.com',
  'LINK-BELT': 'linkbelt.com',
  BANDO: 'bandousa.com',
  BOSTON: 'bostongear.com',
  'BAGEL BELTING': 'belting.co.za',
  'BISHOP WISECARVER': 'bwc.com',
  'COTTON BELTING': 'vaughnbelting.com',
  'FOOD BELTING': 'habasit.com',
  RENOLD: 'renold.com',
  RINGSPAN: 'ringspann.com',
  DIAMOND: 'diamondchain.com',
};

const BRAND_ALIASES: Record<string, string> = {
  TIMKEN: 'TIMKEN TORRINGTON',
  'TB WOODS': 'TB WOODS',
  RINGSPANN: 'RINGSPAN',
  'COTTON BELT': 'COTTON BELTING',
  'BRECO FLEX': 'BRECOFLEX',
  'FORBO-SIEGLING': 'FORBO',
  'FORBO SIEGLING': 'FORBO',
  FENNER: 'FENNAR',
  'SEW EURODRIVE': 'SEW EURODRIVES',
  'LINN GEAR CO': 'LINN GEAR',
  'LINN GEAR CO.': 'LINN GEAR',
  'WD-40': 'WD40',
  'WD 40': 'WD40',
  LEESON: 'LEESON ELECTRIC',
  'U.S. ELECTRIC': 'US ELECTRIC',
  'U S ELECTRIC': 'US ELECTRIC',
  'U.S. SEAL': 'US SEAL',
  'U S SEAL': 'US SEAL',
  AB: 'ALLEN BRADLEY',
  HFI: 'HOSE & FITTINGS',
  'HOSE AND FITTINGS': 'HOSE & FITTINGS',
  'LOCK NUTS & WASHERS': 'LOCKNUTS & WASHERS',
  'LOCK NUTS AND WASHERS': 'LOCKNUTS & WASHERS',
  'LOCKNUTS AND WASHERS': 'LOCKNUTS & WASHERS',
  'MARTIN TOOLS': 'MARTIN',
  'LINK BELT': 'LINK-BELT',
  'RANDALL INDUSTRIES': 'RANDALL',
  PNEUFORCE: 'PNEUFORCE / VACUFORCE',
  VACUFORCE: 'PNEUFORCE / VACUFORCE',
  'AIRPIPE USA': 'AIR PIPE USA',
  'AIR-PIPE USA': 'AIR PIPE USA',
};

function normalizeBrandKey(raw: string) {
  const upper = raw.trim().toUpperCase();
  const normalized = upper.replace(/[._-]/g, ' ').replace(/\s+/g, ' ').trim();
  return BRAND_ALIASES[normalized] ?? normalized;
}

function getBrandLogoSources(brand: string) {
  const key = normalizeBrandKey(brand);
  const primary = BRAND_LOGO_ORIGINALS[key];
  const domain = BRAND_LOGO_DOMAINS[key] ?? BRAND_LOGO_DOMAINS[brand.toUpperCase()];
  const fallback = domain
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`
    : null;
  return [primary, fallback].filter(Boolean) as string[];
}

const GLANCE_ITEMS = [
  'NYC Certified Minority Business Enterprise (MBE)',
  'Bulk quotes & multi-line custom sourcing',
  'NYS / NYC & national procurement programs',
  '24–48 hour quote turnaround standard',
  'Compliant documentation for public-sector orders',
  '20+ product lines — bearings, drives, couplings & more',
];

const FEATURED_CATEGORIES = PRODUCT_CATEGORIES.slice(0, 6);

import { useSEO } from '../lib/useSEO';

export default function Home() {
  const { toggleProduct, isSelected } = useBulkQuote();
  const [toast, setToast] = useState<{ msg: string; type: 'add' | 'remove' } | null>(null);

  const handleBrandClick = (brandLabel: string) => {
    const normalized = brandLabel.toUpperCase();
    for (const cat of PRODUCT_CATEGORIES) {
      for (const product of cat.products) {
        const match = product.brands.some(
          (b) => b.toUpperCase().includes(normalized) || normalized.includes(b.toUpperCase())
        );
        if (match) {
          const wasSelected = isSelected(cat.id, product.id);
          toggleProduct(cat.id, product.id);
          setToast({
            msg: wasSelected
              ? `${brandLabel} removed from quote`
              : `${brandLabel} — ${cat.name} added to quote`,
            type: wasSelected ? 'remove' : 'add',
          });
          setTimeout(() => setToast(null), 2800);
          return;
        }
      }
    }
  };

  useSEO({
    title: 'Industrial Sourcing & Bulk Procurement — Ronkonkoma, NY',
    description: 'Forez is a NYC Certified MBE industrial distributor. We specialize in bulk procurement, custom sourcing, and rapid fulfillment of bearings, power transmission, drives, couplings, and MRO products nationwide.',
    path: '/',
    keywords: 'industrial distributor Long Island, bearing supplier New York, MRO procurement NY, bulk industrial supply, certified MBE supplier',
    breadcrumbs: [],
  });
  const totalProducts = PRODUCT_CATEGORIES.reduce((count, cat) => count + cat.products.length, 0);

  return (
    <div className="w-full bg-white font-sans">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[52vh] w-full items-center overflow-hidden bg-slate-950 md:min-h-[58vh]">
        {/* bg image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/02/25/14/68/360_F_225146875_pHG2NHqEtgRUNcvTOAWKmIn8DrW2wHVb.jpg')" }}
          aria-hidden
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-slate-950/55" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-transparent" aria-hidden />

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
          <div className="flex max-w-2xl flex-col gap-6 lg:max-w-3xl">

            {/* headline */}
            <div>
              <h1 className="font-display text-[2.6rem] font-black uppercase leading-[1.0] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Quality.{' '}
                <span className="text-industrial-orange">Speed.</span>
                <br />
                Reliability.
              </h1>
              <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
                Forez is a certified MBE industrial distributor specializing in procurement, custom sourcing, and rapid fulfillment of power transmission and MRO products.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/sourcing"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-industrial-orange px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_8px_28px_-6px_rgba(59,130,246,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgba(59,130,246,0.65)]"
              >
                Request a Bulk Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                to="/catalog"
                className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-white/25 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/8"
              >
                <LayoutGrid className="h-4 w-4" />
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <section className="w-full border-y border-slate-800 bg-slate-900">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-slate-700/60 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 md:px-10">
          {[
            { Icon: Boxes, value: `${totalProducts}+`, label: 'Quote-Ready SKUs' },
            { Icon: Truck, value: '20+', label: 'Top Brands Sourced' },
            { Icon: Clock, value: '24–48 HR', label: 'Quote Turnaround' },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 py-4 text-left sm:justify-center sm:gap-4 sm:px-6 sm:py-6 md:px-10">
              <Icon className="h-5 w-5 shrink-0 text-industrial-orange sm:h-6 sm:w-6" />
              <div>
                <p className="text-lg font-black leading-none text-white sm:text-3xl">{value}</p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-[10px]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────── */}
      <section className="w-full bg-white px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16" data-reveal>
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">What We Do</p>
          <h2 className="mb-8 font-display text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
            Three Ways We Deliver
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SERVICES.map(({ Icon, title, desc, cta, href, iconBg, border }) => (
              <div
                key={title}
                className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${border}`}
                data-reveal
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} text-white shadow`}>
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mb-3 font-display text-base font-black uppercase tracking-tight text-slate-900">{title}</h3>
                <p className="flex-1 text-sm font-medium leading-relaxed text-slate-500">{desc}</p>
                <Link
                  to={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase text-industrial-orange transition-colors hover:text-engineering-blue"
                >
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCT CATEGORIES ───────────────────────────── */}
      <section className="w-full bg-slate-50 px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">Product Lines</p>
              <h2 className="font-display text-xl font-black uppercase tracking-tight text-slate-900 sm:text-2xl">
                Featured Categories
              </h2>
              <p className="mt-1 max-w-xl text-[11px] font-medium leading-relaxed text-slate-500 sm:text-xs">
                Browse our most-requested product lines — all available for bulk quote.
              </p>
            </div>
            <Link
              to="/catalog"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              View All
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3 md:grid-cols-6 md:gap-3">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.id}`}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={getCategoryPreviewImage(cat)}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                    }}
                  />
                </div>
                {/* overlay on hover */}
                <div className="absolute inset-0 bg-industrial-orange/0 transition-colors duration-300 group-hover:bg-industrial-orange/8" aria-hidden />
                <div className="flex items-center justify-between p-2 sm:p-2.5">
                  <div>
                    <p className="text-[9px] font-black uppercase leading-tight tracking-wide text-slate-900 sm:text-[11px]">{cat.name}</p>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-[8px] font-bold uppercase text-industrial-orange sm:text-[9px]">
                      View line <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 transition group-hover:border-industrial-orange/30 group-hover:bg-industrial-orange/8">
                    <ArrowRight className="h-2.5 w-2.5 text-slate-400 transition group-hover:text-industrial-orange" aria-hidden />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES SERVED ─────────────────────────────────────── */}
      <section className="w-full bg-slate-950 px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12" data-reveal>
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">Markets</p>
          <h2 className="mb-2 font-display text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            Industries We Serve
          </h2>
          <p className="mb-6 max-w-2xl text-xs font-medium leading-relaxed text-slate-400 sm:text-sm">
            From NYC infrastructure to national operations — our product lines and sourcing capabilities are built for the industries that can't afford downtime.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {INDUSTRIES.map(({ icon, label }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-3 py-5 text-center transition hover:border-industrial-orange/30 hover:bg-white/8"
                data-reveal
              >
                <img
                  src={icon}
                  alt={label}
                  className="h-12 w-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <p className="text-[9px] font-bold uppercase leading-snug tracking-wide text-slate-300 sm:text-[11px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS WE SOURCE ──────────────────────────────────────── */}
      <section className="w-full overflow-hidden border-y border-slate-100 bg-white px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14" data-reveal>
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-industrial-orange sm:text-xs">Our Network</p>
          <h2 className="mb-3 font-display text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
            Brands We Source
          </h2>
          <p className="mb-10 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
            We represent and source from the world-class manufacturers that define industrial reliability — ensuring product authenticity, availability, and compliance.
          </p>
          {/* scrolling ticker */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
            <div className="group flex overflow-hidden">
              <div className="animate-marquee-slow flex shrink-0 gap-3 group-hover:[animation-play-state:paused]">
                {[...FEATURED_BRANDS, ...FEATURED_BRANDS].map((brand, i) => (
                  <button
                    key={`${brand}-${i}`}
                    type="button"
                    onClick={() => handleBrandClick(brand)}
                    className="inline-flex min-w-[14rem] shrink-0 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 text-center shadow-sm transition duration-200 hover:border-industrial-orange/50 hover:bg-industrial-orange/8 hover:text-industrial-orange active:scale-95"
                  >
                    <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white text-xl font-black text-slate-500">
                      <span aria-hidden>{brand.slice(0, 1)}</span>
                      {getBrandLogoSources(brand)[0] && (
                        <img
                          src={getBrandLogoSources(brand)[0]}
                          alt={`${brand} logo`}
                          className="absolute inset-0 h-full w-full object-contain p-2"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const fallback = getBrandLogoSources(brand)[1];
                            if (fallback && e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                              return;
                            }
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </span>
                    <span className="text-xl font-black uppercase leading-tight tracking-wide text-slate-800">
                      {brand}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT FOREZ ───────────────────────────────────────────── */}
      <section className="w-full bg-slate-50 px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
            {/* left: copy */}
            <div className="flex flex-col justify-center">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm sm:p-7 md:p-8">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-sky-700 sm:text-xs">Our Company</p>
                <h2 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
                  Why Forez
                </h2>
                <div className="space-y-4 text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                  <p>
                    We do the legwork so you don't have to. You don't need the exact part number — just tell us what you need. We'll identify the right fit, source it, and get it to you fast. We know bearings and power transmission at the application level, not just the catalog level. Right part, first time, no back and forth.
                  </p>
                  <p>
                    As a certified MBE, we simplify diverse spend compliance without adding procurement friction.
                  </p>
                </div>
                <Link
                  to="/about"
                  className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl border-2 border-sky-700 px-5 py-3 text-xs font-black uppercase tracking-wide text-sky-800 transition hover:bg-sky-700 hover:text-white"
                >
                  Full credentials &amp; story
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </div>
            {/* right: image + checklist card */}
            <aside className="flex flex-col gap-5 md:self-start">
              {/* MBE logo */}
              <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-6 shadow-sm">
                <img
                  src="/nyc-certified-mbe.png"
                  alt="NYC Certified Minority Business Enterprise"
                  className="h-20 w-auto max-w-[160px] scale-110 object-contain sm:h-24 md:h-28"
                />
              </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">At a Glance</p>
              <ul className="space-y-4">
                {GLANCE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-industrial-orange/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-industrial-orange" />
                    </div>
                    <span className="text-sm font-semibold leading-snug text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── QUOTE CTA BANNER ──────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14" data-reveal>
        {/* subtle bg texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.12),transparent_65%)]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-industrial-orange/30 bg-industrial-orange/10 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-industrial-orange" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-industrial-orange">Certified MBE · Nationwide Fulfillment</span>
              </div>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Ready to Get<br className="hidden sm:block" /> Supplied?
              </h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
                Submit a bulk quote request or browse the catalog — our team responds within 24 hours.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/sourcing"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-industrial-orange px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_8px_28px_-6px_rgba(59,130,246,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgba(59,130,246,0.65)]"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-white/20 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:border-white/40 hover:bg-white/8"
              >
                <LayoutGrid className="h-4 w-4" />
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

