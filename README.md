# Zenshil — Skin Aura Test

An interactive **skin-personality quiz web app** for the Zenshil skincare brand. Users answer a series of image-driven lifestyle questions and receive a personalized "skin aura" result with tailored product recommendations.

> Client project — designed and built end-to-end, from product brief to deployable app.

## The Problem

The brand needed an engaging, shareable way to connect potential customers to the right skincare products — not a static product page, but something interactive that captures attention and segments users by their lifestyle/personality profile.

## The Solution

A visually-led quiz experience: each question is presented with four evocative image options (coastal wellness, hillside cafe, hotel staycation…). The user's path through the questions maps to a **skin aura archetype**, which drives a personalized result page with curated product picks and a shareable card.

## How It Works

- **Quiz flow** — image-driven multiple-choice questions, state managed with Zustand
- **Scoring & archetype mapping** — answers route to a result archetype that personalizes the outcome
- **Result page** — curated content system (copy + product recommendations) keyed off the archetype
- **Motion design** — Framer Motion transitions between questions for a premium feel
- **Documentation-driven build** — see `docs/` for the full spec chain (product brief → UI/UX flow → quiz logic → data model → asset brief → MVP backlog)

## Tech Stack

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS v4` · `Framer Motion` · `Zustand` · `lucide-react`

## Documentation

The `docs/` folder contains the complete product spec chain — a notable aspect of this project is that the build was specification-first:

- `01_CEO_Product_Confirmation_Brief.md` — product direction
- `02_UIUX_Flow_Board_Spec.md` — screens & flow
- `04_Quiz_Logic_and_Data_Model.md` — scoring logic
- `07_MVP_Backlog.md` — build breakdown

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
