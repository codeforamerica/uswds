---
tags: component
title: Alert
layout: default
intro: '"Alerts appear when I need help or when something has changed. It may be time-sensitive."'
url_uswds: https://designsystem.digital.gov/components/alert
url_uswds_guidance: '#guidance'
url_uswds_usage: '#using-the-alert-component-2'
nice_uswds: Alert component
description_uswds: ''
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices
nice_honeycrisp: Notice atom
modifier_honeycrisp: .cfa-alert
tokens: true
styles: true
description_honeycrisp: ''
---

<!-- INTRO -->

Alerts (notices) distinguish important information that wouldn't normally appear in a layout or template. They may blend into or disrupt a user's workflow. Disruptive notices are most effective if used sparingly and appear after user interaction.

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

{% capture body_default %}

Providing your race and ethnicity is optional and will not affect your individual application.

We will use this information to evaluate the fairness of this application, and we ask you to provide it to ensure that you are accurately represented.

{% endcapture %}

{% capture context %}{
  "modifier": "cfa-alert usa-alert--info",
  "role": "region",
  "heading": "Can we ask about your race and ethnicity?",
  "label": false,
  "labelledby": "aria-lb-{% createId %}"
}{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Informational', body: body_default, context: context, caption: 'Informational, gray' %}

{% capture body %}

We couldn't find your address. To make sure you get mail from the county, you may edit your address or keep going. {.usa-alert__text}

{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Warning', body: body, context: '{
  "modifier": "cfa-alert usa-alert--warning",
  "role": false,
  "heading": "Make sure your address is correct",
  "label": false,
  "labelledby": false
}', caption: 'Warning, yellow' %}

{% capture body %}

This is an example error notice. Its a great way to highlight **errors or dangerous issues**. {.usa-alert__text}

{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Error', body: body, context: '{
  "modifier": "cfa-alert usa-alert--error",
  "role": "alert",
  "heading": "Error notice",
  "label": false,
  "labelledby": false
}', caption: 'Error, red' %}

{% capture body %}

You were recommended for expedited food assistance (SNAP). {.usa-alert__text}

{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Success', body: body, context: '{
  "modifier": "cfa-alert usa-alert--success",
  "role": "status",
  "heading": "Done! Your application has been submitted.",
  "label": false,
  "labelledby": false
}', caption: 'Success, green' %}

{% capture caption %}

This is an example of what the {{ nice_uswds }} looks like without the modifier <code>{{ modifier_honeycrisp }}</code>. The colors for each {{ nice_uswds }} variant are the same in the examples above. Additional variant modifiers for the {{ nice_uswds }} can be found in the <a href="{{ url_uswds }}{{ url_uswds_usage }}" target="_blank" rel="noopener nofollow" class="usa-link--external">usage documentation</a>.

{% endcapture %}

{% render 'figure.md', name: 'alert', nice: 'Informational alert', body: body_default, context: '{
  "modifier": "usa-alert--info",
  "role": false,
  "heading": "Can we ask about your race and ethnicity?",
  "label": false,
  "labelledby": false
}', caption: caption %}

## Guidance {#guidance}

**Informational, gray**. For non-urgent messages or context that is important to find but should not interrupt a user’s workflow. The HTML element may have the `role="region"` attribute. If so, it must also have an `aria-labelledby` attribute that refers to the heading id. If it does not have a visible heading it must have an `aria-label` with the value of the label based on information inside the alert.

**Warning, yellow**. For temporary scenarios. They can be used outside the form card for extra emphasis.

**Error, red**. For urgent messages or application failure messages that are out of the user’s control. This is the least likely notice to appear. The HTML element should have `role="alert"` attribute.

**Success, green**. For successful interactions such as a submitting an application. The HTML element should have the `role="status"` attribute.

**Attention and color**. A notice that uses a tertiary background color, or color that appears in roughly 5% of the color palette, will draw more attention. Also consider choosing combinations that are distinguishable across a broad spectrum of color blindness such as blue against orange, where orange is the emphasis color (<a href="https://www.tableau.com/blog/examining-data-viz-rules-dont-use-red-green-together" target="_blank" rel="noopener nofollow" class="usa-link--external">source</a>).

Refer to <a href="{{ url_uswds }}{{ url_uswds_guidance }}" target="_blank" rel="noopener nofollow" class="usa-link--external">additional guidance on the USWDS documentation site</a>.

<!-- DESIGN -->

{% render 'figma.md', url: 'https://www.figma.com/file/sQQqaoeuOPpm43wLlYfyEo/Honeycrisp-Design-System?type=design&node-id=5003-527&mode=design' %}

<!-- SOURCE -->

{% render 'source.md', name: 'alert', nice: 'Notice', theme: '$theme-alert-padding-x: 2', usage: 'https://designsystem.digital.gov/components/alert/#using-the-alert-component-2', config: config %}
