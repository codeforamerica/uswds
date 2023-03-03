---
tags: component
title: Accordion
layout: default
intro: '"An accordion helps me scan long pages by letting me show or hide information."'
url_uswds: https://designsystem.digital.gov/components/accordion
url_uswds_usage: '#using-the-accordion-component-2'
nice_uswds: Accordion component
description_uswds: ''
url_honeycrisp: 'https://honeycrisp.herokuapp.com/cfa/styleguide#molecules-accordion'
nice_honeycrisp: Accordion molecule
modifier_honeycrisp: .cfa-accordion
tokens: true
styles: true
description_honeycrisp: ''
---

<!-- INTRO -->

Accordions allow users to find information on a page by clicking content headings to expand or hide content beneath. They are always used to collapse multiple heading groups and are most useful for fitting content into a limited space.

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
  modifier_honeycrisp: modifier_honeycrisp %}

<!-- ACCESSIBILITY -->

{% render 'accessibility.md' %}

## Examples {#examples}

{% capture body_accordion_1 %}

* Personal information
* People who live with you
* Income
* Expenses
* Assets

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
  "modifier": "usa-accordion--bordered cfa-accordion",
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

{% render 'figure.md', name: 'accordion', nice: 'Bordered', body: body_default, context: context, caption: 'Bordered' %}

{% capture context %}{
  "modifier": "",
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
    }
  ]
}{% endcapture %}

{% capture caption %}

This is an example of what the {{ nice_uswds }} looks like without the modifier <code>{{ modifier_honeycrisp }}</code>. Additional variant modifiers for the {{ nice_uswds }} can be found in the <a href="{{ url_uswds }}{{ url_uswds_usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">usage documentation</a>.

{% endcapture %}

{% render 'figure.md', name: 'accordion', nice: 'Borderless', body: body_default, context: context, caption: caption %}

<!-- DESIGN -->

{% render 'figma.md', url: 'https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=6133%3A1205&mode=design&t=za88mJcbenf6Hf6a-1' %}

<!-- SOURCE -->

{% render 'source.md', name: 'accordion', nice: 'Accordion', theme: '$theme-accordion-border-width: 2px', usage: 'https://designsystem.digital.gov/components/accordion/#using-the-accordion-component-2', config: config %}
