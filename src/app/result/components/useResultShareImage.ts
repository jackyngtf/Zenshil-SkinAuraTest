'use client';

import { useCallback, useState } from 'react';
import type { ShareLanguage, ShareAuraProfile } from './shareResultImage';
import { createResultShareImage } from './shareResultImage';

interface UseResultShareImageOptions {
  aura: ShareAuraProfile;
  matchPercentage: number;
  language: ShareLanguage;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function createFileName(auraName: string) {
  const slug = auraName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `zenshil-skin-aura-${slug || 'result'}.jpg`;
}

export function useResultShareImage({ aura, matchPercentage, language }: UseResultShareImageOptions) {
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const createResultBlob = useCallback(async () => {
    const blob = await createResultShareImage({ aura, matchPercentage, language });
    const filename = createFileName(aura.name);

    return { blob, filename };
  }, [aura, language, matchPercentage]);

  const shareToInstagramStory = useCallback(async () => {
    setIsSharing(true);
    setMessage(null);

    try {
      const { blob, filename } = await createResultBlob();
      const file = new File([blob], filename, { type: 'image/jpeg' });
      const shareData: ShareData = {
        files: [file],
      };

      if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        setMessage(language === 'en' ? 'Share sheet opened.' : '已開啟分享選單。');
        return;
      }

      downloadBlob(blob, filename);
      setMessage(
        language === 'en'
          ? 'Image saved. If Instagram Story is not shown, upload this image manually.'
          : '圖片已儲存。如未見 Instagram Story，請手動上載呢張圖片。'
      );
    } catch (error) {
      setMessage(
        language === 'en'
          ? 'Unable to open sharing. Please try saving again.'
          : '暫時未能開啟分享，請再試一次儲存圖片。'
      );
      console.error('Unable to share result image:', error);
    } finally {
      setIsSharing(false);
    }
  }, [createResultBlob, language]);

  const saveResultImage = useCallback(async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const { blob, filename } = await createResultBlob();
      downloadBlob(blob, filename);
      setMessage(language === 'en' ? 'Result image saved.' : '測試結果圖片已儲存。');
    } catch (error) {
      setMessage(
        language === 'en'
          ? 'Unable to save the image. Please try again.'
          : '暫時未能儲存圖片，請再試一次。'
      );
      console.error('Unable to save result image:', error);
    } finally {
      setIsSaving(false);
    }
  }, [createResultBlob, language]);

  return {
    isSharing,
    isSaving,
    message,
    saveResultImage,
    shareToInstagramStory,
  };
}
