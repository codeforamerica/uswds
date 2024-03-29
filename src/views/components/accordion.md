---
tags: component
title: Accordion
layout: default
story: An accordion helps me scan long pages by letting me show or hide sections of text.
url_uswds: https://designsystem.digital.gov/components/accordion
url_uswds_guidance: https://designsystem.digital.gov/components/accordion/#guidance
url_uswds_usage: https://designsystem.digital.gov/components/accordion/#using-the-accordion-component-2
nice_uswds: Accordion component
url_honeycrisp: 'https://honeycrisp.herokuapp.com/cfa/styleguide#molecules-accordion'
nice_honeycrisp: Accordion molecule
modifier_honeycrisp: .cfa-accordion .usa-accordion--bordered
design_honeycrisp: https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=5002-536&mode=design
tokens: true
styles: true
thumbnail: assets/site/thumbnail-accordion.png
thumbnail_description: An illustration of the accordion component.
---

<!-- INTRO -->

The {{ title }} component allows users to find information on a page by clicking headings to expand or hide content beneath. They are always used to collapse multiple heading groups and are most useful for fitting long-form content into a limited space.

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
  dictionary: dictionary,
  modifier_honeycrisp: modifier_honeycrisp,
  config: config %}

## Examples {#examples}

{% capture body_accordion_1 %}
* Personal information
* People who live with you
* Income
* Expenses
* Assets

[Learn more about how we protect your personal information](#).
{% endcapture %}

{% capture body_accordion_2 %}
If you are applying for food assistance (SNAP), you will have the choice to submit an incomplete application with only your name, address, and signature.

By choosing to submit an incomplete application, you may experience longer processing time and more communication with your county.
{% endcapture %}

{% capture body_accordion_3 %}
At the end of this application, you will have the option to add documents, like pay stubs, rent receipts, or medical bills.

You can use your phone to take photos of paper documents or select photos from your device.

You can always return to our homepage to add documents later, too.
{% endcapture %}

{% capture body_accordion_4 %}
Your application submission date is the earliest date your benefits can begin.

Most programs on this application, including food and cash assistance, require an interview after you submit. Look for a letter in the mail or a phone call from your county.
{% endcapture %}

{% capture context %}{
  "modifier": "cfa-accordion usa-accordion--bordered",
  "multiple": true,
  "items": [
    {
      "expanded": true,
      "controls": "aria-c-{% createId %}",
      "heading": "We'll ask you about",
      "body": "{% md body_accordion_1 %}"
    },
    {
      "expanded": false,
      "controls": "aria-c-{% createId %}",
      "heading": "Submitting an incomplete application (SNAP only)",
      "body": "{% md body_accordion_2 %}"
    },
    {
      "expanded": false,
      "controls": "aria-c-{% createId %}",
      "heading": "Adding documents",
      "body": "{% md body_accordion_3 %}"
    },
    {
      "expanded": false,
      "controls": "aria-c-{% createId %}",
      "heading": "After you submit",
      "body": "{% md body_accordion_4 %}"
    }
  ]
}{% endcapture %}

{% render 'figure.md', name: 'accordion', nice: 'Bordered', context: context, caption: 'Bordered', dictionary: dictionary %}

<!-- GUIDANCE -->

## Guidance {#guidance}

**Heading order**. It is a best practice to ensure the accordion heading level does not skip and is in order with other page headings. However, this does not contribute to accessible success criteria.

{% capture ref_additional %}
1. <a href="https://dequeuniversity.com/rules/axe/4.7/heading-order?application=AxeEdge" target="_blank" rel="noopener nofollow" class="usa-link--external"><cite>Heading levels should only increase by one</cite> | dequeuniversity.com</a>
{% endcapture %}

{% render 'references.md', ref_main: url_uswds_guidance, ref_additional: ref_additional, config: config %}

<!-- ACCESSIBILITY -->

{% render 'accessibility.md'
  nice: title,
  url_uswds: url_uswds,
  theme_passes: true,
  audit_passes: true,
  keyboard_passes: false,
  keyboard_test: 'No keyboard test has been created.',
  resize_passes: true,
  screen_reader_passes: false,
  screen_reader_test: 'No screen reader test has been created.',
  guidance_passes: true,
  additional: false,
  config: config %}

<!-- DESIGN -->

{% render 'figma.md', url: design_honeycrisp %}

<!-- SOURCE -->

{% capture theme %}
// Theme-level settings
@use 'cfa-uswds-theme' with (
  // Global theme settings that affect the component, changing these will affect other components
  $cfa-color-base-lightest: 'gray-warm-4', // Affects accordion background
  $cfa-color-base-lighter: 'gray-warm-10', // Affects accordion button hover state
  // Component specific settings
  $cfa-accordion-border-width: 2px,
  $cfa-accordion-border-color: 'gray-warm-20'
);
{% endcapture %}

{% capture javascript %}
enables the expanding and collapsing of accordion sections as well as toggles ARIA attributes on the button and target region.
{% endcapture %}

{% render 'source.md', name: 'accordion', nice: 'Accordion', theme: theme, usage: url_uswds_usage, javascript: javascript, config: config, pckg: package %}
