// ============================================================
// BODY RENDERERS
// Renders the body/content section of standard slides
// Design: "Calm Academic Tech" by AIvantage
// ============================================================

const tokens = require('../tokens/design');

// Layout constants
const W = tokens.slide.width;   // 13.333"
const H = tokens.slide.height;  // 7.5"
const X = tokens.spacing.padX;  // 0.61"
const Y = tokens.spacing.padY;  // 0.53"
const G = tokens.spacing.gutter; // 0.17"

// Body zone dimensions
const BODY_WIDTH = W - (X * 2);
const FOOTER_HEIGHT = 0.6;

// ============================================================
// LIST BODIES
// ============================================================

/**
 * Render body type: bullet_list
 * Vertical list with bullet points
 * @param {Object} slide - The slide object
 * @param {Object} data - { items: [string] }
 * @param {number} startY - Y position to start rendering
 * @param {string} theme - Theme name
 */
function renderBodyBulletList(slide, data, startY, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const items = data.items || data.bullets || [];
  
  if (items.length === 0) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  const itemHeight = Math.min(0.7, availableHeight / items.length);
  
  items.forEach((item, index) => {
    const itemY = startY + (index * itemHeight);
    
    // Bullet point (teal dot)
    slide.addShape('ellipse', {
      x: X,
      y: itemY + 0.22,
      w: 0.12,
      h: 0.12,
      fill: { color: tokens.colors.brand600 },
    });
    
    // Item text
    slide.addText(item, {
      x: X + 0.3,
      y: itemY,
      w: BODY_WIDTH - 0.3,
      h: itemHeight,
      fontSize: 20,
      fontFace: tokens.fonts.body,
      color: themeConfig.text,
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  });
}

/**
 * Render body type: numbered_list
 * Vertical list with numbers
 * @param {Object} slide - The slide object
 * @param {Object} data - { items: [string] }
 * @param {number} startY - Y position to start rendering
 * @param {string} theme - Theme name
 */
function renderBodyNumberedList(slide, data, startY, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const items = data.items || [];
  
  if (items.length === 0) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  const itemHeight = Math.min(0.75, availableHeight / items.length);
  
  items.forEach((item, index) => {
    const itemY = startY + (index * itemHeight);
    const num = String(index + 1).padStart(2, '0');
    
    // Number badge
    slide.addShape('roundRect', {
      x: X,
      y: itemY + 0.05,
      w: 0.45,
      h: 0.4,
      fill: { color: tokens.colors.brand600 },
      rectRadius: 0.08,
    });
    
    // Number text
    slide.addText(num, {
      x: X,
      y: itemY + 0.05,
      w: 0.45,
      h: 0.4,
      fontSize: 14,
      fontFace: tokens.fonts.title,
      color: 'FFFFFF',
      bold: true,
      align: 'center',
      valign: 'middle',
    });
    
    // Item text
    slide.addText(item, {
      x: X + 0.6,
      y: itemY,
      w: BODY_WIDTH - 0.6,
      h: itemHeight,
      fontSize: 20,
      fontFace: tokens.fonts.body,
      color: themeConfig.text,
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  });
}

// ============================================================
// TEXT BODIES
// ============================================================

/**
 * Render body type: paragraph
 * Large block of text
 * @param {Object} slide - The slide object
 * @param {Object} data - { text: string }
 * @param {number} startY - Y position to start rendering
 * @param {string} theme - Theme name
 */
function renderBodyParagraph(slide, data, startY, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const text = data.text || data.content || '';
  
  if (!text) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  
  // Calculate font size based on text length
  let fontSize = 22;
  if (text.length > 500) fontSize = 18;
  if (text.length > 800) fontSize = 16;
  
  slide.addText(text, {
    x: X,
    y: startY,
    w: BODY_WIDTH,
    h: availableHeight,
    fontSize: fontSize,
    fontFace: tokens.fonts.body,
    color: themeConfig.text,
    align: 'left',
    valign: 'top',
    wrap: true,
    lineSpacing: 26,
  });
}

/**
 * Render body type: quote
 * Styled quotation with author
 * @param {Object} slide - The slide object
 * @param {Object} data - { quote: string, author: string, source?: string }
 * @param {number} startY - Y position to start rendering
 * @param {string} theme - Theme name
 */
function renderBodyQuote(slide, data, startY, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const quote = data.quote || data.text || '';
  const author = data.author || '';
  const source = data.source || '';
  
  if (!quote) return;
  
  // Vertical accent line
  slide.addShape('rect', {
    x: X,
    y: startY + 0.3,
    w: 0.06,
    h: 2.2,
    fill: { color: tokens.colors.brand600 },
  });
  
  // Quote text (italic, larger)
  let fontSize = 28;
  if (quote.length > 200) fontSize = 24;
  if (quote.length > 350) fontSize = 20;
  
  slide.addText(`"${quote}"`, {
    x: X + 0.4,
    y: startY + 0.2,
    w: BODY_WIDTH - 0.5,
    h: 2.5,
    fontSize: fontSize,
    fontFace: tokens.fonts.body,
    color: themeConfig.text,
    italic: true,
    align: 'left',
    valign: 'top',
    wrap: true,
    lineSpacing: 32,
  });
  
  // Author attribution
  if (author) {
    const attribution = source ? `— ${author}, ${source}` : `— ${author}`;
    
    slide.addText(attribution, {
      x: X + 0.4,
      y: startY + 2.9,
      w: BODY_WIDTH - 0.5,
      h: 0.5,
      fontSize: 18,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'top',
    });
  }
}

// ============================================================
// CARD BODIES
// ============================================================

/**
 * Helper function to render a single card
 */
function _renderCard(slide, card, x, y, w, h, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  
  // Card background
  slide.addShape('roundRect', {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: themeConfig.cardBg },
    line: { color: themeConfig.line, pt: 1 },
    rectRadius: 0.1,
  });
  
  // Card icon/number (optional)
  if (card.icon || card.number) {
    const iconText = card.icon || card.number;
    slide.addText(iconText, {
      x: x + 0.25,
      y: y + 0.2,
      w: 0.5,
      h: 0.5,
      fontSize: 24,
      fontFace: tokens.fonts.title,
      color: tokens.colors.brand600,
      bold: true,
      align: 'left',
      valign: 'top',
    });
  }
  
  // Card title
  if (card.title) {
    const titleY = (card.icon || card.number) ? y + 0.75 : y + 0.25;
    slide.addText(card.title, {
      x: x + 0.25,
      y: titleY,
      w: w - 0.5,
      h: 0.5,
      fontSize: 18,
      fontFace: tokens.fonts.title,
      color: themeConfig.text,
      bold: true,
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  }
  
  // Card description
  if (card.description || card.content) {
    const descY = (card.icon || card.number) ? y + 1.3 : (card.title ? y + 0.8 : y + 0.25);
    slide.addText(card.description || card.content, {
      x: x + 0.25,
      y: descY,
      w: w - 0.5,
      h: h - descY + y - 0.2,
      fontSize: 14,
      fontFace: tokens.fonts.body,
      color: theme === 'light' ? tokens.colors.muted : '9CA3AF',
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  }
}

/**
 * Render body type: single_card
 * One large centered card
 */
function renderBodySingleCard(slide, data, startY, theme = 'light') {
  const card = data.card || data.cards?.[0] || data;
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  
  const cardW = BODY_WIDTH * 0.7;
  const cardH = Math.min(3.5, availableHeight - 0.3);
  const cardX = X + (BODY_WIDTH - cardW) / 2;
  
  _renderCard(slide, card, cardX, startY + 0.15, cardW, cardH, theme);
}

/**
 * Render body type: two_cards
 * Two cards side by side
 */
function renderBodyTwoCards(slide, data, startY, theme = 'light') {
  const cards = data.cards || [];
  if (cards.length === 0) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  const cardW = (BODY_WIDTH - G) / 2;
  const cardH = Math.min(3.8, availableHeight - 0.3);
  
  cards.slice(0, 2).forEach((card, index) => {
    const cardX = X + (index * (cardW + G));
    _renderCard(slide, card, cardX, startY + 0.15, cardW, cardH, theme);
  });
}

/**
 * Render body type: three_cards
 * Three cards in a row
 */
function renderBodyThreeCards(slide, data, startY, theme = 'light') {
  const cards = data.cards || [];
  if (cards.length === 0) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  const cardW = (BODY_WIDTH - (G * 2)) / 3;
  const cardH = Math.min(3.8, availableHeight - 0.3);
  
  cards.slice(0, 3).forEach((card, index) => {
    const cardX = X + (index * (cardW + G));
    _renderCard(slide, card, cardX, startY + 0.15, cardW, cardH, theme);
  });
}

/**
 * Render body type: four_cards
 * Four cards in 2x2 grid
 */
function renderBodyFourCards(slide, data, startY, theme = 'light') {
  const cards = data.cards || [];
  if (cards.length === 0) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  const cardW = (BODY_WIDTH - G) / 2;
  const cardH = (availableHeight - G - 0.3) / 2;
  
  cards.slice(0, 4).forEach((card, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const cardX = X + (col * (cardW + G));
    const cardY = startY + 0.15 + (row * (cardH + G));
    _renderCard(slide, card, cardX, cardY, cardW, cardH, theme);
  });
}

// ============================================================
// COLUMN BODIES
// ============================================================

/**
 * Render body type: two_columns
 * Two columns of content (text or lists)
 * @param {Object} data - { columns: [{ title?, content: string | items: [] }] }
 */
function renderBodyTwoColumns(slide, data, startY, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const columns = data.columns || [];
  if (columns.length === 0) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  const colW = (BODY_WIDTH - G) / 2;
  
  columns.slice(0, 2).forEach((col, index) => {
    const colX = X + (index * (colW + G));
    let currentY = startY;
    
    // Column title (optional)
    if (col.title) {
      slide.addText(col.title, {
        x: colX,
        y: currentY,
        w: colW,
        h: 0.5,
        fontSize: 20,
        fontFace: tokens.fonts.title,
        color: themeConfig.text,
        bold: true,
        align: 'left',
        valign: 'top',
      });
      currentY += 0.55;
    }
    
    // Column content (text or list)
    if (col.content || col.text) {
      slide.addText(col.content || col.text, {
        x: colX,
        y: currentY,
        w: colW,
        h: availableHeight - (currentY - startY),
        fontSize: 16,
        fontFace: tokens.fonts.body,
        color: themeConfig.text,
        align: 'left',
        valign: 'top',
        wrap: true,
      });
    } else if (col.items && Array.isArray(col.items)) {
      // Render as mini bullet list
      col.items.forEach((item, itemIndex) => {
        const itemY = currentY + (itemIndex * 0.55);
        
        // Bullet
        slide.addShape('ellipse', {
          x: colX,
          y: itemY + 0.15,
          w: 0.1,
          h: 0.1,
          fill: { color: tokens.colors.brand600 },
        });
        
        // Text
        slide.addText(item, {
          x: colX + 0.22,
          y: itemY,
          w: colW - 0.25,
          h: 0.5,
          fontSize: 16,
          fontFace: tokens.fonts.body,
          color: themeConfig.text,
          align: 'left',
          valign: 'top',
          wrap: true,
        });
      });
    }
  });
}

/**
 * Render body type: three_columns
 * Three columns of content
 */
function renderBodyThreeColumns(slide, data, startY, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const columns = data.columns || [];
  if (columns.length === 0) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  const colW = (BODY_WIDTH - (G * 2)) / 3;
  
  columns.slice(0, 3).forEach((col, index) => {
    const colX = X + (index * (colW + G));
    let currentY = startY;
    
    // Column title (optional)
    if (col.title) {
      slide.addText(col.title, {
        x: colX,
        y: currentY,
        w: colW,
        h: 0.45,
        fontSize: 18,
        fontFace: tokens.fonts.title,
        color: themeConfig.text,
        bold: true,
        align: 'left',
        valign: 'top',
      });
      currentY += 0.5;
    }
    
    // Column content
    if (col.content || col.text) {
      slide.addText(col.content || col.text, {
        x: colX,
        y: currentY,
        w: colW,
        h: availableHeight - (currentY - startY),
        fontSize: 14,
        fontFace: tokens.fonts.body,
        color: themeConfig.text,
        align: 'left',
        valign: 'top',
        wrap: true,
      });
    } else if (col.items && Array.isArray(col.items)) {
      col.items.forEach((item, itemIndex) => {
        const itemY = currentY + (itemIndex * 0.5);
        
        slide.addShape('ellipse', {
          x: colX,
          y: itemY + 0.12,
          w: 0.08,
          h: 0.08,
          fill: { color: tokens.colors.brand600 },
        });
        
        slide.addText(item, {
          x: colX + 0.18,
          y: itemY,
          w: colW - 0.2,
          h: 0.45,
          fontSize: 14,
          fontFace: tokens.fonts.body,
          color: themeConfig.text,
          align: 'left',
          valign: 'top',
          wrap: true,
        });
      });
    }
  });
}

// ============================================================
// SPECIAL BODIES
// ============================================================

/**
 * Render body type: comparison_table
 * Side-by-side comparison (vs table)
 * @param {Object} data - { left: { title, items[] }, right: { title, items[] } }
 */
function renderBodyComparisonTable(slide, data, startY, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const left = data.left || data.columns?.[0] || {};
  const right = data.right || data.columns?.[1] || {};
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  const colW = (BODY_WIDTH - G - 0.6) / 2;
  
  // VS divider circle
  const centerX = X + colW + 0.15;
  slide.addShape('ellipse', {
    x: centerX,
    y: startY + 0.1,
    w: 0.6,
    h: 0.6,
    fill: { color: tokens.colors.brand600 },
  });
  
  slide.addText('VS', {
    x: centerX,
    y: startY + 0.1,
    w: 0.6,
    h: 0.6,
    fontSize: 14,
    fontFace: tokens.fonts.title,
    color: 'FFFFFF',
    bold: true,
    align: 'center',
    valign: 'middle',
  });
  
  // Left column
  if (left.title) {
    slide.addText(left.title, {
      x: X,
      y: startY,
      w: colW,
      h: 0.5,
      fontSize: 22,
      fontFace: tokens.fonts.title,
      color: themeConfig.text,
      bold: true,
      align: 'left',
      valign: 'top',
    });
  }
  
  if (left.items && Array.isArray(left.items)) {
    left.items.forEach((item, index) => {
      const itemY = startY + 0.65 + (index * 0.55);
      
      slide.addShape('ellipse', {
        x: X,
        y: itemY + 0.15,
        w: 0.1,
        h: 0.1,
        fill: { color: tokens.colors.brand600 },
      });
      
      slide.addText(item, {
        x: X + 0.22,
        y: itemY,
        w: colW - 0.25,
        h: 0.5,
        fontSize: 16,
        fontFace: tokens.fonts.body,
        color: themeConfig.text,
        align: 'left',
        valign: 'top',
        wrap: true,
      });
    });
  }
  
  // Right column
  const rightX = X + colW + G + 0.6;
  
  if (right.title) {
    slide.addText(right.title, {
      x: rightX,
      y: startY,
      w: colW,
      h: 0.5,
      fontSize: 22,
      fontFace: tokens.fonts.title,
      color: themeConfig.text,
      bold: true,
      align: 'left',
      valign: 'top',
    });
  }
  
  if (right.items && Array.isArray(right.items)) {
    right.items.forEach((item, index) => {
      const itemY = startY + 0.65 + (index * 0.55);
      
      slide.addShape('ellipse', {
        x: rightX,
        y: itemY + 0.15,
        w: 0.1,
        h: 0.1,
        fill: { color: tokens.colors.brand200 },
      });
      
      slide.addText(item, {
        x: rightX + 0.22,
        y: itemY,
        w: colW - 0.25,
        h: 0.5,
        fontSize: 16,
        fontFace: tokens.fonts.body,
        color: themeConfig.text,
        align: 'left',
        valign: 'top',
        wrap: true,
      });
    });
  }
}

/**
 * Render body type: bibliography_list
 * APA-style references list
 * @param {Object} data - { references: [string] }
 */
function renderBodyBibliographyList(slide, data, startY, theme = 'light') {
  const themeConfig = tokens.getTheme(theme);
  const references = data.references || data.items || [];
  
  if (references.length === 0) return;
  
  const availableHeight = H - startY - FOOTER_HEIGHT - Y;
  
  // Calculate optimal spacing
  let fontSize = 14;
  let lineHeight = 0.55;
  if (references.length > 8) {
    fontSize = 12;
    lineHeight = 0.48;
  }
  if (references.length > 12) {
    fontSize = 11;
    lineHeight = 0.42;
  }
  
  references.forEach((ref, index) => {
    const refY = startY + (index * lineHeight);
    
    // APA hanging indent style
    slide.addText(ref, {
      x: X + 0.4,
      y: refY,
      w: BODY_WIDTH - 0.4,
      h: lineHeight,
      fontSize: fontSize,
      fontFace: tokens.fonts.body,
      color: themeConfig.text,
      align: 'left',
      valign: 'top',
      wrap: true,
    });
    
    // Small decorative dash
    slide.addText('—', {
      x: X,
      y: refY,
      w: 0.35,
      h: lineHeight,
      fontSize: fontSize,
      fontFace: tokens.fonts.body,
      color: tokens.colors.brand600,
      align: 'left',
      valign: 'top',
    });
  });
}

// ============================================================
// MAIN ROUTER
// ============================================================

/**
 * Main body renderer - routes to specific type
 */
function renderBody(slide, bodyType, data, startY, theme = 'light') {
  switch (bodyType) {
    // Lists
    case 'bullet_list':
      return renderBodyBulletList(slide, data, startY, theme);
    case 'numbered_list':
      return renderBodyNumberedList(slide, data, startY, theme);
    
    // Text
    case 'paragraph':
      return renderBodyParagraph(slide, data, startY, theme);
    case 'quote':
      return renderBodyQuote(slide, data, startY, theme);
    
    // Cards
    case 'single_card':
      return renderBodySingleCard(slide, data, startY, theme);
    case 'two_cards':
      return renderBodyTwoCards(slide, data, startY, theme);
    case 'three_cards':
      return renderBodyThreeCards(slide, data, startY, theme);
    case 'four_cards':
      return renderBodyFourCards(slide, data, startY, theme);
    
    // Columns
    case 'two_columns':
      return renderBodyTwoColumns(slide, data, startY, theme);
    case 'three_columns':
      return renderBodyThreeColumns(slide, data, startY, theme);
    
    // Special
    case 'comparison_table':
      return renderBodyComparisonTable(slide, data, startY, theme);
    case 'bibliography_list':
      return renderBodyBibliographyList(slide, data, startY, theme);
    
    default:
      console.warn(`[BODY] Unknown body type: ${bodyType}, defaulting to bullet_list`);
      return renderBodyBulletList(slide, data, startY, theme);
  }
}

module.exports = {
  renderBody,
  renderBodyBulletList,
  renderBodyNumberedList,
  renderBodyParagraph,
  renderBodyQuote,
  renderBodySingleCard,
  renderBodyTwoCards,
  renderBodyThreeCards,
  renderBodyFourCards,
  renderBodyTwoColumns,
  renderBodyThreeColumns,
  renderBodyComparisonTable,
  renderBodyBibliographyList,
};
