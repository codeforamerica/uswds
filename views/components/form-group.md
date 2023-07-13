---
tags: component
title: Form Group
layout: default
intro:
url_uswds:
url_uswds_usage:
nice_uswds:
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group
nice_honeycrisp: Form group molecule
modifier_honeycrisp: ['.cfa-form-group', '.cfa-label', '.cfa-hint', '.cfa-input-group', '.cfa-input', '.cfa-textarea']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D5002%253A530%26mode%3Ddesign%26t%3DhXwkxQAW233Fykey-1
tokens: true
styles: true
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- DETAILS -->

{% capture details_custom %}
The {{ title }} includes the <a href="https://designsystem.digital.gov/components/text-input/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Text Input component</a>, <a href="https://designsystem.digital.gov/components/input-prefix-suffix/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Input Prefix or Suffix (Postfix) component</a>, and other components that do not have dedicated documentation in the USWDS (label, hint, and textarea). The visual appearance is modified using <b>design tokens</b> from the Honeycrisp <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements" target="_blank" rel="noopener nofollow" class="usa-link--external">Form elements atom</a> and <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-form_group" target="_blank" rel="noopener nofollow" class="usa-link--external">{{ nice_honeycrisp }}</a>. Further customization is applied using the <b>CSS modifiers</b> {% for modifier in modifier_honeycrisp %}<code>{{ modifier }}</code>{% if forloop.index != forloop.length %}, {% endif %}{% endfor %} to add <b>styles</b> defined in custom stylesheets.{% endcapture %}

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
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "What is your first name?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Legally as it appears on your I.D."
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input[{{ id }}]",
    "type": "text",
    "required": "true"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with text input' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group usa-form-group--error",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "What is your first name?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Legally as it appears on your I.D."
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input[{{ id }}]",
    "type": "text",
    "required": "true",
    "ariaInvalid": "true",
    "ariaDescribedby": "error-message-{{ id }}"
  },
  "error": {
    "text": "This field is required.",
    "id": "error-message-{{ id }}",
    "role": "alert"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Invalid form group' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "What is your email address?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Legally as it appears on your I.D."
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input[{{ id }}]",
    "type": "text"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with text input' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "Please describe in as much detail as possible.",
    "for": "textarea-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "textarea": {
    "modifier": "cfa-textarea",
    "id": "textarea-{{ id }}"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with textarea' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "Please describe in as much detail as possible.",
    "for": "textarea-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "textarea": {
    "modifier": "cfa-textarea",
    "id": "textarea-{{ id }}",
    "required": "true"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with textarea' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "{% createId %}",
  "label": {
    "text": "How much does your household currently have in savings?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Answer the best you can."
  },
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input text-right",
    "id": "input-{{ id }}",
    "type": "text",
    "prefixText": "$",
    "placeholder": "0.00",
    "inputmode": "decimal",
    "js": "mask-dollars"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with prefix and mask (U.S. Dollars)' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "{% createId %}",
  "label": {
    "text": "What percentage of your monthly income do you spend on monthly expenses?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Answer the best you can."
  },
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input text-right",
    "id": "input-{{ id }}",
    "type": "text",
    "postfixText": "%",
    "inputmode": "decimal"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with postfix' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "{% createId %}",
  "label": {
    "text": "How much does your household currently have in savings?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Answer the best you can."
  },
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "type": "tel",
    "pattern": "([0-9]{3}) [0-9]{3}-[0-9]{4}",
    "prefixText": "+1",
    "inputmode": "tel",
    "js": "mask-tel"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with prefix and input mask (U.S. Phone)' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "{% createId %}",
  "label": {
    "text": "What is your social security number?",
    "for": "input-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "type": "text",
    "pattern": "[0-9]{3}-[0-9]{2}-[0-9]{4}",
    "inputmode": "numeric",
    "js": "mask-ssn"
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with input mask (SSN)' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

{% capture ref_additional %}
1. <a href="#" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Title</cite> | domain.com</a>
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

{% render 'figma.md', url: 'https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System' %}

<!-- SOURCE -->

{% capture stylesheets %}
  {% capture packages %}@codeforamerica/uswds/packages{% endcapture %}
  {% capture stylesheet_hint %}{% getFile 'hint' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_input %}{% getFile 'input' 'stylesheet' %}{% endcapture %}
  {% capture stylesheet_input_group %}{% getFile 'input-group' 'stylesheet' %}{% endcapture %}

  <li>Hint: <code>..{{ stylesheet_hint | replace: packages, '' }}</code></li>
  <li>Text Input: <code>..{{ stylesheet_input | replace: packages, '' }}</code></li>
  <li>Input Prefix or Suffix: <code>..{{ stylesheet_input_group | replace: packages, '' }}</code></li>
{% endcapture %}

{% render 'source.md', name: 'form-group', nice: title, javascript: 'provides custom input masking support utilizing the open source library <a href="https://github.com/nosir/cleave.js" target="_blank" rel="noopener nofollow" class="usa-link--external">Cleave.js</a>.', stylesheets: stylesheets, config: config %}
