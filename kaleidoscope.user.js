// ==UserScript==
// @name          Kaleidoscope
// @namespace     http://www.guardian.co.uk
// @description   Purple monkey dishwasher
// @include       http://www.guardian.co.uk/*
// @include       http://www.guprod.gnl/*
// @version       0.1
// @grant         GM_addStyle
// @grant         GM_xmlhttpRequest
// ==/UserScript==

var html_prefix = 'gu-gm-ka-';
var css_prefix = '.' + html_prefix;

var images = [
    { 
        'class': html_prefix + 'phone', 
        'src': 'http://i.imgur.com/zfUaF.png'
    },
    { 
        'class': html_prefix + 'aggregator', 
        'src': 'http://i.imgur.com/Uyl09.png',
        'title': 'Mobile Apps'
    },
    { 
        'class': html_prefix + 'mdot', 
        'src': 'http://i.imgur.com/Cxsgc.png',
        'title': 'Current mobile site'
    },
    { 
        'class': html_prefix + 'responsive', 
        'src': 'http://i.imgur.com/QJFty.png',
        'title': 'New responsive site'
    }
];

var frame_src = "http://beta.guardian.co.uk?gu.prefs.font-family=1";

var css = css_prefix + "phone { " +
    "box-shadow: 1px 2px 10px #000;" +
    "border-radius: 10px;" +
    "background-color: #333;" +
"}" +
css_prefix + "container { " +
    "position: absolute;" +
    "top: 50px;" +
    "right: 20px;" +
    "z-index: 10000;" +
    "width: 369px;" +
    "height: 566px;" +    
"}" + 
css_prefix + "frame {" +
    "width: 316px;" +
    "height: 478px;" +
    "position: absolute;" +
    "top: 34px;" + 
    "right: 26px;" +
    "border-radius: 10px;" +
"}" +
css_prefix + "aggregator," +
css_prefix + "mdot," +
css_prefix + "responsive {" +
    "position: absolute;" +
    "z-index: 20000;" +
    "top: 8px;" +
"}" +
css_prefix + "responsive {" +
    "right: 80px;" +
"}" +
css_prefix + "mdot {" +
    "right: 57px;" +
"}" +
css_prefix + "aggregator {" +
    "right: 34px;" +
"}";

GM_addStyle(css);

var container = document.createElement('div');
container.className = html_prefix + "container";
document.body.appendChild(container);

for (var i in images) {
    var img = images[i];
    var item_to_append_to = container;

    if (img['title']) {
        var link = document.createElement('a');
        link.setAttribute('title', img['title']);
        link.setAttribute('href', 'javascript://');
        container.appendChild(link);
        item_to_append_to = link;
    }

    var imgElm = document.createElement('img');
    imgElm.className = img['class'];
    imgElm.src = img['src'];
    item_to_append_to.appendChild(imgElm);
}

var frame = document.createElement('iframe');
frame.setAttribute('frameborder', '0');
frame.setAttribute('src', frame_src);
frame.className = html_prefix + 'frame';
container.appendChild(frame)
