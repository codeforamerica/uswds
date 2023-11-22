---
tags: component
title: Select
layout: default
story: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
url_uswds: https://designsystem.digital.gov/components/select
url_uswds_guidance: https://designsystem.digital.gov/components/select#guidance
url_uswds_usage: https://designsystem.digital.gov/components/select#using-the-select-component-2
nice_uswds: Select component
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-form_elements
nice_honeycrisp: Form element atom
modifier_honeycrisp: ['.cfa-select']
design_honeycrisp: https%3A%2F%2Fwww.figma.com%2Ffile%2FsQQqaoeuOPpm43wLlYfyEo%2FHoneycrisp-Design-System%3Ftype%3Ddesign%26node-id%3D6133%253A844%26mode%3Ddesign%26t%3DeSs9ZaxsX9qacQvQ-1
# tokens: true
styles: true
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

{% capture id %}{% createId %}{% endcapture %}

{% capture context %}{
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

{% render 'figure.md', name: 'select', nice: title, body: body, context: context, caption: 'Select' %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Form groups**. Form questions with select components always use the <a href="{{ config.baseUrl }}components/form-group">form group component</a> to wrap the select with a visible `label` element.

{% capture ref_additional %}
1. <a href="https://design-system.service.gov.uk/components/select" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Select</cite> | GOV.UK Design System</a>
1. <a href="https://design.va.gov/components/form/select" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Select</cite> | VA.gov Design System</a>
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

{% render 'source.md', name: 'select', nice: title, usage: url_uswds, config: config, pckg: package %}
