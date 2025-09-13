# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a Pāḷi language learning repository focused exclusively on Pāḷi grammar declensions (masculine and feminine nouns with various endings), with Vietnamese explanations and English translations.

## Structure

- `_languages/pali/` - Main Pāḷi grammar pages organized by declension patterns
- `_includes/pali/` - Reusable components for declension tables and vocabulary
- `assets/images/` - All images and visual materials for Pāḷi lessons
- Repository is organized around individual declension patterns as separate sections
- Each section follows the pattern: Section Page → Declension Table → Vocabulary

## Content Format

- Uses LaTeX math notation for Pāḷi script with color coding:
  - Red text highlights grammatical endings and variations
  - Blue text indicates alternative forms
- Tables show grammatical cases (cách) with singular (Si) and plural (Sn) forms
- Vocabulary sections use structured lists with Vietnamese-first format: `<li><strong>word</strong> = vietnamese (english); vietnamese2 (english2)</li>`
- All vocabulary wrapped in `<div style="column-count:2;">` for 2-column layout
- Section titles use Vietnamese with English explanations: "Danh từ nam tính (Masculine Nouns)"

## Working with This Repository

- Content is primarily in markdown format with embedded LaTeX
- Changes typically involve updating grammar tables or adding vocabulary
- Each declension pattern should be treated as a separate section (not combined)
- Irregular patterns should be separated by type (e.g., Pitu/pitar vs Kattu/kattār)
- Jekyll-based site with MathJax support for LaTeX rendering
- Vietnamese is the primary language with English explanations in parentheses

## Section Organization Pattern

Each declension type should follow this structure:
1. **Main page**: `_languages/pali/[pattern-name].md`
2. **Includes directory**: `_includes/pali/[pattern-name]/`
3. **Declension table**: `declension.md`
4. **Vocabulary**: `vocab.md`

Example: Regular 'u' endings and irregular patterns are separate sections:
- `masculine-nouns-u` (regular)
- `masculine-nouns-u-irregular-pitu` (Pitu/pitar pattern)
- `masculine-nouns-u-irregular-kattu` (Kattu/kattār pattern)

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

## Vocabulary Format Requirements

- **Header**: Use "### Từ vựng (Vocabulary)"
- **Structure**: Always wrap vocabulary in HTML structure:
  ```html
  <div style="column-count:2;">
      <ul>
          <li><strong>word</strong> = vietnamese (english); vietnamese2 (english2)</li>
      </ul>
  </div>
  ```
- **Multiple meanings**: Use semicolon to separate: "người đàn ông (man); người (person)"
- **Language priority**: Vietnamese first, English in parentheses
- **Formatting**: Use `<strong>` tags for Pali words, not markdown bold

## Navigation Updates

When adding new sections:
- Update `_languages/pali/index.md` navigation links using Vietnamese-only format
- Update `_languages/pali/all.md` in two places:
  1. **sections** front matter: Full bilingual titles
  2. **Content sections**: Full bilingual headers with includes
- **Title formats**:
  - Index navigation: Vietnamese only: "Danh từ nam tính vĩ từ 'a'"
  - All.md sections & content: Vietnamese only: "Danh từ nam tính vĩ từ 'a'" (no English explanations in headers)
- **Ordering**: Alphabetical by ending (a, i, ī, u), then irregulars by pattern

### Navigation Pattern Examples:

**In index.md (Vietnamese only):**
```markdown
- [Danh từ nam tính vĩ từ 'a'](/pali/masculine-nouns-a/)
```

**In all.md sections (Vietnamese only):**
```yaml
- title: Danh từ nam tính vĩ từ 'a'
  anchor: masculine-nouns-a
```

**In all.md content (Vietnamese only):**
```markdown
## Danh từ nam tính vĩ từ 'a'
{: #masculine-nouns-a}

{% include pali/masculine-nouns-a/declension.md %}

{% include pali/masculine-nouns-a/vocab.md %}
```

## Filter Implementation

The page with filter functionality, should have some filter options, for example:

### Filter Structure
- **Filter buttons**: Located at the top of all.md page with CSS classes and JavaScript handlers
- **Filter options**:
  - "Tất cả (All)" - shows both declension tables and vocabulary
  - "Chỉ bảng chia (Tables Only)" - shows only declension tables
  - "Chỉ từ vựng (Vocab Only)" - shows only vocabulary sections

### Technical Implementation
- **Declension content**: Each declension.md file wrapped in `<div class="declension-content" markdown="1">` to enable both CSS targeting and Markdown processing
- **Vocabulary content**: Each vocab.md file has `class="vocab-content"` added to existing `<div style="column-count:2;">` tags
- **JavaScript**: Uses `document.querySelectorAll()` to find elements by class and toggle `hidden` class
- **CSS**: `.hidden { display: none; }` class for hiding content

### Critical Requirements for Proper Rendering
- **Markdown spacing**: Tables inside HTML divs require blank lines before and after the table for proper Markdown processing
- **markdown="1" attribute**: Essential for processing Markdown content inside HTML wrapper divs
- **No duplicate headings**: Include files should not contain section headings that conflict with main page structure
- **Proper div closure**: Ensure proper spacing around closing `</div>` tags

### Troubleshooting Notes
- Tables not rendering: Check for missing blank lines around markdown tables in wrapper divs
- Content not filtering: Verify CSS classes are correctly applied to the actual content containers
- JavaScript errors: Ensure all referenced element IDs exist in the DOM when script runs

### Working Filter Implementation Details
Based on successful implementation, the key requirements are:

**Correct Declension File Structure:**
```html
<div class="declension-content" markdown="1">

| Cách | Si | Sn |
| ---- | -- | -- |
| 1    | content | content |

</div>
```

**Correct Vocabulary File Structure:**
```html
<div class="vocab-content" style="column-count:2;">
    <ul>
        <li><strong>word</strong> = vietnamese (english); vietnamese2 (english2)</li>
    </ul>
</div>
```

**Critical Success Factors:**
- **Blank lines**: Essential around markdown tables in `markdown="1"` divs
- **Proper spacing**: Both after opening `<div>` and before closing `</div>`
- **Inline styles**: Keep `style="column-count:2;"` in vocabulary files for proper rendering
- **Simple CSS**: Minimal styling without complex overrides

**Working Structure:**
- Declension content: Wrapped in `markdown="1"` divs with proper spacing
- Vocabulary content: Uses CSS class + inline column style
- JavaScript: Basic show/hide functionality using CSS classes
- Filter buttons: Simple toggle between "All", "Tables Only", and "Vocab Only"

## Repository Conventions & Best Practices

### File Naming Conventions
- **Feminine nouns ending in 'ā'**: Use `feminine-nouns-aa` (ā -> double 'a') format for file names and directory names
- **Masculine nouns ending in 'a'**: Use `masculine-nouns-a` (a -> 'a') format for file names and directory names
- **Navigation structure**: Single root index.md at repository root (avoid duplicate pali-specific index files)
- **DRY Principle**: Remove redundant files and consolidate navigation structure to prevent duplication

### Development Guidelines
- **Content Policy**: Never add content to .md files unless explicitly requested by user
- **Minimal Changes**: Only make requested changes, avoid adding explanatory text or summaries
- **File Structure**: Prefer editing existing files over creating new ones unless absolutely necessary
- **Headers**: Use Vietnamese only, no English explanations in section headers (e.g., "Danh từ nữ tính vĩ từ 'ā'" not "Danh từ nữ tính vĩ từ 'ā' (Feminine Nouns ending in 'ā')")