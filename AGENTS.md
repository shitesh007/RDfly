# RDfly Agent Modes & Customizations

This workspace contains **RDfly Bhopal Waste Management Platform** — a B2B circular economy SaaS for waste compliance, marketplace trading, and municipal dashboards.

## 📋 Read First

See [`.github/copilot-instructions.md`](.github/copilot-instructions.md) for:
- Project overview & tech stack
- File structure & key files
- Development workflow & environment setup
- Code conventions & patterns
- Database schema & APIs
- Common development tasks
- Troubleshooting guide

## 🤖 Agent Modes

The following agent customizations can enhance your workflow for specific RDfly tasks.

### (Planned) `rdfly-frontend` Agent
**Purpose**: UI/component development for waste compliance forms, marketplace listing cards, and BMC dashboards

**When to Use**:
- Building new pages, forms, or dashboard widgets
- Styling with Tailwind + shadcn/ui
- Adding interactive features (filters, modals, Real-time updating)

**Features** (when created):
- Auto-suggest Tailwind + shadcn/ui patterns
- Validate component accessibility
- Enforce dark theme compliance
- Suggest PDF report templates

### (Planned) `rdfly-api` Agent
**Purpose**: Backend development for AI waste verification, Supabase integrations, and marketplace APIs

**When to Use**:
- Building/modifying API routes (`/api/*`)
- Implementing Supabase queries with RLS
- Integrating Hugging Face waste classification
- Adding new marketplace transaction types

**Features** (when created):
- Validate HF token usage
- Suggest mock-DB vs. real-Supabase tradeoffs
- Check auth role requirements (BWG_ENTITY, BMC_ADMIN, MRF_BUYER)
- Enforce error handling patterns

### (Planned) `rdfly-compliance` Agent
**Purpose**: Domain expertise on waste management, EBWGR compliance, and penalty calculations

**When to Use**:
- Implementing waste segregation logic
- Calculating compliance scores & penalties
- Generating EBWGR certificates
- Mapping waste streams to government portals (SBM-U, GOBARdhan)

**Features** (when created):
- Validate 4-stream segregation rules
- Auto-calculate INR penalties based on compliance_status
- Suggest government portal sync logic
- Link to compliance standards (`src/app/guidelines/page.tsx`)

---

## ⚠️ Next.js 16 Breaking Changes

This is **NOT the Next.js you know**. Critical version-specific info:

- **App Router** (not Pages Router)
- **React 19.2.4** (18.x patterns may not work)
- **TypeScript strict mode** enabled
- **SSR by default**; use `"use client"` for interactivity
- **Middleware** differs: check `node_modules/next/dist/docs/` for exact syntax

**Always verify Next.js 16 docs before implementing server-side code.**

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set environment (.env.local)
HF_ACCESS_TOKEN=your_huggingface_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Start dev server
npm run dev
```

For detailed setup, see [`README.md`](README.md) and [`.github/copilot-instructions.md`](.github/copilot-instructions.md).

---

**Last Updated**: April 2026 | **Framework**: Next.js 16.2.4 | **Primary Language**: TypeScript 5
