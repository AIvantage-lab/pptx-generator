// ============================================================
// CLOSING SLIDE RENDERER
// Renders the premium closing/thank you slide
// Design: "Calm Academic Tech" by AIvantage
// ============================================================

const tokens = require('../tokens/design');
const helpers = require('../utils/helpers');

// Slide dimensions (constants for readability)
const W = tokens.slide.width;   // 13.333"
const H = tokens.slide.height;  // 7.5"
const X = tokens.spacing.padX;  // 0.61"
const Y = tokens.spacing.padY;  // 0.53"
const G = tokens.spacing.gutter; // 0.17"

/**
 * Render a premium closing slide
 * 
 * @param {Object} pptx - PptxGenJS instance
 * @param {Object} data - Slide data:
 *   - headline: string (e.g., "¿Preguntas?", "Gracias")
 *   - subhead: string (optional subtitle)
 *   - cards: array of { title, description } (optional, max 2)
 *   - courseName: string (for footer)
 *   - contactInfo: string (optional email/contact)
 * @param {string} theme - 'light', 'darkNeutral', or 'darkBrand'
 * @returns {Object} The created slide
 */
function renderClosing(pptx, data = {}, theme = 'light') {
  const slide = pptx.addSlide();
  const themeConfig = tokens.getTheme(theme);
  
  // Set background
  slide.background = { color: themeConfig.background };
  
  // ============================================================
  // 1. MAIN HEADLINE (centered, large)
  // ============================================================
  if (data.headline) {
    // Calculate optimal font size based on headline length
    const headlineLength = data.headline.length;
    let headlineFontSize = 84;
    if (headlineLength > 20) headlineFontSize = 72;
    if (headlineLength > 35) headlineFontSize = 60;
    
    slide.addText(data.headline, {
      x: X,
      y: 1.8,
      w: W - (X * 2),
      h: 1.3,
      fontSize: headlineFontSize,
      fontFace: tokens.fonts.title,
      color: themeConfig.text,
      bold: true,
      align: 'center',
      valign: 'middle',
    });
  }
  
  // ============================================================
  // 2. SUBHEAD (below headline)
  // ============================================================
  if (data.subhead) {
    slide.addText(data.subhead, {
      x: X,
      y: 3.2,
      w: W - (X * 2),
      h: 0.5,
      fontSize: 22,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'center',
      valign: 'top',
    });
  }
  
  // ============================================================
  // 3. ACCENT LINE (below subhead)
  // ============================================================
  const lineY = data.subhead ? 3.85 : 3.3;
  slide.addShape(pptx.ShapeType.rect, {
    x: (W / 2) - 1.2,
    y: lineY,
    w: 2.4,
    h: 0.04,
    fill: { color: tokens.colors.brand600 },
    line: { color: tokens.colors.brand600, pt: 0 },
  });
  
  // ============================================================
  // 4. INFO CARDS (optional, bottom section)
  // ============================================================
  if (data.cards && data.cards.length > 0) {
    const cardY = 4.4;
    const cardH = 2.0;
    const contentWidth = W - (X * 2);
    const cardCount = Math.min(data.cards.length, 2);
    const cardW = (contentWidth - G) / 2;
    
    data.cards.slice(0, 2).forEach((card, index) => {
      const cardX = X + (index * (cardW + G));
      
      // Card background
      slide.addShape(pptx.ShapeType.roundRect, {
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        fill: { color: themeConfig.cardBg },
        line: { color: themeConfig.line, pt: 1 },
        rectRadius: 0.08,
      });
      
      // Card title
      if (card.title) {
        slide.addText(card.title, {
          x: cardX + 0.25,
          y: cardY + 0.25,
          w: cardW - 0.5,
          h: 0.45,
          fontSize: 20,
          fontFace: tokens.fonts.title,
          color: themeConfig.text,
          bold: true,
          align: 'left',
          valign: 'top',
        });
      }
      
      // Card description
      if (card.description) {
        slide.addText(card.description, {
          x: cardX + 0.25,
          y: cardY + 0.75,
          w: cardW - 0.5,
          h: cardH - 1.0,
          fontSize: 16,
          fontFace: tokens.fonts.body,
          color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
          align: 'left',
          valign: 'top',
          wrap: true,
        });
      }
    });
  }
  
  // ============================================================
  // 5. CONTACT INFO (optional, above footer)
  // ============================================================
  if (data.contactInfo) {
    slide.addText(data.contactInfo, {
      x: X,
      y: H - Y - 0.8,
      w: W - (X * 2),
      h: 0.4,
      fontSize: 14,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'center',
      valign: 'middle',
    });
  }
  
  // ============================================================
  // 6. FOOTER LINE
  // ============================================================
  slide.addShape(pptx.ShapeType.rect, {
    x: X,
    y: H - 0.15,
    w: W - (X * 2),
    h: 0.02,
    fill: { color: themeConfig.line },
    line: { color: themeConfig.line, pt: 0 },
  });
  
  // ============================================================
  // 7. FOOTER TEXT (course name)
  // ============================================================
  if (data.courseName) {
    slide.addText(data.courseName, {
      x: X,
      y: H - Y,
      w: W - (X * 2),
      h: 0.3,
      fontSize: 12,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'center',
      valign: 'top',
    });
  }
  
  // ============================================================
  // 8. DECORATIVE CORNER ACCENTS
  // ============================================================
  // Top-left corner accent
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 0.15,
    h: 1.2,
    fill: { color: tokens.colors.brand600 },
    line: { color: tokens.colors.brand600, pt: 0 },
  });
  
  // Bottom-right corner accent
  slide.addShape(pptx.ShapeType.rect, {
    x: W - 0.15,
    y: H - 1.2,
    w: 0.15,
    h: 1.2,
    fill: { color: tokens.colors.brand200 },
    line: { color: tokens.colors.brand200, pt: 0 },
  });
  
  return slide;
}

module.exports = { renderClosing };
