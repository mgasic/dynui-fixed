export declare const colors: {
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
export type ColorScale = typeof colors.primary;
export type NeutralScale = typeof colors.neutral;
export type SemanticColorMap = typeof colors.semantic;
export type Colors = typeof colors;
//# sourceMappingURL=colors.d.ts.map