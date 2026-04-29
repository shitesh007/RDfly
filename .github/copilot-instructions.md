# RDfly Bhopal Waste Management Platform — Agent Instructions

## Project Overview

**RDfly** is a **B2B compliance and marketplace SaaS** for Bhopal's Urban Waste Management, built to enforce Supreme Court Order 6174/2023 + Solid Waste Management Rules 2026.

**Core Mission:**
- Verify 4-stream waste segregation via AI computer vision
- Issue EBWGR compliance certificates to Bulk Waste Generators (BWGs)
- Enable P2P energy trading (RDF, CBG, manure) in a municipal marketplace
- Provide real-time waste diversion metrics to BMC (Bhopal Municipal Corporation)

**Scope:**
- **1,060 TPD** of municipal waste from Bhopal targeting two MRFs (Adampur, Bhanpur)
- Multi-role system: BWG entities, BMC admins, MRF buyers
- GPS logistic tracking + government portal integration (SBM-U, GOBARdhan)

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.2.4 |
| **Language** | TypeScript | 5 |
| **Frontend** | React | 19.2.4 |
| **Styling** | Tailwind CSS + PostCSS | 4 |
| **UI Components** | shadcn/ui (Base UI React) + Lucide Icons | Latest |
| **Database** | Supabase PostgreSQL Client | 2.104.0 |
| **AI Engine** | Hugging Face Inference API | Augmented-Waste-Classifier-SigLIP2 |
| **PDF Reports** | pdf-lib, jsPDF, html2canvas | 1.17.1, 4.2.1, 1.4.1 |
| **Charts** | Recharts | 3.8.1 |
| **State** | React hooks (no Redux/Zustand) | - |
| **Node** | 20+ | - |

---

## Project Structure & Key Files

```
src/
├── app/
│   ├── page.tsx                    # Landing page (roadmap hero + nav)
│   ├── layout.tsx                  # Root wrapper (Navigation, Toaster)
│   ├── globals.css                 # Tailwind base + dark theme enforcement
│   ├── api/
│   │   └── analyze-waste/route.ts  # 🔑 AI vision endpoint (HF model calls)
│   ├── bmc/page.tsx                # BMC admin dashboard (metrics, portal sync)
│   ├── bwg/page.tsx                # Bulk Waste Generator compliance form
│   ├── marketplace/page.tsx        # RDF/CBG trading hub (buy/sell listings)
│   ├── finance/page.tsx            # Project economics & carbon offsets
│   ├── login/page.tsx              # Auth stub (roles: BWG_ENTITY, BMC_ADMIN, MRF_BUYER)
│   └── guidelines/page.tsx         # Compliance guidelines & standards
├── components/
│   ├── Navigation.tsx              # Sticky header + auth status
│   ├── ReportTemplates.tsx         # EBWGR cert & penalty invoice generation
│   └── ui/                         # shadcn/ui primitives (card, button, table, etc.)
├── lib/
│   ├── supabase.ts                 # Supabase client + AppUser interface
│   ├── mock-db.ts                  # 🔑 In-memory data store + async simulators
│   └── utils.ts                    # cn() classname merger utility
└── scratch/                        # Debug/seed scripts (NOT production code)
```

### 🔑 Critical Files

1. **`lib/mock-db.ts`** — Simulates Supabase with 600–1200ms delays. Use for dev/testing to avoid live DB calls.
2. **`api/analyze-waste/route.ts`** — Calls Hugging Face model; filename-based test overrides (`demo-pass`, `demo-fail`).
3. **`components/ReportTemplates.tsx`** — PDF generation for EBWGR certs (success) and penalty invoices (failure).
4. **`lib/supabase.ts`** — Supabase client init; defines AppUser role enum but auth is incomplete.

---

## Development Workflow

### Prerequisites
```bash
Node 20+
npm install
```

### Environment Setup (`.env.local`)
```env
# Hugging Face AI model token (required for waste verification)
HF_ACCESS_TOKEN=your_huggingface_token

# Supabase credentials (optional in dev; required for production DB calls)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Build & Run Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (localhost:3000, hot reload) |
| `npm run build` | Compile TypeScript + optimize for Vercel |
| `npm run start` | Production server (requires prior `build`) |
| `npm run lint` | ESLint validation |

### Development Best Practices

#### Mock DB vs. Real Supabase
- **Use `mock-db.ts`** (default):
  - Zero external dependencies
  - Instant feedback loop
  - Predictable 600–1200ms delays for UX testing
  - Perfect for component development & testing

- **Use real Supabase** (when ready):
  - Set `.env.local` credentials
  - Call Supabase clients directly from `lib/supabase.ts`
  - Implement proper auth roles (BWG_ENTITY, BMC_ADMIN, MRF_BUYER)
  - Add row-level security (RLS) policies in Supabase console

#### AI Model Testing
- **Production**: HF Inference API requires valid `HF_ACCESS_TOKEN`
- **Demo/Testing**: POST filename-based overrides to `/api/analyze-waste`:
  - `demo-pass.jpg` → Confidence: 0.98, Status: COMPLIANT
  - `demo-fail.jpg` → Confidence: 0.45, Status: NON_COMPLIANT

#### State & Side Effects
- Components use React `useState`/`useEffect` only
- No Redux/Zustand; keep state colocated with usage
- Async operations: Use `useEffect` cleanup patterns
- Error handling: Try-catch + Sonner toast notifications

---

## Code Conventions

### UI/Styling
| Pattern | Rule |
|---------|------|
| **Classes** | Use `cn()` from `lib/utils.ts` to merge Tailwind classes safely |
| **Theme** | Dark theme enforced (`dark` class on `<html>`); use Tailwind `dark:` prefix |
| **Colors** | emerald-500 (success/compliance), red-500 (failure/violation), blue-500 (info) |
| **Icons** | Use Lucide React from `lucide-react` (tree-shakeable imports) |
| **Shadcn Components** | Import from `@/components/ui/` (auto-generated from Base UI React) |

### Component Structure
```tsx
"use client"; // Required for interactive components

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export default function MyComponent() {
  // Logic here
  return <div className={cn("p-4", "dark:bg-gray-900")}>...</div>;
}
```

### Path Aliases
Use `@/` prefix (configured in `tsconfig.json`):
```tsx
// ✅ Good
import { mockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/button";

// ❌ Avoid
import { mockDB } from "../../../../lib/mock-db";
```

### Error Handling
```tsx
try {
  const result = await fetch("/api/analyze-waste", { /* ... */ });
  // Toast success on result.ok
} catch (error) {
  console.error("Error:", error);
  toast.error("Failed to analyze waste");
}
```

### PDF Report Generation
- Use `html2canvas` + `jsPDF` for certificate/invoice rendering
- Base64 encode for download links
- Trigger on success (EBWGR cert) or failure (penalty invoice)

---

## Database Schema (Supabase)

### Tables

#### `waste_logs`
| Column | Type | Purpose |
|--------|------|---------|
| waste_id | uuid (PK) | Unique waste collection event |
| compliance_status | enum | COMPLIANT, NON_COMPLIANT |
| detected_label | text | Waste classification (4-stream) |
| confidence_score | float | AI model confidence 0.0–1.0 |
| penalty_amount | money | Fine if non-compliant (INR) |
| tonnage | numeric | Waste weight in tonnes |
| timestamp | timestamp | Scan datetime |

#### `marketplace_listings`
| Column | Type | Purpose |
|--------|------|---------|
| listing_id | uuid (PK) | RDF/CBG inventory item |
| material_type | enum | RDF, CBG, MANURE |
| seller_name | text | MRF/entity selling |
| volume_tonnes | numeric | Stock available |
| price_per_unit | money | INR per tonne |
| status | enum | ACTIVE, SOLD, EXPIRED |

#### `rdf_transactions`
| Column | Type | Purpose |
|--------|------|---------|
| txn_id | uuid (PK) | Buy/sell ledger entry |
| buyer_name | text | Purchasing entity |
| listing_id | uuid (FK) | Reference to marketplace_listings |
| total_amount | money | Transaction value (INR) |
| commission | money | Platform commission |
| created_at | timestamp | Trade datetime |

---

## Common Development Patterns

### Fetch Data from Mock DB
```tsx
import { mockDB } from "@/lib/mock-db";

// In an async handler
const bins = await mockDB.getWasteCollectionBins(); // 600-1200ms delay
```

### Call AI Waste Verification
```tsx
const response = await fetch("/api/analyze-waste", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ imagePath: "demo-pass.jpg" })
});
const { compliance_status, confidence_score } = await response.json();
```

### Display Compliance Badge
```tsx
import { Badge } from "@/components/ui/badge";

<Badge className={compliance_status === "COMPLIANT" ? "bg-emerald-500" : "bg-red-500"}>
  {compliance_status}
</Badge>
```

### Generate PDF Report
```tsx
import { generateEBWGRCertificate } from "@/components/ReportTemplates";

const pdfBlob = await generateEBWGRCertificate(wasteData);
const link = document.createElement("a");
link.href = URL.createObjectURL(pdfBlob);
link.download = `certificate-${wasteData.waste_id}.pdf`;
link.click();
```

---

## Deployment & Production Readiness

### Current Status
- ✅ MVP-ready with mock data
- ✅ Hugging Face AI integration scaffolded
- ⚠️ Supabase schema defined; auth logic incomplete
- ⚠️ No automated tests (demo failsafes in API endpoint)
- ⚠️ Government portal integration mocked (SBM-U, GOBARdhan)

### Before Production
1. **Auth Implementation**: Complete role-based access control (RLS in Supabase)
2. **Test Suite**: Add Jest/Vitest + Cypress for regression prevention
3. **API Validation**: Secure HF token; add rate limiting for `/api/analyze-waste`
4. **Data Migrations**: Seed real waste collection data + MRF locations
5. **Portal Sync**: Implement actual SBM-U + GOBARdhan API endpoints
6. **Monitoring**: Log waste compliance metrics for BMC dashboard
7. **Backup/DR**: Configure Supabase automated backups

### Deployment to Vercel
```bash
npm run build  # Verify no TypeScript errors
vercel deploy  # Auto-detects Next.js + deploys
```

---

## Common Pitfalls & Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Cannot find module @/components/ui" | shadcn/ui not generated | Run `npx shadcn-ui@latest init` |
| HF model returns 401 | Invalid/missing `HF_ACCESS_TOKEN` | Check `.env.local`; regenerate token on HF dashboard |
| Mock DB returns stale data | Browser cache | Clear localStorage (`localStorage.clear()`) + restart dev server |
| Tailwind classes not applying | Class merge conflict | Use `cn()` utility instead of string concat |
| Supabase connection timeout | Real DB unreachable or wrong URL | Verify `.env.local` credentials; check Supabase console |
| PDF generation fails silently | html2canvas/jsPDF version mismatch | Update: `npm install html2canvas@latest jsPDF@latest` |

---

## Navigation & Role-Based Views

### Page Routing
| Route | Role(s) | Purpose |
|-------|---------|---------|
| `/` | Public | Landing + roadmap hero |
| `/bmc` | BMC_ADMIN | Dashboard (waste metrics, gov portal sync) |
| `/bwg` | BWG_ENTITY | Compliance form + cert retrieval |
| `/marketplace` | MRF_BUYER | RDF/CBG trading hub |
| `/finance` | All | Project economics + carbon offset calculator |
| `/guidelines` | Public | Waste segregation standards + penalties |
| `/login` | Public | Auth (incomplete) |

---

## Future Enhancements

- [ ] Complete Supabase auth with role-based RLS
- [ ] Add automated test suite (Jest + React Testing Library + Cypress)
- [ ] GPS logistics tracking integration (Google Maps API)
- [ ] Real-time notifications (Supabase Realtime subscriptions)
- [ ] Carbon credit scoring & blockchain ledger (optional)
- [ ] Mobile app (React Native)
- [ ] Integration with BMC SCADA systems

---

## Quick Reference: Common Tasks

### "Add a new page"
1. Create `src/app/[section]/page.tsx` with `"use client"`
2. Import components from `@/components/ui/`
3. Use `cn()` for Tailwind classes
4. Add Navigation entry in `components/Navigation.tsx`

### "Call the AI waste analyzer"
1. Prepare image as FormData or base64
2. POST to `/api/analyze-waste` with `{ imagePath }`
3. Handle response: `{ compliance_status, confidence_score, detected_label }`
4. Display results with color-coded Badge

### "Fetch data from mock DB"
1. Import `{ mockDB }` from `@/lib/mock-db`
2. Await mock function (includes 600–1200ms delay)
3. Use data in component state via `useState`

### "Generate a PDF report"
1. Import `{ generateEBWGRCertificate }` from `@/components/ReportTemplates`
2. Pass waste/compliance data object
3. Receive Blob; create download link with `URL.createObjectURL()`

---

## Links & Resources

- **[Next.js App Router Docs](https://nextjs.org/docs/app)** — Latest routing patterns
- **[Tailwind CSS](https://tailwindcss.com/docs)** — Utility-first styling
- **[Shadcn UI](https://ui.shadcn.com/)** — Component library docs
- **[Supabase JS Client](https://supabase.com/docs/reference/javascript)** — Database API
- **[Hugging Face Inference API](https://huggingface.co/docs/api-inference)** — AI model integration
- **Supreme Court Order 6174/2023** — Bhopal mandate (see `src/app/guidelines/page.tsx`)
- **SWM Rules 2026** — Compliance standards reference

---

## Support & Escalation

- **AI Model Issues**: Check HF token in `.env.local`; test with `demo-pass.jpg` + `demo-fail.jpg`
- **Database Issues**: Verify Supabase URL + keys in `.env.local`; check RLS policies
- **Component Styling**: Use `cn()` utility; verify Tailwind dark mode in `globals.css`
- **Build Failures**: Run `npm run lint` to catch TypeScript errors pre-deployment

---

**Last Updated**: April 2026 | **Framework Version**: Next.js 16.2.4
