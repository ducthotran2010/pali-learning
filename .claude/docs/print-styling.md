# Print Styling Configuration

This document outlines the print-specific CSS configurations applied to the Pāḷi learning site for optimized printing of grammar materials.

## Overview

Print styles are configured in `assets/css/custom.css` within a `@media print` query and are automatically included via `_includes/head.html`.

## Page Layout

### Page Margins
- **Setting**: `@page { margin: 0.5cm; }`
- **Purpose**: Minimal margins to maximize printable area while maintaining readability

### Content Container
- **Padding/Margins**: Removed (set to 0)
- **Max-width**: 100% (full page width utilization)

## Hidden Elements

The following elements are hidden in print view using `display: none !important`:

- `.site-header` - Site navigation header
- `.site-footer` - Site footer with description
- `.filter-btn` - Filter buttons
- `.content-filters` - Filter button container
- `.filter-buttons` - Alternative filter button container
- `img` - All images
- `.language-description` - Page description text

## Visible Elements

### Page Title
- **Element**: `.language-header h1`
- **Display**: Block (shown in print)
- **Margin**: 0 (compact spacing)
- **Page break**: Avoided after title

### Table of Contents (TOC)
- **Element**: `.language-nav`
- **Display**: Block with numbered list
- **Font size**: 8pt
- **Layout**: 2-column layout
- **List style**: Decimal numbering
- **Padding**: 1.2rem left indent
- **Links**: No text decoration, black color
- **Column gap**: 1rem
- **Margins**: 0 0 0.5rem 0

## Table Styling

### Overall Table
- **Font size**: 10pt
- **Margins**: 0.5rem vertical
- **Width**: 100%
- **Layout**: Fixed (`table-layout: fixed`)
- **Page breaks**: Auto inside tables, avoid inside rows

### Table Cells (th, td)
- **Padding**: 0.25rem 0.35rem (with `!important`)
- **Font size**: 9pt
- **Border**: 0.5pt solid #666

### Column Widths (3-column tables)
- **Column 1** (th:first-child, td:first-child): 6% - for case numbers
- **Column 2** (th:nth-child(2), td:nth-child(2)): 47% - singular forms
- **Column 3** (th:nth-child(3), td:nth-child(3)): 47% - plural forms

### Table Headers
- **Background**: #f0f0f0
- **Color adjustment**: Exact (ensures background prints)

## Heading Styles

### Auto-numbering for H2
- **Counter**: Section counter on `.language-main`
- **Increment**: Each h2 increments counter
- **Display**: Counter number + ". " prefix via `::before` pseudo-element

### Heading Sizes
- **h1**: 16pt
- **h2**: 13pt
- **h3**: 11pt
- **Margins**: 0.5rem top, 0.3rem bottom
- **Page breaks**: Avoided after headings

## Content Elements

### MathJax
- **Font size**: 0.9em (relative to container)

### Vocabulary Columns
- **Column gap**: 1rem
- **List margins**: 0.3rem vertical
- **List padding**: 1.2rem left
- **List items**: 9pt font, 0.2rem margins

### Blockquotes
- **Font size**: 8pt
- **Margins**: 0.3rem vertical
- **Padding**: 0.3rem 0.5rem
- **Page breaks**: Avoided inside blockquotes

## Implementation Files

### Primary Files
1. **CSS File**: `assets/css/custom.css`
   - Contains all print styles within `@media print` query
   - Located after regular styles

2. **Head Include**: `_includes/head.html`
   - Links to custom.css: `<link rel="stylesheet" href="{{ "/assets/css/custom.css" | relative_url }}">`
   - Ensures custom styles load after main theme styles

### Affected Pages
All pages using the `language` layout, including:
- `_languages/pali/all-nouns.md`
- `_languages/pali/all-verbs.md`
- `_languages/pali/all-verbs-conjugation.md`
- All individual grammar section pages

## Testing Print Styles

### Chrome DevTools Method
1. Open DevTools (F12 or Cmd+Option+I)
2. Open print preview (Cmd+P)
3. In DevTools, select "Emulate CSS media type" → "print"

### Direct Print Preview
1. Press Cmd+P (Mac) or Ctrl+P (Windows)
2. Review the print preview
3. Verify:
   - Footer hidden
   - Page title and numbered TOC visible
   - Filter buttons and images hidden
   - Tables with proper column widths
   - H2 headings auto-numbered

## Maintenance Notes

- All print styles are scoped within `@media print` to avoid affecting screen display
- Use `!important` sparingly, only where necessary to override theme defaults
- Column widths are optimized for 3-column declension tables (Case | Singular | Plural)
- Font sizes use pt units for consistent print output
- Page break rules prevent orphaned content
