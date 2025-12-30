// ============================================================
// COVER SLIDE RENDERER
// Renders the premium cover/title slide
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
 * Render a premium cover slide
 * 
 * @param {Object} pptx - PptxGenJS instance
 * @param {Object} data - Slide data:
 *   - kicker: string (e.g., "SESIÓN 1", "UNIDAD 1")
 *   - title: string (main title)
 *   - subtitle: string (optional subtitle)
 *   - ghostNumber: string (e.g., "01", "1") - decorative number
 *   - metaRight: array of strings (optional metadata lines)
 *   - courseName: string (for footer)
 *   - program: string (optional program name)
 * @param {string} theme - 'darkNeutral', 'darkBrand', or 'light'
 * @returns {Object} The created slide
 */
function renderCover(pptx, data = {}, theme = 'darkNeutral') {
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
  // 2. GHOST NUMBER (top-right, decorative)
  // ============================================================
  if (data.ghostNumber) {
    const ghostX = W - X - 4.5;
    const ghostY = Y - 0.3;
    
    slide.addText(data.ghostNumber, {
      x: ghostX,
      y: ghostY,
      w: 4.5,
      h: 3.5,
      fontSize: 240,
      fontFace: tokens.fonts.title,
      color: themeConfig.ghost,
      bold: true,
      align: 'right',
      valign: 'top',
    });
  }
  
  // ============================================================
  // 3. MAIN TITLE (bottom-left)
  // ============================================================
  if (data.title) {
    // Calculate optimal font size based on title length
    const titleLength = data.title.length;
    let titleFontSize = 72;
    if (titleLength > 40) titleFontSize = 60;
    if (titleLength > 60) titleFontSize = 52;
    if (titleLength > 80) titleFontSize = 44;
    
    const titleY = H - Y - 2.6;
    const titleW = W * 0.62;
    
    slide.addText(data.title, {
      x: X,
      y: titleY,
      w: titleW,
      h: 1.5,
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
  // 4. SUBTITLE (below title)
  // ============================================================
  if (data.subtitle) {
    const subtitleY = H - Y - 1.0;
    const subtitleW = W * 0.62;
    
    // Calculate optimal font size
    const subtitleLength = data.subtitle.length;
    let subtitleFontSize = 26;
    if (subtitleLength > 80) subtitleFontSize = 22;
    if (subtitleLength > 120) subtitleFontSize = 20;
    
    slide.addText(data.subtitle, {
      x: X,
      y: subtitleY,
      w: subtitleW,
      h: 0.7,
      fontSize: subtitleFontSize,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  }
  
  // ============================================================
  // 5. ACCENT LINE (vertical, near meta block)
  // ============================================================
  if (data.metaRight && data.metaRight.length > 0) {
    const lineX = W - X - 4.2;
    const lineY = H - Y - 2.0;
    const lineH = 1.6;
    
    // Vertical accent line
    slide.addShape(pptx.ShapeType.rect, {
      x: lineX,
      y: lineY,
      w: 0.03,
      h: lineH,
      fill: { color: tokens.colors.brand600 },
      line: { color: tokens.colors.brand600, pt: 0 },
    });
  }
  
  // ============================================================
  // 6. META BLOCK (bottom-right, optional)
  // ============================================================
  if (data.metaRight && data.metaRight.length > 0) {
    const metaX = W - X - 4.0;
    const metaY = H - Y - 1.9;
    const metaW = 3.8;
    
    // Join meta lines with line breaks
    const metaText = data.metaRight.join('\n');
    
    slide.addText(metaText, {
      x: metaX,
      y: metaY,
      w: metaW,
      h: 1.5,
      fontSize: 16,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'top',
      lineSpacing: 24,
    });
  }
  
  // ============================================================
  // 7. BOTTOM DECORATION (subtle line)
  // ============================================================
  // Add a subtle horizontal line at the bottom for visual polish
  slide.addShape(pptx.ShapeType.rect, {
    x: X,
    y: H - 0.15,
    w: W - (X * 2),
    h: 0.02,
    fill: { color: themeConfig.line },
    line: { color: themeConfig.line, pt: 0 },
  });
  
  return slide;
}

module.exports = { renderCover };
