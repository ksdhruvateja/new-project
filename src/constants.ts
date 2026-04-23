export interface Product {
  id: string;
  name: string;
  brands: string[];
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  products: Product[];
}

export const FALLBACK_PRODUCT_IMAGE =
  'https://placehold.co/600x400?text=Product+Image+Coming+Soon';

const CATEGORY_IMAGE_BY_ID: Record<string, string> = {
  bearings: '/images/products-real/bearings.jpg',
  'belts-accessories': '/images/products-real/belts.jpg',
  'chain-sprockets': '/images/products-real/chain-sprockets.jpg',
  'clutches-brakes': '/images/products-real/clutch-brake.jpg',
  'conveyor-belting': '/images/products-real/conveyor.jpg',
  'conveyor-components': '/images/products-real/conveyor-components.jpg',
  couplings: '/images/products-real/couplings.jpg',
  filters: '/images/products-real/filters.jpg',
  gears: '/images/products-real/gears.jpg',
  'jet-bridge': '/images/products-real/jet-bridge.jpg',
  'linear-motion': '/images/products-real/linear-motion.jpg',
  lubrication: '/images/products-real/lubrication.jpg',
  motors: '/images/products-real/motors.jpg',
  miscellaneous: '/images/products-real/misc.jpg',
  'oil-seals': '/images/products-real/seals.jpg',
  'pillow-blocks': '/images/products-real/pillow-blocks.jpg',
  'pneumatics-fluid': '/images/products-real/pneumatics.jpg',
  'pneumatic-hydraulic-devices': '/images/products-real/hydraulic.jpg',
  'sheaves-pulleys': '/images/products-real/pulley.jpg',
  'speed-reducers': '/images/products-real/speed-reducer.jpg',
  'variable-speed': '/images/products-real/variable-drive.jpg',
};

const PRODUCT_IMAGE_BY_CATEGORY_ID: Record<string, string> = {
  bearings: '/images/products-real/bearings.jpg',
  'belts-accessories': '/images/products-real/belts.jpg',
  'chain-sprockets': '/images/products-real/chain-sprockets.jpg',
  'clutches-brakes': '/images/products-real/clutch-brake.jpg',
  'conveyor-belting': '/images/products-real/conveyor.jpg',
  'conveyor-components': '/images/products-real/conveyor-components.jpg',
  couplings: '/images/products-real/couplings.jpg',
  filters: '/images/products-real/filters.jpg',
  gears: '/images/products-real/gears.jpg',
  'jet-bridge': '/images/products-real/jet-bridge.jpg',
  'linear-motion': '/images/products-real/linear-motion.jpg',
  lubrication: '/images/products-real/lubrication.jpg',
  motors: '/images/products-real/motors.jpg',
  miscellaneous: '/images/products-real/misc.jpg',
  'oil-seals': '/images/products-real/seals.jpg',
  'pillow-blocks': '/images/products-real/pillow-blocks.jpg',
  'pneumatics-fluid': '/images/products-real/pneumatics.jpg',
  'pneumatic-hydraulic-devices': '/images/products-real/hydraulic.jpg',
  'sheaves-pulleys': '/images/products-real/pulley.jpg',
  'speed-reducers': '/images/products-real/speed-reducer.jpg',
  'variable-speed': '/images/products-real/variable-drive.jpg',
};

export function getProductImage(product: Product, category: Category): string {
  return (
    PRODUCT_IMAGE_BY_CATEGORY_ID[category.id] ||
    CATEGORY_IMAGE_BY_ID[category.id] ||
    FALLBACK_PRODUCT_IMAGE
  );
}

export function getCategoryPreviewImage(category: Category): string {
  return (
    CATEGORY_IMAGE_BY_ID[category.id] ||
    PRODUCT_IMAGE_BY_CATEGORY_ID[category.id] ||
    FALLBACK_PRODUCT_IMAGE
  );
}

export function getCategoryUniqueBrands(category: Category): string[] {
  return Array.from(new Set(category.products.flatMap((p) => p.brands))).sort();
}

const industrialImg = 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=70';

/** FOREZ product line — sections 1–21 (order must match business structure). */
export const PRODUCT_CATEGORIES: Category[] = [
  // 1. BEARINGS
  {
    id: 'bearings',
    name: 'Bearings',
    image: 'https://blog.lily-bearing.com/hubfs/Types%20of%20Bearings.jpg',
    products: [
      {
        id: 'bearings-line',
        name: 'Bearings',
        brands: [
          'AETNA',
          'AMI',
          'ABC',
          'BROWNING',
          'BARDEN',
          'RBC/BOER',
          'BOSTON GEAR',
          'CARTER',
          'CAST BRONZE',
          'DODGE',
          'FAFNIR',
          'FAG',
          'FRANTZ',
          'GENERAL BEARING',
          'HEIM',
          'HOOVER/NSK',
          'IKO',
          'INA',
          'IGUS',
          'IPTCI',
          'KAYDON',
          'KILIAN',
          'KOYO',
          'MCGILL',
          'MRC',
          'NACHI',
          'NATIONAL ROD ENDS',
          'NICE',
          'OILITE',
          'ROLLWAY',
          'RBC',
          'SCHATZ',
          'SEALMASTER',
          'SKF',
          'SMITH',
          'TIMKEN TORRINGTON',
        ],
        image: 'https://cdn11.bigcommerce.com/s-03842/images/stencil/1193x795/uploaded_images/ball-bearing-blog.jpg?t=1729516043',
      },
    ],
  },
  // 2. BELTS & ACCESSORIES
  {
    id: 'belts-accessories',
    name: 'Belts & Accessories',
    image: 'https://www.bdhbelts.com/wp-content/uploads/2023/06/industrial-belt-suppliers-in-pa.jpg',
    products: [
      {
        id: 'belts-line',
        name: 'Belts & Accessories',
        brands: [
          'AMETRIC',
          'BANDO',
          'BROWNING',
          'DAYCO',
          'DUNLOP',
          'GATES (EXPORT)',
          'PAGE (LEATHER)',
          'INTRALOX',
          'BRECOFLEX',
          'INTEROLL',
        ],
        image: 'https://gates.scene7.com/is/image/gates/v-belt-variable-speed?$Image_Responsive_Preset$',
      },
    ],
  },
  // 3. CHAIN & SPROCKETS
  {
    id: 'chain-sprockets',
    name: 'Chain & Sprockets',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJQPcF7zGlsnEYVsCI9TfjMcUi279qndVn3A&s',
    products: [
      {
        id: 'chain-line',
        name: 'Chain & Sprockets',
        brands: [
          'BROWNING',
          'DIAMOND',
          'HITACHI MAXCO',
          'HKK',
          'JEFFREY',
          'LINK-BELT',
          'MARTIN',
          'MOLINE',
          'IWIS',
          'MORSE',
          'RAMSEY',
          'RENOLD',
          'REX',
          'UNION',
          'UST',
          'WHITNEY',
        ],
        image: 'https://m.media-amazon.com/images/I/71J8-7mqUQL._AC_UF1000,1000_QL80_.jpg',
      },
    ],
  },
  // 4. CLUTCHES & BRAKES
  {
    id: 'clutches-brakes',
    name: 'Clutches & Brakes',
    image: 'https://ogura-clutch.com/files/images/thumb/industrial-group.jpg',
    products: [
      {
        id: 'clutches-brakes-line',
        name: 'Clutches & Brakes',
        brands: [
          'DYNACORP',
          'ELECTROID',
          'FORMSPRAG',
          'HORTON',
          'MORSE',
          'RINGSPAN',
          'STEARNS',
          'WARNER',
          'ZURN',
        ],
        image: 'https://www.indclutch.com/-/media/Project/Altramotion/shared/images/Product-Management/Industrial-Clutch/Product-Collages/ICDryCBCollage.jpg?h=188&iar=0&w=298&rev=37d42e3803a246fbb5b74c834cf39e8d&hash=39D4F252E8CF2DDCE33A7CEF73E6B9B2',
      },
    ],
  },
  // 5. CONVEYOR BELTING
  {
    id: 'conveyor-belting',
    name: 'Conveyor Belting',
    image: industrialImg,
    products: [
      {
        id: 'conveyor-belting-line',
        name: 'Conveyor Belting',
        brands: [
          'BAGEL BELTING',
          'COTTON BELTING',
          'FOOD BELTING',
          'HEAVY DUTY BELTING',
          'INCLINE BELTING',
          'POWER TURN BELT',
          'WIRE MESH BELTS',
          'FORBO-SIEGLING',
          'INTRALOX',
          'BRECO FLEX',
          'DUNLOP',
          'FENNAR',
        ],
        image: 'https://img.waimaoniu.net/4373/4373-202412111309334172.jpg?x-oss-process=image/resize,m_lfit,h_800',
      },
    ],
  },
  // 6. CONVEYOR COMPONENTS
  {
    id: 'conveyor-components',
    name: 'Conveyor Components',
    image: 'https://nibora.com/wp-content/uploads/2016/03/KONVEYRNI-KOMPONENTI.jpg',
    products: [
      {
        id: 'conveyor-components-line',
        name: 'Conveyor Components',
        brands: [
          'ALLIGATOR LACING',
          'AMERICAN PULLEY',
          'BRYANT',
          'CLIPPER LACING',
          'DYNACORE',
          'FLEXIBLE STEEL LACING',
          'HEWITT ROBINS',
          'MARTIN',
          'PRECISION',
          'STEPHENS ADAMSON',
          'SUPERIOR',
          'VAN GORP',
        ],
        image: 'https://images.thdstatic.com/productImages/ab2456ba-b62c-4f0e-bb91-e02bd2e60d42/svn/everbilt-pulleys-43364-64_1000.jpg',
      },
    ],
  },
  // 7. COUPLINGS
  {
    id: 'couplings',
    name: 'Couplings',
    image: 'https://www.zero-max.com/includes/work/image_cache/jpg/90ccddba8a71dde46edbbcc2d552aa77.thumb.jpg',
    products: [
      {
        id: 'couplings-line',
        name: 'Couplings',
        brands: [
          'BROWNING',
          'DALC',
          'FALK',
          'GERBING',
          'KOP-FLEX',
          'LOVEJOY',
          'OMEGA',
          'SCHMIDT',
          'SIERRATH',
          'TB WOODS',
          'THOMAS',
          'WALDRON',
          'ZURN',
          'DODGE',
          'IDC',
          'MARTIN',
          'TIMKEN',
          'AMERIDRIVES',
        ],
        image: 'https://www.jakobantriebstechnik.de/wp-content/uploads/2025/09/elastomerkupplung-ekm-uebersichtsseite.webp',
      },
    ],
  },
  // 8. FILTERS
  {
    id: 'filters',
    name: 'Filters',
    image: industrialImg,
    products: [
      {
        id: 'filters-line',
        name: 'Filters',
        brands: [
          'LOW EFFICIENCY',
          'MEDIUM EFFICIENCY',
          'HIGH EFFICIENCY',
          'ULTRA EFFICIENCY',
          'HEPA',
          'ULPA',
        ],
      },
    ],
  },
  // 9. GEARS & GEAR RACKS
  {
    id: 'gears',
    name: 'Gears & Gear Racks',
    image: industrialImg,
    products: [
      {
        id: 'gears-line',
        name: 'Gears & Gear Racks',
        brands: ['AMETRIC', 'BOSTON', 'BROWNING', 'LINN GEAR', 'MARTIN', 'UNION', 'SEW EURODRIVES'],
        image: industrialImg,
      },
    ],
  },
  // 10. JET BRIDGE & ACCESSORIES
  {
    id: 'jet-bridge',
    name: 'Jet Bridge & Accessories',
    image: industrialImg,
    products: [
      {
        id: 'jet-bridge-line',
        name: 'Jet Bridge & Accessories',
        brands: ['OSHKOSH AEROTECH'],
        image: industrialImg,
      },
    ],
  },
  // 11. LINEAR MOTION
  {
    id: 'linear-motion',
    name: 'Linear Motion',
    image: industrialImg,
    products: [
      {
        id: 'linear-line',
        name: 'Linear Motion',
        brands: [
          'BISHOP-WISECARVER',
          'IKO',
          'LEE CONTROLS',
          'PACIFIC BEARING',
          'STAR LINEAR',
          'THOMSON',
        ],
        image: industrialImg,
      },
    ],
  },
  // 12. LUBRICATION & ACCESSORIES
  {
    id: 'lubrication',
    name: 'Lubrication & Accessories',
    image: industrialImg,
    products: [
      {
        id: 'lubrication-line',
        name: 'Lubrication & Accessories',
        brands: [
          'ALEMITE',
          'KEYSTONE',
          'LINCOLN',
          'LUBESITE',
          'LUBRIKO',
          'LUBRIPLATE',
          'MOBIL',
          'OIL-RITE',
          'SKF/LINCOLN',
          'WD40',
        ],
        image: industrialImg,
      },
    ],
  },
  // 13. MOTORS
  {
    id: 'motors',
    name: 'Motors',
    image: '/images/categories/motors.svg',
    products: [
      {
        id: 'motors-line',
        name: 'Motors',
        brands: [
          'BALDOR',
          'GENERAL ELECTRIC',
          'LEESON ELECTRIC',
          'MAGNETEK',
          'RELIANCE',
          'US ELECTRIC',
          'SUMITOMO',
          'ALLEN BRADLEY',
          'SIEMENS',
        ],
        image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRof92DB4lekXvVkXl31kUlU2mH5Ekiq3USkEPrnxmi_qPlQXgqOOJibh6c8A3I5Cz-E9e6JVmcmLuOrcq1Au1xfbyi9vbIh7pQEFtKeTI4aT8SkqzpyE7k',
      },
    ],
  },
  // 14. MISCELLANEOUS
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    image: industrialImg,
    products: [
      { id: 'misc-brewer', name: 'Brewer Tensioners', brands: ['BREWER TENSIONERS'] },
      { id: 'misc-casters', name: 'Casters & Wheels', brands: ['CASTERS & WHEELS'] },
      { id: 'misc-hose', name: 'Hose & Fittings', brands: ['HOSE & FITTINGS'] },
      { id: 'misc-keystock', name: 'Keystock', brands: ['KEYSTOCK'] },
      { id: 'misc-locknuts', name: 'Locknuts & Washers', brands: ['LOCKNUTS & WASHERS'] },
      { id: 'misc-martin-tools', name: 'Martin Tools', brands: ['MARTIN TOOLS'] },
      { id: 'misc-never-seez', name: 'Never-Seez', brands: ['NEVER-SEEZ'] },
      { id: 'misc-owatonna', name: 'Owatonna Tool', brands: ['OWATONNA TOOL'] },
      { id: 'misc-post-lock', name: 'Post-Lock', brands: ['POST-LOCK'] },
      { id: 'misc-retaining', name: 'Retaining Rings', brands: ['RETAINING RINGS'] },
      { id: 'misc-shafting', name: 'Shafting', brands: ['SHAFTING'] },
      { id: 'misc-skf-maint', name: 'SKF Maintenance', brands: ['SKF MAINTENANCE'] },
    ],
  },
  // 15. OIL & MECHANICAL SEALS
  {
    id: 'oil-seals',
    name: 'Oil & Mechanical Seals',
    image: industrialImg,
    products: [
      {
        id: 'oil-seals-line',
        name: 'Oil & Mechanical Seals',
        brands: ['CHICAGO RAWHIDE', 'GARLOCK', 'NATIONAL', 'NOK', 'O-RINGS', 'TCM', 'US SEAL'],
        image: industrialImg,
      },
    ],
  },
  // 16. PILLOW BLOCKS
  {
    id: 'pillow-blocks',
    name: 'Pillow Blocks',
    image: industrialImg,
    products: [
      {
        id: 'pillow-blocks-line',
        name: 'Pillow Blocks',
        brands: [
          'BROWNING',
          'CRAFT',
          'DODGE',
          'FAFNIR',
          'FYH',
          'HUB CITY',
          'LINK-BELT',
          'MOLINE',
          'RANDALL',
          'REX',
          'ROYERSFORD',
          'SEALMASTER',
          'SKF',
          'TORRINGTON',
        ],
        image: industrialImg,
      },
    ],
  },
  // 17. PNEUMATICS / FLUID POWER
  {
    id: 'pneumatics-fluid',
    name: 'Pneumatics / Fluid Power',
    image: '/images/categories/pneumatics.svg',
    products: [
      {
        id: 'pneumatics-fluid-line',
        name: 'Pneumatics / Fluid Power',
        brands: [
          'AMERICAN CYLINDER',
          'AIR PIPE USA',
          'FITTINGS UNLIMITED',
          'MFD PNEUMATIC VALVES',
          'NORGREN',
          'PNEUFORCE / VACUFORCE',
          'REELCRAFT',
          'RTI',
          'STARCYL CYLINDERS',
          'YAMADA',
        ],
        image: '/images/products/cylinders.svg',
      },
    ],
  },
  // 18. PNEUMATIC & HYDRAULIC DEVICES
  {
    id: 'pneumatic-hydraulic-devices',
    name: 'Pneumatic & Hydraulic Devices',
    image: industrialImg,
    products: [
      { id: 'ph-bimba', name: 'BIMBA CYLINDERS', brands: ['BIMBA CYLINDERS'] },
      { id: 'ph-coilhose', name: 'COILHOSE', brands: ['COILHOSE'] },
    ],
  },
  // 19. SHEAVES & PULLEYS
  {
    id: 'sheaves-pulleys',
    name: 'Sheaves & Pulleys',
    image: industrialImg,
    products: [
      {
        id: 'sheaves-line',
        name: 'Sheaves & Pulleys',
        brands: ['BROWNING', 'DAYCO', 'MARTIN', 'MASKA', 'MAUREY', 'TB WOODS'],
        image: 'https://images.thdstatic.com/productImages/ab2456ba-b62c-4f0e-bb91-e02bd2e60d42/svn/everbilt-pulleys-43364-64_1000.jpg',
      },
    ],
  },
  // 20. SPEED REDUCERS
  {
    id: 'speed-reducers',
    name: 'Speed Reducers',
    image: industrialImg,
    products: [
      {
        id: 'speed-reducers-line',
        name: 'Speed Reducers',
        brands: [
          'ANGLE GEAR',
          'BROWNING',
          'CLEVELAND',
          'CONE DRIVE',
          'EURODRIVE',
          'FOOTE JONES',
          'HUB CITY',
          'MORSE',
          'PERFECTION',
          'ZERO-MAX',
          'STOBER',
        ],
        image: industrialImg,
      },
    ],
  },
  // 21. VARIABLE SPEED DRIVES
  {
    id: 'variable-speed',
    name: 'Variable Speed Drives',
    image: industrialImg,
    products: [
      {
        id: 'variable-speed-line',
        name: 'Variable Speed Drives',
        brands: [
          'EURODRIVE',
          'HI-LO',
          'KB ELECTRONICS',
          'LEESON',
          'LOVEJOY',
          'SPEED SELECTOR',
          'TB WOODS',
          'US ELECTRIC',
        ],
        image: industrialImg,
      },
    ],
  },
];
