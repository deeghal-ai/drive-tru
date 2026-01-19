# Pages Specification - Drive Life Prototype

> Complete page inventory based on sitemap
> Each page has: Route, Components needed, Data requirements, Priority

---

## Route Structure

```
/[locale]/                    # en or ar
├── /                         # Home
├── /about                    # About Drive Life
│   └── /vision              # Vision & Mission
├── /buy                      # Browse all cars (redirect to /buy/cars)
│   ├── /cars                 # Car listings
│   │   └── /[id]            # Car detail
│   ├── /popular             # Popular models
│   └── /body-types          # Browse by body type
│       └── /[type]          # e.g., /body-types/suv
├── /sell                     # Sell landing
│   ├── /valuation           # Sell my car (wizard)
│   └── /trade-in            # Trade-in flow
├── /finance                  # Finance landing
│   └── /calculator          # EMI calculator
├── /offers                   # Promotions
├── /locations               # Store locator
│   └── /[slug]              # Individual showroom
├── /tools
│   ├── /my-garage           # Favorites + Compare
│   └── /contact             # Contact form
├── /news                     # Articles listing
│   └── /[slug]              # Article detail
└── /admin                    # CMS mockup (no locale)
    └── /approvals           # Approval queue
```

---

## Page Details

### 🏠 HOME PAGE

**Route:** `/[locale]`
**Priority:** P0 (Day 1)

**Sections:**
1. Hero with search bar
2. Featured vehicles (4 cards)
3. Browse by body type
4. Browse by brand
5. Why choose us (USPs)
6. Sell your car CTA
7. Current offers
8. Testimonials (optional)

**Components Needed:**
- `HeroSearch`
- `CarCard` (reusable)
- `BodyTypeCard`
- `BrandLogo`
- `USPCard`
- `SellCTA`
- `OfferBanner`

**Data:**
- Featured cars (4 items from `cars.ts`)
- Body types list
- Brand logos
- USP content
- Active offers

---

### ℹ️ ABOUT PAGE

**Route:** `/[locale]/about`
**Priority:** P3 (Day 6)

**Sections:**
1. Hero with company image
2. Our story
3. Vision & Mission (subpage link)
4. Leadership team (optional)
5. Why Drive Life
6. Partners/Certifications

**Components:**
- `PageHero`
- `ContentSection`
- `TeamCard` (optional)
- `CertificationBadge`

**Data:**
- Static content (hardcoded is fine)
- Team photos (stock images)

---

### 🚗 BUY - CAR LISTINGS

**Route:** `/[locale]/buy/cars`
**Priority:** P0 (Day 2-3)

**Layout:**
- Sidebar filters (left)
- Main grid (right)
- Mobile: Filter drawer

**Sections:**
1. Page header with results count
2. Sort + View toggle
3. Active filters bar
4. Car grid
5. Pagination

**Components:**
- `FilterSidebar`
- `FilterDrawer` (mobile)
- `ActiveFilters`
- `SortDropdown`
- `ViewToggle`
- `CarCard`
- `CarListRow` (list view)
- `Pagination`
- `NoResults`

**Data:**
- Full car inventory (`cars.ts`)
- Filter options (derived from data)

**Interactivity:**
- Filter changes update URL params
- Sort updates grid
- Favorites toggle
- Compare checkbox
- Pagination works

---

### 🚘 BUY - CAR DETAIL

**Route:** `/[locale]/buy/cars/[id]`
**Priority:** P0 (Day 3)

**Sections:**
1. Breadcrumb
2. Image gallery with 360° button
3. Price and key info panel
4. Action buttons (Test Drive, WhatsApp, Call)
5. Specifications tabs
6. Similar vehicles
7. Sticky mobile CTA bar

**Components:**
- `Breadcrumb`
- `ImageGallery`
- `PricePanel`
- `SpecsTabs`
- `ActionButtons`
- `SimilarCars`
- `MobileCTABar`
- `TestDriveModal`
- `Modal360View` (placeholder)

**Data:**
- Single car by ID
- Similar cars (same make/type)

**Interactivity:**
- Image gallery navigation
- Tab switching
- Add to favorites
- Add to compare
- Open modals

---

### 📊 BUY - POPULAR MODELS

**Route:** `/[locale]/buy/popular`
**Priority:** P2 (Day 6)

**Sections:**
1. Page header
2. Model cards grid (top selling)
3. View by brand tabs

**Components:**
- `ModelCard` (Suzuki Swift, Citroen C3, etc.)
- `BrandTabs`

**Data:**
- Aggregated by model
- Count per model

---

### 🚙 BUY - BODY TYPES

**Route:** `/[locale]/buy/body-types`
**Sub-route:** `/[locale]/buy/body-types/[type]`
**Priority:** P2 (Day 6)

**Sections:**
1. Body type selection (SUV, Sedan, etc.)
2. Filtered car grid

**Components:**
- `BodyTypeSelector`
- Reuse `CarGrid` with filter

**Data:**
- Body types with images
- Pre-filtered car list

---

### 💵 SELL - LANDING

**Route:** `/[locale]/sell`
**Priority:** P1 (Day 5)

**Sections:**
1. Hero: "Sell Your Car"
2. How it works (3 steps)
3. CTA buttons: Instant Valuation | Trade-in
4. Why sell with us
5. FAQ section

**Components:**
- `SellHero`
- `HowItWorks`
- `FAQ`

---

### 📋 SELL - VALUATION WIZARD

**Route:** `/[locale]/sell/valuation`
**Priority:** P0 (Day 5)

**Steps:**
1. VIN Input
2. Vehicle Confirmation
3. Mileage & Condition
4. Photo Upload
5. Damage Marking (Stencil)
6. Valuation Result

**Components:**
- `WizardProgress`
- `VINInput`
- `VehicleConfirm`
- `ConditionSelector`
- `PhotoUpload`
- `DamageStencil`
- `ValuationResult`
- `WizardNavigation`

**Data:**
- Decoded VIN (mocked)
- Valuation result (hardcoded)

**Interactivity:**
- Step navigation
- Form validation per step
- Photo preview (local, not uploaded)
- Damage marking toggle

---

### 🔄 SELL - TRADE-IN

**Route:** `/[locale]/sell/trade-in`
**Priority:** P2 (Day 5)

**Sections:**
1. Select car to buy (from inventory)
2. Enter your car details (valuation flow)
3. Combined quote display

**Components:**
- Reuse `CarPicker`
- Reuse valuation components
- `TradeInSummary`

---

### 💳 FINANCE - LANDING

**Route:** `/[locale]/finance`
**Priority:** P1 (Day 4)

**Sections:**
1. Hero: "Easy Car Financing"
2. Bank partners logos
3. Link to EMI Calculator
4. Eligibility checker CTA
5. How financing works
6. FAQ

**Components:**
- `FinanceHero`
- `BankPartners`
- `FinanceFAQ`

---

### 🧮 FINANCE - EMI CALCULATOR

**Route:** `/[locale]/finance/calculator`
**Priority:** P0 (Day 4)

**Sections:**
1. Calculator widget (full width)
2. Explanation sidebar
3. CTA to apply

**Components:**
- `EMICalculator`
- `ApplyFinanceCTA`

**Interactivity:**
- Real-time calculation
- Slider inputs
- Toggle down payment type

---

### 📋 FINANCE - ELIGIBILITY FORM

**Route:** `/[locale]/finance/eligibility`
**Priority:** P1 (Day 7)
**Status:** ✅ COMPLETED

**Steps:**
1. Personal Details (name, email, phone, nationality, EID)
2. Employment (type, employer, duration, address)
3. Income & Liabilities (salary, loans, credit card debt)
4. Loan Requirements (vehicle price, down payment, tenure)

**Components:**
- Step progress indicator
- Form fields with validation
- Loan estimate calculator
- Success confirmation page

**Interactivity:**
- Multi-step navigation
- Per-step validation
- Real-time EMI calculation
- Reference number on submission

---

### 🛡️ INSURANCE - LANDING + QUOTE

**Route:** `/[locale]/insurance`
**Priority:** P1 (Day 7)
**Status:** ✅ COMPLETED

**Sections:**
1. Hero with stats and CTA
2. Insurance partners logos (6 partners)
3. Quote calculator form
4. Coverage type selection
5. Optional add-ons
6. Quote result display
7. Coverage comparison table
8. Benefits section
9. FAQ

**Components:**
- Quote calculator with dropdowns
- Coverage type cards (radio)
- Add-on toggles
- Quote result panel
- Comparison table
- FAQ accordion

**Interactivity:**
- Real-time quote calculation
- Coverage type switching
- Add-on selection
- Animated quote reveal

---

### 🏷️ OFFERS PAGE

**Route:** `/[locale]/offers`
**Priority:** P2 (Day 6)

**Sections:**
1. Page header
2. Active offers grid
3. Expired offers (collapsed)

**Components:**
- `OfferCard`
- `OfferFilter`

**Data:**
- 4-6 mock offers with images

---

### 📍 LOCATIONS - STORE LOCATOR

**Route:** `/[locale]/locations`
**Priority:** P1 (Day 6)

**Sections:**
1. Map embed
2. Location cards
3. Filter by emirate

**Components:**
- `MapEmbed`
- `LocationCard`
- `EmirateFilter`

**Data:**
- 3 showrooms (Deira, SZR, Abu Dhabi)
- Coordinates, hours, contact

---

### 📍 LOCATIONS - SHOWROOM DETAIL

**Route:** `/[locale]/locations/[slug]`
**Priority:** P3 (Day 6)

**Sections:**
1. Showroom gallery
2. Contact details
3. Map
4. Services available
5. Operating hours

**Components:**
- `ShowroomDetail`
- `ServicesList`
- `HoursTable`

---

### 🔧 TOOLS - MY GARAGE

**Route:** `/[locale]/tools/my-garage`
**Priority:** P1 (Day 4)

**Sections:**
1. Saved favorites tab
2. Compare list tab
3. Recently viewed (optional)

**Components:**
- `GarageTabs`
- `FavoritesList`
- `CompareList`
- `EmptyState`

**Interactivity:**
- Tab switching
- Remove items
- Navigate to compare view

---

### 📞 TOOLS - CONTACT

**Route:** `/[locale]/tools/contact`
**Priority:** P2 (Day 6)

**Sections:**
1. Contact form
2. Direct contact info
3. FAQ
4. Map to locations

**Components:**
- `ContactForm`
- `ContactInfo`
- `FAQ`

---

### 📰 NEWS - LISTING

**Route:** `/[locale]/news`
**Priority:** P3 (Day 6)

**Sections:**
1. Featured article (large)
2. Article grid
3. Categories filter

**Components:**
- `ArticleCard`
- `FeaturedArticle`

**Data:**
- 4-5 mock articles

---

### 📰 NEWS - ARTICLE DETAIL

**Route:** `/[locale]/news/[slug]`
**Priority:** P3 (Day 6)

**Sections:**
1. Article header (title, date, author)
2. Feature image
3. Content body
4. Related articles
5. Share buttons

**Components:**
- `ArticleHeader`
- `ArticleContent`
- `RelatedArticles`

---

### 🔐 ADMIN - DASHBOARD

**Route:** `/admin`
**Priority:** P2 (Day 7)
**Status:** ✅ COMPLETED

**Note:** No authentication, professional CMS mockup

**Sections:**
1. Stats cards (Pending, Approved Today, Published, Total Active)
2. Recent activity feed with action types
3. Pending approvals preview with quick actions
4. Alerts section (warnings, errors, info)
5. Publishing status with progress bars
6. Quick actions panel

**Components:**
- `AdminLayout` (sidebar + topbar)
- Stats cards
- Activity feed
- Quick action cards

---

### 🔐 ADMIN - APPROVALS

**Route:** `/admin/approvals`
**Priority:** P2 (Day 7)
**Status:** ✅ COMPLETED

**Sections:**
1. Stats cards (Pending, Approved, Rejected) - clickable filters
2. Tab filters (All, Pending, Approved, Rejected)
3. Search bar
4. Approval queue table with thumbnails
5. Listing detail modal (full car info)
6. Reject reason modal (dropdown + notes)
7. Bulk actions bar

**Components:**
- Status tabs
- Search input
- Approval table with row actions
- `ListingDetailModal`
- `RejectReasonModal`

**Interactivity:**
- Click row to view details
- Approve/Reject with visual feedback
- Bulk select and action
- Search filtering

---

### 🔐 ADMIN - PUBLISHING CENTER

**Route:** `/admin/publishing`
**Priority:** P2 (Day 7)
**Status:** ✅ COMPLETED

**Sections:**
1. Platform overview cards (Website, Dubizzle, YallaMotors)
2. Publishing queue table
3. Per-platform status indicators
4. Sync status column
5. Bulk publish modal
6. Integration info box

**Components:**
- Platform cards with counts
- Publishing table with checkboxes
- `PublishModal` with platform selection
- Success confirmation

**Interactivity:**
- Select cars to publish
- Choose platforms
- Animated publish process
- Status updates

---

### 🔐 ADMIN - INVENTORY

**Route:** `/admin/inventory`
**Priority:** P2 (Day 7)
**Status:** ✅ COMPLETED

**Sections:**
1. Stats cards (Total, Available, Reserved, Sold)
2. Search and filter bar
3. Full inventory table
4. Sortable columns
5. Row actions (View, Edit, Delete)

**Components:**
- Filter dropdowns
- Sortable table headers
- Status badges with icons
- Action buttons

---

### 🔐 ADMIN - SETTINGS

**Route:** `/admin/settings`
**Priority:** P3 (Day 7)
**Status:** ✅ COMPLETED

**Tabs:**
1. General - Site settings, publishing defaults
2. Integrations - KeyLoop, Dubizzle, YallaMotors, Zoho, SAP status
3. Notifications - Toggle switches for alerts
4. Security - 2FA, sessions, password (mockup)

**Components:**
- Tab navigation
- Form inputs
- Integration status cards
- Toggle switches
- Save button with feedback

---

## Component Reusability Map

```
CarCard
├── Used in: Home, Listings, Popular, Body Types, Similar
└── Props: car data, showFavorite, showCompare

ImageGallery
├── Used in: Car Detail, Showroom Detail
└── Props: images array, show360

EMICalculator
├── Used in: Finance Calculator, Car Detail (mini version)
└── Props: defaultPrice, compact mode

WizardProgress
├── Used in: Sell Valuation, Trade-in, Finance Application
└── Props: steps array, currentStep

ContactForm
├── Used in: Contact Page, Test Drive Modal
└── Props: type, prefilledData
```

---

## Mobile-Specific Considerations

| Page | Mobile Adaptation |
|------|-------------------|
| Listings | Filter drawer instead of sidebar |
| Car Detail | Sticky bottom CTA bar |
| Compare | Horizontal scroll table |
| Valuation | Full-screen steps |
| Calculator | Stack inputs vertically |
| Locations | Map on top, cards below |

---

## Page Priority Summary

| Priority | Pages | Day | Status |
|----------|-------|-----|--------|
| P0 | Home, Listings, Car Detail, Calculator, Valuation | 1-5 | ✅ Done |
| P1 | Finance Landing, My Garage, Locations, Sell Landing | 4-6 | ✅ Done |
| P2 | Offers, Trade-in, Body Types, Popular, Contact, Admin | 5-7 | ✅ Done |
| P3 | About, News, Showroom Detail | 6-7 | Partial (News pending) |

---

## Admin Pages Summary

| Route | Purpose | Status |
|-------|---------|--------|
| `/admin` | Dashboard with stats, activity, quick actions | ✅ Done |
| `/admin/approvals` | Approval queue with detail/reject modals | ✅ Done |
| `/admin/publishing` | Dubizzle/YallaMotors publishing center | ✅ Done |
| `/admin/inventory` | Full inventory management | ✅ Done |
| `/admin/settings` | CMS settings and integrations | ✅ Done |
