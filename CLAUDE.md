# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on port 8080
- `npm run build` - Create production build
- `npm run build:dev` - Create development build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### TypeScript
- `npm run typecheck` - Run TypeScript compiler to check types (Note: Currently not configured in package.json, use `tsc --noEmit` if needed)

## Architecture Overview

This is a React 18 SPA built with Vite and TypeScript, designed as a business landing page for Infinics. The application uses:

- **UI Framework**: React with TypeScript, styled using Tailwind CSS and shadcn/ui components
- **Routing**: React Router v6 with two routes (Index and NotFound)
- **State Management**: React Query setup for server state (currently unused), local state with custom hooks
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with SWC for fast compilation

### Key Architectural Patterns

1. **Component Organization**:
   - Business components in `/src/components/` (Hero, FAQ, ContactForm, etc.)
   - Reusable UI primitives in `/src/components/ui/` from shadcn/ui
   - Page components in `/src/pages/`
   - Custom hooks in `/src/hooks/`

2. **Styling Approach**:
   - Utility-first with Tailwind CSS
   - Use `cn()` utility from `/src/lib/utils.ts` for combining classes
   - CSS animations defined in tailwind.config.ts (fade-in, pulse, accordion)
   - Gradient-heavy design with CSS variables for theming

3. **Toast Notification System**:
   - Custom implementation with reducer pattern in `/src/hooks/use-toast.ts`
   - Global state management outside React component tree
   - Use `toast()` function to trigger notifications

4. **Path Aliases**:
   - Use `@/` to import from `src/` directory (e.g., `@/components/ui/button`)

### Development Guidelines

1. **Component Creation**:
   - Create functional components with TypeScript
   - Place business components in `/src/components/`
   - Use shadcn/ui components from `/src/components/ui/` as building blocks
   - Follow existing patterns for imports and structure

2. **Adding New Routes**:
   - Add route components to `/src/pages/`
   - Update routing in `/src/App.tsx`

3. **Form Handling**:
   - Use React Hook Form with Zod schemas for validation
   - See ContactForm.tsx for reference implementation

4. **Responsive Design**:
   - Use `useIsMobile()` hook for responsive behavior
   - Apply Tailwind responsive prefixes (sm:, md:, lg:, xl:)

5. **API Integration** (when needed):
   - React Query is already configured in App.tsx
   - Create service functions in `/src/lib/` or a new `/src/services/` directory
   - Use React Query hooks for data fetching

### Important Notes

- This is a Lovable.dev project - deployment and hosting are managed through their platform
- No testing framework is currently set up
- No environment variables or API endpoints are configured
- The project uses relaxed TypeScript settings (allows implicit any and unused parameters)