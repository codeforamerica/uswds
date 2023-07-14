---
tags: component
title: Fieldset
layout: default
intro:
url_uswds:
url_uswds_usage:
nice_uswds:
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group
nice_honeycrisp: Form group molecule
modifier_honeycrisp: ['.cfa-fieldset', '.cfa-legend', '.cfa-hint', '.cfa-checkbox', '.cfa-radio']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D5002%253A530%26mode%3Ddesign%26t%3DhXwkxQAW233Fykey-1
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
  "id": "fieldset-{{ id }}",
  "legend": {
    "text": "Please select an option",
    "for": "input-{{ id }}",
    "modifier": "cfa-legend",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "You may choose more than one."
  }
}{% endcapture %}

{% render 'figure.md', name: 'fieldset', nice: title, body: body, context: context, caption: 'Fieldset with ...' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-fieldset usa-fieldset--error",
  "id": "fieldset-{{ id }}",
  "legend": {
    "text": "Please select an option",
    "for": "input-{{ id }}",
    "modifier": "cfa-legend",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "You may choose more than one."
  },
  "error": {
    "text": "This field is required.",
    "id": "error-message-{{ id }}",
    "role": "alert"
  }
}{% endcapture %}

{% render 'figure.md', name: 'fieldset', nice: title, body: body, context: context, caption: 'Invalid fieldset' %}