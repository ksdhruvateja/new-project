# Forez - Industrial Catalog Platform

## Overview
Forez is a React-based industrial catalog and procurement platform showcasing 42,000+ industrial SKUs across categories like bearings, belts, chains, motors, and pneumatics. Targets diversity procurement as a certified MBE partner in the NY/NJ area.

## Tech Stack
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router 7
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **AI**: @google/genai (Gemini)

## Project Structure
```
src/
  components/   # Reusable UI components (Navbar, Footer, etc.)
  lib/          # Utility functions
  pages/        # Page views (Home, About, Catalog, Sourcing, Contact)
  App.tsx       # Main app component + routing
  constants.ts  # Industrial catalog data
  index.css     # Global CSS + Tailwind
  main.tsx      # Entry point
public/         # Static assets and images
```

## Development
- `npm run dev` — Start dev server on port 5000
- `npm run build` — Build for production (output: dist/)
- `npm run lint` — TypeScript type check

## Deployment
- Type: Static site
- Build command: `npm run build`
- Public directory: `dist`

## Environment Variables
- `GEMINI_API_KEY` — Google Gemini API key (optional, for AI features)
