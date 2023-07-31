---
tags: component
title: Memorable date
layout: default
intro: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds: https://designsystem.digital.gov/components/text-input
url_uswds_guidance: https://designsystem.digital.gov/components/text-input#guidance
url_uswds_usage: https://designsystem.digital.gov/components/text-input#using-the-text-input-component-2
nice_uswds: Memorable date component
# url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements
# nice_honeycrisp: Form element atom
modifier_honeycrisp: ['.cfa-memorable-date', '.cfa-legend', '.cfa-label', '.cfa-hint', '.cfa-select', '.cfa-input']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6133%253A851%26mode%3Ddesign%26t%3DGH49ArJ6HONOroNF-1
# tokens: true
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
  tokens: tokens,
  styles: styles,
  modifier_honeycrisp: modifier_honeycrisp,
  dictionary: dictionary,
  config: config %}

<!-- EXAMPLES -->

## Examples {#examples}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-memorable-date",
  "fieldset": {
    "hint": {
      "text": "For example January / 1 / 2000",
      "id": "hint-{{ id }}"
    },
    "legend": {
      "text": "What is your date of birth?",
      "modifier": "cfa-legend",
      "modifierHint": "cfa-hint"
    }
  },
  "month": {
    "type": "select",
    "modifier": "usa-form-group--month usa-form-group--select",
    "id": "month-{{ id }}",
    "label": {
      "text": "Month",
      "for": "month-{{ id }}",
      "modifier": "cfa-label text-normal",
      "modifierHint": "cfa-hint"
    },
    "selectEl": {
      "modifier": "cfa-select",
      "id": "month-{{ id }}",
      "name": "month['{{ id }}']",
      "required": "true",
      "ariaDescribedby": "hint-{{ id }}",
      "default": {
        "label": "Click to select month",
        "selected": "true"
      },
      "options": [
        {
          "label": "---",
          "disabled": "true"
        },
        {
          "value": "1",
          "label": "01 - January"
        },
        {
          "value": "2",
          "label": "02 - February"
        },
        {
          "value": "3",
          "label": "03 - March"
        },
        {
          "value": "4",
          "label": "04 - April"
        },
        {
          "value": "5",
          "label": "05 - May"
        },
        {
          "value": "6",
          "label": "06 - June"
        },
        {
          "value": "7",
          "label": "07 - July"
        },
        {
          "value": "8",
          "label": "08 - August"
        },
        {
          "value": "9",
          "label": "09 - September"
        },
        {
          "value": "10",
          "label": "10 - October"
        },
        {
          "value": "11",
          "label": "11 - November"
        },
        {
          "value": "12",
          "label": "12 - December"
        }
      ]
    }
  },
  "day": {
    "modifier": "usa-form-group--day",
    "id": "form-group-{{ id }}",
    "label": {
      "text": "Day",
      "for": "day-{{ id }}",
      "modifier": "cfa-label text-normal",
      "modifierHint": "cfa-hint"
    },
    "input": {
      "modifier": "cfa-input",
      "id": "day-{{ id }}",
      "name": "day['{{ id }}']",
      "type": "text",
      "inputmode": "numeric",
      "maxlength": "2",
      "pattern": "[0-9]*",
      "required": "true",
      "ariaDescribedby": "hint-{{ id }}"
    }
  },
  "year": {
    "modifier": "usa-form-group--year",
    "id": "form-group-{{ id }}",
    "label": {
      "text": "Year",
      "for": "year-{{ id }}",
      "modifier": "cfa-label text-normal",
      "modifierHint": "cfa-hint"
    },
    "input": {
      "modifier": "cfa-input",
      "id": "year-{{ id }}",
      "name": "year['{{ id }}']",
      "type": "text",
      "inputmode": "numeric",
      "minlength": "4",
      "maxlength": "4",
      "pattern": "[0-9]*",
      "required": "true",
      "ariaDescribedby": "hint-{{ id }}"
    }
  }
}{% endcapture %}

<!-- <input
  class="usa-input"
  aria-describedby="mdHint"
  id="date_of_birth_day"
  name="date_of_birth_day"
  maxlength="2"
  pattern="[0-9]*"
  inputmode="numeric"
  value=""
/> -->

{% render 'figure.md', name: 'memorable-date', nice: title, body: body, context: context, caption: 'Memorable date' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Age**. If you are looking to evaluate age consider asking for their age using a <a href="{{ config.baseUrl }}components/form-group">Form group with text input component</a> instead of date of birth using the memorable date component.

**Month**. A text input component as opposed to a select component for the month is supported.

**Fieldsets vs. form groups**. Form questions with multiple inputs including checkbox, radio, and memorable date components always use the fieldset component to group available options and a nested `legend` element. Other form element components with singular text inputs, text areas, and selects, will use the <a href="{{ config.baseUrl }}components/form-group">form group component</a>.

**Fieldset**. Refer to <a href="{{ config.baseUrl }}components/fieldset">fieldset documentation</a>.

**Form group**. Refer to <a href="{{ config.baseUrl }}components/form-group">form group documentation</a>.

**Select**. Refer to <a href="{{ config.baseUrl }}components/select">select documentation</a>.

**Text input**. Refer to <a href="{{ config.baseUrl }}components/text-input">text input documentation</a>.

{% capture ref_additional %}
1. <a href="https://designsystem.digital.gov/patterns/create-a-user-profile/date-of-birth" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Date of birth</cite> | U.S. Web Design System (USWDS)</a>
1. <a href="https://design-system.service.gov.uk/components/date-input/" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Date input</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/form/memorable-date" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Memorable date</cite> | VA.gov Design System</a>
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

{% capture stylesheets %}
  {% capture packages %}@codeforamerica/uswds/packages{% endcapture %}
  {% capture stylesheet_legend %}{% getFile 'legend' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_label %}{% getFile 'label' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_hint %}{% getFile 'hint' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_select %}{% getFile 'select' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_input %}{% getFile 'input' 'stylesheet' %}{% endcapture %}

  <li>Legend: <code>..{{ stylesheet_legend | replace: packages, '' }}</code></li>
  <li>Label: <code>..{{ stylesheet_label | replace: packages, '' }}</code></li>
  <li>Hint: <code>..{{ stylesheet_hint | replace: packages, '' }}</code></li>
  <li>Select: <code>..{{ stylesheet_select | replace: packages, '' }}</code></li>
  <li>Text Input: <code>..{{ stylesheet_input | replace: packages, '' }}</code></li>
{% endcapture %}

{% capture stylesheets_import %}
@forward '{{ stylesheet_legend }}'
@forward '{{ stylesheet_label }}'
@forward '{{ stylesheet_hint }}'
@forward '{{ stylesheet_select }}'
@forward '{{ stylesheet_input }}'
{% endcapture %}

{% render 'source.md',
  name: 'memorable-date',
  nice: title,
  usage: url_uswds_usage,
  stylesheets: stylesheets,
  stylesheets_import: stylesheets_import,
  config: config,
  pckg: package %}
