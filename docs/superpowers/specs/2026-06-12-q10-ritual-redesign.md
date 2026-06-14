# Q10 Ritual Scenes Redesign — Spec & Implementation Plan

Date: 2026-06-12 · Status: approved in chat · Owner: Tech Lead (Claude) + 4 scene builder agents + QA reviewer

## 1. Goal

Rebuild Q10's (`ritualStage`) central visual to the quality bar of Q2 (MorningSunriseScene) and Q7 (underwater pearl in EmotionStageMotif). The current `RitualStageMotif.tsx` reads amateurish: abstract rounded-rect "furniture", a thick white squiggle (`LensAtmosphere`) repeated across every scene, flat pastel fills, no light source, no depth, no hero moment.

Theme: 「一日四個時刻」 — four serene, depopulated ritual moments sharing one visual family.

## 2. Shared visual system (binding for every scene)

- **One light source**: dawn gold from the **upper-left**. Every highlight, rim light, shadow direction obeys it.
- **Base palette**: ivory `#faf6ee`, stone `#e9e2d4`, greige `#cfc5b2`, warm shadow `#6b6358`, dawn gold `#f3e3c0`/`#fbf2dd`. Each scene owns exactly ONE accent:
  - A sleep: plum `#8d7a96` · B spa: amber `#c9a070` · C nature: sage `#7d9b82` · D facial: blush `#d9a8ad`
- **Composition**: rendered in a 400×400 viewBox, displayed inside a CIRCLE crop (center 200,200, visible radius ≈190). Max 4–5 distinct subjects, generous negative space, **no people, no faces, no icons/glyphs (no Zzz, no lotus clip-art)**.
- **Depth**: ≥3 layers (background atmosphere / midground focal subject / foreground accents) with different drift amplitudes; distant layers lighter + lower contrast.
- **Texture**: shared `GrainOverlay` (feTurbulence fractal noise, ~4.5% opacity, static) on every scene.
- **Loop grammar**: continuous micro-drift + a 4–6s breath-tempo pulse + ONE hero event per ~6–9s cycle. All durations/delays desynced (no two elements share duration+delay). Ambient loops `easeInOut`, never <2s.
- **Entrance**: choreographed stagger background → focal → accents, completed within ~700ms, ease-out curves (e.g. `[0.22, 1, 0.36, 1]`).
- **Confirm payoff** (`isConfirming`): one-shot brightening/bloom, 0.5–0.65s, scene-specific (see briefs). Question wrapper already flashes a white radial overlay on top.
- **Determinism**: no `Math.random` — constants or `seededNumber` from `../deterministicMotion`.
- **Performance**: animate transform/opacity/`d`-keyframes only; no filter-attribute animation; blur via shared `<filter>` defs; respect `reduceMotion` prop (freeze loops, keep static composition readable).
- **IDs**: every gradient/filter/clip id namespaced `q10x-<scene>-<name>-${uid}` with `useId()`.

## 3. File structure & contracts

```
src/app/quiz/components/visuals/
  RitualStageMotif.tsx          ← orchestrator only (AnimatePresence routing, blur crossfade)
  ritual/
    ritualShared.tsx            ← RitualSceneProps, palette RITUAL, loop(), GrainOverlay, ConfirmBloom, DustMote
    RitualIdleScene.tsx         ← idle (Tech Lead)
    RitualSleepScene.tsx        ← A (Agent: Team Sleep)
    RitualSpaScene.tsx          ← B (Agent: Team Spa)
    RitualNatureScene.tsx       ← C (Agent: Team Nature)
    RitualFacialScene.tsx       ← D (Agent: Team Facial)
```

Scene contract: `export default function RitualXScene({ isConfirming, reduceMotion }: RitualSceneProps)` returning one `<svg viewBox="0 0 400 400" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`. Self-contained defs. No cross-scene imports besides `ritualShared` and `../deterministicMotion`.

External contract unchanged: `RitualStageMotif({ questionId, previewId, isConfirming })` consumed by `RitualStageQuestion.tsx`.

## 4. Scene briefs

### Idle — 空白儀式空間 (Tech Lead)
Quiet empty stage: ivory→stone field, soft diagonal dawn beam from upper-left (blurred, breathing 0.10→0.20), faint floor band lower third, center halo breathing 5.5s, 5 dust motes drifting in the beam, grain. Nothing else — it is "waiting".

### A — 好好補眠「晨光透紗簾」(Dawn Through Linen)
Low horizontal bedroom abstraction. Tall window band on the left (≈x 52–128) glowing peach→lavender dawn; sheer curtain veil edge swaying (d-morph, ~7s); a blurred light shaft slanting from window across the frame with 6–8 dust motes; duvet = 3 overlapping dune-like mounds across the lower half (oat/ivory gradients, soft plum fold shadows between).
**Hero**: the middle duvet mound breathes — a slow ~6s d-morph rise/fall that reads as a sleeping body without showing one.
**Confirm**: dawn brightens — window + shaft bloom, warm gold wash, the duvet rises once gently.

### B — 去按摩／Spa「石與蒸氣」(Stone & Steam)
Zen still-life. Shallow water plane across the lower third (cool grey-green, faint stone reflection); 3 stacked basalt stones center (charcoal-taupe radial gradients, distinct sizes, upper-left ivory rim light); 2 steam ribbons rising and dissolving (d-morph + opacity, desynced); warm candle glow bleeding in from the right edge (off-screen radial, slow flicker); one tiny white petal floating on the water.
**Hero**: concentric ripple rings expanding from near the stones every ~4s (stroke circles r 10→60 fading), a second desynced ring elsewhere.
**Confirm**: ripple burst + candle glow flare + steam swell.

### C — 去大自然「仰望樹冠」(Light Through Canopy)
Looking straight up. 5–7 large leaf forms (2–3 silhouette shapes, sage→fern gradients) clustered into the frame from the edges (dense upper-left, sparse lower-right); center negative space = pale sky; two diagonal god-ray bands crossing the opening (blurred white-gold gradients); pollen motes drifting upward through the rays.
**Hero**: the god-rays slowly alternate/cross-fade as if the canopy shifts (~8s).
**Confirm**: rays flare, leaves ease slightly outward once, sky brightens.
Must NOT resemble Q2's hills-horizon sunrise (different perspective entirely).

### D — 做 Facial＋Reset「乳霜綻放」(Cream Bloom)
Macro shot. Blush-stone field; centered cream swirl like a freshly-opened jar — 2–3 nested soft spiral forms (ivory radial gradients), barely rotating (≤2°/s equivalent, slow drift); soft radial glow pulsing beneath; one droplet falls off-center → tiny ripple ring (~8s cycle).
**Hero**: a pearlescent highlight band sweeping across the swirl every ~8s.
**Confirm**: full pearlescent sweep + glow bloom + the swirl settles with a tiny spring rotation.

## 5. Team plan

1. **Tech Lead (main session)**: this spec → `ritualShared.tsx` + 4 stub scenes + `RitualIdleScene` + orchestrator rewrite → tsc green → dispatch teams.
2. **4 builder agents in parallel** (high-accuracy model): each overwrites its stub. Each must read this spec, `ritualShared.tsx`, and the Q7 scene in `EmotionStageMotif.tsx` (quality bar + idiom) before coding, then self-verify: `npx tsc --noEmit` (own-file errors only) + `npx eslint <own file>`.
3. **QA**: Tech Lead integration pass (tsc, lint, spec-adherence read-through) → code-reviewer agent → fixes.
4. **No browser verification** in this cycle — user reviews manually afterwards.

## 6. Acceptance criteria

- tsc + eslint clean; prop contract unchanged; old `LensAtmosphere` squiggles gone.
- Each scene: recognizable subject in <1s, one hero motion, layered depth, single light source, grain present, confirm payoff, reduced-motion safe, deterministic.
- Family coherence: shared base palette + one accent each; breath-tempo rhythm everywhere.
