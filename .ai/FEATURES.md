# Features Matrix - Drive Life Prototype

> Complete feature inventory with implementation status
> Legend: 🔨 BUILD (functional) | 🎭 MOCK (visual only) | ⏭️ SKIP (document only)

---

## User Roles

| Role | Description | In Prototype |
|------|-------------|--------------|
| **Buyer** | End user browsing/buying cars | 🔨 Full flows |
| **Seller** | End user selling their car | 🔨 Form flows, 🎭 Results |
| **Dealer/Admin** | Internal staff managing inventory | 🎭 CMS mockup |
| **Quality Team** | Central approval team | 🎭 Approval workflow UI |

---

## 1. BUYER FEATURES

### 1.1 Browse & Search Cars

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Car listing grid/list view | 🔨 BUILD | Functional with mock data |
| Filter by Make | 🔨 BUILD | Dropdown with Suzuki, Citroen, others |
| Filter by Model | 🔨 BUILD | Dynamic based on make |
| Filter by Year range | 🔨 BUILD | Min/max sliders |
| Filter by Price range | 🔨 BUILD | Min/max in AED |
| Filter by Mileage range | 🔨 BUILD | Min/max in km |
| Filter by Body Type | 🔨 BUILD | SUV, Sedan, Hatchback, etc. |
| Filter by Fuel Type | 🔨 BUILD | Petrol, Diesel, Hybrid, Electric |
| Filter by Transmission | 🔨 BUILD | Automatic, Manual |
| Filter by Specs | 🔨 BUILD | GCC, American, European, etc. |
| Filter by Certified Pre-owned | 🔨 BUILD | Toggle |
| Sort by Price | 🔨 BUILD | Asc/Desc |
| Sort by Year | 🔨 BUILD | Newest/Oldest |
| Sort by Mileage | 🔨 BUILD | Low/High |
| Sort by Recently Added | 🎭 MOCK | Visual only (no real dates) |
| Search by keyword | 🔨 BUILD | Search make/model text |
| Status tags (Reserved/Sold) | 🔨 BUILD | Badge display |
| Pagination | 🔨 BUILD | Basic pagination |
| Brand filter (Suzuki/Citroen/Other) | 🔨 BUILD | Tab or filter |

### 1.2 Car Detail Page

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Image gallery | 🔨 BUILD | Carousel with thumbnails |
| 360° view | 🎭 MOCK | Placeholder with "360° View" button |
| Video walkthrough | 🎭 MOCK | Video player placeholder |
| Full specifications list | 🔨 BUILD | All car specs displayed |
| Price display (AED) | 🔨 BUILD | Formatted price |
| EMI estimate teaser | 🔨 BUILD | "From AED X/month" link to calculator |
| Condition report | 🎭 MOCK | Visual condition indicator |
| Service history | 🎭 MOCK | Placeholder section |
| Warranty info | 🔨 BUILD | Badge if certified |
| "Add to Compare" button | 🔨 BUILD | Functional |
| "Add to Favorites" button | 🔨 BUILD | Functional (local storage) |
| "Book Test Drive" button | 🎭 MOCK | Opens form, doesn't submit |
| "WhatsApp Inquiry" button | 🔨 BUILD | Opens WhatsApp link |
| "Call Showroom" button | 🔨 BUILD | tel: link |
| Share buttons | 🎭 MOCK | Copy link functionality |
| Similar cars section | 🔨 BUILD | Based on make/body type |
| Print/PDF spec sheet | ⏭️ SKIP | Document for production |

### 1.3 Compare Feature

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Add up to 4 cars | 🔨 BUILD | Local storage |
| Side-by-side comparison | 🔨 BUILD | Table layout |
| Remove from compare | 🔨 BUILD | X button |
| Compare bar (sticky) | 🔨 BUILD | Shows selected cars |
| Highlight differences | 🎭 MOCK | Visual styling |
| Compare without login | 🔨 BUILD | No auth required |

### 1.4 Favorites/Wishlist

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Add to favorites | 🔨 BUILD | Heart icon, local storage |
| View favorites list | 🔨 BUILD | Dedicated page |
| Remove from favorites | 🔨 BUILD | Toggle off |
| Favorites count badge | 🔨 BUILD | In header |
| Works without login | 🔨 BUILD | Local storage |
| "My Garage" page | 🔨 BUILD | Shows favorites + compare |

### 1.5 EMI Calculator

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Vehicle price input | 🔨 BUILD | Pre-filled from car or manual |
| Down payment input | 🔨 BUILD | Amount or percentage |
| Loan tenure slider | 🔨 BUILD | 12-84 months |
| Interest rate | 🔨 BUILD | Default 3.99% (adjustable) |
| Monthly EMI result | 🔨 BUILD | Calculated dynamically |
| Total interest paid | 🔨 BUILD | Calculated |
| Total amount payable | 🔨 BUILD | Calculated |
| Amortization schedule | 🎭 MOCK | Sample table |
| "Apply for Finance" CTA | 🎭 MOCK | Links to finance form |

### 1.6 Finance Application

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Eligibility form | 🔨 BUILD | 4-step wizard at /finance/eligibility |
| Step 1: Personal details | 🔨 BUILD | Name, email, phone, nationality, EID |
| Step 2: Employment info | 🔨 BUILD | Type, employer, duration, address |
| Step 3: Income & liabilities | 🔨 BUILD | Salary, loans, credit card debt |
| Step 4: Loan requirements | 🔨 BUILD | Vehicle price, down payment, tenure |
| Form validation | 🔨 BUILD | Per-step validation with error messages |
| Loan estimate | 🔨 BUILD | Real-time EMI calculation on step 4 |
| Pre-approval result | 🔨 BUILD | Success page with reference number |
| Lead capture to Zoho | 🎭 MOCK | "We'll contact you" message |
| Bank partner logos | 🔨 BUILD | Static images |

### 1.7 Insurance

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Insurance landing page | 🔨 BUILD | Full page at /insurance |
| Quick quote calculator | 🔨 BUILD | Vehicle value, age, coverage inputs |
| Coverage type selection | 🔨 BUILD | Comprehensive, Third Party, TP+Fire/Theft |
| Optional add-ons | 🔨 BUILD | Roadside, Agency Repair, Replacement, Personal |
| Premium calculation | 🔨 BUILD | Based on vehicle, driver age, claims history |
| Quote result display | 🔨 BUILD | Annual and monthly pricing |
| Coverage comparison table | 🔨 BUILD | Feature matrix for all plans |
| Insurance partners | 🔨 BUILD | 6 partner logos displayed |
| FAQ section | 🔨 BUILD | Common insurance questions |

---

## 2. SELLER FEATURES

### 2.1 Sell My Car - Valuation Flow

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Step 1: VIN input | 🔨 BUILD | Text input with format hint |
| VIN decoder display | 🎭 MOCK | Show decoded info (hardcoded) |
| Step 2: Vehicle details confirm | 🔨 BUILD | Year/Make/Model/Variant |
| Step 3: Mileage input | 🔨 BUILD | Number input |
| Step 4: Condition selection | 🔨 BUILD | Excellent/Good/Fair/Poor |
| Step 5: Photo upload UI | 🔨 BUILD | Dropzone (files don't persist) |
| Step 6: Damage marking (stencil) | 🔨 BUILD | Car diagram with clickable areas |
| Instant valuation result | 🎭 MOCK | Hardcoded range "AED 45,000 - 52,000" |
| "Get Final Quote" CTA | 🎭 MOCK | Shows "We'll contact you" |
| Lead to Zoho | 🎭 MOCK | Success message |
| AlgoDriven integration | 🎭 MOCK | Visual only, no real API |

### 2.2 Trade-in Flow

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Select car to buy | 🔨 BUILD | Car picker from inventory |
| Enter trade-in details | 🔨 BUILD | Same as sell flow |
| Combined quote display | 🎭 MOCK | "Your car: X, New car: Y, Pay: Z" |
| Schedule appointment | 🎭 MOCK | Date picker, success message |

---

## 3. CMS / ADMIN FEATURES (Quality Team)

> Note: This is a mockup to demonstrate workflow, not a functional CMS
> **Updated Jan 19, 2026** - Enhanced with professional layout and full workflow

### 3.0 Admin Layout & Navigation

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Professional sidebar | 🔨 BUILD | Dark theme, collapsible, icons + labels |
| Top bar with user | 🔨 BUILD | Breadcrumbs, notifications, user avatar |
| Mobile responsive | 🔨 BUILD | Hamburger menu, slide-out nav |
| Dashboard page | 🔨 BUILD | Stats, activity feed, quick actions |
| CMS Mockup badge | 🔨 BUILD | Always visible indicator |

### 3.1 Inventory Approval Workflow

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Pending approvals list | 🔨 BUILD | Table with car thumbnails, real data |
| Vehicle detail modal | 🔨 BUILD | Full car info, images, specs, features |
| Approve button | 🔨 BUILD | Changes status visually with animation |
| Reject with reason | 🔨 BUILD | Modal with dropdown reasons + notes |
| Bulk approve/reject | 🔨 BUILD | Checkbox + bulk action buttons |
| Filter by status | 🔨 BUILD | Tabs: All/Pending/Approved/Rejected |
| Search by VIN/Make/Model | 🔨 BUILD | Real-time search filtering |
| Image quality review | 🔨 BUILD | Image gallery in detail modal |

### 3.2 Marketplace Publishing

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Publishing Center page | 🔨 BUILD | Dedicated page at /admin/publishing |
| Platform overview cards | 🔨 BUILD | Website, Dubizzle, YallaMotors with counts |
| Publish to Dubizzle | 🔨 BUILD | Checkbox + publish button with modal |
| Publish to YallaMotors | 🔨 BUILD | Checkbox + publish button with modal |
| Bulk publish | 🔨 BUILD | Select multiple cars, choose platforms |
| Publication status | 🔨 BUILD | Per-car badges showing where published |
| Sync status indicators | 🔨 BUILD | "Synced", "Pending", "Error" badges |
| Last sync timestamp | 🔨 BUILD | "5 mins ago" style timestamps |
| Publish success modal | 🔨 BUILD | Confirmation with platform icons |

### 3.3 Inventory Management

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Full inventory list | 🔨 BUILD | All cars with status, showroom, actions |
| Sort by columns | 🔨 BUILD | Year, Price, Mileage sortable |
| Filter by make/status | 🔨 BUILD | Dropdown filters |
| Status badges | 🔨 BUILD | Available/Reserved/Sold with icons |
| View/Edit/Delete actions | 🎭 MOCK | Buttons visible, edit non-functional |
| Export button | 🎭 MOCK | Button visible, no actual export |

### 3.4 Settings & Integrations

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| General settings tab | 🔨 BUILD | Site name, URL, language options |
| Integrations tab | 🔨 BUILD | KeyLoop, Dubizzle, YallaMotors, Zoho, SAP |
| Integration status | 🔨 BUILD | Connected/Pending badges, last sync |
| Notifications tab | 🔨 BUILD | Toggle switches for alert types |
| Security tab | 🔨 BUILD | 2FA, sessions, password change UI |
| Auto-publish options | 🔨 BUILD | Checkboxes for default platforms |

### 3.5 Dashboard Features

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Stats cards | 🔨 BUILD | Pending, Approved Today, Published, Total |
| Recent activity feed | 🔨 BUILD | Approve/Reject/Publish actions with timestamps |
| Pending alerts | 🔨 BUILD | Warning/Error/Info alerts |
| Publishing status chart | 🔨 BUILD | Progress bars per platform |
| Quick actions panel | 🔨 BUILD | Review Pending, Publish, Sync ERP, View Site |
| Pending approvals preview | 🔨 BUILD | Top 5 with quick approve/reject |

---

## 4. PLATFORM FEATURES

### 4.1 Multi-language (i18n)

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Language toggle (EN/AR) | 🔨 BUILD | Header toggle |
| RTL layout for Arabic | 🔨 BUILD | dir="rtl" on html |
| URL-based locale | 🔨 BUILD | /en/buy vs /ar/buy |
| Translated navigation | 🔨 BUILD | Key pages |
| Translated car specs | 🎭 MOCK | Some fields only |
| Translated filters | 🔨 BUILD | Labels |
| Arabic number formatting | 🎭 MOCK | AED formatting |

### 4.2 Navigation & Layout

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Responsive header | 🔨 BUILD | Desktop + mobile |
| Mobile hamburger menu | 🔨 BUILD | Slide-out nav |
| Mega menu (Buy) | 🔨 BUILD | Dropdown with categories |
| Sticky header | 🔨 BUILD | On scroll |
| Footer with links | 🔨 BUILD | All sitemap links |
| Breadcrumbs | 🔨 BUILD | On detail pages |
| 404 page | 🎭 MOCK | Basic styling |

### 4.3 Contact & Support

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Contact form | 🔨 BUILD | Form UI (no real submission) |
| WhatsApp floating button | 🔨 BUILD | Links to WhatsApp |
| Phone numbers | 🔨 BUILD | Click-to-call |
| FAQ section | 🎭 MOCK | Accordion with sample Q&A |
| Live chat placeholder | 🎭 MOCK | "Chat" button (non-functional) |

### 4.4 Store Locator

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| Map with pins | 🔨 BUILD | Static Google Maps embed or Leaflet |
| Location cards | 🔨 BUILD | 3 showrooms (Deira, SZR, Abu Dhabi) |
| Get directions link | 🔨 BUILD | Google Maps link |
| Operating hours | 🔨 BUILD | Display hours |
| Showroom photos | 🔨 BUILD | Image gallery |
| Filter by emirate | 🎭 MOCK | Dropdown (limited data) |

### 4.5 Content Pages

| Feature | Status | Implementation Notes |
|---------|--------|---------------------|
| About Drive Life | 🔨 BUILD | Static content page |
| Vision & Mission | 🔨 BUILD | Sub-section |
| Offers page | 🔨 BUILD | Promotional banners grid |
| News & Articles | 🎭 MOCK | Blog listing (3-4 articles) |
| Article detail | 🎭 MOCK | Single article template |
| Terms & Conditions | 🎭 MOCK | Placeholder text |
| Privacy Policy | 🎭 MOCK | Placeholder text |

---

## 5. INTEGRATIONS (All Mocked)

| Integration | What to Show | Implementation |
|-------------|--------------|----------------|
| **KeyLoop DMS** | Car data structure | Mock JSON matching KeyLoop fields |
| **AI Studio** | 360° viewer | Placeholder "View 360°" modal |
| **Pixel Ride** | Enhanced images | Use nice stock photos |
| **AlgoDriven** | Valuation result | Hardcoded price range |
| **Zoho CRM** | Form submission | Success message, no real API |
| **Dubizzle** | Publish toggle | Visual status badge |
| **YallaMotors** | Publish toggle | Visual status badge |
| **SAP** | Backend note | Document only |
| **WhatsApp** | Chat button | Real wa.me link |
| **Google Maps** | Embed | Static embed code |

---

## 6. REAL-TIME FEATURES (Mocked)

| Feature | Status | Notes |
|---------|--------|-------|
| Real-time pricing | 🎭 MOCK | Prices are static |
| Live inventory sync | 🎭 MOCK | Manual refresh |
| Instant notifications | ⏭️ SKIP | Document only |
| Availability checker | 🎭 MOCK | Always shows "Available" |

---

## Priority Order for Development

### Week 1 - Day by Day

**Day 1-2: Foundation**
1. Project setup (Next.js + Tailwind + shadcn)
2. Layout components (Header, Footer, Nav)
3. Language toggle + RTL support
4. Home page

**Day 3: Buy Flow**
5. Car listing page with filters
6. Car detail page
7. Compare feature

**Day 4: Interactive Features**
8. Favorites/My Garage
9. EMI Calculator
10. Finance form

**Day 5: Sell Flow**
11. Sell My Car valuation wizard
12. Trade-in flow
13. Damage stencil component

**Day 6: Supporting Pages**
14. About page
15. Locations/Store locator
16. Offers page
17. Contact page

**Day 7: Admin & Polish**
18. CMS approval mockup
19. Arabic translations pass
20. Final polish + documentation

---

## Feature Checklist for Demo

Before presenting prototype, ensure:

- [x] All pages accessible from navigation
- [x] Filters work on listing page
- [x] At least 20 cars in mock data
- [x] Compare adds/removes cars correctly
- [x] Favorites persist in local storage
- [x] EMI calculator shows realistic numbers
- [x] Sell flow goes through all steps
- [x] Language toggle switches EN/AR
- [ ] RTL layout doesn't break (needs review)
- [x] Mobile navigation works
- [x] All images load (no broken)
- [x] CMS mockup shows approval workflow
- [x] WhatsApp button has real link
- [x] Admin dashboard shows live stats
- [x] Approval detail modal works
- [x] Reject modal with reasons works
- [x] Publishing center shows platform status
- [x] Bulk publish workflow works
- [x] Settings page shows integrations
- [x] Finance eligibility form works (4 steps)
- [x] Insurance quote calculator works
- [x] Header has Insurance link