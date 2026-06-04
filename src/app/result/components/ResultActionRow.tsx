'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import type { ShareAuraProfile } from './shareResultImage';
import { useResultShareImage } from './useResultShareImage';

interface ResultActionRowProps {
  aura: ShareAuraProfile;
  matchPercentage: number;
}

export default function ResultActionRow({ aura, matchPercentage }: ResultActionRowProps) {
  const language = useQuizStore((state) => state.language);
  const { isSharing, isSaving, message, saveResultImage, shareToInstagramStory } = useResultShareImage({
    aura,
    matchPercentage,
    language,
  });
  const actionClassName =
    'flex min-h-12 items-center justify-center gap-2 rounded-full px-3 py-3 text-[10px] font-medium text-stone-500 transition-all duration-200 hover:bg-white/85 hover:text-stone-800 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55';

  const actions = [
    {
      label: isSharing
        ? language === 'en' ? 'Creating...' : '生成圖片中'
        : language === 'en' ? 'Share Result' : '分享結果圖',
      onClick: shareToInstagramStory,
      disabled: isSharing,
      ariaLabel: language === 'en' ? 'Create and share your result image' : '生成並分享你的測試結果圖片',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      label: isSaving
        ? language === 'en' ? 'Saving...' : '儲存中'
        : language === 'en' ? 'Save Image' : '儲存圖片',
      onClick: saveResultImage,
      disabled: isSaving,
      ariaLabel: language === 'en' ? 'Save your result image' : '儲存你的測試結果圖片',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      ),
    },
  ];
  const helperText = language === 'en'
    ? 'Create a 9:16 Skin Aura report image for saving or Stories.'
    : '生成一張 IG Story 尺寸的專屬肌膚氣場報告。';

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-5 mb-8"
    >
      <div className="rounded-[2rem] border border-white/70 bg-white/45 p-1.5 shadow-sm backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-1.5">
          {actions.map((action, i) => {
            const content = (
              <>
                <span className="shrink-0 text-stone-400">
                  {action.icon}
                </span>
                <span className="font-sans leading-none text-center">
                  {action.label}
                </span>
              </>
            );

            return (
              <button
                key={i}
                type="button"
                onClick={action.onClick}
                disabled={action.disabled}
                aria-label={action.ariaLabel}
                className={actionClassName}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-3 px-3 text-center text-[10px] leading-relaxed text-stone-400" aria-live={message ? 'polite' : undefined}>
        {message ?? helperText}
      </p>
    </motion.section>
  );
}
