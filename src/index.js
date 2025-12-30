// ============================================================
// PPTX GENERATOR - Main Server
// AIvantage PowerPoint Generation Microservice
// ============================================================

const express = require('express');
const cors = require('cors');
const PptxGenJS = require('pptxgenjs');

// Import design tokens
const tokens = require('./tokens/design');

// Import renderers
const { renderCover } = require('./renderers/cover');
const { renderChapterDivider } = require('./renderers/chapter');
const { renderClosing } = require('./renderers/closing');
const { renderStandardSlide } = require('./renderers/standard');

// ============================================================
// SERVER CONFIGURATION
// ============================================================

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow large JSON payloads

// ============================================================
// HEALTH CHECK ENDPOINT
// ============================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'pptx-generator',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ============================================================
// MAIN GENERATION ENDPOINT
// ============================================================

app.post('/generate', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Extract request data
    const { meta, slides } = req.body;
    
    // Validate input
    if (!slides || !Array.isArray(slides)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: slides array is required'
      });
    }

    console.log(`[GENERATE] Starting generation for ${slides.length} slides...`);

    // ============================================================
    // CREATE PRESENTATION
    // ============================================================
    
    const pptx = new PptxGenJS();
    
    // Set presentation properties
    pptx.layout = 'LAYOUT_WIDE'; // 13.333" x 7.5" (widescreen 16:9)
    pptx.title = meta?.title || 'AIvantage Presentation';
    pptx.author = meta?.author || 'AIvantage';
    pptx.subject = meta?.course_name || 'Academic Presentation';
    
    // ============================================================
    // PROCESS EACH SLIDE
    // ============================================================
    
    slides.forEach((slideData, index) => {
      console.log(`[GENERATE] Processing slide ${index + 1}: ${slideData.special || slideData.type || 'standard'}`);
      
      // Determine slide type and render accordingly
      if (slideData.special === 'cover') {
        // Render premium cover slide
        renderCover(pptx, slideData.data || slideData, slideData.theme || 'darkNeutral');
      } 
      else if (slideData.special === 'chapter-divider') {
        // Render premium chapter divider slide
        renderChapterDivider(pptx, slideData.data || slideData, slideData.theme || 'darkBrand');
      }
      else if (slideData.special === 'closing') {
        // Render premium closing slide
        renderClosing(pptx, slideData.data || slideData, slideData.theme || 'light');
      }
      else {
        // Render standard modular slide (header + body + footer)
        renderStandardSlide(pptx, slideData.data || slideData, slideData.theme || 'light');
      }
    });

    // ============================================================
    // GENERATE OUTPUT
    // ============================================================
    
    // Generate as base64
    const pptxBase64 = await pptx.write({ outputType: 'base64' });
    
    const endTime = Date.now();
    const generationTime = endTime - startTime;
    
    console.log(`[GENERATE] Completed in ${generationTime}ms`);

    // Return the file
    res.json({
      success: true,
      data: {
        file: pptxBase64,
        filename: meta?.filename || `presentation_${Date.now()}.pptx`,
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        slides_count: slides.length,
        generation_time_ms: generationTime
      }
    });

  } catch (error) {
    console.error('[GENERATE] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// ============================================================
// ERROR HANDLING
// ============================================================

app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎓 AIvantage PPTX Generator                            ║
║   Server running on port ${PORT}                           ║
║                                                           ║
║   Endpoints:                                              ║
║   • GET  /health   - Health check                         ║
║   • POST /generate - Generate PowerPoint                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
