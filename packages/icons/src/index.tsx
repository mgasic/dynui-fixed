import type { ReactElement, SVGProps } from 'react';

/**
 * Minimal icon registry to validate the package wiring.
 * The map will be populated with generated icons in a future phase.
 */
export const icons: Record<string, (props: SVGProps<SVGSVGElement>) => ReactElement> = {
  placeholder: (props) => (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      role="img"
      {...props}
    >
      <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.12" />
      <path
        d="M6 12h12M12 6v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
};

export type IconName = keyof typeof icons;

export function getIcon(name: IconName) {
  return icons[name];
}
