// ============================================================
// STANDARD SLIDE RENDERER
// Renders a standard modular slide (header + body + footer)
// ============================================================
// TODO: Implement in Phase 4

const tokens = require('../tokens/design');
const helpers = require('../utils/helpers');
const { renderHeader } = require('./headers');
const { renderBody } = require('./bodies');

/**
 * Render the footer section of a standard slide
 */
function renderFooter(slide, data, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const y = tokens.slide.height - tokens.spacing.padY - 0.25;
  
  // Footer line
  slide.addShape(slide.pptx?.ShapeType?.rect || 'rect', {
    x: tokens.spacing.padX,
    y: y - 0.1,
    w: tokens.slide.contentWidth,
    h: 0.01,
    fill: { color: themeConfig.line },
  });
  
  // Left text (course name)
  if (data.courseName) {
    slide.addText(data.courseName, {
      x: tokens.spacing.padX,
      y: y,
      w: 5,
      h: 0.25,
      fontSize: tokens.fontSizes.fine,
      fontFace: tokens.fonts.body,
      color: themeConfig.textMuted,
      align: 'left',
    });
  }
  
  // Right text (slide number)
  if (data.slideNumber) {
    slide.addText(`${data.slideNumber}`, {
      x: tokens.slide.width - tokens.spacing.padX - 1,
      y: y,
      w: 1,
      h: 0.25,
      fontSize: tokens.fontSizes.fine,
      fontFace: tokens.fonts.body,
      color: themeConfig.textMuted,
      align: 'right',
    });
  }
}

/**
 * Render a standard modular slide
 * @param {Object} pptx - PptxGenJS instance
 * @param {Object} slideData - Full slide specification
 * @param {string} theme - Theme name
 * @returns {Object} The created slide
 */
function renderStandardSlide(pptx, slideData, theme = 'light') {
  // TODO: Full implementation in Phase 4
  console.log('[STANDARD] Placeholder - will be implemented in Phase 4');
  
  const slide = pptx.addSlide();
  const themeConfig = tokens.getTheme(theme);
  
  // Set background
  slide.background = { color: themeConfig.background };
  
  // For now, just show placeholder
  slide.addText(`Standard Slide - Phase 4\nHeader: ${slideData.header?.type || 'none'}\nBody: ${slideData.body?.type || 'none'}`, {
    x: tokens.spacing.padX,
    y: 3,
    w: tokens.slide.contentWidth,
    h: 1.5,
    fontSize: 20,
    fontFace: tokens.fonts.body,
    color: themeConfig.text,
    align: 'center',
  });
  
  // Render footer
  renderFooter(slide, {
    courseName: slideData.meta?.courseName || '',
    slideNumber: slideData.slideNumber || '',
  }, theme);
  
  return slide;
}

module.exports = {
  renderStandardSlide,
  renderFooter,
};
