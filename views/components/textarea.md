---
tags: component
title: Textarea
layout: default
intro:
url_uswds: https://designsystem.digital.gov/components/text-input
url_uswds_guidance: https://designsystem.digital.gov/components/text-input/#guidance
url_uswds_usage: https://designsystem.digital.gov/components/text-input/#using-the-text-input-component-2
nice_uswds: Text input component
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements
nice_honeycrisp: Form element atom
modifier_honeycrisp: ['.cfa-textarea']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6129%253A550%26mode%3Ddesign%26t%3DeSs9ZaxsX9qacQvQ-1
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
  "textarea": {
    "modifier": "cfa-textarea",
    "id": "textarea-{{ id }}"
  }
}{% endcapture %}

{% render 'figure.md', name: 'textarea', nice: title, body: body, context: context, caption: 'Textarea' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Form groups**. Form questions with textarea components always use the <a href="{{ config.baseUrl }}components/form-group">form group component</a> to wrap the textarea with a visible `label` element.

{% capture ref_additional %}
1. <a href="https://design.va.gov/components/form/textarea" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Textarea</cite> | VA.gov Design System</a>
1. <a href="https://design-system.service.gov.uk/components/textarea" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Textarea</cite> | GOV.UK Design System</a>
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

{% render 'source.md', name: 'textarea', nice: title, usage: url_uswds_usage, config: config %}
