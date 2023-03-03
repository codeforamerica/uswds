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

require('../node_modules/@uswds/uswds/packages/uswds-core/src/js/polyfills');

const uswds = require('../node_modules/@uswds/uswds/packages/uswds-core/src/js/config');

const components = require('./components');
const svg4everybody = require('../node_modules/@uswds/uswds/packages/uswds-core/src/js/polyfills/svg4everybody');

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

// This script is self-executing so no need to export
// exports.default = uswds;
// exports.initComponents = initComponents;
