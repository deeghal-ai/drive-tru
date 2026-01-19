# Drive Life - Pre-owned Car Marketplace Prototype

> **⚠️ DESIGN PROTOTYPE** - Not for production deployment
> 
> This prototype is for stakeholder presentations, RFP estimation, and client sign-off.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

---

## Project Structure

```
drivelife-prototype/
├── .ai/                          # AI context files (READ THESE FIRST!)
│   ├── AI_SESSION_PROMPT.md     # Copy this when starting AI sessions
│   ├── CONTEXT.md               # Project state & progress tracking
│   ├── FEATURES.md              # Complete feature matrix (BUILD/MOCK status)
│   ├── PAGES.md                 # All pages with requirements
│   ├── V0_PROMPTS.md            # Ready-to-use v0.dev prompts ⭐
│   └── INTEGRATIONS.md          # Integration docs for RFP
├── src/
│   ├── app/[locale]/            # Pages (en/ar routes)
│   ├── components/              # React components
│   ├── data/                    # Mock data (JSON/TS)
│   ├── lib/                     # Utilities
│   └── styles/                  # Global CSS
├── .cursorrules                 # Cursor AI configuration
└── package.json
```

---

## Development Workflow

### 1. Generate Components with v0.dev

1. Open `.ai/V0_PROMPTS.md`
2. Find the component you need
3. Copy the prompt to [v0.dev](https://v0.dev)
4. Generate and copy the code
5. Paste into your component file
6. Connect to mock data from `/src/data/`

### 2. Working with AI (Cursor/Claude)

1. Copy contents of `.ai/AI_SESSION_PROMPT.md`
2. Paste at start of your AI session
3. Tell AI what you want to build
4. AI will reference the context files

### 3. Track Progress

Update `.ai/CONTEXT.md` to mark:
- Completed pages
- Completed features
- Any blockers

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `.ai/V0_PROMPTS.md` | Ready-made prompts for v0.dev components |
| `.ai/FEATURES.md` | What to BUILD vs MOCK |
| `src/data/cars.ts` | Mock car inventory (20 vehicles) |
| `src/data/locations.ts` | 3 UAE showrooms |
| `src/data/translations.ts` | EN/AR translations |
| `src/lib/utils.ts` | Helper functions (formatPrice, EMI calc, etc.) |

---

## Mock Data Available

### Cars (`src/data/cars.ts`)
- 20 pre-owned vehicles
- Brands: Suzuki, Citroen, Toyota, Nissan, Honda, VW
- All fields populated (price, specs, features, status)

### Locations (`src/data/locations.ts`)
- Deira Showroom (Dubai)
- Sheikh Zayed Road Showroom (Dubai)
- Abu Dhabi Showroom

### Offers (`src/data/offers.ts`)
- 5 promotional offers
- Types: Financing, Trade-in, Seasonal, Brand

### Translations (`src/data/translations.ts`)
- English and Arabic
- Navigation, forms, common terms

---

## Page Routes

| Route | Page | Priority |
|-------|------|----------|
| `/en` or `/ar` | Home | P0 |
| `/[locale]/buy/cars` | Car Listings | P0 |
| `/[locale]/buy/cars/[id]` | Car Detail | P0 |
| `/[locale]/sell/valuation` | Sell My Car (Wizard) | P0 |
| `/[locale]/finance/calculator` | EMI Calculator | P0 |
| `/[locale]/locations` | Store Locator | P1 |
| `/[locale]/offers` | Promotions | P2 |
| `/[locale]/tools/my-garage` | Favorites + Compare | P1 |
| `/admin/approvals` | CMS Mockup | P2 |

---

## Styling

### CSS Classes Available

```css
/* Buttons */
.btn-primary    /* Dark navy button */
.btn-secondary  /* Red accent button */
.btn-whatsapp   /* Green WhatsApp button */
.btn-outline    /* Outlined button */

/* Badges */
.badge-available  /* Green status */
.badge-reserved   /* Orange status */
.badge-sold       /* Red status */
.badge-certified  /* Blue certified badge */

/* Cards */
.car-card         /* Standard car card */
.car-card-image   /* Card image container */

/* Layout */
.page-container   /* Page wrapper */
.section          /* Content section */
.section-title    /* Section heading */
.hero             /* Hero section */
```

### Design Tokens

```css
/* Brand Colors */
--primary: #1a1a2e      /* Dark navy */
--secondary: #e94560    /* Accent red */
--accent: #0f3460       /* Deep blue */

/* Status Colors */
--available: #10b981    /* Green */
--reserved: #f59e0b     /* Orange */
--sold: #ef4444         /* Red */
```

---

## Utility Functions

```typescript
import { formatPrice, formatMileage, calculateEMI } from '@/lib/utils'

// Format price
formatPrice(75000) // "AED 75,000"

// Format mileage  
formatMileage(45000) // "45,000 km"

// Calculate EMI
calculateEMI(75000, 3.99, 60) // Monthly payment

// WhatsApp link
getWhatsAppLink('+971501234567', 'Hello!')

// Favorites (localStorage)
storage.getFavorites()
storage.setFavorites(['DL-001', 'DL-002'])
```

---

## RTL Support

Arabic pages automatically get:
- `dir="rtl"` on container
- Arabic font family
- Mirrored layouts via Tailwind

To flip icons for RTL:
```html
<Icon className="rtl-flip" />
```

---

## What's BUILD vs MOCK?

See `.ai/FEATURES.md` for full matrix.

**BUILD (Functional):**
- Car listing with filters
- Car detail page
- EMI calculator
- Favorites (localStorage)
- Compare feature
- Language toggle
- Form UIs

**MOCK (Visual Only):**
- Valuation result (hardcoded price)
- CMS approval workflow
- Dubizzle/YallaMotors publish
- 360° viewer (placeholder)
- Form submissions (success message only)

---

## Next Steps

1. **Day 1-2:** Foundation
   - Run `npm install && npm run dev`
   - Generate Header/Footer from v0.dev
   - Complete Home page sections

2. **Day 3-4:** Core Features
   - Car listing with filters
   - Car detail page
   - EMI calculator

3. **Day 5:** Sell Flow
   - Valuation wizard steps
   - Damage stencil component

4. **Day 6:** Supporting Pages
   - Locations
   - Offers
   - About

5. **Day 7:** Polish
   - CMS mockup
   - Arabic pass
   - Documentation

---

## For RFP/Estimation

Reference `.ai/INTEGRATIONS.md` for:
- Integration effort estimates
- Technical requirements
- Questions for client
- Phase recommendations

---

## 🚀 Deployment

**Status:** ✅ Ready to deploy to Vercel!

### Quick Deploy (2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel

# Follow prompts → Your prototype is LIVE!
```

### Your URLs After Deploy
- **Production**: `https://drivelife-prototype.vercel.app`
- **English**: `https://drivelife-prototype.vercel.app/en`
- **Arabic**: `https://drivelife-prototype.vercel.app/ar`

### Already Configured ✅
- ✅ `next.config.js` - TypeScript errors ignored
- ✅ `vercel.json` - UAE region optimized (dub1)
- ✅ Build command ready: `npm run build`

### Documentation
- **Quick Guide**: [`DEPLOY.md`](DEPLOY.md) - TL;DR version
- **Full Guide**: [`.ai/DEPLOYMENT.md`](.ai/DEPLOYMENT.md) - Complete instructions, troubleshooting, templates

### Test Build Locally
```bash
npm run build
npm start
# Open http://localhost:3000
```

### Why Vercel?
- Zero configuration for Next.js
- Automatic preview URLs for every git push
- Free SSL certificate
- UAE region support (dub1)
- Perfect for prototype demos

---

## Notes

- This is a **prototype** - code quality is secondary to visual completeness
- All data is static JSON - no database needed
- No real API calls - everything is mocked
- TypeScript errors are ignored in build (prototype mode)
- Focus on demonstrating features, not production-readiness
