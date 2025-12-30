// ============================================================
// HEADER RENDERERS
// Renders the header section of standard slides
// Design: "Calm Academic Tech" by AIvantage
// ============================================================

const tokens = require('../tokens/design');

// Layout constants
const W = tokens.slide.width;
const X = tokens.spacing.padX;
const Y = tokens.spacing.padY;

/**
 * Render header type: title_only
 * Just a large title, no subtitle
 * @returns {number} The Y position where body should start
 */
function renderHeaderTitleOnly(slide, data, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  
  if (data.title) {
    const titleLength = data.title.length;
    let fontSize = 44;
    if (titleLength > 50) fontSize = 38;
    if (titleLength > 80) fontSize = 32;
    
    slide.addText(data.title, {
      x: X,
      y: Y,
      w: W - (X * 2),
      h: 0.9,
      fontSize: fontSize,
      fontFace: tokens.fonts.title,
      color: themeConfig.text,
      bold: true,
      align: 'left',
      valign: 'middle',
    });
  }
  
  // Return Y position for body to start
  return Y + 1.1;
}

/**
 * Render header type: title_subtitle
 * Title with a subtitle line below
 * @returns {number} The Y position where body should start
 */
function renderHeaderTitleSubtitle(slide, data, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  
  // Title
  if (data.title) {
    const titleLength = data.title.length;
    let fontSize = 40;
    if (titleLength > 50) fontSize = 34;
    if (titleLength > 80) fontSize = 28;
    
    slide.addText(data.title, {
      x: X,
      y: Y,
      w: W - (X * 2),
      h: 0.75,
      fontSize: fontSize,
      fontFace: tokens.fonts.title,
      color: themeConfig.text,
      bold: true,
      align: 'left',
      valign: 'middle',
    });
  }
  
  // Subtitle
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: X,
      y: Y + 0.8,
      w: W - (X * 2),
      h: 0.5,
      fontSize: 20,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'top',
    });
  }
  
  // Accent line below header
  slide.addShape(slide.pptx?.ShapeType?.rect || 'rect', {
    x: X,
    y: Y + 1.4,
    w: 1.5,
    h: 0.03,
    fill: { color: tokens.colors.brand600 },
  });
  
  // Return Y position for body to start
  return Y + 1.65;
}

/**
 * Render header type: title_meta
 * Title with metadata badges (unit, session type, duration, etc.)
 * @returns {number} The Y position where body should start
 */
function renderHeaderTitleMeta(slide, data, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  
  // Title
  if (data.title) {
    const titleLength = data.title.length;
    let fontSize = 38;
    if (titleLength > 50) fontSize = 32;
    if (titleLength > 80) fontSize = 26;
    
    slide.addText(data.title, {
      x: X,
      y: Y,
      w: W - (X * 2) - 3,
      h: 0.7,
      fontSize: fontSize,
      fontFace: tokens.fonts.title,
      color: themeConfig.text,
      bold: true,
      align: 'left',
      valign: 'middle',
    });
  }
  
  // Meta badges (top right)
  if (data.meta && Array.isArray(data.meta)) {
    let badgeX = W - X;
    
    data.meta.slice(0, 3).reverse().forEach((metaItem) => {
      const badgeW = Math.max(1.2, metaItem.length * 0.1 + 0.4);
      badgeX -= badgeW + 0.1;
      
      // Badge background
      slide.addShape(slide.pptx?.ShapeType?.roundRect || 'roundRect', {
        x: badgeX,
        y: Y + 0.1,
        w: badgeW,
        h: 0.38,
        fill: { color: theme === 'light' ? tokens.colors.brand200 : '1E2A2D' },
        line: { color: theme === 'light' ? tokens.colors.line : '3A4A4D', pt: 1 },
        rectRadius: 0.15,
      });
      
      // Badge text
      slide.addText(metaItem, {
        x: badgeX,
        y: Y + 0.1,
        w: badgeW,
        h: 0.38,
        fontSize: 11,
        fontFace: tokens.fonts.body,
        color: theme === 'light' ? tokens.colors.ink : tokens.colors.inkOnDark,
        bold: true,
        align: 'center',
        valign: 'middle',
      });
    });
  }
  
  // Subtitle (if provided)
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: X,
      y: Y + 0.75,
      w: W - (X * 2),
      h: 0.45,
      fontSize: 18,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'top',
    });
  }
  
  // Accent line
  slide.addShape(slide.pptx?.ShapeType?.rect || 'rect', {
    x: X,
    y: Y + 1.35,
    w: 1.5,
    h: 0.03,
    fill: { color: tokens.colors.brand600 },
  });
  
  // Return Y position for body to start
  return Y + 1.6;
}

/**
 * Main header renderer - routes to specific type
 * @returns {number} The Y position where body should start
 */
function renderHeader(slide, headerType, data, theme = 'light') {
  switch (headerType) {
    case 'title_only':
      return renderHeaderTitleOnly(slide, data, theme);
    case 'title_subtitle':
      return renderHeaderTitleSubtitle(slide, data, theme);
    case 'title_meta':
      return renderHeaderTitleMeta(slide, data, theme);
    default:
      return renderHeaderTitleOnly(slide, data, theme);
  }
}

module.exports = {
  renderHeader,
  renderHeaderTitleOnly,
  renderHeaderTitleSubtitle,
  renderHeaderTitleMeta,
};
