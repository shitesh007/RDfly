# Claude AI Assistant Guide

This is a quick reference for **Claude** and other AI assistants working on the **RDfly Bhopal Waste Management Platform**.

## 📚 Essential Documentation

1. **[`.github/copilot-instructions.md`](.github/copilot-instructions.md)** ← **START HERE**
   - Full project context: purpose, tech stack, architecture
   - Development workflow & environment setup
   - Code conventions, patterns, and best practices
   - Database schema & API endpoints
   - Troubleshooting guide

2. **[`AGENTS.md`](AGENTS.md)**
   - Planned agent modes for specialized tasks
   - Next.js 16 breaking changes warning

3. **[`README.md`](README.md)**
   - Standard Next.js project information

---

## ⚡ Quick Facts

| Aspect | Value |
|--------|-------|
| **Framework** | Next.js 16.2.4 (App Router) |
| **Language** | TypeScript 5 |
| **Frontend** | React 19, Tailwind CSS 4, Shadcn/ui |
| **Database** | Supabase PostgreSQL |
| **AI Engine** | Hugging Face Inference (Waste Classifier) |
| **Primary Task** | Waste compliance verification + P2P energy trading |
| **Target User** | Bulk Waste Generators (BWG), BMC admins, MRF buyers |
| **State Management** | React hooks (no Redux) |
| **Key Dev Pattern** | Mock DB (`mock-db.ts`) for dev; real Supabase for production |

---

## 🎯 Common Tasks

| Task | Reference |
|------|-----------|
| Add a new page | See "Add a new page" in [`copilot-instructions.md`](.github/copilot-instructions.md) |
| Call AI waste analyzer | See "Call the AI waste analyzer" in [`copilot-instructions.md`](.github/copilot-instructions.md) |
| Work with database | See "Database Schema (Supabase)" in [`copilot-instructions.md`](.github/copilot-instructions.md) |
| Style components | See "UI/Styling" in [`copilot-instructions.md`](.github/copilot-instructions.md) |
| Generate PDF reports | See "Generate a PDF report" in [`copilot-instructions.md`](.github/copilot-instructions.md) |
| Debug issues | See "Common Pitfalls & Troubleshooting" in [`copilot-instructions.md`](.github/copilot-instructions.md) |

---

## 🚀 Setup Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run start            # Run production build
npm run lint             # Check TypeScript + ESLint
```

**Environment**: `.env.local` required (see [`copilot-instructions.md`](.github/copilot-instructions.md#environment-setup-envlocal))

---

## ⚠️ Critical Warnings

1. **Next.js 16 APIs differ** from training data. Always check `node_modules/next/dist/docs/` for server functions, middleware, etc.
2. **React 19 required** — older patterns may not work
3. **`"use client"` directive** required for all interactive components
4. **No automated tests** — demo failsafes only; testing is manual or via `/api/analyze-waste` test overrides
5. **HF token required** for real waste verification (mock endpoint supports `demo-pass.jpg`, `demo-fail.jpg`)

---

## 🔗 Key File Locations

- **API endpoints**: `src/app/api/analyze-waste/route.ts`
- **Mock database**: `src/lib/mock-db.ts` (use for development)
- **Supabase client**: `src/lib/supabase.ts`
- **UI components**: `src/components/ui/` (shadcn/ui)
- **Pages**: `src/app/[section]/page.tsx`

---

**When in doubt, refer to [`copilot-instructions.md`](.github/copilot-instructions.md) — it has the complete project guide.**

Last Updated: April 2026
