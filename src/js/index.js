'use strict';

window.uswdsPresent = true; // Indicate uswds.js has loaded in the DOM.

// The 'polyfills' define key ECMAScript 5 methods that may be missing from older browsers (which?)
// import polyfills from '../../node_modules/@uswds/uswds/packages/uswds-core/src/js/polyfills';
// Adds SVG support for (really) old browsers. If needed add after USWDS initialization svg4everybody();
// import svg4everybody from '../../node_modules/@uswds/uswds/packages/uswds-core/src/js/polyfills/svg4everybody';
import uswds from '../../node_modules/@uswds/uswds/packages/uswds-core/src/js/config.js';

/**
 * USWDS packages
 */

// import banner from '@uswds/uswds/js/usa-banner';
// import characterCount from '@uswds/uswds/js/usa-character-count';
// import comboBox from '@uswds/uswds/js/usa-combo-box';
// import datePicker from '@uswds/uswds/js/usa-date-picker';
// import dateRangePicker from '@uswds/uswds/js/usa-date-range-picker';
// import fileInput from '@uswds/uswds/js/usa-file-input';
// import footer from '@uswds/uswds/js/usa-footer';
// import inPageNavigation from '@uswds/uswds/js/usa-in-page-navigation';
// import inputMask from '@uswds/uswds/js/usa-input-mask';
// import languageSelector from '@uswds/uswds/js/usa-language-selector';
// import modal from '@uswds/uswds/js/usa-modal';
// import password from '@uswds/uswds/js/_usa-password';
// import search from '@uswds/uswds/js/usa-search';
// import table from '@uswds/uswds/js/usa-table';
// import timePicker from '@uswds/uswds/js/usa-time-picker';

import accordion from '@uswds/uswds/js/usa-accordion';
import button from '@uswds/uswds/js/usa-button';
import navigation from '@uswds/uswds/js/usa-header';
import skipnav from '@uswds/uswds/js/usa-skipnav';
import tooltip from '@uswds/uswds/js/usa-tooltip';

/**
 * Code for America packages
 */

import Copy from '../../packages/cfa-copy/cfa-copy.js';
import Details from '../../packages/cfa-details/cfa-details.js';
import FollowUpQuestion from '../../packages/cfa-follow-up-question/cfa-follow-up-question.js';
import MaskDollars from '../../packages/cfa-mask/cfa-mask-dollars.js';
import MaskTel from '../../packages/cfa-mask/cfa-mask-tel.js';
import MaskSSN from '../../packages/cfa-mask/cfa-mask-ssn.js';
import UploadDocuments from '../../packages/cfa-upload-documents/cfa-upload-documents.js';

/**
 * Initialize USWDS and Code for America theme utilities and components
 */

accordion.on(document.body);
button.on(document.body);

new Copy();
new Details();
new FollowUpQuestion();

navigation.on(document.body);

new MaskDollars();
new MaskTel();
new MaskSSN();

skipnav.on(document.body);
tooltip.on(document.body);

/**
 * Upload Documents component
 */
(elements => {
  for (let i = 0; i < elements.length; i++) {
    new UploadDocuments(elements[i], {
      // /**
      //  * Example of passing already uploaded files to the utility
      //  *
      //  * @type  {Array}
      //  */
      // mockFiles: [
      //   {
      //     @name:     {String}   file name including extension,
      //     @size:     {Number}   file size in bytes,
      //     @type:     {String}   file type,
      //     @id:       {String}   file ID,
      //     @dataURL:  {String}   data encoded URI of the image thumbnail,
      //     @accepted: {Boolean}  defaults to true
      //   },
      //   {
      //     name: 'filename.png',
      //     size: 192435,
      //     type: 'image/png',
      //     id: '0f488973-63e2-4a1d-a509-d1b492f10344',
      //     dataURL: "data:image/png;base64,...",
      //     accepted: true
      //   }
      // ],

      /**
       * Dropzone Options. These will be passed to the Dropzone instantiation.
       *
       * @url https://github.com/dropzone/dropzone/blob/main/src/options.js
       */
      dropzoneOptions: {
        /**
         * Required. A URL must be set in the Dropzone options configuration
         */
        url: 'https://app-46361.on-aptible.com/file-upload',

        // /**
        //  * Example Dropzone init configuration
        //  */
        // init: function() {
        //   /**
        //    * Example added file event hook. Called when a file is added to the queue
        //    *
        //    * @url https://github.com/dropzone/dropzone/blob/f50d1828ab5df79a76be00d1306cc320e39a27f4/src/options.js#L611
        //    *
        //    * @param  {Object}  file  Dropzone file object
        //    */
        //   this.on('addedfile', function(file) {
        //     //... some custom methods can go here

        //     file.previewElement.querySelector(UploadDocuments.selectors.documentRemoveLabel).innerText = 'cancel';

        //     file.previewElement.querySelector(UploadDocuments.selectors.documentRemove)
        //       .addEventListener('click', () => {
        //         //... cancel event for uploading file
        //       });
        //   });

        //   /**
        //    * Example success event hook. When the complete upload is finished
        //    * and successful.
        //    *
        //    * @url https://github.com/dropzone/dropzone/blob/f50d1828ab5df79a76be00d1306cc320e39a27f4/src/options.js#L752
        //    *
        //    * @param  {Object}  file  Dropzone file object
        //    */
        //   this.on('success', function(file) {
        //     //... some custom methods can go here

        //     file.previewElement.querySelector(UploadDocuments.selectors.documentRemoveLabel).innerText = 'remove';

        //     file.previewElement.querySelector(UploadDocuments.selectors.documentRemove)
        //       .addEventListener('click', () => {
        //         //... remove event for uploaded file
        //       });
        //   });

        //   /**
        //    * Example sending event hook. Called just before the file is sent.
        //    * Gets the `xhr` object as second parameter, so you can modify it
        //    * (for example to add a CSRF token) and a `formData` object to add
        //    * additional information.
        //    *
        //    * @url https://github.com/dropzone/dropzone/blob/f50d1828ab5df79a76be00d1306cc320e39a27f4/src/options.js#L746
        //    *
        //    * @param  {Object}  file      Dropzone file object
        //    * @param  {Object}  xhr       The xhr request
        //    * @param  {Object}  formData  Form data to append additional information to
        //    */
        //   this.on('sending', function(file, xhr, formData) {
        //     let token = document.querySelector('[data-js="csrf"]').value;

        //     formData.append('_csrf', token);
        //     //...
        //   });
        // }
      }
    });
  }
})(document.querySelectorAll(UploadDocuments.selector));

/**
 * Add tabindex to pre tags to make them focusable. Site only
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach(pre => {
    if (!pre.hasAttribute('tabindex')) {
      pre.setAttribute('tabindex', '0');
    }
  });
});
