# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a language learning repository containing grammar references and vocabulary tables for multiple languages. The content focuses on Pāḷi grammar declensions (masculine and feminine nouns with various endings), with Vietnamese translations and explanations.

## Structure

- `pali/README.md` - Pāḷi grammar content in Vietnamese with declension tables and vocabulary
- `english/README.md` - English language content (currently empty)
- Repository is organized by language directories for multilingual support

## Content Format

- Uses LaTeX math notation for Pāḷi script with color coding:
  - Red text highlights grammatical endings and variations
  - Blue text indicates alternative forms
- Tables show grammatical cases (cách) with singular (Si) and plural (Sn) forms
- Vocabulary sections use structured lists with Pāḷi terms and English definitions

## Working with This Repository

- Content is primarily in markdown format with embedded LaTeX
- Changes typically involve updating grammar tables or adding vocabulary
- Recent commits show focus on formatting consistency
- No build process required - this is a documentation-only repository

## Guidelines for Declension Tables

When creating or updating Pāḷi declension tables:

### Accuracy Requirements
- **Copy exactly from source**: Match forms precisely as shown in provided images/references
- **No assumptions**: Don't add variations or forms not explicitly shown in the source
- **Verify formatting**: Ensure LaTeX syntax is clean (e.g., avoid extra parentheses like `$({word})$`)
- **Check ordering**: Maintain the exact order of alternative forms as shown in source

### Common Corrections Needed
- Nominative forms: Use correct base form (e.g., "kattu" not "kattā" for agent nouns)
- Case variations: Include only the forms explicitly shown, don't extrapolate
- Plural forms: Match exact variations and their order from source material
- LaTeX formatting: Use consistent `${word\color{red}ending}$` format without extra markup
- Simplified notation: Use parenthetical format when forms share common parts (e.g., "kattārehi, kattārebhi" becomes "kattāre(b)hi")

### Verification Process
- Compare final output with original source image/reference
- Check that all forms match exactly
- Ensure no extra forms are added beyond what's shown
- Verify case numbering and combinations (e.g., "3&5" vs separate "3" and "5")