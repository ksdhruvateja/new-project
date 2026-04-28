import React, { useMemo } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ChevronRight, Check, X } from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  MISCELLANEOUS_SUB_PRODUCTS,
  getProductImage,
  FALLBACK_PRODUCT_IMAGE,
  type Product,
  type Category,
} from '../constants';
import { cn } from '../lib/utils';
import { useBulkQuote } from '../context/BulkQuoteContext';

const MANUAL_QUOTE_REQUESTS_KEY = 'forez-manual-quote-requests';

type PendingManualQuoteItem = {
  name: string;
  type: string;
  dimensions: string;
  qty: number;
};

const BRAND_LOGO_ORIGINALS: Record<string, string> = {
  AETNA: '/brand-logos/aetna.png',
  'AIR PIPE USA': '/brand-logos/air-pipe-usa.png',
  ALEMITE: '/brand-logos/alemite.png',
  'ALLEN BRADLEY': '/brand-logos/allen-bradley.png',
  'ALLIGATOR LACING': '/brand-logos/alligator-lacing.png',
  'CLIPPER LACING': '/brand-logos/clipper-lacing.png',
  'AMERICAN CYLINDER': '/brand-logos/american-cylinder.png',
  'AMERICAN PULLEY': '/brand-logos/american-pulley.png',
  AMERIDRIVES: '/brand-logos/ameridrives.png',
  AMI: '/brand-logos/ametric.png',
  AMETRIC: '/brand-logos/ametric.png',
  ABC: '/brand-logos/abc.png',
  BALDOR: '/brand-logos/baldor.png',
  BROWNING: '/brand-logos/browning.png',
  BARDEN: 'https://googleusercontent.com/image_collection/image_retrieval/235765848323273327_0',
  BANDO: '/brand-logos/bando.png',
  'BAGEL BELTING': '/brand-logos/bagel-belting.png',
  'BISHOP WISECARVER': '/brand-logos/bishop-wisecarver.png',
  'BIMBA CYLINDERS': '/brand-logos/bimba-cylinders.png',
  'COTTON BELTING': '/brand-logos/cotton-belting.png',
  'FOOD BELTING': '/brand-logos/food-belting.svg',
  BRECOFLEX: '/brand-logos/brecoflex.png',
  BRYANT: '/brand-logos/bryant.png',
  'BREWER TENSIONERS': '/brand-logos/brewer-tensioners.png',
  MARTIN: '/brand-logos/martin.png',
  LOVEJOY: '/brand-logos/lovejoy.png',
  'RBC/BOER': '/brand-logos/rbc-boer.png',
  BOSTON: '/brand-logos/boston.png',
  'BOSTON GEAR': '/brand-logos/boston-gear.png',
  CARTER: 'https://googleusercontent.com/image_collection/image_retrieval/16370269764176563832_0',
  'CAST BRONZE': 'https://googleusercontent.com/image_collection/image_retrieval/4762083334325161740_0',
  'CHICAGO RAWHIDE': '/brand-logos/chicago-rawhide.png',
  COILHOSE: '/brand-logos/coilhose.png',
  CRAFT: '/brand-logos/craft.png',
  DAYCO: '/brand-logos/dayco.png',
  DIAMOND: '/brand-logos/diamond.png',
  DODGE: 'https://googleusercontent.com/image_collection/image_retrieval/5409773030784320301_0',
  DUNLOP: '/brand-logos/dunlop.png',
  DYNACORE: '/brand-logos/dynacore.png',
  DYNACORP: '/brand-logos/dyncorp.png',
  ELECTROID: '/brand-logos/electroid.png',
  FAFNIR: 'https://googleusercontent.com/image_collection/image_retrieval/7136702197155688076_0',
  FAG: '/brand-logos/fag.png',
  FALK: '/brand-logos/falk.png',
  FENNAR: '/brand-logos/fenner.png',
  'FITTINGS UNLIMITED': '/brand-logos/fittings-unlimited.png',
  FORBO: '/brand-logos/forbo.png',
  FRANTZ: 'https://googleusercontent.com/image_collection/image_retrieval/6765249857330761910_0',
  FORMSPRAG: '/brand-logos/formsprag.png',
  FYH: '/brand-logos/fyh.png',
  GARLOCK: '/brand-logos/garlock.png',
  GATES: '/brand-logos/gates.png',
  'GENERAL BEARING': 'https://googleusercontent.com/image_collection/image_retrieval/16388918967236194207_0',
  'GENERAL ELECTRIC': '/brand-logos/general-electric.png',
  GERBING: '/brand-logos/gerbing.png',
  HEIM: '/brand-logos/heim.png',
  HEPA: '/brand-logos/hepa.png',
  'HEWITT ROBINS': '/brand-logos/hewitt-robins.png',
  'HITACHI MAXCO': '/brand-logos/hitachi-maxco.png',
  HKK: '/brand-logos/hkk.png',
  HORTON: '/brand-logos/horton.png',
  'HOSE & FITTINGS': '/brand-logos/hose-fittings.png',
  'HOOVER/NSK': 'https://googleusercontent.com/image_collection/image_retrieval/4062728077605395253_0',
  'HUB CITY': '/brand-logos/hub-city.png',
  IDC: '/brand-logos/idc.png',
  IKO: '/brand-logos/iko.png',
  INA: '/brand-logos/ina.png',
  IWIS: '/brand-logos/iwis.png',
  INTRALOX: '/brand-logos/intralox.png',
  INTEROLL: '/brand-logos/interroll.png',
  INTERROLL: '/brand-logos/interroll.png',
  IGUS: 'https://googleusercontent.com/image_collection/image_retrieval/2480654692382317293_0',
  IPTCI: 'https://googleusercontent.com/image_collection/image_retrieval/15115735719352158151_0',
  JEFFREY: '/brand-logos/jeffrey.png',
  KAYDON: 'https://googleusercontent.com/image_collection/image_retrieval/1322824959038992030_0',
  KEYSTONE: '/brand-logos/keystone.png',
  KILIAN: 'https://googleusercontent.com/image_collection/image_retrieval/3694565903079494524_0',
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
  MRC: 'https://googleusercontent.com/image_collection/image_retrieval/1135088581513331799_0',
  NACHI: '/brand-logos/nachi.png',
  NATIONAL: '/brand-logos/national-seals.png',
  'NATIONAL ROD ENDS': '/brand-logos/national-rod-ends.png',
  'NEVER SEEZ': '/brand-logos/never-seez.png',
  NICE: 'https://googleusercontent.com/image_collection/image_retrieval/16203807994414535688_0',
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
  REX: '/brand-logos/rex.png',
  RINGSPAN: '/brand-logos/ringspann.png',
  ROLLWAY: '/brand-logos/rollway.png',
  ROYERSFORD: '/brand-logos/royersford.png',
  RTI: '/brand-logos/rti.png',
  RBC: '/brand-logos/rbc.png',
  SCHATZ: '/brand-logos/schatz.png',
  SCHMIDT: '/brand-logos/schmidt.png',
  SEALMASTER: 'https://googleusercontent.com/image_collection/image_retrieval/7996261573241369145_0',
  'SEW EURODRIVES': '/brand-logos/sew-eurodrive.png',
  SIEMENS: '/brand-logos/siemens.png',
  SIERRATH: '/brand-logos/sierrath.png',
  SKF: 'https://googleusercontent.com/image_collection/image_retrieval/2947497633612133775_0',
  'SKF MAINTENANCE': '/brand-logos/skf-maintenance.png',
  'SKF/LINCOLN': '/brand-logos/skf-lincoln.png',
  SMITH: 'https://googleusercontent.com/image_collection/image_retrieval/18363234409768608943_0',
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
  'TIMKEN TORRINGTON': 'https://googleusercontent.com/image_collection/image_retrieval/3366957255698520401_0',
  ZURN: '/brand-logos/zurn.png',
};

const BRAND_LOGO_DOMAINS: Record<string, string> = {
  AETNA: 'aetnabearing.com',
  'AIR PIPE USA': 'airpipeusa.com',
  ALEMITE: 'skf.com',
  'ALLEN BRADLEY': 'rockwellautomation.com',
  'ALLIGATOR LACING': 'flexco.com',
  'CLIPPER LACING': 'flexco.com',
  'AMERICAN CYLINDER': 'americancylinder.com',
  'AMERICAN PULLEY': 'americanpulley.com',
  AMERIDRIVES: 'ameridrives.com',
  AMI: 'asahiamerica.com',
  AMETRIC: 'ametric.com',
  ABC: 'abcbearings.com',
  BALDOR: 'baldor.com',
  BROWNING: 'baldor.com',
  BARDEN: 'bardenbearings.com',
  BANDO: 'bandousa.com',
  'BAGEL BELTING': 'belting.co.za',
  'BISHOP WISECARVER': 'bwc.com',
  'BIMBA CYLINDERS': 'bimba.com',
  'COTTON BELTING': 'vaughnbelting.com',
  'FOOD BELTING': 'habasit.com',
  BRECOFLEX: 'brecoflex.com',
  BRYANT: 'bryantpipe.com',
  'RBC/BOER': 'rbcbearings.com',
  BOSTON: 'bostongear.com',
  'BOSTON GEAR': 'bostongear.com',
  CARTER: 'carterbearings.com',
  'CAST BRONZE': 'castbronze.com',
  'CHICAGO RAWHIDE': 'skf.com',
  COILHOSE: 'coilhose.com',
  CRAFT: 'craftbearing.com',
  DAYCO: 'dayco.com',
  DIAMOND: 'diamondchain.com',
  DODGE: 'dodgeindustrial.com',
  DUNLOP: 'dunlopbelting.com',
  DYNACORE: 'flexco.com',
  DYNACORP: 'dyn-intl.com',
  ELECTROID: 'electroid.com',
  FAFNIR: 'timken.com',
  FAG: 'schaeffler.com',
  FALK: 'rexnord.com',
  FENNAR: 'fennerppd.com',
  'FITTINGS UNLIMITED': 'myfui.com',
  FORBO: 'forbo.com',
  FRANTZ: 'frantz-mfg.com',
  FORMSPRAG: 'formsprag.com',
  FYH: 'fyh.com',
  GARLOCK: 'garlock.com',
  GATES: 'gates.com',
  'GENERAL BEARING': 'generalbearing.com',
  'GENERAL ELECTRIC': 'ge.com',
  GERBING: 'gerbing.com',
  HEIM: 'rbcbearings.com',
  HEPA: 'hepafiltersales.com',
  'HEWITT ROBINS': 'hewittrobins.com',
  'HITACHI MAXCO': 'hitachi.com',
  HKK: 'hkkchain.com',
  HORTON: 'hortonsupply.com',
  'HOSE & FITTINGS': 'ghxinc.com',
  'HOOVER/NSK': 'nsk.com',
  'HUB CITY': 'regalrexnord.com',
  IDC: 'idcind.com',
  IKO: 'ikont.co.jp',
  INA: 'schaeffler.com',
  IWIS: 'iwis.com',
  INTRALOX: 'intralox.com',
  INTEROLL: 'interroll.com',
  INTERROLL: 'interroll.com',
  IGUS: 'igus.com',
  IPTCI: 'iptci.com',
  JEFFREY: 'jeffreymachine.com',
  KAYDON: 'kaydonbearings.com',
  KEYSTONE: 'lubricants.totalenergies.com',
  KILIAN: 'kilianbearings.com',
  'KOP FLEX': 'kopflex.com',
  'LEESON ELECTRIC': 'regalrexnord.com',
  LINCOLN: 'orderlincoln.com',
  'LINK-BELT': 'linkbelt.com',
  KOYO: 'koyo.com',
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
  MRC: 'skf.com',
  NACHI: 'nachi.com',
  NATIONAL: 'skf.com',
  'NATIONAL ROD ENDS': 'nationalrodends.com',
  'NEVER SEEZ': 'bostik.com',
  NICE: 'skf.com',
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
  RENOLD: 'renold.com',
  REX: 'rexindustrial.com',
  RINGSPAN: 'ringspann.com',
  ROLLWAY: 'rbcbearings.com',
  ROYERSFORD: 'royersford.com',
  RTI: 'rti-industries.com',
  RBC: 'rbcbearings.com',
  SCHATZ: 'rbcbearings.com',
  SCHMIDT: 'zero-max.com',
  SEALMASTER: 'sealmaster.net',
  'SEW EURODRIVES': 'sew-eurodrive.com',
  SIEMENS: 'siemens.com',
  SIERRATH: 'sierradistributors.com',
  SKF: 'skf.com',
  'SKF MAINTENANCE': 'skf.com',
  'SKF/LINCOLN': 'orderlincoln.com',
  SMITH: 'smithbearing.com',
  'STAR LINEAR': 'boschrexroth.com',
  'STARCYL CYLINDERS': 'starcyl.com',
  STEARNS: 'stearnsbrakes.com',
  'STEPHENS ADAMSON': 'syntronmh.com',
  SUMITOMO: 'sumitomo.com',
  SUPERIOR: 'superiorindsupply.com',
  'TB WOODS': 'tbwoods.com',
  TCM: 'nok.com',
  THOMAS: 'thomasindustrialsupply.com',
  THOMSON: 'thomsonlinear.com',
  ULPA: 'hepafiltersales.com',
  UNION: 'unionindustrialsupply.com',
  'US ELECTRIC': 'uselectric.com',
  'US SEAL': 'ussealmfg.com',
  UST: 'ustpower.com',
  'VAN GORP': 'ppi-global.com',
  WALDRON: 'regalrexnord.com',
  WARNER: 'warrenelectric.com',
  WD40: 'wd40.com',
  WHITNEY: 'renoldjeffrey.com',
  'WIRE MESH BELTS': 'wiremeshproducts.com',
  YAMADA: 'yamadapump.com',
  'TIMKEN TORRINGTON': 'timken.com',
  ZURN: 'zurn.com',
};

const BRAND_ALIASES: Record<string, string> = {
  BOER: 'RBC/BOER',
  'RBC BOER': 'RBC/BOER',
  'RBC / BOER': 'RBC/BOER',
  HOOVER: 'HOOVER/NSK',
  NSK: 'HOOVER/NSK',
  'TIMKEN': 'TIMKEN TORRINGTON',
  'TORRINGTON': 'TIMKEN TORRINGTON',
  'TIMKEN/TORRINGTON': 'TIMKEN TORRINGTON',
  'TIMKEN TORRINGTON': 'TIMKEN TORRINGTON',
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

function normalizeBrandKey(rawBrand: string) {
  const upper = rawBrand.trim().toUpperCase();
  if (BRAND_ALIASES[upper]) return BRAND_ALIASES[upper];
  const normalized = upper.replace(/[._-]/g, ' ').replace(/\s+/g, ' ').trim();
  if (BRAND_ALIASES[normalized]) return BRAND_ALIASES[normalized];
  return normalized;
}

function getBrandFallbackLogoUrl(brand: string) {
  const key = normalizeBrandKey(brand);
  const domain = BRAND_LOGO_DOMAINS[key];
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

function getBrandLogoSources(brand: string) {
  const key = normalizeBrandKey(brand);
  const primary = BRAND_LOGO_ORIGINALS[key];
  const fallback = getBrandFallbackLogoUrl(brand);
  return [primary, fallback].filter(Boolean) as string[];
}

function productKey(categoryId: string, productId: string) {
  return `${categoryId}::${productId}`;
}

/** Case-insensitive partial match across category, product line, ids, and brands. */
function entryMatchesCatalogSearch(
  category: Category,
  product: Product,
  query: string
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const fields = [category.name, category.id, product.name, product.id, ...product.brands];
  if (category.id === 'miscellaneous' && product.id === 'miscellaneous-line') {
    for (const sub of MISCELLANEOUS_SUB_PRODUCTS) {
      fields.push(sub.name, sub.id, ...sub.brands);
    }
  }
  return fields.some((f) => f.toLowerCase().includes(q));
}

/** Flat list preserving category order: one entry per product line (catalog card). */
function getCatalogEntries(
  catalogSearch: string
): { category: Category; product: Product }[] {
  const out: { category: Category; product: Product }[] = [];
  for (const cat of PRODUCT_CATEGORIES) {
    for (const product of cat.products) {
      if (!entryMatchesCatalogSearch(cat, product, catalogSearch)) continue;
      out.push({ category: cat, product });
    }
  }
  return out;
}

import { useSEO } from '../lib/useSEO';

export default function Catalog() {
  useSEO({
    title: 'Product Catalog — Bearings, Drives, Couplings & MRO',
    description: 'Browse Forez\'s full industrial product catalog. Request bulk quotes on bearings, power transmission, belts, couplings, HVAC components, and more from top brands like SKF, Timken, NSK, and Gates.',
    path: '/catalog',
    keywords: 'industrial product catalog, buy bearings online, SKF Timken NSK bearings, power transmission products, buy couplings belts drives, MRO catalog New York',
    breadcrumbs: [{ name: 'Catalog', path: '/catalog' }],
  });
  const { categoryId } = useParams();
  const [catalogSearch, setCatalogSearch] = React.useState('');
  const { isSelected, toggleProduct, setQty, setRequestedBrands, itemCount, clearLines } = useBulkQuote();
  const navigate = useNavigate();
  const [activeBrandModal, setActiveBrandModal] = React.useState<{ category: Category; product: Product } | null>(null);
  const [brandLineSearch, setBrandLineSearch] = React.useState('');
  const [selectedByBrand, setSelectedByBrand] = React.useState<Record<string, boolean>>({});
  const [partNumberByBrand, setPartNumberByBrand] = React.useState<Record<string, string>>({});
  const [qtyByBrand, setQtyByBrand] = React.useState<Record<string, string>>({});
  const [miscModalOpen, setMiscModalOpen] = React.useState(false);
  const [miscLineSearch, setMiscLineSearch] = React.useState('');
  const [miscSelectedById, setMiscSelectedById] = React.useState<Record<string, boolean>>({});
  const [miscQtyById, setMiscQtyById] = React.useState<Record<string, string>>({});
  const [miscPartById, setMiscPartById] = React.useState<Record<string, string>>({});
  const [customQuoteToast, setCustomQuoteToast] = React.useState('');

  React.useEffect(() => {
    if (!customQuoteToast) return;
    const id = window.setTimeout(() => setCustomQuoteToast(''), 2200);
    return () => window.clearTimeout(id);
  }, [customQuoteToast]);

  const catalogEntries = useMemo(
    () => getCatalogEntries(catalogSearch),
    [catalogSearch]
  );

  const closeMiscModal = () => {
    setMiscModalOpen(false);
    setMiscLineSearch('');
    setMiscSelectedById({});
    setMiscQtyById({});
    setMiscPartById({});
  };

  const openMiscModal = () => {
    closeBrandModal();
    setMiscLineSearch('');
    setMiscSelectedById({});
    setMiscQtyById({});
    setMiscPartById({});
    setMiscModalOpen(true);
  };

  const openBrandModal = (category: Category, product: Product) => {
    closeMiscModal();
    setActiveBrandModal({ category, product });
    setBrandLineSearch('');
    setSelectedByBrand({});
    setPartNumberByBrand({});
    setQtyByBrand({});
  };

  const closeBrandModal = () => {
    setActiveBrandModal(null);
    setBrandLineSearch('');
    setSelectedByBrand({});
    setPartNumberByBrand({});
    setQtyByBrand({});
  };

  const addBrandsToQuote = (
    categoryId: string,
    productId: string,
    totalQty: number,
    requestedBrands: { brand: string; qty: number; partNumber?: string }[],
    redirect = false
  ) => {
    const safeQty = Math.max(1, Math.floor(totalQty) || 1);
    if (!isSelected(categoryId, productId)) {
      toggleProduct(categoryId, productId);
    }
    setQty(categoryId, productId, safeQty);
    setRequestedBrands(categoryId, productId, requestedBrands);
    if (redirect) {
      navigate('/sourcing');
    }
  };

  const queueManualCustomQuoteItem = (item: PendingManualQuoteItem) => {
    try {
      const raw = sessionStorage.getItem(MANUAL_QUOTE_REQUESTS_KEY);
      const parsed = raw ? (JSON.parse(raw) as PendingManualQuoteItem[]) : [];
      const list = Array.isArray(parsed) ? parsed : [];
      const exists = list.some(
        (entry) =>
          entry.name.trim().toLowerCase() === item.name.trim().toLowerCase() &&
          entry.type.trim().toLowerCase() === item.type.trim().toLowerCase()
      );
      if (exists) return;
      const next = [...list, item];
      sessionStorage.setItem(MANUAL_QUOTE_REQUESTS_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const filteredBrandLines = useMemo(() => {
    const q = brandLineSearch.trim().toLowerCase();
    const brands = activeBrandModal?.product.brands ?? [];
    if (!q) return brands;
    return brands.filter((brand) => brand.toLowerCase().includes(q));
  }, [activeBrandModal, brandLineSearch]);

  const selectedBrands = useMemo(
    () =>
      (activeBrandModal?.product.brands ?? []).filter((brand) => selectedByBrand[brand]),
    [activeBrandModal, selectedByBrand]
  );

  const selectedBrandDetails = useMemo(
    () =>
      selectedBrands.map((brand) => ({
        brand,
        qty: Math.max(0, Math.floor(Number(qtyByBrand[brand])) || 0),
        partNumber: partNumberByBrand[brand] ?? '',
      })),
    [selectedBrands, qtyByBrand, partNumberByBrand]
  );

  const canAddSelectedBrands =
    selectedBrandDetails.length > 0 && selectedBrandDetails.every((item) => item.qty > 0);

  const filteredMiscLines = useMemo(() => {
    const q = miscLineSearch.trim().toLowerCase();
    if (!q) return MISCELLANEOUS_SUB_PRODUCTS;
    return MISCELLANEOUS_SUB_PRODUCTS.filter(
      (sub) =>
        sub.name.toLowerCase().includes(q) ||
        sub.id.toLowerCase().includes(q) ||
        sub.brands.some((b) => b.toLowerCase().includes(q))
    );
  }, [miscLineSearch]);

  const selectedMiscSubs = useMemo(
    () => MISCELLANEOUS_SUB_PRODUCTS.filter((sub) => miscSelectedById[sub.id]),
    [miscSelectedById]
  );

  const miscSelectionDetails = useMemo(
    () =>
      selectedMiscSubs.map((sub) => ({
        sub,
        qty: Math.max(0, Math.floor(Number(miscQtyById[sub.id])) || 0),
        partNumber: miscPartById[sub.id] ?? '',
        brand: sub.brands[0] ?? '',
      })),
    [selectedMiscSubs, miscQtyById, miscPartById]
  );

  const canAddMiscSelections =
    miscSelectionDetails.length > 0 &&
    miscSelectionDetails.every((d) => d.brand && d.qty > 0);

  const addMiscSelectionsToQuote = (queueManualAndNavigate: boolean) => {
    if (!canAddMiscSelections) return;
    for (const d of miscSelectionDetails) {
      if (!d.brand || d.qty < 1) continue;
      const part = d.partNumber.trim();
      addBrandsToQuote(
        'miscellaneous',
        d.sub.id,
        d.qty,
        [{ brand: d.brand, qty: d.qty, partNumber: part }],
        false
      );
      if (queueManualAndNavigate) {
        queueManualCustomQuoteItem({
          name: d.sub.name,
          type: d.brand,
          dimensions: part ? `Part Number: ${part}` : '',
          qty: d.qty,
        });
      }
    }
    closeMiscModal();
    if (queueManualAndNavigate) {
      navigate('/sourcing?customAdded=1');
    }
  };

  if (categoryId) {
    return <Navigate to="/catalog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] pb-36">
      <div className="border-b border-zinc-800/10 bg-zinc-900 py-4 px-6 text-white md:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 sm:text-sm">
            <Link to="/" className="shrink-0 hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-zinc-600" />
            <span className="truncate text-zinc-300">Catalog</span>
          </div>
          <div className="relative flex w-full min-w-0 items-center border border-zinc-600 bg-zinc-800/50 px-3 py-2 sm:max-w-md sm:flex-1 sm:justify-end lg:w-72 lg:max-w-none lg:flex-none">
            <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
            <input
              type="search"
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              placeholder="Search products, categories, brands"
              autoComplete="off"
              aria-label="Search catalog by product name, category, or brand"
              className="min-w-0 flex-1 border-none bg-transparent text-xs font-semibold uppercase tracking-wider text-zinc-200 placeholder:text-zinc-600 outline-none"
            />
            {catalogSearch.trim() !== '' && (
              <button
                type="button"
                onClick={() => setCatalogSearch('')}
                className="ml-1 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-4 py-10 sm:px-6 md:flex-row md:gap-12 md:px-8 lg:px-12">
        <aside className="w-full shrink-0 space-y-8 md:w-72 lg:w-80">
          <div className="rounded-xl border border-zinc-800/10 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-zinc-900">Custom Procurement</h3>
            <p className="mb-5 text-xs font-medium leading-relaxed text-zinc-500">
              Need something not listed? We can help.
            </p>
            <Link
              to="/sourcing"
              className="block w-full rounded-lg border-2 border-zinc-900 bg-zinc-900 py-3 text-center text-xs font-black text-white transition-colors hover:bg-zinc-800"
            >
              Request Here
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-10">
            <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              Product catalog
            </h1>
          </header>

          {catalogEntries.length === 0 ? (
            <p className="rounded-xl border-2 border-dashed border-zinc-300 bg-white px-6 py-14 text-center text-sm font-semibold uppercase text-zinc-500">
              No lines match your search or brand filters. Clear the catalog search, brand selections, or try different
              keywords.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {catalogEntries.map(({ category, product }, idx) => (
                <React.Fragment key={productKey(category.id, product.id)}>
                  <CatalogProductCard
                    category={category}
                    product={product}
                    idx={idx}
                    onOpenBrands={() =>
                      category.id === 'miscellaneous' && product.id === 'miscellaneous-line'
                        ? openMiscModal()
                        : openBrandModal(category, product)
                    }
                    isSelected={
                      category.id === 'miscellaneous' && product.id === 'miscellaneous-line'
                        ? MISCELLANEOUS_SUB_PRODUCTS.some((s) => isSelected(category.id, s.id))
                        : isSelected(category.id, product.id)
                    }
                  />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeBrandModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-900/65 p-4" onClick={closeBrandModal}>
          <div
            className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-4 shadow-2xl sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={brandLineSearch}
                onChange={(e) => setBrandLineSearch(e.target.value)}
                placeholder="Search brand name"
                className="h-10 w-full rounded-md border border-zinc-200 bg-zinc-50 pl-8 pr-2 text-[10px] font-bold uppercase tracking-wide text-zinc-800 outline-none focus:border-zinc-400"
              />
            </div>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wide text-zinc-900">{activeBrandModal.product.name}</h4>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Select brands + optional part number and qty
                </p>
              </div>
              <button
                type="button"
                onClick={closeBrandModal}
                className="rounded-md border border-zinc-200 p-1.5 text-zinc-600 hover:bg-zinc-100"
                aria-label="Close brand selector"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[min(48vh,18rem)] space-y-2 overflow-y-auto pr-1">
              {filteredBrandLines.map((brand) => (
                <div key={brand} className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex items-center gap-2">
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-xs font-black uppercase text-zinc-500 overflow-hidden">
                      {brand.trim().toLowerCase() === 'cleveland' || brand.trim().toLowerCase() === 'clevland' ? (
                        <img
                          src="/images/cleveland-logo.png"
                          alt="Cleveland Supply logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase() === 'cone drive' ? (
                        <img
                          src="/images/cone-drive-logo.png"
                          alt="Cone Drive logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('eurodrive') ? (
                        <img
                          src="/images/eurodrive-logo.png"
                          alt="EURODRIVE logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('foote') && brand.trim().toLowerCase().includes('jones') ? (
                        <img
                          src="/images/foote-jones-logo.png"
                          alt="Foote-Jones logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('perfection') ? (
                        <img
                          src="/images/perfection-logo.png"
                          alt="Perfection logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('zero-max') || brand.trim().toLowerCase().includes('zero max') ? (
                        <img
                          src="/images/zero-max-logo.png"
                          alt="ZERO-MAX logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('stober') ? (
                        <img
                          src="/images/stober-logo.png"
                          alt="STOBER logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('hi-lo') || brand.trim().toLowerCase().includes('hi lo') ? (
                        <img
                          src="/images/hi-lo-logo.png"
                          alt="HI-LO logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('kb electronics') ? (
                        <img
                          src="/images/kb-electronics-logo.png"
                          alt="KB Electronics logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('speed selector') ? (
                        <img
                          src="/images/speed-selector-logo.png"
                          alt="Speed Selector logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('brewer tensioners') ? (
                        <img
                          src="/images/brewer-tensioners-logo.png"
                          alt="Brewer Tensioners logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('casters') && brand.trim().toLowerCase().includes('wheels') ? (
                        <img
                          src="/images/casters-wheels-logo.png"
                          alt="Casters and Wheels logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('hose') && brand.trim().toLowerCase().includes('fittings') ? (
                        <img
                          src="/images/hose-fittings-logo.png"
                          alt="Hose and Fittings logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('keystock') ? (
                        <img
                          src="/images/keystock-logo.png"
                          alt="Keystock logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('locknuts') && brand.trim().toLowerCase().includes('washers') ? (
                        <img
                          src="/images/locknuts-washers-logo.png"
                          alt="Locknuts and Washers logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('martin tools') ? (
                        <img
                          src="/images/martin-tools-logo.png"
                          alt="Martin Tools logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('never-seez') || brand.trim().toLowerCase().includes('never seez') ? (
                        <img
                          src="/images/never-seez-logo.png"
                          alt="Never-Seez logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('owatonna tool') ? (
                        <img
                          src="/images/owatonna-tool-logo.png"
                          alt="Owatonna Tool logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('post-lock') || brand.trim().toLowerCase().includes('post lock') ? (
                        <img
                          src="/images/post-lock-logo.png"
                          alt="Post-Lock logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('retaining rings') ? (
                        <img
                          src="/images/retaining-rings-logo.png"
                          alt="Retaining Rings logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('shafting') ? (
                        <img
                          src="/images/shafting-logo.png"
                          alt="Shafting logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('skf maintenance') ? (
                        <img
                          src="/images/skf-maintenance-logo.png"
                          alt="SKF Maintenance logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('oil') && brand.trim().toLowerCase().includes('mechanical seals') ? (
                        <img
                          src="/images/oil-mechanical-seals-logo.png"
                          alt="Oil and Mechanical Seals logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('bimba cylinders') ? (
                        <img
                          src="/images/bimba-cylinders-logo.png"
                          alt="BIMBA Cylinders logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : brand.trim().toLowerCase().includes('coilhose') ? (
                        <img
                          src="/images/coilhose-logo.png"
                          alt="COILHOSE logo"
                          className="h-full w-full bg-white object-contain p-1"
                          loading="lazy"
                        />
                      ) : (
                        <>
                          <span aria-hidden>{brand.slice(0, 1)}</span>
                          {getBrandLogoSources(brand)[0] && (
                            <img
                              src={getBrandLogoSources(brand)[0] ?? ''}
                              alt={`${brand} logo`}
                              className="absolute inset-0 m-auto h-full w-full bg-white object-contain p-1"
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
                        </>
                      )}
                    </span>
                    <span className="min-w-0 truncate text-[10px] font-bold uppercase text-zinc-800">{brand}</span>
                    </div>
                    <label className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white sm:h-7 sm:w-7">
                      <input
                        type="checkbox"
                        checked={!!selectedByBrand[brand]}
                        onChange={(e) =>
                          setSelectedByBrand((prev) => ({ ...prev, [brand]: e.target.checked }))
                        }
                        className="h-3.5 w-3.5 accent-zinc-900 sm:h-4 sm:w-4"
                        aria-label={`Select ${brand}`}
                      />
                    </label>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={partNumberByBrand[brand] ?? ''}
                      onChange={(e) =>
                        setPartNumberByBrand((prev) => ({ ...prev, [brand]: e.target.value }))
                      }
                      placeholder="Part Number (optional)"
                      className="h-8 rounded border border-zinc-300 bg-white px-2 text-[10px] font-bold uppercase text-zinc-800 outline-none focus:border-zinc-500"
                    />
                    <input
                      type="number"
                      min={1}
                      value={qtyByBrand[brand] ?? ''}
                      onChange={(e) =>
                        setQtyByBrand((prev) => ({ ...prev, [brand]: e.target.value }))
                      }
                      placeholder="Qty"
                      className="h-8 rounded border border-zinc-300 bg-white px-2 text-[10px] font-black text-zinc-800 outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              ))}
              {filteredBrandLines.length === 0 && (
                <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-3 py-3 text-center">
                  <p className="text-[10px] font-bold uppercase text-zinc-600">Brand not found</p>
                  <p className="mt-1 text-[10px] font-semibold text-zinc-500">
                    Do you want to add this brand under custom quote? Our team can check if we can arrange this product for you.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const requestedBrand = brandLineSearch.trim();
                      if (!requestedBrand) return;
                      queueManualCustomQuoteItem({
                        name: activeBrandModal.product.name,
                        type: requestedBrand,
                        dimensions: '',
                        qty: 1,
                      });
                      closeBrandModal();
                      setCustomQuoteToast('1 custom quote added to your request.');
                    }}
                    className="mt-2 rounded-md border-2 border-zinc-900 bg-white px-3 py-1.5 text-[10px] font-black uppercase text-zinc-900 transition-colors hover:bg-zinc-100"
                  >
                    Add this brand in custom quote
                  </button>
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-zinc-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] font-black uppercase tracking-wide text-zinc-700">
                Selected brands: {selectedBrands.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    addBrandsToQuote(
                      activeBrandModal.category.id,
                      activeBrandModal.product.id,
                      selectedBrandDetails.reduce((sum, entry) => sum + entry.qty, 0),
                      selectedBrandDetails,
                      false
                    );
                    closeBrandModal();
                  }}
                  disabled={!canAddSelectedBrands}
                  className={cn(
                    'rounded-md border-2 px-3 py-1.5 text-[10px] font-black uppercase transition-colors',
                    canAddSelectedBrands
                      ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800'
                      : 'cursor-not-allowed border-zinc-300 bg-zinc-200 text-zinc-500'
                  )}
                >
                  Add to quote
                </button>
                <button
                  type="button"
                  onClick={() =>
                    (() => {
                      const requested = selectedBrandDetails.filter((entry) => entry.qty > 0);
                      if (requested.length === 0) return;
                      addBrandsToQuote(
                        activeBrandModal.category.id,
                        activeBrandModal.product.id,
                        requested.reduce((sum, entry) => sum + entry.qty, 0),
                        requested,
                        false
                      );
                      requested.forEach((entry) => {
                        queueManualCustomQuoteItem({
                          name: activeBrandModal.product.name,
                          type: entry.brand,
                          dimensions: entry.partNumber ? `Part Number: ${entry.partNumber}` : '',
                          qty: entry.qty,
                        });
                      });
                      navigate('/sourcing?customAdded=1');
                    })()
                  }
                  disabled={!canAddSelectedBrands}
                  className={cn(
                    'rounded-md border-2 px-3 py-1.5 text-[10px] font-black uppercase transition-colors',
                    canAddSelectedBrands
                      ? 'border-zinc-900 bg-white text-zinc-900 hover:bg-zinc-100'
                      : 'cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-400'
                  )}
                >
                  Add to quote & request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {miscModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-900/65 p-4"
          onClick={closeMiscModal}
        >
          <div
            className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-4 shadow-2xl sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={miscLineSearch}
                onChange={(e) => setMiscLineSearch(e.target.value)}
                placeholder="Search product type"
                className="h-10 w-full rounded-md border border-zinc-200 bg-zinc-50 pl-8 pr-2 text-[10px] font-bold uppercase tracking-wide text-zinc-800 outline-none focus:border-zinc-400"
              />
            </div>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wide text-zinc-900">Miscellaneous</h4>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Select types, optional part number, and qty
                </p>
              </div>
              <button
                type="button"
                onClick={closeMiscModal}
                className="rounded-md border border-zinc-200 p-1.5 text-zinc-600 hover:bg-zinc-100"
                aria-label="Close miscellaneous picker"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[min(48vh,18rem)] space-y-2 overflow-y-auto pr-1">
              {filteredMiscLines.map((sub) => (
                <div key={sub.id} className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-[10px] font-bold uppercase text-zinc-800">
                      {sub.name}
                    </span>
                    <label className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white sm:h-7 sm:w-7">
                      <input
                        type="checkbox"
                        checked={!!miscSelectedById[sub.id]}
                        onChange={(e) =>
                          setMiscSelectedById((prev) => ({ ...prev, [sub.id]: e.target.checked }))
                        }
                        className="h-3.5 w-3.5 accent-zinc-900 sm:h-4 sm:w-4"
                        aria-label={`Select ${sub.name}`}
                      />
                    </label>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={miscPartById[sub.id] ?? ''}
                      onChange={(e) =>
                        setMiscPartById((prev) => ({ ...prev, [sub.id]: e.target.value }))
                      }
                      placeholder="Part Number (optional)"
                      className="h-8 rounded border border-zinc-300 bg-white px-2 text-[10px] font-bold uppercase text-zinc-800 outline-none focus:border-zinc-500"
                    />
                    <input
                      type="number"
                      min={1}
                      value={miscQtyById[sub.id] ?? ''}
                      onChange={(e) =>
                        setMiscQtyById((prev) => ({ ...prev, [sub.id]: e.target.value }))
                      }
                      placeholder="Qty"
                      className="h-8 rounded border border-zinc-300 bg-white px-2 text-[10px] font-black text-zinc-800 outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              ))}
              {filteredMiscLines.length === 0 && (
                <p className="py-4 text-center text-[10px] font-bold uppercase text-zinc-500">No types match</p>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-zinc-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] font-black uppercase tracking-wide text-zinc-700">
                Selected types: {selectedMiscSubs.length}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addMiscSelectionsToQuote(false)}
                  disabled={!canAddMiscSelections}
                  className={cn(
                    'rounded-md border-2 px-3 py-1.5 text-[10px] font-black uppercase transition-colors',
                    canAddMiscSelections
                      ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800'
                      : 'cursor-not-allowed border-zinc-300 bg-zinc-200 text-zinc-500'
                  )}
                >
                  Add to quote
                </button>
                <button
                  type="button"
                  onClick={() => addMiscSelectionsToQuote(true)}
                  disabled={!canAddMiscSelections}
                  className={cn(
                    'rounded-md border-2 px-3 py-1.5 text-[10px] font-black uppercase transition-colors',
                    canAddMiscSelections
                      ? 'border-zinc-900 bg-white text-zinc-900 hover:bg-zinc-100'
                      : 'cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-400'
                  )}
                >
                  Add to quote & request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {itemCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 z-50 w-full border-t-2 border-zinc-400 bg-zinc-200 py-5 px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:px-12"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white text-2xl font-black text-zinc-900">
                {itemCount}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-black uppercase leading-tight text-zinc-900 sm:text-xl">
                  Catalogue added
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={clearLines}
                className="rounded-lg border-2 border-zinc-900 bg-zinc-900 px-5 py-3 text-sm font-black uppercase text-white transition-colors hover:bg-zinc-800"
              >
                Clear
              </button>
              <Link
                to="/sourcing"
                className="rounded-lg border-2 border-zinc-900 bg-white px-8 py-3 text-center text-sm font-black uppercase text-zinc-900 shadow-sm transition-transform hover:-translate-y-0.5 sm:text-base"
              >
                Request quote
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {customQuoteToast && (
        <div className="fixed bottom-6 left-1/2 z-[130] -translate-x-1/2 rounded-lg border-2 border-emerald-700 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-900 shadow-lg">
          {customQuoteToast}
        </div>
      )}
    </div>
  );
}

function CatalogProductCard({
  category,
  product,
  idx,
  onOpenBrands,
  isSelected,
}: {
  category: Category;
  product: Product;
  idx: number;
  onOpenBrands: () => void;
  isSelected: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(idx * 0.015, 0.35), duration: 0.35 }}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-[0_2px_0_0_rgba(24,24,27,0.06)] transition-all duration-300',
        'hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_12px_40px_-12px_rgba(24,24,27,0.18)]',
        isSelected && 'border-zinc-500 ring-2 ring-zinc-400/40 ring-offset-2 ring-offset-[#f4f4f5]'
      )}
    >
      <button
        type="button"
        onClick={onOpenBrands}
        className="relative aspect-square w-full shrink-0 overflow-hidden bg-zinc-100 text-left outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 sm:aspect-[4/3]"
      >
        <div
          className={cn(
            'absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded border-2 border-zinc-900/90 bg-white/95 shadow-sm transition-colors',
            isSelected && 'border-zinc-700 bg-zinc-600'
          )}
        >
          {isSelected && <Check className="h-4 w-4 text-white" strokeWidth={2.5} />}
        </div>
        <img
          src={getProductImage(product, category)}
          alt={`${product.name} industrial part in ${category.name} category`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading={idx < 16 ? 'eager' : 'lazy'}
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
          }}
        />
        <span className="sr-only">Open brands for {category.name} — {product.name}</span>
      </button>

      <div className="flex min-w-0 flex-1 flex-col px-1.5 py-2 sm:p-5">
        <button
          type="button"
          onClick={onOpenBrands}
          className="mt-0 w-full min-w-0 break-words text-left text-[10px] font-bold uppercase leading-tight text-zinc-700 line-clamp-3 hover:text-zinc-900 sm:text-sm sm:leading-snug sm:line-clamp-2 sm:text-zinc-600"
        >
          {product.name}
        </button>
        <p className="mt-2 hidden text-[10px] font-semibold uppercase tracking-wider text-zinc-400 sm:block sm:mt-3">
          {product.brands.length} brands available
        </p>
      </div>
    </motion.article>
  );
}
