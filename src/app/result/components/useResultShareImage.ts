'use client';

import { useCallback, useState } from 'react';
import type { ShareLanguage, ShareAuraProfile } from './shareResultImage';
import { createResultShareImage } from './shareResultImage';

interface UseResultShareImageOptions {
  aura: ShareAuraProfile;
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

function isShareAbort(error: unknown) {
  return typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError';
}

export function useResultShareImage({ aura, language }: UseResultShareImageOptions) {
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const createResultBlob = useCallback(async () => {
    const blob = await createResultShareImage({ aura, language });
    const filename = createFileName(aura.name);

    return { blob, filename };
  }, [aura, language]);

  const shareToInstagramStory = useCallback(async () => {
    setIsSharing(true);
    setMessage(null);

    try {
      const { blob, filename } = await createResultBlob();
      const file = new File([blob], filename, { type: 'image/jpeg' });
      const shareTitle = language === 'en'
        ? 'My Zenshil Skin Aura Result'
        : '我的 Zenshil 肌膚氣場結果';
      const shareText = language === 'en'
        ? `My Skin Aura is ${aura.name}.`
        : `我的 Skin Aura 是 ${aura.chineseName}。`;
      const shareUrl = typeof window !== 'undefined' ? window.location.href : undefined;

      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        const fileShareData: ShareData = {
          files: [file],
          text: shareText,
          title: shareTitle,
        };

        if (navigator.canShare?.(fileShareData)) {
          try {
            await navigator.share(fileShareData);
            setMessage(language === 'en' ? 'Share sheet opened.' : '已開啟分享選單。');
            return;
          } catch (error) {
            if (isShareAbort(error)) {
              throw error;
            }
          }
        }

        await navigator.share({
          text: shareText,
          title: shareTitle,
          ...(shareUrl ? { url: shareUrl } : {}),
        });
        setMessage(
          language === 'en'
            ? 'Share sheet opened. Use Save Image for the IG Story artwork.'
            : '已開啟分享選單。如要 IG Story 圖，請使用儲存圖片。'
        );
        return;
      }

      downloadBlob(blob, filename);
      setMessage(
        language === 'en'
          ? 'Sharing is unavailable in this browser, so the image was saved instead.'
          : '此瀏覽器未能開啟分享選單，已改為儲存圖片。'
      );
    } catch (error) {
      if (isShareAbort(error)) {
        setMessage(language === 'en' ? 'Sharing cancelled.' : '已取消分享。');
        return;
      }

      setMessage(
        language === 'en'
          ? 'Unable to open sharing. Please use Save Image instead.'
          : '暫時未能開啟分享，請改用儲存圖片。'
      );
      console.error('Unable to share result image:', error);
    } finally {
      setIsSharing(false);
    }
  }, [aura.chineseName, aura.name, createResultBlob, language]);

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
