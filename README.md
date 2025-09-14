# Đọc hiểu Pāḷi (Pāḷi Learning)

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
├── _languages/         # 🏗️ Jekyll collections for Pāḷi content
│   └── pali/           # Complete Pāḷi grammar with Vietnamese explanations
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
- **Pāḷi Grammar Focus**: Comprehensive Pāḷi declension tables and vocabulary
- **Vietnamese Explanations**: Primary language with English translations
- **Live Reload**: Changes reflect immediately during development

### 🔬 LaTeX Math Support
- **MathJax Integration**: Renders complex Pāḷi grammatical notation
- **Color Coding**: Red and blue text for grammatical variations
- **Optimized**: Fast rendering with custom macros

### 🎯 Professional Presentation
- **Clean URLs**: Organized Pāḷi grammar sections
- **Responsive Design**: Works on desktop and mobile
- **Enhanced Tables**: Beautiful grammar declension tables
- **SEO Optimized**: Proper meta tags and structure

## 📚 Content Organization

### Pāḷi Grammar Structure
- **Danh từ nam tính (Masculine Nouns)**: Complete declension tables for various endings ('a', 'i', 'ī', 'u')
- **Danh từ nữ tính (Feminine Nouns)**: Feminine noun declensions with 'ī' endings
- **Vietnamese Explanations**: Primary language with English translations
- **Color-coded Forms**: LaTeX notation `${word\color{red}ending}$` for grammatical variations
- **Comprehensive Vocabulary**: Organized word lists with Vietnamese and English meanings

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
Optimized for Pāḷi grammatical notation:
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
- Edit files in `_languages/pali/` and `_includes/pali/` directories
- Jekyll automatically reflects changes
- Vocabulary and declension tables update dynamically

### Adding Features
- Layouts: `_layouts/`
- Styles: `assets/css/`
- Plugins: `_plugins/`
- Components: `_includes/`

## 🤝 Contributing

1. Edit Pāḷi content in `_languages/pali/` and vocabulary in `_includes/pali/`
2. Test locally with `docker-compose up`
3. Commit changes (build files are ignored)
4. Submit pull request

Focus areas for contributions:
- Additional Pāḷi declension patterns
- More comprehensive vocabulary lists
- Vietnamese translation improvements
- Grammatical explanations and examples

## 📄 License

This educational content is shared for language learning purposes.