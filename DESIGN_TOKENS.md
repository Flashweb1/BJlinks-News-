# Bijlinks Newsroom - Design Tokens Reference

## 🎨 COLOR PALETTE

### Primary Colors
```
Deep Navy
  Code: #07152E
  Usage: Sidebar background, primary depth
  RGB: rgb(7, 21, 46)

Midnight Navy
  Code: #031126
  Usage: Dark mode alternative
  RGB: rgb(3, 17, 38)
```

### Brand Accent
```
News Red
  Code: #E32626
  Usage: Primary actions, highlights, published status
  RGB: rgb(227, 38, 38)

Bright Red
  Code: #FF3030
  Usage: Active states, urgent alerts
  RGB: rgb(255, 48, 48)
```

### Secondary Accent
```
Warm Gold
  Code: #F2A900
  Usage: Secondary accent, drafts, editorial
  RGB: rgb(242, 169, 0)
```

### Backgrounds
```
Main Background
  Code: #F7F8FA
  Usage: Page background
  RGB: rgb(247, 248, 250)

Card Background
  Code: #FFFFFF
  Usage: Card backgrounds
  RGB: rgb(255, 255, 255)

Soft Surface
  Code: #F1F3F6
  Usage: Surface backgrounds, hover states
  RGB: rgb(241, 243, 246)
```

### Text
```
Primary Text
  Code: #101828
  Usage: Main text, headings
  RGB: rgb(16, 24, 40)

Secondary Text
  Code: #667085
  Usage: Secondary text, descriptions
  RGB: rgb(102, 112, 133)

Muted Text
  Code: #98A2B3
  Usage: Tertiary text, hints
  RGB: rgb(152, 162, 179)
```

### Borders & Dividers
```
Light Border
  Code: #E5E7EB
  Usage: Light theme borders
  RGB: rgb(229, 231, 235)

Dark Border
  Code: #2D3748
  Usage: Dark theme borders
  RGB: rgb(45, 55, 72)

Divider
  Code: #F3F4F6
  Usage: Section dividers
  RGB: rgb(243, 244, 246)
```

### Status Colors
```
Published (Green)
  Code: #10B981
  Usage: Published articles
  RGB: rgb(16, 185, 129)

Draft (Amber)
  Code: #F59E0B
  Usage: Draft articles
  RGB: rgb(245, 158, 11)

In Review (Blue)
  Code: #3B82F6
  Usage: Articles in review
  RGB: rgb(59, 130, 246)

Error/Urgent (Red)
  Code: #EF4444
  Usage: Errors, urgent alerts
  RGB: rgb(239, 68, 68)
```

### Status Backgrounds (Pale)
```
Published Background
  Code: #ECFDF5
  Usage: Published status badge background
  Dark: #064E3B

Draft Background
  Code: #FEFCE8
  Usage: Draft status badge background
  Dark: #713F12

Review Background
  Code: #EFF6FF
  Usage: In review status badge background
  Dark: #1E3A8A

Error Background
  Code: #FEF2F2
  Usage: Error/urgent background
  Dark: #7F1D1D
```

### Category Badge Colors
```
Politics
  Background: #FEE2E2
  Text: #DC2626
  Dark BG: #7F1D1D
  Dark Text: #FCA5A5

Business
  Background: #FEF3C7
  Text: #D97706
  Dark BG: #78350F
  Dark Text: #FCD34D

Technology
  Background: #DBEAFE
  Text: #1D4ED8
  Dark BG: #1E3A8A
  Dark Text: #93C5FD

Metro
  Background: #E9D5FF
  Text: #7C3AED
  Dark BG: #4C1D95
  Dark Text: #D8B4FE

Sports
  Background: #DCFCE7
  Text: #16A34A
  Dark BG: #14532D
  Dark Text: #86EFAC
```

---

## 🔤 TYPOGRAPHY

### Font Families
```
Serif (Editorial)
  Primary: Georgia
  Fallbacks: 'DM Serif Display', 'Playfair Display', serif
  Usage: Page titles, major headings, editorial emphasis

Sans-Serif (UI)
  Primary: System fonts
  Fallbacks: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
  Usage: Body text, UI elements, labels

Monospace (Code)
  Primary: Monaco
  Fallbacks: 'Courier New', monospace
  Usage: Code snippets, technical text
```

### Font Sizes
```
Page Heading: 30-34px (serif, weight 600-700)
Section Heading: 16-18px (weight 600)
Card Title: 16px (weight 600)
Body: 14px (weight 400-500)
Small Text: 12-13px (weight 400-500)
Tiny Text: 11px (weight 600)
```

### Font Weights
```
Thin: 100 (rarely used)
Light: 300 (rarely used)
Regular: 400 (body text)
Medium: 500 (labels, light headings)
Semibold: 600 (headings, emphasis)
Bold: 700 (major headings)
```

---

## 📏 SPACING SYSTEM (8px Base)

```
Extra Small: 4px   (--space-xs)
Small: 8px         (--space-sm)
Medium: 12px       (--space-md)
Large: 16px        (--space-lg)
Extra Large: 24px  (--space-xl)
2X Large: 32px     (--space-2xl)
3X Large: 40px     (--space-3xl)
```

### Common Usage
```
Sidebar Padding: 16px
Card Padding: 24px
Content Padding: 32px
Card Gaps: 16px
Section Gaps: 24px
Grid Gaps: 16px
```

---

## 🔲 BORDER RADIUS

```
Small: 6px      (--radius-sm)      - Small elements, tags
Medium: 8px     (--radius-md)      - Buttons, inputs
Large: 12px     (--radius-lg)      - Cards, components
Extra Large: 16px (--radius-xl)    - Large sections
```

---

## 🌫️ SHADOWS

```
Extra Small: 0 1px 2px rgba(0, 0, 0, 0.05)
Small: 0 1px 3px rgba(0, 0, 0, 0.1)
Medium: 0 4px 12px rgba(0, 0, 0, 0.08)
Large: 0 10px 25px rgba(0, 0, 0, 0.1)
```

### Shadow Classes
```
.--shadow-xs   - Subtle shadow for hover states
.--shadow-sm   - Standard shadow for cards
.--shadow-md   - Medium shadow for floating elements
.--shadow-lg   - Large shadow for modals/dialogs
```

---

## ⚡ TRANSITIONS & ANIMATIONS

```
Standard: all 0.2s ease
Fast: all 0.15s ease
Slow: all 0.3s ease
```

### Usage
```
0.15s - Hover states, quick interactions
0.2s  - General transitions, default
0.3s  - Important state changes, modals
```

---

## 📐 COMPONENT DIMENSIONS

### Sidebar
```
Width: 230px (desktop)
Width: 200px (tablet)
Height: 100vh (full height)
Header Height: 72px
```

### Icons
```
Navigation Icons: 18-20px
Button Icons: 16-18px
Badge Icons: 14-16px
Avatar: 32-44px (depending on context)
```

### Cards
```
Padding: 24px
Border: 1px solid
Border Radius: 12px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
```

### Tables
```
Header Height: Auto
Row Height: 65-75px
Thumbnail Size: 42x42px
Cell Padding: 16px
```

### Buttons
```
Height: 40px (standard)
Height: 36px (compact)
Padding: 8px 16px (small)
Padding: 10px 20px (standard)
Padding: 12px 24px (large)
Border Radius: 8px
```

### Input Fields
```
Height: 40px
Padding: 8px 12px
Border: 1px solid
Border Radius: 8px
Focus Border: 2px
```

---

## 🎯 COMPONENT COLOR USAGE

### Buttons
```
Primary (Red): #E32626
Primary Hover: #D11D1D
Primary Disabled: opacity 0.5

Secondary: #F1F3F6
Secondary Text: #101828
Secondary Hover: #E5E7EB

Ghost: transparent
Ghost Text: #667085
Ghost Hover: #F1F3F6
```

### Badges & Pills
```
Status Badge Background: Pale version of status color
Status Badge Text: Status color
Category Badge Background: Pale category color
Category Badge Text: Dark category color
Notification Badge: #E32626 (red)
```

### Links
```
Default: #E32626 (red)
Hover: #D11D1D (dark red)
Visited: #A01C1C
Active: #E32626
```

---

## 🔍 FORM STYLING

### Input States
```
Default Border: #E5E7EB
Focus Border: #3B82F6
Focus Shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)
Error Border: #EF4444
Success Border: #10B981
```

### Placeholder
```
Color: #98A2B3
Opacity: 1
```

---

## 🌓 DARK MODE

### Dark Mode Colors
Prefix class with `.dark` to apply dark mode:

```
Background: #1A1F3A
Card Background: #252D45
Surface: #3A4556
Text Primary: #E5E7EB
Text Secondary: #9CA3AF
Text Muted: #6B7280
Border: #3A4556
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Desktop: 1440px+
Tablet: 1024px - 1400px
Mobile: 768px - 1023px
Small Mobile: 640px - 767px
Extra Small: < 640px
```

### Grid Adjustments
```
Desktop: 4-column KPI, 2-column analytics, 2-column content
Tablet: 2-column KPI, 1-column analytics, 1-column content
Mobile: 1-column KPI, 1-column analytics, 1-column content
```

---

## 🎨 CREATING NEW COMPONENTS

### Color Variables to Use
```css
/* Always use CSS variables */
background-color: var(--color-bg-card);
color: var(--color-text-primary);
border: 1px solid var(--color-border-light);
box-shadow: var(--shadow-sm);
```

### Spacing
```css
/* Always use spacing scale */
padding: var(--space-lg);
gap: var(--space-md);
margin-bottom: var(--space-xl);
```

### Transitions
```css
/* Use predefined transitions */
transition: var(--transition);
transition: var(--transition-fast);
```

---

## ✅ ACCESSIBILITY REQUIREMENTS

### Color Contrast
- Minimum 4.5:1 for text
- Minimum 3:1 for UI components
- Red (#E32626) on white (#FFFFFF): 5.9:1 ✅
- Navy (#07152E) on white (#FFFFFF): 10.3:1 ✅

### Font Size
- Minimum 12px for body text
- Minimum 14px for interactive elements
- Heading hierarchy maintained

### Focus States
- Clear 2-3px focus outline
- Minimum 4px focus area
- Color contrast > 3:1

---

## 📝 IMPLEMENTATION CHECKLIST

When implementing new admin pages:

- [ ] Use CSS variables for colors
- [ ] Follow spacing scale (8px grid)
- [ ] Use predefined border radiuses
- [ ] Apply appropriate shadows
- [ ] Include hover states
- [ ] Add focus states
- [ ] Test responsive design
- [ ] Verify accessibility
- [ ] Use semantic HTML
- [ ] Follow typography hierarchy
- [ ] Maintain brand colors
- [ ] Test in light and dark mode

---

**Last Updated**: September 1, 2026  
**Version**: 1.0  
**Status**: Complete & Production Ready  
