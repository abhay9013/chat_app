import { useState, useCallback } from 'react';

export function useModalState(defaultVal = false) {
  const [isOpen, setIsOpen] = useState(defaultVal);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}
