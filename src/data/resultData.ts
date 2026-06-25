// Aura number & color label for each profile
export const auraNumbers: Record<string, { number: string; colorLabel: string; colorLabelEn: string }> = {
  overworked: { number: '111', colorLabel: '冷藍紫', colorLabelEn: 'Cool Blue-Purple' },
  stress: { number: '222', colorLabel: '橙紅紫', colorLabelEn: 'Orange-Red-Purple' },
  hidden_aging: { number: '333', colorLabel: '灰粉米白', colorLabelEn: 'Grey-Pink-Beige' },
  recovery: { number: '444', colorLabel: '水藍綠', colorLabelEn: 'Aqua-Teal' },
  preventive: { number: '555', colorLabel: '奶白淡綠', colorLabelEn: 'Milky-Pale-Green' },
  glow: { number: '666', colorLabel: '珍珠粉', colorLabelEn: 'Pearl Pink' },
  burnout: { number: '777', colorLabel: '深紫橙', colorLabelEn: 'Deep Purple-Orange' },
  late_night: { number: '888', colorLabel: '深海藍', colorLabelEn: 'Midnight Blue' },
};

// CSS gradient orb colors for each aura
export const auraOrbColors: Record<string, { inner: string; mid: string; outer: string }> = {
  overworked: { inner: '#c4b5fd', mid: '#f9a8d4', outer: '#93c5fd' },
  stress: { inner: '#fb923c', mid: '#e879f9', outer: '#f87171' },
  hidden_aging: { inner: '#fed7aa', mid: '#fecaca', outer: '#d6d3d1' },
  recovery: { inner: '#6ee7b7', mid: '#67e8f9', outer: '#a5b4fc' },
  preventive: { inner: '#d9f99d', mid: '#bbf7d0', outer: '#fef9c3' },
  glow: { inner: '#f9a8d4', mid: '#e9d5ff', outer: '#fbcfe8' },
  burnout: { inner: '#c084fc', mid: '#f472b6', outer: '#fb923c' },
  late_night: { inner: '#818cf8', mid: '#6366f1', outer: '#1e1b4b' },
};

export type AuraOrbColors = { inner: string; mid: string; outer: string };

/** Fallback orb palette for an unknown aura id (all 8 known ids are in
 *  auraOrbColors, so this is defensive only). Single source — previously
 *  this literal was copy-pasted across ~6 components + the share canvas. */
export const DEFAULT_ORB_COLORS: AuraOrbColors = auraOrbColors.overworked;

export const getOrbColors = (auraId: string): AuraOrbColors =>
  auraOrbColors[auraId] ?? DEFAULT_ORB_COLORS;

export interface AuraLensPalette {
  core: string;
  soft: string;
  warm: string;
  shadow: string;
  edge: string;
  band: string;
  angle: number;
}

// Result-only optical lens palettes. These are intentionally deeper than the
// quiz aura colors so the end result feels more editorial and shareable.
export const auraLensPalettes: Record<string, AuraLensPalette> = {
  overworked: {
    core: '#89b9e8',
    soft: '#d9c9ff',
    warm: '#f0c4d5',
    shadow: '#4a7fb1',
    edge: '#b2f0df',
    band: '#eef4ff',
    angle: 132,
  },
  stress: {
    core: '#f4675f',
    soft: '#d853ca',
    warm: '#ffb25e',
    shadow: '#44306f',
    edge: '#b8f3d3',
    band: '#ffde82',
    angle: 138,
  },
  hidden_aging: {
    core: '#d9b69b',
    soft: '#f0b7c1',
    warm: '#ffe3b8',
    shadow: '#8c817b',
    edge: '#c6e6d6',
    band: '#fff1dc',
    angle: 42,
  },
  recovery: {
    core: '#65d1c9',
    soft: '#91bff7',
    warm: '#e8d7ff',
    shadow: '#286f89',
    edge: '#f7c6d8',
    band: '#e9fff8',
    angle: 122,
  },
  preventive: {
    core: '#9bd8ac',
    soft: '#e4d879',
    warm: '#fff2bc',
    shadow: '#7ba67a',
    edge: '#f6c8df',
    band: '#f8ffe0',
    angle: 36,
  },
  glow: {
    core: '#f284bb',
    soft: '#c7a4ff',
    warm: '#ffd3a4',
    shadow: '#6f7cc6',
    edge: '#9debd7',
    band: '#fff0f8',
    angle: 126,
  },
  burnout: {
    core: '#f07a48',
    soft: '#bd58ec',
    warm: '#ffd26d',
    shadow: '#392468',
    edge: '#8ee8c9',
    band: '#ff9f7c',
    angle: 48,
  },
  late_night: {
    core: '#5476ff',
    soft: '#b6a5ff',
    warm: '#ffb3d1',
    shadow: '#151a4c',
    edge: '#94f2dc',
    band: '#dce6ff',
    angle: 134,
  },
};

export type AuraFamilyId = 'recovery' | 'pressure' | 'radiance' | 'rhythm';

export type AuraStatKey = 'energy' | 'glow' | 'stress' | 'recoveryNeeded';

export interface SkinAuraFamily {
  id: AuraFamilyId;
  name: string;
  nameZh: string;
  tone: string;
  toneZh: string;
  description: string;
  descriptionZh: string;
  memberIds: string[];
}

export interface AuraIdentityProfile {
  id: string;
  displayName: string;
  displayNameZh: string;
  familyId: AuraFamilyId;
  shortLine: string;
  shortLineZh: string;
  skinState: string;
  skinStateZh: string;
  primaryNeed: string;
  primaryNeedZh: string;
  demographic: string;
  demographicZh: string;
  shareLine: string;
  shareLineZh: string;
  dominantStats: AuraStatKey[];
}

// ── v2 result-page content: couplet variants + lucky fruit/drink ──
// Each couplet follows the "唔係X，只係Y" absolution shape, with the denial
// (X) and the reframe (Y) tuned to sensory metaphor (light / fire / signal /
// rhythm) rather than popped emotion words. Variant 0 is the default; variants
// 1/2 are selected when the secondary aura matches the keyed trigger, so two
// results with different secondaries read differently.
//
// Em-dashes are deliberately absent in the English lines (house style: none).
export interface CoupletVariant {
  zh: string;
  en: string;
}

export interface LuckyItem {
  zh: string;
  en: string;
}

export interface AuraV2Content {
  /** Absolution couplets. Index 0 = default; 1/2 keyed by secondary aura id. */
  couplets: CoupletVariant[];
  /** Which couplet to show for a given secondary aura id. Falls back to 0. */
  coupletBySecondary: Record<string, number>;
  luckyFruit: LuckyItem;
  luckyDrink: LuckyItem;
}

export const auraV2Content: Record<string, AuraV2Content> = {
  overworked: {
    couplets: [
      { zh: '唔係冇光，只係暫時調暗咗。', en: 'Not gone dark. Just dimmed for now.' },
      { zh: '唔係冇力氣，只係感官用得太滿。', en: "Not out of strength. Your senses are just full." },
      { zh: '唔係變鈍，只係欠一晚好覺。', en: 'Not dulled. Just short of one good night.' },
    ],
    coupletBySecondary: { stress: 1, late_night: 2 },
    luckyFruit: { zh: '桂圓', en: "Dragon's Eye" },
    luckyDrink: { zh: '紅棗茶', en: 'Jujube Tea' },
  },
  stress: {
    couplets: [
      { zh: '唔係太敏感，係你收得比人快。', en: 'Not too sensitive. You just take in more, faster.' },
      { zh: '唔係繃緊，係你同時接收緊太多。', en: "Not wound tight. You're just holding too much at once." },
      { zh: '唔係撐唔住，係訊號一齊湧到。', en: 'Not breaking. The signals just arrived all at once.' },
    ],
    coupletBySecondary: { overworked: 1, burnout: 2 },
    luckyFruit: { zh: '藍莓', en: 'Blueberry' },
    luckyDrink: { zh: '洋甘菊茶', en: 'Chamomile Tea' },
  },
  hidden_aging: {
    couplets: [
      { zh: '唔係老化，係你讀到時間嘅紋理。', en: "Not aging. You're just reading time's grain." },
      { zh: '唔係遲鈍，係你習慣慢工出細活。', en: 'Not slow. You just trust the steady hand.' },
      { zh: '唔係有問題，係你見到人哋未見嘅微光。', en: 'Not flawed. You just see the small shifts others miss.' },
    ],
    coupletBySecondary: { preventive: 1, glow: 2 },
    luckyFruit: { zh: '黑葡萄', en: 'Black Grapes' },
    luckyDrink: { zh: '黑茶', en: 'Pu-erh Tea' },
  },
  recovery: {
    couplets: [
      { zh: '唔係停滯，係身體重新砌緊地基。', en: "Not stuck. Your body is just relaying its foundation." },
      { zh: '唔係軟弱，係你畀自己慢慢復原。', en: "Not weak. You're just letting yourself recover, slowly." },
      { zh: '唔係難修，係值得花時間修。', en: 'Not hard to fix. Just worth the time to fix well.' },
    ],
    coupletBySecondary: { stress: 1, hidden_aging: 2 },
    luckyFruit: { zh: '木瓜', en: 'Papaya' },
    luckyDrink: { zh: '蜂蜜檸檬水', en: 'Honey Lemon Water' },
  },
  preventive: {
    couplets: [
      { zh: '唔係乏味，係你守住緊平衡。', en: "Not dull. You're just holding a hard-won balance." },
      { zh: '唔係低調，係你將光收得好穩。', en: "Not understated. You've just stored your glow where it stays." },
      { zh: '唔係保守，係你識得護住根基。', en: 'Not cautious. You just know to guard the root.' },
    ],
    coupletBySecondary: { glow: 1, recovery: 2 },
    luckyFruit: { zh: '蘋果', en: 'Apple' },
    luckyDrink: { zh: '綠茶', en: 'Green Tea' },
  },
  glow: {
    couplets: [
      { zh: '唔係貪靚，係你對光有要求。', en: 'Not vain. You just have a standard for light.' },
      { zh: '唔係浮誇，係你將穩定發成光。', en: "Not flashy. You're turning steadiness into light." },
      { zh: '唔係一閃即逝，係你學緊點留住光。', en: "Not fleeting. You're just learning how to keep the light." },
    ],
    coupletBySecondary: { preventive: 1, hidden_aging: 2 },
    luckyFruit: { zh: '火龍果', en: 'Dragon Fruit' },
    luckyDrink: { zh: '玫瑰花茶', en: 'Rose Tea' },
  },
  burnout: {
    couplets: [
      { zh: '唔係失敗，係你燒得太耐太猛。', en: "Not failing. You've just burned long and bright." },
      { zh: '唔係無能，係你急需降溫。', en: 'Not incapable. You just badly need to cool down.' },
      { zh: '唔係耗盡，係你一路燒一路冇熄。', en: 'Not emptied. You just never let the fire rest.' },
    ],
    coupletBySecondary: { stress: 1, late_night: 2 },
    luckyFruit: { zh: '紅棗', en: 'Red Dates' },
    luckyDrink: { zh: '紅糖薑茶', en: 'Ginger Honey Tea' },
  },
  late_night: {
    couplets: [
      { zh: '唔係夜貓，係你嘅日夜調轉咗。', en: 'Not nocturnal. Your day and night just traded places.' },
      { zh: '唔係懶，係你畀嘢逼住熬夜。', en: "Not lazy. You're just kept up by everything else." },
      { zh: '唔係冇精神，係你將光留咗畀夜晚。', en: 'Not drained. You just gave your light to the night.' },
    ],
    coupletBySecondary: { overworked: 1, glow: 2 },
    luckyFruit: { zh: '奇異果', en: 'Kiwi' },
    luckyDrink: { zh: '牛奶', en: 'Warm Milk' },
  },
};

/** Pick the couplet for a primary aura given its secondary, defaulting to 0. */
export const getCouplet = (primaryAuraId: string, secondaryAuraId: string): CoupletVariant => {
  const content = auraV2Content[primaryAuraId];
  if (!content) return { zh: '', en: '' };
  const index = content.coupletBySecondary[secondaryAuraId] ?? 0;
  return content.couplets[index] ?? content.couplets[0];
};

export const auraSymbols: Record<string, { labelZh: string; labelEn: string; coreZh: string; coreEn: string }> = {
  overworked: {
    labelZh: '能量核心',
    labelEn: 'Energy Core',
    coreZh: '靜默回補',
    coreEn: 'Quiet Recharge',
  },
  stress: {
    labelZh: '感知雷達',
    labelEn: 'Perception Radar',
    coreZh: '高感知接收',
    coreEn: 'High Sensitivity',
  },
  hidden_aging: {
    labelZh: '時間沙漏',
    labelEn: 'Time Rhythm',
    coreZh: '規律守護',
    coreEn: 'Structured Care',
  },
  recovery: {
    labelZh: '修復種子',
    labelEn: 'Recovery Seed',
    coreZh: '重建節奏',
    coreEn: 'Rebuilding Rhythm',
  },
  preventive: {
    labelZh: '平衡場域',
    labelEn: 'Balance Field',
    coreZh: '穩定建立',
    coreEn: 'Balance Building',
  },
  glow: {
    labelZh: '光源核心',
    labelEn: 'Light Source',
    coreZh: '追光透亮',
    coreEn: 'Radiance Seeking',
  },
  burnout: {
    labelZh: '運轉軌道',
    labelEn: 'Motion Track',
    coreZh: '高速節奏',
    coreEn: 'Constant Acceleration',
  },
  late_night: {
    labelZh: '月相軌跡',
    labelEn: 'Moon Rhythm',
    coreZh: '夜間創造',
    coreEn: 'Night Creation',
  },
};

export const skinAuraFamilies: Record<AuraFamilyId, SkinAuraFamily> = {
  recovery: {
    id: 'recovery',
    name: 'Energy Recovery Family',
    nameZh: '能量修復系',
    tone: 'Energy, circulation, recovery',
    toneZh: '能量、循環、修復',
    description: 'Your skin signals point toward energy depletion, slow recovery, and the need to replenish from within.',
    descriptionZh: '你的肌膚訊號指向能量消耗、恢復變慢，以及由內回補的需要。',
    memberIds: ['overworked', 'recovery'],
  },
  pressure: {
    id: 'pressure',
    name: 'Barrier Pressure Family',
    nameZh: '壓力屏障系',
    tone: 'Stress response, sensitivity, barrier pressure',
    toneZh: '壓力反應、敏感、屏障受壓',
    description: 'Your skin is highly perceptive. Pressure and stimulation are translated into visible skin signals quickly.',
    descriptionZh: '你的肌膚感知力很高，壓力與刺激會較快轉化成可見的肌膚訊號。',
    memberIds: ['stress', 'burnout'],
  },
  radiance: {
    id: 'radiance',
    name: 'Radiance Balance Family',
    nameZh: '光感平衡系',
    tone: 'Glow, texture clarity, stable maintenance',
    toneZh: '光澤、膚質清透、穩定維持',
    description: 'Your skin language is about luminosity, refined texture, and keeping good condition stable.',
    descriptionZh: '你的肌膚語言，是透亮、細緻，以及把好狀態穩定留住。',
    memberIds: ['preventive', 'glow'],
  },
  rhythm: {
    id: 'rhythm',
    name: 'Time Rhythm Family',
    nameZh: '時間節奏系',
    tone: 'Sleep rhythm, time pressure, early contour signals',
    toneZh: '作息節奏、時間壓力、初期輪廓訊號',
    description: 'Your skin responds strongly to timing, rest, and rhythm. Small routine shifts can shape how rested your face appears.',
    descriptionZh: '你的肌膚很受時間、休息與節奏影響；細微作息變化，也會反映在面部狀態上。',
    memberIds: ['hidden_aging', 'late_night'],
  },
};

export const auraIdentityProfiles: Record<string, AuraIdentityProfile> = {
  overworked: {
    id: 'overworked',
    displayName: 'QUIET RECHARGE',
    displayNameZh: '靜默充電者',
    familyId: 'recovery',
    shortLine: 'You are not losing your glow. You are quietly recharging.',
    shortLineZh: '你不是失去光，只是正在靜靜回補能量。',
    skinState: 'Quiet depletion · soft dullness · recovery rhythm',
    skinStateZh: '靜默消耗・柔和暗沉・修復節奏',
    primaryNeed: 'Hydration, rest, and gentle energy recovery',
    primaryNeedZh: '補水、休息與溫柔能量回補',
    demographic: 'Quiet high-output achiever',
    demographicZh: '安靜高輸出者',
    shareLine: 'My Skin Aura belongs to the Quiet Recharge identity.',
    shareLineZh: '我的 Skin Aura 屬於靜默充電者。',
    dominantStats: ['recoveryNeeded', 'stress'],
  },
  stress: {
    id: 'stress',
    displayName: 'HIGH SENSITIVITY OPERATOR',
    displayNameZh: '高感知運轉者',
    familyId: 'pressure',
    shortLine: 'You are not too sensitive. You simply receive more than most.',
    shortLineZh: '你不是太敏感，你只是接收得比別人更多。',
    skinState: 'High perception · quick response · barrier awareness',
    skinStateZh: '高感知・快速反應・屏障覺察',
    primaryNeed: 'Calming rhythm and a softer skin environment',
    primaryNeedZh: '鎮靜節奏與更柔和的肌膚環境',
    demographic: 'Emotionally perceptive achiever',
    demographicZh: '高感知工作者',
    shareLine: 'My Skin Aura belongs to the High Sensitivity Operator identity.',
    shareLineZh: '我的 Skin Aura 屬於高感知運轉者。',
    dominantStats: ['stress', 'recoveryNeeded'],
  },
  hidden_aging: {
    id: 'hidden_aging',
    displayName: 'STRUCTURED LIVING',
    displayNameZh: '規律生活者',
    familyId: 'rhythm',
    shortLine: 'You notice subtle shifts because you are making room for the future.',
    shortLineZh: '你看見細節，是因為你正在為未來留位置。',
    skinState: 'Structure · timing · subtle detail awareness',
    skinStateZh: '結構感・時間節奏・細節覺察',
    primaryNeed: 'Long-term contour support and rhythm consistency',
    primaryNeedZh: '長期輪廓支持與節奏穩定',
    demographic: 'Structured long-game planner',
    demographicZh: '長線規劃者',
    shareLine: 'My Skin Aura belongs to the Structured Living identity.',
    shareLineZh: '我的 Skin Aura 屬於規律生活者。',
    dominantStats: ['glow', 'recoveryNeeded'],
  },
  recovery: {
    id: 'recovery',
    displayName: 'RECOVERY MODE',
    displayNameZh: '修復模式者',
    familyId: 'recovery',
    shortLine: 'Rest is not stopping. It is your skin rebuilding.',
    shortLineZh: '休息不是停下來，而是肌膚正在重建。',
    skinState: 'Recovery rhythm · slow reset · comfort seeking',
    skinStateZh: '修復節奏・慢慢重啟・舒適需求',
    primaryNeed: 'Recovery, circulation, and deep relaxation',
    primaryNeedZh: '修復、循環與深層放鬆',
    demographic: 'Recovery-first resetter',
    demographicZh: '修復優先者',
    shareLine: 'My Skin Aura belongs to the Recovery Mode identity.',
    shareLineZh: '我的 Skin Aura 屬於修復模式者。',
    dominantStats: ['recoveryNeeded', 'stress'],
  },
  preventive: {
    id: 'preventive',
    displayName: 'BALANCE BUILDER',
    displayNameZh: '平衡建立者',
    familyId: 'radiance',
    shortLine: 'Your steadiness is a glow worth protecting.',
    shortLineZh: '你的穩定，是一種值得被守住的光。',
    skinState: 'Balance · steadiness · long-term maintenance',
    skinStateZh: '平衡・穩定・長期維持',
    primaryNeed: 'Consistency, barrier care, and gentle prevention',
    primaryNeedZh: '穩定保養、屏障守護與溫和預防',
    demographic: 'Long-term balance builder',
    demographicZh: '長期平衡建立者',
    shareLine: 'My Skin Aura belongs to the Balance Builder identity.',
    shareLineZh: '我的 Skin Aura 屬於平衡建立者。',
    dominantStats: ['energy', 'glow'],
  },
  glow: {
    id: 'glow',
    displayName: 'GLOW EXPLORER',
    displayNameZh: '光感探索者',
    familyId: 'radiance',
    shortLine: 'You are not chasing perfection; you are following the way your skin catches light.',
    shortLineZh: '你追求的不是完美，而是皮膚真正接住光。',
    skinState: 'Glow exploration · refined texture · light confidence',
    skinStateZh: '光感探索・細緻膚質・發光自信',
    primaryNeed: 'Radiance, hydration glow, and texture refinement',
    primaryNeedZh: '光感、水光與膚質細緻',
    demographic: 'Refined glow explorer',
    demographicZh: '精緻追光者',
    shareLine: 'My Skin Aura belongs to the Glow Explorer identity.',
    shareLineZh: '我的 Skin Aura 屬於光感探索者。',
    dominantStats: ['glow', 'energy'],
  },
  burnout: {
    id: 'burnout',
    displayName: 'CONSTANT ACCELERATOR',
    displayNameZh: '長期高速運轉者',
    familyId: 'pressure',
    shortLine: 'You are not behind. You have been moving at high speed for too long.',
    shortLineZh: '你不是不夠努力，你只是一直在高速前進。',
    skinState: 'High-speed rhythm · energy load · reset timing',
    skinStateZh: '高速節奏・能量負荷・重啟時機',
    primaryNeed: 'Rhythm reset and deeper recovery space',
    primaryNeedZh: '節奏重啟與更深層的恢復空間',
    demographic: 'Constant accelerator',
    demographicZh: '長期高速運轉者',
    shareLine: 'My Skin Aura belongs to the Constant Accelerator identity.',
    shareLineZh: '我的 Skin Aura 屬於長期高速運轉者。',
    dominantStats: ['stress', 'recoveryNeeded'],
  },
  late_night: {
    id: 'late_night',
    displayName: 'NIGHT OWL CREATOR',
    displayNameZh: '夜行創作者',
    familyId: 'rhythm',
    shortLine: 'The night gives you ideas; your skin is asking for rhythm.',
    shortLineZh: '夜晚給你靈感，也提醒你的肌膚需要節奏。',
    skinState: 'Night rhythm · creative energy · reset need',
    skinStateZh: '夜間節奏・創作能量・重整需求',
    primaryNeed: 'Sleep rhythm, eye care, and morning recovery',
    primaryNeedZh: '作息節奏、眼周照顧與晨間恢復',
    demographic: 'Night owl creator',
    demographicZh: '夜行創作者',
    shareLine: 'My Skin Aura belongs to the Night Owl Creator identity.',
    shareLineZh: '我的 Skin Aura 屬於夜行創作者。',
    dominantStats: ['recoveryNeeded', 'stress'],
  },
};

export function getAuraIdentity(auraId: string) {
  return auraIdentityProfiles[auraId];
}

// ── v2 result-page editorial content (society, traits, journey, etc.) ──
// One entry per aura. Follows the "不是X，而是Y / It is not X; it is Y"
// absolution shape, with a distinct sensory register per aura. No em-dashes.
export type LanguageCopy = { zh: string; en: string };
export interface SocietyTrait { title: LanguageCopy; detail: LanguageCopy }
export interface IdentityDetail { title: LanguageCopy; detail: LanguageCopy }
export interface IdentityNote { label: LanguageCopy; value: LanguageCopy }
export interface JourneyStep { label: LanguageCopy; treatment: string; detail: LanguageCopy }
export interface AuraV2Editorial {
  society: LanguageCopy;
  societyDescription: LanguageCopy;
  societyPercent: string;
  auraCore: LanguageCopy;
  rareTone: LanguageCopy;
  luckyTone: LanguageCopy;
  dailyReminder: LanguageCopy;
  societyTraits: SocietyTrait[];
  identityDetails: IdentityDetail[];
  skinAdviceNotes: IdentityNote[];
  skinMessage: LanguageCopy;
  journey: JourneyStep[];
}

export const auraV2Editorial: Record<string, AuraV2Editorial> = {
  stress: {
    society: { zh: '壓力屏障系 Society', en: 'Barrier Pressure Society' },
    societyDescription: {
      zh: '你的肌膚對壓力、溫差、睡眠同情緒變化特別快有反應。不是脆弱，而是屏障正在提示你：先降噪，再修復。',
      en: 'Your skin reacts quickly to pressure, temperature shifts, sleep, and emotional changes. It is not weakness; your barrier is asking for less noise and gentler repair.',
    },
    societyPercent: '18%',
    auraCore: { zh: '高感知接收', en: 'High Sensitivity' },
    rareTone: { zh: '稀有度 18%', en: 'Rarity 18%' },
    luckyTone: { zh: '海霧粉紫', en: 'Sea-Mist Mauve' },
    dailyReminder: { zh: '先替肌膚降噪', en: 'Lower the noise' },
    societyTraits: [
      {
        title: { zh: '壓力訊號快', en: 'Fast pressure signals' },
        detail: {
          zh: '情緒、溫差與忙碌節奏，會較快反映在泛紅、繃緊與不穩定上。',
          en: 'Emotion, temperature shifts, and busy rhythms show up quickly as redness, tightness, and instability.',
        },
      },
      {
        title: { zh: '屏障容易受壓', en: 'Barrier under pressure' },
        detail: {
          zh: '這一系的肌膚不是弱，而是屏障更容易被外界刺激推到緊繃狀態。',
          en: 'This society is not weak. Its barrier is more easily pushed into a tense state by external stimulation.',
        },
      },
      {
        title: { zh: '需要鎮靜修復', en: 'Needs calm repair' },
        detail: {
          zh: '比起加強攻效，低刺激、降溫與屏障修復會更適合這一系。',
          en: 'Low-stimulation calming and barrier repair work better than stronger actives for this society.',
        },
      },
    ],
    identityDetails: [
      {
        title: { zh: 'Aura No. 222', en: 'Aura No. 222' },
        detail: { zh: '代表你的高感知身份編號。', en: 'Your High Sensitivity Operator identity number.' },
      },
      {
        title: { zh: '幸運色：海霧粉紫', en: 'Lucky tone: Sea-Mist Mauve' },
        detail: { zh: '用柔和冷粉紫，幫肌膚情緒先降溫。', en: 'A soft cool mauve that cues calm before repair.' },
      },
      {
        title: { zh: '今日提醒：先替肌膚降噪', en: 'Today cue: lower the noise' },
        detail: { zh: '少一點刺激，多一點鎮靜，讓屏障慢慢回穩。', en: 'Less stimulation, more calm, and time for the barrier to settle.' },
      },
    ],
    skinAdviceNotes: [
      { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '泛紅、繃緊、不穩', en: 'Redness, tightness, imbalance' } },
      { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '少刺激，多鎮靜', en: 'Less stimulation, more calming' } },
      { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '提早 30 分鐘離線', en: 'Log off 30 min earlier' } },
    ],
    skinMessage: {
      zh: '我不是鬧情緒，只是替你接收了太多。今日少一點刺激，多一點鎮靜，讓屏障有時間回穩。',
      en: 'I am not being dramatic. I have simply been receiving too much for you. Today, choose less stimulation and more calm so your barrier has time to settle.',
    },
    journey: [
      {
        label: { zh: 'Calm the Signal', en: 'Calm the Signal' },
        treatment: 'X.prof 040',
        detail: { zh: '先降低泛紅與高感知反應。', en: 'Lower visible redness and high-sensitivity response first.' },
      },
      {
        label: { zh: 'Repair the Barrier', en: 'Repair the Barrier' },
        treatment: 'EXOXEN',
        detail: { zh: '把修復重點放回肌膚屏障。', en: 'Bring the focus back to barrier repair.' },
      },
      {
        label: { zh: 'Maintain the Rhythm', en: 'Maintain the Rhythm' },
        treatment: 'PLASONIC',
        detail: { zh: '用低壓方式維持穩定與吸收力。', en: 'Maintain stability and absorption with a low-pressure rhythm.' },
      },
    ],
  },

  overworked: {
    society: { zh: '持續過載系 Society', en: 'Constant Overload Society' },
    societyDescription: {
      zh: '你的肌膚長期處於運轉狀態，代謝慢慢走慢。不是懶惰，而是肌膚正在提示你：先回氣，再充電。',
      en: 'Your skin has been running nonstop, and its metabolism has slowly drifted down. It is not laziness; your skin is asking for a pause to recharge.',
    },
    societyPercent: '22%',
    auraCore: { zh: '過載運轉', en: 'Constant Overload' },
    rareTone: { zh: '稀有度 22%', en: 'Rarity 22%' },
    luckyTone: { zh: '暖霧琥珀', en: 'Amber Mist' },
    dailyReminder: { zh: '先回氣，再出發', en: 'Pause before pushing' },
    societyTraits: [
      {
        title: { zh: '代謝走慢了', en: 'Slowed metabolism' },
        detail: {
          zh: '代謝變慢讓暗沉與疲倦更容易累積，肌膚好像一直充不滿電。',
          en: 'A slower metabolism lets dullness and tiredness build up; your skin feels undercharged.',
        },
      },
      {
        title: { zh: '持續過載訊號', en: 'Constant overload signal' },
        detail: {
          zh: '這一系不是懶，而是運轉太久，皮膚訊號開始遲鈍。',
          en: 'This society is not lazy. It has been running too long, and its signals are slowing.',
        },
      },
      {
        title: { zh: '需要回氣充電', en: 'Needs a recharge pause' },
        detail: {
          zh: '比起不停加功效，先回氣、再充電會更適合這一系。',
          en: 'A pause to recharge works better than piling on more actives for this society.',
        },
      },
    ],
    identityDetails: [
      {
        title: { zh: 'Aura No. 111', en: 'Aura No. 111' },
        detail: { zh: '代表你的過載身份編號。', en: 'Your Constant Overload Operator identity number.' },
      },
      {
        title: { zh: '幸運色：暖霧琥珀', en: 'Lucky tone: Amber Mist' },
        detail: { zh: '用暖調琥珀，幫疲倦的肌膚慢慢回氣。', en: 'A warm amber that cues a slow recharge for tired skin.' },
      },
      {
        title: { zh: '今日提醒：先回氣，再出發', en: 'Today cue: pause before pushing' },
        detail: { zh: '讓肌膚有一個空檔，代謝才有氣力重新運轉。', en: 'Give skin a gap; metabolism needs space to spin up again.' },
      },
    ],
    skinAdviceNotes: [
      { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '疲倦、暗沉、代謝慢', en: 'Tiredness, dullness, slow metabolism' } },
      { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '先回氣，再充電', en: 'Pause first, then recharge' } },
      { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '提早 30 分鐘休息', en: 'Rest 30 min earlier' } },
    ],
    skinMessage: {
      zh: '我不是變懶，只是替你撐了太久。今日給我一個空檔回氣，代謝才有氣力重新跑起來。',
      en: 'I am not being lazy. I have been carrying the load for you for too long. Today, give me a gap to recharge so my metabolism can spin up again.',
    },
    journey: [
      {
        label: { zh: 'Restart the Metabolism', en: 'Restart the Metabolism' },
        treatment: 'X.prof 040',
        detail: { zh: '先喚醒疲倦、暗沉的代謝訊號。', en: 'Wake the tired, dull metabolism signal first.' },
      },
      {
        label: { zh: 'Recharge the Reserve', en: 'Recharge the Reserve' },
        treatment: 'EXOXEN',
        detail: { zh: '把能量儲備重新充回肌膚。', en: 'Recharge the energy reserve back into the skin.' },
      },
      {
        label: { zh: 'Sustain the Pace', en: 'Sustain the Pace' },
        treatment: 'PLASONIC',
        detail: { zh: '用低壓節奏維持動力，不要再逼。', en: 'Sustain momentum with a low-pressure rhythm, without pushing.' },
      },
    ],
  },

  hidden_aging: {
    society: { zh: '結構生活系 Society', en: 'Structural Living Society' },
    societyDescription: {
      zh: '你的肌膚結構訊號變化細微，細紋與彈性會不知不覺浮現。不是變老，而是結構正在細聲提示：提早做保養。',
      en: 'The structural signals of your skin shift subtly; fine lines and elasticity appear unnoticed. It is not aging; your structure is quietly asking for earlier care.',
    },
    societyPercent: '15%',
    auraCore: { zh: '結構感知', en: 'Structural Awareness' },
    rareTone: { zh: '稀有度 15%', en: 'Rarity 15%' },
    luckyTone: { zh: '珠光灰棕', en: 'Pearl Taupe' },
    dailyReminder: { zh: '提早做保養', en: 'Protect early' },
    societyTraits: [
      {
        title: { zh: '細紋偷偷浮現', en: 'Fine lines surface quietly' },
        detail: {
          zh: '結構訊號變化細微，細紋與彈性下降會不知不覺出現。',
          en: 'Structural shifts are subtle; fine lines and lost elasticity appear quietly.',
        },
      },
      {
        title: { zh: '彈性慢慢走樣', en: 'Elasticity drifting down' },
        detail: {
          zh: '彈性流失不是突然，而是日積月累地慢慢鬆弛。',
          en: 'Lost elasticity is not sudden; it loosens slowly, day by day.',
        },
      },
      {
        title: { zh: '需要結構預防', en: 'Needs structural prevention' },
        detail: {
          zh: '比起補救，提早做結構保養更能守住底子。',
          en: 'Early structural care protects the foundation better than repair later.',
        },
      },
    ],
    identityDetails: [
      {
        title: { zh: 'Aura No. 333', en: 'Aura No. 333' },
        detail: { zh: '代表你的結構感知身份編號。', en: 'Your Structural Awareness identity number.' },
      },
      {
        title: { zh: '幸運色：珠光灰棕', en: 'Lucky tone: Pearl Taupe' },
        detail: { zh: '用沉穩灰棕，幫結構訊號靜靜打底。', en: 'A grounded taupe that quietly reinforces the structural base.' },
      },
      {
        title: { zh: '今日提醒：提早做保養', en: 'Today cue: protect early' },
        detail: { zh: '讓微老化少一點時間累積，結構才穩。', en: 'Give hidden aging less time to build; structure stays firmer.' },
      },
    ],
    skinAdviceNotes: [
      { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '細紋、彈性下降', en: 'Fine lines, lost elasticity' } },
      { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '提早結構保養', en: 'Early structural care' } },
      { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '加一步抗氧', en: 'Add one antioxidant step' } },
    ],
    skinMessage: {
      zh: '我不是突然變老，只是結構訊號一直在細聲說話。今日提早多一步保養，讓微老化少一點時間累積。',
      en: 'I am not aging all at once. My structural signals have been speaking quietly all along. Today, add one step of early care and give hidden aging less time to build.',
    },
    journey: [
      {
        label: { zh: 'Signal the Structure', en: 'Signal the Structure' },
        treatment: 'X.prof 040',
        detail: { zh: '先喚醒緊緻度與結構訊號。', en: 'Wake the firmness and structural signal first.' },
      },
      {
        label: { zh: 'Rebuild the Foundation', en: 'Rebuild the Foundation' },
        treatment: 'EXOXEN',
        detail: { zh: '把結構基礎慢慢重建起來。', en: 'Rebuild the structural foundation steadily.' },
      },
      {
        label: { zh: 'Hold the Line', en: 'Hold the Line' },
        treatment: 'PLASONIC',
        detail: { zh: '用持續節奏守住彈性，長線防鬆弛。', en: 'Hold elasticity with a steady rhythm to prevent long-term slackness.' },
      },
    ],
  },

  recovery: {
    society: { zh: '修復重整系 Society', en: 'Repair Rebuild Society' },
    societyDescription: {
      zh: '你的肌膚正處於脆弱狀態，屏障還在慢慢重整。不是壞掉，而是屏障正在修復自己：給它溫柔與時間。',
      en: 'Your skin sits in a fragile state, and the barrier is still slowly rebuilding. It is not broken; the barrier is repairing itself, and it asks for gentleness and time.',
    },
    societyPercent: '12%',
    auraCore: { zh: '修復模式', en: 'Repair Mode' },
    rareTone: { zh: '稀有度 12%', en: 'Rarity 12%' },
    luckyTone: { zh: '鼠尾草薄霧', en: 'Sage Mist' },
    dailyReminder: { zh: '慢一步，溫柔一點', en: 'Slow down, go gentle' },
    societyTraits: [
      {
        title: { zh: '屏障正在受損', en: 'Barrier under repair' },
        detail: {
          zh: '皮膚正處於脆弱狀態，屏障還在慢慢重整。',
          en: 'Your skin sits in a fragile state; the barrier is still slowly rebuilding.',
        },
      },
      {
        title: { zh: '容易受刺激', en: 'Easily stimulated' },
        detail: {
          zh: '這一系對外界反應大，太強的步驟會加重負擔。',
          en: 'This society reacts strongly; steps that are too harsh add to the load.',
        },
      },
      {
        title: { zh: '需要溫柔修復', en: 'Needs gentle repair' },
        detail: {
          zh: '比起加碼功效，溫和、低刺激的修復更能幫屏障復原。',
          en: 'Gentle, low-stimulation repair helps the barrier recover better than stronger actives.',
        },
      },
    ],
    identityDetails: [
      {
        title: { zh: 'Aura No. 444', en: 'Aura No. 444' },
        detail: { zh: '代表你的修復模式身份編號。', en: 'Your Repair Mode identity number.' },
      },
      {
        title: { zh: '幸運色：鼠尾草薄霧', en: 'Lucky tone: Sage Mist' },
        detail: { zh: '用柔和的鼠尾草綠，幫受損屏障帶來平靜。', en: 'A soft sage green that brings calm to a wounded barrier.' },
      },
      {
        title: { zh: '今日提醒：慢一步，溫柔一點', en: 'Today cue: slow and gentle' },
        detail: { zh: '讓屏障多一點時間，修復不用急。', en: 'Give the barrier more time; repair does not need to rush.' },
      },
    ],
    skinAdviceNotes: [
      { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '脆弱、屏障受損', en: 'Fragile, damaged barrier' } },
      { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '溫和、低刺激修復', en: 'Gentle, low-stimulation repair' } },
      { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '停用一步猛效', en: 'Skip one active step tonight' } },
    ],
    skinMessage: {
      zh: '我不是壞掉，只是屏障還在慢慢重整。今日慢一步、溫柔一點，讓我多一點時間復原。',
      en: 'I am not broken. My barrier is still slowly rebuilding itself. Today, slow down and be gentle; give me a little more time to recover.',
    },
    journey: [
      {
        label: { zh: 'Soften the Damage', en: 'Soften the Damage' },
        treatment: 'X.prof 040',
        detail: { zh: '先溫和地安撫受損的屏障。', en: 'Gently soothe the wounded barrier first.' },
      },
      {
        label: { zh: 'Rebuild Gently', en: 'Rebuild Gently' },
        treatment: 'EXOXEN',
        detail: { zh: '把修復重點放回脆弱的位置。', en: 'Bring repair focus back to the fragile areas.' },
      },
      {
        label: { zh: 'Re-enter Slowly', en: 'Re-enter Slowly' },
        treatment: 'PLASONIC',
        detail: { zh: '用最輕的力度慢慢重回節奏。', en: 'Ease back into rhythm with the lightest pressure.' },
      },
    ],
  },

  preventive: {
    society: { zh: '平衡建構系 Society', en: 'Balanced Build Society' },
    societyDescription: {
      zh: '你的肌膚狀態平穩，但外在壓力開始慢慢累積。不是無聊，而是這份平衡值得守住：持續建構，延長穩定。',
      en: 'Your skin sits on a stable baseline, though outside pressure is building slowly. It is not boring; this balance is worth keeping: steady building extends the stability.',
    },
    societyPercent: '20%',
    auraCore: { zh: '平衡建構', en: 'Balanced Build' },
    rareTone: { zh: '稀有度 20%', en: 'Rarity 20%' },
    luckyTone: { zh: '鴿石霧灰', en: 'Dove Stone' },
    dailyReminder: { zh: '守住這份平衡', en: 'Hold the balance' },
    societyTraits: [
      {
        title: { zh: '底子穩定', en: 'Stable baseline' },
        detail: {
          zh: '皮膚狀態平穩，是一個值得守住的健康基礎。',
          en: 'Your skin sits on a stable baseline, a healthy base worth keeping.',
        },
      },
      {
        title: { zh: '防護需求浮現', en: 'Protection need rising' },
        detail: {
          zh: '雖然穩定，但外在壓力開始慢慢累積，需要加一層防護。',
          en: 'Though stable, outside pressure is building slowly and asks for a layer of protection.',
        },
      },
      {
        title: { zh: '需要平衡建構', en: 'Needs balanced build' },
        detail: {
          zh: '比起急救，持續的平衡建構更能延長這份穩定。',
          en: 'Steady balanced building extends this stability better than emergency rescue.',
        },
      },
    ],
    identityDetails: [
      {
        title: { zh: 'Aura No. 555', en: 'Aura No. 555' },
        detail: { zh: '代表你的平衡建構身份編號。', en: 'Your Balanced Build identity number.' },
      },
      {
        title: { zh: '幸運色：鴿石霧灰', en: 'Lucky tone: Dove Stone' },
        detail: { zh: '用沉靜霧灰，幫穩定肌膚守住底線。', en: 'A quiet misted grey that guards a stable baseline.' },
      },
      {
        title: { zh: '今日提醒：守住這份平衡', en: 'Today cue: hold the balance' },
        detail: { zh: '持續建構，讓平衡成為長期的底氣。', en: 'Keep building so balance becomes your long-term foundation.' },
      },
    ],
    skinAdviceNotes: [
      { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '穩定、需保護', en: 'Stable, needs protection' } },
      { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '持續平衡建構', en: 'Steady balanced building' } },
      { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '做好防護打底', en: 'Lay down protective base' } },
    ],
    skinMessage: {
      zh: '我不是無聊才這樣穩定，而是這份平衡值得你用心守住。今日持續建構，讓穩定成為長期的底氣。',
      en: 'I am not stable out of boredom. This balance is worth protecting with care. Today, keep building so stability becomes your long-term foundation.',
    },
    journey: [
      {
        label: { zh: 'Read the Baseline', en: 'Read the Baseline' },
        treatment: 'X.prof 040',
        detail: { zh: '先讀取平穩的肌膚基線。', en: 'Read the stable skin baseline first.' },
      },
      {
        label: { zh: 'Reinforce the Shield', en: 'Reinforce the Shield' },
        treatment: 'EXOXEN',
        detail: { zh: '把保護層加固在健康基礎上。', en: 'Reinforce a protective layer over the healthy base.' },
      },
      {
        label: { zh: 'Keep the Balance', en: 'Keep the Balance' },
        treatment: 'PLASONIC',
        detail: { zh: '用平衡節奏長線守住穩定。', en: 'Guard stability long-term with a balanced rhythm.' },
      },
    ],
  },

  glow: {
    society: { zh: '光感探索系 Society', en: 'Radiance Seek Society' },
    societyDescription: {
      zh: '你的肌膚代謝活躍，對光澤變化特別敏感。不是貪心，而是光感想被好好引導：溫和支持，自然透亮。',
      en: 'Your skin has an active metabolism and is especially tuned to radiance. It is not greed; your glow wants to be guided well: gentle support, natural translucency.',
    },
    societyPercent: '25%',
    auraCore: { zh: '光感探索', en: 'Radiance Seeking' },
    rareTone: { zh: '稀有度 25%', en: 'Rarity 25%' },
    luckyTone: { zh: '香檳金', en: 'Champagne Gold' },
    dailyReminder: { zh: '讓光由內透出', en: 'Let glow rise within' },
    societyTraits: [
      {
        title: { zh: '代謝活躍', en: 'Active metabolism' },
        detail: {
          zh: '皮膚代謝偏快，對光澤追求特別敏感。',
          en: 'A faster metabolism makes this society especially tuned to radiance.',
        },
      },
      {
        title: { zh: '光感需求大', en: 'High radiance demand' },
        detail: {
          zh: '光澤變化會快反映在膚色與透亮度上。',
          en: 'Radiance shifts show up quickly in tone and translucency.',
        },
      },
      {
        title: { zh: '需要光澤支持', en: 'Needs radiance support' },
        detail: {
          zh: '比起控油，溫和的代謝支持更能讓光感自然浮現。',
          en: 'Gentle metabolism support lets radiance surface more naturally than oil control.',
        },
      },
    ],
    identityDetails: [
      {
        title: { zh: 'Aura No. 666', en: 'Aura No. 666' },
        detail: { zh: '代表你的光感探索身份編號。', en: 'Your Radiance Seek identity number.' },
      },
      {
        title: { zh: '幸運色：香檳金', en: 'Lucky tone: Champagne Gold' },
        detail: { zh: '用亮澤香檳金，引導光感自然浮現。', en: 'A luminous champagne gold that guides radiance to the surface.' },
      },
      {
        title: { zh: '今日提醒：讓光由內透出', en: 'Today cue: let glow rise within' },
        detail: { zh: '溫和代謝支持，比猛烈亮白更耐看。', en: 'Gentle metabolism support outlasts harsh brightening.' },
      },
    ],
    skinAdviceNotes: [
      { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '追光、代謝活躍', en: 'Seeking light, active metabolism' } },
      { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '溫和代謝支持', en: 'Gentle metabolism support' } },
      { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '保濕先於亮白', en: 'Hydrate before brightening' } },
    ],
    skinMessage: {
      zh: '我不是貪心，只是光感想被你好好引導。今日溫和地支持代謝，光澤會自然由內透出來。',
      en: 'I am not being greedy. My radiance simply wants to be guided well. Today, support my metabolism gently and the glow will rise from within.',
    },
    journey: [
      {
        label: { zh: 'Wake the Light', en: 'Wake the Light' },
        treatment: 'X.prof 040',
        detail: { zh: '先重啟光澤代謝的源頭。', en: 'Restart the source of the radiance metabolism first.' },
      },
      {
        label: { zh: 'Deepen the Glow', en: 'Deepen the Glow' },
        treatment: 'EXOXEN',
        detail: { zh: '把內在光感慢慢加深。', en: 'Deepen the inner glow steadily.' },
      },
      {
        label: { zh: 'Set the Shine', en: 'Set the Shine' },
        treatment: 'PLASONIC',
        detail: { zh: '用均勻節奏鎖住透亮。', en: 'Lock in translucency with an even rhythm.' },
      },
    ],
  },

  burnout: {
    society: { zh: '耗盡重啟系 Society', en: 'Depleted Reset Society' },
    societyDescription: {
      zh: '你的肌膚已經到了深層疲勞，彈性與光澤明顯下滑。不是放棄，而是身體已經響起最深的警報：先停止耗損。',
      en: 'Your skin has reached deep fatigue; elasticity and radiance have dropped sharply. It is not giving up; your body has sounded its deepest alarm: stop the drain first.',
    },
    societyPercent: '8%',
    auraCore: { zh: '耗盡臨界', en: 'Depleted Threshold' },
    rareTone: { zh: '稀有度 8%', en: 'Rarity 8%' },
    luckyTone: { zh: '灰紫燼', en: 'Deep Mauve Ash' },
    dailyReminder: { zh: '先停止耗損', en: 'Stop the drain first' },
    societyTraits: [
      {
        title: { zh: '嚴重疲勞訊號', en: 'Severe fatigue signal' },
        detail: {
          zh: '皮膚已經到了深層疲勞，彈性與光澤明顯下滑。',
          en: 'Your skin has reached deep fatigue; elasticity and radiance have dropped sharply.',
        },
      },
      {
        title: { zh: '失去彈性', en: 'Lost elasticity' },
        detail: {
          zh: '這不是普通疲倦，而是儲備幾乎耗盡，皮膚難以回彈。',
          en: 'This is not ordinary tiredness; reserves are nearly empty and skin struggles to bounce back.',
        },
      },
      {
        title: { zh: '需要深層重啟', en: 'Needs deep reset' },
        detail: {
          zh: '比起表面提亮，深層重啟與休息更能幫皮膚回氣。',
          en: 'A deep reset and rest help more than surface brightening for this society.',
        },
      },
    ],
    identityDetails: [
      {
        title: { zh: 'Aura No. 777', en: 'Aura No. 777' },
        detail: { zh: '代表你的耗盡臨界身份編號。', en: 'Your Depleted Threshold identity number.' },
      },
      {
        title: { zh: '幸運色：灰紫燼', en: 'Lucky tone: Deep Mauve Ash' },
        detail: { zh: '用沉靜灰紫，先幫耗盡的肌膚降溫熄火。', en: 'A deep mauve ash that cools and quiets depleted skin first.' },
      },
      {
        title: { zh: '今日提醒：先停止耗損', en: 'Today cue: stop the drain first' },
        detail: { zh: '讓皮膚有一個深層休息，其餘的之後再說。', en: 'Give skin a deep rest; everything else can wait.' },
      },
    ],
    skinAdviceNotes: [
      { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '深層疲勞、失去彈性', en: 'Deep fatigue, lost elasticity' } },
      { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '深層重啟與休息', en: 'Deep reset and rest' } },
      { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '今晚什麼都不多做', en: 'Do nothing extra tonight' } },
    ],
    skinMessage: {
      zh: '我不是放棄，只是已經響起最深的警報。今日先停止耗損，給我一個深層休息，其餘的之後再說。',
      en: 'I am not giving up. I have simply sounded my deepest alarm. Today, stop the drain first and give me a deep rest; everything else can wait.',
    },
    journey: [
      {
        label: { zh: 'Stop the Drain', en: 'Stop the Drain' },
        treatment: 'X.prof 040',
        detail: { zh: '先叫停最深層的耗損。', en: 'Halt the deepest drain first.' },
      },
      {
        label: { zh: 'Rebuild from Zero', en: 'Rebuild from Zero' },
        treatment: 'EXOXEN',
        detail: { zh: '從最底層開始慢慢重建。', en: 'Rebuild slowly from the deepest layer up.' },
      },
      {
        label: { zh: 'Reset the Pace', en: 'Reset the Pace' },
        treatment: 'PLASONIC',
        detail: { zh: '用可持續的節奏重設步伐。', en: 'Reset a sustainable pace with a steady rhythm.' },
      },
    ],
  },

  late_night: {
    society: { zh: '夜間創作系 Society', en: 'Night Creator Society' },
    societyDescription: {
      zh: '你的肌膚因為夜間長時間消耗而缺水，循環節奏慢慢走樣。不是不會累，而是夜太長讓節奏失序：先補水，再重置。',
      en: 'Long nights have drained your skin of moisture, and its circulation rhythm has slowly drifted. It is not that it cannot tire; the long night has thrown the rhythm off: refill water, then reset.',
    },
    societyPercent: '14%',
    auraCore: { zh: '夜間節奏', en: 'Night Rhythm' },
    rareTone: { zh: '稀有度 14%', en: 'Rarity 14%' },
    luckyTone: { zh: '午夜鈷藍', en: 'Midnight Cobalt' },
    dailyReminder: { zh: '先補水，再講效率', en: 'Hydrate before hustling' },
    societyTraits: [
      {
        title: { zh: '缺水訊號明顯', en: 'Clear dehydration signal' },
        detail: {
          zh: '夜間長時間消耗讓水分流失，乾紋與暗沉較易出現。',
          en: 'Long nights drain moisture; dry lines and dullness appear more easily.',
        },
      },
      {
        title: { zh: '循環節奏走樣', en: 'Circulation rhythm drifting' },
        detail: {
          zh: '熬夜讓循環變慢，膚色容易顯得青黃、不夠亮。',
          en: 'Late nights slow circulation; tone tends to look sallow and under-lit.',
        },
      },
      {
        title: { zh: '需要補水與重置節奏', en: 'Needs hydration and rhythm reset' },
        detail: {
          zh: '比起猛效成分，先補水、再重置作息節奏更適合這一系。',
          en: 'Hydration first, then a rhythm reset, suits this society better than potent actives.',
        },
      },
    ],
    identityDetails: [
      {
        title: { zh: 'Aura No. 888', en: 'Aura No. 888' },
        detail: { zh: '代表你的夜間節奏身份編號。', en: 'Your Night Rhythm identity number.' },
      },
      {
        title: { zh: '幸運色：午夜鈷藍', en: 'Lucky tone: Midnight Cobalt' },
        detail: { zh: '用深沉鈷藍，幫走樣的夜間節奏慢慢歸位。', en: 'A deep cobalt that eases a drifting night rhythm back into place.' },
      },
      {
        title: { zh: '今日提醒：先補水，再講效率', en: 'Today cue: hydrate before hustling' },
        detail: { zh: '水分夠了，循環才有氣力重新跑。', en: 'With enough water, circulation can find its pace again.' },
      },
    ],
    skinAdviceNotes: [
      { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '缺水、循環差', en: 'Dehydration, poor circulation' } },
      { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '先補水，再重置節奏', en: 'Hydrate first, then reset rhythm' } },
      { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '多喝一杯水', en: 'Drink one more glass of water' } },
    ],
    skinMessage: {
      zh: '我不是不會累，只是夜太長讓節奏走樣了。今日先把水分補回來，循環才有氣力重新跑回正軌。',
      en: 'It is not that I cannot tire. The long night has shifted my rhythm. Today, refill the water first so circulation can find its pace again.',
    },
    journey: [
      {
        label: { zh: 'Refill the Water', en: 'Refill the Water' },
        treatment: 'X.prof 040',
        detail: { zh: '先把流失的水分倒回去。', en: 'Pour the lost hydration back in first.' },
      },
      {
        label: { zh: 'Restart the Circulation', en: 'Restart the Circulation' },
        treatment: 'EXOXEN',
        detail: { zh: '喚醒遲鈍的夜間循環。', en: 'Wake the sluggish night circulation.' },
      },
      {
        label: { zh: 'Reset the Clock', en: 'Reset the Clock' },
        treatment: 'PLASONIC',
        detail: { zh: '用穩定節奏重設夜間作息。', en: 'Reset the night rhythm with a steady pace.' },
      },
    ],
  },
};

export function getAuraFamily(auraId: string) {
  const identity = getAuraIdentity(auraId);
  return identity ? skinAuraFamilies[identity.familyId] : undefined;
}

// Insight points for the Personality & Skin block
export const insightPoints: Record<string, Array<{ titleZh: string; titleEn: string; descZh: string; descEn: string }>> = {
  overworked: [
    { titleZh: '能量透支', titleEn: 'Energy Depletion', descZh: '長期高壓輸出導致能量透支', descEn: 'Long-term high output leading to drained energy' },
    { titleZh: '暗沉無光', titleEn: 'Dull & Lacklustre', descZh: '肌膚屏障變弱，光澤與透明感下降', descEn: 'Compromised skin barrier leading to lost radiance' },
    { titleZh: '需要修復', titleEn: 'Recovery Needed', descZh: '恢復比刺激更重要，幫助肌膚重新充電', descEn: 'Restoration is key; help skin recharge rather than stimulate' },
  ],
  stress: [
    { titleZh: '壓力爆發', titleEn: 'Stress Flare-ups', descZh: '情緒與壓力直接反映在皮膚狀態', descEn: 'Emotions and stress reflect directly on skin condition' },
    { titleZh: '屏障受損', titleEn: 'Compromised Barrier', descZh: '皮膚屏障功能減弱，容易敏感泛紅', descEn: 'Weakened barrier makes skin prone to sensitivity & redness' },
    { titleZh: '需要鎮靜', titleEn: 'Calming Required', descZh: '冷靜修復比激烈治療更適合你', descEn: 'Gentle soothing works far better than active treatments' },
  ],
  hidden_aging: [
    { titleZh: '膠原流失', titleEn: 'Collagen Depletion', descZh: '膠原蛋白正在悄悄流失中', descEn: 'Collagen levels are quietly declining beneath the surface' },
    { titleZh: '輪廓變化', titleEn: 'Contour Changes', descZh: '面部線條開始出現微妙變化', descEn: 'Facial lines and contours begin to show micro-variations' },
    { titleZh: '最佳時機', titleEn: 'Prime Time', descZh: '現在是預防初老的黃金介入期', descEn: 'Now is the golden window for early anti-aging prevention' },
  ],
  recovery: [
    { titleZh: '循環不足', titleEn: 'Sluggish Circulation', descZh: '代謝緩慢，保養品難以被吸收', descEn: 'Slow metabolism makes it hard for skincare to absorb' },
    { titleZh: '需要休息', titleEn: 'Rest Needed', descZh: '身體正在發出需要休息的信號', descEn: 'Your body is sending clear signals for rest and sleep' },
    { titleZh: '回歸基礎', titleEn: 'Return to Basics', descZh: '讓肌膚重新呼吸與循環', descEn: 'Allow your skin to breathe and restore natural flow' },
  ],
  preventive: [
    { titleZh: '屏障穩固', titleEn: 'Stable Barrier', descZh: '皮膚屏障功能維持在良好狀態', descEn: 'Your skin barrier function remains highly effective and resilient' },
    { titleZh: '平衡穩定', titleEn: 'Balanced & Steady', descZh: '生活節奏與護膚紀律高度一致', descEn: 'Daily lifestyle and skincare discipline are well-aligned' },
    { titleZh: '屏障維持', titleEn: 'Barrier Maintenance', descZh: '穩定保養是你最大的護膚優勢', descEn: 'Consistent barrier maintenance is your greatest skincare advantage' },
  ],
  glow: [
    { titleZh: '追求透亮', titleEn: 'Pursuing Radiance', descZh: '對光澤感有極高的審美標準', descEn: 'High aesthetic standards for luminous and radiant skin' },
    { titleZh: '水光渴求', titleEn: 'Hydration Craving', descZh: '渴望永遠像剛做完 Facial 般發光', descEn: 'Desiring the fresh, lit-from-within post-facial glow daily' },
    { titleZh: '精緻要求', titleEn: 'Refined Detail', descZh: '對膚質細節有近乎完美的追求', descEn: 'Meticulous attention to microscopic skin texture details' },
  ],
  burnout: [
    { titleZh: '身心透支', titleEn: 'Total Burnout', descZh: '極度緊繃的狀態影響全身系統', descEn: 'Extreme physical and mental tension impacting systemic health' },
    { titleZh: '高壓過熱', titleEn: 'High Stress Overheat', descZh: '長期高強度運轉進入明顯透支期', descEn: 'Extended high-pace living leading to obvious depletion' },
    { titleZh: '急需重啟', titleEn: 'Urgent Reset', descZh: '皮膚需要一次全面的深層重置', descEn: 'Skin requires a comprehensive and quiet systemic reset' },
  ],
  late_night: [
    { titleZh: '熬夜習慣', titleEn: 'Night Owl Habits', descZh: '不規律的作息偷走肌膚元氣', descEn: 'Irregular sleeping patterns draining skin vitality' },
    { titleZh: '疲態顯現', titleEn: 'Visible Tiredness', descZh: '黑眼圈與浮腫成為常態困擾', descEn: 'Dark circles and puffiness becoming persistent concerns' },
    { titleZh: '喚醒需求', titleEn: 'Awakening Call', descZh: '需要專屬的提亮與消腫方案', descEn: 'Requires targeted brightening and anti-puffiness relief' },
  ],
};

// Stat labels for the compact stat row
export const statLabels = [
  { key: 'energy' as const, label: 'ENERGY', nameZh: '能量值', nameEn: 'Energy' },
  { key: 'glow' as const, label: 'GLOW', nameZh: '光澤度', nameEn: 'Glow' },
  { key: 'stress' as const, label: 'STRESS', nameZh: '壓力指數', nameEn: 'Stress Level' },
  { key: 'recoveryNeeded' as const, label: 'RECOVERY', nameZh: '修復需求', nameEn: 'Recovery Need' },
];

// ── Skin "needs" localisation + the universal-need business rule ──
// Single source for need labels (was previously copy-pasted in the view
// layer across PersonalitySkinBlock + the now-deleted NeedsTagSection).
export const needTranslations: Record<string, { zh: string; en: string }> = {
  'Deep Hydration': { zh: '深層注水保濕', en: 'Deep Hydration' },
  'Skin Recovery': { zh: '肌膚能量修護', en: 'Skin Recovery' },
  'Nervous System Reset': { zh: '神經放鬆重設', en: 'Nervous System Reset' },
  'Calming & Cooling': { zh: '舒緩鎮靜降溫', en: 'Calming & Cooling' },
  'Barrier Repair': { zh: '修護肌膚屏障', en: 'Barrier Repair' },
  'Anti-inflammation': { zh: '消炎抗紅防敏', en: 'Anti-inflammation' },
  'Collagen Support': { zh: '促進膠原蛋白', en: 'Collagen Support' },
  'Contour Lifting': { zh: '面部輪廓提拉', en: 'Contour Lifting' },
  'Elasticity Boost': { zh: '提升彈性飽滿', en: 'Elasticity Boost' },
  'Better Circulation': { zh: '促進微循環', en: 'Better Circulation' },
  'Detoxification': { zh: '深層排毒代謝', en: 'Detoxification' },
  'Deep Tissue Relaxation': { zh: '深層組織舒壓', en: 'Deep Tissue Relaxation' },
  'Antioxidant Protection': { zh: '抗氧化細胞防護', en: 'Antioxidant Protection' },
  Maintenance: { zh: '極簡精準保養', en: 'Maintenance' },
  'Preventive Care': { zh: '未來抗衰預防', en: 'Preventive Care' },
  'Ultimate Brightening': { zh: '極致煥亮提亮', en: 'Ultimate Brightening' },
  'Glass Skin Effect': { zh: '水光玻璃肌感', en: 'Glass Skin Effect' },
  'Texture Refinement': { zh: '細緻毛孔理膚', en: 'Texture Refinement' },
  'Total Reset': { zh: '身心肌膚重置', en: 'Total Reset' },
  'Intensive Repair': { zh: '高濃縮密集修復', en: 'Intensive Repair' },
  'Deep Awakening': { zh: '深層喚醒細胞', en: 'Deep Awakening' },
  'De-puffing': { zh: '排水緊緻消腫', en: 'De-puffing' },
  'Awakening & Brightening': { zh: '喚醒去黃提亮', en: 'Awakening & Brightening' },
  'Eye Contour Rescue': { zh: '眼周密集急救', en: 'Eye Contour Rescue' },
  'Barrier Support': { zh: '強韌屏障支持', en: 'Barrier Support' },
};

/** Every result appends this universal need if the aura didn't already list it. */
export const UNIVERSAL_NEED = 'Barrier Support';

/** Aura skinNeeds + the universal need (deduped) — the list the UI renders. */
export const withUniversalNeeds = (needs: string[]): string[] =>
  needs.includes(UNIVERSAL_NEED) ? needs : [...needs, UNIVERSAL_NEED];

/** Localised label for a skin need, falling back to the raw key if untranslated. */
export const getNeedLabel = (need: string, language: 'zh' | 'en'): string =>
  needTranslations[need]?.[language] ?? need;
