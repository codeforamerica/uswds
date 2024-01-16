---
tags: component
title: Household details
layout: default
story: Household details let me verify I’ve provided accurate information about my family or the people I live with.
url_uswds:
url_uswds_guidance:
url_uswds_usage:
nice_uswds:
url_honeycrisp:
nice_honeycrisp:
modifier_honeycrisp: false
design_honeycrisp: https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=16348-2627&mode=design
tokens: false
styles: false
thumbnail: assets/site/thumbnail-household-details.png
thumbnail_description: An illustration of the household details component.
---

<!-- INTRO -->

The {{ title }} component displays a summary of user’s household composition data they have provided in an online form. It allows them to review the information they’ve provided and the opportunity to correct any information they may have entered incorrectly. It can be used to summarize household members and their relationship to the applicant. It can also display special information about each household member such as income, expenses, or benefits they may have.

<!-- DETAILS -->

{% capture details_custom %}
The {{ title }} is a custom component created using <a href="https://designsystem.digital.gov/utilities" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS CSS Utilities</a>.
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
  "header": {
    "heading": {
      "text": "Review your household",
      "id": "aria-db-{% createId %}"
    }
  },
  "list": {
    "modifier": "add-list-reset",
    "item": {
      "modifier": "border-bottom-1px border-base-lighter"
    }
  },
  "household": [
    {
      "icon": "{{ config.baseUrl }}assets/img/sprite.svg#person",
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
      "icon": "{{ config.baseUrl }}assets/img/sprite.svg#person",
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
      "prefix": "{{ config.baseUrl }}assets/img/sprite.svg#add",
      "label": "Add a person",
      "modifier": "cfa-button usa-button--outline",
      "href": "#"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'household-details', nice: title, context: context, caption: title, dictionary: dictionary %}

{% capture context %}{
  "header": {
    "heading": {
      "text": "Your household income",
      "id": "aria-db-{% createId %}"
    }
  },
  "list": {
    "modifier": "add-list-reset",
    "item": {
      "modifier": "border-bottom-1px border-base-lighter"
    }
  },
  "household": [
    {
      "icon": "{{ config.baseUrl }}assets/img/sprite.svg#person",
      "label": "You, Firstname Middlename Lastname",
      "details": [
        {
          "modifier": "text-end",
          "content": "<i>Employer name</i> <br> $29,500.00 <br> (Annual)",
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
      "icon": "{{ config.baseUrl }}assets/img/sprite.svg#person",
      "label": "Secondname Middlename Lastname",
      "details": [
        {
          "modifier": "text-end",
          "content": "<i>Employer name</i> <br> $28,300.00 <br> (Annual)",
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
      "prefix": "{{ config.baseUrl }}assets/img/sprite.svg#add",
      "label": "Add an income",
      "modifier": "cfa-button usa-button--outline",
      "href": "#"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'household-details', nice: title, context: context, caption: 'Household details wi, dictionary: dictionary %}annual income details' %}

<!-- GUIDANCE -->

<!-- ## Guidance {#guidance}

<!-- render 'references.md', ref_main: url_uswds_guidance, config: config -->

<!-- ACCESSIBILITY -->

{% capture additional %}
1. The `role="list"` attribute is added to the unordered list element to preserve the list role when the `add-list-reset` class is used to remove list styling.
{% endcapture %}

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
  additional: additional,
  config: config %}

<!-- DESIGN -->

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% render 'source.md', name: 'household-details', nice: title, config: config, pckg: package %}
