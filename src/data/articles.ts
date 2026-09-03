export interface Article {
  id: string
  title: string
  dek: string
  body: string[]
  category: string
  tags: string[]
  author: string
  authorRole: string
  publishedAt: string
  image: string
  slug: string
  readTime: number
  featured?: boolean
  status: 'published' | 'draft' | 'review' | 'archived'
  createdAt?: Date
  updatedAt?: Date
}

export const categories = [
  { slug: 'politics', label: 'Politics', order: 1 },
  { slug: 'news', label: 'News', order: 2 },
  { slug: 'business', label: 'Business', order: 3 },
  { slug: 'world', label: 'World', order: 4 },
  { slug: 'tech', label: 'Tech', order: 5 },
  { slug: 'health', label: 'Health', order: 6 },
  { slug: 'sports', label: 'Sports', order: 7 },
  { slug: 'religion', label: 'Religion', order: 8 },
  { slug: 'education', label: 'Education', order: 9 },
  { slug: 'stories', label: 'Stories', order: 10 },
]

export const breakingNews = [
  'Delta Governor commissions new secretariat complex',
  'Okorocha files suit against INEC over Imo West ticket',
  'Nigerian oil output reaches 18-month high',
  'Super Eagles secure AFCON qualification',
  'New AI health centre opens in Warri',
]

export const articles: Article[] = [
  {
    id: '1',
    title: 'Governor Oborevwori Commissions Landmark Secretariat Complex in Delta State',
    dek: 'A milestone achievement for public service delivery and regional administration efficiency in Asaba.',
    body: [
      'The Executive Governor of Delta State has officially commissioned the modern state secretariat complex, marking a pivotal turn for administrative efficiency and civil service excellence in the region.',
      'Designed with modern sustainable architecture and modern digital governance infrastructure, the complex integrates energy-efficient solar power, high-speed fiber optics, and dedicated public service centers.',
      'Dignitaries, community elders, and administrative leaders gathered to celebrate the milestone, praising the administration for prioritizing civil welfare, transparency, and infrastructural transformation across Delta State.'
    ],
    category: 'Politics',
    tags: ['Delta State', 'Infrastructure', 'Governance', 'Nigeria'],
    author: 'Blessing Johnson',
    authorRole: 'Chief Political Correspondent',
    publishedAt: 'Aug 24, 2026',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    slug: 'governor-oborevwori-commissions-delta-state-secretariat',
    readTime: 4,
    featured: true,
    status: 'published'
  },
  {
    id: '2',
    title: 'Nigerian Economy Shows Resilient Growth as Energy & Tech Sectors Expand',
    dek: 'Quarterly financial reports highlight unexpected gains in non-oil exports and fintech innovation hubs.',
    body: [
      'Nigeria’s economic indicators demonstrated robust expansion this quarter, fueled by accelerated private sector investment in agricultural technology, clean energy initiatives, and financial services.',
      'Analytical reports released by regional trade boards indicate a 14% uptick in commercial exports, signaling strong global interest and local entrepreneurism.'
    ],
    category: 'Business',
    tags: ['Economy', 'Finance', 'Tech', 'Markets'],
    author: 'Emmanuel Okafor',
    authorRole: 'Senior Financial Analyst',
    publishedAt: 'Aug 23, 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    slug: 'nigerian-economy-shows-resilient-growth',
    readTime: 3,
    featured: false,
    status: 'published'
  },
  {
    id: '3',
    title: 'Warri Tech Hub Launches Pioneer AI & Renewable Energy Innovation Center',
    dek: 'Fostering local tech talent, youth empowerment, and sustainable engineering solutions for West Africa.',
    body: [
      'In an ambitious move to propel technological advancement, a state-of-the-art innovation incubator has opened its doors in Warri.',
      'The center aims to train over 5,000 young developers, climate engineers, and entrepreneurs over the next three years.'
    ],
    category: 'Tech',
    tags: ['AI', 'Innovation', 'Warri', 'Education'],
    author: 'Chidinma Adebayo',
    authorRole: 'Technology Editor',
    publishedAt: 'Aug 22, 2026',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    slug: 'warri-tech-hub-launches-pioneer-ai-center',
    readTime: 5,
    featured: false,
    status: 'published'
  },
  {
    id: '4',
    title: 'Nigerian Universities Partner with International Tech Firms for AI Research Centers',
    dek: 'New collaborations aim to establish world-class artificial intelligence research facilities across major universities.',
    body: [
      'Leading Nigerian universities have signed memorandums of understanding with global technology firms to establish AI research centers.',
      'The initiative will focus on developing local AI solutions for healthcare, agriculture, and education challenges unique to Nigeria.',
      'Students and researchers will have access to cutting-edge computational resources and mentorship programs.'
    ],
    category: 'Tech',
    tags: ['Higher Education', 'AI', 'Research', 'International Partnerships'],
    author: 'Tunde Oladipo',
    authorRole: 'Education Correspondent',
    publishedAt: 'Aug 21, 2026',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    slug: 'nigerian-universities-partner-with-international-tech-firms',
    readTime: 6,
    featured: false,
    status: 'published'
  },
  {
    id: '5',
    title: 'Super Eagles Qualify for 2027 AFCON with Dominant Victory',
    dek: 'Nigeria secures spot in continental championship with impressive performance in qualifiers.',
    body: [
      'The Nigerian national football team has secured qualification for the 2027 Africa Cup of Nations.',
      'Coach Augustine Eguavoen praised the team\'s discipline and determination throughout the qualifying campaign.',
      'Nigeria will host the 2027 AFCON, marking the second time the country will stage the tournament.'
    ],
    category: 'Sports',
    tags: ['Football', 'Super Eagles', 'AFCON', 'Sports'],
    author: 'adebayo Samuel',
    authorRole: 'Sports Editor',
    publishedAt: 'Aug 20, 2026',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
    slug: 'super-eagles-qualify-for-2027-afcon',
    readTime: 4,
    featured: true,
    status: 'published'
  },
  {
    id: '6',
    title: 'Lagos State Announces $500M Infrastructure Development Plan',
    dek: 'Major road, transportation, and housing projects announced to boost economic growth.',
    body: [
      'The Lagos State Government has unveiled a comprehensive infrastructure development plan worth $500 million.',
      'The projects include new expressways, public transportation hubs, and affordable housing developments.',
      'Governor Babajide Sanwo-Olu stated that the plan will create over 50,000 jobs over the next two years.'
    ],
    category: 'Business',
    tags: ['Lagos State', 'Infrastructure', 'Development', 'Economy'],
    author: 'Mary Adeosun',
    authorRole: 'Business Correspondent',
    publishedAt: 'Aug 19, 2026',
    image: 'https://images.unsplash.com/photo-1555824954-7ca8955f023c?auto=format&fit=crop&w=1200&q=80',
    slug: 'lagos-state-announces-500m-infrastructure-plan',
    readTime: 5,
    featured: false,
    status: 'published'
  },
  {
    id: '7',
    title: 'Central Bank Maintains Interest Rate at 18% Amid Inflation Concerns',
    dek: 'Monetary policy committee cites persistent inflation pressures as key concern.',
    body: [
      'The Central Bank of Nigeria has decided to maintain the key interest rate at 18% at its monthly policy meeting.',
      'Governor Olayemi Cardoso noted that inflation remains above target despite recent efforts to stabilize prices.',
      'The CBN continues to monitor foreign exchange liquidity and banking sector stability closely.'
    ],
    category: 'Business',
    tags: ['Central Bank', 'Interest Rates', 'Inflation', 'Finance'],
    author: 'Ikechukwu Eze',
    authorRole: 'Economic Editor',
    publishedAt: 'Aug 18, 2026',
    image: 'https://images.unsplash.com/photo-1525495001375-879186627191?auto=format&fit=crop&w=1200&q=80',
    slug: 'central-bank-maintains-interest-rate-at-18',
    readTime: 4,
    featured: false,
    status: 'published'
  },
  {
    id: '8',
    title: 'Nigeria Joins Global Initiative for Digital Health Transformation',
    dek: 'Partnership aims to improve healthcare delivery through digital technologies and telemedicine.',
    body: [
      'The Nigerian government has joined the Global Digital Health Partnership, a worldwide initiative to transform healthcare delivery.',
      'The partnership will focus on electronic health records, telemedicine expansion, and digital disease surveillance.',
      'Initial investments of 5 billion Naira have been allocated for the digital health infrastructure.'
    ],
    category: 'Health',
    tags: ['Digital Health', 'Telemedicine', 'Public Health', 'Technology'],
    author: 'Dr. Amina Mohammed',
    authorRole: 'Health Correspondent',
    publishedAt: 'Aug 17, 2026',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    slug: 'nigeria-joins-global-digital-health-initiative',
    readTime: 5,
    featured: false,
    status: 'published'
  },
  {
    id: '9',
    title: 'Enugu State Governor Wins Court Case Over Impeachment',
    dek: 'High court rules impeachment proceedings were unconstitutional and procedurally flawed.',
    body: [
      'The Enugu State High Court has nullified the impeachment of Governor Barr. Peter Umeadi.',
      'Justice Chibuzor Nwankwo ruled that the impeachment process violated constitutional provisions and due process.',
      'The governor was reinstated immediately and sworn back into office earlier today.'
    ],
    category: 'Politics',
    tags: ['Enugu State', 'Governor', 'Court Ruling', 'Politics'],
    author: 'Chinyere Okoli',
    authorRole: 'Political Correspondent',
    publishedAt: 'Aug 16, 2026',
    image: 'https://images.unsplash.com/photo-1545167622350-159625793978?auto=format&fit=crop&w=1200&q=80',
    slug: 'enugu-governor-wins-impeachment-court-case',
    readTime: 4,
    featured: false,
    status: 'published'
  },
  {
    id: '10',
    title: 'Lagos Announces New Light Rail Extension Project',
    dek: '30-kilometer extension to connect Epe to Ajah with modern rapid transit system.',
    body: [
      'The Lagos State Government has launched construction of a 30-kilometer extension to the Blue Line light rail.',
      'The project will connect Epe to Ajah, serving over 2 million residents and commuters.',
      'Expected completion is scheduled for Q4 2028, with Phase 1 from Epe to Amuwo-Odofin opening in 2027.'
    ],
    category: 'News',
    tags: ['Lagos', 'Transportation', 'Infrastructure', 'Railway'],
    author: 'Bisi Fashola',
    authorRole: 'Transportation Correspondent',
    publishedAt: 'Aug 15, 2026',
    image: 'https://images.unsplash.com/photo-1495121554475-1147bf4d5e96?auto=format&fit=crop&w=1200&q=80',
    slug: 'lagos-announces-new-light-rail-extension',
    readTime: 3,
    featured: false,
    status: 'published'
  },
  {
    id: '11',
    title: 'Nigeria\'s Mobile Money Sector Sees 40% Growth in First Half 2026',
    dek: 'Digital financial services continue to expand financial inclusion across the country.',
    body: [
      'The Nigerian mobile money sector has recorded 40% user growth in the first half of 2026.',
      'According to NITP data, over 35 million Nigerians now use mobile money services regularly.',
      'Fintech companies attribute the growth to improved smartphone penetration and regulatory reforms.'
    ],
    category: 'Tech',
    tags: ['Fintech', 'Mobile Money', 'Digital Finance', 'Growth'],
    author: 'Zainab Ahmed',
    authorRole: 'Technology Correspondent',
    publishedAt: 'Aug 14, 2026',
    image: 'https://images.unsplash.com/photo-1554224155-679f68973179?auto=format&fit=crop&w=1200&q=80',
    slug: 'nigeria-mobile-money-growth-40',
    readTime: 4,
    featured: false,
    status: 'published'
  },
  {
    id: '12',
    title: 'UNICEF Partners with Oyo State on Child Nutrition Program',
    dek: 'New initiative aims to reduce stunting and malnutrition among children under five.',
    body: [
      'UNICEF has partnered with Oyo State Government to launch a comprehensive child nutrition program.',
      'The program will provide micronutrient supplements, promote breastfeeding, and train community health workers.',
      'The initiative targets 500,000 children under five across 32 local government areas.'
    ],
    category: 'Health',
    tags: ['UNICEF', 'Child Health', 'Nutrition', 'Oyo State'],
    author: 'Dr. Fatima Ibrahim',
    authorRole: 'Health Correspondent',
    publishedAt: 'Aug 13, 2026',
    image: 'https://images.unsplash.com/photo-1593281833561-554179734715?auto=format&fit=crop&w=1200&q=80',
    slug: 'unicef-oyo-state-child-nutrition-program',
    readTime: 5,
    featured: false,
    status: 'published'
  },
  {
    id: '13',
    title: 'Kano Completes Solar-Powered Water Treatment Plant',
    dek: 'First of its kind in Northern Nigeria, providing clean water to 500,000 residents.',
    body: [
      'Kano State has commissioned Northern Nigeria\'s first solar-powered water treatment plant.',
      'The facility can process 5 million liters of water daily, addressing chronic water shortages.',
      'The project cost 2.5 billion Naira and represents a public-private partnership model.'
    ],
    category: 'News',
    tags: ['Kano', 'Water', 'Solar Energy', 'Infrastructure'],
    author: 'Hassan Alhaji',
    authorRole: 'Regional Correspondent',
    publishedAt: 'Aug 12, 2026',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    slug: 'kano-solar-water-treatment-plant',
    readTime: 4,
    featured: false,
    status: 'published'
  },
  {
    id: '14',
    title: 'Nigerian Film Industry Generates N1.2 Trillion in 2025',
    dek: 'Nollywood continues to be a major economic driver and cultural export.',
    body: [
      'The Nigerian film industry generated N1.2 trillion in revenue in 2025, according to new industry report.',
      'Over 2,500 films were produced last year, with increasing international distribution deals.',
      'The sector employs over 1 million people directly and supports countless others indirectly.'
    ],
    category: 'Stories',
    tags: ['Nollywood', 'Entertainment', 'Culture', 'Economy'],
    author: 'Chioma Okafor',
    authorRole: 'Entertainment Correspondent',
    publishedAt: 'Aug 11, 2026',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1200&q=80',
    slug: 'nollywood-generates-1-2-trillion-revenue',
    readTime: 6,
    featured: false,
    status: 'published'
  },
  {
    id: '15',
    title: 'Buhari Foundation Launches Scholarship Program for Undergraduates',
    dek: 'New initiative to support 500 students annually with full tuition and living expenses.',
    body: [
      'The Buhari Foundation has announced a new scholarship program for indigent undergraduate students.',
      'The scholarship covers full tuition, accommodation, and a monthly stipend for four years.',
      'Applications open nationwide, with selection based on academic merit and financial need.'
    ],
    category: 'Education',
    tags: ['Scholarship', 'Education', 'Buhari Foundation', 'Students'],
    author: 'Adebayo Ojo',
    authorRole: 'Education Correspondent',
    publishedAt: 'Aug 10, 2026',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    slug: 'buhari-foundation-scholarship-program',
    readTime: 4,
    featured: false,
    status: 'published'
  },
  {
    id: '16',
    title: 'Nigeria\'s Export Non-Oil Exports Surge by 25% in Q2 2026',
    dek: 'Agriculture and manufacturing sectors drive significant growth in non-oil exports.',
    body: [
      'Nigeria\'s non-oil exports surged by 25% in the second quarter of 2026, according to export data.',
      'Sesame seeds, cocoa beans, and cashew nuts led the growth, with new markets in Asia and Europe.',
      'The success is attributed to improved logistics, reduced export duties, and trade promotion efforts.'
    ],
    category: 'Business',
    tags: ['Exports', 'Agriculture', 'Manufacturing', 'Trade'],
    author: 'Emmanuel Okafor',
    authorRole: 'Senior Financial Analyst',
    publishedAt: 'Aug 09, 2026',
    image: 'https://images.unsplash.com/photo-1500930377580-3c2423315965?auto=format&fit=crop&w=1200&q=80',
    slug: 'nigeria-non-oil-exports-surge-25',
    readTime: 5,
    featured: false,
    status: 'published'
  }
]

export const sampleArticles: Article[] = articles

export function getArticlesByCategory(categorySlug: string): Article[] {
  const normalizedSlug = categorySlug.toLowerCase()
  return articles.filter((a) => a.category.toLowerCase() === normalizedSlug)
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase()
  return articles.filter((a) =>
    a.title.toLowerCase().includes(q) ||
    a.dek.toLowerCase().includes(q) ||
    a.tags.some((t) => t.toLowerCase().includes(q)) ||
    a.author.toLowerCase().includes(q) ||
    a.body.some((p) => p.toLowerCase().includes(q))
  )
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured)
}

export function getLatestArticles(limit?: number): Article[] {
  const sorted = [...articles].sort((a, b) => {
    const ad = new Date(a.publishedAt).getTime()
    const bd = new Date(b.publishedAt).getTime()
    return bd - ad
  })
  if (limit) return sorted.slice(0, limit)
  return sorted
}

export function getRelatedArticles(currentId: string, category: string, limit: number = 3): Article[] {
  return articles
    .filter((a) => a.id !== currentId && a.category === category)
    .slice(0, limit)
}