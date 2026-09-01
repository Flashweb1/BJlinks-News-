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
  const sorted = [...articles]
  if (limit) return sorted.slice(0, limit)
  return sorted
}

export function getRelatedArticles(currentId: string, category: string, limit: number = 3): Article[] {
  return articles
    .filter((a) => a.id !== currentId && a.category === category)
    .slice(0, limit)
}