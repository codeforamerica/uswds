---
tags: component
title: Toolbar
layout: default
story: A toolbar has all of the important links and features I need from a website. It might also have a time-sensitive alert.
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#molecules-toolbar
nice_honeycrisp: Toolbar molecule
modifier_honeycrisp: false
design_honeycrisp: https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=5002-531&mode=design
tokens: false
styles: false
thumbnail: assets/site/thumbnail-toolbar.png
thumbnail_description: An illustration of the toolbar component.
---

<!-- INTRO -->

The {{ title }} component is used as the header landmark for a page and appears globally on all site pages. It contains the primary navigation and buttons for the main features of the site that may include the homepage link, chat, language selector, or authentication links. It may also contain a site alert to provide the user with important or time sensitive information.

<!-- DETAILS -->

{% capture details_custom %}
<p>The {{ title }} is a custom component created using <a href="https://designsystem.digital.gov/utilities" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS CSS Utilities</a>.</p>
{% endcapture %}

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
  "alert": {
    "modifier": "cfa-alert cfa-site-alert usa-alert--info margin-0 border-top-0 border-x-0",
    "role": "status",
    "text": "This site is for demonstration purposes only."
  },
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
  "chat": "{{ config.baseUrl }}assets/img/sprite.svg#chat",
  "languageSelector": "{{ config.baseUrl }}assets/img/sprite.svg#translate"
}{% endcapture %}

{% render 'figure.md', name: 'toolbar', nice: title, context: context, caption: 'Toolbar', dictionary: dictionary %}

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

{% render 'source.md', name: 'toolbar', nice: title, config: config, pckg: package %}
