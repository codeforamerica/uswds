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

  const isElement$1 = (value) =>
    value && typeof value === "object" && value.nodeType === 1;

  /**
   * @name select
   * @desc selects elements from the DOM by class selector or ID selector.
   * @param {string} selector - The selector to traverse the DOM with.
   * @param {Document|HTMLElement?} context - The context to traverse the DOM
   *   in. If not provided, it defaults to the document.
   * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
   */
  var select$2 = (selector, context) => {
    if (typeof selector !== "string") {
      return [];
    }

    if (!context || !isElement$1(context)) {
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

  var behavior$3 = function behavior(events, props) {
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
  const Behavior = behavior$3;

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
  var behavior$2 = (events, props) =>
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
  function isElementInViewport$2(
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

  var isInViewport = isElementInViewport$2;

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

  const select$1 = select$2;
  const behavior$1 = behavior$2;
  const toggle = toggle$1;
  const isElementInViewport$1 = isInViewport;
  const { CLICK } = events;
  const { prefix: PREFIX$1 } = config;

  const ACCORDION = `.${PREFIX$1}-accordion, .${PREFIX$1}-accordion--bordered`;
  const BUTTON = `.${PREFIX$1}-accordion__button[aria-controls]`;
  const EXPANDED = "aria-expanded";
  const MULTISELECTABLE = "data-allow-multiple";

  /**
   * Get an Array of button elements belonging directly to the given
   * accordion element.
   * @param {HTMLElement} accordion
   * @return {array<HTMLButtonElement>}
   */
  const getAccordionButtons = (accordion) => {
    const buttons = select$1(BUTTON, accordion);

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

  const accordion$1 = behavior$1(
    {
      [CLICK]: {
        [BUTTON]() {
          toggleButton(this);

          if (this.getAttribute(EXPANDED) === "true") {
            // We were just expanded, but if another accordion was also just
            // collapsed, we may no longer be in the viewport. This ensures
            // that we are still visible, so the user isn't confused.
            if (!isElementInViewport$1(this)) this.scrollIntoView();
          }
        },
      },
    },
    {
      init(root) {
        select$1(BUTTON, root).forEach((button) => {
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

  var src$1 = accordion$1;

  const select = select$2;
  /**
   * @name isElement
   * @desc returns whether or not the given argument is a DOM element.
   * @param {any} value
   * @return {boolean}
   */
  const isElement = (value) =>
    value && typeof value === "object" && value.nodeType === 1;

  /**
   * @name selectOrMatches
   * @desc selects elements from the DOM by class selector or ID selector.
   * @param {string} selector - The selector to traverse the DOM with.
   * @param {Document|HTMLElement?} context - The context to traverse the DOM
   *   in. If not provided, it defaults to the document.
   * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
   */
  var selectOrMatches$1 = (selector, context) => {
    const selection = select(selector, context);
    if (typeof selector !== "string") {
      return selection;
    }

    if (isElement(context) && context.matches(selector)) {
      selection.push(context);
    }

    return selection;
  };

  // Tooltips
  const selectOrMatches = selectOrMatches$1;
  const behavior = behavior$2;
  const { prefix: PREFIX } = config;
  const isElementInViewport = isInViewport;

  const TOOLTIP = `.${PREFIX}-tooltip`;
  const TOOLTIP_TRIGGER = `.${PREFIX}-tooltip__trigger`;
  const TOOLTIP_TRIGGER_CLASS = `${PREFIX}-tooltip__trigger`;
  const TOOLTIP_CLASS = `${PREFIX}-tooltip`;
  const TOOLTIP_BODY_CLASS = `${PREFIX}-tooltip__body`;
  const SET_CLASS = "is-set";
  const VISIBLE_CLASS = "is-visible";
  const TRIANGLE_SIZE = 5;
  const ADJUST_WIDTH_CLASS = `${PREFIX}-tooltip__body--wrap`;

  /**
   *
   * @param {DOMElement} trigger - The tooltip trigger
   * @returns {object} Elements for initialized tooltip; includes trigger, wrapper, and body
   */
  const getTooltipElements = (trigger) => {
    const wrapper = trigger.parentNode;
    const body = wrapper.querySelector(`.${TOOLTIP_BODY_CLASS}`);

    return { trigger, wrapper, body };
  };

  /**
   * Shows the tooltip
   * @param {HTMLElement} tooltipTrigger - the element that initializes the tooltip
   */
  const showToolTip = (tooltipBody, tooltipTrigger, position) => {
    tooltipBody.setAttribute("aria-hidden", "false");

    // This sets up the tooltip body. The opacity is 0, but
    // we can begin running the calculations below.
    tooltipBody.classList.add(SET_CLASS);

    /**
     * Position the tooltip body when the trigger is hovered
     * Removes old positioning classnames and reapplies. This allows
     * positioning to change in case the user resizes browser or DOM manipulation
     * causes tooltip to get clipped from viewport
     *
     * @param {string} setPos - can be "top", "bottom", "right", "left"
     */
    const setPositionClass = (setPos) => {
      tooltipBody.classList.remove(`${TOOLTIP_BODY_CLASS}--top`);
      tooltipBody.classList.remove(`${TOOLTIP_BODY_CLASS}--bottom`);
      tooltipBody.classList.remove(`${TOOLTIP_BODY_CLASS}--right`);
      tooltipBody.classList.remove(`${TOOLTIP_BODY_CLASS}--left`);
      tooltipBody.classList.add(`${TOOLTIP_BODY_CLASS}--${setPos}`);
    };

    /**
     * Removes old positioning styles. This allows
     * re-positioning to change without inheriting other
     * dynamic styles
     *
     * @param {HTMLElement} e - this is the tooltip body
     */
    const resetPositionStyles = (e) => {
      // we don't override anything in the stylesheet when finding alt positions
      e.style.top = null;
      e.style.bottom = null;
      e.style.right = null;
      e.style.left = null;
      e.style.margin = null;
    };

    /**
     * get margin offset calculations
     *
     * @param {HTMLElement} target - this is the tooltip body
     * @param {String} propertyValue - this is the tooltip body
     */

    const offsetMargin = (target, propertyValue) =>
      parseInt(
        window.getComputedStyle(target).getPropertyValue(propertyValue),
        10
      );

    // offsetLeft = the left position, and margin of the element, the left
    // padding, scrollbar and border of the offsetParent element
    // offsetWidth = The offsetWidth property returns the viewable width of an
    // element in pixels, including padding, border and scrollbar, but not
    // the margin.

    /**
     * Calculate margin offset
     * tooltip trigger margin(position) offset + tooltipBody offsetWidth
     * @param {String} marginPosition
     * @param {Number} tooltipBodyOffset
     * @param {HTMLElement} trigger
     */
    const calculateMarginOffset = (
      marginPosition,
      tooltipBodyOffset,
      trigger
    ) => {
      const offset =
        offsetMargin(trigger, `margin-${marginPosition}`) > 0
          ? tooltipBodyOffset - offsetMargin(trigger, `margin-${marginPosition}`)
          : tooltipBodyOffset;

      return offset;
    };

    /**
     * Positions tooltip at the top
     * @param {HTMLElement} e - this is the tooltip body
     */
    const positionTop = (e) => {
      resetPositionStyles(e); // ensures we start from the same point
      // get details on the elements object with

      const topMargin = calculateMarginOffset(
        "top",
        e.offsetHeight,
        tooltipTrigger
      );

      const leftMargin = calculateMarginOffset(
        "left",
        e.offsetWidth,
        tooltipTrigger
      );

      setPositionClass("top");
      e.style.left = `50%`; // center the element
      e.style.top = `-${TRIANGLE_SIZE}px`; // consider the pseudo element
      // apply our margins based on the offset
      e.style.margin = `-${topMargin}px 0 0 -${leftMargin / 2}px`;
    };

    /**
     * Positions tooltip at the bottom
     * @param {HTMLElement} e - this is the tooltip body
     */
    const positionBottom = (e) => {
      resetPositionStyles(e);

      const leftMargin = calculateMarginOffset(
        "left",
        e.offsetWidth,
        tooltipTrigger
      );

      setPositionClass("bottom");
      e.style.left = `50%`;
      e.style.margin = `${TRIANGLE_SIZE}px 0 0 -${leftMargin / 2}px`;
    };

    /**
     * Positions tooltip at the right
     * @param {HTMLElement} e - this is the tooltip body
     */
    const positionRight = (e) => {
      resetPositionStyles(e);

      const topMargin = calculateMarginOffset(
        "top",
        e.offsetHeight,
        tooltipTrigger
      );

      setPositionClass("right");
      e.style.top = `50%`;
      e.style.left = `${
      tooltipTrigger.offsetLeft + tooltipTrigger.offsetWidth + TRIANGLE_SIZE
    }px`;
      e.style.margin = `-${topMargin / 2}px 0 0 0`;
    };

    /**
     * Positions tooltip at the right
     * @param {HTMLElement} e - this is the tooltip body
     */
    const positionLeft = (e) => {
      resetPositionStyles(e);

      const topMargin = calculateMarginOffset(
        "top",
        e.offsetHeight,
        tooltipTrigger
      );

      // we have to check for some utility margins
      const leftMargin = calculateMarginOffset(
        "left",
        tooltipTrigger.offsetLeft > e.offsetWidth
          ? tooltipTrigger.offsetLeft - e.offsetWidth
          : e.offsetWidth,
        tooltipTrigger
      );

      setPositionClass("left");
      e.style.top = `50%`;
      e.style.left = `-${TRIANGLE_SIZE}px`;
      e.style.margin = `-${topMargin / 2}px 0 0 ${
      tooltipTrigger.offsetLeft > e.offsetWidth ? leftMargin : -leftMargin
    }px`; // adjust the margin
    };

    /**
     * We try to set the position based on the
     * original intention, but make adjustments
     * if the element is clipped out of the viewport
     * we constrain the width only as a last resort
     * @param {HTMLElement} element(alias tooltipBody)
     * @param {Number} attempt (--flag)
     */

    const maxAttempts = 2;

    function findBestPosition(element, attempt = 1) {
      // create array of optional positions
      const positions = [
        positionTop,
        positionBottom,
        positionRight,
        positionLeft,
      ];

      let hasVisiblePosition = false;

      // we take a recursive approach
      function tryPositions(i) {
        if (i < positions.length) {
          const pos = positions[i];
          pos(element);

          if (!isElementInViewport(element)) {
            // eslint-disable-next-line no-param-reassign
            tryPositions((i += 1));
          } else {
            hasVisiblePosition = true;
          }
        }
      }

      tryPositions(0);
      // if we can't find a position we compress it and try again
      if (!hasVisiblePosition) {
        element.classList.add(ADJUST_WIDTH_CLASS);
        if (attempt <= maxAttempts) {
          // eslint-disable-next-line no-param-reassign
          findBestPosition(element, (attempt += 1));
        }
      }
    }

    switch (position) {
      case "top":
        positionTop(tooltipBody);
        if (!isElementInViewport(tooltipBody)) {
          findBestPosition(tooltipBody);
        }
        break;
      case "bottom":
        positionBottom(tooltipBody);
        if (!isElementInViewport(tooltipBody)) {
          findBestPosition(tooltipBody);
        }
        break;
      case "right":
        positionRight(tooltipBody);
        if (!isElementInViewport(tooltipBody)) {
          findBestPosition(tooltipBody);
        }
        break;
      case "left":
        positionLeft(tooltipBody);
        if (!isElementInViewport(tooltipBody)) {
          findBestPosition(tooltipBody);
        }
        break;
    }

    /**
     * Actually show the tooltip. The VISIBLE_CLASS
     * will change the opacity to 1
     */
    setTimeout(() => {
      tooltipBody.classList.add(VISIBLE_CLASS);
    }, 20);
  };

  /**
   * Removes all the properties to show and position the tooltip,
   * and resets the tooltip position to the original intention
   * in case the window is resized or the element is moved through
   * DOM manipulation.
   * @param {HTMLElement} tooltipBody - The body of the tooltip
   */
  const hideToolTip = (tooltipBody) => {
    tooltipBody.classList.remove(VISIBLE_CLASS);
    tooltipBody.classList.remove(SET_CLASS);
    tooltipBody.classList.remove(ADJUST_WIDTH_CLASS);
    tooltipBody.setAttribute("aria-hidden", "true");
  };

  /**
   * Setup the tooltip component
   * @param {HTMLElement} tooltipTrigger The element that creates the tooltip
   */
  const setUpAttributes = (tooltipTrigger) => {
    const tooltipID = `tooltip-${Math.floor(Math.random() * 900000) + 100000}`;
    const tooltipContent = tooltipTrigger.getAttribute("title");
    const wrapper = document.createElement("span");
    const tooltipBody = document.createElement("span");
    const position = tooltipTrigger.getAttribute("data-position")
      ? tooltipTrigger.getAttribute("data-position")
      : "top";
    const additionalClasses = tooltipTrigger.getAttribute("data-classes");

    // Set up tooltip attributes
    tooltipTrigger.setAttribute("aria-describedby", tooltipID);
    tooltipTrigger.setAttribute("tabindex", "0");
    tooltipTrigger.removeAttribute("title");
    tooltipTrigger.classList.remove(TOOLTIP_CLASS);
    tooltipTrigger.classList.add(TOOLTIP_TRIGGER_CLASS);

    // insert wrapper before el in the DOM tree
    tooltipTrigger.parentNode.insertBefore(wrapper, tooltipTrigger);

    // set up the wrapper
    wrapper.appendChild(tooltipTrigger);
    wrapper.classList.add(TOOLTIP_CLASS);
    wrapper.appendChild(tooltipBody);

    // Apply additional class names to wrapper element
    if (additionalClasses) {
      const classesArray = additionalClasses.split(" ");
      classesArray.forEach((classname) => wrapper.classList.add(classname));
    }

    // set up the tooltip body
    tooltipBody.classList.add(TOOLTIP_BODY_CLASS);
    tooltipBody.setAttribute("id", tooltipID);
    tooltipBody.setAttribute("role", "tooltip");
    tooltipBody.setAttribute("aria-hidden", "true");

    // place the text in the tooltip
    tooltipBody.textContent = tooltipContent;

    return { tooltipBody, position, tooltipContent, wrapper };
  };

  // Setup our function to run on various events
  const tooltip$1 = behavior(
    {
      "mouseover focusin": {
        [TOOLTIP](e) {
          const trigger = e.target;
          const elementType = trigger.nodeName;

          // Initialize tooltip if it hasn't already
          if (elementType === "BUTTON" && trigger.hasAttribute("title")) {
            setUpAttributes(trigger);
          }
        },
        [TOOLTIP_TRIGGER](e) {
          const { trigger, body } = getTooltipElements(e.target);

          showToolTip(body, trigger, trigger.dataset.position);
        },
      },
      "mouseout focusout": {
        [TOOLTIP_TRIGGER](e) {
          const { body } = getTooltipElements(e.target);

          hideToolTip(body);
        },
      },
    },
    {
      init(root) {
        selectOrMatches(TOOLTIP, root).forEach((tooltipTrigger) => {
          setUpAttributes(tooltipTrigger);
        });
      },
      setup: setUpAttributes,
      getTooltipElements,
      show: showToolTip,
      hide: hideToolTip,
    }
  );

  var src = tooltip$1;

  const accordion = src$1;
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
  const tooltip = src;
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
    tooltip,
    // validator,
  };

  /**
   * Copy of @uswds/uswds/packages/uswds-core/src/js/start.js
   *
   * Likely, this script can be made into an ES module
   */

  window.uswdsPresent = true; // GLOBAL variable to indicate that the uswds.js has loaded in the DOM.

  /**
   * The 'polyfills' define key ECMAScript 5 methods that may be missing from
   * older browsers, so must be loaded first.
   */



  const uswds = config;

  const components = components$1;
  const svg4everybody = svg4everybodyExports;

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
