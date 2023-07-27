---
tags: component
title: Toolbar
layout: default
intro:
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-toolbar
nice_honeycrisp: Toolbar molecule
modifier_honeycrisp: false
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6133%253A922%26mode%3Ddesign%26t%3DYs0br9Tuopl6VRla-1
tokens: false
styles: false
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- DETAILS -->

{% capture details_custom %}
The {{ title }} is a custom component created using <a href="https://designsystem.digital.gov/utilities" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS CSS Utilities</a>.{% endcapture %}

{% render 'details.md',
  name: title,
  url_honeycrisp: url_honeycrisp,
  nice_honeycrisp: nice_honeycrisp,
  details_custom: details_custom,
  tokens: tokens,
  styles: styles,
  dictionary: dictionary,
  config: config %}

<!-- EXAMPLES -->

## Examples {#examples}

{% capture context %}{
  "container": {
    "modifier": "tablet:padding-y-2"
  },
  "home": {
    "href": "{{ config.baseUrl }}"
  },
  "logo": {
    "alt": {
      "modifier": "usa-sr-only",
      "text": "Code for America"
    },
    "default": {
      "href": "#logo-cfa-stacked",
      "style": "width: 101px; height: 82px"
    },
    "tablet": {
      "href": "#logo-cfa-long",
      "style": "width: 161px; height: 49px"
    }
  },
  "chat": "{{ config.baseUrl }}uswds/img/sprite.svg#chat",
  "languageSelector": "{{ config.baseUrl }}uswds/img/sprite.svg#translate",
  "alert": {
    "modifier": "cfa-alert cfa-site-alert usa-alert--info margin-0 border-top-0 border-x-0",
    "role": "status",
    "text": "This site is for demonstration purposes only."
  }
}{% endcapture %}

{% render 'figure.md', name: 'toolbar', nice: title, body: body, context: context, caption: 'Toolbar' %}

<!-- GUIDANCE -->

<!-- ## Guidance {#guidance} -->

{% capture ref_additional %}
1. <a href="#" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Title</cite> | domain.com</a>
{% endcapture %}

<!-- render 'references.md', ref_main: url_uswds_guidance, ref_additional: ref_additional, config: config -->

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

{% render 'source.md', name: 'toolbar', nice: title, usage: usage, sass: false, config: config, pckg: package %}
