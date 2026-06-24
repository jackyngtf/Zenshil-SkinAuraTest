# v2 Result Page Redesign Specification
**Date:** 2026-06-24  
**Goal:** Make result page feel **真係好準好啱** by mirroring user's own 10 answers + fixing fake-data landmine  
**Token Strategy:** Spec-first, subagent-driven implementation

---

## Decision Summary

**Rarity %:** Compute from answers, show as short `純度 X%` pill (computed, real, per-person)  
→ Replaces current hardcoded `吻合度 76%`  
→ Formula: `Math.floor((primaryRawScore / 10) * 100)` where primaryRawScore = frequency count from 10 answers

---

## Part 1: Infrastructure — calculateResult() Return Shape

### File: `src/lib/quizLogic.ts`

**Current state** (line ~46-48): Computes `primaryRawScore` and `secondaryRawScore` but throws them away.

**Change required:**

```ts
export interface CalculatedResult {
  primaryAura: string;
  primaryPercentage: number;
  primaryRawScore: number;  // ← NEW: expose the 10-answer frequency count (0–10)
  secondaryAura: string;
  secondaryPercentage: number;
  secondaryRawScore: number;  // ← NEW: expose secondary frequency count
  calculatedStats: any;
}
```

**Rationale:** `primaryRawScore` is computed but discarded. We need it so result page can display truthful **purity % = (primaryRawScore / 10) × 100**, e.g., 7/10 → `70%`.

---

## Part 2: Result Page UI — Thread primaryRawScore

### File: `src/app/result/page.tsx` (line ~25, calculateResult() call)

**Current:**
```ts
const result = calculateResult(answers);
```

**After change:** 
Same call, but now `result.primaryRawScore` is available. Thread through to components.

### File: `src/app/result/components/FeaturedAuraCard.tsx`

**Current:** Displays `primaryPercentage` from result (76%, 82%, etc.)  
**Change:** Replace with **purity % pill** derived from `primaryRawScore`:
- Receive `primaryRawScore: number` as prop
- Compute: `purityPercent = Math.floor((primaryRawScore / 10) * 100)`
- Display as short pill: **「純度 {purityPercent}%」** (before or after the aura name, TBD on layout)
- English: **「Purity {purityPercent}%」**

**Why:** Shows how concentrated the user's signal is (7 out of 10 answers pointed to this aura = 70% purity).

---

## Part 3: Data Layer — Per-Aura Extensions

### File: `src/data/resultData.ts`

Add these new fields to the **`auraIdentityProfiles` object** (currently has `shortLineZh`, `shortLine`, `demographics`, etc.):

#### For Each of 8 Auras:

**Field 1: Couplet Variants** (2–3 options, selected by secondary aura)
```ts
shortLineVariants: {
  zh: string[],    // 2–3 options
  en: string[],
},
```
**Selection logic:** If `secondaryAura === 'X'`, pick variant index 1; else 0. (TBD: refine on context.)

**Field 2: Lucky Fruit/Drink** (1 per aura, goes into Skin Note or a dedicated pill)
```ts
luckyFruit: {
  zh: string,      // e.g., "藍莓"
  en: string,      // e.g., "Blueberry"
},
luckyDrink: {      // Optional; if omitted, only fruit shows
  zh: string,
  en: string,
},
```

---

## Part 4: Per-Aura Content (8 Auras × 2 Languages)

Below is the authored content for all 8 auras. **Implement as per Part 3 structure in `resultData.ts`.**

> **Couplet Variants:** Lead with the main idea in "not X, just Y" shape. Variants differ by secondary aura to avoid every share looking 1-of-8.

### 1. **overworked** (QUIET RECHARGE)

**Couplet Variants:**
- **Variant 0 (default):**
  - 🇭🇰 「你唔係弱，只係用得太盡」
  - 🇬🇧 "Not exhausted—just running on empty."

- **Variant 1 (if secondary = stress):**
  - 🇭🇰 「你唔係滯緩，只係需要停下來」
  - 🇬🇧 "Not stalled—just needing to pause."

- **Variant 2 (if secondary = late_night):**
  - 🇭🇰 「你唔係疲勞，只係缺睡眠」
  - 🇬🇧 "Not tired—just lacking rest."

**Lucky Fruit:** 桂圓 (Longan) / Dragon's Eye  
**Lucky Drink:** 紅棗茶 (Red Date Tea) / Jujube Tea

---

### 2. **stress** (HIGH SENSITIVITY OPERATOR)

**Couplet Variants:**
- **Variant 0 (default):**
  - 🇭🇰 「你唔係脆弱，只係感受得太深」
  - 🇬🇧 "Not fragile—just feeling deeply."

- **Variant 1 (if secondary = overworked):**
  - 🇭🇰 「你唔係焦慮，只係太敏銳」
  - 🇬🇧 "Not anxious—just too perceptive."

- **Variant 2 (if secondary = burnout):**
  - 🇭🇰 「你唔係崩潰，只係訊號太強」
  - 🇬🇧 "Not breaking—just overwhelmed."

**Lucky Fruit:** 藍莓 (Blueberry) / Blueberry  
**Lucky Drink:** 洋甘菊茶 (Chamomile Tea) / Chamomile Tea

---

### 3. **hidden_aging** (STRUCTURED LIVING)

**Couplet Variants:**
- **Variant 0 (default):**
  - 🇭🇰 「你唔係衰老，只係需要佈局」
  - 🇬🇧 "Not aging—just need a strategy."

- **Variant 1 (if secondary = preventive):**
  - 🇭🇰 「你唔係遲鈍，只係要持之以恆」
  - 🇬🇧 "Not slow—just need consistency."

- **Variant 2 (if secondary = glow):**
  - 🇭🇰 「你唔係問題，只係要對症下藥」
  - 🇬🇧 "Not troubled—just need the right fix."

**Lucky Fruit:** 黑葡萄 (Black Grapes) / Purple Grapes  
**Lucky Drink:** 黑茶 (Dark Tea) / Pu-erh Tea

---

### 4. **recovery** (RECOVERY MODE)

**Couplet Variants:**
- **Variant 0 (default):**
  - 🇭🇰 「你唔係受傷，只係需要修復」
  - 🇬🇧 "Not broken—just healing."

- **Variant 1 (if secondary = stress):**
  - 🇭🇰 「你唔係軟弱，只係在復原」
  - 🇬🇧 "Not weak—just recovering."

- **Variant 2 (if secondary = hidden_aging):**
  - 🇭🇰 「你唔係問題肌，只係要耐心修」
  - 🇬🇧 "Not damaged—just need time."

**Lucky Fruit:** 木瓜 (Papaya) / Papaya  
**Lucky Drink:** 蜂蜜檸檬水 (Honey Lemon Water) / Honey Lemon Water

---

### 5. **preventive** (BALANCE BUILDER)

**Couplet Variants:**
- **Variant 0 (default):**
  - 🇭🇰 「你唔係乏味，只係在預防」
  - 🇬🇧 "Not boring—just building resilience."

- **Variant 1 (if secondary = glow):**
  - 🇭🇰 「你唔係被動，只係要穩定發光」
  - 🇬🇧 "Not passive—just maintaining glow."

- **Variant 2 (if secondary = recovery):**
  - 🇭🇰 「你唔係保守，只係要穩妥地保護」
  - 🇬🇧 "Not cautious—just protecting what you've built."

**Lucky Fruit:** 蘋果 (Apple) / Apple  
**Lucky Drink:** 綠茶 (Green Tea) / Green Tea

---

### 6. **glow** (GLOW EXPLORER)

**Couplet Variants:**
- **Variant 0 (default):**
  - 🇭🇰 「你唔係炫耀，只係在發光」
  - 🇬🇧 "Not showing off—just glowing naturally."

- **Variant 1 (if secondary = preventive):**
  - 🇭🇰 「你唔係眩目，只係在閃耀」
  - 🇬🇧 "Not dazzling—just radiant."

- **Variant 2 (if secondary = hidden_aging):**
  - 🇭🇰 「你唔係稍縱即逝，只係需要鎖定發光」
  - 🇬🇧 "Not fleeting—just need to lock in the glow."

**Lucky Fruit:** 火龍果 (Dragon Fruit) / Dragon Fruit  
**Lucky Drink:** 玫瑰花茶 (Rose Tea) / Rose Tea

---

### 7. **burnout** (BURNOUT ARCHETYPE)

**Couplet Variants:**
- **Variant 0 (default):**
  - 🇭🇰 「你唔係失敗，只係燃燒得太猛」
  - 🇬🇧 "Not failing—just burning too bright."

- **Variant 1 (if secondary = stress):**
  - 🇭🇰 「你唔係無能，只係需要滅火」
  - 🇬🇧 "Not incapable—just need to cool down."

- **Variant 2 (if secondary = late_night):**
  - 🇭🇰 「你唔係困頓，只係燒乾淨咗」
  - 🇬🇧 "Not stuck—just empty."

**Lucky Fruit:** 紅棗 (Red Dates/Jujubes) / Red Dates  
**Lucky Drink:** 紅糖薑茶 (Brown Sugar Ginger Tea) / Ginger Honey Tea

---

### 8. **late_night** (NIGHT OWL ARCHETYPE)

**Couplet Variants:**
- **Variant 0 (default):**
  - 🇭🇰 「你唔係夜貓，只係走反晝夜」
  - 🇬🇧 "Not nocturnal—just on the wrong schedule."

- **Variant 1 (if secondary = overworked):**
  - 🇭🇰 「你唔係懶惰，只係被迫熬夜」
  - 🇬🇧 "Not lazy—just sleep-deprived."

- **Variant 2 (if secondary = glow):**
  - 🇭🇰 「你唔係困身，只係夜間發光」
  - 🇬🇧 "Not stuck—just shine at night."

**Lucky Fruit:** 奇異果 (Kiwi) / Kiwi  
**Lucky Drink:** 牛奶 (Milk) / Warm Milk

---

## Part 5: Implementation Checklist (Quick Wins)

These are deliverables for the subagent to execute in order:

### **Phase 1: Infrastructure** (Code changes)

- [ ] **quizLogic.ts:** Add `primaryRawScore` and `secondaryRawScore` to return object
- [ ] **result/page.tsx:** Thread `primaryRawScore` to `FeaturedAuraCard` and any other consumers
- [ ] **resultData.ts:** Expand `auraIdentityProfiles` for all 8 auras with:
  - `shortLineVariants` (2–3 couplets per aura, zh/en)
  - `luckyFruit` (zh/en)
  - `luckyDrink` (zh/en, optional)
- [ ] **FeaturedAuraCard.tsx:** Compute `purityPercent = Math.floor((primaryRawScore / 10) * 100)` and render as new pill replacing `primaryPercentage`

### **Phase 2: Quick Wins** (Presentation/content only)

- [ ] **Skin Note opening:** Use user's Q3 answer verbatim ("你話我會講『頂唔順』…") to anchor absolution beat
- [ ] **Evidence strip:** Under hero couplet, show 2–3 option labels from `answers` where `auraMapping === primaryAura` (the "How we read you / 我哋點睇出嚟" line)
- [ ] **Lucky fruit display:** Add a dedicated chip/pill in Skin Note or secondary section showing lucky fruit + drink
- [ ] **Share caption fix** (`useResultShareImage.ts` line 55–58):
  - Change from: `"My Skin Aura is ${aura.name}."`
  - Change to: `"我嘅肌膚性格係…？你嘅肌膚係咩角色 👉 [URL]"` (question form, always attach URL with `?ref=share` param)

### **Phase 3: Canvas Redesign** (If time permits, defer if token-tight)

- [ ] **shareResultImage.ts:** Reorder `drawShareCard()` output:
  - Lead with couplet (not title) at top
  - Orb in middle (keep existing `drawShareAuraLens()`)
  - Pills (AURA NO., Aura Core) at bottom
  - (Or use couplet variant selected by secondary aura)

---

## Part 6: Key Invariants (Do NOT Break)

✅ **Premium editorial:** Serif fonts, cream bg, glowing orb — keep aesthetic intact  
✅ **Bilingual parity:** All new text must have Cantonese (`zh`) and English (`en`) variants  
✅ **Data centralization:** All 8 aura extensions live **only** in `resultData.ts`, not scattered across components  
✅ **Scoring untouched:** `calculateResult()` logic (curves, tiebreaker) stays the same; only return shape changes  
✅ **Lock gate:** `completedAt` remains the authoritative gate; don't touch  
✅ **Accessibility:** Keep `prefers-reduced-motion` support  

---

## Part 7: Testing Checklist

Before sign-off:

- [ ] Generate result for all 8 aura types, verify `purityPercent` computes correctly (e.g., primaryRawScore=7 → 70%)
- [ ] Verify couplet variants differ when secondary aura changes (share 2 results with different secondaries, compare quotes)
- [ ] Test bilingual toggle (`language` store) — all new text flips between zh/en
- [ ] Confirm share flow: caption includes URL, fruit/drink displays in Skin Note
- [ ] Check accessibility: ARIA labels on new pills, motion respects prefers-reduced-motion
- [ ] Verify no console errors; tsc/eslint pass

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/quizLogic.ts` | Return `primaryRawScore`, `secondaryRawScore` |
| `src/app/result/page.tsx` | Thread `primaryRawScore` to components |
| `src/data/resultData.ts` | Add couplet variants, fruit, drink for all 8 auras |
| `src/app/result/components/FeaturedAuraCard.tsx` | Compute + render purity %, replace percentage pill |
| `src/app/result/components/SkinNoteOpener.tsx` | (if exists) Use Q3 answer in opening line |
| `src/app/result/components/PersonalitySkinBlock.tsx` | Add evidence strip ("How we read you") |
| `src/app/result/components/useResultShareImage.ts` | Question-form caption, always attach URL |
| `src/app/result/components/shareResultImage.ts` | (Phase 3) Reorder canvas output if time permits |

---

## Context for Subagent

- **Quiz scoring:** `calculateResult()` counts how many times each of 8 auras is selected across 10 answers, picks top 2, applies tie-breaker
- **Store shape:** `useQuizStore()` holds `answers: Record<qId, optionId>`, `language: 'zh'|'en'`, `completedAt`
- **Data single source:** `resultData.ts` is the ONLY place to add per-aura metadata; no hardcoding in components
- **Bilingual:** Always provide both `zh` (Cantonese) and `en` (English) variants; test both via language toggle
- **Share flow exists:** `useResultShareImage()` → `createResultShareImage()` (canvas) → `navigator.share()`. Don't reinvent; just connect pieces and modify copy.

---

**Next step:** Subagent opens this spec and executes phases 1 → 2 → 3 (if token permits).
