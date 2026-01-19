# AI Session Starter - Drive Tru Prototype

Copy and paste EVERYTHING below the line when starting a new AI coding session.

---

## Project Context

You are helping me build a **DESIGN PROTOTYPE** for "Drive Tru" - a pre-owned car marketplace for UAE (Suzuki & Citroen brands under ARTC/Al Rostamani). 

**⚠️ IMPORTANT: This is NOT a production application.**

This prototype is for:
- Stakeholder presentations
- RFP/proposal effort estimation
- Client discussions and sign-off
- Integration feasibility demonstration

### Prototype Philosophy

```
PROTOTYPE MINDSET:
✅ Visual completeness over code perfection
✅ All features visible (even if mocked)
✅ Realistic mock data over real integrations
✅ Speed over scalability
✅ Hardcoded data is acceptable
✅ Placeholder interactions are fine
✅ Copy-paste from v0.dev encouraged

❌ Don't worry about:
- TypeScript strictness
- Unit tests
- Error boundaries
- Production security
- Database optimization
- Real API integrations
```

---

## Required Reading (IN ORDER)

1. **`.ai/CONTEXT.md`** - Project state, what's built, tech stack
2. **`.ai/FEATURES.md`** - Complete feature matrix with BUILD/MOCK status
3. **`.ai/V0_PROMPTS.md`** - Ready-to-use v0.dev prompts for components
4. **`.ai/PAGES.md`** - All pages and their requirements

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open browser
http://localhost:3000
```

---

## Working Rules for Prototype

### When Building UI
1. Check `.ai/V0_PROMPTS.md` for ready-made v0.dev prompts
2. Generate component in v0.dev
3. Copy to project
4. Connect to mock data from `/data/` folder
5. Add minimal interactivity

### When Adding Features
1. Check feature status in `.ai/FEATURES.md`
2. If "BUILD" → Make it functional with mock data
3. If "MOCK" → Make it look real but hardcode behavior
4. If "SKIP" → Don't build, just note in documentation

### Data Strategy
- All mock data lives in `/src/data/` as JSON/TS files
- Use realistic UAE car data (makes, prices in AED, locations)
- Include Arabic translations where shown in UI

### Code Style (Relaxed for Prototype)
- TypeScript with `any` is acceptable
- Inline styles are fine
- Copy-paste duplication is okay
- Comments for "TODO: Production" items

---

## End of Session

Update `.ai/CONTEXT.md`:
- Mark completed pages/features
- Note any blockers
- List next priorities

---

## Today's Session

**Session Date:** Jan 19, 2026

**Original Question:** How can I host this prototype? I guess Vercel will not work as we are not doing strict typing and the build will fail. Are there other options that will work perfectly for us?

**✅ COMPLETED:**

1. **Verified Vercel WORKS perfectly!**
   - `next.config.js` already configured to ignore TypeScript errors
   - This is exactly the right approach for prototypes

2. **Fixed Build Issues:**
   - Added Suspense boundaries to pages using `useSearchParams()`
   - Fixed: `/buy/cars` and `/tools/my-garage` pages
   - Build now passes: ✅ All 41 pages generated successfully

3. **Created Comprehensive Documentation:**
   - `START_HERE.md` - Quick deploy guide (2 min)
   - `DEPLOY.md` - TL;DR deployment
   - `DEPLOYMENT_READY.md` - Build confirmation & checklist
   - `.ai/DEPLOYMENT.md` - Complete guide with troubleshooting
   - `.ai/PRE_DEPLOY_CHECKLIST.md` - Full testing guide
   - `vercel.json` - UAE region optimization
   - Updated `README.md` - Added deployment section
   - Updated `.ai/CONTEXT.md` - Added deployment status

4. **Build Test Results:**
   ```
   ✓ npm run build - SUCCESS
   ✓ 41 pages generated
   ✓ No errors
   ✓ Ready for production deployment
   ```

**DEPLOYMENT STATUS:** 🚀 READY TO DEPLOY

**Next Steps for User:**
```bash
# Deploy now!
npm install -g vercel
vercel

# Or push to GitHub and import at vercel.com/new
```

---

**Reference:** Check `.ai/V0_PROMPTS.md` for component prompts

Start by reading the context files and confirming understanding.
