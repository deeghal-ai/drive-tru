# V0.dev Prompt Library - Drive Tru Prototype

> Ready-to-use prompts for generating components in v0.dev
> Copy prompt → Paste in v0.dev → Copy output → Paste in Cursor

---

## How to Use

1. Copy the prompt for the component you need
2. Go to [v0.dev](https://v0.dev)
3. Paste and generate
4. Click "Copy Code"
5. In Cursor, create the component file
6. Paste the code
7. Connect to mock data from `/src/data/`

---

## 🏠 LAYOUT COMPONENTS

### Header / Navigation

```
Create a modern automotive website header with:
- Logo on the left (placeholder for "Drive Tru" text)
- Main navigation: Home, Buy (dropdown), Sell (dropdown), Finance, Offers, Locations, Contact
- Buy dropdown: Cars Listing, Popular Models, Body Types (SUV, Sedan, Hatchback)
- Sell dropdown: Sell My Car, Trade-in
- Right side: Language toggle (EN/AR), Search icon, Favorites heart with count badge, Compare icon with count
- Mobile: Hamburger menu that slides in from right
- Sticky on scroll with shadow
- Use dark navy (#1a1a2e) for background, white text
- Professional automotive marketplace feel like automall.ae
```

### Footer

```
Create a comprehensive footer for an automotive marketplace:
- 4 columns: Company (About, Careers, Contact), Buy (Browse Cars, Popular Models, Certified Pre-owned), Sell (Sell Your Car, Trade-in, Get Valuation), Support (FAQ, Contact, Locations)
- Contact info row: Phone, Email, WhatsApp icon
- Social media icons: Facebook, Instagram, Twitter, LinkedIn, YouTube
- Bottom bar: Copyright, Privacy Policy, Terms links
- "Download App" badges (App Store, Google Play) - placeholder
- Dark background (#1a1a2e), white text
- Newsletter signup input with button
```

### Mobile Navigation Drawer

```
Create a mobile navigation drawer/sheet that:
- Slides in from the right
- Shows all menu items in a list with icons
- Has accordion/collapsible sections for Buy and Sell submenus
- Language toggle (EN | AR) at top
- Search bar at top
- Close X button
- User favorites and compare shortcuts with badges
- Contact shortcuts (phone, WhatsApp) at bottom
- Semi-transparent backdrop
```

---

## 🚗 CAR LISTING COMPONENTS

### Car Card (Grid Item)

```
Create a car listing card for an automotive marketplace:
- Car image with aspect ratio 4:3, hover zoom effect
- Status badge in corner (Available=green, Reserved=orange, Sold=red)
- Heart icon for favorites (toggleable, top right)
- Car title: "2023 Suzuki Swift" format
- Key specs row with icons: 45,000 km | Petrol | Automatic
- Price: "AED 65,000" in bold
- "From AED 1,200/mo" smaller text below
- "View Details" and "Compare" buttons at bottom
- "Certified Pre-owned" badge if applicable
- Hover shadow effect
- Clean white card with subtle border
```

### Car Listing Grid with Filters

```
Create a car listing page layout with:

LEFT SIDEBAR (collapsible on mobile):
- Search input at top
- Filter sections with headers:
  - Make (checkboxes: Suzuki, Citroen, Toyota, Nissan, Honda)
  - Model (dynamic checkboxes)
  - Body Type (SUV, Sedan, Hatchback, Crossover)
  - Year Range (dual slider, 2015-2024)
  - Price Range (dual slider, AED 20,000 - 500,000)
  - Mileage Range (dual slider, 0 - 200,000 km)
  - Fuel Type (Petrol, Diesel, Hybrid, Electric)
  - Transmission (Automatic, Manual)
  - Specs Origin (GCC, American, European)
  - Certified Only toggle
- "Clear All Filters" and "Apply" buttons
- Active filter count badge

MAIN CONTENT:
- Results count "Showing 24 of 156 cars"
- Sort dropdown (Price Low-High, Price High-Low, Newest, Mileage)
- Grid/List view toggle
- 3-column grid of car cards (2 on tablet, 1 on mobile)
- Pagination at bottom

Make it responsive with filter drawer on mobile
```

### Car Detail Page Hero

```
Create a car detail page header section with:
- Large image gallery (main image + thumbnails below)
- "360° View" button overlay on main image
- Image counter "1/12"
- Fullscreen button
- Left/right navigation arrows

RIGHT PANEL:
- Breadcrumb: Home > Buy > Suzuki > Swift
- Title: "2023 Suzuki Swift GL"
- Status badge (Available)
- Price: "AED 72,000" large
- "or from AED 1,450/month" with calculator link
- Key specs grid (2x3): Year, Mileage, Fuel, Transmission, Body, Specs Origin
- Action buttons:
  - "Book Test Drive" primary button
  - "WhatsApp" green button with icon
  - "Call" outline button
- "Add to Compare" and "Add to Favorites" icon buttons
- Share button
- "Listed 5 days ago" text

Professional automotive layout like automall.ae
```

### Car Specifications Table

```
Create a car specifications section with tabs:

TAB 1 - Overview:
- Grid of spec items with icons
- Make, Model, Year, Body Type, Doors, Seats
- Engine, Horsepower, Fuel Type, Transmission
- Drivetrain, Mileage, Color (exterior/interior)

TAB 2 - Features:
- Grouped checkmark lists:
  - Safety: ABS, Airbags, Lane Assist, etc.
  - Comfort: A/C, Leather Seats, Sunroof, etc.
  - Technology: Touchscreen, Apple CarPlay, etc.
  - Exterior: Alloy Wheels, LED Lights, etc.

TAB 3 - History:
- Service history timeline (placeholder)
- Accident history (Clean)
- Previous owners count
- Registration info

Clean tabbed layout with icons
```

### Compare Modal/Page

```
Create a car comparison layout:
- Header: "Compare Vehicles (3/4)"
- Horizontal scrollable table on mobile
- Each column is a car with:
  - Image at top
  - Remove X button
  - "Add Another Car" for empty slot (max 4)
- Rows for comparison:
  - Price
  - Year
  - Mileage
  - Engine
  - Fuel Type
  - Transmission
  - Body Type
  - Features checklist (highlight differences)
- "Clear All" button
- Sticky car headers on scroll
- Differences highlighted in yellow/orange
```

### Sticky Compare Bar

```
Create a sticky bottom bar for car comparison:
- Fixed to bottom of screen
- Shows when 1+ cars added to compare
- Left side: "Compare (2)" text
- Thumbnails of selected cars (small, 40px)
- X to remove each
- "Compare Now" button on right
- Slides up animation when appears
- Dark background, white text
- Max 4 thumbnails visible
```

---

## 💰 CALCULATOR COMPONENTS

### EMI Calculator

```
Create an EMI/loan calculator for car financing:

INPUTS:
- Vehicle Price: Number input with AED prefix (default: 75,000)
- Down Payment: Toggle between Amount (AED) or Percentage (%)
  - Input field that switches based on toggle
- Loan Tenure: Slider from 12-84 months with labels
- Interest Rate: Input with % suffix (default: 3.99%)

RESULTS (update in real-time):
- Monthly EMI: Large "AED 1,456" display
- Donut chart showing Principal vs Interest
- Summary box:
  - Loan Amount (after down payment)
  - Total Interest
  - Total Amount Payable

- "Apply for Finance" CTA button
- Disclaimer text about rates

Clean calculator UI with sliders and real-time updates
```

### Finance Eligibility Form

```
Create a multi-step finance application form:

STEP 1 - Personal Info:
- Full Name
- Email
- Phone (UAE format +971)
- Nationality dropdown
- Residency status (Resident/Citizen/Visitor)

STEP 2 - Employment:
- Employment type (Salaried/Self-employed/Business Owner)
- Company name
- Monthly income (AED)
- Years employed

STEP 3 - Vehicle:
- Selected vehicle (pre-filled or dropdown)
- Down payment amount
- Preferred tenure

STEP 4 - Review & Submit:
- Summary of all inputs
- Terms checkbox
- Submit button

Progress indicator at top
Back/Next buttons
Form validation indicators
Success state: "Application submitted! We'll contact you within 24 hours"
```

---

## 🏷️ SELL YOUR CAR COMPONENTS

### VIN Input Step

```
Create a VIN number input component for car valuation:
- Hero text: "Sell Your Car in 3 Easy Steps"
- Step indicator: 1 of 6 highlighted
- Large input field for VIN (17 characters)
- Helper text: "Find your VIN on dashboard or door frame"
- Diagram showing where to find VIN on a car
- "Where's my VIN?" expandable help section
- "Continue" button (disabled until valid VIN)
- "Don't know your VIN?" link to manual entry option
- Clean, centered layout with progress bar
```

### Vehicle Details Confirmation

```
Create a vehicle confirmation step showing decoded VIN info:
- Step indicator: 2 of 6
- Card showing decoded vehicle:
  - Vehicle image placeholder
  - Make: Suzuki
  - Model: Swift
  - Year: 2021
  - Variant: GL
  - Engine: 1.2L Petrol
- "Is this your vehicle?" prompt
- "Yes, Continue" primary button
- "No, Edit Details" secondary button
- Manual override form (collapsible) with dropdowns
```

### Damage Stencil/Marker

```
Create an interactive car damage marking interface:
- Step indicator showing progress
- Instruction text: "Tap areas with damage"
- SVG car diagram showing all views:
  - Front view
  - Rear view  
  - Left side
  - Right side
  - Top view (roof)
- Clickable zones for:
  - Hood, Bumpers, Doors, Fenders, Roof, Trunk
  - Lights, Mirrors, Wheels
- Clicked areas turn red/highlighted
- Legend showing: No Damage (green) | Minor (yellow) | Major (red)
- "Add Photo" button for each damaged area
- List of marked damages with remove option
- "No Damage" checkbox option
- Next/Back buttons
```

### Valuation Result

```
Create a car valuation result display:
- Success checkmark animation
- "Your Estimated Value"
- Large price range: "AED 45,000 - 52,000"
- "Based on current market conditions"
- Breakdown card:
  - Base value
  - Mileage adjustment
  - Condition adjustment
  - Market demand factor
- Note: "Final price confirmed after inspection"
- Two CTAs:
  - "Schedule Inspection" primary
  - "Get Instant Offer" secondary  
- "How we calculate value" expandable
- Share valuation button
```

---

## 📍 LOCATION COMPONENTS

### Store Locator

```
Create a store locator page:
- Map taking 60% width (or full on mobile)
- Google Maps embed or placeholder
- Pins for 3 locations in UAE
- Side panel with location cards:

Each location card:
- Showroom image
- Name: "Deira Showroom"
- Address with icon
- Phone with click-to-call
- WhatsApp button
- Operating hours
- "Get Directions" link
- "View Details" button

Filter dropdown by Emirate (Dubai, Abu Dhabi, Sharjah)
Search by area input
Mobile: Map on top, cards below (stacked)
```

### Showroom Detail Card

```
Create an expanded showroom detail view:
- Large image carousel of showroom
- Name and full address
- Map embed for this specific location
- Contact buttons: Call, WhatsApp, Email
- Operating hours table (Mon-Sun)
- Services available checklist:
  - Car Sales
  - Service Center
  - Trade-in
  - Financing
- Staff/team section (optional)
- "Book Appointment" button
```

---

## 📋 FORM COMPONENTS

### Contact Form

```
Create a contact us form:
- Select inquiry type dropdown:
  - General Inquiry
  - Sales Inquiry  
  - Service Booking
  - Complaint
  - Partnership
- Full name input
- Email input
- Phone input (UAE format)
- Preferred contact method (Call/Email/WhatsApp)
- Message textarea
- Preferred showroom dropdown
- Submit button
- Success state with confirmation message
- Response time expectation text
```

### Test Drive Booking Form

```
Create a test drive booking modal/form:
- Selected car displayed at top (image + name)
- Date picker (next 14 days, no Sundays)
- Time slot selection (grid of available times)
- Preferred showroom dropdown
- Personal details:
  - Name
  - Phone
  - Email
  - Valid UAE driving license? (Yes/No)
- "Book Test Drive" button
- Terms checkbox
- Success: "Booking confirmed! Check your email"
```

---

## 🎨 UI COMPONENTS

### Language Toggle

```
Create a language toggle component:
- Two options: EN | العربية
- Clean toggle/switch or segmented control
- Currently selected highlighted
- Smooth transition
- Works in header context
- Consider RTL-ready styling
```

### Status Badges

```
Create a set of status badge components:
- Available: Green background, white text
- Reserved: Orange/amber background
- Sold: Red background
- Certified Pre-owned: Blue with checkmark icon
- New Arrival: Purple with sparkle icon
- Price Drop: Red with down arrow
- Popular: Yellow with star
All should be small pill/badge shapes
```

### Floating Action Buttons

```
Create floating action buttons for mobile:
- WhatsApp button (green, bottom right)
- Scroll to top button (appears on scroll)
- Compare button with badge count
- Call button
- Stack vertically with spacing
- Smooth appear/hide animations
```

---

## 🔧 ADMIN/CMS COMPONENTS

### Approval Queue Table

```
Create an admin approval queue interface:
- Page title: "Pending Approvals (12)"
- Tabs: All | Pending | Approved | Rejected
- Table with columns:
  - Checkbox for bulk select
  - Thumbnail image
  - VIN
  - Make/Model/Year
  - Submitted by
  - Date submitted
  - Status badge
  - Actions (Approve/Reject buttons)
- Bulk actions bar (appears when items selected)
- Search/filter row
- Pagination
- Admin-style layout (darker, more functional)
```

### Listing Detail Review Modal

```
Create a listing review modal for admin:
- Large image gallery
- All vehicle specifications
- Uploaded images quality checklist:
  - Exterior photos (count)
  - Interior photos (count)
  - 360° available?
- Data completeness indicators
- "Approve & Publish" green button
- "Reject" red button with reason required
- "Request Changes" yellow button with notes field
- Edit fields inline option
- Marketplace toggles:
  - Publish to Website
  - Publish to Dubizzle
  - Publish to YallaMotors
```

---

## 📱 PAGE TEMPLATES

### Home Page

```
Create an automotive marketplace home page:

HERO:
- Full-width background image (car showroom)
- Headline: "Find Your Perfect Pre-Owned Car"
- Subheadline: "Certified vehicles from trusted dealers"
- Quick search bar: Make dropdown, Model dropdown, "Search" button
- Or "Browse All Cars" link

FEATURED SECTION:
- "Featured Vehicles" heading
- 4 car cards in a row (carousel on mobile)
- "View All" link

WHY CHOOSE US:
- 4 icon boxes: Certified Quality, Easy Financing, Trade-in Welcome, Warranty Included

BROWSE BY:
- "Browse by Body Type" - clickable cards (SUV, Sedan, Hatchback, Crossover)
- "Browse by Brand" - logo grid (Suzuki, Citroen, etc.)

SELL YOUR CAR CTA:
- Split section with image
- "Sell Your Car" headline
- "Get instant valuation" text
- "Get Started" button

TESTIMONIALS:
- Customer review cards carousel

LATEST OFFERS:
- 2-3 promotional banners

Footer included
```

### Offers Page

```
Create a promotional offers page:
- Page hero: "Current Offers & Promotions"
- Filter by: All Offers, Financing, Trade-in, Seasonal
- Grid of offer cards:
  - Each card has image/banner
  - Offer title
  - Valid until date
  - "View Details" button
  - "Expired" badge for past offers (grayed out)
- Featured/highlighted offer at top (larger)
- "Subscribe for offer updates" email signup
```

---

## Tips for Better V0 Results

1. **Be specific about colors** - Include hex codes
2. **Reference existing sites** - "like automall.ae"  
3. **Specify responsive behavior** - "3 columns desktop, 1 mobile"
4. **Include states** - Hover, active, disabled, loading
5. **Mention accessibility** - "keyboard navigable", "screen reader friendly"
6. **Ask for variants** - "include hover and selected states"

---

## After Generating in V0

When you paste the code into your project:

1. **Check imports** - May need to adjust paths for shadcn
2. **Add to component folder** - Keep organized structure
3. **Connect mock data** - Replace hardcoded values with data imports
4. **Add click handlers** - Connect to local state/navigation
5. **Test RTL** - Check Arabic layout doesn't break
