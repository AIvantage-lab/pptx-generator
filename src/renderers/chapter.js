// ============================================================
// CHAPTER DIVIDER SLIDE RENDERER
// Renders the premium chapter/section divider slide
// Design: "Calm Academic Tech" by AIvantage
// ============================================================

const tokens = require('../tokens/design');
const helpers = require('../utils/helpers');

// Slide dimensions (constants for readability)
const W = tokens.slide.width;   // 13.333"
const H = tokens.slide.height;  // 7.5"
const X = tokens.spacing.padX;  // 0.61"
const Y = tokens.spacing.padY;  // 0.53"

/**
 * Render a premium chapter divider slide
 * 
 * @param {Object} pptx - PptxGenJS instance
 * @param {Object} data - Slide data:
 *   - kicker: string (e.g., "CAPÍTULO 2", "UNIDAD 3")
 *   - chapterNumber: string (e.g., "02", "2") - decorative number
 *   - chapterTitle: string (main chapter title)
 *   - subtitle: string (optional subtitle/description)
 *   - rightNote: string (optional note on the right side)
 * @param {string} theme - 'darkNeutral', 'darkBrand', or 'light'
 * @returns {Object} The created slide
 */
function renderChapterDivider(pptx, data = {}, theme = 'darkBrand') {
  const slide = pptx.addSlide();
  const themeConfig = tokens.getTheme(theme);
  
  // Set background
  slide.background = { color: themeConfig.background };
  
  // ============================================================
  // 1. KICKER PILL (top-left)
  // ============================================================
  if (data.kicker) {
    const pillW = Math.max(1.8, data.kicker.length * 0.12 + 0.5);
    const pillH = 0.42;
    
    // Pill background
    slide.addShape(pptx.ShapeType.roundRect, {
      x: X,
      y: Y,
      w: pillW,
      h: pillH,
      fill: { color: theme === 'light' ? tokens.colors.brand200 : '1E2A2D' },
      line: { 
        color: theme === 'light' ? tokens.colors.line : '3A4A4D', 
        pt: 1 
      },
      rectRadius: 0.2,
    });
    
    // Pill text
    slide.addText(data.kicker.toUpperCase(), {
      x: X,
      y: Y,
      w: pillW,
      h: pillH,
      fontSize: 14,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.ink : tokens.colors.inkOnDark,
      bold: true,
      align: 'center',
      valign: 'middle',
    });
  }
  
  // ============================================================
  // 2. GHOST NUMBER (top-right, decorative - larger than cover)
  // ============================================================
  if (data.chapterNumber) {
    const ghostX = W - X - 5.3;
    const ghostY = Y - 0.4;
    
    slide.addText(data.chapterNumber, {
      x: ghostX,
      y: ghostY,
      w: 5.3,
      h: 4.0,
      fontSize: 280,
      fontFace: tokens.fonts.title,
      color: themeConfig.ghost,
      bold: true,
      align: 'right',
      valign: 'top',
    });
  }
  
  // ============================================================
  // 3. VERTICAL ACCENT LINE (right side, near note)
  // ============================================================
  if (data.rightNote) {
    const lineX = W - X - 4.5;
    const lineY = H * 0.38;
    const lineH = 1.4;
    
    slide.addShape(pptx.ShapeType.rect, {
      x: lineX,
      y: lineY,
      w: 0.04,
      h: lineH,
      fill: { color: tokens.colors.brand600 },
      line: { color: tokens.colors.brand600, pt: 0 },
    });
  }
  
  // ============================================================
  // 4. RIGHT NOTE (optional contextual note)
  // ============================================================
  if (data.rightNote) {
    const noteX = W - X - 4.3;
    const noteY = H * 0.38;
    const noteW = 4.1;
    
    slide.addText(data.rightNote, {
      x: noteX,
      y: noteY,
      w: noteW,
      h: 1.4,
      fontSize: 16,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  }
  
  // ============================================================
  // 5. CHAPTER TITLE (bottom-left, large)
  // ============================================================
  if (data.chapterTitle) {
    // Calculate optimal font size based on title length
    const titleLength = data.chapterTitle.length;
    let titleFontSize = 64;
    if (titleLength > 30) titleFontSize = 56;
    if (titleLength > 50) titleFontSize = 48;
    if (titleLength > 70) titleFontSize = 40;
    
    const titleY = H - Y - 2.3;
    const titleW = W * 0.64;
    
    slide.addText(data.chapterTitle, {
      x: X,
      y: titleY,
      w: titleW,
      h: 1.2,
      fontSize: titleFontSize,
      fontFace: tokens.fonts.title,
      color: themeConfig.text,
      bold: true,
      align: 'left',
      valign: 'bottom',
      wrap: true,
    });
  }
  
  // ============================================================
  // 6. SUBTITLE (below chapter title)
  // ============================================================
  if (data.subtitle) {
    const subtitleY = H - Y - 1.0;
    const subtitleW = W * 0.64;
    
    // Calculate optimal font size
    const subtitleLength = data.subtitle.length;
    let subtitleFontSize = 24;
    if (subtitleLength > 80) subtitleFontSize = 20;
    if (subtitleLength > 120) subtitleFontSize = 18;
    
    slide.addText(data.subtitle, {
      x: X,
      y: subtitleY,
      w: subtitleW,
      h: 0.6,
      fontSize: subtitleFontSize,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  }
  
  // ============================================================
  // 7. DECORATIVE LINES (subtle horizontal accents)
  // ============================================================
  // Top decorative line
  slide.addShape(pptx.ShapeType.rect, {
    x: X,
    y: 0.1,
    w: 2.5,
    h: 0.02,
    fill: { color: tokens.colors.brand600 },
    line: { color: tokens.colors.brand600, pt: 0 },
  });
  
  // Bottom decorative line
  slide.addShape(pptx.ShapeType.rect, {
    x: X,
    y: H - 0.12,
    w: W - (X * 2),
    h: 0.02,
    fill: { color: themeConfig.line },
    line: { color: themeConfig.line, pt: 0 },
  });
  
  return slide;
}

module.exports = { renderChapterDivider };
