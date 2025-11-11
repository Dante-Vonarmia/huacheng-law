# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Watson & Band Law Firm Portal Revamp** - A SvelteKit + SCSS frontend rebuild for a Chinese law firm's website. This project maintains backward compatibility with existing backend APIs while upgrading the frontend with modern architecture, SEO optimization, accessibility standards, and international performance.

**Quality Targets**: Lighthouse Performance ≥90, SEO ≥95, Accessibility ≥90

## Development Commands

### Setup & Development
```bash
npm install                    # Install dependencies
npm run dev                    # Start dev server
npm run build                  # Production build
npm run preview                # Preview production build
```

### Code Quality
```bash
npm run check                  # TypeScript type checking
npm run check:watch            # Watch mode for type checking
npm run lint                   # Run ESLint
npm run format                 # Format code with Prettier
```

### Quality Assurance
```bash
npm run test:lighthouse        # Run Lighthouse performance tests
npm run test:a11y             # Run accessibility checks
npm run test:seo              # Run SEO validation
npm run test:all              # Run all QA tests
```

## Architecture & Key Concepts

### Technology Stack
- **Frontend**: SvelteKit 2.0 (SSG + SSR hybrid)
- **Styling**: SCSS with modular variable system (NO Tailwind)
- **Type Safety**: TypeScript 5.3
- **Build Tool**: Vite 5.0

### Critical Architectural Patterns

#### 1. Schema-Driven Architecture ⭐ NEW
**Core Principle**: All dynamic content is defined by JSON Schema, frontend only renders.

**Why this approach**:
- Backend uses rich text HTML editor for content management
- Native multi-language support via `_zh`/`_en` field suffixes
- Modular CRUD operations on schema object arrays
- Content updates without code changes

**Key components**:
- **Schema Definition**: TypeScript interfaces with multi-language fields
- **Picker Component**: Acts as schema container, each tab = one schema object
- **Rich Content Rendering**: Unified `.rich-content` styles for HTML from backend editor
- **Adapter Layer**: Transforms backend fields to frontend schema

**Example**:
```typescript
interface PracticeSchema {
  id: string;
  slug: string;
  category: string;
  name_zh: string;        // Chinese name
  name_en: string;        // English name
  description_zh: string;
  description_en: string;
  services: string[];
  richContent?: string;   // HTML from backend editor
}
```

See `docs/architecture.md` §12 for full details.

#### 2. Adapter Layer Pattern
The `adapter/` directory handles all backend integration:
- `schema-map.json`: Maps legacy backend fields to frontend schema fields
- `api-client.ts`: Wraps all API calls with field transformation
- `schema/`: TypeScript schema definitions (practice.ts, lawyer.ts, etc.)
- `mock-data/`: Development data matching production API structure

**Why**: Isolates backend coupling, allowing frontend to work with clean Schema types while supporting legacy APIs.

#### 3. UI Kit Separation
`ui-kit/` is a standalone component library separate from `src/`:
- `ui-kit/components/`: Reusable Svelte components (base, layout, domain)
- `ui-kit/styles/`: SCSS variable system (colors, spacing, typography)

**Why**: Components are reusable across projects and maintain consistent branding.

#### 4. Multi-language Architecture
- `locales/zh.json` and `locales/en.json`: Translation files
- URL structure: `/zh/*` and `/en/*` routes
- Each page template consumes translations via shared i18n utility

**Why**: Full bilingual support (Chinese/English) for international law firm.

**Schema-Driven Multi-language**: Use `_zh`/`_en` field suffixes in Schema (e.g., `name_zh`, `name_en`) instead of nested locale objects.

#### 5. Rendering Strategy by Content Type
- **SSG** (Static): About, Practice Areas (stable content, SEO priority)
- **SSR** (Server): Lawyers, News, Events (dynamic content, up-to-date data)
- **CSR** (Client): Search, Forms (user interaction)

### Component Naming & Style Conventions

**STRICT RULES**:
1. All components use **PascalCase** (e.g., `LawyerCard.svelte`)
2. All styles use **SCSS variables** from `ui-kit/styles/variables.scss`
3. **NO Tailwind CSS** - use SCSS modules only
4. **NO inline styles** - maintain separation of concerns

**Example**:
```svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button class="btn btn--{variant}">
  <slot />
</button>

<style lang="scss">
@import '$ui-kit/styles/variables.scss';
.btn {
  background: $color-primary;
  padding: $spacing-md;
}
</style>
```

### Brand Colors (Law Firm Theme)
- Primary (Navy): `#0E1B3A` - Professional, trustworthy
- Secondary (Gold): `#B5975A` - Premium, international
- Text: `#2C3E50`
- Background: `#F5F7FA`

## Project Structure Highlights

### Key Directories
- `src/routes/`: SvelteKit file-based routing
  - Dynamic routes use `[param]` syntax (e.g., `team/[id]/+page.svelte`)
  - Data loading via `+page.ts` or `+page.server.ts`
- `ui-kit/`: Design system (components + SCSS)
- `adapter/`: Backend integration layer
- `locales/`: i18n translation files
- `qa/`: Testing scripts and reports
- `docs/`: Project documentation (AGENTS.md, TASKS.md, architecture.md)

### Data Flow Pattern
```
Backend API → adapter/api-client.ts → schema-map.json → Frontend Types → Svelte Components
```

All external data must pass through the adapter layer for field mapping and type safety.

## Agent-Based Workflow

This project uses a **4-agent collaboration model** (see AGENTS.md):

1. **PM Agent**: Task planning, progress tracking (`docs/`)
2. **Design Agent**: UI Kit development (`ui-kit/`)
3. **Frontend Agent**: Page templates and adapter layer (`src/`, `adapter/`)
4. **QA Agent**: Performance testing and reports (`qa/`)

**Task Registry**: All work items tracked in `TASKS.md` with Phase 0-5 breakdown.

## SEO & Accessibility Requirements

### Every Page Must Include
- Unique `<title>` tag
- `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- `<link rel="canonical">`
- For bilingual pages: `<link rel="alternate" hreflang="zh-CN" href="...">` and `hreflang="en"`

### Accessibility Standards
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratio ≥4.5:1
- Semantic HTML structure

### Performance Targets
- First Contentful Paint < 1.8s
- Time to Interactive < 3.8s
- Cumulative Layout Shift < 0.1
- Image lazy loading with Intersection Observer

## Important Constraints

### Backend Compatibility
- Must maintain 100% compatibility with existing backend APIs
- All API changes handled via `adapter/schema-map.json` mapping
- Do NOT modify backend endpoints or data structures

### Cross-Reference System
Pages have bidirectional links:
- Lawyer Detail ↔ Practice Areas (lawyers work in multiple areas)
- Lawyer Detail ↔ News/Publications (lawyers author content)
- Practice Detail ↔ Lawyers (areas list their lawyers)

Ensure these relationships are maintained via entity IDs in adapter layer.

## Common Pitfalls to Avoid

1. **Don't use Tailwind** - This is a SCSS-only project
2. **Don't skip the adapter layer** - All backend data must transform through `schema-map.json`
3. **Don't inline styles** - Use SCSS variables and modules
4. **Don't forget bilingual content** - Every text string needs zh/en versions
5. **Don't ignore SSG/SSR strategy** - Use appropriate rendering per page type (see architecture.md §5)
6. **Don't hard-code dynamic content** - Use Schema objects for all CMS-managed content
7. **Don't nest multi-language fields** - Use `name_zh`/`name_en` suffixes, not `name: { zh: '', en: '' }`
8. **Don't skip HTML sanitization** - Always use DOMPurify for rich text content in production
9. **Don't couple components with data** - Components should accept Schema props, not fetch data directly

## Development Workflow

1. Check `TASKS.md` for current phase and assigned work
2. **For Schema-Driven pages**:
   - Define Schema interface first in `adapter/schema/`
   - Add field mapping in `adapter/schema-map.json`
   - Implement API client function in `adapter/api-client.ts`
   - Create page with Picker component and rich-content rendering
3. For UI work: Start with `ui-kit/` components before `src/routes/`
4. For pages: Use Design Agent's components, never rebuild common UI
5. For backend integration: Update `adapter/schema-map.json` first, then types
6. Before marking complete: Run `npm run test:all` for QA validation

## File Naming Patterns

- Svelte components: `PascalCase.svelte`
- Routes: lowercase with hyphens (e.g., `practice-areas/`)
- SCSS files: kebab-case (e.g., `variables.scss`)
- TypeScript: camelCase for files, PascalCase for types

## Version Requirements

- Node.js ≥18.0.0
- npm ≥9.0.0

---

**Last Updated**: 2025-11-03
**Project Lead**: Fan Feng
**Collaboration System**: Claude Code Agents
