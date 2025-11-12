require 'json'
require 'fileutils'

module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      # Store search data in site.config for post_write hook
      site.config['search_data'] = build_search_data(site)
    end

    def build_search_data(site)
      puts "\n🔍 Generating search index..."

      search_data = []
      sections_updated = []

      # Find all vocab.md files (nouns)
      vocab_files = Dir.glob(File.join(site.source, '_includes/pali/*/vocab.md'))

      vocab_files.each do |file|
        section_name = extract_section_name(file)
        content = File.read(file)

        # Extract vocabulary entries
        # Pattern: <strong>WORD</strong> = VIETNAMESE (ENGLISH)
        # Also handles multiple meanings: vietnamese1 (english1); vietnamese2 (english2)
        entries = content.scan(/<strong>([^<]+)<\/strong>\s*=\s*([^<\n]+)/)

        entries.each do |pali_word, meanings|
          # Parse meanings (could be multiple separated by semicolons)
          vietnamese_parts = []
          english_parts = []

          # Split by semicolon for multiple meanings
          meanings.split(';').each do |meaning_pair|
            # Match: vietnamese (english)
            if meaning_pair =~ /([^(]+)\(([^)]+)\)/
              vietnamese_parts << $1.strip
              english_parts << $2.strip
            else
              # Handle entries without parentheses (e.g., "Laṅkā = Ceylon, Srilanka")
              # Use the whole meaning as both Vietnamese and English
              cleaned = meaning_pair.strip
              vietnamese_parts << cleaned
              english_parts << cleaned
            end
          end

          search_data << {
            pali: pali_word.strip,
            vi: vietnamese_parts.join('; '),
            en: english_parts.join('; '),
            section: section_name,
            section_title: section_title(section_name),
            type: 'noun',
            url: "#{site.baseurl}/pali/all-nouns/##{section_name}"
          }
        end

        sections_updated << section_name if entries.any?
      end

      # Find all example.md files (verbs)
      verb_files = Dir.glob(File.join(site.source, '_includes/pali/verbs-*/example.md'))

      verb_files.each do |file|
        section_name = extract_section_name(file)
        content = File.read(file)

        # Extract verb entries
        # Pattern: ### $\textbf{VERB}$ (VIETNAMESE; ENGLISH) = ...
        entries = content.scan(/###\s+\$\\textbf\{([^}]+)\}\$\s+\(([^)]+)\)/)

        entries.each do |verb, meanings|
          # Parse meanings (Vietnamese; English)
          vietnamese = ''
          english = ''

          if meanings =~ /([^;]+);?\s*([^;]*)/
            vietnamese = $1.strip
            english = $2.strip
          end

          search_data << {
            pali: verb.strip,
            vi: vietnamese,
            en: english,
            section: section_name,
            section_title: section_title(section_name),
            type: 'verb',
            url: "#{site.baseurl}/pali/#{section_name}/"
          }
        end

        sections_updated << section_name if entries.any?
      end

      # Load old data for comparison
      old_data = load_old_data(site)

      # Validate
      validation_results = validate_search_data(search_data, old_data)

      if validation_results[:errors].any?
        puts "\n❌ Validation errors found:"
        validation_results[:errors].each { |err| puts "  #{err}" }
        raise "Search index validation failed"
      end

      if validation_results[:warnings].any?
        puts "\n⚠️  Warnings:"
        validation_results[:warnings].each { |warn| puts "  #{warn}" }
      end

      # Generate summary
      puts "\n✅ Search index data prepared"
      puts "  📊 Total words: #{search_data.size}"
      puts "  📝 Sections: #{sections_updated.size}"

      if old_data.any?
        added = search_data.size - old_data.size
        puts "  #{added > 0 ? '➕' : '➖'} Change: #{added > 0 ? '+' : ''}#{added} words"

        # Find new words
        old_words = old_data.map { |w| w['pali'] }.to_set
        new_words = search_data.select { |w| !old_words.include?(w[:pali]) }
        if new_words.any?
          sample = new_words.first(5).map { |w| w[:pali] }.join(', ')
          puts "  🆕 New words: #{sample}#{new_words.size > 5 ? '...' : ''}"
        end
      end

      # Return data with metadata
      {
        data: search_data,
        validation: validation_results,
        sections: sections_updated,
        old_data: old_data
      }
    end

    private

    def extract_section_name(file_path)
      # Extract section from path: _includes/pali/SECTION/vocab.md or example.md
      if match = file_path.match(%r{_includes/pali/([^/]+)/(vocab|example)\.md})
        match[1]
      else
        'unknown'
      end
    end

    def section_title(section_name)
      # Convert section-name to Title
      titles = {
        # Nouns
        'masculine-nouns-a' => 'Danh từ nam tính vĩ từ \'a\'',
        'masculine-nouns-i' => 'Danh từ nam tính vĩ từ \'i\'',
        'masculine-nouns-ii' => 'Danh từ nam tính vĩ từ \'ī\'',
        'masculine-nouns-u' => 'Danh từ nam tính vĩ từ \'u\'',
        'masculine-nouns-u-irregular-pitu' => 'Danh từ nam tính vĩ từ \'u\' bất quy tắc (Mẫu Pitu/pitar)',
        'masculine-nouns-u-irregular-kattu' => 'Danh từ nam tính vĩ từ \'u\' bất quy tắc (Mẫu Kattu/kattār)',
        'masculine-nouns-vantu-mantu' => 'Danh từ nam tính vĩ từ \'vantu/mantu\'',
        'masculine-nouns-uu' => 'Danh từ nam tính vĩ từ \'ū\'',
        'feminine-nouns-aa' => 'Danh từ nữ tính vĩ từ \'ā\'',
        'feminine-nouns-i' => 'Danh từ nữ tính vĩ từ \'i\'',
        'feminine-nouns-ii' => 'Danh từ nữ tính vĩ từ \'ī\'',
        'feminine-nouns-u' => 'Danh từ nữ tính vĩ từ \'u\'',
        'feminine-nouns-u-irregular-matu' => 'Danh từ nữ tính vĩ từ \'u\' bất quy tắc (Mẫu Mātu/Mātar)',
        'feminine-nouns-vantu-mantu' => 'Danh từ nữ tính vĩ từ \'vantu/mantu\'',
        'neuter-nouns-a' => 'Danh từ trung tính vĩ từ \'a\'',
        # Verbs
        'verbs-vattamana' => 'Thì Hiện Tại (Vattamānā)',
        'verbs-ajjatani' => 'Thì Bất Định Khứ (Ajjatanī)',
        'verbs-bhavissanti' => 'Thì Tương lai (Bhavissantī)',
        'verbs-pancami' => 'Lối Mệnh Lệnh (Pañcamī)',
        'verbs-sattami' => 'Lối Khả Năng (Sattamī)',
        'verbs-irregular-as' => 'Động từ bất quy tắc ngữ căn \'as\'',
        'verbs-irregular-bhu' => 'Động từ bất quy tắc ngữ căn \'bhū\''
      }
      titles[section_name] || section_name
    end

    def load_old_data(site)
      old_file = File.join(site.source, 'assets', 'search-data.json')
      return [] unless File.exist?(old_file)

      JSON.parse(File.read(old_file))
    rescue JSON::ParserError
      []
    end

    def validate_search_data(new_data, old_data)
      errors = []
      warnings = []

      # 1. Check for empty data
      if new_data.empty?
        errors << "No vocabulary entries found"
        return { errors: errors, warnings: warnings }
      end

      # 2. Word count validation (only warn if significant decrease)
      if old_data.any? && new_data.size < old_data.size - 10
        warnings << "Word count decreased significantly: #{old_data.size} → #{new_data.size}"
      end

      # 3. Check for duplicates
      pali_words = new_data.map { |w| w[:pali] }
      duplicates = pali_words.group_by { |w| w }.select { |k, v| v.size > 1 }.keys
      if duplicates.any?
        warnings << "Duplicate words found: #{duplicates.first(5).join(', ')}#{duplicates.size > 5 ? '...' : ''}"
      end

      # 4. Check for malformed entries
      malformed = new_data.select do |w|
        w[:pali].nil? || w[:pali].empty? ||
        w[:vi].nil? || w[:vi].empty? ||
        w[:en].nil? || w[:en].empty?
      end

      if malformed.any?
        errors << "Malformed entries found: #{malformed.size} words missing data"
        malformed.first(3).each do |entry|
          errors << "  - #{entry[:pali] || '(empty)'}"
        end
      end

      # 5. JSON validity test
      begin
        JSON.parse(JSON.generate(new_data))
      rescue => e
        errors << "JSON generation failed: #{e.message}"
      end

      { errors: errors, warnings: warnings }
    end

  end

  # Hook to write search index after site is built
  Jekyll::Hooks.register :site, :post_write do |site|
    search_config = site.config['search_data']
    next unless search_config

    search_data = search_config[:data]
    validation_results = search_config[:validation]
    sections_updated = search_config[:sections]
    old_data = search_config[:old_data]

    # Write search-data.json
    output_dir = File.join(site.dest, 'assets')
    FileUtils.mkdir_p(output_dir)
    output_file = File.join(output_dir, 'search-data.json')

    File.write(output_file, JSON.pretty_generate(search_data))
    puts "  💾 Search index written to: #{output_file}"

    # Write summary for GitHub Actions
    summary = {
      total_words: search_data.size,
      sections_updated: sections_updated,
      validation: validation_results
    }

    if old_data.any?
      summary[:changes] = {
        added: search_data.size - old_data.size,
        new_words: search_data.reject { |w| old_data.any? { |o| o['pali'] == w[:pali] } }
                          .map { |w| w[:pali] }
                          .first(10)
      }
    end

    summary_file = File.join(site.dest, 'search-summary.json')
    File.write(summary_file, JSON.pretty_generate(summary))
  end
end
