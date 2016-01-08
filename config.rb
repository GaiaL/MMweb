###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end
set :layout, :page

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :fonts_dir, 'fonts'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

set :haml, :format => :html5
set :markdown_engine, :kramdown
set :relative_links, true

activate :bower
bower_dir = 'vendor/assets/bower/'

# load vendor fonts
%w(francois-one news-cycle).each do |pattern|
  Dir.glob(bower_dir + pattern + '/**/*.{eot,woff,woff2,ttf,svg}').each do |font|
    sprockets.import_asset(Pathname.new(font).relative_path_from(
      Pathname.new(bower_dir))) do |logical_path|
        File.join config[:fonts_dir], File.basename(logical_path)
      end
  end
end

npm_dir = 'node_modules/'
sprockets.append_path Pathname.new('../' + npm_dir)  # relative to source/

compass_config do |config|
  config.add_import_path File.expand_path(npm_dir)
end

activate :blog do |blog|
  # set options on blog
  blog.default_extension = '.md'
  # blog.day_link = '/{year}/{month}/{day}/index.html'
  # blog.month_link = '/{year}/{month}/index.html'
  # blog.year_link = '/{year}/index.html'
  # blog.taglink = '/tags/{tag}/index.html'
  blog.permalink = '/{title}/index.html'
  blog.sources = '/pages/{title}.html'
  blog.layout = 'page'
  blog.prefix = ''
  blog.new_article_template = 'source/layouts/new-page.tt'
end

helpers do
  def article filename
    blog.articles.select { |article| article.source_file.end_with? "/#{filename}" }[0]
  end
end

ignore "contents/*"
