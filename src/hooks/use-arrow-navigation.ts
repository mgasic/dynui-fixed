import { useRef, useCallback } from 'react';

export interface ArrowNavigationOptions {
  orientation?: 'horizontal' | 'vertical' | 'both';
  selector?: string;
}

export function useArrowNavigation(options: ArrowNavigationOptions = {}) {
  const {
    orientation = 'vertical',
    selector = '[tabindex="0"], button:not(:disabled), input:not(:disabled)'
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  const focusElement = useCallback((element: Element) => {
    if (element instanceof HTMLElement) {
      element.focus();
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!containerRef.current) return;

    const focusableElements = Array.from(
      containerRef.current.querySelectorAll(selector)
    ).filter((el): el is HTMLElement => 
      el instanceof HTMLElement && !el.hasAttribute('disabled')
    );

    if (focusableElements.length === 0) return;

    const currentIndex = focusableElements.findIndex(el => el === document.activeElement);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault();
          nextIndex = (currentIndex + 1) % focusableElements.length;
        }
        break;
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault();
          nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
        }
        break;
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault();
          nextIndex = (currentIndex + 1) % focusableElements.length;
        }
        break;
      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault();
          nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
        }
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = focusableElements.length - 1;
        break;
    }

    if (nextIndex !== currentIndex && focusableElements[nextIndex]) {
      focusElement(focusableElements[nextIndex]);
    }
  }, [orientation, selector, focusElement]);

  const setupNavigation = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        containerRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  return {
    containerRef,
    setupNavigation
  };
}