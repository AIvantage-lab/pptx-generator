// ============================================================
// STANDARD SLIDE RENDERER
// Combines header + body + footer into complete slides
// Design: "Calm Academic Tech" by AIvantage
// ============================================================

const tokens = require('../tokens/design');
const { renderHeader } = require('./headers');
const { renderBody } = require('./bodies');

// Layout constants
const W = tokens.slide.width;   // 13.333"
const H = tokens.slide.height;  // 7.5"
const X = tokens.spacing.padX;  // 0.61"
const Y = tokens.spacing.padY;  // 0.53"

/**
 * Render the footer section
 * @param {Object} slide - The slide object
 * @param {Object} data - { courseName: string, slideNumber: number }
 * @param {string} theme - Theme name
 */
function renderFooter(slide, data, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  
  // Footer line
  slide.addShape('rect', {
    x: X,
    y: H - 0.55,
    w: W - (X * 2),
    h: 0.015,
    fill: { color: themeConfig.line },
  });
  
  // Course name (left)
  if (data.courseName) {
    slide.addText(data.courseName, {
      x: X,
      y: H - 0.45,
      w: W * 0.7,
      h: 0.35,
      fontSize: 11,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'middle',
    });
  }
  
  // Slide number (right)
  if (data.slideNumber !== undefined) {
    const num = String(data.slideNumber).padStart(2, '0');
    slide.addText(num, {
      x: W - X - 0.6,
      y: H - 0.45,
      w: 0.6,
      h: 0.35,
      fontSize: 14,
      fontFace: tokens.fonts.title,
      color: tokens.colors.brand600,
      bold: true,
      align: 'right',
      valign: 'middle',
    });
  }
}

/**
 * Render a complete standard slide
 * 
 * @param {Object} pptx - PptxGenJS instance
 * @param {Object} data - Slide configuration:
 *   - headerType: 'title_only' | 'title_subtitle' | 'title_meta'
 *   - bodyType: 'bullet_list' | 'numbered_list' | 'paragraph' | 'quote' |
 *               'single_card' | 'two_cards' | 'three_cards' | 'four_cards' |
 *               'two_columns' | 'three_columns' | 'comparison_table' | 'bibliography_list'
 *   - header: { title, subtitle?, meta? }
 *   - body: { items?, text?, cards?, columns?, etc. }
 *   - footer: { courseName?, slideNumber? }
 * @param {string} theme - 'light', 'darkNeutral', or 'darkBrand'
 * @returns {Object} The created slide
 */
function renderStandardSlide(pptx, data = {}, theme = 'light') {
  const slide = pptx.addSlide();
  const themeConfig = tokens.getTheme(theme);
  
  // Set background
  slide.background = { color: themeConfig.background };
  
  // Determine types with defaults
  const headerType = data.headerType || 'title_only';
  const bodyType = data.bodyType || 'bullet_list';
  
  // Prepare header data
  const headerData = data.header || {
    title: data.title,
    subtitle: data.subtitle,
    meta: data.meta,
  };
  
  // Prepare body data
  const bodyData = data.body || {
    items: data.items || data.bullets,
    text: data.text || data.content,
    cards: data.cards,
    columns: data.columns,
    quote: data.quote,
    author: data.author,
    source: data.source,
    references: data.references,
    left: data.left,
    right: data.right,
  };
  
  // Prepare footer data
  const footerData = data.footer || {
    courseName: data.courseName,
    slideNumber: data.slideNumber,
  };
  
  // 1. Render Header (returns Y position for body)
  const bodyStartY = renderHeader(slide, headerType, headerData, theme);
  
  // 2. Render Body
  renderBody(slide, bodyType, bodyData, bodyStartY, theme);
  
  // 3. Render Footer
  renderFooter(slide, footerData, theme);
  
  return slide;
}

module.exports = { 
  renderStandardSlide,
  renderFooter,
};
