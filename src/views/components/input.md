---
tags: component
title: Input
layout: default
story: An input is where I provide a short answer to a question in an online form.
url_uswds: https://designsystem.digital.gov/components/text-input
url_uswds_guidance: https://designsystem.digital.gov/components/text-input#guidance
url_uswds_usage: https://designsystem.digital.gov/components/text-input#using-the-text-input-component-2
nice_uswds: Text input component
# url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements
# nice_honeycrisp: Form element atom
modifier_honeycrisp: ['.cfa-input', '.cfa-input-group']
design_honeycrisp: https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=5002-535&mode=design
# tokens: true
styles: true
thumbnail: assets/site/thumbnail-input.png
thumbnail_description: An illustration of the input component.
---

<!-- INTRO -->

The {{ title }} component is the most common form component for receiving user information on an online form. There are several types of inputs (text being one of them) that suggest the type of information they can receive. Input types are enhanced with icon prefixes, postfixes, or masks to help users enter the correct information. They are always paired with a label inside a <a href="{{ config.baseUrl }}components/form-group">Form group component</a>.

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

{% capture context %}{
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, context: context, caption: 'Text input', dictionary: dictionary %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "email"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, context: context, caption: 'Email input', dictionary: dictionary %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input text-end",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "prefixText": "$",
    "placeholder": "0.00",
    "inputmode": "decimal",
    "js": "mask-dollars"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, context: context, caption: 'Input group with prefix and mask (U.S. Dollars)', dictionary: dictionary %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input text-end",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "postfixText": "%",
    "inputmode": "decimal"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, context: context, caption: 'Input group with postfix', dictionary: dictionary %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "tel",
    "pattern": "([0-9]{3}) [0-9]{3}-[0-9]{4}",
    "prefixText": "+1",
    "inputmode": "tel",
    "js": "mask-tel"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, context: context, caption: 'Input group with prefix and mask (U.S. Phone)', dictionary: dictionary %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "pattern": "[0-9]{3}-[0-9]{2}-[0-9]{4}",
    "inputmode": "numeric",
    "js": "mask-ssn"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, context: context, caption: 'Input with mask (Social Security Number)', dictionary: dictionary %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Inputs vs. Textareas**. When longer form content needs to be entered the <a href="{{ config.baseUrl }}components/textarea">textarea component</a> is used.

**Form groups**. Form questions with input components always use the <a href="{{ config.baseUrl }}components/form-group">form group component</a> to wrap the input with a visible `label` element.

{% capture ref_additional %}
1. <a href="https://design-system.service.gov.uk/components/text-input" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Text input</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/form/text-input" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Text input</cite> | VA.gov Design System</a>
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
  $cfa-color-base-lightest: 'gray-warm-4', // Affects the background color of the input
  $cfa-color-base-lighter: 'gray-warm-10', // Affects the color of the input inset border
  $cfa-color-base-ink: 'gray-warm-90'      // Affects the text and border color of the input
);
// Package-level settings
@use 'cfa-core' with (
  $cfa-form-elements-border-width: 2px,
  $cfa-form-elements-padding-y: 2,
  $cfa-form-elements-padding-x: 2.5,
  $cfa-input-height: 8
);
{% endcapture %}

{% capture javascript %}
is used to provide a formatting (mask) utility for U.S. Dollars, U.S. Phone, and Social Security Number input types.
{% endcapture %}

{% render 'source.md', name: 'input', nice: title, theme: theme, usage: url_uswds_usage, javascript: javascript, config: config, pckg: package %}
