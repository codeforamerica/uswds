---
tags: component
title: Alert
layout: default
intro: '"Alerts (notices) appear when I need help or that something has changed... it may be time-sensitive."'
url_uswds: https://designsystem.digital.gov/components/alert
url_uswds_usage: '#using-the-alert-component-2'
nice_uswds: Alert component
description_uswds: ''
url_honeycrisp: http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices
nice_honeycrisp: Notice atom
modifier_honeycrisp: .cfa-alert
description_honeycrisp: ''
---

Notices distinguish important information that wouldn't normally appear in a layout or template. They may blend into or disrupt a user's workflow. Disruptive notices are most effective if they're used sparingly and appear after a user interaction.

## Details {#details}

<ul class="usa-content-list">
  <li><strong>Extends:</strong> <a href="https://designsystem.digital.gov/components/alert/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Alert component</a></li>
  <li><strong>Honeycrisp:</strong> <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices" target="_blank" rel="noopener nofollow" class="usa-link--external">Notice atom</a></li>
  <li><strong>Customization:</strong> <abbr title="{{ dictionary.tokens }}">Tokens</abbr> and <abbr title="{{ dictionary.styles }}">Styles</abbr></li>
  <li><strong><abbr title="{{ dictionary.modifier }}">Modifier</abbr>:</strong> <code>.cfa-alert</code></li>
</ul>

The **Alert** extends the <a href="https://designsystem.digital.gov/components/alert/" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Alert</a> component. The visual appearance is modified using **design tokens** applied to the <a href="https://designsystem.digital.gov/components/alert/#using-the-alert-component-2" target="_blank" rel="noopener nofollow" class="usa-link--external">USWDS Alert settings</a> from the <a href="http://honeycrisp.herokuapp.com/cfa/styleguide#atoms-notices" target="_blank" rel="noopener nofollow" class="usa-link--external">Honeycrisp Notice atom</a>. Further styling is applied using the **CSS modifier** `.cfa-alert` to add **styles** defined in a custom stylesheet.

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

This is an example of what the informational alert looks like without the modifier <code>.cfa-alert</code>. The colors for each alert variant are the same in the examples above. Additional variant modifiers for the alert can be found in the <a href="https://designsystem.digital.gov/components/alert/#using-the-alert-component-2" target="_blank" rel="noopener nofollow" class="usa-link--external">usage documentation</a>.

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

<!-- DESIGN -->

{% render 'figma.md', url: 'https://www.figma.com/file/H8qVKsmn0dGFG03pomDBDI/Reorganize-components?type=design&node-id=5003-527' %}

<!-- SOURCE -->

{% render 'source.md', name: 'alert', nice: 'Notice', theme: '$theme-alert-padding-x: 2', usage: 'https://designsystem.digital.gov/components/alert/#using-the-alert-component-2', config: config %}
