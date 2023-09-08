---
tags: component
title: Details
layout: default
story: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp: 'https://honeycrisp.herokuapp.com/cfa/styleguide#molecules-accordion'
nice_honeycrisp: Reveal molecule
modifier_honeycrisp: .cfa-details
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D5004%253A537%26mode%3Ddesign%26t%3Db7vIYK7WH81HUo0S-1
tokens: true
styles: true
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. {.usa-prose}

<!-- DETAILS -->

{% render 'details.md',
  name: title,
  url_honeycrisp: url_honeycrisp,
  nice_honeycrisp: nice_honeycrisp,
  tokens: tokens,
  styles: styles,
  dictionary: dictionary,
  modifier_honeycrisp: modifier_honeycrisp,
  config: config %}

## Examples {#examples}

{% capture context %}{
  "summary": "What’s an example of a self-certification letter?",
  "icon": "{{ config.baseUrl }}uswds/img/sprite.svg#chevron_right",
  "body": "<p>If you don’t have any of these documents, you can write, sign, date, and submit this letter:</p><p><i>I, [your full name], work as a [your job]. I made $[monthly income] last month. Please use this letter as self-certification of my income.</i></p><p><i>[Your signature]</i></p><p><i>[Today’s date]</i></p>"
}{% endcapture %}

{% render 'figure.md', name: 'details', nice: title, body: body, context: context, caption: 'Details' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

{% capture ref_additional %}
1. <a href="#" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Title</cite> | domain.com</a>
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

<!-- render 'source.md', name: 'name', nice: title, theme: '$theme-setting: value', usage: usage, config: config, pckg: package -->
