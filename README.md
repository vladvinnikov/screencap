# Screencap

This forks contains an adaptation for our needs

100% height, fixed width, configurable delay after page is loaded

Some options were removed.

Please see original gem as it is much more generic than our usecase.

## Installation

Add this line to your application's Gemfile:

    gem 'glebtv-screencap'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install glebtv-screencap

## Usage

```ruby
require 'screencap'

f = Screencap::Fetcher.new('http://google.com')
screenshot = f.fetch
```

it also currently supports a couple of options

```ruby
f = Screencap::Fetcher.new('http://google.com')
screenshot = f.fetch(
  :output => '~/my_directory.png', #dont forget the extension!
  # optional:
  :height => 1024,
  :width => 1024,
  :delay => 15000,
)

```

## To-do

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

