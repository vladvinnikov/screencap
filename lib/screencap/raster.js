var page = new WebPage(),
    address, output, div, i, pair;

// use named arguments
var args = {};
for(i = 0; i < phantom.args.length; i++) {
    pair = phantom.args[i].split(/=(.*)/);
    args[pair[0]] = pair[1];
}

if( args.url ) {
    args.url = decodeURIComponent(args.url);
}

console.log(JSON.stringify(args));

if( !args.url || !args.output ) {
    console.log('Usage: rasterize.js url=URL output=filename');
    phantom.exit();
}

page.onConsoleMessage = function (msg) {
    console.log("from page: " + msg);
};

page.open(args.url, function (status) {
    if(status !== 'success') {
        console.log('Unable to load:' + args.url);
        phantom.exit();
    }
    
    page.render(args.output);

    phantom.exit();
});

