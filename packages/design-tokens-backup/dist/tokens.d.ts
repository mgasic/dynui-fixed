export declare const colors: {
    readonly white: "#ffffff";
    readonly black: "#000000";
    readonly transparent: "transparent";
    readonly neutral: {
        readonly 0: "#ffffff";
        readonly 50: "#f9fafb";
        readonly 100: "#f3f4f6";
        readonly 200: "#e5e7eb";
        readonly 300: "#d1d5db";
        readonly 400: "#9ca3af";
        readonly 500: "#6b7280";
        readonly 600: "#4b5563";
        readonly 700: "#374151";
        readonly 800: "#1f2937";
        readonly 900: "#111827";
    };
    readonly primary: {
        readonly 50: "#eff6ff";
        readonly 100: "#dbeafe";
        readonly 200: "#bfdbfe";
        readonly 300: "#93c5fd";
        readonly 400: "#60a5fa";
        readonly 500: "#3b82f6";
        readonly 600: "#2563eb";
        readonly 700: "#1d4ed8";
        readonly 800: "#1e40af";
        readonly 900: "#1e3a8a";
    };
    readonly success: {
        readonly 50: "#ecfdf5";
        readonly 100: "#d1fae5";
        readonly 500: "#10b981";
        readonly 600: "#059669";
        readonly 700: "#047857";
    };
    readonly warning: {
        readonly 50: "#fffbeb";
        readonly 100: "#fef3c7";
        readonly 500: "#f59e0b";
        readonly 600: "#d97706";
        readonly 700: "#b45309";
    };
    readonly danger: {
        readonly 50: "#fef2f2";
        readonly 100: "#fee2e2";
        readonly 500: "#ef4444";
        readonly 600: "#dc2626";
        readonly 700: "#b91c1c";
    };
    readonly info: {
        readonly 50: "#eff6ff";
        readonly 100: "#dbeafe";
        readonly 500: "#3b82f6";
        readonly 600: "#2563eb";
        readonly 700: "#1d4ed8";
    };
};
export declare const spacing: {
    readonly 0: "0";
    readonly 1: "0.25rem";
    readonly 2: "0.5rem";
    readonly 3: "0.75rem";
    readonly 4: "1rem";
    readonly 5: "1.25rem";
    readonly 6: "1.5rem";
    readonly 8: "2rem";
    readonly 10: "2.5rem";
    readonly 12: "3rem";
    readonly 16: "4rem";
    readonly xs: "0.25rem";
    readonly sm: "0.5rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
    readonly '2xl': "2.5rem";
    readonly '3xl': "3rem";
};
export declare const typography: {
    readonly fonts: {
        readonly sans: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
        readonly mono: "JetBrains Mono, \"Fira Code\", Consolas, \"Liberation Mono\", monospace";
    };
    readonly sizes: {
        readonly xs: "0.75rem";
        readonly sm: "0.875rem";
        readonly base: "1rem";
        readonly lg: "1.125rem";
        readonly xl: "1.25rem";
        readonly '2xl': "1.5rem";
        readonly '3xl': "1.875rem";
        readonly '4xl': "2.25rem";
    };
    readonly weights: {
        readonly normal: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
    };
    readonly lineHeights: {
        readonly tight: 1.25;
        readonly snug: 1.375;
        readonly normal: 1.5;
        readonly relaxed: 1.625;
        readonly loose: 2;
    };
};
export declare const shadows: {
    readonly xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    readonly sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";
    readonly base: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)";
    readonly md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)";
    readonly lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
    readonly xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
    readonly focus: "0 0 0 3px rgba(59, 130, 246, 0.35)";
    readonly dropdown: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
    readonly modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
    readonly button: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";
};
export declare const radii: {
    readonly none: "0";
    readonly xs: "0.125rem";
    readonly sm: "0.25rem";
    readonly base: "0.375rem";
    readonly md: "0.5rem";
    readonly lg: "0.75rem";
    readonly xl: "1rem";
    readonly '2xl': "1.5rem";
    readonly full: "9999px";
    readonly button: "0.375rem";
    readonly input: "0.375rem";
    readonly card: "0.75rem";
    readonly modal: "1rem";
};
export declare const animations: {
    readonly duration: {
        readonly instant: 0;
        readonly fast: 150;
        readonly normal: 200;
        readonly slow: 300;
        readonly slower: 500;
    };
    readonly easing: {
        readonly linear: "linear";
        readonly in: "cubic-bezier(0.4, 0, 1, 1)";
        readonly out: "cubic-bezier(0, 0, 0.2, 1)";
        readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    };
};
export declare const sizes: {
    readonly icon: {
        readonly xs: 12;
        readonly sm: 16;
        readonly md: 24;
        readonly lg: 32;
        readonly xl: 48;
    };
    readonly height: {
        readonly sm: 32;
        readonly md: 40;
        readonly lg: 48;
    };
    readonly avatar: {
        readonly xs: 24;
        readonly sm: 32;
        readonly md: 40;
        readonly lg: 48;
        readonly xl: 64;
    };
};
export declare const zIndex: {
    readonly dropdown: 1000;
    readonly sticky: 1020;
    readonly fixed: 1030;
    readonly modalBackdrop: 1040;
    readonly modal: 1050;
    readonly popover: 1060;
    readonly tooltip: 1070;
    readonly toast: 1080;
};
export declare const tokens: {
    readonly colors: {
        readonly white: "#ffffff";
        readonly black: "#000000";
        readonly transparent: "transparent";
        readonly neutral: {
            readonly 0: "#ffffff";
            readonly 50: "#f9fafb";
            readonly 100: "#f3f4f6";
            readonly 200: "#e5e7eb";
            readonly 300: "#d1d5db";
            readonly 400: "#9ca3af";
            readonly 500: "#6b7280";
            readonly 600: "#4b5563";
            readonly 700: "#374151";
            readonly 800: "#1f2937";
            readonly 900: "#111827";
        };
        readonly primary: {
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 200: "#bfdbfe";
            readonly 300: "#93c5fd";
            readonly 400: "#60a5fa";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
            readonly 800: "#1e40af";
            readonly 900: "#1e3a8a";
        };
        readonly success: {
            readonly 50: "#ecfdf5";
            readonly 100: "#d1fae5";
            readonly 500: "#10b981";
            readonly 600: "#059669";
            readonly 700: "#047857";
        };
        readonly warning: {
            readonly 50: "#fffbeb";
            readonly 100: "#fef3c7";
            readonly 500: "#f59e0b";
            readonly 600: "#d97706";
            readonly 700: "#b45309";
        };
        readonly danger: {
            readonly 50: "#fef2f2";
            readonly 100: "#fee2e2";
            readonly 500: "#ef4444";
            readonly 600: "#dc2626";
            readonly 700: "#b91c1c";
        };
        readonly info: {
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
        };
    };
    readonly spacing: {
        readonly 0: "0";
        readonly 1: "0.25rem";
        readonly 2: "0.5rem";
        readonly 3: "0.75rem";
        readonly 4: "1rem";
        readonly 5: "1.25rem";
        readonly 6: "1.5rem";
        readonly 8: "2rem";
        readonly 10: "2.5rem";
        readonly 12: "3rem";
        readonly 16: "4rem";
        readonly xs: "0.25rem";
        readonly sm: "0.5rem";
        readonly md: "1rem";
        readonly lg: "1.5rem";
        readonly xl: "2rem";
        readonly '2xl': "2.5rem";
        readonly '3xl': "3rem";
    };
    readonly typography: {
        readonly fonts: {
            readonly sans: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
            readonly mono: "JetBrains Mono, \"Fira Code\", Consolas, \"Liberation Mono\", monospace";
        };
        readonly sizes: {
            readonly xs: "0.75rem";
            readonly sm: "0.875rem";
            readonly base: "1rem";
            readonly lg: "1.125rem";
            readonly xl: "1.25rem";
            readonly '2xl': "1.5rem";
            readonly '3xl': "1.875rem";
            readonly '4xl': "2.25rem";
        };
        readonly weights: {
            readonly normal: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
        };
        readonly lineHeights: {
            readonly tight: 1.25;
            readonly snug: 1.375;
            readonly normal: 1.5;
            readonly relaxed: 1.625;
            readonly loose: 2;
        };
    };
    readonly shadows: {
        readonly xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        readonly sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";
        readonly base: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)";
        readonly md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)";
        readonly lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
        readonly xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
        readonly focus: "0 0 0 3px rgba(59, 130, 246, 0.35)";
        readonly dropdown: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
        readonly modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
        readonly button: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";
    };
    readonly radii: {
        readonly none: "0";
        readonly xs: "0.125rem";
        readonly sm: "0.25rem";
        readonly base: "0.375rem";
        readonly md: "0.5rem";
        readonly lg: "0.75rem";
        readonly xl: "1rem";
        readonly '2xl': "1.5rem";
        readonly full: "9999px";
        readonly button: "0.375rem";
        readonly input: "0.375rem";
        readonly card: "0.75rem";
        readonly modal: "1rem";
    };
    readonly animations: {
        readonly duration: {
            readonly instant: 0;
            readonly fast: 150;
            readonly normal: 200;
            readonly slow: 300;
            readonly slower: 500;
        };
        readonly easing: {
            readonly linear: "linear";
            readonly in: "cubic-bezier(0.4, 0, 1, 1)";
            readonly out: "cubic-bezier(0, 0, 0.2, 1)";
            readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        };
    };
    readonly sizes: {
        readonly icon: {
            readonly xs: 12;
            readonly sm: 16;
            readonly md: 24;
            readonly lg: 32;
            readonly xl: 48;
        };
        readonly height: {
            readonly sm: 32;
            readonly md: 40;
            readonly lg: 48;
        };
        readonly avatar: {
            readonly xs: 24;
            readonly sm: 32;
            readonly md: 40;
            readonly lg: 48;
            readonly xl: 64;
        };
    };
    readonly zIndex: {
        readonly dropdown: 1000;
        readonly sticky: 1020;
        readonly fixed: 1030;
        readonly modalBackdrop: 1040;
        readonly modal: 1050;
        readonly popover: 1060;
        readonly tooltip: 1070;
        readonly toast: 1080;
    };
};
export type ColorTokens = typeof colors;
export type SpacingTokens = typeof spacing;
export type TypographyTokens = typeof typography;
export type ShadowTokens = typeof shadows;
export type RadiiTokens = typeof radii;
export type AnimationTokens = typeof animations;
export type SizeTokens = typeof sizes;
export type ZIndexTokens = typeof zIndex;
export type Tokens = typeof tokens;
export type ColorScale = keyof typeof colors.neutral;
export type SpacingValue = keyof typeof spacing;
export type FontSize = keyof typeof typography.sizes;
export type FontWeight = keyof typeof typography.weights;
export type Shadow = keyof typeof shadows;
export type Radius = keyof typeof radii;
export default tokens;
//# sourceMappingURL=tokens.d.ts.map