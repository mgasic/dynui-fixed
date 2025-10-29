'use strict';

// src/colors.ts
var colors = {
  primary: {
    50: "#E7F1FF",
    100: "#C7DFFF",
    200: "#A5C9FF",
    300: "#7FAEFF",
    400: "#5A94FF",
    500: "#3878FF",
    600: "#1F5ED9",
    700: "#0F47A8",
    800: "#083079",
    900: "#041B4D"
  },
  neutral: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#0F172A"
  },
  semantic: {
    success: {
      100: "#DEF7EC",
      500: "#10B981",
      700: "#047857"
    },
    warning: {
      100: "#FEF3C7",
      500: "#F59E0B",
      700: "#B45309"
    },
    danger: {
      100: "#FEE2E2",
      500: "#EF4444",
      700: "#B91C1C"
    },
    info: {
      100: "#DBEAFE",
      500: "#3B82F6",
      700: "#1D4ED8"
    }
  }
};

// src/spacing.ts
var namedSpacing = {
  none: "0rem",
  xxs: "0.125rem",
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem"
};
var legacySpacing = {
  "0": namedSpacing.none,
  "0.5": namedSpacing.xxs,
  "1": namedSpacing.xs,
  "1.5": "0.375rem",
  "2": namedSpacing.sm,
  "3": "0.75rem",
  "4": namedSpacing.md,
  "6": namedSpacing.lg,
  "8": namedSpacing.xl,
  "12": namedSpacing["2xl"],
  "16": namedSpacing["3xl"]
};
var spacing = {
  ...namedSpacing,
  ...legacySpacing
};

// src/typography.ts
var typography = {
  fonts: {
    sans: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "system-ui",
      "sans-serif"
    ],
    mono: ["JetBrains Mono", "Fira Code", "Menlo", "Monaco", "Consolas", "monospace"]
  },
  sizes: {
    xs: { fontSize: "0.75rem", lineHeight: "1.125rem" },
    sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
    md: { fontSize: "1rem", lineHeight: "1.5rem" },
    lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
    xl: { fontSize: "1.25rem", lineHeight: "1.75rem" },
    "2xl": { fontSize: "1.5rem", lineHeight: "2rem" },
    "3xl": { fontSize: "1.875rem", lineHeight: "2.25rem" }
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeights: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.65,
    loose: 1.8
  }
};

// src/radii.ts
var radii = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px"
};

// src/shadows.ts
var shadows = {
  xs: "0 1px 2px 0 rgb(15 23 42 / 0.08)",
  sm: "0 1px 3px 0 rgb(15 23 42 / 0.12)",
  md: "0 4px 6px -1px rgb(15 23 42 / 0.15)",
  lg: "0 10px 15px -3px rgb(15 23 42 / 0.2)"
};

// src/token-map.ts
var tokens = {
  colors,
  spacing,
  typography,
  radii,
  shadows
};

// src/css-generator.ts
function sanitizeTokenKey(key) {
  return key.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function normalizeValue(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return String(value);
}
function toCSSVars(record, prefix = []) {
  return Object.entries(record).flatMap(([key, value]) => {
    const sanitizedKey = sanitizeTokenKey(key);
    const nextPrefix = [...prefix, sanitizedKey];
    if (Array.isArray(value)) {
      const cssVar2 = `--dyn-${nextPrefix.join("-")}`;
      return `${cssVar2}: ${normalizeValue(value)};`;
    }
    if (value !== null && typeof value === "object") {
      return toCSSVars(value, nextPrefix);
    }
    const cssVar = `--dyn-${nextPrefix.join("-")}`;
    return `${cssVar}: ${normalizeValue(value)};`;
  });
}
var prefixMap = {
  colors: "color",
  spacing: "spacing",
  typography: "typography",
  radii: "radius",
  shadows: "shadow"
};
function buildDesignTokenCSS() {
  const lines = Object.entries(tokens).flatMap(([sectionKey, sectionValue]) => {
    const mappedPrefix = prefixMap[sectionKey] ?? sectionKey;
    return toCSSVars(sectionValue, [mappedPrefix]);
  });
  return [":root {", ...lines.map((line) => `  ${line}`), "}"].join("\n");
}

exports.buildDesignTokenCSS = buildDesignTokenCSS;
exports.colors = colors;
exports.radii = radii;
exports.shadows = shadows;
exports.spacing = spacing;
exports.tokens = tokens;
exports.typography = typography;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map