# AIvantage PPTX Generator

Microservice for generating professional PowerPoint presentations using the AIvantage "Calm Academic Tech" design system.

## Overview

This service receives slide specifications in JSON format and returns native PowerPoint (.pptx) files generated with PptxGenJS.

## API Endpoints

### Health Check
```
GET /health
```
Returns service status.

### Generate Presentation
```
POST /generate
Content-Type: application/json
```

**Request Body:**
```json
{
  "meta": {
    "title": "Presentation Title",
    "author": "Author Name",
    "course_name": "Course Name",
    "filename": "output.pptx"
  },
  "slides": [
    {
      "special": "cover",
      "theme": "darkNeutral",
      "data": {
        "kicker": "SESSION 1",
        "title": "Introduction to Business",
        "subtitle": "Basic Concepts"
      }
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "file": "<base64-encoded-pptx>",
    "filename": "output.pptx",
    "mimeType": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "slides_count": 1,
    "generation_time_ms": 150
  }
}
```

## Slide Types

### Special Slides (Premium)
- `cover` - Title/cover slide
- `chapter-divider` - Section divider
- `closing` - Thank you/questions slide

### Standard Slides (Modular)
Standard slides use a header + body + footer structure:

**Headers:**
- `title_only` - Just title
- `title_subtitle` - Title with subtitle
- `title_meta` - Title with metadata badges

**Bodies:**
- `bullet_list` - Bulleted list
- `numbered_list` - Numbered list
- `paragraph` - Text paragraph
- `quote` - Highlighted quote
- `single_card` - One card
- `two_cards` - Two cards side by side
- `three_cards` - Three cards horizontal
- `four_cards` - 2x2 card grid
- `two_columns` - Two column layout
- `three_columns` - Three column layout
- `comparison_table` - Comparison table
- `bibliography_list` - APA citation list

## Themes

- `light` - White background, dark text
- `darkNeutral` - Dark neutral background
- `darkBrand` - AIvantage brand dark (teal)

## Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Development with auto-reload
npm run dev
```

## Deployment

This service is designed to be deployed on Railway.

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Node.js project
3. The service will start on the assigned port

## Design System

Colors, fonts, and spacing are defined in `src/tokens/design.js` following the AIvantage "Calm Academic Tech" design system.

## License

MIT - AIvantage
