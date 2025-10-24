import { useRef, useCallback, useEffect } from 'react';

export interface ArrowNavigationOptions {
  orientation?: 'horizontal' | 'vertical' | 'both';
  selector?: string;
}

export function useArrowNavigation(options: ArrowNavigationOptions = {}) {
  const {
    orientation = 'vertical',
    selector = '[tabindex="0"], button:not(:disabled), input:not(:disabled)'
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [] as HTMLElement[];

    return Array.from(containerRef.current.querySelectorAll(selector)).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && !el.hasAttribute('disabled')
    );
  }, [selector]);

  const focusElement = useCallback((element: HTMLElement | null | undefined) => {
    element?.focus();
  }, []);

  const focusAtIndex = useCallback(
    (index: number) => {
      const focusableElements = getFocusableElements();
      const total = focusableElements.length;
      if (total === 0) return;

      const normalizedIndex = ((index % total) + total) % total;
      const targetElement = focusableElements[normalizedIndex];
      focusElement(targetElement);
    },
    [getFocusableElements, focusElement]
  );

  const focusFirst = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;
    focusElement(focusableElements[0]);
  }, [getFocusableElements, focusElement]);

  const focusLast = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;
    focusElement(focusableElements[focusableElements.length - 1]);
  }, [getFocusableElements, focusElement]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.findIndex(
        (el) => el === document.activeElement
      );

      const moveNext = () => {
        const nextIndex = currentIndex < 0 ? 0 : currentIndex + 1;
        focusAtIndex(nextIndex);
      };

      const movePrevious = () => {
        const previousIndex = currentIndex < 0 ? focusableElements.length - 1 : currentIndex - 1;
        focusAtIndex(previousIndex);
      };

      switch (event.key) {
        case 'ArrowDown':
          if (orientation === 'vertical' || orientation === 'both') {
            event.preventDefault();
            moveNext();
          }
          break;
        case 'ArrowUp':
          if (orientation === 'vertical' || orientation === 'both') {
            event.preventDefault();
            movePrevious();
          }
          break;
        case 'ArrowRight':
          if (orientation === 'horizontal' || orientation === 'both') {
            event.preventDefault();
            moveNext();
          }
          break;
        case 'ArrowLeft':
          if (orientation === 'horizontal' || orientation === 'both') {
            event.preventDefault();
            movePrevious();
          }
          break;
        case 'Home':
          event.preventDefault();
          focusFirst();
          break;
        case 'End':
          event.preventDefault();
          focusLast();
          break;
      }
    },
    [focusAtIndex, focusFirst, focusLast, getFocusableElements, orientation]
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    node.addEventListener('keydown', handleKeyDown);

    return () => {
      node.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    containerRef,
    focusFirst,
    focusLast,
    focusAtIndex
  };
}