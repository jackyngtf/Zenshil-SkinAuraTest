import type { Language } from '@/store/useQuizStore';

// ponytail: booking number hardcoded, ceiling = single-clinic launch only,
//   upgrade = when a second clinic/branch or multi-tenant booking is added.
const WHATSAPP_PHONE = '85295096802';

/**
 * Per-aura WhatsApp message templates. Each carries the test result context
 * (which aura the user got + that persona's core skin needs), so the clinic
 * receives a personalised enquiry instead of a generic "I want to ask about
 * treatments".
 *
 * Keyed by aura id; falls back to a generic message if the aura is unknown.
 */
const AURA_BOOKING_MESSAGES: Record<string, { zh: string; en: string }> = {
  overworked: {
    zh: '我剛完成肌膚氣場測試，結果係「靜默充電者」。我嘅肌膚需要深層保濕、修復同能量重整，想了解適合我嘅護理療程。',
    en: 'I just completed the Skin Aura test — my result is "Quiet Recharge". My skin needs deep hydration, recovery and an energy reset. I\'d like to know which treatments suit my lifestyle.',
  },
  stress: {
    zh: '我剛完成肌膚氣場測試，結果係「高感知運轉者」。我嘅肌膚容易敏感，需要鎮靜舒緩同修復屏障，想了解適合我嘅護理療程。',
    en: 'I just completed the Skin Aura test — my result is "High Sensitivity Operator". My skin is easily sensitised and needs calming, barrier repair and anti-inflammatory care. I\'d like to know which treatments suit my lifestyle.',
  },
  hidden_aging: {
    zh: '我剛完成肌膚氣場測試，結果係「規律生活者」。我比較關注膠原蛋白、輪廓緊緻同彈性，想了解適合我嘅護理療程。',
    en: 'I just completed the Skin Aura test — my result is "Structured Living". I\'m focused on collagen support, contour lifting and elasticity. I\'d like to know which treatments suit my lifestyle.',
  },
  recovery: {
    zh: '我剛完成肌膚氣場測試，結果係「修復模式者」。我嘅肌膚需要改善循環、排毒同深層放鬆，想了解適合我嘅護理療程。',
    en: 'I just completed the Skin Aura test — my result is "Recovery Mode". My skin needs better circulation, detoxification and deep relaxation. I\'d like to know which treatments suit my lifestyle.',
  },
  preventive: {
    zh: '我剛完成肌膚氣場測試，結果係「平衡建立者」。我嘅肌膚狀態穩定，想了解適合嘅日常維持同預防護理。',
    en: 'I just completed the Skin Aura test — my result is "Balance Builder". My skin is in a steady state and I\'d like to know about maintenance and preventive care suited to me.',
  },
  glow: {
    zh: '我剛完成肌膚氣場測試，結果係「光感探索者」。我想提升透亮度、改善皮膚質感同追求玻璃肌效果，想了解適合我嘅護理療程。',
    en: 'I just completed the Skin Aura test — my result is "Glow Explorer". I want to boost radiance, refine texture and achieve a glass-skin effect. I\'d like to know which treatments suit my lifestyle.',
  },
  burnout: {
    zh: '我剛完成肌膚氣場測試，結果係「長期高速運轉者」。我嘅肌膚需要深層修復、密集急救同能量重啟，想了解適合我嘅護理療程。',
    en: 'I just completed the Skin Aura test — my result is "Constant Accelerator". My skin needs intensive repair, a total reset and deep awakening. I\'d like to know which treatments suit my lifestyle.',
  },
  late_night: {
    zh: '我剛完成肌膚氣場測試，結果係「夜行創作者」。我嘅肌膚需要去水腫、醒膚提亮同眼周急救，想了解適合我嘅護理療程。',
    en: 'I just completed the Skin Aura test — my result is "Night Owl Creator". My skin needs de-puffing, awakening and eye-contour rescue. I\'d like to know which treatments suit my lifestyle.',
  },
};

const GENERIC_BOOKING_MESSAGE: { zh: string; en: string } = {
  zh: '我剛完成肌膚氣場測試，想了解適合我嘅護理療程。',
  en: 'I just completed the Skin Aura test and I\'d like to know which treatments suit my skin.',
};

/**
 * Builds a personalised WhatsApp booking link whose pre-filled message carries
 * the user's test result context.
 */
export function getBookingUrl(auraId: string, language: Language): string {
  const template = AURA_BOOKING_MESSAGES[auraId] ?? GENERIC_BOOKING_MESSAGE;
  const message = template[language];
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}
