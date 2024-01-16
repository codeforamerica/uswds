---
tags: component
title: Identifier
layout: default
story: An identifier is a banner in the footer of a web page that tells me who created it.
url_uswds: https://designsystem.digital.gov/components/identifier
url_uswds_guidance: https://designsystem.digital.gov/components/identifier/#guidance
url_uswds_usage: https://designsystem.digital.gov/components/identifier/#using-the-identifier-component-2
nice_uswds: Identifier, no logos
url_honeycrisp:
nice_honeycrisp:
modifier_honeycrisp: false
design_honeycrisp: https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=5002-532&mode=design
tokens: false
styles: false
thumbnail: assets/site/thumbnail-identifier.png
thumbnail_description: An illustration of the identifier component.
---

<!-- INTRO -->

The {{ title }} component is a USWDS pattern used to communicate the administering agency of a website (or web page) and links required by federal laws and policies. It is a standard and recognizable design element of federal government sites. It can be used to establish trust across government sites if used consistently with the <a href="{{ config.baseUrl }}components/footer">Footer component</a>.

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
}{% endcapture %}

{% render 'figure.md', name: 'identifier', nice: title, context: context, caption: nice_uswds, dictionary: dictionary %}

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

{% render 'source.md', name: 'identifier', nice: title, usage: url_uswds_usage, config: config, pckg: package %}
