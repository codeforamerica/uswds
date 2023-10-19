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
    this.element = element;

    this.selectors = s.selectors ? s.selectors : UploadDocuments.selectors;

    this.dropzoneOptions = s.dropzoneOptions ?
      Object.assign(UploadDocuments.dropzoneOptions, s.dropzoneOptions) : UploadDocuments.dropzoneOptions;

    this.mockFiles = s.mockFiles ? s.mockFiles : [];

    this.maxFilesReached = s.maxFilesReached ? s.maxFilesReached : UploadDocuments.maxFilesReached;

    this.maxFilesReset = s.maxFilesReset ? s.maxFilesReset : UploadDocuments.maxFilesReset;

    this.elFocusable = s.elFocusable ? s.elFocusable : UploadDocuments.elFocusable;

    this.index = s.index ? s.index : UploadDocuments.index;

    this.addedFile = s.addedFile ? s.addedFile : this.addedFile;

    this.removedFile = s.removedFile ? s.removedFile : this.removedFile;

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
        if (event.target.matches(this.selectors.previewStateToggle)) {
          event.target.closest(this.selectors.previewTemplate)
            .className = event.target.dataset.dropzonePreviewState;
        }
      });
    }

    if (process.env.NODE_ENV != 'production') {
      console.dir(this);
    }

    return this;
  }

  /**
   * Set Dropzone options, relevant to the template, and initialize Dropzone.
   * @source https://github.com/dropzone/dropzone/blob/main/src/options.js
   *
   * @param   {Object}  options  Options to pass to configure and pass to the Dropzone class
   *
   * @return  {Object}           Instance of UploadDocuments
   */
  configDropzone(options) {
    let fallback = this.element.querySelector(this.selectors.fallback);
    let previewContainer = this.element.querySelector(this.selectors.previewContainer);
    let previewTemplate = this.element.querySelector(this.selectors.previewTemplate);
    let thumbnail = previewTemplate.querySelector(this.selectors.thumbnail);
    let hiddenInputContainer = this.element.querySelector(this.selectors.hiddenInputContainer);
    let dict = this.element.querySelectorAll(this.selectors.dict);

    thumbnail.classList.add(`width-${options.thumbnailWidth}`);
    thumbnail.classList.add(`height-${options.thumbnailHeight}`);

    options.thumbnailWidth = options.thumbnailWidth * 8;
    options.thumbnailHeight = options.thumbnailHeight * 8;

    options.previewsContainer = (previewContainer) ? previewContainer : null;

    options.acceptedFiles = (fallback) ? fallback.getAttribute('accept') : null;

    options.hiddenInputContainer = (hiddenInputContainer) ? hiddenInputContainer : region;

    /**
     * Remove testing elements if building for production
     */

    if (process.env.NODE_ENV === 'production') {
      let remove = previewTemplate.querySelectorAll(this.selectors.remove);

      for (let i = 0; i < remove.length; i++) {
        remove[i].remove();
      }
    }

    options.previewTemplate = (previewTemplate) ? previewTemplate.outerHTML : null;

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
   * @return  {Object}  Instance of UploadDocuments
   */
  init() {
    if (process.env.NODE_ENV === 'production') {
      this.hidePreviewTemplate();
    }

    this.preview()
      .maxFiles()
      .swapFallback()
      .addedFile()
      .removedFile();

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
   * @return  {Object}  Instance of UploadDocuments
   */
  swapFallback() {
    let fallback = this.dropzone.element.querySelector(this.selectors.fallback);

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
   * Add the Dropzone event listener for 'addedfile'. This method property could
   * be overridden to customize the chain of events contained within.
   *
   * @return  {Object}  Instance of UploadDocuments
   */
  addedFile() {
    this.dropzone.on('addedfile', file => {
      this.formatFilename(file)
        .maxFiles()
        .preview()
        .previewNumber()
        .previewHeader();
    });

    return this;
  }

  /**
   * Add the Dropzone event listener for 'removedfile'. This method property could
   * be overridden to customize the chain of events contained within.
   *
   * @return  {Object}  Instance of UploadDocuments
   */
  removedFile() {
    this.dropzone.on('removedfile', file => {
      this.maxFiles()
        .preview()
        .previewNumber();
    });
  }

  /**
   * Event handler for the dragover event on the Dropzone region
   *
   * @param   {Object}  event  Dragover event
   *
   * @return  {Object}         Instance of UploadDocuments
   */
  dragover(event) {
    if (event.srcElement.matches(this.selectors.dragRegion)) {
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
    if (event.srcElement.matches(this.selectors.dragRegion)) {
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
   * Show or hide the preview based on the number of added files
   *
   * @return  {Object}  Instance of UploadDocuments
   */
  preview() {
    let preview = this.element.querySelector(this.selectors.preview);

    if (this.dropzone.files.length > 0) {
      preview.removeAttribute('aria-hidden');
      preview.removeAttribute('hidden');
    } else {
      preview.setAttribute('aria-hidden', 'true');
      preview.setAttribute('hidden', '');
    }

    return this;
  }

  /**
   * Update the uploaded number inner text to reflect the number of added files
   *
   * @return  {Object}  Instance of UploadDocuments
   */
  previewNumber() {
    let number = this.element.querySelector(this.selectors.previewNumber);

    if (number) {
      number.innerText = this.dropzone.files.length;
    }

    return this;
  }

  /**
   * Shift focus to the uploads header with additional information
   *
   * @return  {Object}  Instance of UploadDocuments
   */
  previewHeader() {
    let header = this.element.querySelector(this.selectors.previewHeader);

    if (header) {
      header.setAttribute('tabindex', '-1');
      header.focus();
    }

    return this;
  }

  /**
   * Hide the preview template
   *
   * @param   {Object}  remove  If set to true the element will be removed from the DOM
   *
   * @return  {Object}          Instance of UploadDocuments
   */
  hidePreviewTemplate(remove = false) {
    if (remove) {
      previewTemplate.remove();
    } else {
      let previewTemplate = this.element.querySelector(this.selectors.previewTemplate);

      previewTemplate.setAttribute('aria-hidden', 'true');
      previewTemplate.setAttribute('hidden', '');

      this.index(previewTemplate.querySelectorAll(this.elFocusable.join(', ')), false);
    }

    return this;
  }

  /**
   * Assert if max files have been reached and toggle messaging and other relevant events
   *
   * @return  {Object}  Instance of UploadDocuments
   */
  maxFiles() {
    let inputErrorMessage = this.element.querySelector(this.selectors.inputErrorMessage);

    if (inputErrorMessage.getAttribute('aria-hidden') === 'true' &&
      this.dropzone.files.length >= this.dropzone.options.maxFiles) {
      let inputErrorMessage = this.element.querySelector(this.selectors.inputErrorMessage);

      inputErrorMessage.innerText = this.dropzone.options.dictMaxFilesExceeded;
      inputErrorMessage.removeAttribute('aria-hidden');
      inputErrorMessage.setAttribute('role', 'alert');
      inputErrorMessage.setAttribute('aria-live', 'polite');

      this.maxFilesReached(this);
    }

    if (this.dropzone.files.length <= this.dropzone.options.maxFiles) {
      let inputErrorMessage = this.element.querySelector(this.selectors.inputErrorMessage);

      inputErrorMessage.innerText = '';
      inputErrorMessage.setAttribute('aria-hidden', 'true');
      inputErrorMessage.removeAttribute('role');
      inputErrorMessage.removeAttribute('aria-live');

      this.maxFilesReset(this);
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
}

/** @type  {String}  The main selector for Upload Document components **/
UploadDocuments.selector = '[data-js="upload-documents"]';

/** @type  {Object}  A dictionary of selectors used by the utility class **/
UploadDocuments.selectors = {
  'dragRegion': '[data-dropzone="drag-and-drop-region"]',
  'inputErrorMessage': '[data-dropzone="input-error-message"]',
  'fallback': '[data-dropzone="fallback"]',
  'previewHeader': '[data-dropzone="preview-header"]',
  'previewNumber': '[data-dropzone="preview-number"]',
  'preview': '[data-dropzone="preview"]',
  'previewContainer': '[data-dropzone="preview-container"]',
  'previewTemplate': '[data-dropzone="preview-template"]',
  'previewStateToggle': '[data-dropzone="toggle-preview-state"]',
  'thumbnail': '[data-dropzone="thumbnail"]',
  'hiddenInputContainer': '[data-dropzone="hidden-input-container"]',
  'dict': '[data-dropzone="dict"]',
  'fileRemove': '[data-dropzone="file-remove"]',
  'fileRemoveLabel': '[data-dropzone="file-remove-label"]',
  'remove': '[data-dropzone="remove"]'
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

/** @type  {Function}  A callback function for reaching max files within this utility **/
UploadDocuments.maxFilesReached = () => {
  if (process.env.NODE_ENV != 'production') {
    console.dir('Max files limit reached!');
  }
};

/** @type  {Function}  A callback function for when the max files warning is reset within this utility **/
UploadDocuments.maxFilesReset = () => {
  if (process.env.NODE_ENV != 'production') {
    console.dir('Max files threshold not reached!');
  }
};

/** @type  {Array}  A list of potentially focusable element selectors */
UploadDocuments.elFocusable = [
  'a', 'button', 'input', 'select', 'textarea', 'object', 'embed', 'form',
  'fieldset', 'legend', 'label', 'area', 'audio', 'video', 'iframe', 'svg',
  'details', 'table', '[tabindex]', '[contenteditable]', '[usemap]'
];

/**
 * Method for adding or removing potentially focusable elements from the
 * dom tabbing order within the target region.
 *
 * @param   {NodeList}  elements  Elements to index
 * @param   {Boolean}   index     Wether to index elements or not
 *
 * @return  {Object}              The indexed elements
 */
UploadDocuments.index = (elements, index = false) => {
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
  };

  return elements;
}

export default UploadDocuments;
