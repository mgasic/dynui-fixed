import { useRef, useCallback, useState } from 'react';

let tooltipTimer: ReturnType<typeof setTimeout> | null = null;

export interface TooltipOptions {
  delay?: number;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'focus' | 'both';
}

export function useTooltip(options: TooltipOptions = {}) {
  const {
    delay = 500,
    placement = 'top',
    trigger = 'hover'
  } = options;

  const targetRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const showTooltip = useCallback(() => {
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
    }
    
    tooltipTimer = setTimeout(() => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        let top = 0;
        let left = 0;

        switch (placement) {
          case 'top':
            top = rect.top - 8;
            left = rect.left + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + 8;
            left = rect.left + rect.width / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2;
            left = rect.left - 8;
            break;
          case 'right':
            top = rect.top + rect.height / 2;
            left = rect.right + 8;
            break;
        }

        setPosition({ top, left });
        setIsVisible(true);
      }
    }, delay);
  }, [delay, placement]);

  const hideTooltip = useCallback(() => {
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
      tooltipTimer = null;
    }
    setIsVisible(false);
  }, []);

  const tooltipProps = {
    onMouseEnter: trigger === 'hover' || trigger === 'both' ? showTooltip : undefined,
    onMouseLeave: trigger === 'hover' || trigger === 'both' ? hideTooltip : undefined,
    onFocus: trigger === 'focus' || trigger === 'both' ? showTooltip : undefined,
    onBlur: trigger === 'focus' || trigger === 'both' ? hideTooltip : undefined
  };

  return {
    targetRef,
    isVisible,
    position,
    tooltipProps,
    showTooltip,
    hideTooltip
  };
}