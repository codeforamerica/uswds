var Default = (function () {
  'use strict';

  var js = {};

  /*
   * classList.js: Cross-browser full element.classList implementation.
   * 2014-07-23
   *
   * By Eli Grey, http://eligrey.com
   * Public Domain.
   * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
   */

  /*global self, document, DOMException */

  /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

  /* Copied from MDN:
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
   */

  if ("document" in window.self) {

    // Full polyfill for browsers with no classList support
    // Including IE < Edge missing SVGElement.classList
    if (!("classList" in document.createElement("_"))
      || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

    (function (view) {

      if (!('Element' in view)) return;

      var
          classListProp = "classList"
        , protoProp = "prototype"
        , elemCtrProto = view.Element[protoProp]
        , objCtr = Object
        , strTrim = String[protoProp].trim || function () {
          return this.replace(/^\s+|\s+$/g, "");
        }
        , arrIndexOf = Array[protoProp].indexOf || function (item) {
          var
              i = 0
            , len = this.length
          ;
          for (; i < len; i++) {
            if (i in this && this[i] === item) {
              return i;
            }
          }
          return -1;
        }
        // Vendors: please allow content code to instantiate DOMExceptions
        , DOMEx = function (type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        }
        , checkTokenAndGetIndex = function (classList, token) {
          if (token === "") {
            throw new DOMEx(
                "SYNTAX_ERR"
              , "An invalid or illegal string was specified"
            );
          }
          if (/\s/.test(token)) {
            throw new DOMEx(
                "INVALID_CHARACTER_ERR"
              , "String contains an invalid character"
            );
          }
          return arrIndexOf.call(classList, token);
        }
        , ClassList = function (elem) {
          var
              trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
          ;
          for (; i < len; i++) {
            this.push(classes[i]);
          }
          this._updateClassName = function () {
            elem.setAttribute("class", this.toString());
          };
        }
        , classListProto = ClassList[protoProp] = []
        , classListGetter = function () {
          return new ClassList(this);
        }
      ;
      // Most DOMException implementations don't allow calling DOMException's toString()
      // on non-DOMExceptions. Error's toString() is sufficient here.
      DOMEx[protoProp] = Error[protoProp];
      classListProto.item = function (i) {
        return this[i] || null;
      };
      classListProto.contains = function (token) {
        token += "";
        return checkTokenAndGetIndex(this, token) !== -1;
      };
      classListProto.add = function () {
        var
            tokens = arguments
          , i = 0
          , l = tokens.length
          , token
          , updated = false
        ;
        do {
          token = tokens[i] + "";
          if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
          }
        }
        while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.remove = function () {
        var
            tokens = arguments
          , i = 0
          , l = tokens.length
          , token
          , updated = false
          , index
        ;
        do {
          token = tokens[i] + "";
          index = checkTokenAndGetIndex(this, token);
          while (index !== -1) {
            this.splice(index, 1);
            updated = true;
            index = checkTokenAndGetIndex(this, token);
          }
        }
        while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.toggle = function (token, force) {
        token += "";

        var
            result = this.contains(token)
          , method = result ?
            force !== true && "remove"
          :
            force !== false && "add"
        ;

        if (method) {
          this[method](token);
        }

        if (force === true || force === false) {
          return force;
        } else {
          return !result;
        }
      };
      classListProto.toString = function () {
        return this.join(" ");
      };

      if (objCtr.defineProperty) {
        var classListPropDesc = {
            get: classListGetter
          , enumerable: true
          , configurable: true
        };
        try {
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) { // IE 8 doesn't support enumerable:true
          if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
      }

      }(window.self));

      } else {
      // There is full or partial native classList support, so just check if we need
      // to normalize the add/remove and toggle APIs.

      (function () {

        var testElement = document.createElement("_");

        testElement.classList.add("c1", "c2");

        // Polyfill for IE 10/11 and Firefox <26, where classList.add and
        // classList.remove exist but support only one argument at a time.
        if (!testElement.classList.contains("c2")) {
          var createMethod = function(method) {
            var original = DOMTokenList.prototype[method];

            DOMTokenList.prototype[method] = function(token) {
              var i, len = arguments.length;

              for (i = 0; i < len; i++) {
                token = arguments[i];
                original.call(this, token);
              }
            };
          };
          createMethod('add');
          createMethod('remove');
        }

        testElement.classList.toggle("c3", false);

        // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
        // support the second argument.
        if (testElement.classList.contains("c3")) {
          var _toggle = DOMTokenList.prototype.toggle;

          DOMTokenList.prototype.toggle = function(token, force) {
            if (1 in arguments && !this.contains(token) === !force) {
              return force;
            } else {
              return _toggle.call(this, token);
            }
          };

        }

        testElement = null;
      }());
    }
  }

  const elproto = window.HTMLElement.prototype;
  const HIDDEN$1 = "hidden";

  if (!(HIDDEN$1 in elproto)) {
    Object.defineProperty(elproto, HIDDEN$1, {
      get() {
        return this.hasAttribute(HIDDEN$1);
      },
      set(value) {
        if (value) {
          this.setAttribute(HIDDEN$1, "");
        } else {
          this.removeAttribute(HIDDEN$1);
        }
      },
    });
  }

  Number.isNaN =
    Number.isNaN ||
    function isNaN(input) {
      // eslint-disable-next-line no-self-compare
      return typeof input === "number" && input !== input;
    };

  /* eslint-disable consistent-return */

  /* eslint-disable func-names */
  (function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, _params) {
      const params = _params || {
        bubbles: false,
        cancelable: false,
        detail: null,
      };
      const evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      return evt;
    }

    window.CustomEvent = CustomEvent;
  })();

  var svg4everybody$1 = {exports: {}};

  /* eslint-disable */

  !(function (factory) {
    svg4everybody$1.exports = factory();
  })(function () {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target, use) {
      // if the target exists
      if (target) {
        // create a document fragment to hold the contents of the target
        var fragment = document.createDocumentFragment(),
          viewBox =
            !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
        // conditionally set the viewBox on the svg
        viewBox && svg.setAttribute("viewBox", viewBox);
        // copy the contents of the clone into the fragment
        for (
          // clone the target
          var clone = document.importNode
              ? document.importNode(target, !0)
              : target.cloneNode(!0),
            g = document.createElementNS(
              svg.namespaceURI || "http://www.w3.org/2000/svg",
              "g"
            );
          clone.childNodes.length;

        ) {
          g.appendChild(clone.firstChild);
        }
        if (use) {
          for (var i = 0; use.attributes.length > i; i++) {
            var attr = use.attributes[i];
            "xlink:href" !== attr.name &&
              "href" !== attr.name &&
              g.setAttribute(attr.name, attr.value);
          }
        }
        fragment.appendChild(g), // append the fragment into the svg
          parent.appendChild(fragment);
      }
    }
    function loadreadystatechange(xhr, use) {
      // listen to changes in the request
      (xhr.onreadystatechange = function () {
        // if the request is ready
        if (4 === xhr.readyState) {
          // get the cached html document
          var cachedDocument = xhr._cachedDocument;
          // ensure the cached html document based on the xhr response
          cachedDocument ||
            ((cachedDocument = xhr._cachedDocument =
              document.implementation.createHTMLDocument("")),
            (cachedDocument.body.innerHTML = xhr.responseText), // ensure domains are the same, otherwise we'll have issues appending the
            // element in IE 11
            cachedDocument.domain !== document.domain &&
              (cachedDocument.domain = document.domain),
            (xhr._cachedTarget = {})), // clear the xhr embeds list and embed each item
            xhr._embeds.splice(0).map(function (item) {
              // get the cached target
              var target = xhr._cachedTarget[item.id];
              // ensure the cached target
              target ||
                (target = xhr._cachedTarget[item.id] =
                  cachedDocument.getElementById(item.id)),
                // embed the target into the svg
                embed(item.parent, item.svg, target, use);
            });
        }
      }), // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
      function oninterval() {
        // if all <use>s in the array are being bypassed, don't proceed.
        if (
          numberOfSvgUseElementsToBypass &&
          uses.length - numberOfSvgUseElementsToBypass <= 0
        ) {
          return void requestAnimationFrame(oninterval, 67);
        }
        // if there are <use>s to process, proceed.
        // reset the bypass counter, since the counter will be incremented for every bypassed element,
        // even ones that were counted before.
        numberOfSvgUseElementsToBypass = 0;
        // while the index exists in the live <use> collection
        for (
          // get the cached <use> index
          var index = 0;
          index < uses.length;

        ) {
          // get the current <use>
          var use = uses[index],
            parent = use.parentNode,
            svg = getSVGAncestor(parent),
            src = use.getAttribute("xlink:href") || use.getAttribute("href");
          if (
            (!src &&
              opts.attributeName &&
              (src = use.getAttribute(opts.attributeName)),
            svg && src)
          ) {
            if (polyfill) {
              if (!opts.validate || opts.validate(src, svg, use)) {
                // remove the <use> element
                parent.removeChild(use);
                // parse the src and get the url and id
                var srcSplit = src.split("#"),
                  url = srcSplit.shift(),
                  id = srcSplit.join("#");
                // if the link is external
                if (url.length) {
                  // get the cached xhr request
                  var xhr = requests[url];
                  // ensure the xhr request exists
                  xhr ||
                    ((xhr = requests[url] = new XMLHttpRequest()),
                    xhr.open("GET", url),
                    xhr.send(),
                    (xhr._embeds = [])), // add the svg and id as an item to the xhr embeds list
                    xhr._embeds.push({
                      parent: parent,
                      svg: svg,
                      id: id,
                    }), // prepare the xhr ready state change event
                    loadreadystatechange(xhr, use);
                } else {
                  // embed the local id into the svg
                  embed(parent, svg, document.getElementById(id), use);
                }
              } else {
                // increase the index when the previous value was not "valid"
                ++index, ++numberOfSvgUseElementsToBypass;
              }
            }
          } else {
            // increase the index when the previous value was not "valid"
            ++index;
          }
        }
        // continue the interval
        requestAnimationFrame(oninterval, 67);
      }
      var polyfill,
        opts = Object(rawopts),
        newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
        webkitUA = /\bAppleWebKit\/(\d+)\b/,
        olderEdgeUA = /\bEdge\/12\.(\d+)\b/,
        edgeUA = /\bEdge\/.(\d+)\b/,
        inIframe = window.top !== window.self;
      polyfill =
        "polyfill" in opts
          ? opts.polyfill
          : newerIEUA.test(navigator.userAgent) ||
            (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 ||
            (navigator.userAgent.match(webkitUA) || [])[1] < 537 ||
            (edgeUA.test(navigator.userAgent) && inIframe);
      // create xhr requests object
      var requests = {},
        requestAnimationFrame = window.requestAnimationFrame || setTimeout,
        uses = document.getElementsByTagName("use"),
        numberOfSvgUseElementsToBypass = 0;
      // conditionally start the interval if the polyfill is active
      polyfill && oninterval();
    }
    function getSVGAncestor(node) {
      for (
        var svg = node;
        "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);

      ) {}
      return svg;
    }
    return svg4everybody;
  });

  var svg4everybodyExports = svg4everybody$1.exports;

  var config = {
    prefix: "usa",
  };

  /**
   * @name isElement
   * @desc returns whether or not the given argument is a DOM element.
   * @param {any} value
   * @return {boolean}
   */

  const isElement = (value) =>
    value && typeof value === "object" && value.nodeType === 1;

  /**
   * @name select
   * @desc selects elements from the DOM by class selector or ID selector.
   * @param {string} selector - The selector to traverse the DOM with.
   * @param {Document|HTMLElement?} context - The context to traverse the DOM
   *   in. If not provided, it defaults to the document.
   * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
   */
  var select$1 = (selector, context) => {
    if (typeof selector !== "string") {
      return [];
    }

    if (!context || !isElement(context)) {
      context = window.document; // eslint-disable-line no-param-reassign
    }

    const selection = context.querySelectorAll(selector);
    return Array.prototype.slice.call(selection);
  };

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  // element-closest | CC0-1.0 | github.com/jonathantneal/closest

  (function (ElementProto) {
  	if (typeof ElementProto.matches !== 'function') {
  		ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
  			var element = this;
  			var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
  			var index = 0;

  			while (elements[index] && elements[index] !== element) {
  				++index;
  			}

  			return Boolean(elements[index]);
  		};
  	}

  	if (typeof ElementProto.closest !== 'function') {
  		ElementProto.closest = function closest(selector) {
  			var element = this;

  			while (element && element.nodeType === 1) {
  				if (element.matches(selector)) {
  					return element;
  				}

  				element = element.parentNode;
  			}

  			return null;
  		};
  	}
  })(window.Element.prototype);

  // polyfill Element.prototype.closest


  var delegate$2 = function delegate(selector, fn) {
    return function delegation(event) {
      var target = event.target.closest(selector);
      if (target) {
        return fn.call(target, event);
      }
    }
  };

  var compose$1 = function compose(functions) {
    return function(e) {
      return functions.some(function(fn) {
        return fn.call(this, e) === false;
      }, this);
    };
  };

  const delegate$1 = delegate$2;
  const compose = compose$1;

  const SPLAT = '*';

  var delegateAll$1 = function delegateAll(selectors) {
    const keys = Object.keys(selectors);

    // XXX optimization: if there is only one handler and it applies to
    // all elements (the "*" CSS selector), then just return that
    // handler
    if (keys.length === 1 && keys[0] === SPLAT) {
      return selectors[SPLAT];
    }

    const delegates = keys.reduce(function(memo, selector) {
      memo.push(delegate$1(selector, selectors[selector]));
      return memo;
    }, []);
    return compose(delegates);
  };

  const assign$1 = objectAssign;
  const delegate = delegate$2;
  const delegateAll = delegateAll$1;

  const DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/;
  const SPACE = ' ';

  const getListeners = function(type, handler) {
    var match = type.match(DELEGATE_PATTERN);
    var selector;
    if (match) {
      type = match[1];
      selector = match[2];
    }

    var options;
    if (typeof handler === 'object') {
      options = {
        capture: popKey(handler, 'capture'),
        passive: popKey(handler, 'passive')
      };
    }

    var listener = {
      selector: selector,
      delegate: (typeof handler === 'object')
        ? delegateAll(handler)
        : selector
          ? delegate(selector, handler)
          : handler,
      options: options
    };

    if (type.indexOf(SPACE) > -1) {
      return type.split(SPACE).map(function(_type) {
        return assign$1({type: _type}, listener);
      });
    } else {
      listener.type = type;
      return [listener];
    }
  };

  var popKey = function(obj, key) {
    var value = obj[key];
    delete obj[key];
    return value;
  };

  var behavior$2 = function behavior(events, props) {
    const listeners = Object.keys(events)
      .reduce(function(memo, type) {
        var listeners = getListeners(type, events[type]);
        return memo.concat(listeners);
      }, []);

    return assign$1({
      add: function addBehavior(element) {
        listeners.forEach(function(listener) {
          element.addEventListener(
            listener.type,
            listener.delegate,
            listener.options
          );
        });
      },
      remove: function removeBehavior(element) {
        listeners.forEach(function(listener) {
          element.removeEventListener(
            listener.type,
            listener.delegate,
            listener.options
          );
        });
      }
    }, props);
  };

  const assign = objectAssign;
  const Behavior = behavior$2;

  /**
   * @name sequence
   * @param {...Function} seq an array of functions
   * @return { closure } callHooks
   */
  // We use a named function here because we want it to inherit its lexical scope
  // from the behavior props object, not from the module
  const sequence = (...seq) =>
    function callHooks(target = document.body) {
      seq.forEach((method) => {
        if (typeof this[method] === "function") {
          this[method].call(this, target);
        }
      });
    };

  /**
   * @name behavior
   * @param {object} events
   * @param {object?} props
   * @return {receptor.behavior}
   */
  var behavior$1 = (events, props) =>
    Behavior(
      events,
      assign(
        {
          on: sequence("init", "add"),
          off: sequence("teardown", "remove"),
        },
        props
      )
    );

  const EXPANDED$1 = "aria-expanded";
  const CONTROLS = "aria-controls";
  const HIDDEN = "hidden";

  var toggle$1 = (button, expanded) => {
    let safeExpanded = expanded;

    if (typeof safeExpanded !== "boolean") {
      safeExpanded = button.getAttribute(EXPANDED$1) === "false";
    }

    button.setAttribute(EXPANDED$1, safeExpanded);

    const id = button.getAttribute(CONTROLS);
    const controls = document.getElementById(id);
    if (!controls) {
      throw new Error(`No toggle target found with id: "${id}"`);
    }

    if (safeExpanded) {
      controls.removeAttribute(HIDDEN);
    } else {
      controls.setAttribute(HIDDEN, "");
    }

    return safeExpanded;
  };

  // https://stackoverflow.com/a/7557433
  function isElementInViewport$1(
    el,
    win = window,
    docEl = document.documentElement
  ) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (win.innerHeight || docEl.clientHeight) &&
      rect.right <= (win.innerWidth || docEl.clientWidth)
    );
  }

  var isInViewport = isElementInViewport$1;

  var events = {
    // This used to be conditionally dependent on whether the
    // browser supported touch events; if it did, `CLICK` was set to
    // `touchstart`.  However, this had downsides:
    //
    // * It pre-empted mobile browsers' default behavior of detecting
    //   whether a touch turned into a scroll, thereby preventing
    //   users from using some of our components as scroll surfaces.
    //
    // * Some devices, such as the Microsoft Surface Pro, support *both*
    //   touch and clicks. This meant the conditional effectively dropped
    //   support for the user's mouse, frustrating users who preferred
    //   it on those systems.
    CLICK: "click",
  };

  const select = select$1;
  const behavior = behavior$1;
  const toggle = toggle$1;
  const isElementInViewport = isInViewport;
  const { CLICK } = events;
  const { prefix: PREFIX } = config;

  const ACCORDION = `.${PREFIX}-accordion, .${PREFIX}-accordion--bordered`;
  const BUTTON = `.${PREFIX}-accordion__button[aria-controls]`;
  const EXPANDED = "aria-expanded";
  const MULTISELECTABLE = "data-allow-multiple";

  /**
   * Get an Array of button elements belonging directly to the given
   * accordion element.
   * @param {HTMLElement} accordion
   * @return {array<HTMLButtonElement>}
   */
  const getAccordionButtons = (accordion) => {
    const buttons = select(BUTTON, accordion);

    return buttons.filter((button) => button.closest(ACCORDION) === accordion);
  };

  /**
   * Toggle a button's "pressed" state, optionally providing a target
   * state.
   *
   * @param {HTMLButtonElement} button
   * @param {boolean?} expanded If no state is provided, the current
   * state will be toggled (from false to true, and vice-versa).
   * @return {boolean} the resulting state
   */
  const toggleButton = (button, expanded) => {
    const accordion = button.closest(ACCORDION);
    let safeExpanded = expanded;

    if (!accordion) {
      throw new Error(`${BUTTON} is missing outer ${ACCORDION}`);
    }

    safeExpanded = toggle(button, expanded);

    // XXX multiselectable is opt-in, to preserve legacy behavior
    const multiselectable = accordion.hasAttribute(MULTISELECTABLE);

    if (safeExpanded && !multiselectable) {
      getAccordionButtons(accordion).forEach((other) => {
        if (other !== button) {
          toggle(other, false);
        }
      });
    }
  };

  /**
   * @param {HTMLButtonElement} button
   * @return {boolean} true
   */
  const showButton = (button) => toggleButton(button, true);

  /**
   * @param {HTMLButtonElement} button
   * @return {boolean} false
   */
  const hideButton = (button) => toggleButton(button, false);

  const accordion$1 = behavior(
    {
      [CLICK]: {
        [BUTTON]() {
          toggleButton(this);

          if (this.getAttribute(EXPANDED) === "true") {
            // We were just expanded, but if another accordion was also just
            // collapsed, we may no longer be in the viewport. This ensures
            // that we are still visible, so the user isn't confused.
            if (!isElementInViewport(this)) this.scrollIntoView();
          }
        },
      },
    },
    {
      init(root) {
        select(BUTTON, root).forEach((button) => {
          const expanded = button.getAttribute(EXPANDED) === "true";
          toggleButton(button, expanded);
        });
      },
      ACCORDION,
      BUTTON,
      show: showButton,
      hide: hideButton,
      toggle: toggleButton,
      getButtons: getAccordionButtons,
    }
  );

  var src = accordion$1;

  const accordion = src;
  // const banner = require('../node_modules/@uswds/uswds/packages/usa-banner/src/index');
  // const characterCount = require('../node_modules/@uswds/uswds/packages/usa-character-count/src/index');
  // const comboBox = require('../node_modules/@uswds/uswds/packages/usa-combo-box/src/index');
  // const datePicker = require('../node_modules/@uswds/uswds/packages/usa-date-picker/src/index');
  // const dateRangePicker = require('../node_modules/@uswds/uswds/packages/usa-date-range-picker/src/index');
  // const fileInput = require('../node_modules/@uswds/uswds/packages/usa-file-input/src/index');
  // const footer = require('../node_modules/@uswds/uswds/packages/usa-footer/src/index');
  // const inPageNavigation = require('../node_modules/@uswds/uswds/packages/usa-in-page-navigation/src/index');
  // const inputMask = require('../node_modules/@uswds/uswds/packages/usa-input-mask/src/index');
  // const inputPrefixSuffix = require('../node_modules/@uswds/uswds/packages/usa-input-prefix-suffix/src/index');
  // const languageSelector = require('../node_modules/@uswds/uswds/packages/usa-language-selector/src/index');
  // const modal = require('../node_modules/@uswds/uswds/packages/usa-modal/src/index');
  // const navigation = require('../node_modules/@uswds/uswds/packages/usa-header/src/index');
  // const password = require('../node_modules/@uswds/uswds/packages/_usa-password/src/index');
  // const search = require('../node_modules/@uswds/uswds/packages/usa-search/src/index');
  // const skipnav = require('../node_modules/@uswds/uswds/packages/usa-skipnav/src/index');
  // const table = require('../node_modules/@uswds/uswds/packages/usa-table/src/index');
  // const timePicker = require('../node_modules/@uswds/uswds/packages/usa-time-picker/src/index');
  // const tooltip = require('../node_modules/@uswds/uswds/packages/usa-tooltip/src/index');
  // const validator = require('../node_modules/@uswds/uswds/packages/usa-validation/src/index');

  var components$1 = {
    accordion,
    // banner,
    // characterCount,
    // comboBox,
    // datePicker,
    // dateRangePicker,
    // fileInput,
    // footer,
    // inPageNavigation,
    // inputMask,
    // inputPrefixSuffix,
    // languageSelector,
    // modal,
    // navigation,
    // password,
    // search,
    // skipnav,
    // table,
    // timePicker,
    // tooltip,
    // validator,
  };

  /**
   * Copy of @uswds/uswds/packages/uswds-core/src/js/start.js
   */

  window.uswdsPresent = true; // GLOBAL variable to indicate that the uswds.js has loaded in the DOM.

  /**
   * The 'polyfills' define key ECMAScript 5 methods that may be missing from
   * older browsers, so must be loaded first.
   */


  // require("./polyfills");

  const uswds = config;
  // const uswds = require("./config");

  const components = components$1;
  // const components = require('../node_modules/@uswds/uswds/packages/uswds-core/src/js/index');
  // const components = require("./index");
  const svg4everybody = svg4everybodyExports;
  // const svg4everybody = require("./polyfills/svg4everybody");

  uswds.components = components;

  const initComponents = () => {
    const target = document.body;

    Object.keys(components).forEach((key) => {
      const behavior = components[key];

      behavior.on(target);
    });

    svg4everybody();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents, { once: true });
  } else {
    initComponents();
  }

  return js;

})();
