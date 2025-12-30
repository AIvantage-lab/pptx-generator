// ============================================================
// HELPER UTILITIES
// Common functions used across renderers
// ============================================================

const tokens = require('../tokens/design');

/**
 * Escape special characters for PowerPoint text
 */
function escapeText(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Truncate text to a maximum length with ellipsis
 */
function truncate(str, maxLength) {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}

/**
 * Format slide number (e.g., "01", "12")
 */
function formatSlideNumber(num, padLength = 2) {
  return String(num).padStart(padLength, '0');
}

/**
 * Calculate text height estimate based on content and font size
 * This is approximate - PptxGenJS doesn't provide exact measurements
 */
function estimateTextHeight(text, fontSize, lineHeight = 1.35, maxWidth = 10) {
  const charsPerLine = Math.floor(maxWidth * 10); // Rough estimate
  const lines = Math.ceil(text.length / charsPerLine);
  const fontHeightIn = tokens.ptToIn(fontSize);
  return lines * fontHeightIn * lineHeight;
}

/**
 * Split long text into chunks for multiple slides
 */
function chunkText(text, maxChars = 500) {
  if (!text || text.length <= maxChars) return [text];
  
  const chunks = [];
  let remaining = text;
  
  while (remaining.length > 0) {
    if (remaining.length <= maxChars) {
      chunks.push(remaining);
      break;
    }
    
    // Find a good break point (sentence or paragraph)
    let breakPoint = remaining.lastIndexOf('. ', maxChars);
    if (breakPoint === -1 || breakPoint < maxChars * 0.5) {
      breakPoint = remaining.lastIndexOf(' ', maxChars);
    }
    if (breakPoint === -1) {
      breakPoint = maxChars;
    }
    
    chunks.push(remaining.substring(0, breakPoint + 1).trim());
    remaining = remaining.substring(breakPoint + 1).trim();
  }
  
  return chunks;
}

/**
 * Split array into chunks of specified size
 */
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Calculate optimal font size based on text length
 */
function getOptimalFontSize(text, baseFontSize, maxChars = 50) {
  if (!text) return baseFontSize;
  
  const length = text.length;
  if (length <= maxChars) return baseFontSize;
  if (length <= maxChars * 1.5) return Math.floor(baseFontSize * 0.85);
  if (length <= maxChars * 2) return Math.floor(baseFontSize * 0.75);
  return Math.floor(baseFontSize * 0.65);
}

/**
 * Generate a standard pill/badge shape options
 */
function getPillOptions(x, y, w, h, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  
  return {
    x,
    y,
    w,
    h,
    fill: { color: theme === 'light' ? tokens.colors.brand200 : '1A2A2D' },
    line: { color: themeConfig.line, pt: 1 },
    rectRadius: 0.35, // Fully rounded
  };
}

/**
 * Generate standard card shape options
 */
function getCardOptions(x, y, w, h, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  
  return {
    x,
    y,
    w,
    h,
    fill: { color: themeConfig.cardBg },
    line: { color: themeConfig.line, pt: 1 },
    rectRadius: tokens.shapes.radiusLarge,
  };
}

/**
 * Generate accent line options
 */
function getAccentLineOptions(x, y, w, h, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  
  return {
    x,
    y,
    w,
    h,
    fill: { color: themeConfig.accent },
    line: { color: themeConfig.accent, pt: 0 },
  };
}

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  escapeText,
  truncate,
  formatSlideNumber,
  estimateTextHeight,
  chunkText,
  chunkArray,
  getOptimalFontSize,
  getPillOptions,
  getCardOptions,
  getAccentLineOptions,
};
