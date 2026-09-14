# Admin Dashboard Architecture

## Component Hierarchy

```
App.tsx
└── AdminLayout
    ├── AdminSidebar
    │   ├── Branding
    │   ├── Navigation Sections
    │   │   ├── MAIN
    │   │   ├── ANALYTICS
    │   │   ├── MANAGEMENT
    │   │   └── QUICK ACTIONS
    │   └── User Profile
    ├── AdminHeader
    │   ├── Breadcrumb
    │   ├── Search Bar
    │   ├── Notifications
    │   ├── Settings
    │   └── User Avatar
    └── Page Content
        ├── AdminDashboard
        │   ├── Greeting Section
        │   ├── KPI Cards (4x)
        │   ├── Analytics Grid
        │   │   ├── ContentPerformanceChart
        │   │   └── PublishingOverview
        │   └── Content Grid
        │       ├── RecentArticlesTable
        │       ├── RecentActivity
        │       └── TopPerformingStories
        └── Other Admin Pages
            ├── ArticlesPage
            ├── MediaPage
            ├── CommentsPage
            ├── AnalyticsPage
            ├── UsersPage
            ├── CategoriesPage
            └── SettingsPage
```

## File Structure

```
src/
├── components/admin/
│   ├── AdminLayout.tsx           (Main layout wrapper)
│   ├── AdminSidebar.tsx          (Navigation sidebar)
│   ├── AdminHeader.tsx           (Top header bar)
│   ├── RecentArticlesTable.tsx   (Data table component)
│   ├── RecentActivity.tsx        (Activity timeline)
│   ├── TopPerformingStories.tsx  (Stories ranking)
│   ├── ContentPerformanceChart.tsx (Line chart)
│   └── PublishingOverview.tsx    (Donut chart)
├── pages/admin/
│   ├── AdminLogin.tsx            (Premium login page)
│   ├── AdminDashboard.tsx        (Main dashboard)
│   ├── ArticlesPage.tsx          (To be redesigned)
│   ├── MediaPage.tsx             (To be redesigned)
│   ├── CommentsPage.tsx          (To be redesigned)
│   ├── AnalyticsPage.tsx         (To be redesigned)
│   ├── UsersPage.tsx             (To be redesigned)
│   ├── CategoriesPage.tsx        (To be redesigned)
│   ├── SettingsPage.tsx          (To be redesigned)
│   └── ArticleEditor.tsx         (To be redesigned)
├── styles/
│   ├── admin-premium.css         (Complete design system)
│   └── (other stylesheets)
├── App.tsx                       (Imports admin-premium.css)
└── (other source files)
```

## Design System Hierarchy

### CSS Variables (admin-premium.css)

```css
:root {
  /* Primary Colors */
  --color-navy-deep: #07152E
  --color-navy-midnight: #031126
  --color-red-brand: #E32626
  --color-gold-warm: #F2A900
  
  /* Backgrounds */
  --color-bg-main: #F7F8FA
  --color-bg-card: #FFFFFF
  --color-bg-surface: #F1F3F6
  
  /* Text */
  --color-text-primary: #101828
  --color-text-secondary: #667085
  --color-text-muted: #98A2B3
  
  /* Status */
  --color-status-published: #10B981
  --color-status-draft: #F59E0B
  --color-status-review: #3B82F6
  
  /* Typography */
  --font-serif: Georgia, DM Serif Display
  --font-sans: -apple-system, BlinkMacSystemFont, Segoe UI
  --font-mono: Monaco, Courier New
  
  /* Spacing (8px base) */
  --space-xs: 4px
  --space-sm: 8px
  --space-md: 12px
  --space-lg: 16px
  --space-xl: 24px
  --space-2xl: 32px
  --space-3xl: 40px
  
  /* Effects */
  --radius-sm: 6px
  --radius-md: 8px
  --radius-lg: 12px
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1)
  --transition: all 0.2s ease
}
```

## Component Props

### AdminLayout
```typescript
interface AdminLayoutProps {
  children: React.ReactNode
  currentPage: string
  onNavigate: (path: string) => void
  notificationBadge?: number
  breadcrumb?: { label: string; path?: string }[]
}
```

### AdminSidebar
```typescript
interface AdminSidebarProps {
  currentPage: string
  onNavigate: (path: string) => void
  notificationBadge?: number
}
```

### AdminHeader
```typescript
interface AdminHeaderProps {
  breadcrumb?: { label: string; path?: string }[]
  onBreadcrumbClick?: (path: string) => void
  onNavigate?: (path: string) => void
}
```

### RecentArticlesTable
```typescript
interface Article {
  id: string
  title: string
  category: string
  author: string
  status: 'published' | 'draft' | 'review'
  views: number
  date: string
  thumbnail?: string
}

interface RecentArticlesTableProps {
  articles: Article[]
  onEdit?: (id: string) => void
  onView?: (id: string) => void
  onNavigate?: (path: string) => void
}
```

### RecentActivity
```typescript
interface ActivityItem {
  id: number
  type: 'article' | 'draft' | 'review' | 'user'
  text: string
  subtext?: string
  time: string
}

interface RecentActivityProps {
  activities?: ActivityItem[]
}
```

### TopPerformingStories
```typescript
interface Story {
  rank: number
  title: string
  views: number
}

interface TopPerformingStoriesProps {
  stories?: Story[]
}
```

## State Management

### AdminDashboard State
```typescript
const [stats, setStats] = useState<{
  total: number
  published: number
  drafts: number
  reviews: number
}>()

const [articles, setArticles] = useState<Article[]>([])
const [loading, setLoading] = useState(boolean)
```

### Data Flow
1. AdminDashboard loads articles from Firebase
2. Articles filtered and formatted for display
3. Stats calculated from articles
4. Components receive formatted data
5. User actions trigger navigation via `onNavigate`

## Responsive Breakpoints

```css
/* Desktop: 1440px+ */
.admin-layout-container {
  grid-template-columns: 230px 1fr;
}
.kpi-grid { grid-template-columns: repeat(4, 1fr); }
.analytics-grid { grid-template-columns: 2fr 1fr; }
.content-grid { grid-template-columns: 1.5fr 1fr; }

/* Tablet: 1400px */
.admin-layout-container {
  grid-template-columns: 200px 1fr;
}
.kpi-grid { grid-template-columns: repeat(2, 1fr); }
.analytics-grid { grid-template-columns: 1fr; }

/* Mobile: 768px */
.admin-layout-sidebar { position: fixed; left: -230px; }
.kpi-grid { grid-template-columns: repeat(2, 1fr); }

/* Small Mobile: 640px */
.kpi-grid { grid-template-columns: 1fr; }
```

## Color System

### Brand Colors
- **Red (#E32626)**: Primary action, highlights, published status, active navigation
- **Gold (#F2A900)**: Secondary accent, drafts, editorial emphasis
- **Navy (#07152E)**: Sidebar, primary background, depth

### Status Colors
- **Green (#10B981)**: Published articles
- **Amber (#F59E0B)**: Drafts
- **Blue (#3B82F6)**: In review
- **Red (#EF4444)**: Errors, urgent

### Category Colors
```
Politics: pale red (#FEE2E2)
Business: pale amber (#FEF3C7)
Technology: pale blue (#DBEAFE)
Metro: pale purple (#E9D5FF)
Sports: pale green (#DCFCE7)
```

## Typography Scale

```
Heading (Serif): 30-34px, weight 600-700
Section Title: 16-18px, weight 600
Card Title: 16px, weight 600
Body: 14px, weight 400-500
Small: 12-13px, weight 400-500
Tiny: 11px, weight 600
```

## Spacing Scale (8px base)

```
Padding:
- Sidebar: 16px (lg)
- Cards: 24px (xl)
- Content: 32px (2xl)

Gaps:
- Card gaps: 16px (lg)
- Section gaps: 24px (xl)
- Grid gaps: 16px (lg)
```

## Shadow System

```
xs: 0 1px 2px rgba(0, 0, 0, 0.05)
sm: 0 1px 3px rgba(0, 0, 0, 0.1)
md: 0 4px 12px rgba(0, 0, 0, 0.08)
lg: 0 10px 25px rgba(0, 0, 0, 0.1)
```

## Border Radius

```
sm: 6px (small elements)
md: 8px (buttons, inputs)
lg: 12px (cards)
xl: 16px (larger sections)
```

## Transition Timing

```
Fast: 0.15s ease (hover states)
Standard: 0.2s ease (general interactions)
Slow: (rarely used)
```

## Accessibility Features

- ✅ High contrast ratios (4.5:1 minimum)
- ✅ Focus states on all interactive elements
- ✅ Semantic HTML (buttons, nav, main, etc.)
- ✅ ARIA labels where needed
- ✅ Color not sole indicator of meaning
- ✅ Touch targets minimum 32px
- ✅ Clear skip links in navigation

## Performance Considerations

- ✅ CSS-only animations (no JavaScript animations)
- ✅ Lazy loading of charts
- ✅ Minimal re-renders with proper React patterns
- ✅ SVG charts (no external chart library)
- ✅ Optimized images
- ✅ CSS Grid/Flexbox for layouts (no CSS-in-JS)

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Dark Mode Support

The design system includes dark mode variables (prefixed with `.dark`):

```css
.dark .admin-layout-container {
  background-color: #1A1F3A;
  color: #E5E7EB;
}
```

To enable dark mode, add `.dark` class to body or root element.

---

**Last Updated**: September 1, 2026
**Status**: Production Ready ✅
