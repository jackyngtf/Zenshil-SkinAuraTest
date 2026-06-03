'use client';

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

type UseDoubleTapSelectionOptions = {
  onSelect: (optionId: string) => void;
  confirmDelay?: number;
  tapWindow?: number;
};

export function useDoubleTapSelection({
  onSelect,
  confirmDelay = 450,
  tapWindow = 460,
}: UseDoubleTapSelectionOptions) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef<{ id: string | null; time: number }>({ id: null, time: 0 });

  useEffect(() => {
    return () => {
      if (commitTimer.current) clearTimeout(commitTimer.current);
    };
  }, []);

  const commit = useCallback((optionId: string) => {
    setConfirmedId((current) => {
      if (current) return current;
      if (commitTimer.current) clearTimeout(commitTimer.current);
      commitTimer.current = setTimeout(() => onSelect(optionId), confirmDelay);
      return optionId;
    });
  }, [confirmDelay, onSelect]);

  const handleOptionTap = useCallback((optionId: string, event: MouseEvent<HTMLButtonElement>) => {
    if (confirmedId) return;

    const now = event.timeStamp;
    setPreviewId(optionId);

    if (lastTapRef.current.id === optionId && now - lastTapRef.current.time < tapWindow) {
      commit(optionId);
    }

    lastTapRef.current = { id: optionId, time: now };
  }, [commit, confirmedId, tapWindow]);

  return {
    previewId,
    confirmedId,
    handleOptionTap,
    commit,
  };
}
