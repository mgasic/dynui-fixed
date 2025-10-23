import { useRef, useCallback, useState } from 'react';

export interface DropdownOptions {
  trigger?: 'hover' | 'click' | 'focus';
  closeOnOutsideClick?: boolean;
}

export function useDropdown(options: DropdownOptions = {}) {
  const {
    trigger = 'click',
    closeOnOutsideClick = true
  } = options;

  const targetRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const dropdownProps = {
    onClick: trigger === 'click' ? toggleDropdown : undefined,
    onMouseEnter: trigger === 'hover' ? openDropdown : undefined,
    onMouseLeave: trigger === 'hover' ? closeDropdown : undefined,
    onFocus: trigger === 'focus' ? openDropdown : undefined,
    onBlur: trigger === 'focus' ? closeDropdown : undefined
  };

  return {
    targetRef,
    dropdownRef,
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    dropdownProps
  };
}