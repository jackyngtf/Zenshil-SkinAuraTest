# Skin Aura Test Q4-Q10 Multi-Agent UX Workshop

## 1. Executive Summary

Q1-Q3 already establish the product grammar: cinematic lifestyle entry, abstract skin-condition stage, and emotional skin dialogue. Q4-Q10 should not become seven copies of those patterns. They should feel like different consultation chapters inside one Zenshil ritual.

Recommended direction:

- Q4: Skin Resource Meter. A calm reservoir showing what the user lacks.
- Q5: Mirror Focus Scan. A premium mirror/lens interaction for what the user checks.
- Q6: Rhythm Trace Selector. A pace signal showing life rhythm.
- Q7: Skin Texture Concern Picker. Tactile skin-material swatches for desired improvement.
- Q8: Trigger Map. A central skin core affected by lifestyle trigger nodes.
- Q9: Goal Spectrum Lens. Aspirational skin-state light spectrum.
- Q10: Ritual Path. A closing treatment-day ritual selector.

MVP should implement one question at a time after Q1-Q3 are frozen. Use SVG/CSS/Framer Motion first. Only Q10 should be considered for optional generated imagery later; all others can work well with SVG/CSS.

## 2. Current Q1-Q3 Pattern Summary

| Question | Current pattern | Role in quiz | Preserve | Do not repeat too often | Rules established |
|---|---|---|---|---|---|
| Q1 | Full-screen lifestyle image scene with compact choices | Cinematic opening, establishes premium lifestyle mood | Large atmospheric scene, soft image fade, compact options, double-tap ritual | Full-screen generated images for every question; asset-heavy and slower | Mobile-first full-screen shell, compact bottom controls, calm image atmosphere |
| Q2 | Skin Weather Stage with central animated visual | First diagnostic metaphor: skin condition as weather | Central hero visual, abstract skin-weather mood, all options visible | Weather/cloud/sun literal icons; repeated circular orb stage | Central stage can change state while controls stay consistent |
| Q3 | Skin Dialogue / Skin Speaking Face | Emotional connection, makes skin feel understood | Quote reveal, soft membrane, voice/signal motion | Repeating speech/quote cards later would feel gimmicky | Emotional visual can still share header, spacing, option language |

## 3. Shared UI/UX System Extracted from Q1-Q3

- Shell: fixed Zenshil header, progress number, language toggle, back arrow, slim progress line.
- Base surface: pearl ivory / warm white / mist lavender, with subtle noise and aura haze.
- Typography: elegant serif for questions and answer text, clean sans for labels and hints.
- Controls: compact, rounded, softly translucent, thin border, small option badge, small color dot.
- Interaction: tap to preview, second tap to confirm, no separate confirm button.
- Motion: slow crossfade, gentle breathing, subtle ripple, no bounce or aggressive spring.
- Visual hierarchy: question at top, visual hero in middle, controls at bottom.
- Brand tone: high-end consultation, not quiz game, not dashboard, not cartoon.

## 4. Agent Roles & Key Opinions

### Product Lead

The first three questions are already expressive. Q4-Q10 must reduce fatigue by making more answers visible at once and keeping most decisions under 5-7 seconds. Q4, Q8, Q9, and Q10 can be more memorable. Q5, Q6, and Q7 should be faster diagnostic chapters.

Critique: if every remaining question gets a large custom stage with slow animation, completion rate may drop. The product should alternate between immersive and efficient.

### Brand / Art Director

Every question needs one premium metaphor, not random decoration. Avoid tourist Hong Kong visuals. The Hong Kong connection should be lifestyle, clinic, urban wellness, Central rhythm, and refined self-care. Keep pearl backgrounds, glass membranes, soft aura fields, and small editorial details.

Critique: current abstract SVGs can become too technical or screensaver-like. Each visual must answer the question emotionally.

### UX Interaction Designer

Most Q4-Q10 questions should show all options at once. The user should preview by tapping, then confirm with the same double-tap language used earlier. For diagnosis questions, option controls should be fast and readable. For aspirational or ritual questions, the visual can be richer.

Critique: avoid adding sliders or drag gestures unless the meaning is obvious. Swipe should not return after Q1 unless the content truly needs scene browsing.

### Motion Designer

Motion should express skin state: depletion, release, rhythm, sensitivity, clarity. Use breathing, drift, shimmer, pulse, and soft signal transfer. Avoid bouncy transforms, loud particles, fast flashing, and audio-visualizer cliches.

Critique: motion that merely moves because it can move weakens the clinic-grade feeling.

### Frontend Architect

Use SVG/CSS/Framer Motion for Q4-Q9. Do not introduce canvas or heavy 3D. Reuse a shared option control, aura backdrop, and stage frame. Unique visuals should be small focused components, not entirely new page systems.

Critique: over-abstracting all questions into one mega-component will make art direction harder. Use shared primitives, not one universal renderer.

### QA / Usability Reviewer

Primary risks are 13 mini width, Traditional Chinese wrapping, slow double-tap recognition, and animation overload. Every answer must remain readable in one line where possible. Selected states should be obvious without relying only on color.

Critique: if a question has a beautiful visual but the answer buttons feel inconsistent, users will feel they are jumping between apps.

## 5. Interaction Pattern Library for Q4-Q10

| Pattern | What it is | Best question type | Visual feeling | User effort | Complexity | Assets | Consistency method | Risk |
|---|---|---|---|---|---|---|---|---|
| Skin Resource Meter | Glass reservoir with changing inner resource level | Lack / depletion | Clinic-grade skin energy chamber | Low | Medium | SVG/CSS | Same central stage + compact choices | Could feel too abstract if labels unclear |
| Mirror Focus Scan | Soft mirror/face lens with highlighted focus zones | Mirror behavior / self-check | Premium diagnostic mirror | Low | Medium | SVG/CSS | Same shell, same option style | Face shapes can become too literal |
| Texture Sample Picker | Four skin-material swatches or one central texture panel | Skin concern / desired improvement | Editorial skincare texture | Low | Medium | SVG/CSS | Compact controls, soft palette | Swatches may look like product catalogue |
| Rhythm Trace Selector | Animated line/signal changes tempo and density | Lifestyle pace | Calm biometric rhythm | Low | Medium | SVG/CSS/Framer | Same stage language | Can become audio-player-like |
| Trigger Map | Central skin core with four trigger nodes around it | Cause / trigger question | Consultation diagnostic map | Medium | Medium | SVG/CSS | Same option badges, muted nodes | Radial layouts can feel game-like |
| Goal Spectrum Lens | Vertical or horizontal skin-goal light spectrum | Ideal state / aspiration | Luminous treatment-result mood | Low | Medium | SVG/CSS | Same ivory base and soft controls | Could be too generic gradient if underdesigned |
| Ritual Path | Four self-care ritual routes or sanctuaries | Final action / lifestyle ritual | Editorial closing chapter | Medium | Medium-High | SVG/CSS; optional images | Same controls; richer closing mood | Image assets may slow production |
| Compact Consultation Tiles | Small premium cards with micro-motifs | Fast diagnostic choices | Efficient clinic intake | Low | Low | CSS/SVG | Directly reuses option system | Visually boring if overused |
| Facial Mapping Zones | Abstract face oval with zone overlays | Eye/contour/pores/puffiness | Medical beauty diagnostic but soft | Medium | Medium | SVG | Shared stage frame | Too medical if too anatomical |
| Breathing Capsule Choices | Capsules that breathe at different rates | Rest/energy/emotion states | Minimal wellness | Low | Low | CSS | Shared controls | Too similar across questions |
| Before/After Light Reveal | Selected option reveals a clearer light layer | Improvement / goal | Premium transformation | Medium | Medium | SVG/CSS | Same visual hero | Before/after may overpromise results |
| Mood Constellation | Soft nodes representing emotional triggers | Emotion / pressure | Poetic aura map | Medium | Medium | SVG | Same color tokens | Can feel astrology-like if overdone |

## 6. Question-by-Question Presentation Plan

| Question ID | Question purpose | Recommended presentation style | Why this fits | What user sees | What user does | Option layout | Animation idea | Asset type | Dev complexity | User effort | Shared UI/UX inherited | Unique quality | Risk | Final recommendation |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Q4 | Identify missing personal resource | Skin Resource Meter | The answers are resources, not places or emotions | Glass reservoir / skin energy chamber | Tap resource, double-tap confirm | 2x2 compact controls | Reservoir level, inner wave, glow rhythm changes | SVG/CSS/Framer | Medium | Low | Header, soft base, compact controls | Feels like a consultation energy reading | Too abstract if too pale | Build as first post-Q3 prototype |
| Q5 | Understand mirror-check habit | Mirror Focus Scan | The question is literally about looking in mirror | Soft mirror lens with focus zone | Tap focus: eyes, contour, texture, puffiness | 2x2 or compact focus chips | Zone highlight, lens refraction, diagnostic shimmer | SVG/CSS/Framer | Medium | Low | Same shell and control language | Most clinic-diagnostic chapter | Avoid literal face/medical look | Recommended |
| Q6 | Identify lifestyle tempo | Rhythm Trace Selector | The answer is rhythm/pacing | A calm pace trace or signal band | Tap rhythm state | Four slim rhythm strips or compact rows | Trace speed/density changes | SVG/CSS/Framer | Medium | Low | Same base and selected state | Fast kinetic chapter | Motion can become too busy | Recommended as a fast question |
| Q7 | Identify desired improvement | Skin Texture Concern Picker | The answers are tactile skin qualities | Central skin surface texture panel | Tap concern texture | 2x2 texture swatches or bottom grid | Texture clears, tightens, calms, brightens | SVG/CSS/Framer | Medium | Low | Same option controls | Tactile skincare mood | Texture can look dirty if too literal | Recommended |
| Q8 | Identify trigger source | Skin Trigger Map | The answer is cause-and-effect | Central skin core with four soft trigger nodes | Tap trigger node or bottom control | Radial trigger nodes plus optional bottom labels | Signal travels into core, color response | SVG/CSS/Framer | Medium-High | Medium | Same typography and soft palette | Feels like consultation diagnosis | Radial map can feel game-like | Use restrained trigger map |
| Q9 | Capture ideal skin goal | Goal Spectrum Lens | Aspirational question deserves luminous visual | Vertical skin-goal spectrum / glass finish lens | Tap desired goal | Segmented goal selector / compact controls | Light refines toward selected finish | SVG/CSS/Framer | Medium | Low | Same shell and aura color system | Aspirational payoff before final | Generic gradient risk | Recommended |
| Q10 | End with personal ritual | Ritual Path | Final question should feel like choosing a treatment-day ritual | Four ritual atmospheres, central sanctuary lens | Tap ritual, double-tap confirm | 2x2 ritual cards or scene chips | Steam/rest/nature/facial reset motion | SVG/CSS; optional images later | Medium now, High with images | Medium | Same controls, richer final mood | Closing ceremony | Too slow if image carousel | Use SVG MVP, optional image upgrade |

## 7. Option-Level Visual Concepts

### Q4 - You recently lack:

| Option | Visual metaphor | Palette | Animation | Selected effect | Emotional connection | Zenshil consistency |
|---|---|---|---|---|---|---|
| A 睡眠 | Low night reserve, soft sinking particles | Mist indigo, pearl blue, ivory | Slow downward drift, low breathing | Cool border, dim reservoir glow | Body asking for restoration | Quiet clinic recovery language |
| B 放鬆 | Tension ribbon loosening inside reservoir | Blush rose, muted mauve, ivory | Curves loosen and widen | Warm rose line softens | Stress release and nervous-system reset | Soft facial relaxation mood |
| C 時間 | Slow interval ripple, time resource thinning | Cyan mist, pale blue, white | Concentric timing ripples | Cool precision accent | Lack of time as rhythm pressure | Consultation diagnostic clarity |
| D 能量 | Cellular recharge glow rising upward | Soft gold, champagne, pearl | Light rises from base | Gold dot and reservoir bloom | Low energy seeking recharge | Premium treatment energy metaphor |

### Q5 - Mirror habit:

| Option | Visual metaphor | Palette | Animation | Selected effect | Emotional connection | Zenshil consistency |
|---|---|---|---|---|---|---|
| A 睇眼神精神狀態 | Eye-area light / tired gaze lens | Cool blue, pearl white | Under-eye haze clears slightly | Eye-zone shimmer | Looking for life in expression | Anti-fatigue facial consultation |
| B 睇輪廓線條 | Jawline contour trace | Soft violet grey, ivory | Fine line lifts along oval edge | Contour line becomes clearer | Desire for structure | Facial anti-aging positioning |
| C 睇毛孔膚質 | Micro texture magnification | Rose beige, milk white | Fine dots refine and reduce opacity | Texture panel smooths | Skin detail awareness | Clinic-grade skin analysis |
| D 睇有冇浮腫 | Fluid retention under lens | Aqua, mint, pearl | Waterline drains downward | Cool de-puff ripple | Morning swelling concern | Lymph/circulation care language |

### Q6 - Life rhythm:

| Option | Visual metaphor | Palette | Animation | Selected effect | Emotional connection | Zenshil consistency |
|---|---|---|---|---|---|---|
| A 長期高速運轉 | Fast thin light traces | Warm coral, slate, ivory | Quick but restrained horizontal traces | Trace compresses then fades | Constant high output | Urban Central pace, not neon |
| B 不規律漂浮 | Floating off-grid rhythm | Midnight blue, lavender | Signal drifts irregularly | Line stabilizes briefly | Unanchored schedule | Soft late-night recovery tone |
| C 平穩但疲倦 | Heavy steady pulse | Beige grey, muted gold | Slow repetitive wave | Pulse lowers and glows | Functional but tired | Premium fatigue diagnosis |
| D 努力自律中 | Balanced measured rhythm | Pale green, ivory | Clean metronomic pulse | Symmetry locks in | Discipline and control | Preventive beauty tone |

### Q7 - Desired improvement:

| Option | Visual metaphor | Palette | Animation | Selected effect | Emotional connection | Zenshil consistency |
|---|---|---|---|---|---|---|
| A 暗沉疲勞 | Dull veil over pearl surface | Blue grey, lavender | Fog thins slowly | Surface brightens a little | Want to look awake | Recovery/glow language |
| B 鬆弛感 | Soft contour membrane losing tension | Warm beige, muted violet | Edge gently lifts | Contour line tightens | Lift and firmness desire | Anti-aging aesthetic focus |
| C 不穩定敏感 | Blush flare under glass | Rose, cool grey, pearl | Pulse calms into even tone | Redness fades | Sensitive skin seeking calm | Barrier repair language |
| D 無光澤 | Matte surface gaining sheen | Champagne, pearl pink | Shimmer sweep across skin | Light reflection appears | Desire for radiance | High-end glow treatment mood |

### Q8 - Skin trigger:

| Option | Visual metaphor | Palette | Animation | Selected effect | Emotional connection | Zenshil consistency |
|---|---|---|---|---|---|---|
| A 捱夜 | Night signal affecting skin core | Deep blue, violet, pearl | Slow dark wave enters core | Core cools and dims | Sleep debt showing on skin | Late-night city lifestyle |
| B 情緒 | Ink-like mood ripple | Mauve, rose, lavender | Soft emotion ripple crosses core | Core blushes then settles | Emotions visible on face | Emotional skin intelligence |
| C 壓力 | Compression pressure field | Slate, cool cyan, muted violet | Core compresses subtly | Pressure ring releases | Stress as physical tension | Clinic-grade diagnosis |
| D 飲食 | Warm pigment / sugar haze | Amber, peach, ivory | Small warm particles gather then diffuse | Core warms softly | Lifestyle affecting complexion | Consultation advice tone |

### Q9 - Ideal skin state:

| Option | Visual metaphor | Palette | Animation | Selected effect | Emotional connection | Zenshil consistency |
|---|---|---|---|---|---|---|
| A 有生命力 | Fresh pulse under skin lens | Coral gold, mint, pearl | Gentle vitality pulse | Lens becomes more lively | Want energetic skin | Healthy aura language |
| B 緊緻細滑 | Fine satin tension | Ivory, pearl grey, lavender | Surface lines align | Satin finish tightens | Want refined firmness | Facial anti-aging focus |
| C 穩定舒服 | Calm balanced skin field | Mint, aqua, ivory | Slow even breathing | Field stabilizes | Want comfort and reliability | Barrier care tone |
| D 發光透明感 | Transparent glow / glass skin | Champagne, pearl pink, white | Shimmer passes through lens | Inner light expands | Want luminous clarity | Premium glow-seeker promise |

### Q10 - A day for yourself:

| Option | Visual metaphor | Palette | Animation | Selected effect | Emotional connection | Zenshil consistency |
|---|---|---|---|---|---|---|
| A 好好補眠 | Quiet hotel rest capsule | Midnight lavender, ivory | Soft curtain drift | Scene darkens and rests | Deep recovery | Urban staycation wellness |
| B 去按摩／Spa | Steam and pressure release | Aqua, warm stone, ivory | Steam rises slowly | Tension lines dissolve | Body reset | Spa-adjacent but not generic spa |
| C 去大自然 | Green city-oasis breathing | Mist green, pearl, pale gold | Leaf-light dapples gently | Breath field opens | Nature as nervous-system reset | Hong Kong hillside/oasis hint |
| D 做 Facial＋Reset | Treatment lens / facial glow | Pearl pink, champagne, white | Skin lens brightens | Reset bloom | Direct clinic conversion | Strong Zenshil service bridge |

## 8. Full Q1-Q10 Flow Rhythm

| Question | Pattern | Rhythm role | Speed |
|---|---|---|---|
| Q1 | Full-screen lifestyle scene | Cinematic opening | Medium |
| Q2 | Skin Weather Stage | Abstract diagnosis | Medium |
| Q3 | Skin Dialogue | Emotional connection | Medium |
| Q4 | Skin Resource Meter | First body-resource check | Low-medium |
| Q5 | Mirror Focus Scan | Fast clinic-style self-check | Fast |
| Q6 | Rhythm Trace Selector | Fast lifestyle pace check | Fast |
| Q7 | Texture Concern Picker | Fast tactile skin concern | Fast |
| Q8 | Trigger Map | More diagnostic cause-and-effect moment | Medium |
| Q9 | Goal Spectrum Lens | Aspirational breath before close | Medium |
| Q10 | Ritual Path | Closing ritual / conversion bridge | Medium |

Estimated comfortable completion time: 70-100 seconds.

Fatigue reduction:

- Keep all four options visible for Q4-Q10.
- Use tap preview and second tap confirm, without extra confirm buttons.
- Make Q5-Q7 fast and compact after the expressive Q1-Q4 opening.
- Give richer visuals again at Q8-Q10, where users are closer to completion.
- Avoid new gestures except tap; no drag, no required swipe after Q1.

## 9. Component Architecture

Recommended structure:

```txt
src/app/quiz/components/
  QuizQuestionRenderer.tsx
  ConfirmRipple.tsx
  controls/
    CompactOptionGrid.tsx
    OptionBadge.tsx
    DoubleTapHint.tsx
  shell/
    AuraBackdrop.tsx
    StageFrame.tsx
  interactions/
    ImageStageQuestion.tsx        // Q1
    WeatherStageQuestion.tsx      // Q2
    SkinDialogueQuestion.tsx      // Q3, can evolve from EmotionStageQuestion
    ResourceMeterQuestion.tsx     // Q4
    MirrorFocusQuestion.tsx       // Q5
    RhythmTraceQuestion.tsx       // Q6
    TextureConcernQuestion.tsx    // Q7
    TriggerMapQuestion.tsx        // Q8
    GoalSpectrumQuestion.tsx      // Q9
    RitualPathQuestion.tsx        // Q10
  visuals/
    q4/ResourceMeterVisual.tsx
    q5/MirrorFocusVisual.tsx
    q6/RhythmTraceVisual.tsx
    q7/TextureConcernVisual.tsx
    q8/TriggerMapVisual.tsx
    q9/GoalSpectrumVisual.tsx
    q10/RitualPathVisual.tsx
```

Shared primitives:

- `CompactOptionGrid`: shared option spacing, badge, text sizing, dot, selected state.
- `StageFrame`: central visual sizing, clipping, glass style, responsive constraints.
- `AuraBackdrop`: soft page gradient and noise.
- `useDoubleTapConfirm`: common preview/confirm behavior.
- `motionPresets`: durations, easing, calm fade, bloom, shimmer, ripple.

Do not over-engineer:

- Do not create one massive visual renderer with every question in a config object.
- Do not abstract away art direction too early.
- Do not force Q10 images into the MVP.

## 10. Data Model Proposal

### TypeScript shape

```ts
type ConfirmMode = 'doubleTap' | 'tap';

type PresentationType =
  | 'imageStage'
  | 'weatherStage'
  | 'skinDialogue'
  | 'resourceMeter'
  | 'mirrorFocus'
  | 'rhythmTrace'
  | 'textureConcern'
  | 'triggerMap'
  | 'goalSpectrum'
  | 'ritualPath';

type OptionVisual = {
  motif?: string;
  palette?: string;
  animationPreset?: string;
  imagePath?: string;
  accessibilityLabel?: string;
};

type QuizOption = {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  textEn?: string;
  auraMapping: string;
  visual?: OptionVisual;
};

type QuizQuestion = {
  id: string;
  questionText: string;
  questionTextEn?: string;
  presentation: {
    type: PresentationType;
    visualPreset: string;
    optionLayout: 'compactGrid' | 'compactRows' | 'radialNodes' | 'spectrumSegments' | 'ritualTiles';
    confirmMode: ConfirmMode;
    showAllOptions: boolean;
    paletteBase?: string;
    motionPreset?: string;
  };
  options: QuizOption[];
};
```

### Sample JSON question

```json
{
  "id": "q5",
  "questionText": "你平時照鏡最常做：",
  "questionTextEn": "What do you usually check in the mirror?",
  "presentation": {
    "type": "mirrorFocus",
    "visualPreset": "softDiagnosticMirror",
    "optionLayout": "compactGrid",
    "confirmMode": "doubleTap",
    "showAllOptions": true,
    "paletteBase": "pearlIvory",
    "motionPreset": "calmLensFocus"
  },
  "options": [
    {
      "id": "A",
      "text": "睇眼神精神狀態",
      "textEn": "Check how awake my eyes look",
      "auraMapping": "glow",
      "visual": {
        "motif": "eyeEnergyZone",
        "palette": "coolBluePearl",
        "animationPreset": "softEyeLight",
        "accessibilityLabel": "Eye energy focus"
      }
    }
  ]
}
```

## 11. MVP Implementation Roadmap

| Milestone | Goal | Likely files changed | Risk | Test plan | Rollback note |
|---|---|---|---|---|---|
| 1 | Freeze Q1-Q3 references | None, or commit current state | Accidental regression | Visual compare Q1-Q3 mobile | Revert only new commits, not user work |
| 2 | Extract shared option controls only if duplication hurts | `controls/CompactOptionGrid.tsx`, interaction files | Refactor risk | Q1-Q4 answer layout on 13 mini | Keep old component copies until stable |
| 3 | Implement Q4 Resource Meter | `ElementStageQuestion.tsx`, `ElementStageMotif.tsx` or new Q4 visual | Shared Q6 side effects if reused | Q4 A-D preview, Q6 smoke test | Revert Q4 visual component only |
| 4 | Implement Q5 Mirror Focus | `MirrorFocusQuestion.tsx`, visual component, `questions.json` presentation type | Face/mirror can look too literal | Q5 all options, accessibility labels | Revert renderer mapping for Q5 |
| 5 | Implement Q6 Rhythm Trace | `RhythmTraceQuestion.tsx`, visual component | Motion too fast or distracting | Reduced-motion and 13 mini test | Fall back to compact grid |
| 6 | Implement Q7 Texture Concern | `TextureConcernQuestion.tsx`, visual component | Textures look dirty or medical | Compare all texture states | Use abstract gradients if needed |
| 7 | Implement Q8 Trigger Map | `TriggerMapQuestion.tsx`, visual component | Radial UI may feel game-like | Tap target and label clarity | Use compact rows if radial fails |
| 8 | Implement Q9 Goal Spectrum | `GoalSpectrumQuestion.tsx`, visual component | Too generic gradient | Test selected state clarity | Convert to texture lens |
| 9 | Implement Q10 Ritual Path | `RitualPathQuestion.tsx`, visual component | Too slow at the end | Completion time test | SVG-only fallback, no images |
| 10 | Polish flow and commit | All touched files | Inconsistent spacing | Full Q1-Q10 run on 375px and 390px | Last known stable commit |

## 12. Final Recommendation

Recommended final Q4-Q10 plan:

- Q4: Skin Resource Meter.
- Q5: Mirror Focus Scan.
- Q6: Rhythm Trace Selector.
- Q7: Skin Texture Concern Picker.
- Q8: Trigger Map.
- Q9: Goal Spectrum Lens.
- Q10: Ritual Path.

Fast questions:

- Q5, Q6, Q7 should move quickly.

Richer visuals:

- Q4, Q8, Q9, Q10.

Images:

- Keep images only for Q1 in MVP.
- Consider optional generated images for Q10 later if the SVG ritual path feels too abstract.

SVG/CSS only:

- Q4-Q9 should be SVG/CSS/Framer Motion.

Shared components:

- Compact option controls, selected states, aura backdrop, stage frame, confirm ripple, double-tap logic.

Avoid:

- Repeating full-screen image scenes.
- Repeating skin speaking/quote interactions.
- Overusing orb/circle visuals.
- Harsh neon, medical horror, dashboard UI, childish icons.
- Overly slow transitions on every question.

What should be built first after Q3:

1. Q4 Resource Meter, because it bridges emotional Q3 into diagnostic body-resource territory.
2. Q5 Mirror Focus Scan, because it is high-brand-fit and practical.
3. Q6 Rhythm Trace, because it creates a faster pacing beat before the richer Q8-Q10 ending.

## 13. Open Questions for Jacky / Zenshil

1. Should all Q4-Q10 keep double-tap confirm, or can Q5-Q7 use single-tap confirm to improve speed?
2. Should Q10 become more conversion-oriented, subtly pointing toward Facial + Reset, or stay neutral among four choices?
3. Should Q5 use a very abstract face/mirror shape, or avoid any face-like geometry entirely?
4. Are Q4-Q10 allowed to introduce small English labels such as `RESOURCE`, `MIRROR`, `RHYTHM`, or should labels remain mostly Chinese?
5. For MVP, should generated images be avoided entirely after Q1, or should Q10 receive one premium closing image set later?
