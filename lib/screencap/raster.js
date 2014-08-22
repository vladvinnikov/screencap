//
// Takes a screenshot of the given URL, uses named arguments passed in like so: phantomjs raster.js arg=value arg2=value2
//
// Arguments:
// - url                      - URL to screenshot
// - output                   - page to output (e.g. /tmp/output.png)
// - width         [optional] - default 1400 - viewport width
// - height        [optional] - viewport height (defaults to page height)
// - delay         [optional] - default 2000 - delay in msec before saving screenshot

var page = new WebPage(), address, output, div, i, pair;

// use named arguments
var args = {};
for(i = 0; i < phantom.args.length; i++) {
  pair = phantom.args[i].split(/=(.*)/);
  args[pair[0]] = pair[1];
}

if( args.url ) {
  args.url = decodeURIComponent(args.url);
}

// console.log(JSON.stringify(args));

if( !args.url || !args.output ) {
  console.log('Usage: rasterize.js url=URL output=filename delay=delay');
  phantom.exit();
}

page.onConsoleMessage = function (msg) {
  console.log("from page: " + msg);
};

page.open(args.url, function (status) {
  console.log(status, args);
  if(status !== 'success') {
    console.log('Unable to load:' + args.url);
    phantom.exit();
  }
  var width = args.width || 1400;
  var height = args.height || page.evaluate(function () {
   return document.body.clientHeight;
  });
  var delay = args.delay || 2000;

  page.viewportSize = {width: args.width, height: height};

  // console.log("Waiting " + delay + "ms");

  setTimeout(function() {
    page.render(args.output);
    phantom.exit();
  }, delay)
});

