---
tags: component
title: Checkbox
layout: default
intro:
url_uswds: https://designsystem.digital.gov/components/checkbox
url_uswds_guidance: https://designsystem.digital.gov/components/checkbox#guidance
url_uswds_usage: '#using-the-checkbox-component-2'
nice_uswds: Checkbox component
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements
nice_honeycrisp: Form element atom
modifier_honeycrisp: .cfa-checkbox
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
  "modifier": "cfa-fieldset",
  "legend": {
    "text": "Do any of the following situations apply to you?",
    "modifier": "cfa-legend",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Please check all that apply."
  },
  "options": [
    {
      "modifier": "cfa-checkbox",
      "id": "checkbox-{% createId %}",
      "name": "checkbox['{{ id }}']",
      "type": "checkbox",
      "value": "in-foster-care",
      "label": "In foster care",
      "input": {
        "modifier": "usa-checkbox__input--tile"
      }
    },
    {
      "modifier": "cfa-checkbox",
      "id": "checkbox-{% createId %}",
      "name": "checkbox['{{ id }}']",
      "type": "checkbox",
      "value": "unhoused-homeless",
      "label": "Unhoused/homeless",
      "input": {
        "modifier": "usa-checkbox__input--tile"
      }
    },
    {
      "modifier": "cfa-checkbox",
      "id": "checkbox-{% createId %}",
      "name": "checkbox['{{ id }}']",
      "type": "checkbox",
      "value": "child-of-migrant-worker",
      "label": "Child of migrant worker",
      "input": {
        "modifier": "usa-checkbox__input--tile"
      }
    },
    {
      "modifier": "cfa-checkbox",
      "id": "checkbox-{% createId %}",
      "name": "checkbox['{{ id }}']",
      "type": "checkbox",
      "value": "runaway-from-home",
      "label": "Runaway from home",
      "input": {
        "modifier": "usa-checkbox__input--tile"
      }
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'fieldset', nice: title, body: body, context: context, caption: 'Fieldset with checkbox options.' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Fieldsets**. Form questions with checkbox components always use the <a href="{{ config.baseUrl }}components/fieldset">fieldset component</a> to group available options and a nested `legend` element as the question label.

{% capture ref_additional %}
1. <a href="https://design-system.service.gov.uk/components/checkboxes" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Checkboxes</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/form/checkbox" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Checkbox</cite> | VA.gov Design System</a>
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
{% render 'source.md', name: 'checkbox', nice: title, usage: usage, theme: '$theme-input-select-size: 3', config: config %}
