'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Language } from '@/store/useQuizStore';

interface ConfirmDialogProps {
  open: boolean;
  language: Language;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "danger" renders the confirm button in a warning tone. */
  tone?: 'default' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  language,
  title,
  message,
  confirmLabel,
  cancelLabel,
  tone = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const isEn = language === 'en';
  const resolvedConfirm = confirmLabel ?? (isEn ? 'Confirm' : '確認');
  const resolvedCancel = cancelLabel ?? (isEn ? 'Cancel' : '取消');

  // Close on Escape + lock scroll while open.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label={resolvedCancel}
            className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px]"
            onClick={onCancel}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-[320px] rounded-[1.75rem] border border-white/70 bg-[#fbf8f2] p-6 text-center shadow-[0_24px_60px_rgba(45,36,30,0.28)]"
          >
            <h2
              id="confirm-dialog-title"
              className="font-serif text-lg font-medium leading-snug text-stone-900 text-balance"
            >
              {title}
            </h2>
            <p className="mt-2 text-[12px] font-light leading-relaxed text-stone-600 text-pretty">
              {message}
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={onConfirm}
                className={`w-full rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 active:scale-[0.985] ${
                  tone === 'danger'
                    ? 'bg-stone-900 text-white hover:bg-stone-800'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {resolvedConfirm}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-full rounded-full px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 transition-colors duration-200 hover:bg-stone-100 hover:text-stone-800"
              >
                {resolvedCancel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
