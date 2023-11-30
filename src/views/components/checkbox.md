---
tags: component
title: Checkbox
layout: default
story: Checkboxes let me choose one or more options from a list.
url_uswds: https://designsystem.digital.gov/components/checkbox
url_uswds_guidance: https://designsystem.digital.gov/components/checkbox#guidance
url_uswds_usage: https://designsystem.digital.gov/components/checkbox#using-the-checkbox-component-2
nice_uswds: Checkbox component
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements
nice_honeycrisp: Form element atom
modifier_honeycrisp: .cfa-checkbox
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6129%253A562%26mode%3Ddesign%26t%3DEPbRtLr1I6JH7aqP-1
tokens: true
styles: true
thumbnail: assets/img/thumbnail-checkbox.png
thumbnail_description: An illustration of the Checkbox component.
---

<!-- INTRO -->

The {{ title }} component allows users to choose one or more options from a list on the page in a fieldset. They enable users full control to select and deselect an individual option if they change their mind.

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
      "modifier": "cfa-checkbox",
      "id": "checkbox-{% createId %}",
      "name": "checkbox['{{ id }}']",
      "type": "checkbox",
      "value": "option-a",
      "label": "Option A",
      "input": {
        "modifier": "usa-checkbox__input--tile"
      }
    },
    {
      "modifier": "cfa-checkbox",
      "id": "checkbox-{% createId %}",
      "name": "checkbox['{{ id }}']",
      "type": "checkbox",
      "value": "option-b",
      "label": "Option B",
      "input": {
        "modifier": "usa-checkbox__input--tile"
      }
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'input-select', nice: title, body: body, context: context, caption: 'Checkboxes' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "options": [
    {
      "modifier": "cfa-checkbox",
      "id": "checkbox-{% createId %}",
      "name": "checkbox['{{ id }}']",
      "type": "checkbox",
      "value": "option-a",
      "label": "Option A",
      "description": "Option description",
      "input": {
        "modifier": "usa-checkbox__input--tile"
      }
    },
    {
      "modifier": "cfa-checkbox",
      "id": "checkbox-{% createId %}",
      "name": "checkbox['{{ id }}']",
      "type": "checkbox",
      "value": "option-b",
      "label": "Option B",
      "description": "Option description",
      "input": {
        "modifier": "usa-checkbox__input--tile"
      }
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'input-select', nice: title, body: body, context: context, caption: 'Checkboxes with descriptions' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Fieldsets**. Form questions with checkbox components always use the <a href="{{ config.baseUrl }}components/fieldset">fieldset component</a> to group available options with a visible `legend` element.

{% capture ref_additional %}
1. <a href="https://design-system.service.gov.uk/components/checkboxes" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Checkboxes</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/form/checkbox" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Checkbox</cite> | VA.gov Design System</a>
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

{% capture theme %}
// Theme-level settings
@use 'cfa-uswds-theme' with (
  // Global theme settings that affect the component, changing these will affect other components
  $cfa-color-base-lightest: 'gray-warm-4', // Affects checkbox and radio hover state
  $cfa-input-select-size: 3,               // Affects checkbox and radio
  $cfa-input-tile-border-radius: 0,        // Affects checkbox and radio
  $cfa-input-tile-border-width: 2px,       // Affects checkbox and radio
  // Component specific settings
  $cfa-checkbox-border-radius: 0
);
// Package-level settings
@use 'cfa-core' with (
  $cfa-input-select-margin: 1.5,  // Affects checkbox and radio
  $cfa-input-select-width: 2,     // Affects checkbox and radio
  $cfa-input-select-height: 2,    // Affects checkbox and radio
  $cfa-input-select-padding-x: 3, // Affects checkbox and radio
  $cfa-input-select-padding-y: 2, // Affects checkbox and radio
  $cfa-input-select-gap: 2        // Affects checkbox and radio
);
{% endcapture %}

{% render 'source.md', name: 'input-select', nice: title, usage: url_uswds_usage, theme: theme, config: config, pckg: package %}
