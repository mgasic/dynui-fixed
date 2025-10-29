export declare const tokens: {
    readonly colors: {
        readonly primary: {
            readonly 50: "#E7F1FF";
            readonly 100: "#C7DFFF";
            readonly 200: "#A5C9FF";
            readonly 300: "#7FAEFF";
            readonly 400: "#5A94FF";
            readonly 500: "#3878FF";
            readonly 600: "#1F5ED9";
            readonly 700: "#0F47A8";
            readonly 800: "#083079";
            readonly 900: "#041B4D";
        };
        readonly neutral: {
            readonly 50: "#F7FAFC";
            readonly 100: "#EDF2F7";
            readonly 200: "#E2E8F0";
            readonly 300: "#CBD5E0";
            readonly 400: "#A0AEC0";
            readonly 500: "#718096";
            readonly 600: "#4A5568";
            readonly 700: "#2D3748";
            readonly 800: "#1A202C";
            readonly 900: "#0F172A";
        };
        readonly semantic: {
            readonly success: {
                readonly 100: "#DEF7EC";
                readonly 500: "#10B981";
                readonly 700: "#047857";
            };
            readonly warning: {
                readonly 100: "#FEF3C7";
                readonly 500: "#F59E0B";
                readonly 700: "#B45309";
            };
            readonly danger: {
                readonly 100: "#FEE2E2";
                readonly 500: "#EF4444";
                readonly 700: "#B91C1C";
            };
            readonly info: {
                readonly 100: "#DBEAFE";
                readonly 500: "#3B82F6";
                readonly 700: "#1D4ED8";
            };
        };
    };
    readonly spacing: {
        readonly '0': "0rem";
        readonly '0.5': "0.125rem";
        readonly '1': "0.25rem";
        readonly '1.5': "0.375rem";
        readonly '2': "0.5rem";
        readonly '3': "0.75rem";
        readonly '4': "1rem";
        readonly '6': "1.5rem";
        readonly '8': "2rem";
        readonly '12': "3rem";
        readonly '16': "4rem";
        readonly none: "0rem";
        readonly xxs: "0.125rem";
        readonly xs: "0.25rem";
        readonly sm: "0.5rem";
        readonly md: "1rem";
        readonly lg: "1.5rem";
        readonly xl: "2rem";
        readonly '2xl': "3rem";
        readonly '3xl': "4rem";
    };
    readonly typography: {
        readonly fonts: {
            readonly sans: readonly ["Inter", "-apple-system", "BlinkMacSystemFont", "\"Segoe UI\"", "system-ui", "sans-serif"];
            readonly mono: readonly ["JetBrains Mono", "Fira Code", "Menlo", "Monaco", "Consolas", "monospace"];
        };
        readonly sizes: {
            readonly xs: {
                readonly fontSize: "0.75rem";
                readonly lineHeight: "1.125rem";
            };
            readonly sm: {
                readonly fontSize: "0.875rem";
                readonly lineHeight: "1.25rem";
            };
            readonly md: {
                readonly fontSize: "1rem";
                readonly lineHeight: "1.5rem";
            };
            readonly lg: {
                readonly fontSize: "1.125rem";
                readonly lineHeight: "1.75rem";
            };
            readonly xl: {
                readonly fontSize: "1.25rem";
                readonly lineHeight: "1.75rem";
            };
            readonly '2xl': {
                readonly fontSize: "1.5rem";
                readonly lineHeight: "2rem";
            };
            readonly '3xl': {
                readonly fontSize: "1.875rem";
                readonly lineHeight: "2.25rem";
            };
        };
        readonly weights: {
            readonly regular: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
        };
        readonly lineHeights: {
            readonly tight: 1.2;
            readonly snug: 1.35;
            readonly normal: 1.5;
            readonly relaxed: 1.65;
            readonly loose: 1.8;
        };
    };
    readonly radii: {
        readonly none: "0px";
        readonly xs: "2px";
        readonly sm: "4px";
        readonly md: "8px";
        readonly lg: "12px";
        readonly xl: "16px";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly xs: "0 1px 2px 0 rgb(15 23 42 / 0.08)";
        readonly sm: "0 1px 3px 0 rgb(15 23 42 / 0.12)";
        readonly md: "0 4px 6px -1px rgb(15 23 42 / 0.15)";
        readonly lg: "0 10px 15px -3px rgb(15 23 42 / 0.2)";
    };
};
export type Tokens = typeof tokens;
//# sourceMappingURL=token-map.d.ts.map