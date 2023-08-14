var Default = (function () {
	'use strict';

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

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
	var select$4 = (selector, context) => {
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

	const assign$2 = objectAssign;
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
	      return assign$2({type: _type}, listener);
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

	var behavior$6 = function behavior(events, props) {
	  const listeners = Object.keys(events)
	    .reduce(function(memo, type) {
	      var listeners = getListeners(type, events[type]);
	      return memo.concat(listeners);
	    }, []);

	  return assign$2({
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

	const assign$1 = objectAssign;
	const Behavior = behavior$6;

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
	var behavior$5 = (events, props) =>
	  Behavior(
	    events,
	    assign$1(
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

	var toggle$2 = (button, expanded) => {
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

	const select$3 = select$4;
	const behavior$4 = behavior$5;
	const toggle$1 = toggle$2;
	const isElementInViewport$1 = isInViewport;
	const { CLICK: CLICK$1 } = events;
	const { prefix: PREFIX$2 } = config;

	const ACCORDION = `.${PREFIX$2}-accordion, .${PREFIX$2}-accordion--bordered`;
	const BUTTON = `.${PREFIX$2}-accordion__button[aria-controls]`;
	const EXPANDED = "aria-expanded";
	const MULTISELECTABLE = "data-allow-multiple";

	/**
	 * Get an Array of button elements belonging directly to the given
	 * accordion element.
	 * @param {HTMLElement} accordion
	 * @return {array<HTMLButtonElement>}
	 */
	const getAccordionButtons = (accordion) => {
	  const buttons = select$3(BUTTON, accordion);

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
	const toggleButton$1 = (button, expanded) => {
	  const accordion = button.closest(ACCORDION);
	  let safeExpanded = expanded;

	  if (!accordion) {
	    throw new Error(`${BUTTON} is missing outer ${ACCORDION}`);
	  }

	  safeExpanded = toggle$1(button, expanded);

	  // XXX multiselectable is opt-in, to preserve legacy behavior
	  const multiselectable = accordion.hasAttribute(MULTISELECTABLE);

	  if (safeExpanded && !multiselectable) {
	    getAccordionButtons(accordion).forEach((other) => {
	      if (other !== button) {
	        toggle$1(other, false);
	      }
	    });
	  }
	};

	/**
	 * @param {HTMLButtonElement} button
	 * @return {boolean} true
	 */
	const showButton = (button) => toggleButton$1(button, true);

	/**
	 * @param {HTMLButtonElement} button
	 * @return {boolean} false
	 */
	const hideButton = (button) => toggleButton$1(button, false);

	const accordion$2 = behavior$4(
	  {
	    [CLICK$1]: {
	      [BUTTON]() {
	        toggleButton$1(this);

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
	      select$3(BUTTON, root).forEach((button) => {
	        const expanded = button.getAttribute(EXPANDED) === "true";
	        toggleButton$1(button, expanded);
	      });
	    },
	    ACCORDION,
	    BUTTON,
	    show: showButton,
	    hide: hideButton,
	    toggle: toggleButton$1,
	    getButtons: getAccordionButtons,
	  }
	);

	var src$3 = accordion$2;

	var keymap$3 = {exports: {}};

	var keyboardeventKeyPolyfill = {exports: {}};

	/* global define, KeyboardEvent, module */

	(function (module, exports) {
		(function () {

		  var keyboardeventKeyPolyfill = {
		    polyfill: polyfill,
		    keys: {
		      3: 'Cancel',
		      6: 'Help',
		      8: 'Backspace',
		      9: 'Tab',
		      12: 'Clear',
		      13: 'Enter',
		      16: 'Shift',
		      17: 'Control',
		      18: 'Alt',
		      19: 'Pause',
		      20: 'CapsLock',
		      27: 'Escape',
		      28: 'Convert',
		      29: 'NonConvert',
		      30: 'Accept',
		      31: 'ModeChange',
		      32: ' ',
		      33: 'PageUp',
		      34: 'PageDown',
		      35: 'End',
		      36: 'Home',
		      37: 'ArrowLeft',
		      38: 'ArrowUp',
		      39: 'ArrowRight',
		      40: 'ArrowDown',
		      41: 'Select',
		      42: 'Print',
		      43: 'Execute',
		      44: 'PrintScreen',
		      45: 'Insert',
		      46: 'Delete',
		      48: ['0', ')'],
		      49: ['1', '!'],
		      50: ['2', '@'],
		      51: ['3', '#'],
		      52: ['4', '$'],
		      53: ['5', '%'],
		      54: ['6', '^'],
		      55: ['7', '&'],
		      56: ['8', '*'],
		      57: ['9', '('],
		      91: 'OS',
		      93: 'ContextMenu',
		      144: 'NumLock',
		      145: 'ScrollLock',
		      181: 'VolumeMute',
		      182: 'VolumeDown',
		      183: 'VolumeUp',
		      186: [';', ':'],
		      187: ['=', '+'],
		      188: [',', '<'],
		      189: ['-', '_'],
		      190: ['.', '>'],
		      191: ['/', '?'],
		      192: ['`', '~'],
		      219: ['[', '{'],
		      220: ['\\', '|'],
		      221: [']', '}'],
		      222: ["'", '"'],
		      224: 'Meta',
		      225: 'AltGraph',
		      246: 'Attn',
		      247: 'CrSel',
		      248: 'ExSel',
		      249: 'EraseEof',
		      250: 'Play',
		      251: 'ZoomOut'
		    }
		  };

		  // Function keys (F1-24).
		  var i;
		  for (i = 1; i < 25; i++) {
		    keyboardeventKeyPolyfill.keys[111 + i] = 'F' + i;
		  }

		  // Printable ASCII characters.
		  var letter = '';
		  for (i = 65; i < 91; i++) {
		    letter = String.fromCharCode(i);
		    keyboardeventKeyPolyfill.keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
		  }

		  function polyfill () {
		    if (!('KeyboardEvent' in window) ||
		        'key' in KeyboardEvent.prototype) {
		      return false;
		    }

		    // Polyfill `key` on `KeyboardEvent`.
		    var proto = {
		      get: function (x) {
		        var key = keyboardeventKeyPolyfill.keys[this.which || this.keyCode];

		        if (Array.isArray(key)) {
		          key = key[+this.shiftKey];
		        }

		        return key;
		      }
		    };
		    Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
		    return proto;
		  }

		  {
		    module.exports = keyboardeventKeyPolyfill;
		  }

		})(); 
	} (keyboardeventKeyPolyfill));

	// these are the only relevant modifiers supported on all platforms,
	// according to MDN:
	// <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState>
	const MODIFIERS = {
	  'Alt':      'altKey',
	  'Control':  'ctrlKey',
	  'Ctrl':     'ctrlKey',
	  'Shift':    'shiftKey'
	};

	const MODIFIER_SEPARATOR = '+';

	const getEventKey = function(event, hasModifiers) {
	  var key = event.key;
	  if (hasModifiers) {
	    for (var modifier in MODIFIERS) {
	      if (event[MODIFIERS[modifier]] === true) {
	        key = [modifier, key].join(MODIFIER_SEPARATOR);
	      }
	    }
	  }
	  return key;
	};

	keymap$3.exports = function keymap(keys) {
	  const hasModifiers = Object.keys(keys).some(function(key) {
	    return key.indexOf(MODIFIER_SEPARATOR) > -1;
	  });
	  return function(event) {
	    var key = getEventKey(event, hasModifiers);
	    return [key, key.toLowerCase()]
	      .reduce(function(result, _key) {
	        if (_key in keys) {
	          result = keys[key].call(this, event);
	        }
	        return result;
	      }, undefined);
	  };
	};

	keymap$3.exports.MODIFIERS = MODIFIERS;

	var keymapExports = keymap$3.exports;

	const keymap$2 = keymapExports;
	const behavior$3 = behavior$5;

	const ANCHOR_BUTTON = `a[class*="usa-button"]`;

	const toggleButton = (event) => {
	  event.preventDefault();
	  event.target.click();
	};

	const anchorButton = behavior$3({
	  keydown: {
	    [ANCHOR_BUTTON]: keymap$2({
	      " ": toggleButton,
	    }),
	  },
	});

	var src$2 = anchorButton;

	var ignore = function ignore(element, fn) {
	  return function ignorance(e) {
	    if (element !== e.target && !element.contains(e.target)) {
	      return fn.call(this, e);
	    }
	  };
	};

	var receptor = {
	  behavior:     behavior$6,
	  delegate:     delegate$2,
	  delegateAll:  delegateAll$1,
	  ignore:       ignore,
	  keymap:       keymapExports,
	};

	var activeElement$1 = (htmlDocument = document) => htmlDocument.activeElement;

	const assign = objectAssign;
	const { keymap: keymap$1 } = receptor;
	const behavior$2 = behavior$5;
	const select$2 = select$4;
	const activeElement = activeElement$1;

	const FOCUSABLE =
	  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

	const tabHandler = (context) => {
	  const focusableElements = select$2(FOCUSABLE, context);
	  const firstTabStop = focusableElements[0];
	  const lastTabStop = focusableElements[focusableElements.length - 1];

	  // Special rules for when the user is tabbing forward from the last focusable element,
	  // or when tabbing backwards from the first focusable element
	  function tabAhead(event) {
	    if (activeElement() === lastTabStop) {
	      event.preventDefault();
	      firstTabStop.focus();
	    }
	  }

	  function tabBack(event) {
	    if (activeElement() === firstTabStop) {
	      event.preventDefault();
	      lastTabStop.focus();
	    }
	    // This checks if you want to set the initial focus to a container
	    // instead of an element within, and the user tabs back.
	    // Then we set the focus to the first
	    else if (!focusableElements.includes(activeElement())) {
	      event.preventDefault();
	      firstTabStop.focus();
	    }
	  }

	  return {
	    firstTabStop,
	    lastTabStop,
	    tabAhead,
	    tabBack,
	  };
	};

	var focusTrap = (context, additionalKeyBindings = {}) => {
	  const tabEventHandler = tabHandler(context);
	  const bindings = additionalKeyBindings;
	  const { Esc, Escape } = bindings;

	  if (Escape && !Esc) bindings.Esc = Escape;

	  //  TODO: In the future, loop over additional keybindings and pass an array
	  // of functions, if necessary, to the map keys. Then people implementing
	  // the focus trap could pass callbacks to fire when tabbing
	  const keyMappings = keymap$1(
	    assign(
	      {
	        Tab: tabEventHandler.tabAhead,
	        "Shift+Tab": tabEventHandler.tabBack,
	      },
	      additionalKeyBindings
	    )
	  );

	  const focusTrap = behavior$2(
	    {
	      keydown: keyMappings,
	    },
	    {
	      init() {
	        // TODO: is this desireable behavior? Should the trap always do this by default or should
	        // the component getting decorated handle this?
	        if (tabEventHandler.firstTabStop) {
	          tabEventHandler.firstTabStop.focus();
	        }
	      },
	      update(isActive) {
	        if (isActive) {
	          this.on();
	        } else {
	          this.off();
	        }
	      },
	    }
	  );

	  return focusTrap;
	};

	var scrollbarWidth = function getScrollbarWidth() {
	  // Creating invisible container
	  const outer = document.createElement("div");
	  outer.style.visibility = "hidden";
	  outer.style.overflow = "scroll"; // forcing scrollbar to appear
	  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
	  document.body.appendChild(outer);

	  // Creating inner element and placing it in the container
	  const inner = document.createElement("div");
	  outer.appendChild(inner);

	  // Calculating difference between container's full width and the child width
	  const scrollbarWidth = `${outer.offsetWidth - inner.offsetWidth}px`;

	  // Removing temporary elements from the DOM
	  outer.parentNode.removeChild(outer);

	  return scrollbarWidth;
	};

	const keymap = keymapExports;
	const behavior$1 = behavior$5;
	const select$1 = select$4;
	const toggle = toggle$2;
	const FocusTrap = focusTrap;
	const accordion$1 = src$3;
	const ScrollBarWidth = scrollbarWidth;

	const { CLICK } = events;
	const { prefix: PREFIX$1 } = config;

	const BODY = "body";
	const HEADER = `.${PREFIX$1}-header`;
	const NAV = `.${PREFIX$1}-nav`;
	const NAV_CONTAINER = `.${PREFIX$1}-nav-container`;
	const NAV_PRIMARY = `.${PREFIX$1}-nav__primary`;
	const NAV_PRIMARY_ITEM = `.${PREFIX$1}-nav__primary-item`;
	const NAV_CONTROL = `button.${PREFIX$1}-nav__link`;
	const NAV_LINKS = `${NAV} a`;
	const NON_NAV_HIDDEN_ATTRIBUTE = `data-nav-hidden`;
	const OPENERS = `.${PREFIX$1}-menu-btn`;
	const CLOSE_BUTTON = `.${PREFIX$1}-nav__close`;
	const OVERLAY = `.${PREFIX$1}-overlay`;
	const CLOSERS = `${CLOSE_BUTTON}, .${PREFIX$1}-overlay`;
	const TOGGLES = [NAV, OVERLAY].join(", ");
	const NON_NAV_ELEMENTS = `body *:not(${HEADER}, ${NAV_CONTAINER}, ${NAV}, ${NAV} *):not([aria-hidden])`;
	const NON_NAV_HIDDEN = `[${NON_NAV_HIDDEN_ATTRIBUTE}]`;

	const ACTIVE_CLASS = "usa-js-mobile-nav--active";
	const VISIBLE_CLASS$1 = "is-visible";

	let navigation$1;
	let navActive;
	let nonNavElements;

	const isActive = () => document.body.classList.contains(ACTIVE_CLASS);
	const SCROLLBAR_WIDTH = ScrollBarWidth();
	const INITIAL_PADDING = window
	  .getComputedStyle(document.body)
	  .getPropertyValue("padding-right");
	const TEMPORARY_PADDING = `${
  parseInt(INITIAL_PADDING.replace(/px/, ""), 10) +
  parseInt(SCROLLBAR_WIDTH.replace(/px/, ""), 10)
}px`;

	const hideNonNavItems = () => {
	  const headerParent = document.querySelector(`${HEADER}`).parentNode;
	  nonNavElements = document.querySelectorAll(NON_NAV_ELEMENTS);

	  nonNavElements.forEach((nonNavElement) => {
	    if (nonNavElement !== headerParent) {
	      nonNavElement.setAttribute("aria-hidden", true);
	      nonNavElement.setAttribute(NON_NAV_HIDDEN_ATTRIBUTE, "");
	    }
	  });
	};

	const showNonNavItems = () => {
	  nonNavElements = document.querySelectorAll(NON_NAV_HIDDEN);

	  if (!nonNavElements) {
	    return;
	  }

	  // Remove aria-hidden from non-header elements
	  nonNavElements.forEach((nonNavElement) => {
	    nonNavElement.removeAttribute("aria-hidden");
	    nonNavElement.removeAttribute(NON_NAV_HIDDEN_ATTRIBUTE);
	  });
	};

	// Toggle all non-header elements #3527.
	const toggleNonNavItems = (active) => {
	  if (active) {
	    hideNonNavItems();
	  } else {
	    showNonNavItems();
	  }
	};

	const toggleNav = (active) => {
	  const { body } = document;
	  const safeActive = typeof active === "boolean" ? active : !isActive();

	  body.classList.toggle(ACTIVE_CLASS, safeActive);

	  select$1(TOGGLES).forEach((el) =>
	    el.classList.toggle(VISIBLE_CLASS$1, safeActive)
	  );

	  navigation$1.focusTrap.update(safeActive);

	  const closeButton = body.querySelector(CLOSE_BUTTON);
	  const menuButton = document.querySelector(OPENERS);

	  body.style.paddingRight =
	    body.style.paddingRight === TEMPORARY_PADDING
	      ? INITIAL_PADDING
	      : TEMPORARY_PADDING;

	  toggleNonNavItems(safeActive);

	  if (safeActive && closeButton) {
	    // The mobile nav was just activated. Focus on the close button, which is
	    // just before all the nav elements in the tab order.
	    closeButton.focus();
	  } else if (
	    !safeActive &&
	    menuButton &&
	    getComputedStyle(menuButton).display !== "none"
	  ) {
	    // The mobile nav was just deactivated. We don't want the focus to
	    // disappear into the void, so focus on the menu button if it's
	    // visible (this may have been what the user was just focused on,
	    // if they triggered the mobile nav by mistake).
	    menuButton.focus();
	  }

	  return safeActive;
	};

	const resize = () => {
	  const closer = document.body.querySelector(CLOSE_BUTTON);

	  if (isActive() && closer && closer.getBoundingClientRect().width === 0) {
	    // When the mobile nav is active, and the close box isn't visible,
	    // we know the user's viewport has been resized to be larger.
	    // Let's make the page state consistent by deactivating the mobile nav.
	    navigation$1.toggleNav.call(closer, false);
	  }
	};

	const onMenuClose = () => navigation$1.toggleNav.call(navigation$1, false);

	const hideActiveNavDropdown = () => {
	  if (!navActive) {
	    return;
	  }

	  toggle(navActive, false);
	  navActive = null;
	};

	const focusNavButton = (event) => {
	  const parentNavItem = event.target.closest(NAV_PRIMARY_ITEM);

	  // Only shift focus if within dropdown
	  if (!event.target.matches(NAV_CONTROL)) {
	    const navControl = parentNavItem.querySelector(NAV_CONTROL);
	    if (navControl) {
	      navControl.focus();
	    }
	  }
	};

	const handleEscape = (event) => {
	  hideActiveNavDropdown();
	  focusNavButton(event);
	};

	navigation$1 = behavior$1(
	  {
	    [CLICK]: {
	      [NAV_CONTROL]() {
	        // If another nav is open, close it
	        if (navActive !== this) {
	          hideActiveNavDropdown();
	        }
	        // store a reference to the last clicked nav link element, so we
	        // can hide the dropdown if another element on the page is clicked
	        if (!navActive) {
	          navActive = this;
	          toggle(navActive, true);
	        }

	        // Do this so the event handler on the body doesn't fire
	        return false;
	      },
	      [BODY]: hideActiveNavDropdown,
	      [OPENERS]: toggleNav,
	      [CLOSERS]: toggleNav,
	      [NAV_LINKS]() {
	        // A navigation link has been clicked! We want to collapse any
	        // hierarchical navigation UI it's a part of, so that the user
	        // can focus on whatever they've just selected.

	        // Some navigation links are inside accordions; when they're
	        // clicked, we want to collapse those accordions.
	        const acc = this.closest(accordion$1.ACCORDION);

	        if (acc) {
	          accordion$1.getButtons(acc).forEach((btn) => accordion$1.hide(btn));
	        }

	        // If the mobile navigation menu is active, we want to hide it.
	        if (isActive()) {
	          navigation$1.toggleNav.call(navigation$1, false);
	        }
	      },
	    },
	    keydown: {
	      [NAV_PRIMARY]: keymap({ Escape: handleEscape }),
	    },
	    focusout: {
	      [NAV_PRIMARY](event) {
	        const nav = event.target.closest(NAV_PRIMARY);

	        if (!nav.contains(event.relatedTarget)) {
	          hideActiveNavDropdown();
	        }
	      },
	    },
	  },
	  {
	    init(root) {
	      const trapContainer = root.matches(NAV) ? root : root.querySelector(NAV);

	      if (trapContainer) {
	        navigation$1.focusTrap = FocusTrap(trapContainer, {
	          Escape: onMenuClose,
	        });
	      }

	      resize();
	      window.addEventListener("resize", resize, false);
	    },
	    teardown() {
	      window.removeEventListener("resize", resize, false);
	      navActive = false;
	    },
	    focusTrap: null,
	    toggleNav,
	  }
	);

	var src$1 = navigation$1;

	const select = select$4;
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
	const behavior = behavior$5;
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
	  const additionalClasses = tooltipTrigger.getAttribute("data-classes");
	  let position = tooltipTrigger.getAttribute("data-position");

	  // Apply default position if not set as attribute
	  if (!position) {
	    position = "top";
	    tooltipTrigger.setAttribute("data-position", position);
	  }

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

	const accordion = src$3;
	// const banner = require('../node_modules/@uswds/uswds/packages/usa-banner/src/index');
	const button = src$2;
	// const characterCount = require('../node_modules/@uswds/uswds/packages/usa-character-count/src/index');
	// const comboBox = require('../node_modules/@uswds/uswds/packages/usa-combo-box/src/index');
	// const datePicker = require('../node_modules/@uswds/uswds/packages/usa-date-picker/src/index');
	// const dateRangePicker = require('../node_modules/@uswds/uswds/packages/usa-date-range-picker/src/index');
	// const fileInput = require('../node_modules/@uswds/uswds/packages/usa-file-input/src/index');
	// const footer = require('../node_modules/@uswds/uswds/packages/usa-footer/src/index');
	// const inPageNavigation = require('../node_modules/@uswds/uswds/packages/usa-in-page-navigation/src/index');
	// const inputMask = require('../node_modules/@uswds/uswds/packages/usa-input-mask/src/index');
	// const languageSelector = require('../node_modules/@uswds/uswds/packages/usa-language-selector/src/index');
	// const modal = require('../node_modules/@uswds/uswds/packages/usa-modal/src/index');
	const navigation = src$1;
	// const password = require('../node_modules/@uswds/uswds/packages/_usa-password/src/index');
	// const search = require('../node_modules/@uswds/uswds/packages/usa-search/src/index');
	// const skipnav = require('../node_modules/@uswds/uswds/packages/usa-skipnav/src/index');
	// const table = require('../node_modules/@uswds/uswds/packages/usa-table/src/index');
	// const timePicker = require('../node_modules/@uswds/uswds/packages/usa-time-picker/src/index');
	const tooltip = src;

	var components$1 = {
	  accordion,
	  // banner,
	  button,
	  // characterCount,
	  // comboBox,
	  // datePicker,
	  // dateRangePicker,
	  // fileInput,
	  // footer,
	  // inPageNavigation,
	  // inputMask,
	  // languageSelector,
	  // modal,
	  navigation,
	  // password,
	  // search,
	  // skipnav,
	  // table,
	  // timePicker,
	  tooltip,
	  // validator
	};

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var NumeralFormatter = function (numeralDecimalMark,
	                                 numeralIntegerScale,
	                                 numeralDecimalScale,
	                                 numeralThousandsGroupStyle,
	                                 numeralPositiveOnly,
	                                 stripLeadingZeroes,
	                                 prefix,
	                                 signBeforePrefix,
	                                 tailPrefix,
	                                 delimiter) {
	    var owner = this;

	    owner.numeralDecimalMark = numeralDecimalMark || '.';
	    owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
	    owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
	    owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
	    owner.numeralPositiveOnly = !!numeralPositiveOnly;
	    owner.stripLeadingZeroes = stripLeadingZeroes !== false;
	    owner.prefix = (prefix || prefix === '') ? prefix : '';
	    owner.signBeforePrefix = !!signBeforePrefix;
	    owner.tailPrefix = !!tailPrefix;
	    owner.delimiter = (delimiter || delimiter === '') ? delimiter : ',';
	    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';
	};

	NumeralFormatter.groupStyle = {
	    thousand: 'thousand',
	    lakh:     'lakh',
	    wan:      'wan',
	    none:     'none'    
	};

	NumeralFormatter.prototype = {
	    getRawValue: function (value) {
	        return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
	    },

	    format: function (value) {
	        var owner = this, parts, partSign, partSignAndPrefix, partInteger, partDecimal = '';

	        // strip alphabet letters
	        value = value.replace(/[A-Za-z]/g, '')
	            // replace the first decimal mark with reserved placeholder
	            .replace(owner.numeralDecimalMark, 'M')

	            // strip non numeric letters except minus and "M"
	            // this is to ensure prefix has been stripped
	            .replace(/[^\dM-]/g, '')

	            // replace the leading minus with reserved placeholder
	            .replace(/^\-/, 'N')

	            // strip the other minus sign (if present)
	            .replace(/\-/g, '')

	            // replace the minus sign (if present)
	            .replace('N', owner.numeralPositiveOnly ? '' : '-')

	            // replace decimal mark
	            .replace('M', owner.numeralDecimalMark);

	        // strip any leading zeros
	        if (owner.stripLeadingZeroes) {
	            value = value.replace(/^(-)?0+(?=\d)/, '$1');
	        }

	        partSign = value.slice(0, 1) === '-' ? '-' : '';
	        if (typeof owner.prefix != 'undefined') {
	            if (owner.signBeforePrefix) {
	                partSignAndPrefix = partSign + owner.prefix;
	            } else {
	                partSignAndPrefix = owner.prefix + partSign;
	            }
	        } else {
	            partSignAndPrefix = partSign;
	        }
	        
	        partInteger = value;

	        if (value.indexOf(owner.numeralDecimalMark) >= 0) {
	            parts = value.split(owner.numeralDecimalMark);
	            partInteger = parts[0];
	            partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
	        }

	        if(partSign === '-') {
	            partInteger = partInteger.slice(1);
	        }

	        if (owner.numeralIntegerScale > 0) {
	          partInteger = partInteger.slice(0, owner.numeralIntegerScale);
	        }

	        switch (owner.numeralThousandsGroupStyle) {
	        case NumeralFormatter.groupStyle.lakh:
	            partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + owner.delimiter);

	            break;

	        case NumeralFormatter.groupStyle.wan:
	            partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + owner.delimiter);

	            break;

	        case NumeralFormatter.groupStyle.thousand:
	            partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + owner.delimiter);

	            break;
	        }

	        if (owner.tailPrefix) {
	            return partSign + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '') + owner.prefix;
	        }

	        return partSignAndPrefix + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '');
	    }
	};

	var NumeralFormatter_1 = NumeralFormatter;

	var DateFormatter = function (datePattern, dateMin, dateMax) {
	    var owner = this;

	    owner.date = [];
	    owner.blocks = [];
	    owner.datePattern = datePattern;
	    owner.dateMin = dateMin
	      .split('-')
	      .reverse()
	      .map(function(x) {
	        return parseInt(x, 10);
	      });
	    if (owner.dateMin.length === 2) owner.dateMin.unshift(0);

	    owner.dateMax = dateMax
	      .split('-')
	      .reverse()
	      .map(function(x) {
	        return parseInt(x, 10);
	      });
	    if (owner.dateMax.length === 2) owner.dateMax.unshift(0);
	    
	    owner.initBlocks();
	};

	DateFormatter.prototype = {
	    initBlocks: function () {
	        var owner = this;
	        owner.datePattern.forEach(function (value) {
	            if (value === 'Y') {
	                owner.blocks.push(4);
	            } else {
	                owner.blocks.push(2);
	            }
	        });
	    },

	    getISOFormatDate: function () {
	        var owner = this,
	            date = owner.date;

	        return date[2] ? (
	            date[2] + '-' + owner.addLeadingZero(date[1]) + '-' + owner.addLeadingZero(date[0])
	        ) : '';
	    },

	    getBlocks: function () {
	        return this.blocks;
	    },

	    getValidatedDate: function (value) {
	        var owner = this, result = '';

	        value = value.replace(/[^\d]/g, '');

	        owner.blocks.forEach(function (length, index) {
	            if (value.length > 0) {
	                var sub = value.slice(0, length),
	                    sub0 = sub.slice(0, 1),
	                    rest = value.slice(length);

	                switch (owner.datePattern[index]) {
	                case 'd':
	                    if (sub === '00') {
	                        sub = '01';
	                    } else if (parseInt(sub0, 10) > 3) {
	                        sub = '0' + sub0;
	                    } else if (parseInt(sub, 10) > 31) {
	                        sub = '31';
	                    }

	                    break;

	                case 'm':
	                    if (sub === '00') {
	                        sub = '01';
	                    } else if (parseInt(sub0, 10) > 1) {
	                        sub = '0' + sub0;
	                    } else if (parseInt(sub, 10) > 12) {
	                        sub = '12';
	                    }

	                    break;
	                }

	                result += sub;

	                // update remaining string
	                value = rest;
	            }
	        });

	        return this.getFixedDateString(result);
	    },

	    getFixedDateString: function (value) {
	        var owner = this, datePattern = owner.datePattern, date = [],
	            dayIndex = 0, monthIndex = 0, yearIndex = 0,
	            dayStartIndex = 0, monthStartIndex = 0, yearStartIndex = 0,
	            day, month, year, fullYearDone = false;

	        // mm-dd || dd-mm
	        if (value.length === 4 && datePattern[0].toLowerCase() !== 'y' && datePattern[1].toLowerCase() !== 'y') {
	            dayStartIndex = datePattern[0] === 'd' ? 0 : 2;
	            monthStartIndex = 2 - dayStartIndex;
	            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
	            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);

	            date = this.getFixedDate(day, month, 0);
	        }

	        // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
	        if (value.length === 8) {
	            datePattern.forEach(function (type, index) {
	                switch (type) {
	                case 'd':
	                    dayIndex = index;
	                    break;
	                case 'm':
	                    monthIndex = index;
	                    break;
	                default:
	                    yearIndex = index;
	                    break;
	                }
	            });

	            yearStartIndex = yearIndex * 2;
	            dayStartIndex = (dayIndex <= yearIndex) ? dayIndex * 2 : (dayIndex * 2 + 2);
	            monthStartIndex = (monthIndex <= yearIndex) ? monthIndex * 2 : (monthIndex * 2 + 2);

	            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
	            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
	            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

	            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

	            date = this.getFixedDate(day, month, year);
	        }

	        // mm-yy || yy-mm
	        if (value.length === 4 && (datePattern[0] === 'y' || datePattern[1] === 'y')) {
	            monthStartIndex = datePattern[0] === 'm' ? 0 : 2;
	            yearStartIndex = 2 - monthStartIndex;
	            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
	            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 2), 10);

	            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 2).length === 2;

	            date = [0, month, year];
	        }

	        // mm-yyyy || yyyy-mm
	        if (value.length === 6 && (datePattern[0] === 'Y' || datePattern[1] === 'Y')) {
	            monthStartIndex = datePattern[0] === 'm' ? 0 : 4;
	            yearStartIndex = 2 - 0.5 * monthStartIndex;
	            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
	            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

	            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

	            date = [0, month, year];
	        }

	        date = owner.getRangeFixedDate(date);
	        owner.date = date;

	        var result = date.length === 0 ? value : datePattern.reduce(function (previous, current) {
	            switch (current) {
	            case 'd':
	                return previous + (date[0] === 0 ? '' : owner.addLeadingZero(date[0]));
	            case 'm':
	                return previous + (date[1] === 0 ? '' : owner.addLeadingZero(date[1]));
	            case 'y':
	                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], false) : '');
	            case 'Y':
	                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], true) : '');
	            }
	        }, '');

	        return result;
	    },

	    getRangeFixedDate: function (date) {
	        var owner = this,
	            datePattern = owner.datePattern,
	            dateMin = owner.dateMin || [],
	            dateMax = owner.dateMax || [];

	        if (!date.length || (dateMin.length < 3 && dateMax.length < 3)) return date;

	        if (
	          datePattern.find(function(x) {
	            return x.toLowerCase() === 'y';
	          }) &&
	          date[2] === 0
	        ) return date;

	        if (dateMax.length && (dateMax[2] < date[2] || (
	          dateMax[2] === date[2] && (dateMax[1] < date[1] || (
	            dateMax[1] === date[1] && dateMax[0] < date[0]
	          ))
	        ))) return dateMax;

	        if (dateMin.length && (dateMin[2] > date[2] || (
	          dateMin[2] === date[2] && (dateMin[1] > date[1] || (
	            dateMin[1] === date[1] && dateMin[0] > date[0]
	          ))
	        ))) return dateMin;

	        return date;
	    },

	    getFixedDate: function (day, month, year) {
	        day = Math.min(day, 31);
	        month = Math.min(month, 12);
	        year = parseInt((year || 0), 10);

	        if ((month < 7 && month % 2 === 0) || (month > 8 && month % 2 === 1)) {
	            day = Math.min(day, month === 2 ? (this.isLeapYear(year) ? 29 : 28) : 30);
	        }

	        return [day, month, year];
	    },

	    isLeapYear: function (year) {
	        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
	    },

	    addLeadingZero: function (number) {
	        return (number < 10 ? '0' : '') + number;
	    },

	    addLeadingZeroForYear: function (number, fullYearMode) {
	        if (fullYearMode) {
	            return (number < 10 ? '000' : (number < 100 ? '00' : (number < 1000 ? '0' : ''))) + number;
	        }

	        return (number < 10 ? '0' : '') + number;
	    }
	};

	var DateFormatter_1 = DateFormatter;

	var TimeFormatter = function (timePattern, timeFormat) {
	    var owner = this;

	    owner.time = [];
	    owner.blocks = [];
	    owner.timePattern = timePattern;
	    owner.timeFormat = timeFormat;
	    owner.initBlocks();
	};

	TimeFormatter.prototype = {
	    initBlocks: function () {
	        var owner = this;
	        owner.timePattern.forEach(function () {
	            owner.blocks.push(2);
	        });
	    },

	    getISOFormatTime: function () {
	        var owner = this,
	            time = owner.time;

	        return time[2] ? (
	            owner.addLeadingZero(time[0]) + ':' + owner.addLeadingZero(time[1]) + ':' + owner.addLeadingZero(time[2])
	        ) : '';
	    },

	    getBlocks: function () {
	        return this.blocks;
	    },

	    getTimeFormatOptions: function () {
	        var owner = this;
	        if (String(owner.timeFormat) === '12') {
	            return {
	                maxHourFirstDigit: 1,
	                maxHours: 12,
	                maxMinutesFirstDigit: 5,
	                maxMinutes: 60
	            };
	        }

	        return {
	            maxHourFirstDigit: 2,
	            maxHours: 23,
	            maxMinutesFirstDigit: 5,
	            maxMinutes: 60
	        };
	    },

	    getValidatedTime: function (value) {
	        var owner = this, result = '';

	        value = value.replace(/[^\d]/g, '');

	        var timeFormatOptions = owner.getTimeFormatOptions();

	        owner.blocks.forEach(function (length, index) {
	            if (value.length > 0) {
	                var sub = value.slice(0, length),
	                    sub0 = sub.slice(0, 1),
	                    rest = value.slice(length);

	                switch (owner.timePattern[index]) {

	                case 'h':
	                    if (parseInt(sub0, 10) > timeFormatOptions.maxHourFirstDigit) {
	                        sub = '0' + sub0;
	                    } else if (parseInt(sub, 10) > timeFormatOptions.maxHours) {
	                        sub = timeFormatOptions.maxHours + '';
	                    }

	                    break;

	                case 'm':
	                case 's':
	                    if (parseInt(sub0, 10) > timeFormatOptions.maxMinutesFirstDigit) {
	                        sub = '0' + sub0;
	                    } else if (parseInt(sub, 10) > timeFormatOptions.maxMinutes) {
	                        sub = timeFormatOptions.maxMinutes + '';
	                    }
	                    break;
	                }

	                result += sub;

	                // update remaining string
	                value = rest;
	            }
	        });

	        return this.getFixedTimeString(result);
	    },

	    getFixedTimeString: function (value) {
	        var owner = this, timePattern = owner.timePattern, time = [],
	            secondIndex = 0, minuteIndex = 0, hourIndex = 0,
	            secondStartIndex = 0, minuteStartIndex = 0, hourStartIndex = 0,
	            second, minute, hour;

	        if (value.length === 6) {
	            timePattern.forEach(function (type, index) {
	                switch (type) {
	                case 's':
	                    secondIndex = index * 2;
	                    break;
	                case 'm':
	                    minuteIndex = index * 2;
	                    break;
	                case 'h':
	                    hourIndex = index * 2;
	                    break;
	                }
	            });

	            hourStartIndex = hourIndex;
	            minuteStartIndex = minuteIndex;
	            secondStartIndex = secondIndex;

	            second = parseInt(value.slice(secondStartIndex, secondStartIndex + 2), 10);
	            minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
	            hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

	            time = this.getFixedTime(hour, minute, second);
	        }

	        if (value.length === 4 && owner.timePattern.indexOf('s') < 0) {
	            timePattern.forEach(function (type, index) {
	                switch (type) {
	                case 'm':
	                    minuteIndex = index * 2;
	                    break;
	                case 'h':
	                    hourIndex = index * 2;
	                    break;
	                }
	            });

	            hourStartIndex = hourIndex;
	            minuteStartIndex = minuteIndex;

	            second = 0;
	            minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
	            hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

	            time = this.getFixedTime(hour, minute, second);
	        }

	        owner.time = time;

	        return time.length === 0 ? value : timePattern.reduce(function (previous, current) {
	            switch (current) {
	            case 's':
	                return previous + owner.addLeadingZero(time[2]);
	            case 'm':
	                return previous + owner.addLeadingZero(time[1]);
	            case 'h':
	                return previous + owner.addLeadingZero(time[0]);
	            }
	        }, '');
	    },

	    getFixedTime: function (hour, minute, second) {
	        second = Math.min(parseInt(second || 0, 10), 60);
	        minute = Math.min(minute, 60);
	        hour = Math.min(hour, 60);

	        return [hour, minute, second];
	    },

	    addLeadingZero: function (number) {
	        return (number < 10 ? '0' : '') + number;
	    }
	};

	var TimeFormatter_1 = TimeFormatter;

	var PhoneFormatter = function (formatter, delimiter) {
	    var owner = this;

	    owner.delimiter = (delimiter || delimiter === '') ? delimiter : ' ';
	    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';

	    owner.formatter = formatter;
	};

	PhoneFormatter.prototype = {
	    setFormatter: function (formatter) {
	        this.formatter = formatter;
	    },

	    format: function (phoneNumber) {
	        var owner = this;

	        owner.formatter.clear();

	        // only keep number and +
	        phoneNumber = phoneNumber.replace(/[^\d+]/g, '');

	        // strip non-leading +
	        phoneNumber = phoneNumber.replace(/^\+/, 'B').replace(/\+/g, '').replace('B', '+');

	        // strip delimiter
	        phoneNumber = phoneNumber.replace(owner.delimiterRE, '');

	        var result = '', current, validated = false;

	        for (var i = 0, iMax = phoneNumber.length; i < iMax; i++) {
	            current = owner.formatter.inputDigit(phoneNumber.charAt(i));

	            // has ()- or space inside
	            if (/[\s()-]/g.test(current)) {
	                result = current;

	                validated = true;
	            } else {
	                if (!validated) {
	                    result = current;
	                }
	                // else: over length input
	                // it turns to invalid number again
	            }
	        }

	        // strip ()
	        // e.g. US: 7161234567 returns (716) 123-4567
	        result = result.replace(/[()]/g, '');
	        // replace library delimiter with user customized delimiter
	        result = result.replace(/[\s-]/g, owner.delimiter);

	        return result;
	    }
	};

	var PhoneFormatter_1 = PhoneFormatter;

	var CreditCardDetector = {
	    blocks: {
	        uatp:          [4, 5, 6],
	        amex:          [4, 6, 5],
	        diners:        [4, 6, 4],
	        discover:      [4, 4, 4, 4],
	        mastercard:    [4, 4, 4, 4],
	        dankort:       [4, 4, 4, 4],
	        instapayment:  [4, 4, 4, 4],
	        jcb15:         [4, 6, 5],
	        jcb:           [4, 4, 4, 4],
	        maestro:       [4, 4, 4, 4],
	        visa:          [4, 4, 4, 4],
	        mir:           [4, 4, 4, 4],
	        unionPay:      [4, 4, 4, 4],
	        general:       [4, 4, 4, 4]
	    },

	    re: {
	        // starts with 1; 15 digits, not starts with 1800 (jcb card)
	        uatp: /^(?!1800)1\d{0,14}/,

	        // starts with 34/37; 15 digits
	        amex: /^3[47]\d{0,13}/,

	        // starts with 6011/65/644-649; 16 digits
	        discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,

	        // starts with 300-305/309 or 36/38/39; 14 digits
	        diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

	        // starts with 51-55/2221–2720; 16 digits
	        mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,

	        // starts with 5019/4175/4571; 16 digits
	        dankort: /^(5019|4175|4571)\d{0,12}/,

	        // starts with 637-639; 16 digits
	        instapayment: /^63[7-9]\d{0,13}/,

	        // starts with 2131/1800; 15 digits
	        jcb15: /^(?:2131|1800)\d{0,11}/,

	        // starts with 2131/1800/35; 16 digits
	        jcb: /^(?:35\d{0,2})\d{0,12}/,

	        // starts with 50/56-58/6304/67; 16 digits
	        maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,

	        // starts with 22; 16 digits
	        mir: /^220[0-4]\d{0,12}/,

	        // starts with 4; 16 digits
	        visa: /^4\d{0,15}/,

	        // starts with 62/81; 16 digits
	        unionPay: /^(62|81)\d{0,14}/
	    },

	    getStrictBlocks: function (block) {
	      var total = block.reduce(function (prev, current) {
	        return prev + current;
	      }, 0);

	      return block.concat(19 - total);
	    },

	    getInfo: function (value, strictMode) {
	        var blocks = CreditCardDetector.blocks,
	            re = CreditCardDetector.re;

	        // Some credit card can have up to 19 digits number.
	        // Set strictMode to true will remove the 16 max-length restrain,
	        // however, I never found any website validate card number like
	        // this, hence probably you don't want to enable this option.
	        strictMode = !!strictMode;

	        for (var key in re) {
	            if (re[key].test(value)) {
	                var matchedBlocks = blocks[key];
	                return {
	                    type: key,
	                    blocks: strictMode ? this.getStrictBlocks(matchedBlocks) : matchedBlocks
	                };
	            }
	        }

	        return {
	            type: 'unknown',
	            blocks: strictMode ? this.getStrictBlocks(blocks.general) : blocks.general
	        };
	    }
	};

	var CreditCardDetector_1 = CreditCardDetector;

	var Util = {
	    noop: function () {
	    },

	    strip: function (value, re) {
	        return value.replace(re, '');
	    },

	    getPostDelimiter: function (value, delimiter, delimiters) {
	        // single delimiter
	        if (delimiters.length === 0) {
	            return value.slice(-delimiter.length) === delimiter ? delimiter : '';
	        }

	        // multiple delimiters
	        var matchedDelimiter = '';
	        delimiters.forEach(function (current) {
	            if (value.slice(-current.length) === current) {
	                matchedDelimiter = current;
	            }
	        });

	        return matchedDelimiter;
	    },

	    getDelimiterREByDelimiter: function (delimiter) {
	        return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
	    },

	    getNextCursorPosition: function (prevPos, oldValue, newValue, delimiter, delimiters) {
	      // If cursor was at the end of value, just place it back.
	      // Because new value could contain additional chars.
	      if (oldValue.length === prevPos) {
	          return newValue.length;
	      }

	      return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter ,delimiters);
	    },

	    getPositionOffset: function (prevPos, oldValue, newValue, delimiter, delimiters) {
	        var oldRawValue, newRawValue, lengthOffset;

	        oldRawValue = this.stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
	        newRawValue = this.stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
	        lengthOffset = oldRawValue.length - newRawValue.length;

	        return (lengthOffset !== 0) ? (lengthOffset / Math.abs(lengthOffset)) : 0;
	    },

	    stripDelimiters: function (value, delimiter, delimiters) {
	        var owner = this;

	        // single delimiter
	        if (delimiters.length === 0) {
	            var delimiterRE = delimiter ? owner.getDelimiterREByDelimiter(delimiter) : '';

	            return value.replace(delimiterRE, '');
	        }

	        // multiple delimiters
	        delimiters.forEach(function (current) {
	            current.split('').forEach(function (letter) {
	                value = value.replace(owner.getDelimiterREByDelimiter(letter), '');
	            });
	        });

	        return value;
	    },

	    headStr: function (str, length) {
	        return str.slice(0, length);
	    },

	    getMaxLength: function (blocks) {
	        return blocks.reduce(function (previous, current) {
	            return previous + current;
	        }, 0);
	    },

	    // strip prefix
	    // Before type  |   After type    |     Return value
	    // PEFIX-...    |   PEFIX-...     |     ''
	    // PREFIX-123   |   PEFIX-123     |     123
	    // PREFIX-123   |   PREFIX-23     |     23
	    // PREFIX-123   |   PREFIX-1234   |     1234
	    getPrefixStrippedValue: function (value, prefix, prefixLength, prevResult, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix) {
	        // No prefix
	        if (prefixLength === 0) {
	          return value;
	        }

	        // Value is prefix
	        if (value === prefix && value !== '') {
	          return '';
	        }

	        if (signBeforePrefix && (value.slice(0, 1) == '-')) {
	            var prev = (prevResult.slice(0, 1) == '-') ? prevResult.slice(1) : prevResult;
	            return '-' + this.getPrefixStrippedValue(value.slice(1), prefix, prefixLength, prev, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix);
	        }

	        // Pre result prefix string does not match pre-defined prefix
	        if (prevResult.slice(0, prefixLength) !== prefix && !tailPrefix) {
	            // Check if the first time user entered something
	            if (noImmediatePrefix && !prevResult && value) return value;
	            return '';
	        } else if (prevResult.slice(-prefixLength) !== prefix && tailPrefix) {
	            // Check if the first time user entered something
	            if (noImmediatePrefix && !prevResult && value) return value;
	            return '';
	        }

	        var prevValue = this.stripDelimiters(prevResult, delimiter, delimiters);

	        // New value has issue, someone typed in between prefix letters
	        // Revert to pre value
	        if (value.slice(0, prefixLength) !== prefix && !tailPrefix) {
	            return prevValue.slice(prefixLength);
	        } else if (value.slice(-prefixLength) !== prefix && tailPrefix) {
	            return prevValue.slice(0, -prefixLength - 1);
	        }

	        // No issue, strip prefix for new value
	        return tailPrefix ? value.slice(0, -prefixLength) : value.slice(prefixLength);
	    },

	    getFirstDiffIndex: function (prev, current) {
	        var index = 0;

	        while (prev.charAt(index) === current.charAt(index)) {
	            if (prev.charAt(index++) === '') {
	                return -1;
	            }
	        }

	        return index;
	    },

	    getFormattedValue: function (value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
	        var result = '',
	            multipleDelimiters = delimiters.length > 0,
	            currentDelimiter = '';

	        // no options, normal input
	        if (blocksLength === 0) {
	            return value;
	        }

	        blocks.forEach(function (length, index) {
	            if (value.length > 0) {
	                var sub = value.slice(0, length),
	                    rest = value.slice(length);

	                if (multipleDelimiters) {
	                    currentDelimiter = delimiters[delimiterLazyShow ? (index - 1) : index] || currentDelimiter;
	                } else {
	                    currentDelimiter = delimiter;
	                }

	                if (delimiterLazyShow) {
	                    if (index > 0) {
	                        result += currentDelimiter;
	                    }

	                    result += sub;
	                } else {
	                    result += sub;

	                    if (sub.length === length && index < blocksLength - 1) {
	                        result += currentDelimiter;
	                    }
	                }

	                // update remaining string
	                value = rest;
	            }
	        });

	        return result;
	    },

	    // move cursor to the end
	    // the first time user focuses on an input with prefix
	    fixPrefixCursor: function (el, prefix, delimiter, delimiters) {
	        if (!el) {
	            return;
	        }

	        var val = el.value,
	            appendix = delimiter || (delimiters[0] || ' ');

	        if (!el.setSelectionRange || !prefix || (prefix.length + appendix.length) <= val.length) {
	            return;
	        }

	        var len = val.length * 2;

	        // set timeout to avoid blink
	        setTimeout(function () {
	            el.setSelectionRange(len, len);
	        }, 1);
	    },

	    // Check if input field is fully selected
	    checkFullSelection: function(value) {
	      try {
	        var selection = window.getSelection() || document.getSelection() || {};
	        return selection.toString().length === value.length;
	      } catch (ex) {
	        // Ignore
	      }

	      return false;
	    },

	    setSelection: function (element, position, doc) {
	        if (element !== this.getActiveElement(doc)) {
	            return;
	        }

	        // cursor is already in the end
	        if (element && element.value.length <= position) {
	          return;
	        }

	        if (element.createTextRange) {
	            var range = element.createTextRange();

	            range.move('character', position);
	            range.select();
	        } else {
	            try {
	                element.setSelectionRange(position, position);
	            } catch (e) {
	                // eslint-disable-next-line
	                console.warn('The input element type does not support selection');
	            }
	        }
	    },

	    getActiveElement: function(parent) {
	        var activeElement = parent.activeElement;
	        if (activeElement && activeElement.shadowRoot) {
	            return this.getActiveElement(activeElement.shadowRoot);
	        }
	        return activeElement;
	    },

	    isAndroid: function () {
	        return navigator && /android/i.test(navigator.userAgent);
	    },

	    // On Android chrome, the keyup and keydown events
	    // always return key code 229 as a composition that
	    // buffers the user’s keystrokes
	    // see https://github.com/nosir/cleave.js/issues/147
	    isAndroidBackspaceKeydown: function (lastInputValue, currentInputValue) {
	        if (!this.isAndroid() || !lastInputValue || !currentInputValue) {
	            return false;
	        }

	        return currentInputValue === lastInputValue.slice(0, -1);
	    }
	};

	var Util_1 = Util;

	/**
	 * Props Assignment
	 *
	 * Separate this, so react module can share the usage
	 */
	var DefaultProperties = {
	    // Maybe change to object-assign
	    // for now just keep it as simple
	    assign: function (target, opts) {
	        target = target || {};
	        opts = opts || {};

	        // credit card
	        target.creditCard = !!opts.creditCard;
	        target.creditCardStrictMode = !!opts.creditCardStrictMode;
	        target.creditCardType = '';
	        target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || (function () {});

	        // phone
	        target.phone = !!opts.phone;
	        target.phoneRegionCode = opts.phoneRegionCode || 'AU';
	        target.phoneFormatter = {};

	        // time
	        target.time = !!opts.time;
	        target.timePattern = opts.timePattern || ['h', 'm', 's'];
	        target.timeFormat = opts.timeFormat || '24';
	        target.timeFormatter = {};

	        // date
	        target.date = !!opts.date;
	        target.datePattern = opts.datePattern || ['d', 'm', 'Y'];
	        target.dateMin = opts.dateMin || '';
	        target.dateMax = opts.dateMax || '';
	        target.dateFormatter = {};

	        // numeral
	        target.numeral = !!opts.numeral;
	        target.numeralIntegerScale = opts.numeralIntegerScale > 0 ? opts.numeralIntegerScale : 0;
	        target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2;
	        target.numeralDecimalMark = opts.numeralDecimalMark || '.';
	        target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand';
	        target.numeralPositiveOnly = !!opts.numeralPositiveOnly;
	        target.stripLeadingZeroes = opts.stripLeadingZeroes !== false;
	        target.signBeforePrefix = !!opts.signBeforePrefix;
	        target.tailPrefix = !!opts.tailPrefix;

	        // others
	        target.swapHiddenInput = !!opts.swapHiddenInput;
	        
	        target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;

	        target.uppercase = !!opts.uppercase;
	        target.lowercase = !!opts.lowercase;

	        target.prefix = (target.creditCard || target.date) ? '' : (opts.prefix || '');
	        target.noImmediatePrefix = !!opts.noImmediatePrefix;
	        target.prefixLength = target.prefix.length;
	        target.rawValueTrimPrefix = !!opts.rawValueTrimPrefix;
	        target.copyDelimiter = !!opts.copyDelimiter;

	        target.initValue = (opts.initValue !== undefined && opts.initValue !== null) ? opts.initValue.toString() : '';

	        target.delimiter =
	            (opts.delimiter || opts.delimiter === '') ? opts.delimiter :
	                (opts.date ? '/' :
	                    (opts.time ? ':' :
	                        (opts.numeral ? ',' :
	                            (opts.phone ? ' ' :
	                                ' '))));
	        target.delimiterLength = target.delimiter.length;
	        target.delimiterLazyShow = !!opts.delimiterLazyShow;
	        target.delimiters = opts.delimiters || [];

	        target.blocks = opts.blocks || [];
	        target.blocksLength = target.blocks.length;

	        target.root = (typeof commonjsGlobal === 'object' && commonjsGlobal) ? commonjsGlobal : window;
	        target.document = opts.document || target.root.document;

	        target.maxLength = 0;

	        target.backspace = false;
	        target.result = '';

	        target.onValueChanged = opts.onValueChanged || (function () {});

	        return target;
	    }
	};

	var DefaultProperties_1 = DefaultProperties;

	/**
	 * Construct a new Cleave instance by passing the configuration object
	 *
	 * @param {String | HTMLElement} element
	 * @param {Object} opts
	 */
	var Cleave = function (element, opts) {
	    var owner = this;
	    var hasMultipleElements = false;

	    if (typeof element === 'string') {
	        owner.element = document.querySelector(element);
	        hasMultipleElements = document.querySelectorAll(element).length > 1;
	    } else {
	      if (typeof element.length !== 'undefined' && element.length > 0) {
	        owner.element = element[0];
	        hasMultipleElements = element.length > 1;
	      } else {
	        owner.element = element;
	      }
	    }

	    if (!owner.element) {
	        throw new Error('[cleave.js] Please check the element');
	    }

	    if (hasMultipleElements) {
	      try {
	        // eslint-disable-next-line
	        console.warn('[cleave.js] Multiple input fields matched, cleave.js will only take the first one.');
	      } catch (e) {
	        // Old IE
	      }
	    }

	    opts.initValue = owner.element.value;

	    owner.properties = Cleave.DefaultProperties.assign({}, opts);

	    owner.init();
	};

	Cleave.prototype = {
	    init: function () {
	        var owner = this, pps = owner.properties;

	        // no need to use this lib
	        if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && (pps.blocksLength === 0 && !pps.prefix)) {
	            owner.onInput(pps.initValue);

	            return;
	        }

	        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);

	        owner.isAndroid = Cleave.Util.isAndroid();
	        owner.lastInputValue = '';
	        owner.isBackward = '';

	        owner.onChangeListener = owner.onChange.bind(owner);
	        owner.onKeyDownListener = owner.onKeyDown.bind(owner);
	        owner.onFocusListener = owner.onFocus.bind(owner);
	        owner.onCutListener = owner.onCut.bind(owner);
	        owner.onCopyListener = owner.onCopy.bind(owner);

	        owner.initSwapHiddenInput();

	        owner.element.addEventListener('input', owner.onChangeListener);
	        owner.element.addEventListener('keydown', owner.onKeyDownListener);
	        owner.element.addEventListener('focus', owner.onFocusListener);
	        owner.element.addEventListener('cut', owner.onCutListener);
	        owner.element.addEventListener('copy', owner.onCopyListener);


	        owner.initPhoneFormatter();
	        owner.initDateFormatter();
	        owner.initTimeFormatter();
	        owner.initNumeralFormatter();

	        // avoid touch input field if value is null
	        // otherwise Firefox will add red box-shadow for <input required />
	        if (pps.initValue || (pps.prefix && !pps.noImmediatePrefix)) {
	            owner.onInput(pps.initValue);
	        }
	    },

	    initSwapHiddenInput: function () {
	        var owner = this, pps = owner.properties;
	        if (!pps.swapHiddenInput) return;

	        var inputFormatter = owner.element.cloneNode(true);
	        owner.element.parentNode.insertBefore(inputFormatter, owner.element);

	        owner.elementSwapHidden = owner.element;
	        owner.elementSwapHidden.type = 'hidden';

	        owner.element = inputFormatter;
	        owner.element.id = '';
	    },

	    initNumeralFormatter: function () {
	        var owner = this, pps = owner.properties;

	        if (!pps.numeral) {
	            return;
	        }

	        pps.numeralFormatter = new Cleave.NumeralFormatter(
	            pps.numeralDecimalMark,
	            pps.numeralIntegerScale,
	            pps.numeralDecimalScale,
	            pps.numeralThousandsGroupStyle,
	            pps.numeralPositiveOnly,
	            pps.stripLeadingZeroes,
	            pps.prefix,
	            pps.signBeforePrefix,
	            pps.tailPrefix,
	            pps.delimiter
	        );
	    },

	    initTimeFormatter: function() {
	        var owner = this, pps = owner.properties;

	        if (!pps.time) {
	            return;
	        }

	        pps.timeFormatter = new Cleave.TimeFormatter(pps.timePattern, pps.timeFormat);
	        pps.blocks = pps.timeFormatter.getBlocks();
	        pps.blocksLength = pps.blocks.length;
	        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
	    },

	    initDateFormatter: function () {
	        var owner = this, pps = owner.properties;

	        if (!pps.date) {
	            return;
	        }

	        pps.dateFormatter = new Cleave.DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
	        pps.blocks = pps.dateFormatter.getBlocks();
	        pps.blocksLength = pps.blocks.length;
	        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
	    },

	    initPhoneFormatter: function () {
	        var owner = this, pps = owner.properties;

	        if (!pps.phone) {
	            return;
	        }

	        // Cleave.AsYouTypeFormatter should be provided by
	        // external google closure lib
	        try {
	            pps.phoneFormatter = new Cleave.PhoneFormatter(
	                new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode),
	                pps.delimiter
	            );
	        } catch (ex) {
	            throw new Error('[cleave.js] Please include phone-type-formatter.{country}.js lib');
	        }
	    },

	    onKeyDown: function (event) {
	        var owner = this,
	            charCode = event.which || event.keyCode;

	        owner.lastInputValue = owner.element.value;
	        owner.isBackward = charCode === 8;
	    },

	    onChange: function (event) {
	        var owner = this, pps = owner.properties,
	            Util = Cleave.Util;

	        owner.isBackward = owner.isBackward || event.inputType === 'deleteContentBackward';

	        var postDelimiter = Util.getPostDelimiter(owner.lastInputValue, pps.delimiter, pps.delimiters);

	        if (owner.isBackward && postDelimiter) {
	            pps.postDelimiterBackspace = postDelimiter;
	        } else {
	            pps.postDelimiterBackspace = false;
	        }

	        this.onInput(this.element.value);
	    },

	    onFocus: function () {
	        var owner = this,
	            pps = owner.properties;
	        owner.lastInputValue = owner.element.value;

	        if (pps.prefix && pps.noImmediatePrefix && !owner.element.value) {
	            this.onInput(pps.prefix);
	        }

	        Cleave.Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
	    },

	    onCut: function (e) {
	        if (!Cleave.Util.checkFullSelection(this.element.value)) return;
	        this.copyClipboardData(e);
	        this.onInput('');
	    },

	    onCopy: function (e) {
	        if (!Cleave.Util.checkFullSelection(this.element.value)) return;
	        this.copyClipboardData(e);
	    },

	    copyClipboardData: function (e) {
	        var owner = this,
	            pps = owner.properties,
	            Util = Cleave.Util,
	            inputValue = owner.element.value,
	            textToCopy = '';

	        if (!pps.copyDelimiter) {
	            textToCopy = Util.stripDelimiters(inputValue, pps.delimiter, pps.delimiters);
	        } else {
	            textToCopy = inputValue;
	        }

	        try {
	            if (e.clipboardData) {
	                e.clipboardData.setData('Text', textToCopy);
	            } else {
	                window.clipboardData.setData('Text', textToCopy);
	            }

	            e.preventDefault();
	        } catch (ex) {
	            //  empty
	        }
	    },

	    onInput: function (value) {
	        var owner = this, pps = owner.properties,
	            Util = Cleave.Util;

	        // case 1: delete one more character "4"
	        // 1234*| -> hit backspace -> 123|
	        // case 2: last character is not delimiter which is:
	        // 12|34* -> hit backspace -> 1|34*
	        // note: no need to apply this for numeral mode
	        var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);
	        if (!pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
	            value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
	        }

	        // phone formatter
	        if (pps.phone) {
	            if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
	                pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
	            } else {
	                pps.result = pps.phoneFormatter.format(value);
	            }
	            owner.updateValueState();

	            return;
	        }

	        // numeral formatter
	        if (pps.numeral) {
	            // Do not show prefix when noImmediatePrefix is specified
	            // This mostly because we need to show user the native input placeholder
	            if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
	                pps.result = '';
	            } else {
	                pps.result = pps.numeralFormatter.format(value);
	            }
	            owner.updateValueState();

	            return;
	        }

	        // date
	        if (pps.date) {
	            value = pps.dateFormatter.getValidatedDate(value);
	        }

	        // time
	        if (pps.time) {
	            value = pps.timeFormatter.getValidatedTime(value);
	        }

	        // strip delimiters
	        value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);

	        // strip prefix
	        value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);

	        // strip non-numeric characters
	        value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;

	        // convert case
	        value = pps.uppercase ? value.toUpperCase() : value;
	        value = pps.lowercase ? value.toLowerCase() : value;

	        // prevent from showing prefix when no immediate option enabled with empty input value
	        if (pps.prefix) {
	            if (pps.tailPrefix) {
	                value = value + pps.prefix;
	            } else {
	                value = pps.prefix + value;
	            }


	            // no blocks specified, no need to do formatting
	            if (pps.blocksLength === 0) {
	                pps.result = value;
	                owner.updateValueState();

	                return;
	            }
	        }

	        // update credit card props
	        if (pps.creditCard) {
	            owner.updateCreditCardPropsByValue(value);
	        }

	        // strip over length characters
	        value = Util.headStr(value, pps.maxLength);

	        // apply blocks
	        pps.result = Util.getFormattedValue(
	            value,
	            pps.blocks, pps.blocksLength,
	            pps.delimiter, pps.delimiters, pps.delimiterLazyShow
	        );

	        owner.updateValueState();
	    },

	    updateCreditCardPropsByValue: function (value) {
	        var owner = this, pps = owner.properties,
	            Util = Cleave.Util,
	            creditCardInfo;

	        // At least one of the first 4 characters has changed
	        if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
	            return;
	        }

	        creditCardInfo = Cleave.CreditCardDetector.getInfo(value, pps.creditCardStrictMode);

	        pps.blocks = creditCardInfo.blocks;
	        pps.blocksLength = pps.blocks.length;
	        pps.maxLength = Util.getMaxLength(pps.blocks);

	        // credit card type changed
	        if (pps.creditCardType !== creditCardInfo.type) {
	            pps.creditCardType = creditCardInfo.type;

	            pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
	        }
	    },

	    updateValueState: function () {
	        var owner = this,
	            Util = Cleave.Util,
	            pps = owner.properties;

	        if (!owner.element) {
	            return;
	        }

	        var endPos = owner.element.selectionEnd;
	        var oldValue = owner.element.value;
	        var newValue = pps.result;

	        endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

	        // fix Android browser type="text" input field
	        // cursor not jumping issue
	        if (owner.isAndroid) {
	            window.setTimeout(function () {
	                owner.element.value = newValue;
	                Util.setSelection(owner.element, endPos, pps.document, false);
	                owner.callOnValueChanged();
	            }, 1);

	            return;
	        }

	        owner.element.value = newValue;
	        if (pps.swapHiddenInput) owner.elementSwapHidden.value = owner.getRawValue();

	        Util.setSelection(owner.element, endPos, pps.document, false);
	        owner.callOnValueChanged();
	    },

	    callOnValueChanged: function () {
	        var owner = this,
	            pps = owner.properties;

	        pps.onValueChanged.call(owner, {
	            target: {
	                name: owner.element.name,
	                value: pps.result,
	                rawValue: owner.getRawValue()
	            }
	        });
	    },

	    setPhoneRegionCode: function (phoneRegionCode) {
	        var owner = this, pps = owner.properties;

	        pps.phoneRegionCode = phoneRegionCode;
	        owner.initPhoneFormatter();
	        owner.onChange();
	    },

	    setRawValue: function (value) {
	        var owner = this, pps = owner.properties;

	        value = value !== undefined && value !== null ? value.toString() : '';

	        if (pps.numeral) {
	            value = value.replace('.', pps.numeralDecimalMark);
	        }

	        pps.postDelimiterBackspace = false;

	        owner.element.value = value;
	        owner.onInput(value);
	    },

	    getRawValue: function () {
	        var owner = this,
	            pps = owner.properties,
	            Util = Cleave.Util,
	            rawValue = owner.element.value;

	        if (pps.rawValueTrimPrefix) {
	            rawValue = Util.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);
	        }

	        if (pps.numeral) {
	            rawValue = pps.numeralFormatter.getRawValue(rawValue);
	        } else {
	            rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
	        }

	        return rawValue;
	    },

	    getISOFormatDate: function () {
	        var owner = this,
	            pps = owner.properties;

	        return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
	    },

	    getISOFormatTime: function () {
	        var owner = this,
	            pps = owner.properties;

	        return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
	    },

	    getFormattedValue: function () {
	        return this.element.value;
	    },

	    destroy: function () {
	        var owner = this;

	        owner.element.removeEventListener('input', owner.onChangeListener);
	        owner.element.removeEventListener('keydown', owner.onKeyDownListener);
	        owner.element.removeEventListener('focus', owner.onFocusListener);
	        owner.element.removeEventListener('cut', owner.onCutListener);
	        owner.element.removeEventListener('copy', owner.onCopyListener);
	    },

	    toString: function () {
	        return '[Cleave Object]';
	    }
	};

	Cleave.NumeralFormatter = NumeralFormatter_1;
	Cleave.DateFormatter = DateFormatter_1;
	Cleave.TimeFormatter = TimeFormatter_1;
	Cleave.PhoneFormatter = PhoneFormatter_1;
	Cleave.CreditCardDetector = CreditCardDetector_1;
	Cleave.Util = Util_1;
	Cleave.DefaultProperties = DefaultProperties_1;

	// for angular directive
	((typeof commonjsGlobal === 'object' && commonjsGlobal) ? commonjsGlobal : window)['Cleave'] = Cleave;

	// CommonJS
	var Cleave_1 = Cleave;

	let MaskDollars$1 = class MaskDollars {
	  constructor() {
	    let dollars = document.querySelectorAll('[data-js="mask-dollars"]');

	    for (let i = 0; i < dollars.length; i++) {
	      new Cleave_1(dollars[i], {
	        numeral: true,
	        numeralThousandsGroupStyle: 'thousand'
	      });

	      dollars[i].addEventListener('blur', event => {
	        let value = event.target.value;
	        let postfix = '';

	        if (`${value}`.indexOf('.') > -1) {
	          let split = `${value}`.split('.');

	          postfix = (split[1].length == 1) ? '0' : postfix;
	          postfix = (split[1].length == 0) ? '00' : postfix;
	          value += postfix;
	        } else if (value != '') {
	          value += '.00';
	        }

	        event.target.value = value;
	      });
	    }
	  }
	};

	var maskDollars = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: MaskDollars$1
	});

	var require$$4 = /*@__PURE__*/getAugmentedNamespace(maskDollars);

	let MaskTel$1 = class MaskTel {
	  constructor() {
	    let phones = document.querySelectorAll('[data-js="mask-tel"]');

	    for (let i = 0; i < phones.length; i++) {
	      new Cleave_1(phones[i], {
	        numericOnly: true,
	        blocks: [0, 3, 0, 3, 4],
	        delimiters: ['(', ')', ' ', '-']
	      });
	    }
	  }
	};

	var maskTel = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: MaskTel$1
	});

	var require$$5 = /*@__PURE__*/getAugmentedNamespace(maskTel);

	let MaskSSN$1 = class MaskSSN {
	  constructor() {
	    let ssns = document.querySelectorAll('[data-js="mask-ssn"]');

	    for (let i = 0; i < ssns.length; i++) {
	      new Cleave_1(ssns[i], {
	        numericOnly: true,
	        blocks: [3, 2, 4],
	        delimiters: ['-', '-']
	      });
	    }
	  }
	};

	var maskSsn = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: MaskSSN$1
	});

	var require$$6 = /*@__PURE__*/getAugmentedNamespace(maskSsn);

	let FollowUpQuestion$1 = class FollowUpQuestion {
	  /**
	   * Follow up constructor
	   *
	   * @param   {Object}  s  Optional settings configuration
	   *
	   * @return  {Object}     Instance of FollowUpQuestion
	   */
	  constructor(s = {}) {
	    this.selector = s.selector ? s.selector : FollowUpQuestion.selector;

	    this.elFocusable = s.elFocusable ? s.elFocusable : FollowUpQuestion.elFocusable;

	    this.elDisabled = s.elDisabled ? s.elDisabled : FollowUpQuestion.elDisabled;

	    this.ariaExpanded = s.ariaExpanded ? s.ariaExpanded : FollowUpQuestion.ariaExpanded;

	    this.show = s.show ? s.show : this.show;

	    this.hide = s.hide ? s.hide : this.hide;

	    this.init();

	    document.querySelector('body')
	      .addEventListener('change', event => {
	        if (event.target.matches(this.selector)) {
	          this.toggle();
	        }
	    });

	    return this;
	  }

	  /**
	   * Initializes the follow up trigger and target region
	   *
	   * @return  {Object}  Instance of FollowUpQuestion
	   */
	  init() {
	    let triggers = document.querySelectorAll(this.selector);

	    for (let i = 0; i < triggers.length; i++) {
	      if (triggers[i].dataset.ariaControls) {
	        let trigger = triggers[i];
	        let target = document.getElementById(trigger.dataset.ariaControls);
	        let checked = trigger.getAttribute('checked') ? true : false;

	        if (false === checked) {
	          this.hide(target);
	        }

	        trigger.setAttribute('aria-controls', trigger.dataset.ariaControls);

	        if (this.ariaExpanded) {
	          trigger.setAttribute('aria-expanded', checked);
	        }
	      }
	    }

	    return this;
	  }

	  /**
	   * Main toggling method that checks all follow up triggers to ensure they
	   * are properly hidden or shown.
	   *
	   * @param   {Object}  trigger  The node element that triggered the toggle
	   *
	   * @return  {Object}           Instance of FollowUpQuestion
	   */
	  toggle() {
	    let triggers = document.querySelectorAll(this.selector);

	    for (let i = 0; i < triggers.length; i++) {
	      let trigger = triggers[i];

	      if (null === trigger.getAttribute('aria-controls')) continue;

	      let target = document.getElementById(trigger.dataset.ariaControls);
	      let checked = trigger.checked;

	      if (checked) {
	        this.show(target);
	      } else {
	        this.hide(target);
	      }

	      if (this.ariaExpanded) {
	        trigger.setAttribute('aria-expanded', checked);
	      }
	    }

	    return this;
	  }

	  /**
	   * Method for hiding the follow up target region
	   *
	   * @param   {Object}  target  Node element of the target region
	   *
	   * @return  {Object}          Instance of FollowUpQuestion
	   */
	  hide(target) {
	    target.setAttribute('hidden', '');

	    // Set potentially focusable contents tabindex to -1
	    this.index(target.querySelectorAll(this.elFocusable.join(', ')));

	    // Set child inputs to disabled
	    this.disable(target.querySelectorAll(this.elDisabled.join(', ')));

	    return this;
	  }

	  /**
	   * Method for showing the follow up target region
	   *
	   * @param   {Object}  target  Node element of the target region
	   *
	   * @return  {Object}          Instance of FollowUpQuestion
	   */
	  show(target) {
	    target.removeAttribute('hidden');

	    // Remove potentially focusable contents tabindex
	    this.index(target.querySelectorAll(this.elFocusable.join(', ')), true);

	    // Enable child inputs
	    this.disable(target.querySelectorAll(this.elDisabled.join(', ')), true);

	    return this;
	  }

	  /**
	   * Method for adding or removing potentially focusable elements from the
	   * dom tabbing order within the target region.
	   *
	   * @param   {NodeList}  elements  Elements to index
	   * @param   {Boolean}   index     Wether to index elements or not
	   *
	   * @return  {Object}              Instance of FollowUpQuestion
	   */
	  index(elements, index = false) {
	    for (let i = 0; i < elements.length; i++) {
	      let element = elements[i];

	      if (index) {
	        let dataDefault = element.getAttribute(`data-js-tabindex`);

	        if (dataDefault) {
	          element.setAttribute('tabindex', dataDefault);
	        } else {
	          element.removeAttribute('tabindex');
	        }
	      } else {
	        element.setAttribute('tabindex', '-1');
	      }
	    }
	    return this;
	  }

	  /**
	   * Method for enabling or disabling form elements within the target region.
	   *
	   * @param   {NodeList}  elements  Elements to enable or disable
	   * @param   {Boolean}   enable    Wether to enable or disable elements
	   *
	   * @return  {Object}              Instance of FollowUpQuestion
	   */
	  disable(elements, enable = false) {
	    for (let i = 0; i < elements.length; i++) {
	      let element = elements[i];

	      if (enable) {
	        element.removeAttribute('disabled');
	      } else {
	        element.setAttribute('disabled', '');
	      }
	    }

	    return this;
	  }
	};

	/** @type  {String}  The main selector for the follow up question component event listening */
	FollowUpQuestion$1.selector = '[data-js="follow-up-question"]';

	/** @type  {Array}  A list of potentially focusable element selectors */
	FollowUpQuestion$1.elFocusable = [
	  'a', 'button', 'input', 'select', 'textarea', 'object', 'embed', 'form',
	  'fieldset', 'legend', 'label', 'area', 'audio', 'video', 'iframe', 'svg',
	  'details', 'table', '[tabindex]', '[contenteditable]', '[usemap]'
	];

	/** @type  {Array}  A list of form elements that can be disabled */
	FollowUpQuestion$1.elDisabled = [
	  'button', 'fieldset', 'select', 'textarea', 'input'
	];

	/** @type  {Boolean}  Wether to add the aria-expanded attribute to the radio button, which at the time of authoring, is an invalid use of aria */
	FollowUpQuestion$1.ariaExpanded = false;

	var cfaFollowUpQuestion = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: FollowUpQuestion$1
	});

	var require$$7 = /*@__PURE__*/getAugmentedNamespace(cfaFollowUpQuestion);

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
	const MaskDollars = require$$4;
	const MaskTel = require$$5;
	const MaskSSN = require$$6;
	const FollowUpQuestion = require$$7;

	uswds.components = components;

	const initComponents = () => {
	  const target = document.body;

	  Object.keys(components).forEach(key => {
	    const behavior = components[key];

	    behavior.on(target);
	  });

	  svg4everybody();

	  new MaskDollars();
	  new MaskTel();
	  new MaskSSN();
	  new FollowUpQuestion();
	};

	if (document.readyState === 'loading') {
	  document.addEventListener('DOMContentLoaded', initComponents, { once: true });
	} else {
	  initComponents();
	}

	return js;

})();
