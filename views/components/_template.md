---
tags:
title: Template
layout: default
intro:
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds: Template component
url_honeycrisp: 'http://honeycrisp.herokuapp.com/cfa/styleguide#'
nice_honeycrisp: Template atom
modifier_honeycrisp: false
design_honeycrisp:
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
  tokens: tokens,
  styles: styles,
  modifier_honeycrisp: modifier_honeycrisp,
  dictionary: dictionary,
  config: config %}

<!-- EXAMPLES -->

## Examples {#examples}

{% capture body %}

Default Body

{% endcapture %}

{% capture context %}{
  "modifier": "cfa-"
}{% endcapture %}

<!-- render 'figure.md', name: '{{ name }}', nice: title, body: body, context: context, caption: '{{ caption }}' -->

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

{% capture usage %}{{ url_uswds }}{{ url_uswds_usage }}{% endcapture %}
<!-- render 'source.md', name: '{{ name }}', nice: title, theme: '$theme-{{ setting }}: {{ value }}', usage: usage, config: config -->
