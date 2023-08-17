import { Dropzone } from 'dropzone';

Dropzone.autoDiscover = false;

/**
 * Compatible with @dropzone v5.9.3
 */
class UploadDocuments {
  constructor(s = {}) {
    this.dropzoneOptions = s.dropzoneOptions ?
      Object.assign(UploadDocuments.dropzoneOptions, s.dropzoneOptions) : UploadDocuments.dropzoneOptions;

    /**
     * Initialize Dropzone regions
     */

    this.dropzones = document.querySelectorAll(UploadDocuments.selector);

    for (let i = 0; i < this.dropzones.length; i++) {
      this.initDropzone(this.dropzones[i], this.dropzoneOptions)
        .on('addedfile', file => {
          this.addedFile(file);
        });
    }

    /**
     * Add drag event listeners to drag and drop regions for toggling classes and aria messaging
     */

    this.dragRegions = document.querySelectorAll(UploadDocuments.selectors.dragRegion);

    for (let i = 0; i < this.dragRegions.length; i++) {
      this.addDragEvents(this.dragRegions[i]);
    }

    /**
     * [description]
     */

    // if (process.env.NODE_ENV === 'development') {
    document.querySelector('body')
      .addEventListener('click', event => {
        if (event.target.matches('[data-dropzone="toggle-preview-state"]')) {
          console.dir('click');
          console.dir(event.target.closest('[data-dropzone="preview-template"]'));

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
   * @param   {[type]}  region   [region description]
   * @param   {[type]}  options  [options description]
   *
   * @return  {[type]}           [return description]
   */
  initDropzone(region, options) {
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
      let key = `dict${dict[i].dataset['dropzoneDict']}`;
      let value = dict[i].innerText;

      if (value != '') {
        options[key] = value;
      }
    }

    return new Dropzone(region, options);
  }

  /**
   * [addDragEvents description]
   *
   * @param   {[type]}  region  [region description]
   *
   * @return  {[type]}          [return description]
   */
  addDragEvents(region) {
    region.addEventListener('dragover', event => {
      event.target.classList.add(UploadDocuments.classes.dragOver);
    });

    region.addEventListener('dragleave', event => {
      event.target.classList.remove(UploadDocuments.classes.dragOver);
    });

    region.addEventListener('drop', event => {
      event.target.classList.remove(UploadDocuments.classes.dragOver);
    });

    return this;
  }

  /**
   * [addedFile description]
   *
   * @param   {[type]}  file  [file description]
   *
   * @return  {[type]}        [return description]
   */
  addedFile(file) {
    console.dir(file);

    this.formatFilename(file);

    return this;
  }

  /**
   * Format the filename label so that the name overflow
   *
   * @param   {[type]}  file  [file description]
   *
   * @return  {[type]}        [return description]
   */
  formatFilename(file) {
    let nameElement = file.previewElement.querySelector('[data-dz-name]');
    let label = nameElement.innerText;

    /**
     * Get filename extension
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

  // toggleMaxFilesMessage(state) {
  //   if (state === 'on') {
  //     $(document.getElementById("max-files")).addClass("display-flex").removeClass("display-none");
  //   } else {
  //     $(document.getElementById("max-files")).addClass("display-none").removeClass("display-flex");
  //   }

  //   return this;
  // }
}

UploadDocuments.selector = '[data-js="dropzone"]';

UploadDocuments.selectors = {
  'dragRegion': '[data-dropzone="drag-and-drop-region"]',
  'input': '[data-dropzone="input"]',
  'previewsContainer': '[data-dropzone="previews-container"]',
  'previewTemplate': '[data-dropzone="preview-template"]',
  'hiddenInputContainer': '[data-dropzone="hidden-input-container"]',
  'dict': '[data-dropzone="dict"]'
};

UploadDocuments.classes = {
  'dragOver': 'usa-file-input--drag'
};

UploadDocuments.dropzoneOptions = {
  'url': 'https://app-46361.on-aptible.com/file-upload',
  'clickable': UploadDocuments.selectors.dragRegion,
  'thumbnailMethod': 'crop',
  'thumbnailWidth': 8, // to be multiplied by 8
  'thumbnailHeight': 8, // to be multiplied by 8
  'maxFiles': 20,
  'maxFilesize': 20
};

export default UploadDocuments;

