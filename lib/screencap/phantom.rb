module Screencap
  class Phantom
    RASTERIZE = SCREENCAP_ROOT.join('screencap', 'raster.js')

    def self.rasterize(url, path, args = {}) 
      params = {
        url: CGI::escape(url),
        output: path
      }.merge(args).collect {|k,v| "#{k}=#{v}"}
      #puts RASTERIZE.to_s, params
      cookies = Rails.root.join("tmp", "cookies.txt")
      params.push "--cookies-file=#{cookies.to_s}"
      params.push "--ssl-protocol=any"
      result = Phantomjs.run(RASTERIZE.to_s, *params)
      # puts result
      raise Screencap::Error, "Could not load URL #{url}" if result.match /Unable to load/
    end

    def quoted_args(args)
      args.map{|x| quoted_arg(x)}
    end

    def quoted_arg(arg)
      return arg if arg.starts_with?("'") && arg.ends_with?("'")
      arg = "'" + arg unless arg.starts_with?("'")
      arg = arg + "'" unless arg.ends_with?("'")
      arg
    end
  end
end
