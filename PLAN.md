# Portfolio Website — Adit Whorra
## Implementation Plan

## Tech Stack

- **Framework:** Next.js 14+ (App Router, `output: 'export'` for static GitHub Pages hosting)
- **Styling:** Tailwind CSS + `@tailwindcss/typography` (for MDX prose)
- **Blog:** `next-mdx-remote` (v5, RSC-compatible) + `gray-matter` for frontmatter parsing
- **Dark mode:** `next-themes` (class strategy)
- **Animations:** `framer-motion` (scroll-triggered via `whileInView`, hover via `whileHover`, mount stagger)
- **Contact form:** Formspree (free tier, no backend needed)
- **Fonts:** `next/font/google` — Inter (sans) + Playfair Display (serif for headings)
- **Icons:** `lucide-react`
- **Utilities:** `clsx`, `tailwind-merge`, `reading-time`
- **Deployment:** GitHub Actions → `peaceiris/actions-gh-pages` → `gh-pages` branch

---

## Color Palette (Warm Neutrals + Earthy, Light + Dark)

```
Light mode:
  bg-primary:   #FAF7F2   (warm linen off-white)
  bg-secondary: #F0EBE3   (warm cream)
  bg-card:      #FFFFFF
  text-primary: #2C1A0E   (dark espresso)
  text-sec:     #5C4033   (warm brown)
  text-muted:   #8C7060   (taupe)
  accent:       #C17F59   (terracotta)
  accent-hover: #A6694A

Dark mode:
  bg-primary:   #1A1310   (deep warm black)
  bg-secondary: #221A16
  bg-card:      #2C201A
  text-primary: #F5EFE6   (cream)
  text-sec:     #D4C4B0
  text-muted:   #9C8878
  accent:       #D4956A   (warm amber)
  accent-hover: #E8A87C
```

Defined in `tailwind.config.js` under `theme.extend.colors` as nested tokens. All components use `dark:` variants.

---

## File Structure

```
portfolio/
├── .github/workflows/deploy.yml
├── public/
│   ├── images/
│   │   ├── blog/ai-social-impact-hero.jpg     # placeholder (user to replace)
│   │   └── avatar.jpg                         # placeholder (user to replace with headshot)
│   └── cv/adit-whorra-cv.pdf                  # placeholder (user to replace)
├── src/
│   ├── app/
│   │   ├── layout.tsx                         # ThemeProvider, Navbar, Footer, fonts
│   │   ├── globals.css
│   │   ├── page.tsx                           # Home (all sections)
│   │   ├── blog/
│   │   │   ├── page.tsx                       # Blog list grid
│   │   │   └── [slug]/page.tsx               # Blog post (full-screen hero + MDX)
│   │   ├── projects/page.tsx
│   │   ├── contact/page.tsx
│   │   └── cv/page.tsx                        # CV download landing
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                     # sticky, scroll blur, mobile menu
│   │   │   ├── Footer.tsx
│   │   │   ├── ThemeToggle.tsx               # sun/moon icon, framer transition
│   │   │   └── SocialLinks.tsx               # LinkedIn, Medium, GitHub, Google Scholar
│   │   ├── home/
│   │   │   ├── HeroSection.tsx               # full-viewport, staggered fadeUp
│   │   │   ├── AboutSection.tsx              # 2-col: avatar + bio + interest pills
│   │   │   ├── LatestAnnouncements.tsx       # dated news feed, static data
│   │   │   ├── CurrentWorkSection.tsx        # accent-bordered card
│   │   │   ├── FeaturedProjects.tsx          # 3 project cards
│   │   │   └── LatestBlogPreview.tsx         # 2 blog cards
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx                  # variant: 'full' | 'compact'
│   │   │   ├── BlogHero.tsx                  # 100vh CSS bg-image + gradient overlay
│   │   │   └── TagPill.tsx
│   │   ├── projects/ProjectCard.tsx
│   │   ├── contact/ContactForm.tsx           # Formspree, controlled, success/error state
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── SectionHeading.tsx
│   ├── content/blog/
│   │   └── ai-social-impact-asr-indic-languages.mdx   # sample post (real content)
│   ├── lib/
│   │   ├── mdx.ts                            # getAllPosts(), getPostBySlug()
│   │   ├── projects.ts                       # static PROJECTS array (real projects)
│   │   └── announcements.ts                  # static ANNOUNCEMENTS array (real data)
│   └── types/
│       ├── blog.ts                           # BlogFrontmatter interface
│       └── project.ts                        # Project interface
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## Key Configuration

### next.config.js
```js
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}
```
> **Note:** `basePath` must match the GitHub repo name. Update if the repo is named differently.

### package.json Dependencies
```json
{
  "dependencies": {
    "next": "^14.2.0", "react": "^18.3.0", "react-dom": "^18.3.0",
    "next-themes": "^0.3.0", "framer-motion": "^11.0.0",
    "gray-matter": "^4.0.3", "next-mdx-remote": "^5.0.0",
    "reading-time": "^1.5.0", "lucide-react": "^0.400.0",
    "clsx": "^2.1.0", "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.0", "typescript": "^5.4.0",
    "@types/react": "^18.3.0", "@types/node": "^20.0.0",
    "tailwindcss": "^3.4.0", "postcss": "^8.4.0", "autoprefixer": "^10.4.0"
  }
}
```

---

## Page-by-Page Layout

### Home (`/`)
Sections in order (each `<section id="...">` for anchor nav links):
1. **HeroSection** — min-h-screen, centered; eyebrow + name (serif H1) + tagline + CTA row; staggered Framer fadeUp on mount
2. **AboutSection** — 2-col: photo left, bio paragraphs + interest pills right; whileInView fade
3. **LatestAnnouncements** — 4 real news items with date badges, headlines, descriptions; stagger on scroll
4. **CurrentWorkSection** — Wadhwani AI ASR/TTS work + HIPPO Lab context; accent left-border card
5. **FeaturedProjects** — first 3 ProjectCards + "View All" CTA
6. **LatestBlogPreview** — 1 BlogCard (compact) + "Read All Posts" CTA

### Blog List (`/blog`)
- Server component; `getAllPosts()` from `lib/mdx.ts`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Each `BlogCard (variant="full")`: hero image, gradient overlay, title, date + reading time, excerpt, tag pills

### Blog Post (`/blog/[slug]`)
- Server component with `generateStaticParams` (required for static export)
- `BlogHero` — 100vh CSS `background-image`, bottom-up dark gradient overlay, title + date + reading time at bottom-left, animated scroll-down chevron
- Article body: `max-w-2xl mx-auto`, `prose dark:prose-invert` Tailwind typography
- MDX rendered via `compileMDX` from `next-mdx-remote/rsc`

### Projects (`/projects`)
- 4 real projects from `lib/projects.ts`
- `grid-cols-1 md:grid-cols-2` (4 cards), Framer whileHover on cards

### Contact (`/contact`)
- 2-col on md+: left = heading + "Get in touch" blurb + SocialLinks; right = ContactForm
- Formspree POST: `https://formspree.io/f/{FORM_ID}` — user fills after Formspree signup
- Email displayed: aditwhorra@gmail.com

### CV (`/cv`)
- Landing page with "Download CV" button → `/cv/adit-whorra-cv.pdf`

---

## Blog MDX Frontmatter Schema
```ts
interface BlogFrontmatter {
  title: string
  date: string       // ISO 8601 e.g. "2025-03-01"
  excerpt: string
  heroImage: string  // "/images/blog/filename.jpg"
  tags: string[]
  published: boolean
}
```

---

## lib/mdx.ts Functions

```ts
getAllPosts(): BlogPost[]
  // fs.readdirSync src/content/blog → gray-matter parse each → filter published:true → sort by date desc

getPostBySlug(slug: string): { frontmatter, content }
  // fs.readFileSync src/content/blog/{slug}.mdx → gray-matter → return raw MDX string
```

`app/blog/[slug]/page.tsx` calls `compileMDX({ source: content })` from `next-mdx-remote/rsc`.

---

## Navbar Design
- Sticky top-0, z-50, backdrop-blur + bg-opacity on scroll (`isScrolled` state — `use client`)
- Desktop: "Adit Whorra" logo → About · Blog · Projects · CV · Contact → ThemeToggle + SocialIcons
- Mobile: Hamburger → slide-down menu

## Server vs Client Boundary
- `use client`: Navbar, ThemeToggle, ContactForm, Framer wrapper components
- Server: all page files, layout, blog post rendering, data fetching via `fs`

---

## GitHub Actions Deploy

`.github/workflows/deploy.yml`:
1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 20, npm cache)
3. `npm ci`
4. `npm run build` (env: `NODE_ENV=production`)
5. `touch out/.nojekyll` ← **critical**: prevents Jekyll from ignoring `_next/` directory
6. `peaceiris/actions-gh-pages@v3` → publishes `./out` to `gh-pages` branch

Repo Settings → Pages → Source: `gh-pages` branch, `/ (root)`.
Live URL: `https://<github-username>.github.io/portfolio`

---

## Items Requiring User Input After Build
- `public/images/avatar.jpg` — replace with real headshot
- `public/cv/adit-whorra-cv.pdf` — replace with actual CV PDF
- `public/images/blog/ai-social-impact-hero.jpg` — replace with a real blog hero image
- All `githubUrl: "#"` in `lib/projects.ts` → replace with real GitHub repo links
- All `url: null` in `lib/announcements.ts` → optionally add paper/article links
- Social links (Medium, GitHub, Google Scholar) in `SocialLinks.tsx` → add real URLs
- Formspree form ID in `ContactForm.tsx` → sign up at formspree.io, create form, paste ID

---

## Verification

```bash
# Local dev
npm install && npm run dev
# Visit: /, /blog, /blog/ai-social-impact-asr-indic-languages, /projects, /contact, /cv

# Static export test
npm run build
npx serve out -p 3001
# Visit http://localhost:3001/portfolio
# Check: nav links, dark mode toggle, blog post hero, project cards, contact form

# Pre-deploy checklist
# 1. basePath in next.config.js matches repo name
# 2. out/.nojekyll exists
# 3. out/blog/ai-social-impact-asr-indic-languages/index.html exists
# 4. Dark mode: html.dark class toggled correctly
# 5. Images all 200 OK in Network tab
```
