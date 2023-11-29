---
tags: component
title: Footer
layout: default
story: A footer appears at the bottom of a web page and helps me find information like a site map or legal information.
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

The Footer component is the last landmark of a web page and appears globally on all site pages. It often contains secondary or tertiary navigations, simply labeled “footer navigation,” with links to other pages or legal disclaimers users need access to. It also contains the site’s <a href="{{ config.baseUrl }}components/identifier">Identifier component</a>.

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
  },
  "identifier": {
    "modifier": "cfa-font-smooth",
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
      "description": "Looking for government information and services?",
      "link": {
        "label": "Visit domain.gov",
        "href": "https://get.gov",
        "target": "_blank",
        "rel": "noopener nofollow",
        "modifier": "usa-link--external"
      }
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
