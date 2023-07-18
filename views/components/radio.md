---
tags: component
title: Radio
layout: default
intro:
url_uswds: https://designsystem.digital.gov/components/radio-buttons
url_uswds_guidance: https://designsystem.digital.gov/components/radio-buttons#guidance
url_uswds_usage: '#using-the-radio-buttons-component-2'
nice_uswds: Radio button
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group
nice_honeycrisp: Form group molecule
modifier_honeycrisp: ['.cfa-legend', '.cfa-hint', '.cfa-checkbox', '.cfa-radio']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6129%253A562%26mode%3Ddesign%26t%3DEPbRtLr1I6JH7aqP-1
tokens: true
styles: true
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- DETAILS -->

{% capture details_custom %}
The {{ title }} includes the <a href="https://designsystem.digital.gov/components/checkbox/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Checkbox component</a>, <a href="https://designsystem.digital.gov/components/radio-buttons/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Radio Button component</a>, and other components that do not have dedicated documentation in the USWDS (label, hint). The visual appearance is modified using <b>design tokens</b> from the Honeycrisp <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements" target="_blank" rel="noopener nofollow" class="usa-link--external">Form elements atom</a> and <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a>. Further customization is applied using the <b>CSS modifiers</b> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %} to add <b>styles</b> defined in custom stylesheets.{% endcapture %}

{% render 'details.md',
  name: title,
  url_honeycrisp: url_honeycrisp,
  nice_honeycrisp: nice_honeycrisp,
  tokens: tokens,
  styles: styles,
  modifier_honeycrisp: modifier_honeycrisp,
  details_custom: details_custom,
  dictionary: dictionary,
  config: config %}

  <!-- EXAMPLES -->

## Examples {#examples}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-fieldset",
  "legend": {
    "text": "What type of school are you enrolled in?",
    "modifier": "cfa-legend",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Please choose one of the following."
  },
  "options": [
    {
      "modifier": "cfa-radio",
      "id": "radio-{% createId %}",
      "name": "radio['{{ id }}']",
      "type": "radio",
      "value": "virtual-school",
      "label": "Virtual school",
      "input": {
        "modifier": "usa-radio__input--tile"
      }
    },
    {
      "modifier": "cfa-radio",
      "id": "radio-{% createId %}",
      "name": "radio['{{ id }}']",
      "type": "radio",
      "value": "homeschool",
      "label": "Homeschool",
      "input": {
        "modifier": "usa-radio__input--tile"
      }
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'fieldset', nice: title, body: body, context: context, caption: 'Fieldset with radio options.' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-fieldset",
  "legend": {
    "text": "Please confirm your address.",
    "modifier": "cfa-legend",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "We updated the address you entered. If correct, please use the suggested address."
  },
  "options": [
    {
      "modifier": "cfa-radio",
      "id": "radio-{% createId %}",
      "name": "radio['{{ id }}']",
      "type": "radio",
      "value": "suggested-address",
      "label": "Suggested address",
      "description": "4918 Webster St., Apt 2 <br> Oakland, CA <br> 94609",
      "checked": "true",
      "input": {
        "modifier": "usa-radio__input--tile"
      }
    },
    {
      "modifier": "cfa-radio",
      "id": "radio-{% createId %}",
      "name": "radio['{{ id }}']",
      "type": "radio",
      "value": "address-you-entered",
      "label": "Address you entered",
      "description": "4918 Webster Street <br> Apt 2 <br> Oakland, CA <br> 94609",
      "input": {
        "modifier": "usa-radio__input--tile"
      }
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'fieldset', nice: title, body: body, context: context, caption: 'Fieldset with radio options.' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Fieldsets**. Form questions with radio components always use the <a href="{{ config.baseUrl }}components/fieldset">fieldset component</a> to group available options and a nested `legend` element as the question label.

{% capture ref_additional %}
1. <a href="https://design-system.service.gov.uk/components/radios" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Radios</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/form/radio-button" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Radio Button</cite> | VA.gov Design System</a>
{% endcapture %}

{% render 'references.md', ref_main: url_uswds_guidance, ref_additional: ref_additional %}

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

{% capture usage %}{{ url_uswds }}{{ url_uswds_usage }}{% endcapture %}
{% render 'source.md', name: 'radio', nice: title, usage: usage, theme: '$theme-input-select-size: 3', config: config %}
