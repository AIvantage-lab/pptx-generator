// ============================================================
// DESIGN TOKENS
// AIvantage "Calm Academic Tech" Design System
// ============================================================

// ============================================================
// COLORS
// ============================================================

const colors = {
  // === TEXT COLORS (never use brand colors for text) ===
  ink: '14181B',           // Primary text on light backgrounds
  muted: '6E6E6E',         // Secondary text, captions
  inkOnDark: 'E6E6E6',     // Primary text on dark backgrounds
  white: 'FFFFFF',         // For large titles on dark if needed

  // === BRAND COLORS (for backgrounds, shapes, accents only) ===
  brand900: '02404A',      // Rich Black - dark brand background
  brand600: '598E8D',      // Cadet Blue - accents, lines, pills
  brand200: 'C6E2DC',      // Columbia Blue - highlights, soft fills

  // === NEUTRAL BACKGROUNDS ===
  bg: 'FFFFFF',            // Primary background
  bg2: 'FBFBFB',           // Secondary background (cards)
  darkNeutral: '0F1517',   // Dark neutral background

  // === LINES & BORDERS ===
  line: 'E6E6E6',          // Light mode borders (10% black)
  lineSoft: 'F0F0F0',      // Extra light borders (6% black)
  lineOnDark: '2A3A3D',    // Dark mode borders

  // === GHOST ELEMENTS (for decorative numbers) ===
  ghostOnDark: '1D2A2D',   // Subtle on dark backgrounds
  ghostOnLight: 'E9EEF0',  // Subtle on light backgrounds
};

// ============================================================
// TYPOGRAPHY
// ============================================================

const fonts = {
  // Primary fonts (with fallbacks)
  title: 'Segoe UI',       // For headings (Poppins fallback to Segoe UI)
  body: 'Segoe UI',        // For body text (Roboto fallback to Segoe UI)
  
  // Fallback chain (for reference)
  fallback: 'Calibri',
};

// Font sizes in points (for PptxGenJS)
const fontSizes = {
  // Headings
  h1: 60,          // Main slide title
  h1Large: 76,     // Cover title
  h1XLarge: 84,    // Closing headline
  
  // Subtitles
  h2: 30,          // Subtitle
  h2Large: 34,     // Cover subtitle
  
  // Body text
  body: 26,        // Standard body
  bodySmall: 22,   // Smaller body text
  
  // Small text
  small: 18,       // Metadata, footer
  fine: 14,        // Very small text
  
  // Ghost numbers
  ghost: 220,      // Decorative large numbers
  ghostLarge: 280, // Extra large ghost
};

// Font weights (for reference, applied as bold: true/false)
const fontWeights = {
  regular: false,
  semibold: true,  // 600
  bold: true,      // 700
};

// ============================================================
// SPACING (in inches for PptxGenJS)
// ============================================================

const spacing = {
  // Slide padding
  padX: 0.61,      // 88px / 144
  padY: 0.53,      // 76px / 144
  
  // Gutters
  gutter: 0.17,    // 24px / 144 - space between elements
  gutterSmall: 0.08, // 12px / 144
  
  // Element spacing
  s1: 0.08,        // 12px - tight spacing
  s2: 0.17,        // 24px - normal spacing  
  s3: 0.33,        // 48px - loose spacing
};

// ============================================================
// SLIDE DIMENSIONS (in inches)
// ============================================================

const slide = {
  width: 13.333,   // Widescreen 16:9
  height: 7.5,
  
  // Content area (inside padding)
  contentWidth: 13.333 - (spacing.padX * 2),  // ~12.11"
  contentHeight: 7.5 - (spacing.padY * 2),     // ~6.44"
};

// ============================================================
// SHAPES
// ============================================================

const shapes = {
  // Border radius (visual reference - PptxGenJS uses rectRadius)
  radiusLarge: 0.08,   // 12px for cards
  radiusMedium: 0.07,  // 10px for medium elements
  radiusSmall: 0.06,   // 8px for small elements
  radiusPill: 0.35,    // Fully rounded pills
  
  // Line thickness
  lineThick: 0.04,     // 6px accent lines
  lineMedium: 0.02,    // 3px standard lines
  lineThin: 0.01,      // 1-2px hairlines
};

// ============================================================
// THEMES (predefined combinations)
// ============================================================

const themes = {
  light: {
    background: colors.bg,
    text: colors.ink,
    textMuted: colors.muted,
    line: colors.line,
    ghost: colors.ghostOnLight,
    cardBg: colors.bg2,
    accent: colors.brand600,
  },
  
  darkNeutral: {
    background: colors.darkNeutral,
    text: colors.inkOnDark,
    textMuted: '9CA3AF',  // Lighter muted for dark bg
    line: colors.lineOnDark,
    ghost: colors.ghostOnDark,
    cardBg: '1A2023',
    accent: colors.brand600,
  },
  
  darkBrand: {
    background: colors.brand900,
    text: colors.inkOnDark,
    textMuted: '9CA3AF',
    line: '0D3038',
    ghost: '053540',
    cardBg: '03353E',
    accent: colors.brand200,
  },
};

// ============================================================
// HELPERS
// ============================================================

/**
 * Convert pixels to inches (based on 144 PPI for PowerPoint)
 */
function pxToIn(px) {
  return px / 144;
}

/**
 * Convert points to inches
 */
function ptToIn(pt) {
  return pt / 72;
}

/**
 * Get theme configuration by name
 */
function getTheme(themeName) {
  return themes[themeName] || themes.light;
}

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  spacing,
  slide,
  shapes,
  themes,
  getTheme,
  pxToIn,
  ptToIn,
};
