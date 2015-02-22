source 'https://rubygems.org'

ruby "2.1.3"
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.8'
##Sprockets better errors
#gem 'sprockets_better_errors'

gem 'rails_karma'

#gem 'angular-rails-templates'

#PRotractor
gem 'protractor-rails'

# Jquery-ui
#gem 'jquery-ui-rails'

#geoutm
gem 'geoutm'

#timers
gem 'timers'

# Gon --> include ruby variables in js
gem 'gon'

# Angular JS rails
gem 'angularjs-rails'

# Paperclip
gem "paperclip", "~> 4.2"

# Omniauth
#gem 'omniauth-coursera', :github => 'leoromanovsky/omniauth-coursera'

# Nifty scaffold
gem "nifty-generators", :group => :development

# Devise
gem 'devise'

# Zurb Foundation Framework
gem 'foundation-rails'

# Use sqlite3 as the database for Active Record
#gem 'sqlite3'

# Use SCSS for stylesheets
gem 'sass-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
#gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

group :development, :test do
  gem 'sqlite3'
end

group :test do
  gem 'minitest-reporters', '1.0.5'
  gem 'mini_backtrace',     '0.1.3'
  gem 'guard-minitest',     '2.3.1'
  
end

group :production do
  gem 'pg',  '0.17.1'
  gem 'rails_12factor',  '0.0.2'
end

source 'https://rails-assets.org'
gem "rails-assets-angular"
group :development, :test do
  gem 'rails-assets-angular-mocks'
end
