/**
 * Pāḷi Vocabulary Search
 * Client-side search with diacritic-insensitive matching
 */

(function() {
  'use strict';

  let searchData = [];
  let searchIndex = null;

  // Diacritic mapping for Pāḷi characters
  const diacriticMap = {
    'ā': 'a', 'ī': 'i', 'ū': 'u',
    'ṃ': 'm', 'ṁ': 'm',
    'ñ': 'n', 'ṅ': 'n', 'ṇ': 'n',
    'ḷ': 'l',
    'ṭ': 't', 'ḍ': 'd',
    'Ā': 'A', 'Ī': 'I', 'Ū': 'U',
    'Ṃ': 'M', 'Ṁ': 'M',
    'Ñ': 'N', 'Ṅ': 'N', 'Ṇ': 'N',
    'Ḷ': 'L',
    'Ṭ': 'T', 'Ḍ': 'D'
  };

  /**
   * Remove diacritics from text for matching
   */
  function removeDiacritics(text) {
    return text.replace(/[āīūṃṁñṅṇḷṭḍĀĪŪṂṀÑṄṆḶṬḌ]/g, char => diacriticMap[char] || char);
  }

  /**
   * Normalize text for searching (lowercase + remove diacritics)
   */
  function normalize(text) {
    return removeDiacritics(text.toLowerCase());
  }

  /**
   * Highlight matching text
   */
  function highlightMatch(text, query) {
    if (!query) return text;

    const normalizedText = normalize(text);
    const normalizedQuery = normalize(query);
    const index = normalizedText.indexOf(normalizedQuery);

    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    return `${before}<mark>${match}</mark>${after}`;
  }

  /**
   * Search vocabulary
   */
  function search(query) {
    if (!query || query.trim().length < 1) {
      return [];
    }

    const normalizedQuery = normalize(query.trim());
    const results = [];

    for (const entry of searchData) {
      let score = 0;
      let matchType = '';

      // Check Pāḷi word (highest priority)
      const normalizedPali = normalize(entry.pali);
      if (normalizedPali === normalizedQuery) {
        score = 100; // Exact match
        matchType = 'pali-exact';
      } else if (normalizedPali.startsWith(normalizedQuery)) {
        score = 90; // Starts with
        matchType = 'pali-start';
      } else if (normalizedPali.includes(normalizedQuery)) {
        score = 80; // Contains
        matchType = 'pali-contains';
      }

      // Check Vietnamese meaning
      const normalizedVi = normalize(entry.vi);
      if (normalizedVi.includes(normalizedQuery)) {
        score = Math.max(score, 60);
        matchType = matchType || 'vi';
      }

      // Check English meaning
      const normalizedEn = normalize(entry.en);
      if (normalizedEn.includes(normalizedQuery)) {
        score = Math.max(score, 50);
        matchType = matchType || 'en';
      }

      if (score > 0) {
        results.push({
          ...entry,
          score,
          matchType
        });
      }
    }

    // Sort by score (descending)
    results.sort((a, b) => b.score - a.score);

    // Limit to top 20 results
    return results.slice(0, 20);
  }

  /**
   * Display search results
   */
  function displayResults(results, query, containerEl) {
    containerEl.innerHTML = '';

    if (results.length === 0) {
      containerEl.innerHTML = `
        <div class="search-result-empty">
          <p>Không tìm thấy kết quả cho "${query}"</p>
          <p class="search-tip">Mẹo: Bạn có thể tìm kiếm bằng Pāḷi, tiếng Việt, hoặc tiếng Anh</p>
        </div>
      `;
      containerEl.classList.add('visible');
      return;
    }

    results.forEach(result => {
      const resultEl = document.createElement('a');
      resultEl.href = result.url;
      resultEl.className = 'search-result-item';

      const paliEl = document.createElement('div');
      paliEl.className = 'search-result-pali';
      paliEl.innerHTML = highlightMatch(result.pali, query);

      const meaningEl = document.createElement('div');
      meaningEl.className = 'search-result-meaning';
      meaningEl.innerHTML = `
        ${highlightMatch(result.vi, query)}
        <span class="search-result-en">(${highlightMatch(result.en, query)})</span>
      `;

      const sectionEl = document.createElement('div');
      sectionEl.className = 'search-result-section';

      // Add type badge
      const typeEl = document.createElement('span');
      typeEl.className = `search-result-type ${result.type || 'noun'}`;
      typeEl.textContent = result.type === 'verb' ? 'Động từ' : 'Danh từ';

      sectionEl.appendChild(typeEl);
      sectionEl.appendChild(document.createTextNode(' ' + result.section_title));

      resultEl.appendChild(paliEl);
      resultEl.appendChild(meaningEl);
      resultEl.appendChild(sectionEl);

      containerEl.appendChild(resultEl);
    });

    containerEl.classList.add('visible');
  }

  /**
   * Initialize search UI
   */
  function initSearchUI() {
    const searchContainers = document.querySelectorAll('.pali-search-container');

    searchContainers.forEach(container => {
      const input = container.querySelector('.pali-search-input');
      const resultsContainer = container.querySelector('.pali-search-results');
      const clearBtn = container.querySelector('.pali-search-clear');

      if (!input || !resultsContainer) return;

      let debounceTimer;

      // Search on input
      input.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        // Show/hide clear button
        if (clearBtn) {
          clearBtn.style.display = query ? 'block' : 'none';
        }

        // Debounce search
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (query.length === 0) {
            resultsContainer.classList.remove('visible');
            resultsContainer.innerHTML = '';
            return;
          }

          const results = search(query);
          displayResults(results, query, resultsContainer);
        }, 200);
      });

      // Clear button
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          clearBtn.style.display = 'none';
          resultsContainer.classList.remove('visible');
          resultsContainer.innerHTML = '';
          input.focus();
        });
      }

      // Close results when clicking outside
      document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
          resultsContainer.classList.remove('visible');
        }
      });

      // Keyboard navigation
      input.addEventListener('keydown', (e) => {
        if (!resultsContainer.classList.contains('visible')) return;

        const items = resultsContainer.querySelectorAll('.search-result-item');
        const currentIndex = Array.from(items).findIndex(item =>
          item.classList.contains('active')
        );

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          items.forEach((item, i) => {
            item.classList.toggle('active', i === nextIndex);
          });
          items[nextIndex]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items.forEach((item, i) => {
            item.classList.toggle('active', i === prevIndex);
          });
          items[prevIndex]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const activeItem = items[currentIndex];
          if (activeItem) {
            window.location.href = activeItem.href;
          }
        } else if (e.key === 'Escape') {
          resultsContainer.classList.remove('visible');
          input.blur();
        }
      });
    });
  }

  /**
   * Load search data
   */
  function loadSearchData() {
    const baseUrl = document.querySelector('meta[name="baseurl"]')?.content || '';
    const dataUrl = `${baseUrl}/assets/search-data.json`;

    fetch(dataUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load search data: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        searchData = data;
        console.log(`✅ Loaded ${searchData.length} vocabulary entries`);
        initSearchUI();
      })
      .catch(error => {
        console.error('Failed to load search data:', error);
        // Show error in search boxes
        document.querySelectorAll('.pali-search-input').forEach(input => {
          input.placeholder = 'Tìm kiếm không khả dụng / Search unavailable';
          input.disabled = true;
        });
      });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSearchData);
  } else {
    loadSearchData();
  }
})();
