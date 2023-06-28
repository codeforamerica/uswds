---
tags: component
title: Radio
layout: default
intro: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds: https://designsystem.digital.gov/components/radio-buttons
url_uswds_guidance: https://designsystem.digital.gov/components/radio-buttons#guidance
url_uswds_usage: https://designsystem.digital.gov/components/radio-buttons#using-the-radio-buttons-component-2
nice_uswds: Radio button
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements
nice_honeycrisp: Form element atom
modifier_honeycrisp: ['.cfa-legend', '.cfa-hint', '.cfa-checkbox', '.cfa-radio']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6129%253A562%26mode%3Ddesign%26t%3DEPbRtLr1I6JH7aqP-1
tokens: true
styles: true
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
  modifier_honeycrisp: modifier_honeycrisp,
  tokens: tokens,
  styles: styles,
  dictionary: dictionary,
  config: config %}

  <!-- EXAMPLES -->

## Examples {#examples}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "options": [
    {
      "modifier": "cfa-radio",
      "id": "radio-{% createId %}",
      "name": "radio['{{ id }}']",
      "type": "radio",
      "value": "option-a",
      "label": "Option A",
      "input": {
        "modifier": "usa-radio__input--tile"
      }
    },
    {
      "modifier": "cfa-radio",
      "id": "radio-{% createId %}",
      "name": "radio['{{ id }}']",
      "type": "radio",
      "value": "option-b",
      "label": "Option B",
      "input": {
        "modifier": "usa-radio__input--tile"
      }
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'input-select', nice: title, body: body, context: context, caption: 'Radios' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "options": [
    {
      "modifier": "cfa-radio",
      "id": "radio-{% createId %}",
      "name": "radio['{{ id }}']",
      "type": "radio",
      "value": "option-a",
      "label": "Option A",
      "description": "Option description",
      "input": {
        "modifier": "usa-radio__input--tile"
      }
    },
    {
      "modifier": "cfa-radio",
      "id": "radio-{% createId %}",
      "name": "radio['{{ id }}']",
      "type": "radio",
      "value": "option-b",
      "label": "Option B",
      "description": "Option description",
      "input": {
        "modifier": "usa-radio__input--tile"
      }
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'input-select', nice: title, body: body, context: context, caption: 'Radios with descriptions' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Fieldsets**. Form questions with radio components always use the <a href="{{ config.baseUrl }}components/fieldset">fieldset component</a> to group available options with a visible `legend` element.

{% capture ref_additional %}
1. <a href="https://design-system.service.gov.uk/components/radios" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Radios</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/form/radio-button" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Radio Button</cite> | VA.gov Design System</a>
{% endcapture %}

{% render 'references.md', ref_main: url_uswds_guidance, ref_additional: ref_additional, config: config %}

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

{% render 'source.md', name: 'input-select', nice: title, usage: url_uswds_usage, theme: '$theme-input-select-size: 3', config: config, pckg: package %}
