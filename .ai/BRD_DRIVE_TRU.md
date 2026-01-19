# Business Requirements Document
## Drive Tru – Pre-Owned Car Marketplace

**Version:** 1.0  
**Date:** January 19, 2026  
**Client:** Al Rostamani Trading Company (ARTC)  
**Document Type:** RFQ Companion Document  

---

## 1. Executive Summary

**Drive Tru** is a digital platform for buying and selling certified pre-owned Suzuki and Citroen vehicles in the UAE. This document outlines the business requirements for the web application, accompanied by a functional design prototype.

### Project Objectives
- Create a seamless car buying experience for UAE customers
- Enable instant online valuations for sellers
- Integrate with existing ARTC systems (KeyLoop DMS, SAP)
- Publish inventory to third-party marketplaces (Dubizzle, YallaMotors)
- Provide bilingual support (English & Arabic with RTL)

### Prototype Reference
A working design prototype accompanies this document, demonstrating:
- All user flows and page layouts
- Sample data and interactions
- Admin CMS workflow mockups

---

## 2. Scope Overview

| In Scope | Out of Scope (Phase 1) |
|----------|----------------------|
| Car browsing & search | User account system |
| Car detail pages | Real payment processing |
| Compare & favorites | Live chat integration |
| EMI calculator | AI-powered recommendations |
| Sell/Trade-in valuation flow | Mobile native apps |
| Finance eligibility form | Real-time bidding |
| Insurance quote calculator | Dealer portal |
| Store locator | |
| Admin CMS for approvals | |
| Multi-platform publishing | |
| EN/AR bilingual support | |

---

## 3. User Personas

### 3.1 Buyer
**Goal:** Find and purchase a certified pre-owned vehicle

**Key Journeys:**
1. Browse → Filter → View Details → Compare → Contact/Finance
2. Calculate EMI → Check eligibility → Apply for financing
3. Get insurance quote → Select coverage

### 3.2 Seller
**Goal:** Sell or trade-in their existing vehicle

**Key Journeys:**
1. Enter VIN → Confirm details → Upload photos → Mark damage → Get valuation
2. Select car to buy → Enter trade-in details → View combined quote

### 3.3 Quality Team (Admin)
**Goal:** Review, approve, and publish inventory

**Key Journeys:**
1. Review pending listings → Approve/Reject → Publish to platforms
2. Manage inventory status → Sync with marketplaces
3. Monitor integration health → Configure settings

---

## 4. Functional Requirements

### 4.1 Customer Portal

#### F-001: Car Browsing & Search
| ID | Requirement | Priority |
|----|-------------|----------|
| F-001.1 | Display car inventory with grid/list view toggle | Must |
| F-001.2 | Filter by: Make, Model, Year, Price, Mileage, Body Type, Fuel, Transmission, Specs | Must |
| F-001.3 | Sort by: Price, Year, Mileage, Recently Added | Must |
| F-001.4 | Search by keyword (make/model) | Must |
| F-001.5 | Display status badges (Available, Reserved, Sold) | Must |
| F-001.6 | Pagination with results count | Must |

#### F-002: Car Detail Page
| ID | Requirement | Priority |
|----|-------------|----------|
| F-002.1 | Image gallery with thumbnails | Must |
| F-002.2 | 360° view integration placeholder | Should |
| F-002.3 | Full vehicle specifications display | Must |
| F-002.4 | Price display in AED | Must |
| F-002.5 | EMI estimate with link to calculator | Must |
| F-002.6 | WhatsApp inquiry button | Must |
| F-002.7 | Call showroom button | Must |
| F-002.8 | Book test drive form | Must |
| F-002.9 | Add to compare (max 4 vehicles) | Must |
| F-002.10 | Add to favorites | Must |
| F-002.11 | Similar vehicles section | Should |

#### F-003: Compare Feature
| ID | Requirement | Priority |
|----|-------------|----------|
| F-003.1 | Add up to 4 cars for comparison | Must |
| F-003.2 | Side-by-side specification table | Must |
| F-003.3 | Sticky compare bar showing selected vehicles | Must |
| F-003.4 | Remove individual vehicles from comparison | Must |

#### F-004: Favorites/My Garage
| ID | Requirement | Priority |
|----|-------------|----------|
| F-004.1 | Save vehicles to favorites (no login required) | Must |
| F-004.2 | View saved favorites list | Must |
| F-004.3 | Favorites count badge in header | Must |
| F-004.4 | Combined view with compare list | Should |

#### F-005: EMI Calculator
| ID | Requirement | Priority |
|----|-------------|----------|
| F-005.1 | Vehicle price input (pre-filled or manual) | Must |
| F-005.2 | Down payment input (amount or percentage) | Must |
| F-005.3 | Loan tenure slider (12-84 months) | Must |
| F-005.4 | Adjustable interest rate | Should |
| F-005.5 | Real-time EMI calculation | Must |
| F-005.6 | Display total interest and total amount | Must |

#### F-006: Finance Eligibility
| ID | Requirement | Priority |
|----|-------------|----------|
| F-006.1 | Multi-step eligibility form | Must |
| F-006.2 | Capture: Personal, Employment, Income, Loan details | Must |
| F-006.3 | Per-step validation | Must |
| F-006.4 | Pre-approval result with reference number | Must |
| F-006.5 | Lead capture for CRM integration | Must |

#### F-007: Insurance Quote
| ID | Requirement | Priority |
|----|-------------|----------|
| F-007.1 | Vehicle details input | Must |
| F-007.2 | Coverage type selection (Comprehensive, Third Party, etc.) | Must |
| F-007.3 | Optional add-ons selection | Should |
| F-007.4 | Quote calculation and display | Must |
| F-007.5 | Coverage comparison table | Should |

#### F-008: Sell My Car – Valuation
| ID | Requirement | Priority |
|----|-------------|----------|
| F-008.1 | VIN input with decoder | Must |
| F-008.2 | Vehicle details confirmation | Must |
| F-008.3 | Mileage and condition input | Must |
| F-008.4 | Photo upload interface | Must |
| F-008.5 | Damage marking stencil (vehicle diagram) | Should |
| F-008.6 | Instant valuation result (price range) | Must |
| F-008.7 | Lead capture for follow-up | Must |

#### F-009: Trade-In
| ID | Requirement | Priority |
|----|-------------|----------|
| F-009.1 | Select vehicle to purchase from inventory | Must |
| F-009.2 | Enter trade-in vehicle details | Must |
| F-009.3 | Display combined quote | Must |

### 4.2 Admin CMS (Quality Team)

#### F-010: Dashboard
| ID | Requirement | Priority |
|----|-------------|----------|
| F-010.1 | Overview statistics (pending, approved, published) | Must |
| F-010.2 | Recent activity feed | Must |
| F-010.3 | Pending alerts and warnings | Should |
| F-010.4 | Quick action shortcuts | Should |

#### F-011: Approval Workflow
| ID | Requirement | Priority |
|----|-------------|----------|
| F-011.1 | Pending approvals queue | Must |
| F-011.2 | Filter by status (Pending, Approved, Rejected) | Must |
| F-011.3 | View listing details with images | Must |
| F-011.4 | Approve action with status update | Must |
| F-011.5 | Reject with reason selection and notes | Must |
| F-011.6 | Bulk approve/reject capability | Should |

#### F-012: Marketplace Publishing
| ID | Requirement | Priority |
|----|-------------|----------|
| F-012.1 | Platform overview (Website, Dubizzle, YallaMotors) | Must |
| F-012.2 | Select vehicles for publishing | Must |
| F-012.3 | Publish to multiple platforms | Must |
| F-012.4 | Publication status indicators | Must |
| F-012.5 | Sync status with timestamps | Should |

#### F-013: Inventory Management
| ID | Requirement | Priority |
|----|-------------|----------|
| F-013.1 | Full inventory list view | Must |
| F-013.2 | Filter and sort capabilities | Must |
| F-013.3 | Status management (Available, Reserved, Sold) | Must |
| F-013.4 | View/Edit actions | Should |

### 4.3 Platform Features

#### F-014: Multi-Language Support
| ID | Requirement | Priority |
|----|-------------|----------|
| F-014.1 | Language toggle (English/Arabic) | Must |
| F-014.2 | RTL layout for Arabic | Must |
| F-014.3 | URL-based locale (/en, /ar) | Must |
| F-014.4 | Translated navigation and key content | Must |

#### F-015: Responsive Design
| ID | Requirement | Priority |
|----|-------------|----------|
| F-015.1 | Desktop optimized layout | Must |
| F-015.2 | Mobile responsive design | Must |
| F-015.3 | Touch-friendly interactions | Must |

---

## 5. Integration Requirements

| Integration | Purpose | Direction | Priority |
|-------------|---------|-----------|----------|
| **KeyLoop DMS** | Vehicle inventory sync | Inbound | Must |
| **AI Studio** | 360° vehicle imagery | Inbound | Should |
| **Pixel Ride** | Enhanced vehicle photos | Inbound | Should |
| **AlgoDriven** | Automated valuations | Outbound/Inbound | Must |
| **Zoho CRM** | Lead management | Outbound | Must |
| **Dubizzle API** | Marketplace publishing | Outbound | Must |
| **YallaMotors API** | Marketplace publishing | Outbound | Must |
| **SAP** | Financial/backend sync | Bidirectional | Should |
| **WhatsApp Business** | Customer communication | Outbound | Must |
| **Google Maps** | Store locator | Inbound | Must |

---

## 6. Non-Functional Requirements

### 6.1 Performance
| Requirement | Target |
|-------------|--------|
| Page load time | < 3 seconds |
| Search/filter response | < 1 second |
| Mobile LCP | < 2.5 seconds |

### 6.2 Availability
| Requirement | Target |
|-------------|--------|
| Uptime SLA | 99.5% |
| Maintenance window | Off-peak hours (2-5 AM GST) |

### 6.3 Security
| Requirement | Priority |
|-------------|----------|
| HTTPS/SSL encryption | Must |
| Input validation | Must |
| Admin authentication | Must |
| Session management | Must |

### 6.4 Compliance
| Requirement | Priority |
|-------------|----------|
| UAE data residency | Must |
| GDPR-style consent for leads | Should |

---

## 7. Content Requirements

### 7.1 Static Pages
- Home page with hero, featured cars, USPs
- About Drive Tru
- Finance landing with bank partners
- Insurance information
- Offers/Promotions
- Store locations with maps
- Contact page with form
- Terms & Conditions
- Privacy Policy

### 7.2 Dynamic Content
- Vehicle inventory (synced from KeyLoop)
- Offers/promotions (CMS managed)
- News/Articles (optional, CMS managed)

---

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Lead conversion rate | > 3% |
| Average session duration | > 3 minutes |
| Pages per session | > 4 |
| Mobile traffic share | > 60% |
| Finance application starts | > 5% of car detail views |
| Valuation completion rate | > 40% |

---

## 9. Assumptions & Dependencies

### Assumptions
1. KeyLoop DMS API is available and documented
2. Dubizzle/YallaMotors provide publishing APIs
3. AlgoDriven valuation API is accessible
4. Vehicle images are available in KeyLoop or via Pixel Ride
5. Arabic translations will be provided or reviewed by client

### Dependencies
1. Brand guidelines and assets from ARTC
2. Showroom locations and operating hours
3. Bank partner agreements for financing display
4. Insurance partner agreements
5. API credentials for all integrations

---

## 10. Delivery Phases

### Phase 1: MVP (Recommended)
- Customer portal (browse, search, detail, compare, favorites)
- EMI calculator
- Sell/Valuation flow
- Finance eligibility form
- Store locator
- EN/AR support
- Admin CMS (approvals, publishing)
- KeyLoop + Zoho + Dubizzle integrations

### Phase 2: Enhancement
- Insurance quote flow
- Trade-in flow
- YallaMotors integration
- News/Articles section
- Enhanced analytics

### Phase 3: Future
- User accounts
- Saved searches
- Price alerts
- Live chat
- Mobile apps

---

## 11. Appendices

### A. Reference Sites
- Primary: [automall.ae](https://www.automall.ae/en/)
- Secondary: [kavak.com/ae](https://www.kavak.com/ae)

### B. Prototype Access
The design prototype demonstrates all Phase 1 features with sample data.
- **URL:** [To be provided after deployment]
- **Admin CMS:** /admin (no authentication for demo)

### C. Technical Stack (Proposed)
| Layer | Technology |
|-------|------------|
| Frontend | Next.js / React |
| Styling | Tailwind CSS |
| Backend | Node.js / API Routes |
| Database | PostgreSQL / MongoDB |
| Hosting | Vercel / AWS |
| CDN | CloudFront / Vercel Edge |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 19, 2026 | Drive Tru Team | Initial release |

---

*This document accompanies a working design prototype. All features marked as "Must" are demonstrated in the prototype with mock data and simulated integrations.*
