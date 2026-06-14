# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000 with hot reload)
npm run build     # Production build
npm start         # Run production server
npm run lint      # Run ESLint
```

## Project Overview

**Skin Aura Test** — A 10-question sensorial consultation that generates a personalized "Aura" personality profile based on lifestyle, skincare habits, and emotional energy. Bilingual (中文/English), mobile-first, with premium animated interactions.

### Tech Stack

- **Next.js 16.2.6** (App Router, React Compiler enabled)
- **React 19.2.4** with TypeScript
- **Tailwind CSS v4** (CSS-based configuration, Oxide engine)
- **Framer Motion 12.39** (complex scene animations)
- **Zustand 5.0.13** (global quiz state)
- **Lucide Icons** (ultra-light SVG icons)

### Next.js 16 Breaking Changes

Read `node_modules/next/dist/docs/` for current API docs. Key changes from v15:
- App Router conventions differ; check docs before using new patterns
- React Compiler is enabled (`reactCompiler: true`)
- Use `'use client'` for interactive components
- Image/Font optimization rules differ

---

## Architecture

### Page Structure

```
/ (Landing)
  └─ Brand intro + "Start Analysis" CTA

/quiz (Interactive Quiz)
  ├─ 10 sequential questions
  ├─ Each question has 4 answer options
  ├─ Custom visual interaction per question type
  └─ Double-tap to confirm flow

/result (Results Page)
  └─ Personalized aura profile
     ├─ Primary aura card + percentage
     ├─ Secondary aura card
     ├─ Aura composition stats
     ├─ Personality/skin description
     └─ Ritual recommendations
```

### Data Flow

1. **Landing** → User clicks "Start Analysis"
2. **Quiz** → User answers Q1-Q10, store answers in Zustand
3. **Quiz → Result** → After Q10 confirmed, show 3.6s analysis animation, then navigate to /result
4. **Result** → `calculateResult()` reads all 10 answers, scores 8 aura types by frequency, picks primary/secondary

**State Management:** `src/store/useQuizStore.ts` (Zustand)
- `answers: Record<string, string>` — Map of question ID → selected option ID
- `language: 'zh' | 'en'` — Current language
- `resetQuiz()` — Clear answers when restarting

---

## Quiz System

### Questions & Aura Mapping

**File:** `src/data/questions.json`

Each question maps user choices to one of **8 aura types**:

| Aura Type | Profile Name | Vibe |
|-----------|--------------|------|
| `overworked` | QUIET RECHARGE | Needs energy reset |
| `stress` | HIGH SENSITIVITY OPERATOR | Highly perceptive, needs grounding |
| `hidden_aging` | STRUCTURED LIVING | Detail-aware, long-term care |
| `recovery` | RECOVERY MODE | In repair mode, needs rest |
| `preventive` | BALANCE BUILDER | Stable, building resilience |
| `glow` | RADIANT GLOW | Glowing energy |
| `burnout` | (Burnout archetype) | Exhausted, rushing |
| `late_night` | (Night owl archetype) | Sleep-deprived |

**Scoring Logic** (`src/lib/quizLogic.ts`):
- Count how many times each aura is selected across 10 questions
- Primary aura = highest score
- Secondary aura = second highest
- Tie-breaker priority: `['burnout', 'stress', 'overworked', 'late_night', 'hidden_aging', 'recovery', 'glow', 'preventive']`
- Percentages: Primary 70–92%, Secondary 45–68% (formula: `base + (rawScore/10) * range`)

### Question Interaction Types

Each question has a custom visual interaction:

| Type | Component | Behavior |
|------|-----------|----------|
| `imageStage` | `ImageStageQuestion` | Cross-fade images, Q1 (destinations) |
| `weatherStage` | `WeatherStageQuestion` | Animated weather scenes, Q2 (skin weather) |
| `emotionStage` | `EmotionStageQuestion` | Emotion visuals, Q3, Q7 |
| `resourceMeter` | `ResourceMeterQuestion` | Resource/depletion gauge, Q4 |
| `mirrorFocus` | `MirrorFocusQuestion` | Mirror reflection UI, Q5 |
| `elementStage` | `ElementStageQuestion` | Life rhythm elements, Q6 (67KB motif) |
| `auraField` | `AuraFieldQuestion` | Aura cloud visualizations, Q9 |
| `ritualStage` | `RitualStageQuestion` | Ritual/self-care scenes, Q10 |

All use **double-tap confirmation** pattern:
1. **Tap 1** → Preview option (trigger animation)
2. **Tap 2** (same option) → Confirm & advance to next question
- Detection: `useDoubleTapSelection.ts` watches `event.timeStamp` within 460ms window

---

## Key Components & Patterns

### Custom Hooks

- **`useDoubleTapSelection()`** — Manages tap preview/confirm state
- **`useResultShareImage()`** — Generate shareable result images

### Zustand Store

```ts
useQuizStore()
  .setAnswer(questionId, optionId)    // Save answer
  .setLanguage('en' | 'zh')            // Toggle language
  .resetQuiz()                          // Clear all answers
```

### Visual Components

Most quiz questions use custom **Framer Motion motifs** in `src/app/quiz/components/visuals/`:

- **`ElementStageMotif.tsx`** (67KB) — Most complex; Q6 rhythm animation with wind/water/energy elements
- **`EmotionStageMotif.tsx`** — Emotional state visual
- **`RitualStageMotif.tsx`** — Self-care/ritual scenes
- **`*Scene.tsx`** files — Weather/landscape scenes (CloudyVeil, DryAutumn, HumidStorm, MorningSunrise)

All use deterministic motion (seeded randomness) to ensure consistent visual output.

### Result Page Components

`src/app/result/components/`:
- **`FeaturedAuraCard`** — Primary aura hero section with percentage
- **`AuraCompositionSection`** — Stats bars (energy, glow, stress, recovery)
- **`SkinAuraFamilySection`** — Visual tree of related aura profiles
- **`PersonalitySkinBlock`** — Description + skin needs
- **`SecondaryAuraCard`** — Secondary aura profile
- **`RitualCTASection`** — Product/ritual recommendations
- **`ResultActionRow`** — Share/reset buttons
- **`shareResultImage.ts`** — Canvas-based image generation for sharing

---

## Responsive Design

**Mobile-First Breakpoints:**
- Base (0px): Mobile optimal (375px viewport)
- `min-[390px]:` — Slightly larger phones
- `sm: (640px)` — Large phones/tablets
- `md: (768px)` — Tablets
- `lg: (1024px)` — Desktops

**Key Considerations:**
- Use `min-h-[100dvh]` instead of `h-screen` (avoids iOS Safari viewport jitter)
- Touch targets: minimum 44×44px (buttons typically 56–58px)
- Double-tap is the interaction pattern (single-click is preview only)

---

## Important Files to Know

| Path | Purpose |
|------|---------|
| `src/data/questions.json` | All 10 questions + options + aura mappings |
| `src/data/aura_profiles.json` | 8 aura profiles + descriptions + skin needs |
| `src/data/aura_moods.ts` | Gradient/visual themes per aura type |
| `src/store/useQuizStore.ts` | Global quiz state (Zustand) |
| `src/lib/quizLogic.ts` | Aura scoring & result calculation |
| `src/app/quiz/page.tsx` | Quiz flow controller |
| `src/app/result/page.tsx` | Result page controller |
| `next.config.ts` | React Compiler enabled; dev origin allowlist |

---

## Common Tasks

### Add a New Question

1. Add entry to `src/data/questions.json` with `id: "q11"`, interaction type, and 4 options with `auraMapping`
2. Create corresponding visual component in `src/app/quiz/components/visuals/` or reuse existing
3. Add interaction handler in `src/app/quiz/components/interactions/` if new type
4. Update `QuizQuestionRenderer.tsx` to import and route to the new type

### Change Aura Scoring Logic

Edit `src/lib/quizLogic.ts`:
- Modify the `priority` array to change tie-breaker order
- Adjust percentage formulas (currently Primary: 70–92%, Secondary: 45–68%)
- Add/remove aura types by updating the `auraScores` object

### Modify Visual Theme

- **Colors & gradients:** `src/data/aura_moods.ts` — Update gradient class names
- **Question-specific styling:** Edit individual question interaction components (`*Question.tsx`)
- **Tailwind v4 tokens:** Define in `src/app/globals.css` using `@theme` directive

---

## Bilingual Support

All UI strings are duplicated:
- Chinese (`text`, `questionText`, `description`)
- English (`textEn`, `questionTextEn`, `descriptionEn`)

Use `useQuizStore().language` to read current language and choose the right string.

---

## Performance Notes

- **React Compiler enabled** — Automatically optimizes renders; don't manually memoize unless needed
- **Framer Motion scenes** — Some are large (ElementStageMotif 67KB); use code-splitting or lazy load if adding more
- **Image assets** — Stored in `public/assets/quiz/` — ensure optimized formats (WebP, lazy loading)
- **Mobile animation performance** — Test with `prefers-reduced-motion` media query

---

## Deployment Notes

- **Dev origins allowlist** in `next.config.ts` permits ngrok/Cloudflare tunnels and local IPs for testing
- **Build output** goes to `.next/` — exclude from version control
- **API routes** not yet used; add in `src/app/api/` if needed
