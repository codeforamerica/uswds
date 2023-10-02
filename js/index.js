'use strict';

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
import Copy from './copy.js';
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

  new Copy();
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
          //
          //     file.previewElement.querySelector(UploadDocuments.selectors.documentRemoveLabel).innerText = 'cancel';
          //
          //     file.previewElement.querySelector(UploadDocuments.selectors.documentRemove)
          //       .addEventListener('click', () => {
          //         //... cancel event for uploading file
          //       });
          //   });
          //
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
          //
          //     file.previewElement.querySelector(UploadDocuments.selectors.documentRemoveLabel).innerText = 'remove';
          //
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
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents, { once: true });
} else {
  initComponents();
}
