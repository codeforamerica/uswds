---
tags: component
title: Follow-up question
layout: default
story: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-follow_up_question
nice_honeycrisp: Follow-up question molecule
modifier_honeycrisp: .cfa-follow-up-question .cfa-follow-up-question__region
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6133%253A872%26mode%3Ddesign%26t%3DQEm097LeMZdJHFUX-1
tokens: true
styles: true
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. {.usa-prose}

<!-- DETAILS -->

{% capture details_custom %}
The {{ title }} is a custom component. It includes the <a href="{{ config.baseUrl }}components/form-group/">form group component</a>, <a href="{{ config.baseUrl }}/components/fieldset">fieldset component</a>, and any other components necessary to create a form. The visual appearance uses <b>design tokens</b> from the Honeycrisp <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a>. Further customization is applied using the <b>CSS modifiers</b> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %} to add <b>styles</b> defined in a custom stylesheet.{% endcapture %}

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

{% capture id_income_less %}{% createId %}{% endcapture %}
{% capture id_region %}{% createId %}{% endcapture %}
{% capture id_income %}{% createId %}{% endcapture %}

{% capture context %}{
  "fieldset": {
    "modifier": "cfa-fieldset",
    "legend": {
      "text": "Do you think you will make less from this job this year?",
      "modifier": "cfa-legend",
      "modifierHint": "cfa-hint"
    },
    "options": [
      {
        "modifier": "cfa-radio",
        "id": "radio-{% createId %}",
        "name": "radio['{{ id_income_less }}']",
        "type": "radio",
        "value": "yes",
        "label": "Yes",
        "js": "follow-up-question",
        "input": {
          "modifier": "usa-radio__input--tile"
        }
      },
      {
        "modifier": "cfa-radio",
        "id": "radio-{% createId %}",
        "name": "radio['{{ id_income_less }}']",
        "type": "radio",
        "value": "no",
        "label": "No",
        "js": "follow-up-question",
        "dataAriaControls": "aria-c-{{ id_region }}",
        "input": {
          "modifier": "usa-radio__input--tile"
        }
      }
    ]
  },
  "region": {
    "id": "aria-c-{{ id_region }}",
    "formGroups": [
      {
        "modifier": "cfa-form-group",
        "id": "form-group-{{ id_income }}",
        "label": {
          "text": "What do you think you'll make this year?",
          "for": "input-{{ id_income }}",
          "modifier": "cfa-label",
          "modifierHint": "cfa-hint"
        },
        "hint": {
          "text": "We know this can be hard to answer. You can estimate or guess what you’ll make before taxes and deductions. We’ll use this to calculate and report your monthly pay.",
          "modifier": "cfa-hint",
          "id": "hint-{{ id_income }}"
        },
        "inputGroup": {
          "modifier": "usa-input-group cfa-input-group"
        },
        "input": {
          "modifier": "cfa-input text-end",
          "id": "input-{{ id_income }}",
          "name": "input['{{ id_income }}']",
          "ariaDescribedby": "hint-{{ id_income }}",
          "type": "text",
          "prefixText": "$",
          "placeholder": "0.00",
          "inputmode": "decimal",
          "js": "mask-dollars"
        }
      }
    ]
  }
}{% endcapture %}

{% render 'figure.md', name: 'follow-up-question', nice: title, context: context, caption: 'Follow up question' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Usage**. The {{ title }} component should be used sparingly to avoid the risk of users accidentally missing questions contained in the follow-up region. Alternatively, use a <a href="{{ config.baseUrl }}components/form-card">form card with a single question, yes, and no links</a> instead.

**ARIA attributes**. The `aria-expanded` attribute is not included in this component because it is currently an invalid attribute for radio elements.

{% capture ref_additional %}
1. <a href="https://accessibility.blog.gov.uk/2021/09/21/an-update-on-the-accessibility-of-conditionally-revealed-questions/" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>An update on the accessibility of conditionally revealed questions</cite> | GOV.UK Design System</a>
1. <a href="https://design-system.service.gov.uk/components/radios/" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Radios</cite> | GOV.UK Design System</a>
{% endcapture %}

{% render 'references.md', ref_additional: ref_additional, config: config %}

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

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% capture packages %}@codeforamerica/uswds/packages{% endcapture %}
{% capture package %}{% getFile 'follow-up-question' %}{% endcapture %}
{% capture javascript_question %}{% getFile 'follow-up-question' 'javascript' %}{% endcapture %}

{% capture javascript %}enables the expansion and collapse of the follow-up region. It also toggles the following attributes on child elements inside the follow-up region; tabindex on potentially focusable children and disabled attribute on form element children. The module can be found at <code>.{{ javascript_question | replace: package, '' }}</code>.{% endcapture %}

{% render 'source.md', name: 'follow-up-question', nice: title, javascript: javascript, config: config, pckg: package %}
