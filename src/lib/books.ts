export type BookStatus = 'reading' | 'read' | 'want'
export type BookGenre =
  | 'AI & Technology'
  | 'Productivity'
  | 'Finance'
  | 'Philosophy & Mindset'
  | 'History & Society'
  | 'Science'

export interface Book {
  title: string
  author: string
  status: BookStatus
  genre: BookGenre
  color: string
  note?: string
}

export const BOOKS: Book[] = [
  // ── AI & Technology ───────────────────────────────────────────────────────
  {
    title: 'Machine Learning System Design Interview',
    author: 'Alex Xu & Sahn Lam',
    status: 'read',
    genre: 'AI & Technology',
    color: '#2C4A7C',
    note: 'Great for thinking through how ML systems actually get built and deployed.',
  },
  {
    title: 'Human Compatible',
    author: 'Stuart Russell',
    status: 'read',
    genre: 'AI & Technology',
    color: '#2E4A3E',
    note: 'Probably the most lucid argument for why AI alignment actually matters.',
  },
  {
    title: 'Uncontrollable',
    author: 'Darren McKee',
    status: 'read',
    genre: 'AI & Technology',
    color: '#8B1A1A',
    note: 'On the limits of AI and why the control problem is harder than it looks.',
  },
  {
    title: 'Technopoly',
    author: 'Neil Postman',
    status: 'want',
    genre: 'AI & Technology',
    color: '#1A1A2E',
    note: 'A prescient critique of how technology takes over culture. More relevant than ever.',
  },
  {
    title: 'AI Ethics',
    author: 'Mark Coeckelbergh',
    status: 'read',
    genre: 'AI & Technology',
    color: '#3B4A6B',
    note: 'A clear-headed introduction to the philosophical and social questions AI forces us to confront.',
  },

  // ── Productivity ──────────────────────────────────────────────────────────
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'read',
    genre: 'Productivity',
    color: '#D4520A',
    note: 'Changed how I think about building routines. The 1% rule stuck with me.',
  },
  {
    title: 'Mindset',
    author: 'Carol S. Dweck',
    status: 'read',
    genre: 'Productivity',
    color: '#C0392B',
    note: 'The growth vs. fixed mindset distinction is one of those ideas that reframes a lot.',
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    status: 'reading',
    genre: 'Productivity',
    color: '#2E4057',
    note: 'Overquoted, but the principles hold up surprisingly well.',
  },
  {
    title: 'The Comfort Book',
    author: 'Matt Haig',
    status: 'want',
    genre: 'Productivity',
    color: '#4A6FA5',
    note: 'Short, honest, and quietly comforting. Good to return to.',
  },
  {
    title: 'How to Calm Your Mind',
    author: 'Chris Bailey',
    status: 'want',
    genre: 'Productivity',
    color: '#5D8A6A',
    note: 'Practical and grounded. Good overlap with productivity and well-being.',
  },
  {
    title: 'The 5 AM Club',
    author: 'Robin Sharma',
    status: 'want',
    genre: 'Productivity',
    color: '#E8A020',
    note: 'The story format is a bit much, but the morning routine framework is reportedly useful.',
  },

  // ── Finance ───────────────────────────────────────────────────────────────
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    status: 'read',
    genre: 'Finance',
    color: '#3D6B4F',
    note: 'The best book on how emotions and behaviour shape financial decisions.',
  },
  {
    title: 'Same as Ever',
    author: 'Morgan Housel',
    status: 'read',
    genre: 'Finance',
    color: '#2A3D9F',
    note: 'About the things that never change, no matter how much the world does.',
  },
  {
    title: 'The Richest Man in Babylon',
    author: 'George S. Clason',
    status: 'read',
    genre: 'Finance',
    color: '#B8860B',
    note: 'Timeless personal finance principles wrapped in a parable. Surprisingly good.',
  },
  {
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    status: 'reading',
    genre: 'Finance',
    color: '#1C3D5A',
    note: 'The classic on value investing. Dense but worth it.',
  },

  // ── Philosophy & Mindset ──────────────────────────────────────────────────
  {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    status: 'read',
    genre: 'Philosophy & Mindset',
    color: '#4A7A5A',
    note: 'Slow going at first, but some of the ideas on presence genuinely land.',
  },
  {
    title: 'The Emergent Mind',
    author: 'Various',
    status: 'reading',
    genre: 'Philosophy & Mindset',
    color: '#5A4A6A',
    note: 'On consciousness, intelligence, and what it means for something to think.',
  },

  // ── History & Society ─────────────────────────────────────────────────────
  {
    title: 'The Anatomy of Hate',
    author: 'Revati Laul',
    status: 'read',
    genre: 'History & Society',
    color: '#8B2020',
    note: 'Deeply reported journalism on the roots of communal violence in India.',
  },
  {
    title: 'Age of Unpeace',
    author: 'Mark Leonard',
    status: 'read',
    genre: 'History & Society',
    color: '#4A3728',
    note: 'On how connectivity and interdependence have become tools of geopolitical conflict.',
  },
  {
    title: 'The Tattooist of Auschwitz',
    author: 'Heather Morris',
    status: 'read',
    genre: 'History & Society',
    color: '#2C2C2C',
    note: 'A story that stays with you. Hard to put down, harder to forget.',
  },

  // ── Science ───────────────────────────────────────────────────────────────
  {
    title: 'Chaos',
    author: 'James Gleick',
    status: 'want',
    genre: 'Science',
    color: '#1A3A4A',
    note: 'The book that made chaos theory accessible. Been meaning to read this for a while.',
  },
  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    status: 'want',
    genre: 'Science',
    color: '#1C1C2E',
    note: 'Still the best attempt to make cosmology genuinely accessible.',
  },
]
