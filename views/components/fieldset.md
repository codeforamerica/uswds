---
tags: component
title: Fieldset
layout: default
intro: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group
nice_honeycrisp: Form group molecule
modifier_honeycrisp: ['.cfa-legend', '.cfa-hint', '.cfa-checkbox', '.cfa-radio']
design_honeycrisp:
tokens: true
styles: true
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- DETAILS -->

{% capture details_custom %}
The {{ title }} includes the <a href="{{ config.baseUrl }}components/checkbox/">checkbox component</a>, <a href="{{ config.baseUrl }}/components/radio">radio component</a>, and other components that do not have dedicated documentation in the USWDS (labels and hints). The visual appearance is modified using <b>design tokens</b> from the Honeycrisp <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements" target="_blank" rel="noopener nofollow" class="usa-link--external">Form elements atom</a> and <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a>. Further customization is applied using the <b>CSS modifiers</b> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %} to add <b>styles</b> defined in custom stylesheets.{% endcapture %}

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
    "text": "Do any of the following situations apply to you?",
    "modifier": "cfa-legend",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Please check all that apply.",
    "modifier": "cfa-hint",
    "id": "hint-{{ id }}"
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

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-fieldset",
  "legend": {
    "text": "What type of school are you enrolled in?",
    "modifier": "cfa-legend",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Please choose one of the following.",
    "modifier": "cfa-hint",
    "id": "hint-{{ id }}"
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
    "text": "We updated the address you entered. If correct, please use the suggested address.",
    "modifier": "cfa-hint",
    "id": "hint-{{ id }}"
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

**Fieldsets vs. form groups**. Form questions with multiple form elements, such as multi-part text inputs, checkboxes, or radios may use the fieldset component to group themselves with a single question (or `legend` element). Use the <a href="{{ config.baseUrl }}components/form-group">form group component</a> to associate one form element with one question such as a text input, text area, or select.

**Checkbox options**. Refer to <a href="{{ config.baseUrl }}components/checkbox">checkbox documentation</a>.

**Radio options**. Refer to <a href="{{ config.baseUrl }}components/radio">radio documentation</a>.

<!-- ACCESSIBILITY -->

{% render 'accessibility.md'
  nice: title,
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

<!-- render 'figma.md', url: design_honeycrisp -->

<!-- SOURCE -->

{% capture stylesheets %}
  {% capture packages %}@codeforamerica/uswds/packages{% endcapture %}
  {% capture stylesheet_legend %}{% getFile 'legend' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_hint %}{% getFile 'hint' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_input_select %}{% getFile 'input-select' 'stylesheet' %}{% endcapture %}

  <li>Legend: <code>..{{ stylesheet_legend | replace: packages, '' }}</code></li>
  <li>Hint: <code>..{{ stylesheet_hint | replace: packages, '' }}</code></li>
  <li>Checkbox and Radio: <code>..{{ stylesheet_input_select | replace: packages, '' }}</code></li>
{% endcapture %}

{% capture stylesheets_import %}
@forward '{{ stylesheet_legend }}'
@forward '{{ stylesheet_hint }}'
@forward '{{ stylesheet_input_select }}'
{% endcapture %}

{% render 'source.md', name: 'fieldset', nice: title, stylesheets: stylesheets, stylesheets_import: stylesheets_import, config: config, pckg: package %}
