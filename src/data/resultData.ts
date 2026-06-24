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
