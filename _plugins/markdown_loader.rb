module Jekyll
  class MarkdownTag < Liquid::Tag
    def initialize(tag_name, file_path, tokens)
      super
      @file_path = file_path.strip
    end

    def render(context)
      site = context.registers[:site]
      converter = site.find_converter_instance(Jekyll::Converters::Markdown)
      
      file_path = File.join(site.source, @file_path)
      
      if File.exist?(file_path)
        content = File.read(file_path)
        converter.convert(content)
      else
        "<p><em>File not found: #{@file_path}</em></p>"
      end
    end
  end
end

Liquid::Template.register_tag('markdown', Jekyll::MarkdownTag)