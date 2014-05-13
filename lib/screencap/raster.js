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
    console.log('Usage: rasterize.js url=URL output=filename width=width[optional] (div=div[optional] OR top=top left=left width=width height=height)');
    phantom.exit();
}

mask = {};

if(!args.width) { args.width = 1000; }

if( args.top && args.left && args.width && args.height) { // defining a mask to take
    mask.top    = args.top;
    mask.left   = args.left;
    mask.width  = args.width;
    mask.height = args.height;
}

// console.log(args.url, args.output, args.div);

function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}

page.onConsoleMessage = function (msg) {
    console.log("from page: " + msg);
};

if(!args.viewportWidth) { args.viewportWidth = 1024; }
if(!args.viewportHeight) { args.viewportHeight = 1024; }

page.viewportSize = { width: args.viewportWidth, height: args.viewportHeight };

page.open(args.url, function (status) {
    if(status !== 'success') {
        console.log('Unable to load:' + args.url);
        phantom.exit();
    }
    
    var foundDiv = true;
    page.evaluate(function(){jQuery.noConflict();});

    if (mask){
        page.clipRect = mask;
    }

    if(foundDiv){ page.render(args.output);}
    phantom.exit();
});
