/**
 * Copy of @uswds/uswds/packages/uswds-core/src/js/start.js
 *
 * Likely, this script can be made into an ES module
 */

window.uswdsPresent = true; // GLOBAL variable to indicate that the uswds.js has loaded in the DOM.

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be imported first.
 */

import polyfills from '../node_modules/@uswds/uswds/packages/uswds-core/src/js/polyfills';

import uswds from '../node_modules/@uswds/uswds/packages/uswds-core/src/js/config';

import components from './components';
import svg4everybody from '../node_modules/@uswds/uswds/packages/uswds-core/src/js/polyfills/svg4everybody';
import MaskDollars from './mask-dollars.js';
import MaskTel from './mask-tel.js';
import MaskSSN from './mask-ssn.js';
import FollowUpQuestion from '../packages/cfa-follow-up-question/cfa-follow-up-question.js';
import UploadDocuments from '../packages/cfa-upload-documents/cfa-upload-documents.js';

uswds.components = components;

const initComponents = () => {
  const target = document.body;

  /**
   * USWDS Components
   */

  Object.keys(components).forEach(key => {
    const behavior = components[key];

    behavior.on(target);
  });

  svg4everybody();

  /**
   * CfA Theme Utilities and Components
   */

  new MaskDollars();
  new MaskTel();
  new MaskSSN();
  new FollowUpQuestion();

  /**
   * Upload Documents Component
   */
  (elements => {
    for (let i = 0; i < elements.length; i++) {
      new UploadDocuments(elements[i], {
        dropzoneOptions: {
          url: 'https://app-46361.on-aptible.com/file-upload'
        }
      });
    }
  })(document.querySelectorAll(UploadDocuments.selector));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents, { once: true });
} else {
  initComponents();
}
