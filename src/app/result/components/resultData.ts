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

// Display keywords string for each aura
export const auraKeywordsDisplay: Record<string, { zh: string; en: string }> = {
  overworked: { zh: '低電量・暗沉缺水・修復需求', en: 'Low Energy · Dullness · Recovery Need' },
  stress: { zh: '壓力反應・泛紅敏感・屏障受壓', en: 'Stress Response · Redness · Barrier Pressure' },
  hidden_aging: { zh: '輪廓微鬆・膠原流失・彈性下降', en: 'Contour Shift · Collagen Loss · Elasticity Drop' },
  recovery: { zh: '循環慢・吸收弱・需要修復', en: 'Slow Circulation · Weak Absorption · Recovery Need' },
  preventive: { zh: '屏障穩定・抗氧保養・長期維持', en: 'Stable Barrier · Antioxidant Care · Long-Term Maintenance' },
  glow: { zh: '水光追求・透亮膚質・細節精緻', en: 'Glow Goal · Radiant Texture · Refined Detail' },
  burnout: { zh: '高壓過熱・能量透支・需要重啟', en: 'Overheated Stress · Energy Depletion · Reset Needed' },
  late_night: { zh: '熬夜作息・眼周疲態・慢代謝', en: 'Late-Night Rhythm · Eye Fatigue · Slow Metabolism' },
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
    description: 'Stress and overstimulation are showing up through redness, instability, and barrier pressure.',
    descriptionZh: '壓力與過度刺激，正透過泛紅、不穩定與屏障受壓反映出來。',
    memberIds: ['stress', 'burnout'],
  },
  radiance: {
    id: 'radiance',
    name: 'Radiance Balance Family',
    nameZh: '光感穩定系',
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
    description: 'Lifestyle rhythm and time pressure are shaping your current skin condition and early aging signals.',
    descriptionZh: '生活節奏與時間壓力，正在影響你目前的皮膚狀態與早期老化訊號。',
    memberIds: ['hidden_aging', 'late_night'],
  },
};

export const auraIdentityProfiles: Record<string, AuraIdentityProfile> = {
  overworked: {
    id: 'overworked',
    displayName: 'LOW BATTERY GLOW',
    displayNameZh: '低電發光型',
    familyId: 'recovery',
    shortLine: 'You still look polished, but your skin energy is quietly running low.',
    shortLineZh: '你看起來依然精緻，但肌膚能量正在悄悄見底。',
    skinState: 'Low energy · dullness · dehydration',
    skinStateZh: '低電量・暗沉缺水・修復需求',
    primaryNeed: 'Deep hydration and energy recovery',
    primaryNeedZh: '深層補水與能量回補',
    demographic: 'High-output professional',
    demographicZh: '高輸出工作者',
    shareLine: 'My skin aura is Low Battery Glow from the Energy Recovery Family.',
    shareLineZh: '我的肌膚氣場是能量修復系的低電發光型。',
    dominantStats: ['recoveryNeeded', 'stress'],
  },
  stress: {
    id: 'stress',
    displayName: 'STRESS REACTIVE SKIN',
    displayNameZh: '壓力泛紅型',
    familyId: 'pressure',
    shortLine: 'Your pressure is showing through redness, sensitivity, and an overworked barrier.',
    shortLineZh: '你的壓力，正透過泛紅、敏感與屏障受壓表現出來。',
    skinState: 'Redness · sensitivity · barrier pressure',
    skinStateZh: '泛紅・敏感・屏障受壓',
    primaryNeed: 'Calming, cooling, and barrier repair',
    primaryNeedZh: '鎮靜降溫與屏障修護',
    demographic: 'Emotionally overloaded achiever',
    demographicZh: '情緒高壓者',
    shareLine: 'My skin aura is Stress Reactive Skin from the Barrier Pressure Family.',
    shareLineZh: '我的肌膚氣場是壓力屏障系的壓力泛紅型。',
    dominantStats: ['stress', 'recoveryNeeded'],
  },
  hidden_aging: {
    id: 'hidden_aging',
    displayName: 'CONTOUR SAVER',
    displayNameZh: '輪廓守護型',
    familyId: 'rhythm',
    shortLine: 'You notice subtle changes early; now is the right time to protect firmness.',
    shortLineZh: '你比別人更早察覺細微變化，現在是守住輪廓的黃金時間。',
    skinState: 'Contour shift · collagen loss · early fine lines',
    skinStateZh: '輪廓微鬆・膠原流失・細紋初現',
    primaryNeed: 'Collagen support and contour lifting',
    primaryNeedZh: '膠原支持與輪廓提升',
    demographic: 'Precision anti-aging planner',
    demographicZh: '精準抗老派',
    shareLine: 'My skin aura is Contour Saver from the Time Rhythm Family.',
    shareLineZh: '我的肌膚氣場是時間節奏系的輪廓守護型。',
    dominantStats: ['glow', 'recoveryNeeded'],
  },
  recovery: {
    id: 'recovery',
    displayName: 'RECOVERY RHYTHM',
    displayNameZh: '循環修復型',
    familyId: 'recovery',
    shortLine: 'Rest is not a pause for you; it is the treatment your skin needs most.',
    shortLineZh: '讓循環重新開始，就是你目前最好的修復。',
    skinState: 'Slow circulation · weak absorption · visible fatigue',
    skinStateZh: '循環慢・吸收弱・疲態重',
    primaryNeed: 'Circulation awakening and deep relaxation',
    primaryNeedZh: '循環喚醒與深層放鬆',
    demographic: 'Recovery-first resetter',
    demographicZh: '恢復需求者',
    shareLine: 'My skin aura is Recovery Rhythm from the Energy Recovery Family.',
    shareLineZh: '我的肌膚氣場是能量修復系的循環修復型。',
    dominantStats: ['recoveryNeeded', 'stress'],
  },
  preventive: {
    id: 'preventive',
    displayName: 'BARRIER KEEPER',
    displayNameZh: '穩定屏障型',
    familyId: 'radiance',
    shortLine: 'You do not need a dramatic change; you need to keep your good state steady.',
    shortLineZh: '你要的不是大改變，而是把好狀態穩定留住。',
    skinState: 'Stable barrier · disciplined care · antioxidant need',
    skinStateZh: '屏障穩定・保養自律・抗氧需求',
    primaryNeed: 'Barrier maintenance and preventive care',
    primaryNeedZh: '屏障維持與抗氧化防護',
    demographic: 'Long-term skincare strategist',
    demographicZh: '長期保養派',
    shareLine: 'My skin aura is Barrier Keeper from the Radiance Balance Family.',
    shareLineZh: '我的肌膚氣場是光感穩定系的穩定屏障型。',
    dominantStats: ['energy', 'glow'],
  },
  glow: {
    id: 'glow',
    displayName: 'GLOW SEEKER',
    displayNameZh: '水光追求型',
    familyId: 'radiance',
    shortLine: 'You are not chasing flawlessness; you are chasing skin that truly catches light.',
    shortLineZh: '你追求的不只是無瑕，而是皮膚真正接住光的狀態。',
    skinState: 'Radiance goal · fine texture · glass-skin desire',
    skinStateZh: '水光追求・膚質細緻・透亮目標',
    primaryNeed: 'Brightening, hydration glow, and texture refinement',
    primaryNeedZh: '提亮、水光與膚質細緻',
    demographic: 'Refined glow seeker',
    demographicZh: '精緻發光派',
    shareLine: 'My skin aura is Glow Seeker from the Radiance Balance Family.',
    shareLineZh: '我的肌膚氣場是光感穩定系的水光追求型。',
    dominantStats: ['glow', 'energy'],
  },
  burnout: {
    id: 'burnout',
    displayName: 'BURNOUT SKIN',
    displayNameZh: '透支過熱型',
    familyId: 'pressure',
    shortLine: 'Your skin is trying to keep up with a lifestyle that burns too fast.',
    shortLineZh: '你的皮膚，正在努力追上過度燃燒的生活節奏。',
    skinState: 'Overheated pressure · depleted energy · dull yellow tone',
    skinStateZh: '高壓過熱・能量透支・暗黃疲態',
    primaryNeed: 'Full reset and intensive recovery',
    primaryNeedZh: '全面重置與密集修復',
    demographic: 'Burnout-cycle operator',
    demographicZh: '燃燒型工作者',
    shareLine: 'My skin aura is Burnout Skin from the Barrier Pressure Family.',
    shareLineZh: '我的肌膚氣場是壓力屏障系的透支過熱型。',
    dominantStats: ['stress', 'recoveryNeeded'],
  },
  late_night: {
    id: 'late_night',
    displayName: 'LATE NIGHT SKIN',
    displayNameZh: '夜貓倦容型',
    familyId: 'rhythm',
    shortLine: 'Your skin is carrying the debt of late nights and asking to be awakened.',
    shortLineZh: '夜晚的欠債，會先出現在眼周與氣色。',
    skinState: 'Dark circles · puffiness · slow metabolism',
    skinStateZh: '黑眼圈・浮腫・暗沉慢代謝',
    primaryNeed: 'Eye rescue, de-puffing, and brightening recovery',
    primaryNeedZh: '眼周急救與消腫提亮',
    demographic: 'Night-owl urbanite',
    demographicZh: '夜貓族',
    shareLine: 'My skin aura is Late Night Skin from the Time Rhythm Family.',
    shareLineZh: '我的肌膚氣場是時間節奏系的夜貓倦容型。',
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
export const insightPoints: Record<string, Array<{ icon: string; titleZh: string; titleEn: string; descZh: string; descEn: string }>> = {
  overworked: [
    { icon: '⚡', titleZh: '能量透支', titleEn: 'Energy Depletion', descZh: '長期高壓輸出導致能量透支', descEn: 'Long-term high output leading to drained energy' },
    { icon: '🌫', titleZh: '暗沉無光', titleEn: 'Dull & Lacklustre', descZh: '肌膚屏障變弱，光澤與透明感下降', descEn: 'Compromised skin barrier leading to lost radiance' },
    { icon: '🔋', titleZh: '需要修復', titleEn: 'Recovery Needed', descZh: '恢復比刺激更重要，幫助肌膚重新充電', descEn: 'Restoration is key; help skin recharge rather than stimulate' },
  ],
  stress: [
    { icon: '🔥', titleZh: '壓力爆發', titleEn: 'Stress Flare-ups', descZh: '情緒與壓力直接反映在皮膚狀態', descEn: 'Emotions and stress reflect directly on skin condition' },
    { icon: '🛡', titleZh: '屏障受損', titleEn: 'Compromised Barrier', descZh: '皮膚屏障功能減弱，容易敏感泛紅', descEn: 'Weakened barrier makes skin prone to sensitivity & redness' },
    { icon: '❄️', titleZh: '需要鎮靜', titleEn: 'Calming Required', descZh: '冷靜修復比激烈治療更適合你', descEn: 'Gentle soothing works far better than active treatments' },
  ],
  hidden_aging: [
    { icon: '⏳', titleZh: '膠原流失', titleEn: 'Collagen Depletion', descZh: '膠原蛋白正在悄悄流失中', descEn: 'Collagen levels are quietly declining beneath the surface' },
    { icon: '📐', titleZh: '輪廓變化', titleEn: 'Contour Changes', descZh: '面部線條開始出現微妙變化', descEn: 'Facial lines and contours begin to show micro-variations' },
    { icon: '🎯', titleZh: '最佳時機', titleEn: 'Prime Time', descZh: '現在是預防初老的黃金介入期', descEn: 'Now is the golden window for early anti-aging prevention' },
  ],
  recovery: [
    { icon: '🌀', titleZh: '循環不足', titleEn: 'Sluggish Circulation', descZh: '代謝緩慢，保養品難以被吸收', descEn: 'Slow metabolism makes it hard for skincare to absorb' },
    { icon: '😴', titleZh: '需要休息', titleEn: 'Rest Needed', descZh: '身體正在發出需要休息的信號', descEn: 'Your body is sending clear signals for rest and sleep' },
    { icon: '🌿', titleZh: '回歸基礎', titleEn: 'Return to Basics', descZh: '讓肌膚重新呼吸與循環', descEn: 'Allow your skin to breathe and restore natural flow' },
  ],
  preventive: [
    { icon: '🛡', titleZh: '屏障穩固', titleEn: 'Stable Barrier', descZh: '皮膚屏障功能維持在良好狀態', descEn: 'Your skin barrier function remains highly effective and resilient' },
    { icon: '⚖️', titleZh: '平衡穩定', titleEn: 'Balanced & Steady', descZh: '生活節奏與護膚紀律高度一致', descEn: 'Daily lifestyle and skincare discipline are well-aligned' },
    { icon: '🌟', titleZh: '屏障維持', titleEn: 'Barrier Maintenance', descZh: '穩定保養是你最大的護膚優勢', descEn: 'Consistent barrier maintenance is your greatest skincare advantage' },
  ],
  glow: [
    { icon: '✨', titleZh: '追求透亮', titleEn: 'Pursuing Radiance', descZh: '對光澤感有極高的審美標準', descEn: 'High aesthetic standards for luminous and radiant skin' },
    { icon: '💧', titleZh: '水光渴求', titleEn: 'Hydration Craving', descZh: '渴望永遠像剛做完 Facial 般發光', descEn: 'Desiring the fresh, lit-from-within post-facial glow daily' },
    { icon: '🔬', titleZh: '精緻要求', titleEn: 'Refined Detail', descZh: '對膚質細節有近乎完美的追求', descEn: 'Meticulous attention to microscopic skin texture details' },
  ],
  burnout: [
    { icon: '🔥', titleZh: '身心透支', titleEn: 'Total Burnout', descZh: '極度緊繃的狀態影響全身系統', descEn: 'Extreme physical and mental tension impacting systemic health' },
    { icon: '⚠️', titleZh: '高壓過熱', titleEn: 'High Stress Overheat', descZh: '長期高強度運轉進入明顯透支期', descEn: 'Extended high-pace living leading to obvious depletion' },
    { icon: '🆘', titleZh: '急需重啟', titleEn: 'Urgent Reset', descZh: '皮膚需要一次全面的深層重置', descEn: 'Skin requires a comprehensive and quiet systemic reset' },
  ],
  late_night: [
    { icon: '🌙', titleZh: '熬夜習慣', titleEn: 'Night Owl Habits', descZh: '不規律的作息偷走肌膚元氣', descEn: 'Irregular sleeping patterns draining skin vitality' },
    { icon: '👁', titleZh: '疲態顯現', titleEn: 'Visible Tiredness', descZh: '黑眼圈與浮腫成為常態困擾', descEn: 'Dark circles and puffiness becoming persistent concerns' },
    { icon: '☀️', titleZh: '喚醒需求', titleEn: 'Awakening Call', descZh: '需要專屬的提亮與消腫方案', descEn: 'Requires targeted brightening and anti-puffiness relief' },
  ],
};

// Stat labels for the compact stat row
export const statLabels = [
  { key: 'energy' as const, label: 'ENERGY', nameZh: '能量值', nameEn: 'Energy' },
  { key: 'glow' as const, label: 'GLOW', nameZh: '光澤度', nameEn: 'Glow' },
  { key: 'stress' as const, label: 'STRESS', nameZh: '壓力指數', nameEn: 'Stress Level' },
  { key: 'recoveryNeeded' as const, label: 'RECOVERY', nameZh: '修復需求', nameEn: 'Recovery Need' },
];
