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

/result (Results Page — v2 layout, lock-gated, see Data Flow)
  └─ Personalized aura profile, built from calculateResult(answers)
     ├─ ResultV2Hero (animated orb, aura No., truth match%, couplet)
     ├─ SocietySlide + IdentitySlide (horizontal carousel)
     ├─ SkinMessageCard (Q3 answer echo + skin advice)
     ├─ JourneyCard (3-step treatment journey)
     ├─ SupportingSignal (secondary aura) → links to /family
     ├─ BookingCta (WhatsApp booking)
     ├─ ResultActionRow (share/save image, retake)
     └─ BrandFooter

/result-v1 (Legacy Results Page — old FeaturedAuraCard layout, accessible)
  └─ The previous result layout, preserved for reference/rollback.
     Shared components (ResultActionRow, AuraCarousel, BrandFooter,
     ResultAuraOrb, shareResultImage) live in result-v1/components/.
```

### Data Flow

1. **Landing** → User clicks "Start Analysis"
2. **Quiz** → User answers Q1-Q10, store answers in Zustand
3. **Quiz → Result** → After Q10 confirmed, `markCompleted()` sets `completedAt` BEFORE the 3.6s analysis animation, then navigates to `/result`. Setting the lock early means a refresh during the animation still lands the user on their result.
4. **Result** → `calculateResult()` reads all 10 answers, scores 8 aura types by frequency, picks primary/secondary

**Lock-to-result:** Once `completedAt` is set (persisted), both `/` and `/quiz` bounce the user to `/result`. The only way back is an explicit retake (`resetQuiz()`), which clears `completedAt`. The result page treats `completedAt !== null` (not `answers`) as the authoritative "has a result" gate — `answers` alone is too loose (a half-finished quiz would otherwise render an empty result).

**State Management:** `src/store/useQuizStore.ts` (Zustand + `persist` middleware → localStorage key `zenshil-quiz`)
- `answers: Record<string, string>` — Map of question ID → selected option ID
- `language: 'zh' | 'en'` — Current language
- `completedAt: number | null` — Non-null once the quiz is finished; the lock-to-result gate
- `resetQuiz()` — Clear answers/progress/completion when restarting
- Persisted (via `partialize`): only `answers`, `language`, `completedAt` — transient quiz progress (`currentQuestionIndex`, `totalQuestions`) is not persisted. Bump `STATE_VERSION` when quiz structure/scoring changes to invalidate stored results.

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
| `glow` | GLOW EXPLORER | Glowing energy |
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
| `imageStage` | `ImageStageQuestion` | Cross-fade photos, Q1 (destinations) |
| `weatherStage` | `WeatherStageQuestion` | Animated weather scenes in a circular orb, Q2 (skin weather) & Q8 (stress triggers) |
| `emotionStage` | `EmotionStageQuestion` | Q3 full-screen mood blobs + `SkinVoiceMembrane`; Q7 shell-on-the-seabed scene via `ShellConcernStage` |
| `resourceMeter` | `ResourceMeterQuestion` | Q4 circular-orb room scenes: bedroom (Sleep), relax room + vinyl (Relax), study + hourglass (Time), gym (Energy) — dispatched by `ResourceMeterVisual` |
| `mirrorFocus` | `MirrorFocusQuestion` | Static mirror-room photo, Q5 (focus area tints only) |
| `elementStage` | `ElementStageQuestion` | Life rhythm elements in a circular orb, Q6 |
| `auraField` | `AuraFieldQuestion` | Aura cloud visualizations in a circular orb, Q9 |
| `ritualStage` | `RitualStageQuestion` | Ritual/self-care scenes, Q10 (sleep/spa/nature/facial) |

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

`src/app/result-v1/components/` (shared by /result v2, /result-v1, /family):
- **`FeaturedAuraCard`** — Primary aura hero with animated `ResultAuraOrb` + percentage
- **`SkinAuraFamilySection`** — The 4 families + member auras, the user's highlighted (carousel slide)
- **`PersonalitySkinBlock`** — Insight points + skin-needs chip cloud (carousel slide)
- **`AuraCarousel`** — Native CSS scroll-snap wrapper for the family + personality slides
- **`SecondaryAuraCard`** — Secondary "supporting tendency" aura
- **`RitualCTASection`** — Ritual/booking CTA (WhatsApp link via `resultLinks.ts`)
- **`ResultActionRow`** — Share/save image + retake (with confirm dialog)
- **`BrandFooter`** — Wordmark + tagline
- **`useResultShareImage` / `shareResultImage.ts`** — Canvas-based 1080×1920 share image generation

> `AuraCompositionSection.tsx` exists but is **not used** — it was removed from the result page and is effectively dead code. Do not assume it renders unless re-wired.
>
> `resultData.ts` is the **single source** for presentation data: aura numbers, orb colors, editorial "lens" palettes, the 4 families, identity profiles, insight points, stat labels, and the universal "Barrier Support" need rule (`withUniversalNeeds` / `getNeedLabel`). Read from here instead of hardcoding.

---

## Internal Preview Routes (not linked, safe to delete)

`src/app/` contains standalone dev/preview harnesses for eyeballing visuals in isolation. They are **not reachable from the app** and can be removed without breaking anything:

| Route | Purpose |
|------|---------|
| `/q4-preview` | All 4 Q4 room scenes stacked vertically, with a confirm-surge toggle |
| `/q7-preview` | All 5 Q7 shell states (idle + A–D) in their circular-orb clip, with a confirm toggle |
| `/family` | User-facing: all 4 families x 8 auras with real ResultAuraOrb, identity depth, user-highlight badges |
| `/result-preview` | Internal: all 8 share-images (1080x1920) via `createResultShareImage`, each forced by a verified answer key; EN/ZH switch |
| `/result-v1` | Legacy result layout (old FeaturedAuraCard). Kept for reference/rollback. |

> `tmp/` holds design-review screenshots for the v2 result exploration. It is scratch space, not shipped.

### Dead / superseded code

- **`q07/ClosedShellScene.tsx`** — an earlier idle-only shell concept, superseded by the live `ShellConcernStage.tsx`. Never imported; remove when convenient.
- **`AuraCompositionSection.tsx`** — see note above; removed from the result page.
- **`ElementStageQuestion.tsx`** still carries a guarded `Q4ResourceMeter` branch, but Q4 routing goes through `ResourceMeterQuestion`/`ResourceMeterVisual` instead — that branch is unreachable.

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
| `src/app/result/components/resultData.ts` | Per-aura presentation data (orb colors, lens palettes, families, identity, insights, labels) |
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

- **Colors & gradients:** `src/app/result/components/resultData.ts` — per-aura orb colors / lens palettes (result page); `src/data/aura_moods.ts` does not exist
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
