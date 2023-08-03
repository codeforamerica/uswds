---
tags: component
title: Identifier
layout: default
intro: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds: https://designsystem.digital.gov/components/identifier
url_uswds_guidance: https://designsystem.digital.gov/components/identifier/#guidance
url_uswds_usage: https://designsystem.digital.gov/components/identifier/#using-the-footer-component-2
nice_uswds: Identifier
url_honeycrisp:
nice_honeycrisp:
modifier_honeycrisp: false
design_honeycrisp: false
tokens: false
styles: false
---

<!-- INTRO -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- DETAILS -->

{% render 'details.md',
  name: title,
  url_honeycrisp: url_honeycrisp,
  nice_honeycrisp: nice_honeycrisp,
  tokens: tokens,
  styles: styles,
  dictionary: dictionary,
  config: config %}

<!-- EXAMPLES -->

## Examples {#examples}

{% capture context %}{
  "modifier": "cfa-font-smooth",
  "identifier": {
    "identity": {
      "ariaLabel": "Agency identifier",
      "domain": "domain.gov",
      "disclaimer": "This service was built by Code for America in partnership with Domain.gov on behalf of the people of the United States of America."
    },
    "requiredLinks": {
      "ariaLabel": "Important links",
      "items": [
        {
          "label": "About Code for America",
          "href": "https://codeforamerica.org",
          "target": "_blank",
          "rel": "noopener nofollow",
          "modifier": "usa-link--external"
        },
        {
          "label": "Diversity, Equity, & Inclusion",
          "href": "https://codeforamerica.org/about-us/diversity-equity-inclusion",
          "target": "_blank",
          "rel": "noopener nofollow",
          "modifier": "usa-link--external"
        }
      ]
    },
    "governmentSection": {
      "ariaLabel": "Domain.gov government information and services",
      "descriptions": "Looking for government information and services?",
      "link": {
        "label": "Visit domain.gov",
        "href": "#",
        "target": "_blank",
        "rel": "noopener nofollow",
        "modifier": "usa-link--external"
      }
    }
  }
}{% endcapture %}

{% render 'figure.md', name: 'identifier', nice: title, body: body, context: context, caption: 'Identifier' %}

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

{% render 'source.md', name: 'footer', nice: title, usage: usage, sass: false, config: config, pckg: package %}
