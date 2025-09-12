# Language Learning

A multilingual grammar reference and vocabulary collection with Jekyll-powered website and Docker support.

## 🌐 Live Site

Visit the site at: http://localhost:4000 (when running locally)

## 📁 Repository Structure

```
language-learning/
├── _config.yml          # Jekyll configuration with MathJax support
├── index.md            # Main landing page
├── Dockerfile          # Docker container setup
├── docker-compose.yml  # Development environment
├── .gitignore          # Excludes build files and artifacts
│
├── pali/               # 📚 Pali language content (source of truth)
│   └── README.md       # Complete Pali grammar with Vietnamese explanations
│
├── english/            # 📚 English language content
│   └── README.md       # English materials (in development)
│
├── _languages/         # 🏗️ Jekyll collections for enhanced presentation
│   ├── pali/index.md   # Loads content from pali/README.md
│   └── english/index.md
│
├── _includes/          # 🔧 Reusable components
│   └── mathjax.html    # LaTeX math rendering configuration
│
├── _layouts/           # 🎨 Custom page layouts
│   └── language.html   # Specialized layout for language content
│
├── _plugins/           # ⚡ Custom Jekyll functionality
│   └── markdown_loader.rb # Dynamic content loading plugin
│
└── assets/            # 🎨 Styling and scripts
    └── css/custom.css # Enhanced table and math formatting
```

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone and start**:
   ```bash
   git clone <repo-url>
   cd language-learning
   docker-compose up
   ```

2. **Visit**: http://localhost:4000

3. **Stop**: Press `Ctrl+C` or `docker-compose down`

### Manual Jekyll Setup

```bash
# Install dependencies
bundle install

# Start Jekyll server
bundle exec jekyll serve --livereload

# Visit http://localhost:4000
```

## ✨ Key Features

### 📖 Content Management
- **Single Source of Truth**: Content lives in `pali/README.md`, `english/README.md`
- **Zero Duplication**: Jekyll dynamically loads original content
- **Live Reload**: Changes reflect immediately during development

### 🔬 LaTeX Math Support
- **MathJax Integration**: Renders complex Pali grammatical notation
- **Color Coding**: Red and blue text for grammatical variations
- **Optimized**: Fast rendering with custom macros

### 🎯 Professional Presentation
- **Clean URLs**: `/pali/`, `/english/` instead of complex paths
- **Responsive Design**: Works on desktop and mobile
- **Enhanced Tables**: Beautiful grammar declension tables
- **SEO Optimized**: Proper meta tags and structure

## 📚 Content Organization

### Pali Language
- Complete declension tables for masculine and feminine nouns
- Vietnamese explanations with English translations
- Color-coded grammatical forms: `${agg\color{red}i}$`
- Comprehensive vocabulary with grammatical information

### Adding New Languages
1. Create `newlang/README.md` with your content
2. Add `_languages/newlang/index.md`:
   ```markdown
   ---
   layout: language
   title: New Language Reference
   permalink: /newlang/
   ---
   
   {% markdown newlang/README.md %}
   ```
3. Update `_config.yml` navigation

## 🛠️ Development

### Project Commands
```bash
# Start development server
docker-compose up

# Rebuild and start
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

### File Watching
- Jekyll automatically rebuilds on file changes
- MathJax re-renders mathematical notation
- Browser auto-refreshes with LiveReload

## 🔧 Technical Details

### Jekyll Plugin System
Custom `{% markdown file.md %}` tag dynamically loads content:
```ruby
# Loads and renders markdown files at build time
{% markdown pali/README.md %}
```

### MathJax Configuration
Optimized for Pali grammatical notation:
```javascript
// Supports inline: $formula$ and display: $$formula$$
// Custom color macros: \red{text}, \blue{text}
```

### Git Workflow
- `_site/`, build artifacts automatically ignored
- Content changes tracked in original files
- Clean commit history without build noise

## 📋 Maintenance

### Content Updates
- Edit files in `pali/`, `english/` directories
- Jekyll automatically reflects changes
- No need to update multiple locations

### Adding Features
- Layouts: `_layouts/`
- Styles: `assets/css/`
- Plugins: `_plugins/`
- Components: `_includes/`

## 🤝 Contributing

1. Edit content in language directories (`pali/`, `english/`)
2. Test locally with `docker-compose up`
3. Commit changes (build files are ignored)
4. Submit pull request

## 📄 License

This educational content is shared for language learning purposes.