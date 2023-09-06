---
tags: component
title: Footer
layout: default
story: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds: https://designsystem.digital.gov/components/footer
url_uswds_guidance: https://designsystem.digital.gov/components/footer/#guidance
url_uswds_usage: https://designsystem.digital.gov/components/footer/#using-the-footer-component-2
nice_uswds: Footer, slim variant
url_honeycrisp:
nice_honeycrisp: Footer organism
modifier_honeycrisp: false
design_honeycrisp: https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=5002-532&mode=design
tokens: false
styles: false
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. {.usa-prose}

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

{% capture context %}{
  "modifier": "",
  "returnToTop": "#",
  "navigation": {
    "ariaLabel": "Footer navigation",
    "items": [
      {
        "label": "Site map",
        "href": "#"
      },
      {
        "label": "Privacy policy",
        "href": "https://en.wikipedia.org/wiki/Privacy_policy",
        "target": "_blank",
        "rel": "noopener nofollow",
        "modifier": "usa-link--external"
      },
      {
        "label": "Terms of service",
        "href": "https://en.wikipedia.org/wiki/Terms_of_service",
        "target": "_blank",
        "rel": "noopener nofollow",
        "modifier": "usa-link--external"
      }
    ]
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
  }
}{% endcapture %}

{% render 'figure.md', name: 'footer', nice: title, body: body, context: context, caption: nice_uswds %}

<!-- GUIDANCE -->

## Guidance {#guidance}

{% render 'references.md', ref_main: url_uswds_guidance, config: config %}

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

{% capture theme %}
// Theme-level settings
@use 'cfa-uswds-theme' with (
  // Global theme settings that affect the component, changing these will affect other components
  $cfa-color-base-lightest: 'gray-warm-4', // Affects footer primary section background
  $cfa-color-base-lighter: 'gray-warm-10'  // Affects footer secondary section background
);
{% endcapture %}

{% render 'source.md', name: 'footer', nice: title, usage: url_uswds_usage, theme: theme, config: config, pckg: package %}
