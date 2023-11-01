---
tags: component
title: Upload documents
layout: default
story: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp:
nice_honeycrisp:
modifier_honeycrisp: false
design_honeycrisp: false
tokens: false
styles: false
intro: intro
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. {.usa-prose}

<!-- DETAILS -->

{% render 'details.md',
  name: title,
  url_uswds: url_uswds,
  url_uswds_usage: url_uswds_usage,
  nice_uswds: nice_uswds,
  url_honeycrisp: url_honeycrisp,
  nice_honeycrisp: nice_honeycrisp,
  tokens: tokens,
  styles: styles,
  modifier_honeycrisp: modifier_honeycrisp,
  dictionary: dictionary,
  config: config %}

<!-- EXAMPLES -->

## Examples {#examples}

{% capture id %}{% createId %}{% endcapture %}
{% capture id_document_type %}{% createId %}{% endcapture %}
{% capture id_file_upload %}{% createId %}{% endcapture %}
{% capture id_preview %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "",
  "id": "dropzone-{{ id }}",
  "documentType": {
    "modifier": "cfa-form-group",
    "id": "form-group-{{ id_document_type }}",
    "label": {
      "text": "What type of document is this?",
      "for": "select-{{ id_document_type }}",
      "modifier": "cfa-label",
      "modifierHint": "cfa-hint"
    },
    "selectEl": {
      "modifier": "cfa-select",
      "id": "select-{{ id_document_type }}",
      "name": "select['{{ id_document_type }}']",
      "ariaDescribedby": "hint-{{ id_document_type }}",
      "required": "true",
      "default": {
        "label": "Click to select a type",
        "selected": "true"
      },
      "options": [
        {
          "label": "---",
          "disabled": "true"
        },
        {
          "value": "wages",
          "label": "wages, salaries, tips"
        }
      ]
    }
  },
  "fileInput": {
    "modifier": "cfa-form-group cfa-file-input",
    "id": "form-group-{{ id }}",
    "label": {
      "text": "Add your files or photos",
      "for": "input-{{ id }}",
      "modifier": "cfa-label",
      "modifierHint": "cfa-hint"
    },
    "hint": {
      "text": "<span class=\"usa-file-input__choose\">Select or drop files here</span>. Accepted file types include .jpeg, .jpg, .png, .pdf, .bmp, .gif, .doc, .docx, .odt, .ods, or .odp files. Each file is limited to <b>20 MB</b>, and a maximum of <b>20 files</b> are allowed.",
      "modifier": "cfa-hint",
      "id": "hint-{{ id }}"
    },
    "input": {
      "modifier": "usa-file-input cfa-input cfa-file-input__input",
      "id": "input-{{ id }}",
      "name": "input['{{ id }}']",
      "ariaDescribedby": "hint-{{ id }}",
      "type": "file",
      "accept": ".jpeg, .jpg, .png, .pdf, .bmp, .gif, .doc, .docx, .odt, .ods, .odp",
      "multiple": "multiple",
      "required": "true"
    },
    "button": {
      "icon": "{{ config.baseUrl }}assets/img/sprite.svg#add"
    }
  },
  "previewTemplate": {
    "header": {
      "id": "aria-db-{{ id_preview }}"
    },
    "error": {
      "icon": "{{ config.baseUrl }}assets/img/sprite.svg#warning"
    },
    "thumbnail": {
      "default": "{{ config.baseUrl }}assets/img/sprite.svg#file_present"
    }
  },
  "dict": [
    {
      "key": "fileTooBig",
      "string": "Sorry, we can't accept files larger than 20 MB. Please, remove this file, make it smaller, then, try again."
    },
    {
      "key": "maxFiles",
      "string": "You have uploaded the maximum number of 20 files. You will have the opportunity to add more later."
    },
    {
      "key": "maxFilesExceeded",
      "string": "Sorry, we can't accept this file. You have uploaded the maximum number of 20 files. You will have the opportunity to add more later."
    },
    {
      "key": "invalidFileType",
      "string": "Sorry, we can't accept this type of file. Please, remove this file, then, try another file that ends in .jpeg, .jpg, .png, .pdf, .bmp, .gif, .doc, .docx, .odt, .ods, or .odp."
    },
    {
      "key": "responseError",
      "string": "Sorry, there was an error on our end. Please, remove this file and try again. If the error continues please try again later."
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'upload-documents', nice: title, body: body, context: context, caption: title %}

<!-- GUIDANCE -->

<!-- ## Guidance {#guidance}

<!-- render 'references.md', ref_main: url_uswds_guidance, config: config -->

<!-- ACCESSIBILITY -->

{% render 'accessibility.md'
  nice: title,
  url_uswds: url_uswds,
  theme_passes: false,
  audit_passes: false,
  keyboard_passes: false,
  keyboard_test: 'No keyboard test has been created.',
  resize_passes: false,
  screen_reader_passes: false,
  screen_reader_tests: 'No screen reader test has been created.',
  guidance_passes: false,
  additional: false,
  config: config %}

<!-- DESIGN -->

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% capture packages %}@codeforamerica/uswds/packages{% endcapture %}
{% capture package %}{% getFile 'upload-documents' %}{% endcapture %}
{% capture javascript_question %}{% getFile 'upload-documents' 'javascript' %}{% endcapture %}

{% capture javascript %}enables the drag-and-drop interaction, uploaded file preview and management, and validation messaging. The module extends the open source library <a href="https://github.com/dropzone/dropzone" target="_blank" rel="noopener nofollow" class="usa-link--external">Dropzone</a> to provide interaction and customization options. The module can be found at <code>.{{ javascript_question | replace: package, '' }}</code>.{% endcapture %}

{% render 'source.md', name: 'upload-documents', nice: title, javascript: javascript, config: config, pckg: package %}
