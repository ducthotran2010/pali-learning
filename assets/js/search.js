/**
 * Pāḷi Vocabulary Search
 * Client-side search with diacritic-insensitive matching
 */

(function() {
  'use strict';

  let searchData = [];
  let searchIndex = null;
  let normalizedData = [];
  let currentLang = 'all'; // Current language filter: 'all', 'pali', 'vi', 'en'

  // Diacritic mapping for Pāḷi and Vietnamese characters
  const diacriticMap = {
    // Pāḷi diacritics
    'ā': 'a', 'ī': 'i', 'ū': 'u',
    'ṃ': 'm', 'ṁ': 'm',
    'ñ': 'n', 'ṅ': 'n', 'ṇ': 'n',
    'ḷ': 'l',
    'ṭ': 't', 'ḍ': 'd',
    'Ā': 'A', 'Ī': 'I', 'Ū': 'U',
    'Ṃ': 'M', 'Ṁ': 'M',
    'Ñ': 'N', 'Ṅ': 'N', 'Ṇ': 'N',
    'Ḷ': 'L',
    'Ṭ': 'T', 'Ḍ': 'D',
    // Vietnamese diacritics
    'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
    'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
    'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
    'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
    'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
    'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
    'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
    'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
    'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
    'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
    'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
    'đ': 'd',
    // Uppercase Vietnamese
    'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
    'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
    'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
    'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
    'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
    'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
    'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
    'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
    'Đ': 'D'
  };

  /**
   * Remove diacritics from text for matching
   */
  function removeDiacritics(text) {
    // Use String.prototype.normalize to decompose characters, then remove combining marks
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[āīūṃṁñṅṇḷṭḍĐđĂăÂâÊêÔôƠơƯư]/g, char => diacriticMap[char] || char);
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
   * Get search keys based on current language filter
   */
  function getSearchKeys() {
    if (currentLang === 'all') {
      return ['pali_normalized', 'vi_normalized', 'en_normalized'];
    } else if (currentLang === 'pali') {
      return ['pali_normalized'];
    } else if (currentLang === 'vi') {
      return ['vi_normalized'];
    } else if (currentLang === 'en') {
      return ['en_normalized'];
    }
    return ['pali_normalized', 'vi_normalized', 'en_normalized']; // fallback
  }

  /**
   * Get placeholder text based on current language filter
   */
  function getPlaceholderText() {
    if (currentLang === 'all') {
      return 'Tìm từ vựng Pāḷi, tiếng Việt hoặc tiếng Anh...';
    } else if (currentLang === 'pali') {
      return 'Tìm từ vựng Pāḷi...';
    } else if (currentLang === 'vi') {
      return 'Tìm từ vựng tiếng Việt...';
    } else if (currentLang === 'en') {
      return 'Tìm từ vựng tiếng Anh...';
    }
    return 'Tìm từ vựng Pāḷi, tiếng Việt hoặc tiếng Anh...'; // fallback
  }

  /**
   * Search vocabulary with fuzzy matching using Fuse.js
   */
  function search(query) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    if (!normalizedData || normalizedData.length === 0) {
      return [];
    }

    // Normalize query for diacritic-insensitive search
    const normalizedQuery = normalize(query.trim());

    // Get search keys based on selected language
    const searchKeys = getSearchKeys();

    // Create new Fuse instance with current language keys
    const fuseOptions = {
      keys: searchKeys,
      threshold: 0.5,
      distance: 200,
      includeScore: true,
      minMatchCharLength: 1,
      shouldSort: false,
      ignoreLocation: true,
      useExtendedSearch: false,
      findAllMatches: true,
      isCaseSensitive: false
    };

    const fuse = new Fuse(normalizedData, fuseOptions);

    // Perform fuzzy search with Fuse.js
    const fuseResults = fuse.search(normalizedQuery);

    // Transform Fuse.js results to our format
    const results = fuseResults.map(result => {
      const item = result.item;
      const fuseScore = result.score; // 0.0 = perfect match, 1.0 = no match

      // Calculate our custom score for ranking
      // Prefer exact matches and Pāḷi word matches
      let customScore = 100 - (fuseScore * 100);

      const normalizedPali = normalize(item.pali);
      const normalizedVi = normalize(item.vi);
      const normalizedEn = normalize(item.en);

      // Boost exact matches
      if (normalizedPali === normalizedQuery) {
        customScore += 50; // Exact Pāḷi match bonus
      } else if (normalizedVi === normalizedQuery) {
        customScore += 30; // Exact Vietnamese match bonus
      } else if (normalizedEn === normalizedQuery) {
        customScore += 20; // Exact English match bonus
      }

      // Boost prefix matches
      if (normalizedPali.startsWith(normalizedQuery)) {
        customScore += 25;
      } else if (normalizedVi.startsWith(normalizedQuery)) {
        customScore += 15;
      } else if (normalizedEn.startsWith(normalizedQuery)) {
        customScore += 10;
      }

      return {
        ...item,
        score: customScore,
        fuseScore: fuseScore
      };
    });

    // Sort by custom score (descending)
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
      // Add hash to URL for jump-to-word functionality
      resultEl.href = result.url + '#vocab-' + encodeURIComponent(result.pali);
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
    // Find both page containers and header container
    const searchContainers = document.querySelectorAll('.pali-search-container, .header-search-container');

    searchContainers.forEach(container => {
      const input = container.querySelector('.pali-search-input');
      const resultsContainer = container.querySelector('.pali-search-results');
      const clearBtn = container.querySelector('.pali-search-clear');
      const langBtns = container.querySelectorAll('.lang-btn');

      if (!input || !resultsContainer) return;

      let debounceTimer;

      // Language filter button handlers
      langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active state
          langBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Update current language
          currentLang = btn.dataset.lang;

          // Update placeholder text
          input.placeholder = getPlaceholderText();

          // Re-trigger search if there's a query (minimum 2 characters)
          const query = input.value.trim();
          if (query.length >= 2) {
            const results = search(query);
            displayResults(results, query, resultsContainer);
          } else if (query.length > 0) {
            // Clear results if query is too short
            resultsContainer.classList.remove('visible');
            resultsContainer.innerHTML = '';
          }
        });
      });

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
    // Check if Fuse.js is available
    if (typeof Fuse === 'undefined') {
      setTimeout(loadSearchData, 100);
      return;
    }

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

        // Normalize search data for diacritic-insensitive fuzzy search
        normalizedData = data.map(item => ({
          ...item,
          pali_normalized: normalize(item.pali),
          vi_normalized: normalize(item.vi),
          en_normalized: normalize(item.en)
        }));

        // Initialize Fuse.js with fuzzy search options
        const fuseOptions = {
          keys: ['pali_normalized', 'vi_normalized', 'en_normalized'],
          threshold: 0.5,              // Loose matching (0.0 = exact, 1.0 = match anything)
          distance: 200,               // Character distance for fuzzy matches
          includeScore: true,          // Include match score in results
          minMatchCharLength: 1,       // Require at least 1 character
          shouldSort: false,           // We'll do custom sorting
          ignoreLocation: true,        // Match anywhere in string
          useExtendedSearch: false,
          findAllMatches: true,
          isCaseSensitive: false       // Case insensitive
        };

        searchIndex = new Fuse(normalizedData, fuseOptions);
        console.log(`✅ Loaded ${searchData.length} vocabulary entries with fuzzy search`);
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

  /**
   * Highlight vocabulary word from URL hash
   */
  function highlightVocabWord() {
    const hash = window.location.hash;

    // Check if hash starts with #vocab-
    if (!hash || !hash.startsWith('#vocab-')) {
      return;
    }

    // Extract word from hash
    const word = decodeURIComponent(hash.substring(7)); // Remove '#vocab-'

    // Find all <strong> tags in vocab sections
    const vocabSections = document.querySelectorAll('.vocab-content');
    let targetElement = null;

    vocabSections.forEach(section => {
      const strongTags = section.querySelectorAll('strong');
      strongTags.forEach(strong => {
        // Check if this is the word we're looking for
        if (strong.textContent.trim() === word) {
          targetElement = strong;
        }
      });
    });

    // If found, scroll to it and highlight
    if (targetElement) {
      // Scroll to the element
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Add highlight class
      targetElement.classList.add('vocab-highlight');

      // Optional: also highlight the parent <li> for better visibility
      const parentLi = targetElement.closest('li');
      if (parentLi) {
        parentLi.classList.add('vocab-highlight-row');
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadSearchData();
      highlightVocabWord();
    });
  } else {
    loadSearchData();
    highlightVocabWord();
  }
})();
