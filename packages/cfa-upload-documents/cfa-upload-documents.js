import { Dropzone } from 'dropzone';

Dropzone.autoDiscover = false;

/**
 * A utility class for the Dropzone library
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

    this.dropzoneOptions = s.dropzoneOptions ?
      Object.assign(UploadDocuments.dropzoneOptions, s.dropzoneOptions) : UploadDocuments.dropzoneOptions;

    this.mockFiles = s.mockFiles ? s.mockFiles : [];

    /**
     * Configure and initialize Dropzone and chain custom utility initialization
     */

    this.dropzone = this.configDropzone(this.element, this.dropzoneOptions);

    this.init(this.dropzone);

    /**
     * Event handlers for development
     */

    // if (process.env.NODE_ENV === 'development') {
    document.querySelector('body')
      .addEventListener('click', event => {
        if (event.target.matches('[data-dropzone="toggle-preview-state"]')) {
          event.target.closest('[data-dropzone="preview-template"]')
            .className = event.target.dataset.dropzonePreviewState;
        }
    });
    // }

    return this;
  }

  /**
   * Set Dropzone options, relevant to the template, and initialize Dropzone.
   * @source https://github.com/dropzone/dropzone/blob/main/src/options.js
   *
   * @param   {Element}  region   A Dropzone element to extract configuration from and pass to the Dropzone class
   * @param   {Object}   options  Options to pass to configure and pass to the Dropzone class
   *
   * @return  {Object}            Instance of UploadDocuments
   */
  configDropzone(region, options) {
    let input = region.querySelector(UploadDocuments.selectors.input);
    let previewsContainer = region.querySelector(UploadDocuments.selectors.previewsContainer);
    let previewTemplate = region.querySelector(UploadDocuments.selectors.previewTemplate);
    let hiddenInputContainer = region.querySelector(UploadDocuments.selectors.hiddenInputContainer);
    let dict = region.querySelectorAll(UploadDocuments.selectors.dict);

    options.previewsContainer = (previewsContainer) ? previewsContainer : null;
    options.previewTemplate = (previewTemplate) ? previewTemplate.outerHTML : null;

    options.acceptedFiles = (input) ? input.getAttribute('accept') : null;

    options.thumbnailWidth = options.thumbnailWidth * 8;
    options.thumbnailHeight = options.thumbnailHeight * 8;

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

    return new Dropzone(region, options);
  }

  /**
   * An init function for Dropzone. This is not the same as Dropzone's provided
   * init event handler. However, this handler does trigger after Dropzone is
   * initialized.
   *
   * @param   {Object}  dz  Instance of Dropzone
   *
   * @return  {Object}      Instance of UploadDocuments
   */
  init(dz) {
    console.dir(dz);

    this.maxFiles(dz)
      .swapFallback(dz);

    dz.on('addedfile', file => {
      this.addedfile(dz, file);
    });

    dz.on('removedfile', file => {
      this.maxFiles(dz);
    });

    console.dir(this);

    /**
     * Add previously uploaded documents
     */
    if (this.mockfiles.length) {
      for (let i = 0; i < this.mockfiles.length; i++) {
        this.addMockFile(this.mockfiles[i]);
      }
    }

    return this;
  }

  /**
   * Swaps attributes on the fallback file input with attributes on the hidden
   * Dropzone file input. This makes the presentation of the Dropzone element
   * compatible with the default USWDS File Input component.
   *
   * @param   {Object}  dz  Initialized Dropzone instance
   *
   * @return  {Object}      Instance of UploadDocuments
   */
  swapFallback(dz) {
    let fallback = dz.element.querySelector(UploadDocuments.selectors.fallback);

    for (let i = 0; i < UploadDocuments.fallbackAttrs.length; i++) {
      let attr = UploadDocuments.fallbackAttrs[i];
      let value = fallback.getAttribute(attr);

      if (value) dz.hiddenFileInput.setAttribute(attr, value);
    }

    fallback.remove();

    for (let i = 0; i < UploadDocuments.removeAttrs.length; i++) {
      let attr = UploadDocuments.removeAttrs[i];

      dz.hiddenFileInput.removeAttribute(attr);
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

    let header = event.srcElement.closest(UploadDocuments.selector)
      .querySelector(UploadDocuments.selectors.uploadsHeader);

    if (header) {
      header.setAttribute('tabindex', '-1');
      header.focus();
    }

    return this;
  }

  /**
   * Event handler for added files
   *
   * @param   {Object}  dz    Instance of Dropzone
   * @param   {Object}  file  Most recently added Dropzone file object
   *
   * @return  {Object}        Instance of UploadDocuments
   */
  addedfile(dz, file) {
    this.formatFilename(file)
      .maxFiles(dz);

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
   * Assert if max files have been reached and toggle messaging and other relevant events
   *
   * @param   {Object}  dz  Instance of Dropzone
   *
   * @return  {Object}      Instance of UploadDocuments
   */
  maxFiles(dz) {
    let inputErrorMessage = document.querySelector(UploadDocuments.selectors.inputErrorMessage);

    if (inputErrorMessage.getAttribute('aria-hidden') === 'true' && dz.files.length >= dz.options.maxFiles) {
      let inputErrorMessage = document.querySelector(UploadDocuments.selectors.inputErrorMessage);

      inputErrorMessage.innerText = dz.options.dictMaxFilesExceeded;
      inputErrorMessage.removeAttribute('aria-hidden');
      inputErrorMessage.setAttribute('role', 'alert');
      inputErrorMessage.setAttribute('aria-live', 'polite');
    }

    if (dz.files.length <= dz.options.maxFiles) {
      let inputErrorMessage = document.querySelector(UploadDocuments.selectors.inputErrorMessage);

      inputErrorMessage.innerText = '';
      inputErrorMessage.setAttribute('aria-hidden', 'true');
      inputErrorMessage.removeAttribute('role');
      inputErrorMessage.removeAttribute('aria-live');
    }

    return this;
  }

  /**
   * [addMockFile description]
   *
   * @param   {Object}  dz    Instance of Dropzone
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
  addMockFile(dz, file) {
    dz.files.push(file);

    dz.emit('addedfile', file);
    dz.emit('thumbnail', file, file.dataURL);
    dz.emit('success', file, file.id);
    dz.emit('complete', file);

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
  'uploadsHeader': '[data-dropzone="uploads-header"]',
  'previewsContainer': '[data-dropzone="previews-container"]',
  'previewTemplate': '[data-dropzone="preview-template"]',
  'hiddenInputContainer': '[data-dropzone="hidden-input-container"]',
  'dict': '[data-dropzone="dict"]'
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
