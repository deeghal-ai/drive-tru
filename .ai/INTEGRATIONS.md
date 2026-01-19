# Integration Documentation - Drive Life

> Technical documentation for RFP and effort estimation
> All integrations are MOCKED in prototype but documented here for production planning

---

## Integration Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DRIVE LIFE WEBSITE                                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    DATA SOURCES (Inbound)                           │   │
│  │                                                                     │   │
│  │   KeyLoop DMS ──────┬──────► Vehicle Specs                         │   │
│  │        ↓            │        Make, Model, Year, VIN, Price         │   │
│  │   [VIN Matching]    │                                              │   │
│  │        ↓            │                                              │   │
│  │   AI Studio ────────┴──────► Vehicle Images                        │   │
│  │                              JPG/JPEG + 360° MP4                    │   │
│  │                                                                     │   │
│  │   Pixel Ride ─────────────► Enhanced Images                        │   │
│  │                              Showroom-quality processing            │   │
│  │                                                                     │   │
│  │   AlgoDriven ─────────────► Car Valuations                         │   │
│  │                              Instant price estimates                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    LEAD CAPTURE (Outbound)                          │   │
│  │                                                                     │   │
│  │   Zoho CRM ◄──────────────── All form submissions                  │   │
│  │                              Finance, Sell, Contact, Test Drive     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    MARKETPLACE SYNDICATION (Outbound)               │   │
│  │                                                                     │   │
│  │   Website ────────────────► Dubizzle (XML Feed)                    │   │
│  │            ────────────────► YallaMotors (API/Manual)              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    ERP / BACKEND (Outbound)                         │   │
│  │                                                                     │   │
│  │   SAP ◄─────────────────── Trade-in acceptances                    │   │
│  │                            Inventory additions                      │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    COMMUNICATION                                    │   │
│  │                                                                     │   │
│  │   WhatsApp Business ──────── Click-to-chat integration             │   │
│  │   (Pre-existing chatbot)    Just embed/link                        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. KeyLoop DMS Integration

### Overview
KeyLoop is the Dealer Management System used by ARTC to manage vehicle inventory, pricing, and sales data.

### Purpose
- Source of truth for vehicle specifications
- Real-time inventory status (Available/Reserved/Sold)
- Pricing data

### Technical Details

**API Type:** REST API
**Documentation:** https://developer.keyloop.io/
**Authentication:** OAuth 2.0 / API Key (Partner access required)

**Relevant Endpoints:**
| Endpoint | Purpose |
|----------|---------|
| `GET /inventory/vehicles` | List all stock vehicles |
| `GET /inventory/vehicles/{vin}` | Get vehicle by VIN |
| `GET /inventory/vehicles/{id}/status` | Get availability status |

**Data Fields Available:**
```json
{
  "vin": "JSAAZC83S00123456",
  "make": "Suzuki",
  "model": "Swift",
  "variant": "GL",
  "year": 2023,
  "bodyType": "Hatchback",
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "engineSize": "1.2L",
  "color": "Pearl White",
  "interiorColor": "Black",
  "mileage": 15000,
  "price": 72000,
  "currency": "AED",
  "status": "AVAILABLE",
  "features": ["ABS", "Airbags", "AC", "..."],
  "registrationDate": "2023-03-15",
  "warrantyExpiry": "2026-03-15"
}
```

### Sync Strategy
- **Option A:** Scheduled sync every 15-30 minutes
- **Option B:** Webhook on status change
- **Option C:** On-demand API call with caching

### Effort Estimate
| Task | Hours |
|------|-------|
| API research & access setup | 8 |
| Data mapping & transformation | 16 |
| Sync service implementation | 24 |
| Error handling & logging | 8 |
| Testing | 16 |
| **Total** | **72 hours** |

### Questions for Client
- [ ] Do you have KeyLoop API access already?
- [ ] Which KeyLoop instance/region? (MEA?)
- [ ] What's the expected inventory size?
- [ ] Preferred sync frequency?

---

## 2. AI Studio Integration (Images)

### Overview
AI Studio captures standardized vehicle photography including static images and 360° video tours.

### Purpose
- High-quality vehicle images
- 360° interactive views
- Consistent visual standards

### Technical Details

**Data Format:**
- Static images: JPG/JPEG
- 360° tours: MP4 video

**Matching Key:** VIN Number

**Expected Structure:**
```
/vehicles/
  /JSAAZC83S00123456/        # VIN folder
    /images/
      exterior_front.jpg
      exterior_rear.jpg
      exterior_left.jpg
      exterior_right.jpg
      interior_dashboard.jpg
      interior_seats.jpg
      ...
    /360/
      exterior_360.mp4
      interior_360.mp4
```

### Integration Options
| Option | Pros | Cons |
|--------|------|------|
| S3/Cloud Storage | Simple, scalable | Need access setup |
| FTP Sync | Traditional | Slower, legacy |
| Direct API | Clean | May not exist |

### 360° Viewer Implementation
**Recommended Libraries:**
- `@google/model-viewer` - For 3D models
- `react-pannellum` - For 360° panoramas
- Custom HTML5 video player - For MP4 tours
- `Spyne` / `Glo3D` widgets - Commercial options

### Effort Estimate
| Task | Hours |
|------|-------|
| Access setup & research | 8 |
| File sync implementation | 16 |
| VIN matching logic | 8 |
| Image CDN setup | 8 |
| 360° viewer integration | 16 |
| Testing | 8 |
| **Total** | **64 hours** |

### Questions for Client
- [ ] How is AI Studio accessed? (API, FTP, shared storage?)
- [ ] What's the naming convention for files?
- [ ] Is there metadata JSON with each vehicle?
- [ ] Who uploads to AI Studio? (Showroom staff?)

---

## 3. Pixel Ride Integration

### Overview
Pixel Ride is an AI-powered image enhancement tool that transforms raw vehicle photos into showroom-quality images.

### Website
https://pixelride.tech/

### Purpose
- Background removal/replacement
- Lighting enhancement
- Consistent showroom effect
- Professional quality assurance

### Integration Options

**Option A: Pre-processing Pipeline**
```
Raw Image → Pixel Ride API → Enhanced Image → Store → Display
```

**Option B: CMS Upload Enhancement**
```
Admin uploads → Pixel Ride processes → Admin approves → Published
```

**Option C: On-demand Enhancement**
```
Display raw → User clicks "Enhance" → Process → Cache
```

### API Expectations
```javascript
POST /api/enhance
Content-Type: multipart/form-data

{
  "image": <file>,
  "background": "showroom_white" | "showroom_dark" | "outdoor",
  "enhance_lighting": true,
  "add_reflection": true
}

Response:
{
  "enhanced_url": "https://...",
  "original_url": "https://...",
  "processing_time": 2.3
}
```

### Effort Estimate
| Task | Hours |
|------|-------|
| API integration | 16 |
| Processing pipeline | 16 |
| CMS UI for enhancement | 8 |
| Caching strategy | 8 |
| Testing | 8 |
| **Total** | **56 hours** |

### Questions for Client
- [ ] Is there a Pixel Ride contract already?
- [ ] API documentation available?
- [ ] Per-image pricing model?
- [ ] Real-time or batch processing preference?

---

## 4. AlgoDriven Integration (Valuation)

### Overview
AlgoDriven provides AI-powered vehicle valuations based on UAE market data.

### Website
https://algodriven.xyz/

### Purpose
- Instant car valuations for "Sell Your Car" feature
- Market-based pricing
- VIN decoding

### API Flow
```
User enters VIN → Decode VIN → Get valuation → Show estimate
     ↓
Additional factors:
- Mileage
- Condition (from user input)
- Market demand
- Regional pricing (UAE specific)
```

### Expected API Structure
```javascript
POST /api/valuation
{
  "vin": "JSAAZC83S00123456",
  "mileage": 45000,
  "condition": "good", // excellent, good, fair, poor
  "emirate": "dubai"
}

Response:
{
  "success": true,
  "valuation": {
    "low": 42000,
    "mid": 47000,
    "high": 52000,
    "currency": "AED",
    "confidence": 0.85,
    "valid_until": "2024-01-20"
  },
  "vehicle": {
    "make": "Suzuki",
    "model": "Swift",
    "year": 2021,
    "variant": "GL"
  },
  "factors": {
    "base_value": 50000,
    "mileage_adjustment": -3000,
    "condition_adjustment": -1000,
    "market_demand": "+1000"
  }
}
```

### Effort Estimate
| Task | Hours |
|------|-------|
| API integration | 16 |
| VIN decode handling | 8 |
| Valuation flow UI | 16 |
| Error handling | 8 |
| Testing | 8 |
| **Total** | **56 hours** |

### Questions for Client
- [ ] AlgoDriven contract status?
- [ ] API documentation available?
- [ ] Rate limits or quotas?
- [ ] Fallback if API unavailable?

---

## 5. Zoho CRM Integration

### Overview
All leads from the website flow into Zoho CRM for sales team follow-up.

### Lead Sources
| Source | Lead Type | Priority |
|--------|-----------|----------|
| Contact Form | General Inquiry | Normal |
| Test Drive Booking | Hot Lead | High |
| Finance Application | Finance Lead | High |
| Sell My Car | Trade-in Lead | High |
| WhatsApp Inquiry | Various | Medium |

### Zoho API
**Documentation:** https://www.zoho.com/crm/developer/docs/api/v2/

**Create Lead Endpoint:**
```javascript
POST /crm/v2/Leads

{
  "data": [{
    "First_Name": "Ahmed",
    "Last_Name": "Al Maktoum",
    "Email": "ahmed@email.com",
    "Phone": "+971501234567",
    "Lead_Source": "Website - Test Drive",
    "Description": "Test drive request for Suzuki Swift 2023",
    "Vehicle_Interest": "JSAAZC83S00123456",
    "Preferred_Showroom": "Deira",
    "Preferred_Date": "2024-01-15",
    "Preferred_Time": "10:00 AM"
  }]
}
```

### Custom Fields Needed
- Vehicle of Interest (VIN)
- Preferred Showroom
- Preferred Contact Method
- Trade-in Value (if applicable)
- Finance Pre-approval Status

### Effort Estimate
| Task | Hours |
|------|-------|
| Zoho API setup | 8 |
| Lead mapping per form | 16 |
| Field customization | 8 |
| Webhook setup (optional) | 8 |
| Testing | 8 |
| **Total** | **48 hours** |

---

## 6. Dubizzle Integration

### Overview
Publish vehicle listings to Dubizzle Motors marketplace automatically.

### Integration Method
**XML Feed** (documented at dubai.dubizzle.com/feed/doc/)

### Feed Format
```xml
<?xml version="1.0" encoding="UTF-8"?>
<inventory>
  <listing>
    <reference>DL-2024-001</reference>
    <status>vacant</status>  <!-- vacant or deleted -->
    <title>2023 Suzuki Swift GL</title>
    <description>...</description>
    <price>72000</price>
    <currency>AED</currency>
    <category>used-cars</category>
    <make>Suzuki</make>
    <model>Swift</model>
    <year>2023</year>
    <mileage>15000</mileage>
    <fuel>Petrol</fuel>
    <transmission>Automatic</transmission>
    <body_type>Hatchback</body_type>
    <color>White</color>
    <images>
      <image>https://drivelife.ae/images/car1.jpg</image>
      <image>https://drivelife.ae/images/car2.jpg</image>
    </images>
    <location>
      <city>Dubai</city>
      <area>Deira</area>
    </location>
    <contact>
      <phone>+97143001234</phone>
    </contact>
  </listing>
</inventory>
```

### Sync Frequency
- Feed hosted at: `https://drivelife.ae/feeds/dubizzle.xml`
- Dubizzle fetches hourly
- Only include items updated in last 24 hours

### Effort Estimate
| Task | Hours |
|------|-------|
| Feed generator implementation | 24 |
| CMS toggle integration | 8 |
| Status sync handling | 16 |
| Testing & validation | 8 |
| **Total** | **56 hours** |

### Requirements
- [ ] Dubizzle dealer account
- [ ] Feed URL registered with Dubizzle
- [ ] Account manager contact

---

## 7. YallaMotors Integration

### Overview
Publish vehicle listings to YallaMotors marketplace.

### Integration Method
- **Primary:** Manual via YallaMotor Dealer App
- **Secondary:** API (requires partnership confirmation)

### Considerations
- Less documented than Dubizzle
- May require dedicated account manager relationship
- Consider manual workflow initially

### Effort Estimate
| Task | Hours |
|------|-------|
| Integration research | 8 |
| API implementation (if available) | 24 |
| Manual export feature | 8 |
| Testing | 8 |
| **Total** | **48 hours** |

### Questions for Client
- [ ] Existing YallaMotors relationship?
- [ ] API access available?
- [ ] Manual listing acceptable for MVP?

---

## 8. SAP Integration

### Overview
Trade-in acceptances and inventory additions flow to SAP for financial/inventory management.

### Scope
- When customer sells car to Drive Life
- When trade-in is accepted
- Inventory value recording

### Complexity
- SAP integrations vary significantly by implementation
- Requires SAP consulting expertise
- Options: IDocs, BAPIs, REST via CPI

### Effort Estimate
| Task | Hours |
|------|-------|
| Requirements gathering | 16 |
| SAP consultation | 24 |
| Interface development | 40 |
| Testing | 24 |
| **Total** | **104 hours** |

### Questions for Client
- [ ] SAP version and modules in use?
- [ ] Existing integration middleware (CPI)?
- [ ] Who is SAP partner/consultant?

---

## 9. WhatsApp Business Integration

### Overview
Client has existing WhatsApp chatbot - just need to integrate links.

### Implementation
```html
<a href="https://wa.me/971501234567?text=Hi%20I%20am%20interested%20in...">
  Chat on WhatsApp
</a>
```

### Pre-filled Messages by Context
| Context | Message |
|---------|---------|
| General | "Hi, I'd like to know more about Drive Life" |
| Car Inquiry | "Hi, I'm interested in {make} {model} (VIN: {vin})" |
| Test Drive | "Hi, I'd like to book a test drive for {car}" |
| Sell | "Hi, I'd like to sell my car" |

### Effort Estimate
| Task | Hours |
|------|-------|
| Widget integration | 4 |
| Context-aware messaging | 4 |
| Testing | 2 |
| **Total** | **10 hours** |

---

## 10. Google Maps Integration

### Overview
Store locator with map display.

### Implementation
- Embed Google Maps via `<iframe>`
- Or use Google Maps JavaScript API for interactive pins

### API Key Required
- Maps JavaScript API
- Places API (for directions)

### Effort Estimate
| Task | Hours |
|------|-------|
| Map embed setup | 4 |
| Custom markers | 8 |
| Directions integration | 8 |
| **Total** | **20 hours** |

---

## Total Integration Effort Summary

| Integration | Hours | Complexity | Priority |
|-------------|-------|------------|----------|
| KeyLoop DMS | 72 | High | P0 |
| AI Studio | 64 | Medium | P0 |
| Pixel Ride | 56 | Medium | P1 |
| AlgoDriven | 56 | Medium | P1 |
| Zoho CRM | 48 | Low | P0 |
| Dubizzle | 56 | Medium | P2 |
| YallaMotors | 48 | Medium | P2 |
| SAP | 104 | High | P2 |
| WhatsApp | 10 | Low | P0 |
| Google Maps | 20 | Low | P1 |
| **TOTAL** | **534 hours** | | |

### Phase Recommendation
| Phase | Integrations | Hours |
|-------|--------------|-------|
| MVP | KeyLoop, AI Studio, Zoho, WhatsApp, Maps | 214 |
| Phase 2 | Pixel Ride, AlgoDriven | 112 |
| Phase 3 | Dubizzle, YallaMotors, SAP | 208 |

---

## Data Flow Diagram (Production)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   KeyLoop    │────►│   Backend    │────►│   Website    │
│   (Specs)    │     │   Service    │     │  (Next.js)   │
└──────────────┘     │              │     └──────────────┘
                     │  - VIN Match │
┌──────────────┐     │  - Data Merge│     ┌──────────────┐
│  AI Studio   │────►│  - Transform │────►│     CDN      │
│  (Images)    │     │  - Cache     │     │   (Images)   │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Pixel Ride  │◄────│  Image       │     │   Zoho CRM   │
│  (Enhance)   │────►│  Pipeline    │     │   (Leads)    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 ▲
┌──────────────┐                                 │
│  AlgoDriven  │─────────────────────────────────┤
│  (Valuation) │                                 │
└──────────────┘                                 │
                                                 │
┌──────────────┐     ┌──────────────┐            │
│   Website    │────►│  Feed Gen    │     Form submissions
│   (CMS)      │     │  Service     │            │
└──────────────┘     └──────┬───────┘     └──────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
       ┌──────────────┐          ┌──────────────┐
       │   Dubizzle   │          │  YallaMotors │
       │   (XML Feed) │          │    (API)     │
       └──────────────┘          └──────────────┘
```
