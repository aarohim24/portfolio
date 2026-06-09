# Aarohi Mathur — Portfolio

Personal engineering portfolio built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion. Deployed to GitHub Pages via GitHub Actions CI/CD.

**Live:** [aarohim24.github.io/portfolio](https://aarohim24.github.io/portfolio/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5.6 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Deployment | GitHub Pages |
| CI/CD | GitHub Actions |

---

## Local Development

**Prerequisites:** Node 20+

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Runs at http://localhost:5173/portfolio/

# Type check
npx tsc --noEmit

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
src/
├── components/           # Page section components
│   ├── ui/               # Reusable primitives (FadeIn, AnimatedText, ContactButton)
│   ├── HeroSection.tsx
│   ├── MarqueeSection.tsx
│   ├── AboutSection.tsx
│   ├── ExperienceSection.tsx
│   ├── SkillsSection.tsx
│   ├── FreelanceSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   └── LoadingScreen.tsx
├── data/                 # Content layer — edit content here, never in components
│   ├── about.ts          # Bio text, stats, highlight cards
│   ├── experience.ts     # Work experience entries
│   ├── projects.ts       # Project entries
│   └── skills.ts         # Skills entries
├── lib/                  # Shared utilities
│   ├── constants.ts      # Animation ease, name chars, contact links
│   └── design-tokens.ts  # Color palette reference
├── App.tsx
├── main.tsx
└── index.css
public/
└── screenshots/          # Project screenshots used in the portfolio
.github/
└── workflows/
    └── deploy.yml        # CI: type-check → build → deploy to GitHub Pages
```

---

## Updating Content

All portfolio content lives in `src/data/`. To update anything:

| What to change | File |
|---|---|
| Bio text, stats, recognition cards | `src/data/about.ts` |
| Work experience entries | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Skills section | `src/data/skills.ts` |
| Contact links and email | `src/lib/constants.ts` |

Components only handle rendering — content changes never require touching component logic.

---

## Deployment

Every push to `main` automatically:

1. Runs TypeScript type checking (`tsc --noEmit`)
2. Builds the production bundle (`vite build`)
3. Deploys the `dist/` output to GitHub Pages

Manual deploys can be triggered from the Actions tab via `workflow_dispatch`.

---

## Architecture Notes

**Loading screen:** `LoadingScreen.tsx` plays a letter-by-letter name reveal with a progress counter on first render, then exits with a Framer Motion fade via `AnimatePresence` before the main page mounts.

**Animations:** All entrance animations use a shared `EASE = [0.22, 1, 0.36, 1]` cubic-bezier defined once in `src/lib/constants.ts`. Scroll-linked effects (marquee parallax, animated text reveal) use `useScroll` from Framer Motion.

**Design system:** Colors and fonts are registered in `tailwind.config.js` under `theme.extend` and also available as typed tokens in `src/lib/design-tokens.ts`.

---

## License

MIT
