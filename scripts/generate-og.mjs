import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const W = 1200
const H = 630
const AV = 300

// ── 1. Circular avatar ───────────────────────────────────────────────────────
const mask = Buffer.from(
  `<svg width="${AV}" height="${AV}"><circle cx="${AV / 2}" cy="${AV / 2}" r="${AV / 2}" fill="white"/></svg>`
)

const circularAvatar = await sharp(path.join(root, 'public/images/avatar.jpg'))
  .resize(AV, AV, { fit: 'cover', position: 'centre' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer()

// ── 2. SVG background + text ─────────────────────────────────────────────────
const avatarCX = 880
const avatarCY = 315

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#C17F59" opacity="0.10"/>
    </pattern>
  </defs>

  <!-- Light background -->
  <rect width="${W}" height="${H}" fill="#FAF7F2"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- Decorative rings -->
  <circle cx="${avatarCX}" cy="${avatarCY}" r="${AV / 2 + 20}" fill="none" stroke="#C17F59" stroke-width="1.5" opacity="0.25"/>
  <circle cx="${avatarCX}" cy="${avatarCY}" r="${AV / 2 + 42}" fill="none" stroke="#C17F59" stroke-width="1" opacity="0.12"/>

  <!-- Accent bar -->
  <rect x="80" y="200" width="5" height="80" rx="2.5" fill="#C17F59"/>

  <!-- Name -->
  <text x="114" y="268"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="72" font-weight="bold"
    fill="#2C1A0E" letter-spacing="-1">Adit Whorra</text>

  <!-- Subtitle -->
  <text x="116" y="316"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="27" fill="#C17F59" letter-spacing="0.5">ML Researcher &amp; AI Scientist</text>
</svg>`

// ── 3. Render base ───────────────────────────────────────────────────────────
const base = await sharp(Buffer.from(svg)).png().toBuffer()

// ── 4. Composite avatar ──────────────────────────────────────────────────────
await sharp(base)
  .composite([
    {
      input: circularAvatar,
      left: avatarCX - AV / 2,
      top: avatarCY - AV / 2,
    },
  ])
  .jpeg({ quality: 92 })
  .toFile(path.join(root, 'public/og-image.jpg'))

console.log('✓ public/og-image.jpg generated (1200×630)')
