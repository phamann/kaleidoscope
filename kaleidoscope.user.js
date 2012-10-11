// ==UserScript==
// @name        Kaleidoscope.user.js
// @namespace   http://www.guardian.co.uk
// @description Greasemonkey plugin to preview guardian.co.uk content across different platforms and sizes
// @include     about:addons
// @include     http://www.guardian.co.uk/*
// @resource    test.css
// @version     0.1
// @grant       GM_addStyle
// ==/UserScript==

/**
 * Image assets, all base64 encoded
 * @type {String}
 */
var mobileSvg  = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGQ9Ik03NC45MTYtMC4wNzJIMjUuMjI5Yy0yLjU5OSwwLTQuNzA0LDIuMTA1LTQuNzA0LDQuNzAydjkwLjU5NWMwLDIuNTk4LDIuMTA3LDQuNzAzLDQuNzA0LDQuNzAzaDQ5LjY4OCAgYzIuNTk5LDAsNC43MDQtMi4xMDUsNC43MDQtNC43MDNWNC42M0M3OS42MiwyLjAzMyw3Ny41MTMtMC4wNzIsNzQuOTE2LTAuMDcyeiBNNTEuNzg3LDMuOTY0YzAuNjMsMCwxLjE0LDAuNTExLDEuMTQsMS4xMzkgIGMwLDAuNjI5LTAuNTEsMS4xNC0xLjE0LDEuMTRjLTAuNjI4LDAtMS4xMzgtMC41MTEtMS4xMzgtMS4xNEM1MC42NDksNC40NzUsNTEuMTU5LDMuOTY0LDUxLjc4NywzLjk2NHogTTQ4LjM1NiwzLjk2NCAgYzAuNjI5LDAsMS4xMzksMC41MTEsMS4xMzksMS4xMzljMCwwLjYyOS0wLjUxLDEuMTQtMS4xMzksMS4xNGMtMC42MzEsMC0xLjE0LTAuNTExLTEuMTQtMS4xNCAgQzQ3LjIxNyw0LjQ3NSw0Ny43MjYsMy45NjQsNDguMzU2LDMuOTY0eiBNNTAuMDcyLDkwLjcwOWMtMi41OTksMC00LjcwNC0yLjEwNS00LjcwNC00LjcwNWMwLTIuNTk2LDIuMTA1LTQuNjk5LDQuNzA0LTQuNjk5ICBjMi41OTgsMCw0LjcwNCwyLjEwNCw0LjcwNCw0LjY5OUM1NC43NzYsODguNjA0LDUyLjY3LDkwLjcwOSw1MC4wNzIsOTAuNzA5eiBNNzMuNzU3LDc1Ljk4MkgyNi4zODlWOS4zMzRoNDcuMzY4Vjc1Ljk4MnoiLz4KPC9zdmc+';
var loadingGif = 'data:image/gif;base64,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';

/**
 * Big inline css string
 * Add new declarations to the bottom
 */
var html_prefix = 'gu-gm-ka-';
var css_prefix = '.' + html_prefix;

var css = css_prefix+'cta {' +
    'display: block;'+
    'position: fixed;'+
    'width:30px;'+
    'height:30px;'+
    'top:20px;'+
    'right:20px;'+
    'background-color: #ddd;'+
    'padding: 10px;'+
    'border-radius: 6px;'+
    'cursor:pointer;'+
'}'+
css_prefix+'cta:hover {'+
    'background-color: #ccc;'+
'}'+
css_prefix+'cta img {'+
    'margin: 0px;'+
    'padding: 0px;'+
'}' +
css_prefix + "phone { " +
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



/**
 * Global object - nothing should be outside this
 * @type {Object}
 */
var Kaleidoscope = {

    config : {},

    /**
     * Where the shit goes down
     */
    init : function() {
        this.config.path = window.location.pathname;

        var regex = /gallery|video/g;
        var isSupportedPath = this.config.path.match(regex);

        //Ensure we are not on video or gallery page
        if(isSupportedPath === null) {
            this.config.type = (this.config.path === '/') ? 'front' : 'article';
            this.initConfig();
            this.initCta();
        //Else exit out of script
        } else {
            return false;
        }
    },

    /**
     * Constructs cta button and appends to dom
     */
    initCta : function() {
        var that = this,
            cta = document.createElement('a'),
            svg = new Image();


        cta.onclick = function() {
            svg.src = loadingGif;
            that.loadFrame();
        };

        svg.onload = function() {
            cta.appendChild(svg);
            document.body.appendChild(cta);
        };

        cta.className = html_prefix+'cta';

        svg.width = 30;
        svg.height = 30;
        svg.src = mobileSvg;
    },

    /**
     * Constructs global config object
     */
    initConfig : function() {

        this.config.issOpen = false;

        this.config.images = [
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

        this.config.frame_src = "http://beta.guardian.co.uk"+this.config.path+"?gu.prefs.font-family=1";
    },

    /**
     * Loads main iframe and appends to DOM
     * Inits event listeners to swicth between views
     */
    loadFrame : function() {

        var container = document.createElement('div');
        container.className = html_prefix + "container";
        document.body.appendChild(container);

        for (var i in this.config.images) {
            var img = this.config.images[i];
            var item_to_append_to = container;

            if (img.title) {
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
        frame.setAttribute('src', this.config.frame_src);
        frame.className = html_prefix + 'frame';
        container.appendChild(frame);

    }

};

//Where the shit all goes down
GM_addStyle(css);
Kaleidoscope.init();