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
  overworked: { zh: '疲憊累積・暗沉無光・能量透支', en: 'Fatigue Accumulation · Dullness · Depleted Energy' },
  stress: { zh: '壓力爆發・泛紅敏感・屏障受損', en: 'Stress Flare-ups · Redness & Sensitivity · Compromised Barrier' },
  hidden_aging: { zh: '膠原流失・彈性下降・細紋情現', en: 'Collagen Loss · Elasticity Drop · Early Fine Lines' },
  recovery: { zh: '修復再生・循環提升・回復透亮', en: 'Repair & Regeneration · Boosted Circulation · Restored Radiance' },
  preventive: { zh: '預防未來・強韌屏障・維持年輕', en: 'Future Prevention · Strengthened Barrier · Youth Preservation' },
  glow: { zh: '追求光澤・渴望蛻變・提升自信', en: 'Pursuing Glow · Aspiring Transformation · Elevating Confidence' },
  burnout: { zh: '身心透支・能量耗盡・需要重啟', en: 'Physical & Mental Exhaustion · Depleted Energy · Reset Needed' },
  late_night: { zh: '熬夜習慣・代謝緩慢・疲憊顯現', en: 'Late-Night Habits · Sluggish Metabolism · Visible Fatigue' },
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
    { icon: '🌟', titleZh: '持續保養', titleEn: 'Sustained Care', descZh: '長期主義是你最大的護膚優勢', descEn: 'Consistency and long-term care are your greatest assets' },
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
