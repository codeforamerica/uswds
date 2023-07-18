---
tags: component
title: Select
layout: default
intro:
url_uswds:
url_uswds_usage:
nice_uswds: Template component
description_uswds: ''
url_honeycrisp: 'http://honeycrisp.herokuapp.com/cfa/styleguide#'
nice_honeycrisp: Template atom
modifier_honeycrisp: false
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

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
  "modifier": "cfa-form-group",
  "id": "form-group-{{ id }}",
  "label": {
    "text": "What type of income have you had most recently?",
    "for": "select-{{ id }}",
    "modifier": "cfa-label",
    "modifierHint": "cfa-hint"
  },
  "hint": {
    "text": "Answer the best you can. You will be able to include additional types of income."
  },
  "selectEl": {
    "modifier": "cfa-select",
    "id": "select-{{ id }}",
    "name": "select['{{ id }}']",
    "required": "true",
    "default": {
      "label": "Click to select an income type",
      "selected": "true"
    },
    "options": [
      {
        "label": "---",
        "disabled": "true"
      },
      {
        "value": "wages",
        "label": "wages, salaries, tips"
      },
      {
        "value": "self-employment",
        "label": "self-employment income"
      },
      {
        "value": "unemployment",
        "label": "unemployment benefits"
      },
      {
        "value": "cash-assistance",
        "label": "Cash Assistance grant"
      },
      {
        "value": "child-support",
        "label": "child support (received)"
      },
      {
        "value": "disability-medicaid",
        "label": "disability-related Medicaid"
      },
      {
        "value": "supplemental-security-income",
        "label": "Supplemental Security Income (SSI)"
      },
      {
        "value": "social-security-dependent",
        "label": "Social Security Dependent Benefits"
      },
      {
        "value": "social-security-disability",
        "label": "Social Security Disability Benefits"
      },
      {
        "value": "social-security-survivor",
        "label": "Social Security Survivor’s Benefits"
      },
      {
        "value": "social-security-retirement",
        "label": "Social Security Retirement Benefits"
      },
      {
        "value": "state-disability",
        "label": "State Disability Benefits"
      },
      {
        "value": "veteran",
        "label": "Veteran’s Pension or Benefits"
      },
      {
        "value": "pension",
        "label": "Government or Private Pension"
      },
      {
        "value": "deferred-comp",
        "label": "Withdrawals from Deferred Compensation (IRA, Keogh, etc.)"
      },
      {
        "value": "workers-comp",
        "label": "Worker’s Compensation"
      },
      {
        "value": "alimony",
        "label": "alimony (received)"
      },
      {
        "value": "boarder",
        "label": "boarder or lodger"
      },
      {
        "value": "gifts",
        "label": "gifts/contributions (received)"
      },
      {
        "value": "rental",
        "label": "rental income"
      },
      {
        "value": "investment",
        "label": "investment income (interest, dividends, and profit from selling stocks)"
      }
    ]
  }
}{% endcapture %}

{% render 'figure.md', name: 'form-group', nice: title, body: body, context: context, caption: 'Form group with select' %}

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

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% capture usage %}{{ url_uswds }}{{ url_uswds_usage }}{% endcapture %}
<!-- render 'source.md', name: '{{ name }}', nice: title, theme: '$theme-{{ setting }}: {{ value }}', usage: usage, config: config -->
