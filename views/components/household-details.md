---
tags: component
title: Household details
layout: default
intro: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
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
  "header": {
    "heading": {
      "text": "Review household",
      "id": "aria-db-{% createId %}"
    }
  },
  "household": [
    {
      "icon": "{{ config.baseUrl }}uswds/img/sprite.svg#person",
      "label": "You, Firstname Middlename Lastname",
      "utility": {
        "edit": {
          "label": "edit person",
          "href": "#"
        },
        "delete": {
          "label": "delete <span class=\"usa-sr-only\">person</span>",
          "href": "#"
        }
      }
    },
   {
      "icon": "{{ config.baseUrl }}uswds/img/sprite.svg#person",
      "label": "Secondname Middlename Lastname",
      "utility": {
        "edit": {
          "label": "edit person",
          "href": "#"
        },
        "delete": {
          "label": "delete <span class=\"usa-sr-only\">person</span>",
          "href": "#"
        }
      }
    }
  ],
  "add": [
    {
      "prefix": "{{ config.baseUrl }}uswds/img/sprite.svg#add",
      "label": "Add a person",
      "modifier": "cfa-button usa-button--outline",
      "href": "#"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'household-details', nice: title, body: body, context: context, caption: title %}

{% capture context %}{
  "modifier": "cfa-font-smooth",
  "header": {
    "heading": {
      "text": "Your annual household income",
      "id": "aria-db-{% createId %}"
    }
  },
  "household": [
    {
      "icon": "{{ config.baseUrl }}uswds/img/sprite.svg#person",
      "label": "You, Firstname Middlename Lastname",
      "details": [
        {
          "modifier": "text-end",
          "content": "$29,500.00",
          "utility": {
            "edit": {
              "label": "edit income",
              "href": "#"
            },
            "delete": {
              "label": "delete <span class=\"usa-sr-only\">income</span>",
              "href": "#"
            }
          }
        }
      ]
    },
   {
      "icon": "{{ config.baseUrl }}uswds/img/sprite.svg#person",
      "label": "Secondname Middlename Lastname",
      "details": [
        {
          "modifier": "text-end",
          "content": "$28,300.00",
          "utility": {
            "edit": {
              "label": "edit income",
              "href": "#"
            },
            "delete": {
              "label": "delete <span class=\"usa-sr-only\">income</span>",
              "href": "#"
            }
          }
        }
      ]
    }
  ],
  "summary": [
    {
      "label": {
        "modifier": "text-end",
        "text": "Total"
      },
      "value": {
        "modifier": "text-end",
        "text": "$57,800.00"
      }
    }
  ],
  "add": [
    {
      "prefix": "{{ config.baseUrl }}uswds/img/sprite.svg#add",
      "label": "Add an income",
      "modifier": "cfa-button usa-button--outline",
      "href": "#"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'household-details', nice: title, body: body, context: context, caption: title %}

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
