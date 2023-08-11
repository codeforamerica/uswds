---
tags: component
title: Upload documents
layout: default
intro: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

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

{% capture id_document_type %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "",
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
  }
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

{% render 'source.md', name: 'household-details', nice: title, usage: usage, sass: false, config: config, pckg: package %}
