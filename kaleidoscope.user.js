// ==UserScript==
// @name        Kaleidoscope.user.js
// @namespace   http://www.guardian.co.uk
// @description Greasemonkey plugin to preview guardian.co.uk content across different platforms and sizes
// @include     about:addons
// @include     http://www.guardian.co.uk/*
// @include     http://www.guprod.gnl/*
// @version     0.1
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/**
 * Image assets, all base64 encoded
 * @type {String}
 */
var mobileSvg  = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGQ9Ik03NC45MTYtMC4wNzJIMjUuMjI5Yy0yLjU5OSwwLTQuNzA0LDIuMTA1LTQuNzA0LDQuNzAydjkwLjU5NWMwLDIuNTk4LDIuMTA3LDQuNzAzLDQuNzA0LDQuNzAzaDQ5LjY4OCAgYzIuNTk5LDAsNC43MDQtMi4xMDUsNC43MDQtNC43MDNWNC42M0M3OS42MiwyLjAzMyw3Ny41MTMtMC4wNzIsNzQuOTE2LTAuMDcyeiBNNTEuNzg3LDMuOTY0YzAuNjMsMCwxLjE0LDAuNTExLDEuMTQsMS4xMzkgIGMwLDAuNjI5LTAuNTEsMS4xNC0xLjE0LDEuMTRjLTAuNjI4LDAtMS4xMzgtMC41MTEtMS4xMzgtMS4xNEM1MC42NDksNC40NzUsNTEuMTU5LDMuOTY0LDUxLjc4NywzLjk2NHogTTQ4LjM1NiwzLjk2NCAgYzAuNjI5LDAsMS4xMzksMC41MTEsMS4xMzksMS4xMzljMCwwLjYyOS0wLjUxLDEuMTQtMS4xMzksMS4xNGMtMC42MzEsMC0xLjE0LTAuNTExLTEuMTQtMS4xNCAgQzQ3LjIxNyw0LjQ3NSw0Ny43MjYsMy45NjQsNDguMzU2LDMuOTY0eiBNNTAuMDcyLDkwLjcwOWMtMi41OTksMC00LjcwNC0yLjEwNS00LjcwNC00LjcwNWMwLTIuNTk2LDIuMTA1LTQuNjk5LDQuNzA0LTQuNjk5ICBjMi41OTgsMCw0LjcwNCwyLjEwNCw0LjcwNCw0LjY5OUM1NC43NzYsODguNjA0LDUyLjY3LDkwLjcwOSw1MC4wNzIsOTAuNzA5eiBNNzMuNzU3LDc1Ljk4MkgyNi4zODlWOS4zMzRoNDcuMzY4Vjc1Ljk4MnoiLz4KPC9zdmc+';
var loadingGif = 'data:image/gif;base64,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';
var closeButtonSvg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojMDEwMTAxOyIgcG9pbnRzPSIxMDAsNzkuOTk0IDY5Ljk3OCw1MCAxMDAsMjAuMDA2IDc5Ljk5NCwwIDUwLDMwLjAwOCAxOS45OTIsMCAwLDIwLjAwNiAyOS45OTQsNTAgMCw3OS45OTQgICAxOS45OTIsMTAwIDUwLDY5Ljk5MiA3OS45OTQsMTAwICIvPgo8L3N2Zz4=';


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
    "position: fixed;" +
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
    "background-color: #fff;" +
    "border-radius: 10px;" +
"}" +
css_prefix + "on {" +
    "display:block;"+
"}" +
css_prefix + "off {" +
    "display:none;"+
"}" +
css_prefix + "btn-aggregator," +
css_prefix + "btn-mdot," +
css_prefix + "btn-responsive {" +
    "position: absolute;" +
    "z-index: 20000;" +
    "top: 8px;" +
"}" +
css_prefix + "btn-responsive {" +
    "right: 80px;" +
"}" +
css_prefix + "btn-mdot {" +
    "right: 57px;" +
"}" +
css_prefix + "btn-aggregator {" +
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
            this.config.pageType = (this.config.path === '/') ? 'front' : 'article';
            this.initConfig();

            var simulateClick = false;
            if (localStorage.getItem(html_prefix + 'pref') === "on") {
                simulateClick = true;
            }

            this.initCta(simulateClick);

        //Else exit out of script
        } else {
            return false;
        }
    },

    /**
     * Constructs cta button and appends to dom
     */
    initCta : function(simulateClick) {
        var that = this,
            cta = document.createElement('a'),
            svg = new Image();

        cta.onclick = function() {
            
            that.parseDraftContent();

            if (!that.config.isOpen) { // first click
                svg.src = loadingGif;
                that.loadFrame();
            } else { // toggling
                svg.src = mobileSvg;
                that.destroyFrame();
            }
        };

        svg.onload = function() {
            cta.appendChild(svg);
            document.body.appendChild(cta);
        };

        cta.className = html_prefix+'cta';

        svg.width = 30;
        svg.height = 30;
        svg.src = mobileSvg;

        if (simulateClick) {
            cta.click();
        }
    },

    /**
     * Constructs global config object
     */
    initConfig : function() {

        this.config.issOpen = false;

        this.config.isDraftContent = document.querySelectorAll('#template-info span.draft').length;

        this.config.types = {
            responsive: 'responsive',
            mdot: 'mdot',
            aggregator: 'aggregator'
        };

        this.config.images = [
            {
                'class': html_prefix + 'phone',
                'src': 'http://i.imgur.com/zfUaF.png'
            },
            {
                'class': html_prefix + 'btn-aggregator',
                'src': 'http://i.imgur.com/Uyl09.png',
                'type' : this.config.types.aggregator,
                'title': 'Mobile Apps'
            },
            {
                'class': html_prefix + 'btn-mdot',
                'src': 'http://i.imgur.com/Cxsgc.png',
                'type' : this.config.types.mdot,
                'title': 'Current mobile site'
            },
            {
                'class': html_prefix + 'btn-responsive',
                'src': 'http://i.imgur.com/QJFty.png',
                'type' : this.config.types.responsive,
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
        var that = this;
        var container = document.createElement('div');
        container.className = html_prefix + "container";
        document.body.appendChild(container);

        for (var i in this.config.images) {
            var img = this.config.images[i];
            var item_to_append_to = container;

            if (img.title) {
                var link = document.createElement('a');
                link.setAttribute('title', img.title);
                link.setAttribute('href', 'javascript://');
                container.appendChild(link);
                item_to_append_to = link;

                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    var type = e.target.getAttribute('data-type');

                    if(type === 'aggregator' && that.config.pageType === 'article') {
                        return;
                    }

                    that.switchView(type);
                });
            }

            var imgElm = document.createElement('img');
            imgElm.className = img['class'];
            imgElm.setAttribute('data-type', img.type);
            imgElm.src = img.src;
            item_to_append_to.appendChild(imgElm);
        }

        for(var t in this.config.types) {
            var type = this.config.types[t],
                el = 'iframe',
                state = 'off';

            if(this.config.types[t] === 'responsive') state = 'on';
            if(this.config.types[t] === 'aggregator') el = 'div';

            this.createContainer(type, el, container, state);
        }

        var responsiveFrame  = document.getElementsByClassName(html_prefix + 'responsive')[0];

        if(this.config.isDraftContent) {
            this.parseDraftContent();
        } else {
            responsiveFrame.src = this.config.frame_src;
        }
    },

    createContainer : function(type, element, container, state) {
        var el = document.createElement(element);
        el.classList.add(html_prefix + type);
        el.classList.add(html_prefix + 'frame');
        el.classList.add(html_prefix + state);

        if(element === 'iframe') {
            el.setAttribute('frameborder', '0');
        }

        container.appendChild(el);
    },

    switchView : function(type) {

        var frames = document.getElementsByClassName(html_prefix + 'frame'),
            length = frames.length,
            i=0,
            el;

        for(; i < length; i++) {
            frames[i].classList.remove(html_prefix + 'on');
            frames[i].classList.add(html_prefix + 'off');
        }

        switch(type) {
            case 'responsive' :
                el = document.getElementsByClassName(html_prefix + 'responsive')[0];
                break;
            case 'mdot' :
                el = document.getElementsByClassName(html_prefix + 'mdot')[0];
                this.loadMdot(el);
                break;
            case 'aggregator'  :
                el = document.getElementsByClassName(html_prefix + 'aggregator')[0];
                this.loadAggregator();
                break;
        }

        el.classList.remove(html_prefix + 'off');
        el.classList.add(html_prefix + 'on');
    },


    loadMdot : function(el) {
        var url = 'http://m.guardian.co.uk/ms/p/gnm/op/sNu9hnk7ho6QPSkOd_cicLg/view.m?id=15&gid=';
        url += this.config.path;
        el.src = url;
    },

    loadAggregator : function() {
        console.log('foo');
    },

    destroyFrame : function () {
        localStorage.removeItem(html_prefix + 'pref');
        var frame = document.querySelector(css_prefix + 'container');
        frame.parentNode.removeChild(frame);
        this.config.isOpen = false;
    },

    frameLoaded : function () {
        localStorage.setItem(html_prefix + 'pref', "on");
        var container = document.querySelector(css_prefix + 'container');
        var cta = document.querySelector(css_prefix + 'cta img');
        cta.src = closeButtonSvg;
        container.style.display = 'block';
    },

    parseDraftContent : function () {
        // might make more sense to use a URL in a "global" section to prevent all previews having developer blog section styles
        var betaUrl = 'http://beta.gucode.co.uk/info/developer-blog/2012/oct/05/functional-programming-scala-week-three';
     
        GM_xmlhttpRequest({
            method: "GET",
            url: betaUrl,
            onload: function(response) {
                var template = response.responseText;
              
                // first get the current article elements
                var image = document.querySelector('#main-content-picture');
                var headline = document.querySelector('#main-article-info h1');
                var standfirst = document.querySelector('#stand-first');
                var articleBody = document.querySelector('#article-body-blocks');
                var byline = document.querySelector('span.blog-byline-kick');

                // now make a fake article
                var placeholder = document.createElement('div');
                placeholder.innerHTML = template;

                // find the right bits
                var imagePlaceholder = placeholder.querySelector('figure'); // not sure if this is the only one, inline images?
                var headlinePlaceholder = placeholder.querySelector('header h1');
                var standfirstPlaceholder = placeholder.querySelector('header .standfirst');
                var bodyPlaceholder = placeholder.querySelector('article .article-body');
                var bylinePlaceholder = placeholder.querySelector('p.byline');

                // and swap them for the current ones
                imagePlaceholder.innerHTML = image.innerHTML;
                headlinePlaceholder.innerHTML = headline.innerHTML;
                standfirstPlaceholder.innerHTML = standfirst.innerHTML;
                bodyPlaceholder.innerHTML = articleBody.innerHTML;
                bylinePlaceholder.innerHTML = byline.innerText;

                // now take out the stuff we don't support
                var unsupported = placeholder.querySelectorAll('span.embed-media');
                for (var i=0, l=unsupported.length; i<l; i++) {
                    var u = unsupported[i];
                    u.parentNode.removeChild(u);
                }

                // now add that mother to the DOM
                var src =  "data:text/html;charset=utf-8," + escape(placeholder.innerHTML);
                document.getElementsByClassName(html_prefix + 'responsive')[0].src = src;
            }
        });

    }

};

//Where the shit all goes down
GM_addStyle(css);
Kaleidoscope.init();