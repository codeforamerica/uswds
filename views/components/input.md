---
tags: component
title: Text input
layout: default
intro:
url_uswds: https://designsystem.digital.gov/components/text-input
url_uswds_guidance: https://designsystem.digital.gov/components/text-input#guidance
url_uswds_usage: https://designsystem.digital.gov/components/text-input#using-the-text-input-component-2
nice_uswds: Text input component
# url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements
# nice_honeycrisp: Form element atom
modifier_honeycrisp: ['.cfa-input', '.cfa-input-group']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6133%253A851%26mode%3Ddesign%26t%3D3z8wksZDJXdQbrxT-1
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
    "type": "text",
    "required": "true"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, body: body, context: context, caption: 'Text input' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "required": "true"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, body: body, context: context, caption: 'Required text input' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "input": {
    "modifier": "cfa-input",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "email"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, body: body, context: context, caption: 'Email input' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input text-right",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "prefixText": "$",
    "placeholder": "0.00",
    "inputmode": "decimal",
    "js": "mask-dollars"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, body: body, context: context, caption: 'Input group with prefix and mask (U.S. Dollars)' %}

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "inputGroup": {
    "modifier": "usa-input-group cfa-input-group"
  },
  "input": {
    "modifier": "cfa-input text-right",
    "id": "input-{{ id }}",
    "name": "input['{{ id }}']",
    "type": "text",
    "postfixText": "%",
    "inputmode": "decimal"
  }
}{% endcapture %}

{% render 'figure.md', name: 'input', nice: title, body: body, context: context, caption: 'Input group with postfix' %}

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

{% render 'figure.md', name: 'input', nice: title, body: body, context: context, caption: 'Input group with prefix and mask (U.S. Phone)' %}

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

{% render 'figure.md', name: 'input', nice: title, body: body, context: context, caption: 'Input with mask (SSN)' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Form groups**. Form questions with input components always use the <a href="{{ config.baseUrl }}components/form-group">form group component</a> to wrap the input with a visible `label` element.

{% capture ref_additional %}
1. <a href="https://design-system.service.gov.uk/components/text-input" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Text input</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/form/text-input" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Text input</cite> | VA.gov Design System</a>
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

{% render 'source.md', name: 'input', nice: title, usage: url_uswds_usage, config: config %}
