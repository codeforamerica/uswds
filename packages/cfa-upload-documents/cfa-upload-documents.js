import { Dropzone } from 'dropzone';

Dropzone.autoDiscover = false;

/**
 * A utility class for interacting with the Dropzone library
 *
 * Compatible with @dropzone v5.9.3
 */
class UploadDocuments {
  /**
   * Constructor
   *
   * @param  {Object}  element  Required. A pre-queried Dropzone element to initialize
   * @param  {Object}  s        Optional settings configuration that will be processed and passed to Dropzone
   *
   * @return {Object}           Instance of UploadDocuments
   */
  constructor(element, s = {}) {
    this.selectors = s.selectors ? s.selectors : UploadDocuments.selectors;

    this.element = element;

    this.dropzoneOptions = s.dropzoneOptions ?
      Object.assign(UploadDocuments.dropzoneOptions, s.dropzoneOptions) : UploadDocuments.dropzoneOptions;

    this.mockFiles = s.mockFiles ? s.mockFiles : [];

    /**
     * Configure and initialize Dropzone
     */

    this.dropzone = this.configDropzone(this.dropzoneOptions);

    /**
     * Append custom init method. This is not the same as the Dropzone init callback
     */

    this.init(this.dropzone);

    /**
     * Event handlers for development
     */

    if (process.env.NODE_ENV != 'production') {
      document.querySelector('body').addEventListener('click', event => {
        if (event.target.matches('[data-dropzone="toggle-preview-state"]')) {
          event.target.closest('[data-dropzone="preview-template"]')
            .className = event.target.dataset.dropzonePreviewState;
        }
      });
    }

    console.dir(this);

    return this;
  }

  /**
   * Set Dropzone options, relevant to the template, and initialize Dropzone.
   * @source https://github.com/dropzone/dropzone/blob/main/src/options.js
   *
   * @param   {Object}   options  Options to pass to configure and pass to the Dropzone class
   *
   * @return  {Object}            Instance of UploadDocuments
   */
  configDropzone(options) {
    let input = this.element.querySelector(this.selectors.input);
    let previewsContainer = this.element.querySelector(this.selectors.previewsContainer);
    let previewTemplate = this.element.querySelector(this.selectors.previewTemplate);
    let thumbnail = previewTemplate.querySelector(this.selectors.thumbnail);
    let hiddenInputContainer = this.element.querySelector(this.selectors.hiddenInputContainer);
    let dict = this.element.querySelectorAll(this.selectors.dict);

    thumbnail.classList.add(`width-${options.thumbnailWidth}`);
    thumbnail.classList.add(`height-${options.thumbnailHeight}`);

    options.thumbnailWidth = options.thumbnailWidth * 8;
    options.thumbnailHeight = options.thumbnailHeight * 8;

    options.previewsContainer = (previewsContainer) ? previewsContainer : null;
    options.previewTemplate = (previewTemplate) ? previewTemplate.outerHTML : null;

    options.acceptedFiles = (input) ? input.getAttribute('accept') : null;

    options.hiddenInputContainer = (hiddenInputContainer) ? hiddenInputContainer : region;

    /**
     * Set all provided dictionary items from the template
     */

    for (let i = 0; i < dict.length; i++) {
      let d = dict[i].dataset['dropzoneDict'];
      let key = `dict${d.charAt(0).toUpperCase() + d.slice(1)}`;
      let value = dict[i].innerText;

      if (value != '') {
        options[key] = value;
      }
    }

    /**
     * Events
     */

    options.dragover = event => {
      this.dragover(event);
    };

    options.dragleave = event => {
      this.dragleave(event);
    };

    options.drop = event => {
      this.drop(event);
    };

    /**
     * Initialize Dropzone
     */

    return new Dropzone(this.element, options);
  }

  /**
   * An init function for Dropzone. This is not the same as Dropzone's provided
   * init event handler. However, this handler does trigger after Dropzone is
   * initialized.
   *
   * @return  {Object}      Instance of UploadDocuments
   */
  init() {
    this.maxFiles()
      .swapFallback();

    this.dropzone.on('addedfile', file => {
      this.formatFilename(file)
        .maxFiles()
        .uploadedNumber();
    });

    this.dropzone.on('removedfile', file => {
      this.maxFiles()
        .uploadedNumber();
    });

    /**
     * Add previously uploaded documents
     */
    for (let i = 0; i < this.mockFiles.length; i++) {
      this.addFile(this.mockFiles[i]);
    }

    return this;
  }

  /**
   * Swaps attributes on the fallback file input with attributes on the hidden
   * Dropzone file input. This makes the presentation of the Dropzone element
   * compatible with the default USWDS File Input component.
   *
   * @return  {Object}      Instance of UploadDocuments
   */
  swapFallback() {
    let fallback = this.dropzone.element.querySelector(UploadDocuments.selectors.fallback);

    for (let i = 0; i < UploadDocuments.fallbackAttrs.length; i++) {
      let attr = UploadDocuments.fallbackAttrs[i];
      let value = fallback.getAttribute(attr);

      if (value) this.dropzone.hiddenFileInput.setAttribute(attr, value);
    }

    fallback.remove();

    for (let i = 0; i < UploadDocuments.removeAttrs.length; i++) {
      let attr = UploadDocuments.removeAttrs[i];

      this.dropzone.hiddenFileInput.removeAttribute(attr);
    }

    return this;
  }

  /**
   * Event handler for the dragover event on the Dropzone region
   *
   * @param   {Object}  event  Dragover event
   *
   * @return  {Object}         Instance of UploadDocuments
   */
  dragover(event) {
    if (event.srcElement.matches(UploadDocuments.selectors.dragRegion)) {
      event.srcElement.classList.add(UploadDocuments.classes.dragOver);
    }

    return this;
  }

  /**
   * Event handler for the dragleave event on the Dropzone region
   *
   * @param   {Object}  event  Dragleave event
   *
   * @return  {Object}         Instance of UploadDocuments
   */
  dragleave(event) {
    if (event.srcElement.matches(UploadDocuments.selectors.dragRegion)) {
      event.srcElement.classList.remove(UploadDocuments.classes.dragOver);
    }

    return this;
  }

  /**
   * Event handler for the drop event on the Dropzone region
   *
   * @param   {Object}  event  Drop event
   *
   * @return  {Object}         Instance of UploadDocuments
   */
  drop(event) {
    this.dragleave(event);

    /**
     * Shift focus to the uploads header with additional information
     */

    let header = this.element.querySelector(UploadDocuments.selectors.uploadsHeader);

    if (header) {
      header.setAttribute('tabindex', '-1');
      header.focus();
    }

    return this;
  }

  /**
   * Format the filename label so that the name overflow
   *
   * @param   {Object}  file  Most recently added Dropzone file object
   *
   * @return  {Object}        Instance of UploadDocuments
   */
  formatFilename(file) {
    let nameElement = file.previewElement.querySelector('[data-dz-name]');
    let label = nameElement.innerText;

    /**
     * Get filename extension
     *
     * @source https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript/12900504#12900504
     */

    let ext = label.slice((label.lastIndexOf('.') - 1 >>> 0) + 2);

    let name = (ext === '') ? label : label.slice(0, label.lastIndexOf('.'));

    nameElement.innerHTML = [
      `<span class="dropzone__filename-name" aria-hidden="true">${name}</span>`,
      ((ext !== '') ? `<span class="filename__filename-ext" aria-hidden="true">.${ext}</span>` : '')
    ].join('');

    nameElement.setAttribute('aria-label', label);

    return this;
  }

  /**
   * Update the uploaded number inner text to reflect the number of added files
   */
  uploadedNumber() {
    let number = this.element.querySelector(UploadDocuments.selectors.uploadsNumber);

    if (number) {
      number.innerText = this.dropzone.files.length;
    }

    return this;
  }

  /**
   * Assert if max files have been reached and toggle messaging and other relevant events
   *
   * @return  {Object}      Instance of UploadDocuments
   */
  maxFiles() {
    let inputErrorMessage = this.element.querySelector(UploadDocuments.selectors.inputErrorMessage);

    if (inputErrorMessage.getAttribute('aria-hidden') === 'true' &&
      this.dropzone.files.length >= this.dropzone.options.maxFiles) {
      let inputErrorMessage = this.element.querySelector(UploadDocuments.selectors.inputErrorMessage);

      inputErrorMessage.innerText = this.dropzone.options.dictMaxFilesExceeded;
      inputErrorMessage.removeAttribute('aria-hidden');
      inputErrorMessage.setAttribute('role', 'alert');
      inputErrorMessage.setAttribute('aria-live', 'polite');
    }

    if (this.dropzone.files.length <= this.dropzone.options.maxFiles) {
      let inputErrorMessage = this.element.querySelector(UploadDocuments.selectors.inputErrorMessage);

      inputErrorMessage.innerText = '';
      inputErrorMessage.setAttribute('aria-hidden', 'true');
      inputErrorMessage.removeAttribute('role');
      inputErrorMessage.removeAttribute('aria-live');
    }

    return this;
  }

  /**
   * Forces the display of a previously uploaded document programatically.
   *
   * @param   {Object}  file  Object containing parameters needed to mock a file: {
   *                            @name:     {String}   file name including extension,
   *                            @size:     {Number}   file size in bytes,
   *                            @type:     {String}   file type,
   *                            @id:       {String}   file ID,
   *                            @dataURL:  {String}   data encoded URI of the image thumbnail,
   *                            @accepted: {Boolean}  defaults to true
   *                          }
   *                          Example: {
   *                            name: 'filename.png',
   *                            size: 192435,
   *                            type: 'image/png',
   *                            id: '0f488973-63e2-4a1d-a509-d1b492f10344',
   *                            dataURL: "data:image/png;base64,...",
   *                            accepted: true
   *                          }
   *
   * @return  {Object}        Instance of UploadDocuments
   */
  addFile(file) {
    this.dropzone.files.push(file);

    this.dropzone.emit('addedfile', file);
    this.dropzone.emit('thumbnail', file, file.dataURL);
    this.dropzone.emit('success', file, file.id);
    this.dropzone.emit('complete', file);

    return this;
  }

  // This doesn't seem necessary once hooks are added correctly
  // /**
  //  * Removing a file from Dropzone
  //  *
  //  * @param   {Object}  file  Dropzone file object
  //  *
  //  * @return  {Object}        Instance of UploadDocuments
  //  */
  // removeFile(file) {
  //   this.dropzone.removeFile(file); // Dropzone method? needs testing

  //   // A separate tracking array of user files?
  //   // if (id) {
  //   //   let toDeleteIdx = window['userFileIds' + [[${inputName}]]].indexOf(id);

  //   //   if (toDeleteIdx !== -1) {
  //   //     window['userFileIds' + [[${inputName}]]].splice(toDeleteIdx, 1)
  //   //   }
  //   // }

  //   // Updates an input with a JSON object of file IDs...
  //   // updateFileInputValue();

  //   // Needs to be created...
  //   // showNumberOfAddedFiles();

  //   // if (window['myDropZone' + [[${inputName}]]].files.length <= window['myDropZone' + [[${inputName}]]].options.maxFiles) {
  //   //   toggleMaxFileMessage('off');
  //   // }

  //   this.maxFiles();

  //   return this;
  // }
}

/** @type  {String}  The main selector for Upload Document components **/
UploadDocuments.selector = '[data-js="upload-documents"]';

/** @type  {Object}  A dictionary of selectors used by the utility class **/
UploadDocuments.selectors = {
  'dragRegion': '[data-dropzone="drag-and-drop-region"]',
  'inputErrorMessage': '[data-dropzone="input-error-message"]',
  'fallback': '[data-dropzone="fallback"]',
  'uploadsHeader': '[data-dropzone="uploads-header"]',
  'uploadsNumber': '[data-dropzone="uploads-number"]',
  'previewsContainer': '[data-dropzone="previews-container"]',
  'previewTemplate': '[data-dropzone="preview-template"]',
  'thumbnail': '[data-dropzone="thumbnail"]',
  'hiddenInputContainer': '[data-dropzone="hidden-input-container"]',
  'dict': '[data-dropzone="dict"]',
  'fileRemove': '[data-dropzone="file-remove"]',
  'fileRemoveLabel': '[data-dropzone="file-remove-label"]'
};

/** @type  {Object}  A dictionary of classes used by the utility class **/
UploadDocuments.classes = {
  'dragOver': 'usa-file-input--drag'
};

/** @type  {Object}  Default options to pass to the Dropzone library **/
UploadDocuments.dropzoneOptions = {
  'clickable': UploadDocuments.selectors.dragRegion,
  'thumbnailMethod': 'crop',
  'thumbnailWidth': 8, // to be multiplied by 8
  'thumbnailHeight': 8, // to be multiplied by 8
  'maxFiles': 20,
  'maxFilesize': 20
};

/** @type  {Array}  A list of attributes to swap from the fallback file input to the hidden Dropzone input **/
UploadDocuments.fallbackAttrs = ['class', 'id', 'name', 'aria-labelledby', 'aria-describedby', 'multiple', 'accept'];

/** @type  {Array}  A list of attributes remove from the hidden Dropzone input **/
UploadDocuments.removeAttrs = ['tabindex', 'style'];

export default UploadDocuments;
